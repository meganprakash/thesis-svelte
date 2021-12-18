<script lang="ts">
    /*
        I'm an audio player external to any components. I don't do any logic of my own,
        I just subscribe to what the active audio should be and play it.
        Currently, I don't preload anything. I just live as a singleton mounted by
        the top-level App.svelte.
     */

    import {storyManager} from "../../ts/StoryManager";
    import Icon from "svelte-awesome";
    import {faVolumeMute, faVolumeUp} from "@fortawesome/free-solid-svg-icons"

    const {currentAudioPath, audioPaused} = storyManager

    let paused = $audioPaused
    let volume = 0.4

    $: console.log("currentAudioPath set to ", $currentAudioPath, "and volume is ", volume)

    function toggleAudio() {
        volume === 0 ? volume = 0.4 : volume = 0;
    }

    // add volume #, + and - buttons
</script>
<div id="audio-container">
    <audio autoplay preload hidden src="{$currentAudioPath}" bind:paused bind:volume loop>
        <track kind="captions"/>
    </audio>
    <div class="inline" on:click={toggleAudio} style="cursor: pointer; visibility: {$currentAudioPath ? 'visible' : 'hidden'}">
        <Icon data={volume === 0 ? faVolumeMute : faVolumeUp} scale="1.5"/>
    </div>
    <div id="now-playing" class="inline">
        {$currentAudioPath.substring(0, $currentAudioPath.lastIndexOf('.')).split("/").pop()}
        <!-- this makes just the filename without the extension lol -->
    </div>
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