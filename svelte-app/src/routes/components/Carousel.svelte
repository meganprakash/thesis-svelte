<script>
    import {get} from 'svelte/store'
    import {Slidy} from 'svelte-slidy'
    import {Moment, mcMoments} from "../../ts/role_moments";
    import {stateStore} from '../../stores'

    export let role = "--"
    // TODO receive callback for changing the bg of the parent (once i want to implement it);
    // TODO show sound icon maybe

    let name = 'Slidy',
        index // current id in the Slidy carousel, reactive to <Slidy bind:index />

    console.log(mcMoments)

    const slidy = {
        slides: mcMoments,
        timeout: 1000,
        index: 0,
        wrap: {
            id: 'slidy',
            width: '100%',
            height: '500px',
            padding: '0',
            align: 'center',
            alignmargin: 0,
        },
        slide: {
            gap: 20,
            width: '50%',
            height: '100%',
            backimg: false,
            imgsrckey: 'src',
            objectfit: 'cover', // 'contain' if changing dots to be under the photo
            overflow: 'hidden'
        },
        controls: {
            dots: true,
            dotsnum: false,
            dotsarrow: false,
            dotspure: true,
            arrows: true,
            keys: true,
            drag: true,
            wheel: false,
        },
        options: {
            axis: 'x',
            loop: false,
            duration: 250,
        }
    }

    // submit() saves the moment in StateStore then moves to global view
    function handleSubmit() {
        console.log("(Carousel) Selected index ", index)
        stateStore.momentId = index
        // TODO move to the global view
    }

</script>

<!-- TODO preload audio files -->
<!-- <link rel="preload" as="audio" href="https://cdn.com/small-file.mp4"> -->

<div id="slidy-container">
    <Slidy {...slidy} bind:index let:item key={(item)=>("slide + " + item.id)}>
        <div class="slide">
            <img alt="{item.title}" src="{item.photoPath}"/>
            <article>
                <h2>{item.title}</h2>
                <p>
                    {item.blurb}
                </p>
            </article>
        </div>

        <span slot="loader">
            <span class="spinner">
              <span class="double-bounce1"></span>
              <span class="double-bounce2"></span>
            </span>
        </span>
    </Slidy>

    <!-- TODO <audio> element that plays the current audio! use the index prop -->
    <button class="btn" on:click={handleSubmit}>SUBMIT</button>
</div>


<style>
    main {
        height: 800px;
        background-color: #16296b;
    }

    #slidy-container {
        display: inline-block;
        width: 100%
    }

    .slide {
        position: relative;
        display: flex;
        flex-flow: column;
        text-align: center;
        align-content: center;
        height: 100%;
        border-radius: 1rem;
    }

    .slide img {
        max-height: 200px;
        width: auto;
        height: 100%;
        box-sizing: border-box;
        vertical-align: middle;
        object-fit: cover;
        position: relative;
        z-index: 1;
    }

    .slide article {
        padding: 1rem;
    }

    :global(.slidy-dots li button) {
        background-color: var(--button-blue) !important;
    }

    :global(.slidy-dots li.active button) {
        background-color: white !important;
    }

    :global(#slidy button.arrow-right) {
        background-color: var(--button-hover) !important;
        border-radius: 50% !important;
        color: white;
        font-weight: bold;
        font-family: var(--text-font);
        font-size: 25pt;
    }


    :global(#slidy button.arrow-left) {
        background-color: var(--button-hover) !important;
        border-radius: 50% !important;
        color: white;
        font-weight: bold;
        font-family: var(--text-font);
        font-size: 25pt;
    }

    .spinner {
        width: 40px;
        height: 40px;
        position: relative;
        margin: 100px auto;
    }

    .double-bounce1, .double-bounce2 {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #333;
        opacity: 0.6;
        position: absolute;
        top: 0;
        left: 0;

        -webkit-animation: sk-bounce 2.0s infinite ease-in-out;
        animation: sk-bounce 2.0s infinite ease-in-out;
    }

    .double-bounce2 {
        -webkit-animation-delay: -1.0s;
        animation-delay: -1.0s;
    }

    @-webkit-keyframes sk-bounce {
        0%, 100% {
            -webkit-transform: scale(0.0)
        }
        50% {
            -webkit-transform: scale(1.0)
        }
    }

    @keyframes sk-bounce {
        0%, 100% {
            transform: scale(0.0);
            -webkit-transform: scale(0.0);
        }
        50% {
            transform: scale(1.0);
            -webkit-transform: scale(1.0);
        }
    }

</style>