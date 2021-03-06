<div id="dot-container" transition:fade="{{delay: 350, duration: 300}}">
            <span id="dot"
                  style="background-color: {$userColorHex}">{$userInitials}</span>
</div>
<div id="tooltip-container" transition:fade="{{delay: 100, duration: 200}}"></div>
<div id="npc-container" transition:fade="{{delay: 100, duration: 200}}">
    <!-- popper per edge that contains NPC avatars -->
</div>

<div id="cytoscape" transition:fade="{{delay: 100, duration: 300}}"></div>

<script lang="ts">
    /// <reference path="path/to/node.d.ts" />
    import cytoscape from 'cytoscape';
    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";
    import popper from 'cytoscape-popper';
    import {storyContent} from "../../ts/StoryContent";
    import {StoryType} from "../../ts/StoryTypes";
    import {personalizationStore} from '../../ts/PersonalizationStore';
    import {createPopper} from "@popperjs/core";
    import {fade} from 'svelte/transition';
    import {npcManager} from "../../ts/NPCManager";
    import {Mutex} from 'async-mutex';

    const {userInitials, userColorHex} = personalizationStore
    const {currentNPCState} = npcManager
    const {currentStory, currentStoryStep, individualMode, hoverStoryTitle} = storyManager
    individualMode.set(true)
    $: console.log("[Graph.svelte] currentStory: ", $currentStory)
    $: if ($individualMode == false) {
        npcManager.startNPCanimation()
    }

    $: {
        $currentNPCState;
        if (!$individualMode) {
            updateNPCAvatars()
        }
    }

    const {GraphData, StoryCollection} = storyContent

    // annoyingly, I couldn't get this to import with fs
    // I think I need node builtins and globals?
    let graphStyle = `
    node {
        label: data(id);
        text-transform: uppercase;
        color: white;
        width: 20px;
        height: 20px;
        font-size: 6;
        text-events: no;
        background-fit: cover;
        border-width: 0px;
    }
    .active-story-node {
        border-width: 1px;
        border-color: #ddd;
    }
    .hover-node {
        border-width: 1px;
        border-color: #eee;
    }
    edge {
        curve-style: bezier;
        line-color: #777;
        color: white;
        width: 1px;
        font-size: 6;
        text-events: no;
    }
    .faded {
        opacity: 0.4;
        events: no;
    }
    .invisible {
        opacity: 0;
        events: no;
    }
    .active-story-edge {
        line-color: #ddd;
        opacity: 1;
    }
    .hover-edge {
        line-color: white;
        target-arrow-color: white;
    }
    .current-step-edge {
        color: white;
        line-color: yellow;
        target-arrow-color: yellow;
        width: 2px;
    }
    .current-step-node {
        border-width: 2px;
        border-color: yellow;
        height: 35px;
        width: 35px;
    }
    `

    let cy = null;
    let myAvatar = null;
    let myAvatarPopper = null;
    let graphReady = false;
    let tooltipContainer = null;
    let hoverStory = null; // ugh having a weird race condition w graph hover
    const styleMx = new Mutex(); // Hovering on overlapping edges made the graph styling break. Idk

    onMount(() => {
        console.log("Graph component mounted")
        startCy()

        myAvatar = document.getElementById("dot")
        myAvatar.style.display = "none"
        myAvatarPopper = createPopper(document.documentElement, myAvatar, {
            placement: 'left'
        })

        tooltipContainer = document.getElementById("tooltip-container")
    })

    function startCy() {
        // https://js.cytoscape.org/#getting-started/initialisation
        cy = cytoscape({
            container: document.getElementById('cytoscape'), // container to render in

            elements: storyContent.GraphData,
            layout: {
                name: 'circle',
                fit: true,
                animate: false,
                radius: 90
            },
            zoom: 1,
            minZoom: 1,
            maxZoom: 20,
            userZoomingEnabled: false,
            userPanningEnabled: false,
            boxSelectionEnabled: false,
            autoungrabify: true,
            autounselectify: true
        });

        cy.ready(() => {
            graphReady = true;
            hideLoops()
        })

        cy.style(graphStyle);

        cy.style()
            .selector('node')
            .style({
                'background-image': function( ele ){ return String("./static/images/heads/" + ele.data('id').split(' ').join('-') + ".jpg")}
            })
            .update()

        window.addEventListener('resize', function () {
            cy.center()
            cy.fit()
        });

        ////////// graph element listeners ////////////
        cytoscape.use(popper);

        cy.elements().unbind('mouseover')
        cy.edges().on("mouseover", (e) => {
            // if no story selected, then highlight the whole story path
            if ($currentStory == null) {
                hoverStory = e.target.data("story")
            }
        })

        // on mouseout, remove the label, which is destroyed by Popper
        cy.edges().unbind("mouseout")
        cy.edges().bind("mouseout", (e) => {
            hoverStory = null
        })

        cy.unbind("tap");
        cy.bind('tap', function (evt) {
            if ($individualMode == true) {
                return // disable clicking in the graph in individual (tutorial) mode
            }
            if (evt.target === cy) {
                clearStory()
            } else if (evt.target.isEdge() && $currentStory == null) {
                const edge = evt.target;
                console.log('tapped edge ' + edge.id());
                selectStoryFromEdge(edge)
            } else if (evt.target.isNode() && $currentStory == null) {
                console.log('node tap handler not implemented, sorry')
            }
        });

        cy.on('pan zoom resize', () => {
            myAvatarPopper.update()
        });

    } // startCy()

    // reactive styling for the graph to highlight the active story
    //      and storystep
    $: if ($currentStory == null && cy) {
        cy.elements().classes('')
        hideLoops()
        hideAvatar()
        // reset graph view
        cy.animate({
            fit: {
                eles: cy.eles,
                padding: 80
            }
        }, {
            duration: 600
        },
            {
                easing: "ease-out-quart"
            });
    } else if (cy && graphReady) {
        highlightStoryStep($currentStory, $currentStoryStep)
        hideLoops()
    }

    // when in global mode, hovering on an edge will highlight the whole story
    //    and set hoverStoryTitle in StoryManager (so that StoryPanel can display it)
    // i had a weird race condition when I used addClass and removeClass, but also
    //  I added all this mutex stuff so who knows what actually fixed it
    $: {
        if (hoverStory && !$currentStory && cy && !$individualMode) {
            $hoverStoryTitle = hoverStory
            document.body.style.cursor = "pointer";
            styleMx.runExclusive(function () {
                cy.edges().classes("")
                cy.nodes().classes("")
                console.log("[Graph.svelte] hoverStory = ", hoverStory)

                const storyNodes = cy.nodes().filter(function (node) {
                    return node.data('stories')[hoverStory] != undefined
                })
                const storyEdges = cy.edges().filter(function (edge) {
                    return edge.data("story") == hoverStory
                })

                console.log("hoverStory issue: storyEdges = ", storyEdges.length)
                storyNodes.classes("hover-node")
                storyEdges.classes("hover-edge")
                hideLoops()
            })
        } else if (!hoverStory && !$currentStory && cy && !$individualMode) {
            $hoverStoryTitle = null
            document.body.style.cursor = "default";
            styleMx.runExclusive(function () {
                console.log("[Graph.svelte] hoverStory = ", hoverStory)
                cy.edges().classes("")
                cy.nodes().classes("")
                hideLoops()
            })
        } else {
            document.body.style.cursor = "default";
        }
    }

    ///// helpers //////

    // hiding all self-loop edges, because they refer to story steps
    //      that only have 1 person involved instead of a distinct source->target pair
    //      this kind of has to be redone every time the graph is re-styled
    function hideLoops() {
        console.log("[Graph.svelte] Hiding loop edges")
        let loops = cy.edges().filter(function (el) {
            return el.source() == el.target()
        })
        if (loops) {
            console.log("loops: ", loops.data["id"])
            loops.classes("invisible")
        }
    }

    // when a story is active, this makes sure the whole story graph is visible and
    //  the current story step is highlighted
    function highlightStoryStep(story: StoryType.Story, step: StoryType.StoryStep) {
        console.log("[highlightStoryStep]: ", story, step)
        // fade all edges or make them disappear if individual mode
        if ($individualMode == true) {
            cy.elements().classes('invisible')
        } else {
            cy.elements().classes('faded');
        }

        const activeNodes = cy.nodes().filter(function (node) {
            return node.data('stories')[story.Title] != undefined
        })
        const activeEdges = cy.edges().filter(function (edge) {
            return edge.data("story") == story.Title
        })
        activeNodes.classes("active-story-node")
        activeEdges.classes("active-story-edge")

        // highlight the current storystep
        const thisStepEdge = cy.edges().filter(function (edge) {
            return edge.data('id') == step.Title
        })
        thisStepEdge.connectedNodes().classes("current-step-node")

        if (thisStepEdge.isSimple()) { // not a loop
            thisStepEdge.classes("current-step-edge")
            attachAvatar(thisStepEdge)
        } else {
            attachAvatar(thisStepEdge.connectedNodes()[0])
        }

        // animate zoom to the edge

        cy.animate({
                center: {
                    eles: thisStepEdge,
                }
            }, {
                duration: 600
            },
            {
                easing: "ease-out-quart"
            });
    }

    // remove all NPC avatars if present, then generate and place new ones to match
    //   the current state from NPCManager
    function updateNPCAvatars() {
        console.log("Graph.svelte: updateNPCAvatars() called")

        // remove all popper elements
        let container = document.getElementById("npc-container");
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        // go thru currentNPCState to see which edges have avatars
        for (let [npc, state] of $currentNPCState) {
            // need stepTitle to get the edge in the graph
            let stepTitle =
                storyContent.StoryCollection.getStory(state.storyTitle).StorySteps[state.stepIdx].Title
            let edge = cy.edges().filter(function (edge) {
                return edge.data('id') == stepTitle
            })
            if (!edge) {
                console.log("No edge found for this NPC!!! stepTitle=", stepTitle)
                return
            }

            // make a popper div with id = 'pop-$stepTitle' if it doesn't exist yet
            let divName = stepTitle.replace(/\W/g, '-') // replace non alphanumeric with -
            let popDiv = document.getElementById("npc-" + divName);
            let popper;
            if (!popDiv) {
                let d = document.createElement("div")
                d.id = "npc-" + divName
                container.appendChild(d)
                popDiv = d

                let ref

                if (edge.isSimple()) { // not a loop
                    ref = edge.popperRef()
                } else {
                    ref = edge.connectedNodes()[0].popperRef()
                }

                popper = createPopper(ref, popDiv, {
                    placement: 'right'
                })

                cy.on('pan zoom resize', () => {
                    popper.update()
                });
            } // else, popDiv exists and is already attached w a popper instance

            // add the npc avatar
            let avatar = document.createElement("span")
            avatar.id = "dot-" + divName
            avatar.className = "npc-dot"
            avatar.style.backgroundColor = state.color
            avatar.innerText = npc
            popDiv.appendChild(avatar)

        }

        // TODO styling active edges if desired
    }

    function removeFadeOut(el, speed) {
        el.style.transition = "opacity " + speed + "ms ease";
        el.style.opacity = 0;
        setTimeout(function () {
            el.parentNode.removeChild(el);
        }, speed);
    }

    // get DOM element for the user's avatar,
    //      use Popper to stick it on the current edge
    function attachAvatar(el) {
        myAvatar.style.display = ""
        myAvatarPopper.state.elements.reference = el.popperRef()
        myAvatarPopper.update()
    }

    function hideAvatar() {
        let myAvatar = document.getElementById("dot")
        myAvatar.style.display = "none"
    }

    function selectStoryFromEdge(edge) {
        // user clicks edge, new story starts and unrelated edges fade
        const story = edge.data("story")
        storyManager.changeCurrentStory(story)
    }

    function clearStory() {
        storyManager.clearCurrentStory()
    }


</script>

<style>
    /* don't style Cyto elements here, instead use Cyto directives */
    main {
        width: 100%;
        height: 100%;
        margin: 0;
    }

    #cytoscape {
        width: 100%;
        height: 100%;
        display: inline-block;
        z-index: 1;
    }

    #dot {
        float: right;
        height: 35px;
        width: 35px;
        border-radius: 50%;
        color: white;
        font-family: var(--title-font);
        font-size: 13pt;
        align-items: center;
        justify-content: center;
        display: inline-flex;
        z-index: 1000;
    }

    :global .npc-dot {
        float: right;
        height: 28px;
        width: 28px;
        border-radius: 50%;
        color: white;
        font-family: var(--title-font);
        font-size: 11pt;
        align-items: center;
        justify-content: center;
        display: inline-flex;
        opacity: 0.9;
        filter: brightness(85%);
    }
</style>