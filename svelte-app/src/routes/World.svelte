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
    import {bind} from 'svelte-simple-modal';
    import {storyManager} from "../ts/StoryManager";
    import {push} from "svelte-spa-router";

    const {individualMode} = storyManager

    const individualTitle = 'Entering the virtual Latin Quarter'
    const individualIntro = 'This is the virtual Latin Quarter club, where you will read about the historical moment and watch how the connections play out. On the left, you’ll see the story, while on the right you’ll see the bird’s eye view of the club and the path that the story takes.\n' +
        '\n' +
        'Click “Next” to proceed through the story.\n'
    const globalTitle = 'Bird\'s eye view of the club'
    const globalIntro = 'The Latin Quarter wasn’t a single timeline of stories; it was a space of constant connection and creation. The stories were simultaneous and interwoven.\n' +
        '\n' +
        'You’ll now see the full view of the club: the major MCs and DJs and the ways their paths intertwined. Hover over the connections in the map to browse the stories, and click on a story to explore it.\n' +
        '\n' +
        'When you’re done exploring and ready to leave the club, click EXIT THE CLUB.\n'
    // TODO color the EXIT THE CLUB to match the button

    $: showModal = bind(GraphModal, {title: $individualMode ? individualTitle : globalTitle, message: $individualMode ? individualIntro : globalIntro})

    onMount(() => {
        window.scrollTo(0, 0)
    })

</script>
<main  out:fade="{{delay: 200, duration: 300}}"> <!-- make the modal fade in slower than the graph -->

    <div id="story-container">
        <StoryPanel/>

    </div>
    <div id="graph-container">
        <Graph/>
    </div>
    <div id="modal-container">
        <Modal show={showModal}>
        </Modal>
    </div>

</main>

<style>
    main {
        background-image: url("../static/images/edit/bg-dance-01.jpg");
        background-size: cover;
        display: flex;
        height: 80%;
        position: relative;
    }

    main::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background-color: rgba(0,0,0,0.25);
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
        position: relative;
    }


</style>