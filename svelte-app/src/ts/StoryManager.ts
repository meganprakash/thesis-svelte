import {writable, Writable, get} from "svelte/store";
import {write} from "fs";

/*

StoryManager contains all of the story content for the app, and provides top-level logic for
    handling story state and calling GraphUIManager to update the UI accordingly.

 */

class StoryManager {

    // Static array of Cytoscape graph data, is NOT used reactively
    // TODO create this from some usable story format
    readonly GraphData: Array<any> =
        [
            {
                data: {id: 'djredalert', name: 'DJ Red Alert', stories: {'a': true, 'b': true}}
            },
            {
                data: {id: 'iou', name: 'IOU Dancers', stories: {'c': true}}
            },

            {
                data: {id: 'krsone', name: "KRS One", stories: {'a': true}}
            },
            {
                data: {id: 'mellemel', name: "Melle Mel", stories: {'a': true, 'b': true}}
            },
            {
                data: {id: 'publicenemy', name: "Public Enemy", stories: {'b': true, 'c': true}}
            },
            {
                data: {id: '0', name: '0', source: 'krsone', target: 'djredalert', story: 'a', step: 0}
            },
            {
                data: {id: '1', name: '1', source: 'krsone', target: 'mellemel', story: 'a', step: 1}
            },
            {
                data: {id: '5', name: '5', source: 'krsone', target: 'djredalert', story: 'a', step: 2}
            },
            {
                data: {id: '2', name: '2', source: 'mellemel', target: 'publicenemy', story: 'b', step: 0}
            },
            {
                data: {id: '3', name: '3', source: 'publicenemy', target: 'djredalert', story: 'b', step: 1}
            },
            {
                data: {id: '4', name: '4', source: 'publicenemy', target: 'iou', story: 'c', step: 2}
            }
        ]

    constructor(
        public foo: string = '',
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
        console.log(this.foo)
        this.foo = "bar"
        console.log('[StoryManager.ts] currentStory: ', this.currentStory)
        this.currentStory = writable(newStory)
        this.currentStoryStep = writable(0)
        // this.currentAudioPath.set( $audio_path )
    }

    public clearCurrentStory() {
        console.log(this.foo)
        this.foo = "init"
        console.log("[clearCurrentStory] currentStory: ", get(this.currentStory))
        this.currentStory = writable("init")
        this.currentStoryStep = writable(0)
        // this.currentAudioPath.set( $ambient_audio )
    }

    public nextStoryStep() {

    }

}

// Export a singleton for everyone
export const storyManager = new StoryManager();