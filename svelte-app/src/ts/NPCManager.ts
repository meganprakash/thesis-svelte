import {writable, Writable, get} from "svelte/store";
import {storyContent} from "./StoryContent";

// keep track of state for the NPC avatars

class NPCManager {
    // should this be a singleton? probably
    // since the DOM avatars are being created and destroyed, NPCManager
    //    should be a singleton keeping track of all the NPC states
    //    instead of something like N avatar objects that have their
    //    own managers


    // initial positions: pick a story to start
    // then set up callback for tick events every T milliseconds
    constructor(
        // key: name of NPC, val: {color, story.Title, storyStep.Title}
        public currentNPCState: Map<string, {color:string, storyTitle:string, stepIdx:number}> = new Map([
            ["AA", {color: "#8a3ffc", storyTitle: "Story 1", stepIdx: 0}],
            ["BC", {color: "#33b1ff", storyTitle: "Story 2", stepIdx: 0}],
            ["Q", {color: "#6fdc8c", storyTitle: "Story 1", stepIdx: 1}],
            ["NT", {color: "#ff7eb6", storyTitle: "Story 2", stepIdx: 1}]
        ]),
        public ticker: Writable<boolean> = writable(false),
        public interval = null
    ) {
        console.log("NPCManager constructed. currentNPCState = ", this.currentNPCState)
        console.log("constructor ticker = ", get(this.ticker))
    }

    // every tick, move avatars by random chance. need to know the next step
    //  in each story per npc. getNextState() by story and current step I guess.
    // Graph.svelte will listen for the tick event and reflect the new state.
    private tick() {
        console.log("Current NPC state: ", this.currentNPCState)
        console.log("Current ticker = ", get(this.ticker))
        let newState = new Map(this.currentNPCState)
        console.log("newState: ", newState)

        for( let [npcName, storyState] of newState) {
            // TODO random int

            // if it's big enough, then advance npcName
            newState.set(npcName, NPCManager.getNextState(storyState.color, storyState.storyTitle, storyState.stepIdx))
        }

        this.currentNPCState = newState
        this.ticker.update(n => !n); // Graph.svelte listens
        console.log("updated ticker = ", get(this.ticker))
        console.log("updated currentNPCState = ", this.currentNPCState)
    }

    // find the next step for this npc and return it
    private static getNextState(color:string, storyTitle:string, stepIdx: number): {color:string, storyTitle:string, stepIdx:number} {
        console.log("NPCManager:getNextState()")
        let retTitle, retIdx
        let story = storyContent.StoryCollection.getStory(storyTitle)

        if (stepIdx < story.StorySteps.length - 1) {
            retIdx = stepIdx + 1
            retTitle = storyTitle
        } else {
            // if reached the end of the story, change to a random different story
            let storyTitles = Array.from(storyContent.StoryCollection.Stories.keys())
            retIdx = 0
            retTitle = storyTitles[Math.floor(Math.random() * storyTitles.length)]
            // not so performant, but right now I don't control the order of singleton construction (StoryCollection, StoryManager, etc)
        }

        return {color: color, storyTitle:retTitle, stepIdx:retIdx} // this format matches the currentNPCState map
    }

    public startNPCanimation() {
        this.interval = setInterval(() => this.tick(), 3000);
    }

    public stopNPCanimation() {
        clearInterval(this.interval)
        console.log("stopNPCanimation()")
    }

}

// Export a singleton for everyone
export const npcManager = new NPCManager();