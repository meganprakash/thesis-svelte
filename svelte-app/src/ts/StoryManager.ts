import {writable, Writable, get} from "svelte/store";
import {storyContent} from "./StoryContent";
import {StoryType} from "./StoryTypes";

/*

StoryManager handles the current state of the app. It publishes the current state information
for other modules to subscribe to and change accordingly.

 */

class StoryManager {

    constructor(
        public individualStoryChoice: Writable<StoryType.Story> = writable(null),
        public currentStory: Writable<StoryType.Story> = writable(null),
        public currentStoryStepIdx: Writable<number> = writable(0),
        public currentStoryStep: Writable<StoryType.StoryStep> = writable(null),
        public currentAudioPath: Writable<string> = writable(storyContent.AmbientIntroAudio),
        public hoverStoryTitle: Writable<string> = writable(null),
        public audioPaused: Writable<boolean> = writable(false),
        public individualMode: Writable<boolean> = writable(true), // true: inactive edges hidden
    ) {
        console.log("StoryManager constructed")
        console.log("StoryManager: ", this)
        console.log("currentStory: ", get(this.currentStory))
    }

    public pauseAmbientAudio() {
        this.audioPaused.set(true)
    }

    public changeCurrentStory(title:string) {
        let story = storyContent.StoryCollection.getStory(title)
        this.currentStory.set(story)
        this.currentStoryStepIdx.set(0)
        this.currentStoryStep.set(story.StorySteps[0])

        console.log('[storyMananger.changeCurrentStory] currentStory: ', get(this.currentStory))
        this.currentAudioPath.set( story.StorySteps[0].AmbientAudioPath )
        this.audioPaused.set(false)
    }

    public clearCurrentStory() {
        this.currentStory.set(null)
        this.currentStoryStepIdx.set(0)
        this.currentStoryStep.set(null)
        this.currentAudioPath.set( storyContent.AmbientIntroAudio)
        this.audioPaused.set(false)
    }

    public nextStoryStep() {
        let story = get(this.currentStory)
        console.log("[storyMananger.nextStoryStep] steps len = ", story.StorySteps.length)
        if (get(this.currentStoryStepIdx) < story.StorySteps.length - 1) {
            this.currentStoryStepIdx.update(n => n + 1)
            this.currentStoryStep.set(story.StorySteps[get(this.currentStoryStepIdx)])
            this.currentAudioPath.set(story.StorySteps[get(this.currentStoryStepIdx)].AmbientAudioPath)
            this.audioPaused.set(false);
        } else {
            this.clearCurrentStory()
            // are we leaving individual mode?
            if (get(this.individualMode) == true) {
                this.individualMode.set(false)
            }
        }
    }

    public prevStoryStep() {
        let story = get(this.currentStory)
        if (get(this.currentStoryStepIdx) > 0) { // not first step
            this.currentStoryStepIdx.update(n => n - 1)
            this.currentStoryStep.set(story.StorySteps[get(this.currentStoryStepIdx)])
            this.currentAudioPath.set(story.StorySteps[get(this.currentStoryStepIdx)].AmbientAudioPath)
            this.audioPaused.set(false)
        }
        // if not first step, won't go back (also storypanel won't show back button)
    }

    public getMoments(): StoryType.Moment[] {
        // for each story, get the id, printable title, photo, summary by role, audio
        let moments = [] as StoryType.Moment[]
        let collection = storyContent.StoryCollection

        for (const [storyTitle, story] of collection.Stories) {
            let m = new StoryType.Moment(storyTitle, story.Summary,story.KeyAudioPath, story.KeyImagePath)
            moments.push(m)
        }
        console.log("[storyManager.getMoments] moments: ", moments)

        return moments
    }

}

// Export a singleton for everyone
export const storyManager = new StoryManager();