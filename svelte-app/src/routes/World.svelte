<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import { personalizationStore } from '../stores';
    import { stateStore } from "../stores";
    import {onMount} from "svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    function handleClick() {

    }

</script>

<main> <!-- make the modal fade in slower than the graph -->

    <div id="graph-container"  in:fade="{{duration: 400}}"></div>

    <div id="story-container"  in:fade="{{duration: 770}}"></div>

</main>

<style>
    main {
        background-color: var(--panel-bg);
        height: 100%; /* TODO fix so that it is the space between the headers */
        display: flex;
    }

    #graph-container {
        width: 100%;
        height: 100%;
        display: inline-block;
        background-color: #5c00f3;
    }

    #story-container {
        width: 30%;
        height: 80%;
        position: fixed;
        top: 80px;
        left: 80px;
        background-color: #9cde70;
    }


</style>