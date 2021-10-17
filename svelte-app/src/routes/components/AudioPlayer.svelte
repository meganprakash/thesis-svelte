<script lang="ts">
    /*
        I'm an audio player external to any components. I don't do any logic of my own,
        I just subscribe to what the active audio should be and play it.
        Currently, I don't preload anything. I just live as a singleton mounted by
        the top-level App.svelte.
     */

    // TODO make this a bubble in the header bar that has a mute button!

    import {onMount} from "svelte";
    import {storyManager} from "../../ts/StoryManager";
    const {currentAudioPath, audioPaused} = storyManager
    $: console.log("currentAudioPath = ", $currentAudioPath)

    let paused = $audioPaused
    let volume = 0.5

    onMount(() => {
        console.log("AudioPlayer is mounted");
        currentAudioPath.set("static/audio/GoStetsa.mp3")
    })

</script>

    <audio autoplay hidden src="{$currentAudioPath}" bind:paused bind:volume>
        <track kind="captions" />
    </audio>