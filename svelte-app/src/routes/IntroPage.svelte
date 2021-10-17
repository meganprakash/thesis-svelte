<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import { personalizationStore } from '../PersonalizationStore';
    import {storyManager} from "../ts/StoryManager";
    import {onMount} from "svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    const { init } = personalizationStore
    const {audioPaused} = storyManager

    function handleClick() {
        $init = true; // user has passed the Welcome page
        $audioPaused = false;
        push('/ps')
    }

</script>

<main in:fade="{{duration: 500}}">

    <h1>Welcome!</h1>
<div class="container">
            <div class="panel-cell text">
                <div id="main-text">
                    <p>
                        This is the intro page. It contains the introduction to the Latin Quarter experience, some
                        static intro text, and some
                        dynamically laid out images.
                    </p>
                    <p>
                        From this intro, the user clicks "Start" to enter the personalization survey.
                    </p>
                    <button class="btn" on:click={handleClick}>START</button>

                </div>
            </div>
            <div class="panel-cell img">
                <div id="carousel">
                <p> This is the photo carousel.
                </p>
                </div>
            </div>

</div>
</main>

<style>
    main {
        background-color: var(--panel-bg);
        min-height: 800px;
        padding-top: 50px;
    }

    #carousel {
        width: 100%;
        background-color: black;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: start;
        align-items: flex-start;
        align-content: start;
        padding: 50px;
    }
    .panel-cell {
        flex: 0 0 auto;
        margin: 30px;
        flex-grow: 1;
        flex-shrink: 1;
        height:100%;
        display: flex;
    }

    .panel-cell.text {
        flex-basis: 450px;
        max-width: 650px;
    }

    .panel-cell.img {
        flex-basis:500px;
        max-width: 800px;
    }

</style>