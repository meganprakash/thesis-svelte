<script lang="ts">
    import {fade} from 'svelte/transition'
    import {personalizationStore} from '../ts/PersonalizationStore';
    import Carousel from './components/Carousel.svelte'
    import {onMount} from "svelte";

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
                    In this experience, we’re going to focus on the interactions between MCs and DJs, who created the music that pounded through the LQ and ignited major cultural shifts in hip-hop at large. To this day, MCs speak their truth through their rapping and are the performers onstage who interact with the crowd. On the other hand, DJs created beats that anchor MCs’ performances or are the major tastemakers who choose what songs are played at clubs and on the radio.
</p><p>
                    It is this pairing that determined the mood of the entire LQ, where the entire club reacted to what the MCs and DJs were saying. The Latin Quarter was renowned for its crowd— in fact, it was the ultimate gatekeeper of artists’ success. As Paradise Gray says:

                </p>
                <p><b>Browse the moments, then choose one to explore.</b></p>

                <h2>“It was a very tough crowd to please; many legends and weak newcomers alike have been booed off the stage without mercy. But if you had phat beats and hot rhymes or your DJ’s skills were exceptional, there was no better club to rock!”
                    <br><i>- Paradise Gray, host/entertainment manager of the Latin Quarter</i>
                </h2>

            </div>
        </div>
        <div class="panel-cell img">
           <Carousel bind:role={$userRole}/>
        </div>

    </div>
</main>

<style>
    main {
        background-color: var(--panel-bg);
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