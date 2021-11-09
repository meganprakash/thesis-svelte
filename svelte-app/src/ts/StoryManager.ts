import {writable, Writable, get} from "svelte/store";
import {storyContent} from "./StoryContent";
import {StoryType} from "./StoryTypes";
import {personalizationStore} from "./PersonalizationStore";

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
        public currentAudioPath: Writable<string> = writable(""), // TODO set ambient audio
        public audioPaused: Writable<boolean> = writable(true),
        public individualMode: Writable<boolean> = writable(true), // true: inactive edges hidden
    ) {
        console.log("StoryManager constructed")
        console.log("StoryManager: ", this)
        console.log("currentStory: ", get(this.currentStory))
    }

    public changeCurrentStory(title:string) {
        let story = storyContent.StoryCollection.getStory(title)
        this.currentStory.set(story)
        this.currentStoryStepIdx.set(0)
        this.currentStoryStep.set(story.StorySteps[0])

        console.log('[storyMananger.changeCurrentStory] currentStory: ', get(this.currentStory))
        // this.currentAudioPath.set( $audio_path ) // TODO actually do this in audioplayer
    }

    public clearCurrentStory() {
        this.currentStory.set(null)
        this.currentStoryStepIdx.set(0)
        this.currentStoryStep.set(null)

        // this.currentAudioPath.set( $ambient_audio )
    }

    public nextStoryStep() {
        let story = get(this.currentStory)
        console.log("[storyMananger.nextStoryStep] steps len = ", story.StorySteps.length)
        if (get(this.currentStoryStepIdx) < story.StorySteps.length - 1) {
            this.currentStoryStepIdx.update(n => n + 1)
            this.currentStoryStep.set(story.StorySteps[get(this.currentStoryStepIdx)])
        } else {
            this.currentStory.set(null)
            this.currentStoryStepIdx.set(0)
            this.currentStoryStep.set(null)
            if (get(this.individualMode) == true) {
                this.individualMode.set(false)
            }
        }
    }

    public getMoments(): StoryType.Moment[] {
        // for each story, get the id, printable title, photo, summary by role, audio
        let moments = [] as StoryType.Moment[]
        let collection = storyContent.StoryCollection

        for (const [storyTitle, story] of collection.Stories) {
            let m = new StoryType.Moment(storyTitle,
                get(personalizationStore.userRole) == "MC" ? story.SummaryMC : story.SummaryDJ,
                story.KeyAudioPath, story.KeyImagePath
            )
            moments.push(m)
        }
        console.log("[storyManager.getMoments] moments: ", moments)

        return moments
    }

}

// Export a singleton for everyone
export const storyManager = new StoryManager();