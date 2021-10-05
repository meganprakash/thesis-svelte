<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import { personalizationStore } from '../stores';
    import {onMount} from "svelte";
    import Graph from './components/Graph.svelte'
    import StoryPanel from "./components/StoryPanel.svelte";


    onMount(() => {
        window.scrollTo(0, 0)
    })

    function handleClick() {

    }

</script>
<!--

World.svelte is a page that contains the interaction graph and the modal showing story content.

-->
<main> <!-- make the modal fade in slower than the graph -->

    <div id="graph-container"  in:fade="{{duration: 50}}">
        <Graph/>
    </div>

    <div id="story-container"  in:fade="{{delay: 200, duration: 50}}">
       <StoryPanel/>
    </div>

</main>

<style>
    main {
        background-color: var(--panel-bg);
        display: flex;
        height: 80%;
        position: relative;
    }

    #graph-container {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: #5c00f3;
    }

    #story-container {
        width: 30%;
        min-width: 300px;
        max-width: 450px;
        height: 70%;
        position: absolute;
        display: inline-block;
        top: 40px;
        left: 40px;
        background-color: var(--modal-bg);
        border-radius: 7px;
        padding: 30px;
        z-index: 1;
    }


</style>