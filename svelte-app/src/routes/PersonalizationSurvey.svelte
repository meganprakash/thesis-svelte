<script>
    import {push} from 'svelte-spa-router'
    import {fade} from 'svelte/transition'
    import RangeSlider from "svelte-range-slider-pips";
    import {personalizationStore} from '../ts/PersonalizationStore';
    import {onMount} from "svelte";
    import BlockQuote from "./components/BlockQuote.svelte";

    onMount(() => {
        window.scrollTo(0, 0)
    })

    const {submitted, userRole, userColorHex, userInitials} = personalizationStore

    const color = '#263336'
    const barColor = '#388ca8'
    const sliderLabels = ["Not at all", "A little bit", "Somewhat", "Very", "Extremely"];

    // maybe weight some higher? like origin of hip hop
    let prompts = [
        {item: 'hip hop music', v: [2]},
        {item: 'hip hop culture', v: [2]},
        {item: 'the origin of hip-hop', v: [2]}
    ]

    // accessible color palette
    let colors = [
        "#8a3ffc",
        "#33b1ff",
        "#ff7eb6",
        "#fa4d56",
        "#d2a106",
        "#6fdc8c"
    ]
    let colorChoice = "#8a3ffc"
    let initialsChoice = '';

    function handleNext() {
        $submitted = true;
        $userInitials = initialsChoice
        $userColorHex = colorChoice
        push('/role')
    }

</script>

{(console.log("personalizationStore: \n ",
    "\nsubmitted: ", $submitted,
    "\nuserRole: ", $userRole,
    "\nuserInitials: ", $userInitials,
    "\nuserColorHex: ", $userColorHex), '')}

<main in:fade="{{duration: 500}}">

    <h1>Be yourself</h1>
    <div class="container">
        <div class="panel-cell text">
            <div id="main-text">
                <p>
                    Hip-hop culture is a collective creation, and the Latin Quarter was the epitome of this philosophy.
                    Every Friday and Saturday night, partiers and performers convened in Times Square
                </p>
                <p>
                    There are MCs, DJs, dancers, the crowd, fashion....
                    In this online experience, you’ll see a birds-eye view of some of the biggest moments of this era
                    and be able to retrace the steps of hip-hop greats.
                </p>
                <BlockQuote
                        quote="“No matter how big a rap star you were, no matter what your legendary status was, no matter if you were new and up-and-coming, we all hung out there because of the one common goal we all had, which was our love for hip-hop.”"
                        attr="— Mix Master Ice"
                        desc="DJ of UTFO"

                />
            </div>
        </div>
        <div class="panel-cell img">
            <div id="slider-cell">

                <h2>Customize a simple avatar to identify yourself
                </h2>

                <!-- color picker + initials -->
                <div id="color-picker">
                    <div id="dot-container">
                            <span id="dot"
                                  style="background-color: {colorChoice}">{initialsChoice}</span>
                    </div>
                    <h2>PICK A COLOR</h2>
                    <div id="colors">
                        {#each colors as colorOption}
                            <div class="color-tile" style="background-color: {colorOption}"
                                 on:click={()=> {colorChoice = colorOption}}></div>
                        {/each}
                    </div>
                    <h2>ENTER YOUR INITIALS</h2>
                    <input type="text" bind:value={initialsChoice}
                           onkeypress="return /[a-z]/i.test(event.key)"
                           id="initials" name="initials" maxlength="3"
                           title="Up to three letters" placeholder="Enter your initials">

                </div>
                <button class="btn" on:click={handleNext} disabled="{initialsChoice.length == 0}">NEXT</button>
            </div>

        </div>

    </div>
</main>

<style>
    main {
        background-image: url("../static/images/edit/bg-group-01.jpg");
        background-size: cover;
        min-height: 800px;
        padding-top: 50px;
    }

    #dot-container {
        height: 150px;
        padding-right: 30px;
        float: left;
        display: flex;
        align-items: center;
    }

    #color-picker {
        padding-top: 20px;
        width: 100%
    }

    .color-tile {
        height: 30px;
        width: 30px;
        display: inline-block;
        margin: 5px 10px 5px 0;
        cursor: pointer;
    }

    .btn {
        margin-top: 12px;
    }

    #dot {
        float: right;
        height: 100px;
        width: 100px;
        border-radius: 50%;
        color: white;
        font-family: var(--title-font);
        font-size: 28pt;
        align-items: center;
        justify-content: center;
        display: inline-flex;
    }

    #slider-cell {
        width: 80%;
        background-color: var(--modal-bg);
        border-radius: 7px;
        padding: 24px;
    }

    .slider {
        font-family: var(--text-font);
        font-size: 12pt;
        color: #fff;
        margin: 48px 0 48px 0;
        display: block;
    }

    .container {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        justify-content: start;
        align-items: flex-start;
        align-content: center;
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