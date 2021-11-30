<script lang="ts">

    import {fade} from 'svelte/transition'
    import {push} from 'svelte-spa-router'
    import {personalizationStore} from '../ts/PersonalizationStore';
    import {storyManager} from "../ts/StoryManager";
    import {onMount} from "svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    const {init} = personalizationStore
    const {audioPaused} = storyManager

    function handleClick() {
        $init = true; // user has passed the Welcome page
        $audioPaused = false;
        push('/ps')
    }

</script>

<main in:fade="{{duration: 500}}">

    <h1>Welcome to the virtual Latin Quarter!</h1>
    <div class="container">
        <div class="panel-cell text">
            <div id="main-text">
                <p>
                    You’ve made it to the virtual Latin Quarter nightclub! This is an online representation of the
                    birthplace of modern hip-hop, where you can see and hear the legendary moments that shaped hip-hop
                    and changed it forever.
                </p>
                <p>
                    Hip-hop is a form of music and culture that began on the streets of inner city New York City and has
                    since grown into a worldwide cultural phenomenon, a multibillion-dollar industry, and a global
                    medium for self-expression. In its early days, hip-hop music was only played late at night on
                    underground radio stations. However, in 1985, a small nightclub in Times Square ignited hip-hop’s
                    “Golden Era” by attracting the hottest MCs, DJs, dancers, and record labels, along with anyone who
                    wanted to witness the hip-hop movement at its loudest. That club was the Latin Quarter.
                </p>
                <p><b>Turn on sound for the best experience.</b></p>
                    <div class="quote"> “I used to work at Burger King / But after takin’ orders / I used to take the PATH /
                        to Latin Quarters ‘cross the waters.”
                <br/>- Queen Latifah, singer-songwriter, rapper, actress, and producer
                    <br/>“Jersey” New Jersey Drive Vol.1 (Tommy Boy) 1995 </div>
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