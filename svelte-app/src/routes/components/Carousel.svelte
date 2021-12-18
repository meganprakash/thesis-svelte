<script>
    import {Slidy} from 'svelte-slidy'
    import {storyManager} from "../../ts/StoryManager";
    import {push} from "svelte-spa-router";

    const {individualStoryChoice} = storyManager

    // For each story, get title, image, summary, audio from StoryContent
    // Limited to the first 3 stories from StoryContent
    // Set the $currentStory assignment

    let name = 'Slidy',
        index // current id in the Slidy carousel, reactive to <Slidy bind:index />

    console.log(storyManager.getMoments())

    const slidy = {
        slides: storyManager.getMoments().slice(3),
        timeout: 1000,
        index: 0,
        wrap: {
            id: 'slidy',
            width: '100%',
            height: '100%',
            padding: '0',
            align: 'middle',
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

    // submit() saves the story selection in StoryManager then moves to graph view
    function handleSubmit(id) {
        console.log("(Carousel) Selected story ", index, " which is title = '", id, "'")
        storyManager.changeCurrentStory(id)
        push("/gr")
    }

</script>

<!-- TODO preload audio files -->
<!-- <link rel="preload" as="audio" href="https://cdn.com/small-file.mp4"> -->

<div id="slidy-container">
    <h2 style="text-align: center">Browse the moments, then choose one to explore.</h2><br>
    <Slidy {...slidy} bind:index let:item key={(item)=>("slide + " + item.Title)}>
        <div class="slide">
            <img alt="{item.Title}" src="{item.ImagePath}"/>
            <article>
                <h2>{item.Title}</h2>
                <p>
                    {item.Summary}
                </p>
                <p>
                    <button class="btn" id="select-btn" on:click={() => handleSubmit(item.Title)}>SELECT</button>
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

</div>


<style>
    main {
        height: 800px;
    }

    #select-btn {
        margin-right: auto;
        margin-left: auto;
        margin-bottom: 30px;
        display: inline-block;
    }


    #slidy-container {
        display: inline-block;
        width: 100%;
        /*background: linear-gradient(90deg, rgba(17,17,17,1) 0%, rgba(0,0,0,0) 25%, rgba(0,0,0,0) 75%, rgba(17,17,17,1) 100%);*/
        z-index: 2;
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
        outline: 1px solid white;
    }

    :global(.slidy-dots li.active button) {
        background-color: white !important;
    }

    :global(#slidy button.arrow-right) {
        background-color: var(--header) !important;
        border-radius: 50% !important;
        color: white;
        font-weight: bold;
        font-family: var(--text-font);
        font-size: 25pt;
        -webkit-box-shadow: 0px 0px 9px 9px #111;
        box-shadow: 0px 0px 9px 9px #111;
    }


    :global(#slidy button.arrow-left) {
        background-color: var(--header) !important;
        border-radius: 50% !important;
        color: white;
        font-weight: bold;
        font-family: var(--text-font);
        font-size: 25pt;
        -webkit-box-shadow: 0px 0px 9px 9px #111;
        box-shadow: 0px 0px 9px 9px #111;
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