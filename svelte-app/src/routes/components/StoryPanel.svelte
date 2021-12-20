<script lang="ts">

    import {storyManager} from "../../ts/StoryManager";
    import {storyContent} from "../../ts/StoryContent";
    import {push} from "svelte-spa-router";

    const {
        currentStory,
        currentStoryStep,
        currentStoryStepIdx,
        audioPaused,
        hoverStoryTitle,
        individualMode
    } = storyManager

    let snippetPaused = true

    $: console.log("[StoryPanel] currentStory is now ", $currentStory)
    $: console.log("[StoryPanel] currentStoryStepIdx is now ", $currentStoryStepIdx)
    $: console.log("[StoryPanel] audioPaused is now ", $audioPaused)

    function next() {
        storyManager.nextStoryStep();
    }

    function playSnippet() {
        $audioPaused = true
        snippetPaused = false;
    }

    function endSnippet() {
        $audioPaused = false
    }

    function done() {
        push('/end')
    }

</script>
{#if $currentStory}
    <h1>{$currentStory.Title}</h1>
    <h3>{$currentStoryStep.Title}</h3>
    {#if $currentStoryStep.ImagePath}
        <img src={$currentStoryStep.ImagePath} alt="header image" style="width: 100%; height:auto;">
    {/if}
    <!-- img IF ImagePath, audio IF AudioSnippetPath. audio has a play listener to pause the ambient -->
    <p>{$currentStoryStep.Text}</p>
    {#if $currentStoryStep.AudioSnippetPath}
        <p>
            <audio controls preload src="{$currentStoryStep.AudioSnippetPath}" bind:paused={snippetPaused}
                   on:play={playSnippet} on:pause={endSnippet} on:ended={endSnippet} >
                <track kind="captions">
            </audio>
        </p>
    {/if}

    <button class="btn" on:click={next}>NEXT</button>
{:else}
    <h1>{$hoverStoryTitle ? $hoverStoryTitle : "No story selected"}</h1>
    {#if $hoverStoryTitle}
        <p>{storyContent.StoryCollection.getStory($hoverStoryTitle).Summary}</p>
    {/if}
    <p><i>Hover over the connections in the graph to browse stories. Click any story to explore it.</i></p>
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

    h3 {
        font-family: var(--title-font);
        font-size: 21px;
        font-weight: bolder;
        color: white;
    }

    button {
        z-index: 100;
    }

    #done {
        margin-top: auto;
        display: block;
        padding: 0;
        width: 100%;
        text-align: center;
    }

    #done-btn {
        background: none;
        color: #ff8888 !important;
        font-weight: normal;
        text-decoration: underline;
    }


</style>