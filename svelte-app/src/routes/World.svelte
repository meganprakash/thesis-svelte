<!--

World.svelte is a page that contains the interaction graph and the modal showing story content.

-->
<script>

    import {fade} from 'svelte/transition'
    import {onMount} from "svelte";
    import Graph from './components/Graph.svelte'
    import StoryPanel from "./components/StoryPanel.svelte";
    import Modal from 'svelte-simple-modal';
    import GraphModal from "./components/GraphModal.svelte";
    import { bind } from 'svelte-simple-modal';
    import { storyManager } from "../ts/StoryManager";
    const { individualMode } = storyManager

    let individualIntro = 'These are the instructions for the individual mode'
    let globalIntro = 'These are the instructions for the global mode. You played' +
        'through one narrative, but the Latin Quarter was full of overlapping stories,' +
        'creations, and innovations.'

    $: showModal = bind(GraphModal, { message : individualMode ? individualIntro : globalIntro})

    onMount(() => {
        window.scrollTo(0, 0)
    })

</script>
<main> <!-- make the modal fade in slower than the graph -->

    <div id="story-container"  in:fade="{{delay: 100, duration: 50}}">
        <StoryPanel/>
    </div>
    <div id="graph-container">
        <Graph/>
    </div>
    <Modal show={showModal}>
    </Modal>


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
    }

    #story-container {
        width: 40%;
        height: 70%;
        min-width: 300px;
        max-width: 450px;
        display: inline-block;
        vertical-align: middle;
        background-color: var(--modal-bg);
        border-radius: 7px;
        padding: 30px;
        margin: 40px;
        z-index: 1;
    }


</style>