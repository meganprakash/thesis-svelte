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
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;
	}

	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}

    #cytoscape {
        width: 300px;
        height: 300px;
        display: block;
    }
</style>