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
            console.log("[StoryCollection:getStory()] Getting story '", title, "'")
            return this.Stories.get(title)
        }
    }

    export class Story {
        Title:string
        Summary:string
        StorySteps:StoryStep[]
        KeyAudioPath:string // play in role_moments.svelte
        KeyImagePath:string

        constructor(Title: string, Summary: string, StorySteps: StoryType.StoryStep[], KeyAudioPath: string, KeyImagePath:string, Collection:StoryCollection = null) {
            this.Title = Title;
            this.Summary = Summary;
            this.StorySteps = StorySteps;
            this.KeyAudioPath = KeyAudioPath;
            this.KeyImagePath = KeyImagePath
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
        Text: string
        AmbientAudioPath: string
        AudioSnippetPath: string
        ImagePath: string


        constructor(Title: string, Source: string, Target: string, Text: string, AmbientAudioPath: string, AudioSnippetPath: string, ImagePath: string) {
            this.Title = Title;
            this.Source = Source;
            this.Target = Target;
            this.Text = Text;
            this.AmbientAudioPath = AmbientAudioPath;
            this.AudioSnippetPath = AudioSnippetPath;
            this.ImagePath = ImagePath;
        }
    }

    export class Moment {
        Title: string
        Summary: string
        AudioPath: string
        ImagePath: string
        constructor(title: string, summary:string, audioPath: string, imagePath:string) {
            this.Title = title
            this.Summary = summary
            this.ImagePath = imagePath
            this.AudioPath = audioPath
        }
    }
}
