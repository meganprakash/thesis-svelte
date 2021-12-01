<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import {personalizationStore} from '../ts/PersonalizationStore';
    import {storyManager} from "../ts/StoryManager";
    import {onMount} from "svelte";
    import {npcManager} from "../ts/NPCManager";
    import BlockQuote from "./components/BlockQuote.svelte";

    onMount(() => {
        window.scrollTo(0, 0)
        npcManager.stopNPCanimation()
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
                    Point out inconsistencies from the metaphor -- e.g. this wasn’t like a single day in the club. It
                    captures major earth-shaking moments from the club’s x-year history
                    These moments have influenced hip-hop to this day and will continue to echo far into the future
                    Hip hop remains a living, breathing collaboration between artists who bring their authentic selves
                </p>
                <p>
                    The last chapter of book has lots of useful things
                    Also meeting of the minds to point out conscious hip hop and the legends who did more than influence
                    music

                </p>

            </div>
        </div>
        <div class="panel-cell img">
            <div>
            <BlockQuote
                    quote="“You have to understand this—there can’t be no other club like the L.Q. ... It was an oasis of
                    creativity. … You couldn’t get up there fronting you were somebody else. If you were fronting, you
                    would wait outside.”"
                    attr="— KRS—One"
                    desc="legendary MC and producer"
            />
                <div style="height: 100px;"></div>

            <BlockQuote
                    quote="“Music got conscious, music got boisterous. It was outspoken. It was no more time trying to pacify
                    things. We wanted to really make some sense.”"
                    attr="— Positive K"
                    desc="MC and songwriter"
            />
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
        height: 100%;
        display: flex;
    }

    .panel-cell.text {
        flex-basis: 450px;
        max-width: 650px;
    }

    .panel-cell.img {
        flex-basis: 500px;
        max-width: 800px;
    }

</style>