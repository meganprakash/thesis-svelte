<script lang="ts">
    /*
        I'm an audio player external to any components. I don't do any logic of my own,
        I just subscribe to what the active audio should be and play it.
        Currently, I don't preload anything. I just live as a singleton mounted by
        the top-level App.svelte.
     */

    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";
    import Icon from "svelte-awesome";
    import {music} from "svelte-awesome/icons"
    const {currentAudioPath, audioPaused} = storyManager
    $: console.log("currentAudioPath set to ", $currentAudioPath)

    let paused = $audioPaused
    let volume = 0.5

    onMount(() => {
        console.log("AudioPlayer is mounted");
        currentAudioPath.set("static/audio/GoStetsa.mp3")
        console.log("Set GoStetsa as current audio")
    })

    // add volume #, + and - buttons
</script>
<div id="audio-container">
    <audio autoplay hidden src="{$currentAudioPath}" bind:paused bind:volume>
        <track kind="captions" />
    </audio>
    <div class="inline"><Icon data={music} scale="1.5"/></div><div id="now-playing" class="inline">now playing: {$currentAudioPath}</div>
</div>

<style>
    #audio-container {
        border-radius: 3px;
        display: inline-block;
        float: right;
        position: relative;
        margin-right: 30px;
        margin-top: 40px;

        color: white;
        font-family: var(--text-font);
    }

    #now-playing {
        font-size: 12pt;
        color: #ddd;
    }

    .inline {
        display: inline-block;
        float: left;
        padding-right: 10px;
    }
</style>