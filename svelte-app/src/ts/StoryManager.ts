import {writable, Writable} from "svelte/store";

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
                data: {id: 'a hello world', foo: 'bar'}
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
                data: {id: 'ab2', source: 'a hello world', target: 'b'}
            },

            { // edge ab
                data: {id: 'bc', source: 'c', target: 'b'}
            }
        ]

    constructor(
        public currentStory: Writable<string> = writable(null),
        public currentStoryStep: Writable<number> = writable(0),
        public currentAudioPath: Writable<string> = writable(""),
        public audioPaused: Writable<boolean> = writable(true),
        public individualMode: Writable<boolean> = writable(true) // true: inactive edges hidden
    ) {
        console.log("StoryManager constructed")
    }

    public changeCurrentStory(newStory:string) {
        this.currentStory.set(newStory)
        this.currentStoryStep.set(0)
        // this.currentAudioPath.set( $audio_path )
    }

    public clearCurrentStory() {
        this.currentStory.set(null)
        this.currentStoryStep.set(null)
        // this.currentAudioPath.set( $ambient_audio )
    }

    public nextStoryStep() {

    }

}

// Export a singleton for everyone
export const storyManager = new StoryManager();