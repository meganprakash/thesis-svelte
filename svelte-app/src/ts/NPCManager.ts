import {writable, Writable, get} from "svelte/store";
import {storyContent} from "./StoryContent";

// keep track of state for the NPC avatars

class NPCManager {

    // initial positions: pick a story to start
    // then set up callback for tick events every T milliseconds
    constructor(
        // key: name of NPC, val: {color, story.Title, storyStep.Title}
        // Graph.svelte listens
        public currentNPCState: Writable<Map<string, {color:string, storyTitle:string, stepIdx:number}>> = writable(new Map([
            ["AA", {color: "#8a3ffc", storyTitle: "Stetsasonic puts a new twist on hip-hop performance", stepIdx: 0}],
            ["BC", {color: "#33b1ff", storyTitle: "KRS-One battles Melle Mel and ushers in the Golden Era of hip-hop", stepIdx: 0}],
            ["Q", {color: "#6fdc8c", storyTitle: "Audio Two's \"Top Billin'\" rocks the LQ", stepIdx: 2}],
            ["NT", {color: "#ff7eb6", storyTitle: "Eric B. & Rakim enter the scene with \"My Melody\"", stepIdx: 1}]
        ])),
        // public ticker: Writable<boolean> = writable(false),
        public interval = null
    ) {
        console.log("NPCManager constructed. currentNPCState = ", this.currentNPCState)
    }

    // every tick, move avatars by random chance. need to know the next step
    //  in each story per npc. getNextState() by story and current step I guess.
    // Graph.svelte will listen for the tick event and reflect the new state.
    private tick() {
        let newState = new Map(get(this.currentNPCState))

        for( let [npcName, storyState] of newState) {
            if (Math.random() > 0.95) {
                newState.set(npcName, NPCManager.getNextState(storyState.color, storyState.storyTitle, storyState.stepIdx))
            }
        }

        this.currentNPCState.set(newState)
        // this.ticker.update(n => !n);
        // console.log("updated ticker = ", get(this.ticker))
        console.log("updated currentNPCState = ", get(this.currentNPCState))
    }

    // find the next step for this npc and return it
    private static getNextState(color:string, storyTitle:string, stepIdx: number): {color:string, storyTitle:string, stepIdx:number} {
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
        // this.ticker.set(true);
        this.interval = setInterval(() => this.tick(), 2000);
    }

    public stopNPCanimation() {
        if (this.interval) {
            clearInterval(this.interval)
        }
        console.log("stopNPCanimation()")
    }

}

// Export a singleton for everyone
export const npcManager = new NPCManager();