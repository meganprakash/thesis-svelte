<script lang="ts">

    import {storyManager} from "../../ts/StoryManager";
    const {currentStory} = storyManager
    const {currentStoryStep} = storyManager
</script>

<h1> Hello I'm StoryPanel </h1>
<p>this is story {$currentStory}</p>
<p>the current story step is {$currentStoryStep}</p>
<button class="btn">NEXT</button>

<style>
    h1 {
        padding: 0;
        margin: 0;
        font-size: 28px;
    } 

</style>