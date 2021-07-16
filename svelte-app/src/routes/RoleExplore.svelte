<script lang="ts">
    import {fade} from 'svelte/transition'
    import {personalizationStore} from '../stores';
    import Carousel from './components/carousel.svelte'
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
        {$userRole} intro
    </h1>
    </div>
    <div class="container">
        <div class="panel-cell text">
            <div id="main-text">
                <p>
                    This is the role introduction page. It will contain some static text about the role, then
                    a carousel for browsing historical moments.
                </p>
                <p>
                    From this intro, the user browses the carousel and then picks a moment to move forward with.
                </p>

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

    #carousel {
        width: 100%;
        background-color: black;
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