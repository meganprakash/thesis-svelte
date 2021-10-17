 <h2>Cytoscape page</h2>
    <!-- cytoscape view goes here -->
    <div id="cytoscape"></div>


<script lang="ts">
    /// <reference path="path/to/node.d.ts" />
    import cytoscape from 'cytoscape';
    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";
    import popper from 'cytoscape-popper';
    // import tippy from 'tippy.js';
    // import 'tippy.js/dist/tippy.css';


    // annoyingly, I couldn't get this to import with fs
    let graphStyle = `
    node {
        background-color: green;
        label: data(id);
        color: white;
    }
    edge {
        curve-style: bezier;
        label: data(id);
        color: white;
    }
    `

    onMount(() => {
        console.log("Graph component mounted")
        startCy()
    })
    function startCy() {
        // https://js.cytoscape.org/#getting-started/initialisation
        // TODO instead move this to GraphUIManager and import it here
        const cy = cytoscape({
            container: document.getElementById('cytoscape'), // container to render in

            elements: storyManager.GraphData,
            layout: {
                name: 'cose',

            },
            zoom: 0.8,
            minZoom: 0.8,
            maxZoom: 3,
            userZoomingEnabled: false,
            userPanningEnabled: false,
            boxSelectionEnabled: false,
            autoungrabify: true,
        });

        cy.style(graphStyle);
        cytoscape.use(popper);
        // TODO use popper to draw user avatars on edges! :O
        // https://github.com/cytoscape/cytoscape.js-popper
        // TODO use tippy to draw tooltips when user hovers on elements

        // TODO this is where to add more cy listeners
    }

    // TODO more cy manipulate functions here, hover handlers etc

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