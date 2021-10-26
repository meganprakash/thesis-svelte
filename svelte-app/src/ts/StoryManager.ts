import {writable, Writable, get} from "svelte/store";

/*

StoryManager contains all of the story content for the app, and provides top-level logic for
    handling story state and calling GraphUIManager to update the UI accordingly.

 */

class StoryManager {

    // Static array of Cytoscape graph data, is NOT used reactively
    // TODO create this from some usable story format


    constructor(
        public currentStory: Writable<string> = writable("init"),
        public currentStoryStep: Writable<number> = writable(0),
        public currentAudioPath: Writable<string> = writable(""), // TODO set ambient audio
        public audioPaused: Writable<boolean> = writable(true),
        public individualMode: Writable<boolean> = writable(true) // true: inactive edges hidden
    ) {
        this.currentStory = writable('init')
        console.log("StoryManager constructed")
        console.log("StoryManager: ", this)
    }

    public changeCurrentStory(newStory:string) {
        this.currentStory.set(newStory)
        this.currentStoryStep.set(0)

        console.log('[StoryManager.ts] currentStory: ', get(this.currentStory))
        // this.currentAudioPath.set( $audio_path )
    }

    public clearCurrentStory() {
        this.currentStory.set("init")
        this.currentStoryStep.set(0)

        console.log("[clearCurrentStory] currentStory: ", get(this.currentStory))
        // this.currentAudioPath.set( $ambient_audio )
    }

    public nextStoryStep() {

    }

}

// Export a singleton for everyone
export const storyManager = new StoryManager();