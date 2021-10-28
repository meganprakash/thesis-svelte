 <h2>Cytoscape page</h2>
    <!-- cytoscape view goes here -->
    <div id="cytoscape"></div>


<script lang="ts">
    /// <reference path="path/to/node.d.ts" />
    import cytoscape from 'cytoscape';
    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";
    import popper from 'cytoscape-popper';
    import {storyContent} from "../../ts/StoryContent";
    import {StoryType} from "../../ts/StoryTypes";
    // import tippy from 'tippy.js';
    // import 'tippy.js/dist/tippy.css';

    const {currentStory, currentStoryStep, individualMode} = storyManager
    $: console.log("[Graph.svelte] currentStory: ", $currentStory)

    const {GraphData} = storyContent

    // annoyingly, I couldn't get this to import with fs
    let graphStyle = `
    node {
        background-color: green;
        label: data(id);
        color: white;
        width: 8px;
        height: 8px;
        font-size: 10;
    }
    .active-node {
        background-color: yellow;
    }
    edge {
        curve-style: bezier;
        label: data(id);
        color: white;
        width: 1px;
        font-size: 6;
        target-arrow-shape: triangle;
    }
    .active-edge {
        color: yellow;
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
    }
    `

    let cy = null;

    onMount(() => {
        console.log("Graph component mounted")
        startCy()
    })
    function startCy() {
        // https://js.cytoscape.org/#getting-started/initialisation
        // TODO instead move this to GraphUIManager and import it here
         cy = cytoscape({
            container: document.getElementById('cytoscape'), // container to render in

            elements: storyContent.GraphData,
            layout: {
                name: 'cose',
                idealEdgeLength: 20
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

        cy.style(graphStyle);
        cytoscape.use(popper);
        // TODO use popper to draw user avatars on edges! :O
        // https://github.com/cytoscape/cytoscape.js-popper
        // TODO use tippy to draw tooltips when user hovers on elements

        ///// listeners //////
        cy.unbind("tap");
        cy.bind('tap',function(evt){
            if (evt.target === cy) {
                console.log('tapped on background')
                clearStory()
            } else if (evt.target.isEdge()) {
                const edge = evt.target;
                console.log('tapped edge ' + edge.id());
                selectStoryFromEdge(edge)
            } else if (evt.target.isNode()) {
                console.log('node tap handler not implemented yet, sorry')
            }
        });

    }

    $: if ($currentStory == null && cy) {
        cy.elements().classes('')
    } else if (cy) {
        console.log("hello reactivity")
        highlightStoryStep($currentStory, $currentStoryStep)
    }

    function highlightStoryStep(story:StoryType.Story, step:StoryType.StoryStep) {
        console.log("[highlightStoryStep]: ", story, step)
        // fade all edges or make them disappear if individual mode
        if ($individualMode == true) {
            cy.elements().classes('invisible')
        } else {
            cy.elements().classes('faded');
        }

        const activeNodes = cy.nodes().filter(function(node){ return node.data('stories')[story.Title] != undefined})
        const activeEdges = cy.edges().filter(function(edge){ return edge.data("story") == story.Title})
        activeNodes.classes("active-node")
        activeEdges.classes("active-edge")

        // highlight the current storystep
        const thisStep = cy.edges().filter(function(edge) { return edge.data('id') == step.Title})
        thisStep.classes("current-step")

        // TODO show user avatar

    }


    ///// helpers //////
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
</style>