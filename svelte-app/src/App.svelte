<script>
    // Import the router component
    import Router, {replace} from 'svelte-spa-router'
    // Import the list of routes
    import routes from './routes'
    import Header from './routes/components/Header.svelte'
    import Footer from './routes/components/Footer.svelte'
    import AudioPlayer from "./routes/components/AudioPlayer.svelte";

    function conditionsFailed(event) {
        console.error('(Router) User missing initialization data', event.detail)
        replace('/')
    }
</script>

<Header/>
<Router {routes} on:conditionsFailed={conditionsFailed}/>
<Footer/>
<AudioPlayer/>

<!-- Global styles for the app -->
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@600&family=Lato:ital,wght@0,100;0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,100;0,400;1,400&display=swap" rel="stylesheet">

</svelte:head>

<style>
	:global body { /* applies to <body> containing the svelte components */
		background-color: var(--panel-bg);
        margin: 0;
        padding: 0;
	}

    :root {
        --header: #ff614f;
        --header-bg: #17120e;
        --panel-bg: #111;
        --title-blue: #5caaff;
        --title-font: 'Lato', sans-serif;

        --allcaps-font: 'Josefin Sans', sans-serif;

        --button-blue: #0d82ff;
        --button-hover: #1370d4;
        --button-onpress: #1257a1;
        --button-text: #fff;

        --modal-bg: #16296b;

        --text-font: 'Lato', sans-serif;
    }

	:global h1 {
		color: #ccc;
        font-family: var(--title-font);
        font-weight: lighter;
        font-size: 40pt;
        margin-top: 20px;
        margin-bottom: 0px;
        margin-left: 80px;
	}

    :global h2 {
        color: #eee;
        font-family: var(--allcaps-font);
        font-weight: bold;
        font-size: 13pt;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin: 14px 0 14px 0;
    }

	:global p {
		color: #eeeeee;
        font-family: 'Lato', sans-serif;
        font-size: 12pt;
        font-weight: normal;
        line-height: 1.7;

	}

    :global .btn {
        border-radius: 50px;
        width: auto;
        display: inline-block;
        font-family: 'Lato', sans-serif;
        color: var(--button-text) !important;
        font-size: 16px;
        text-decoration: none;
        letter-spacing: 1px;
        background: var(--button-blue);
        padding: 14px 22px 14px 22px;
        margin: 60px 0px 0px 0px;
        cursor: pointer;
        border: none
    }

    :global .btn:hover:enabled {
        background: var(--button-hover);
        color: #ccc !important;
        text-decoration: none;
    }

    :global .btn:active:enabled {
        background: var(--button-onpress);
        color: #aaa !important;
        text-decoration: none;
    }

    :global .btn:disabled {
        background: #555;
        color: #999 !important;
        cursor: auto;
    }

</style>