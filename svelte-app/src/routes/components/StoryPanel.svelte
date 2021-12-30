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
        snippetPaused = false;
        $audioPaused = true
    }

    function endSnippet() {
        $audioPaused = false
    }

    function done() {
        push('/end')
    }

</script>
{#if $currentStory}
    <h1 class="min">{$currentStory.Title}</h1>
    <h3>{$currentStoryStep.Title}</h3>
    <!-- img IF ImagePath, audio IF AudioSnippetPath. audio has a play listener to pause the ambient -->
    <p>{$currentStoryStep.Text}</p>
    {#if $currentStoryStep.AudioSnippetPath}
        <p class="audio-title">{$currentStoryStep.AudioSnippetPath.substring(0, $currentStoryStep.AudioSnippetPath.lastIndexOf('.')).split("/").pop()}
    </p>
            <p>
            <audio controls preload src="{$currentStoryStep.AudioSnippetPath}" bind:paused={snippetPaused}
                   on:play={playSnippet} on:pause={endSnippet} on:ended={endSnippet}>
                <track kind="captions">
            </audio>
            </p>
    {/if}
    <button class="btn" on:click={next}>NEXT</button>


    {#if $currentStoryStep.ImagePath}
        <img src={$currentStoryStep.ImagePath} alt="header image" style="width: 100%; height:auto;">
    {/if}
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

    * {
        white-space: pre-line;
    }

    h1 {
        padding: 0;
        margin: 0 0 45px;
        font-size: 28px;
    }

    h1.min {
        font-size: 16px;
        color: var(--title-blue);
        font-style: italic;
    }

    h3 {
        font-family: var(--title-font);
        font-size: 26px;
        font-weight: normal;
        margin: 0 0 30px;
        color: white;
    }

    .audio-title {
        font-family: var(--allcaps-font);
        text-transform: uppercase;
        font-size: 16px;
        font-weight: bolder;
        color: white;
        padding-top: 30px;
        margin-bottom: 0;
    }

    button {
        z-index: 100;
        margin-top: 10px;
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