import {derived, writable, Writable} from "svelte/store";

/*

StoryManager contains all of the story content for the app, and provides top-level logic for
    handling story state and calling GraphUIManager to update the UI accordingly.

 */

class StoryManager {

    // Static array of Cytoscape graph data, is NOT used reactively
    // TODO create this from some usable story format
    readonly GraphData: Array<any> =
        [
            { // node a
                data: {id: 'a hello world'}
            },
            { // node b
                data: {id: 'b'}
            },

            { // node b
                data: {id: 'c'}
            },
            { // edge ab
                data: {id: 'ab', source: 'a hello world', target: 'b'}
            },

            { // edge ab
                data: {id: 'bc', source: 'c', target: 'b'}
            }
        ]

    constructor(
        public currentStory: Writable<string> = writable(null),
        public currentStoryStep: Writable<string> = writable(null),
        public currentAudioPath: Writable<string> = writable(""),
        public audioPaused: Writable<boolean> = writable(true)
    ) {
        console.log("StoryManager constructed")
        // this.currentStory.set("story 1")
        this.currentStoryStep.set("storystep 1")

    }
}

// Export a singleton for everyone
export const storyManager = new StoryManager();