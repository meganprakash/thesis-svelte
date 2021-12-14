<script lang="ts">
    import {fade} from 'svelte/transition'
    import {personalizationStore} from '../ts/PersonalizationStore';
    import Carousel from './components/Carousel.svelte'
    import {onMount} from "svelte";
    import BlockQuote from "./components/BlockQuote.svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    const {userRole, userInitials, userColorHex} = personalizationStore

</script>

<main in:fade="{{duration: 500}}">

    <div id="title-container">
    <div id="dot-container">
            <span id="dot"
                  style="background-color: {$userColorHex}">{$userInitials}</span>
    </div>
    <h1>
        Entering the club
    </h1>
    </div>
    <div class="container">
        <div class="panel-cell text">
            <div id="main-text">
                <p>
                    Here are some of the legendary moments from LQ history, where hip-hop luminaries connected, collaborated, and clashed. Each one is a moment that lives on to this day as people tell and retell the stories, and as hip-hop artists continue to be influenced by these legendary performances.
</p><p>
                    In this experience, we’re going to focus on the interactions between MCs and DJs, who created the music that pounded through the LQ.
                It is this pairing that determined the mood of the LQ, where the entire club reacted to what the MCs and DJs were saying. The Latin Quarter was renowned for its crowd—in fact, it was the ultimate gatekeeper of artists’ success.

                </p>
                <BlockQuote
                    quote="“It was a very tough crowd to please; many legends and weak newcomers alike have been booed off the stage without mercy.”"
                    attr="— Paradise Gray"
                    desc="host/entertainment manager of the Latin Quarter"
                />

            </div>
        </div>
        <div class="panel-cell img">
           <Carousel/>
        </div>

    </div>
</main>

<style>
    main {
        background-image: url("../static/images/edit/bg-waiting-01.jpg");
        background-size: cover;
        min-height: 800px;
        padding-top: 50px;
    }

    h1 {
        display:inline-block;
        margin-left: 30px;
    }

    #title-container {
        display: inline-flex;
        align-items: center;
        justify-items: center;
    }

    #dot-container {
        padding-left: 80px;
        display: inline-block;
        align-items: start;
        height: 100%;
    }

    #dot {
        float: right;
        height: 70px;
        width: 70px;
        border-radius: 50%;
        color: white;
        font-family: var(--title-font);
        font-size: 23pt;
        align-items: center;
        justify-content: center;
        display: inline-flex;
        position: relative;
        top: 6px;
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