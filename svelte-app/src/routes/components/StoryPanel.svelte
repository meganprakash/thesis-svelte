<script lang="ts">

    import {storyManager} from "../../ts/StoryManager";
    import {storyContent} from "../../ts/StoryContent";
    import {push} from "svelte-spa-router";

    const {currentStory, currentStoryStep, currentStoryStepIdx, hoverStoryTitle, individualMode} = storyManager

    $: console.log("[StoryPanel] currentStory is now ", $currentStory)
    $: console.log("[StoryPanel] currentStoryStepIdx is now ", $currentStoryStepIdx)

    function next() {
        storyManager.nextStoryStep();
    }


    function done() {
        push('/end')
    }

</script>

{#if $currentStory}
    <h1>{$currentStory.Title}</h1>
    <p>{$currentStoryStep.Title}</p>
    <p>{$currentStoryStep.Text}</p>
    <button class="btn" on:click={next}>NEXT</button>
{:else}
    <h1>{$hoverStoryTitle ? $hoverStoryTitle : "No story selected"}</h1>
    {#if $hoverStoryTitle}
        <p>{storyContent.StoryCollection.getStory($hoverStoryTitle).Summary}</p>
    {/if}
    <p>Hover over the connections in the graph to browse stories. Click any story to explore it.</p>
{/if}

{#if !$individualMode}
    <div id="done">
        <button id="done-btn" class="btn" on:click={done}>EXIT THE CLUB</button>
    </div>
{/if}


<style>
    h1 {
        padding: 0;
        margin: 0;
        font-size: 28px;
    }

    button {
        z-index: 100;
    }

    #done {
        display: block;
        padding: 0;
    }

    #done-btn {
        background: none;
        color: #ff8888 !important;
        font-weight: normal;
        width: 100%;
        text-decoration: underline;
        padding: 0;
        margin: 20px;
    }


</style>