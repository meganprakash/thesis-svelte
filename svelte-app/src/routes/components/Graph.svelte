 <h2>Cytoscape page</h2>
    <!-- cytoscape view goes here -->
    <div id="cytoscape"></div>


<script lang="ts">
    import cytoscape from 'cytoscape';
    import {onMount} from "svelte";

    onMount(() => {
        console.log("Cyto component mounted")
        startCy()
    })
    function startCy() {
        const cy = cytoscape({

            container: document.getElementById('cytoscape'), // container to render in

            elements: [ // list of graph elements to start with
                { // node a
                    data: {id: 'a'}
                },
                { // node b
                    data: {id: 'b'}
                },
                { // edge ab
                    data: {id: 'ab', source: 'a', target: 'b'}
                }
            ],
            layout: {
                name: 'grid',
                rows: 1
            },

        });
    }

</script>

<style>
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