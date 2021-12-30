<script>
    export let title;
    export let message;

    // https://github.com/flekschas/svelte-simple-modal
</script>

<main>
<h1>{title}</h1>
<p>
    {@html message}
</p>

</main>

<style>
    main {
        background-color: #333;
         padding: 20px;
    }

    h1 {
        font-size: 28px;
        margin: 0;
        padding: 0;
    }
</style>