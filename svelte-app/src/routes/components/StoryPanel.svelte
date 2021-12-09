<script lang="ts">

    import {storyManager} from "../../ts/StoryManager";
    const {currentStory, currentStoryStep, currentStoryStepIdx} = storyManager

    $: console.log("[StoryPanel] currentStory is now ", $currentStory)
    $: console.log("[StoryPanel] currentStoryStepIdx is now ", $currentStoryStepIdx)

    function next() {
        storyManager.nextStoryStep();
    }

</script>

{#if $currentStory}
    <h1>{$currentStory.Title}</h1>
    <p>{$currentStoryStep.Title}</p>
    <p>{$currentStoryStep.Text}</p>
    <button class="btn" on:click={next}>NEXT</button>
{:else}
    <h1>No story selected</h1>
    <p>This is where intro content goes</p>
    <p>Click in the graph to select a story</p>
{/if}


<style>
    h1 {
        padding: 0;
        margin: 0;
        font-size: 28px;
    } 

</style>