<script lang="ts">
	import {Button} from 'attractions';
</script>

<h2>Home component</h2>

<p>
	This sample shows how to set up the router with minimum functionality. <br/>
	The route definition object contains a number of routes (including some with parameters and a catch-all at the end).<br/>
	The links below allow navigating between pages.
</p>

<p>This is the Home component, which contains markup only.</p>

<p><em>Hint:</em> Try navigating with the links below, then use your browser's back and forward buttons.</p>

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
</style>