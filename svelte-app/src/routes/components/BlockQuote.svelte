<script>
    export let quote;
    export let attr;
    export let desc;
</script>

<main>
    <div class="quote">{@html quote}</div>
    <div class="attr">{@html attr}, <span class="desc">{@html desc}</span> </div>


</main>

<style>
    main {
        color: #eee;
        margin-top: 24px;
        display: block;
    }

    .quote {
        font-family: var(--allcaps-font);
        font-weight: bold;
        font-size: 20px;
        line-height: 200%;
        font-style: italic;
        color: var(--title-blue)
    }

    .attr {
        font-family: var(--allcaps-font);
        font-size: 17px;
        font-weight: bold;
        text-transform: uppercase;
        line-height: 150%;
        margin-top: 12px;
        color: var(--title-blue);
    }

    .desc {
        font-family: var(--allcaps-font);
        font-size: 14px;
        font-weight: bolder;
        text-transform: uppercase;
        line-height: 150%;
        margin-top: 12px;
        color: #3a79c1;
        font-style: italic;
    }

</style>