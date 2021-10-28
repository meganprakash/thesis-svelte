/*

StoryCollection is generated from the complete story specification
Comprehensible by the StoryPanel.

Generate the story content offline with a ts script, turn it into
object literals that live in a StoryContent.ts file and are imported
by StoryManager and Graph??????

 */

export namespace StoryType {

    export class StoryCollection {
       // key = story title to detect name collisions
        Stories: Map<string, StoryType.Story>;

        constructor() {
            this.Stories = new Map<string, StoryType.Story>();
        }

        public addStoryToCollection(story:Story) {
            if (this.Stories.has(story.Title)) {
                console.log("[addStoryToCollection] ERROR: StoryCollection already has a story with title = ", story.Title)
            } else {
                this.Stories.set(story.Title, story)
            }
        }

        public getStory(title:string): StoryType.Story {
            return this.Stories.get(title)
        }
    }

    export class Story {
        Title:string
        SummaryDJ:string
        SummaryMC:string
        StorySteps:StoryStep[]
        KeyAudioPath:string // play in role_moments.svelte

        constructor(Title: string, SummaryDJ: string, SummaryMC: string, StorySteps: StoryType.StoryStep[], KeyAudioPath: string, Collection:StoryCollection = null) {
            this.Title = Title;
            this.SummaryDJ = SummaryDJ;
            this.SummaryMC = SummaryMC;
            this.StorySteps = StorySteps;
            this.KeyAudioPath = KeyAudioPath;
            if (Collection !== null) Collection.addStoryToCollection(this)
        }

        public appendStepToStory(step:StoryStep) {
            this.StorySteps.push(step)
        }
    }

    export class StoryStep {
        Title: string
        Source: string
        Target: string
        DJText: string
        MCText: string
        AudioPath: string
        ImagePath: string


        constructor(Title: string, Source: string, Target: string, DJText: string, MCText: string, AudioPath: string, ImagePath: string) {
            this.Title = Title;
            this.Source = Source;
            this.Target = Target;
            this.DJText = DJText;
            this.MCText = MCText;
            this.AudioPath = AudioPath;
            this.ImagePath = ImagePath;
        }
    }

}
