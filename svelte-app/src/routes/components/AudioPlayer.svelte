<script lang="ts">
    /*
        I'm an audio player external to any components. I don't do any logic of my own,
        I just subscribe to what the active audio should be and play it.
        Currently, I don't preload anything. I just live as a singleton mounted by
        the top-level App.svelte.
     */

    import {storyManager} from "../../ts/StoryManager";
    import Icon from "svelte-awesome";
    import {faVolumeMute, faVolumeUp, faPause} from "@fortawesome/free-solid-svg-icons"
    import {onMount} from "svelte";
    import tippy from 'tippy.js';
    const {currentAudioPath, audioPaused} = storyManager

    $: paused = $audioPaused

    let volume = 0.2

    // need to change audioPaused on load because the reactive paused = $audioPaused binding
    //      only works once $audioPaused changes
    onMount(() => {
        $audioPaused = true
    })

    tippy('#icon-div', {
        content: 'Toggle background music',
    })

    $: console.log("currentAudioPath set to ", $currentAudioPath, "and volume is ", volume)
    $: console.log("[AudioPlayer.svelte] $audioPaused = ", $audioPaused)
    $: console.log("[AudioPlayer.svelte] this.paused = ", paused)

    function toggleAudio() {
        volume === 0 ? volume = 0.2 : volume = 0;
    }

</script>
<div id="audio-container">
    <audio autoplay preload hidden src="{$currentAudioPath}" bind:volume bind:paused loop
    on:playable={$audioPaused = false}>
        <track kind="captions"/>
    </audio>
    <div class="inline" id="icon-div" on:click={toggleAudio}
         style="cursor: pointer; visibility: {$currentAudioPath ? 'visible' : 'hidden'}">
        <Icon data={function icon() {
                if ($audioPaused) {
                    return faPause
                } else if (volume === 0) {
                    return faVolumeMute
                } else {
                    return faVolumeUp
                }
               }()
             } scale="1.2"/>
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