<script lang="ts">
    import {link} from 'svelte-spa-router'
    import AudioPlayer from "./AudioPlayer.svelte";
</script>
<main>
    <a href="/" use:link><div id="logo"> THE LATIN QUARTER VIRTUAL EXPERIENCE </div></a>
    <AudioPlayer id="audio-player"/>
</main>

<style>
    main {
        height: 70px;
        background-color: var(--header-bg);
        border-bottom: 1px var(--header) solid;
        position: relative;
        display: block;
    }

    #logo {
        color: var(--header);
        font-family: var(--allcaps-font);
        font-size: 16pt;
        letter-spacing: 2px;
        position: relative;
        top: 40px;
        text-align: center;
        margin-left: 30px;
        float:left;
    }

    a {
        display: inline-block;
        float:left;
    }

    #audio-player {
        right: 30px;
        max-width: 100px;
        margin-right: 30px;
        display: inline-block;
        position: relative;
    }
</style>