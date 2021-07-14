<script>
	import { Slidy } from 'svelte-slidy'

	export let role = "--"
	// TODO receive callback for changing the bg of the parent (once i want to implement it);

	// loadSlidy()
	// loadFromJson() // TODO I should just encode the moments as objects in a js array and generate the
	//					 TODO   Slidy formatted array from there

    // create Promise for all loading tasks
	//		Promise() make the array format for Slidy from the content obj array
	//		  .then() load Slidy from src array

	// 		when loading Promise returns, remove the loading indicator and show the content or an error message

	// Carousel items:
	// 		[ Slidy component for moving between the images ]
	//		content div (svelte transition)
	//	  	  moment[i].title
	//		  moment[i].blurb
	//		  <audio src={moment[i].audioSrc}>
	//		  <button> Submit </button>
	// 		bg photo using the current image


	// submit() saves the moment in StateStore then moves to global view

	let index = 0; // current id in the Slidy carousel, reactive to <Slidy bind:index />

</script>

<!-- TODO preload audio files -->
<!-- <link rel="preload" as="audio" href="https://cdn.com/small-file.mp4"> -->

<div>
<p>
	This is the Carousel.svelte component.
</p>
</div>

<div>
	<p>
	Loading content from the {role} role.
	</p>
</div>

<style>
	main {
		height: 800px;
		background-color: #16296b;
	}
</style>