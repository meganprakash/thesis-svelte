<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import { personalizationStore } from '../ts/PersonalizationStore';
    import {storyManager} from "../ts/StoryManager";
    import {onMount} from "svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    function handleClick() {
    }

</script>

<main in:fade="{{duration: 500}}">

    <h1>Outro</h1>
<div class="container">
            <div class="panel-cell text">
                <div id="main-text">
                    <p>
                        This is the outro page. Great job, you made it!
                    </p>
                    <p>
                       Some takeaway material, maybe names the figures again.
                        Reference the user's personalization again
                    </p>
<!--                    <button class="btn" on:click={handleClick}>START</button>-->

                </div>
            </div>
            <div class="panel-cell img">
            </div>

</div>
</main>

<style>
    main {
        background-color: var(--panel-bg);
        min-height: 800px;
        padding-top: 50px;
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