 <h2>Cytoscape page</h2>
    <!-- cytoscape view goes here -->
    <div id="cytoscape"></div>


<script lang="ts">
    import cytoscape from 'cytoscape';
    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";


    onMount(() => {
        console.log("Cyto component mounted")
        startCy()
    })
    function startCy() {
        // https://js.cytoscape.org/#getting-started/initialisation
        // TODO instead move this to GraphUIManager and import it here
        const cy = cytoscape({

            container: document.getElementById('cytoscape'), // container to render in

            elements: storyManager.GraphData,
            layout: {
                name: 'grid',
                rows: 1
            },

        });
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