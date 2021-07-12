<script>
    // Import the router component
    import Router from 'svelte-spa-router'
    // Import the list of routes
    import routes from './routes'

    import Header from './routes/components/Header.svelte'
    import Footer from './routes/components/Footer.svelte'
</script>

<Header/>

<!-- Navigation links -->
<!--<ul>
	<li><a href="#/">Home</a></li>
	<li><a href="#/graph">Cytoscape</a></li>
</ul>-->

<!-- Show the router -->
<Router {routes} />
<Footer/>

<!-- Global styles for the app -->
<svelte:head>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil+Display:wght@600&family=Lato:ital,wght@0,400;0,700;1,400;1,700&family=Poppins:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:ital,wght@0,300;0,700;1,300;1,700&display=swap" rel="stylesheet">

</svelte:head>

<style>
	:global body { /* applies to <body> containing the svelte components */
		background-color: #291f1d;
        margin: 0;
        padding: 0;
	}

    :root {
        --header: #ff614f;
        --panel-bg: #111;
        --title-blue: #5caaff;
        --title-font: 'Josefin Sans', sans-serif;

        --button-blue: #0d82ff;
        --button-hover: #1370d4;
        --button-onpress: #1257a1;
        --button-text: #fff;

        --text-font: 'Lato', sans-serif;
    }

	:global h1 {
		color: #ccc;
        font-family: var(--title-font);
        font-weight: bold;
        font-style: italic;
        font-size: 40pt;
        letter-spacing: 2px;
        margin-top: 0;
        margin-bottom: 60px;
	}

    :global h2 {
        color: white;
        font-family: var(--title-font);
        font-weight: lighter;
        font-size: 18pt;
        letter-spacing: 2px;
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
        color: var(--button-text);
        font-size: 16px;
        letter-spacing: 1px;
        background: var(--button-blue);
        padding: 14px 22px 14px 22px;
        text-decoration: none;
        margin: 60px 0px 60px 0px;
        cursor: pointer;
    }

    :global .btn:hover {
        background: var(--button-hover);
        color: #ccc;
        text-decoration: none;
    }

    :global .btn:active {
        background: var(--button-onpress);
        color: #ccc;
        text-decoration: none;
    }


</style>