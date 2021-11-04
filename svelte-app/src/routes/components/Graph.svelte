<div id="cytoscape" transition:fade="{{delay: 100, duration: 300}}"></div>
<div id="dot-container" transition:fade="{{delay: 350, duration: 300}}">
            <span id="dot"
                  style="background-color: {$userColorHex}">{$userInitials}</span>
</div>
<div id="tooltip-container"></div>

<!-- TODO when global mode, programmatically create other avatar divs -->

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
    import { fade } from 'svelte/transition';
    import tippy from 'tippy.js';
    import 'tippy.js/dist/tippy.css';

    const {userInitials, userColorHex} = personalizationStore

    const {currentStory, currentStoryStep, individualMode} = storyManager
    $: console.log("[Graph.svelte] currentStory: ", $currentStory)

    const {GraphData} = storyContent

    // annoyingly, I couldn't get this to import with fs
    // I think I need node builtins and globals?
    let graphStyle = `
    node {
        background-color: green;
        label: data(id);
        text-transform: uppercase;
        color: white;
        width: 8px;
        height: 8px;
        font-size: 5;
        text-events: no;
    }
    .active-node {
        background-color: #ddd;
    }
    .hover-node {
        background-color: cyan;
    }
    edge {
        curve-style: bezier;
        color: white;
        width: 1px;
        font-size: 6;
        target-arrow-shape: triangle;
        text-events: no;
    }
    .active-edge {
        color: yellow;
    }
    .hover-edge {
        line-color: #eee;
        target-arrow-color: #eee;
    }
    .current-step {
        color: white;
        line-color: yellow;
        target-arrow-color: yellow;
        width: 2px;
    }
    .faded {
        opacity: 0.4;
    }
    .invisible {
        opacity: 0;
        events: no;
    }
    `

    let cy = null;
    let myAvatar = null;
    let myAvatarPopper = null;
    let graphReady = false;
    let tooltipContainer = null;


    onMount(() => {
        console.log("Graph component mounted")
        startCy()

        myAvatar = document.getElementById("dot")
        myAvatar.style.display = "none"
        myAvatarPopper = createPopper(document.documentElement, myAvatar, {
            placement: 'bottom'
        })

        tooltipContainer = document.getElementById("tooltip-container")
    })

    function startCy() {
        // https://js.cytoscape.org/#getting-started/initialisation
        // TODO instead move this to GraphUIManager and import it here
        cy = cytoscape({
            container: document.getElementById('cytoscape'), // container to render in

            elements: storyContent.GraphData,
            layout: {
                name: 'cose',
                idealEdgeLength: 20,
                animate:false
            },
            zoom: 0.8,
            minZoom: 0.8,
            maxZoom: 3,
            userZoomingEnabled: false,
            userPanningEnabled: false,
            boxSelectionEnabled: false,
            autoungrabify: true,
            autounselectify: true
        });

        cy.ready(() => graphReady = true )

        cy.style(graphStyle);

        ////////// graph element listeners ////////////
        cytoscape.use(popper);

        // add DOM element for labels on edges
        let tips = document.createElement("div")

        // use Popper to place the label on an edge on mouseover
        cy.elements().unbind('mouseover')
        cy.edges().on("mouseover", (e) => {
            e.target.addClass("hover-edge")
            e.target.popperRef = e.target.popper({
                content: () => {
                    tips.innerHTML = e.target.data("id")
                    tips.id = "tooltip"
                    tooltipContainer.appendChild(tips)
                    return tips
                },
                popper: {
                    placement: "bottom",
                    removeOnDestroy: true
                }
            })
        })

        // on mouseout, remove the label, which is destroyed by Popper
        cy.edges().unbind("mouseout")
        cy.edges().bind("mouseout", (e) => {
            tooltipContainer.removeChild(tips)
            e.target.removeClass("hover-edge")
        })

        cy.unbind("tap");
        cy.bind('tap', function (evt) {
            if (evt.target === cy) {
                console.log('tapped on background')
                clearStory()
            } else if (evt.target.isEdge() && $currentStory == null) {
                const edge = evt.target;
                console.log('tapped edge ' + edge.id());
                selectStoryFromEdge(edge)
            } else if (evt.target.isNode() && $currentStory == null) {
                console.log('node tap handler not implemented yet, sorry')
            }
        });

    } // startCy()

    // reactive styling for the graph to highlight the active story
    //      and storystep
    $: if ($currentStory == null && cy) {
        cy.elements().classes('')
        hideAvatar()
    } else if (cy && graphReady) {
        highlightStoryStep($currentStory, $currentStoryStep)
    }

    ///// helpers //////
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
        activeNodes.classes("active-node")
        activeEdges.classes("active-edge")

        // highlight the current storystep
        const thisStep = cy.edges().filter(function (edge) {
            return edge.data('id') == step.Title
        })
        thisStep.classes("current-step")

        attachAvatar(thisStep)
    }

    // get DOM element for the user's avatar,
    //      use Popper to stick it on the current edge
    // TODO svelte transition to smoothly animate it?
    function attachAvatar(edge) {
        myAvatar.style.display = ""
        myAvatarPopper.state.elements.reference = edge.popperRef()
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
        display: block;
    }

    #tooltip-container {
        color: #ddd;
        font-family: var(--text-font);
        font-size: 12pt;
        font-weight: bold;
        font-style: italic;
    }

    #dot-container {
        display: inline-block;
        align-items: start;
        height: 100%;
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
    }
</style>