<script lang="ts">

    import {fade} from 'svelte/transition'
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
                    The moments you explored have influenced hip-hop to this day, and their effects will continue to echo far into the future. Since the days of the LQ, the arts of hip-hop beatmaking, rapping, dance, and fashion have crossed every continent.
                </p>
                <p>
                    As in the original Golden Era, people worldwide use hip-hop to speak their minds and represent themselves. Though trends may come and go, hip-hop remains a living, breathing culture that is woven from community.
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
                <div style="height: 30px;"></div>

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
        background-image: url("../static/images/edit/bg-posters-02.jpg");
        background-size: cover;
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