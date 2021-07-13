<script lang="ts">
    import {link} from 'svelte-spa-router'
</script>
<main>
    <a href="/" use:link><div id="logo"> THE LATIN QUARTER VIRTUAL EXPERIENCE </div></a>

</main>

<style>
    main {
        height: 70px;
        background-color: var(--header-bg);
        border-bottom: 1px var(--header) solid;
        position: relative;
    }

    #logo {
        color: var(--header);
        font-family: var(--allcaps-font);
        font-size: 16pt;
        letter-spacing: 2px;
        position: absolute;
        top: 50%;
        text-align: center;
        margin-left: 30px;
    }
</style>