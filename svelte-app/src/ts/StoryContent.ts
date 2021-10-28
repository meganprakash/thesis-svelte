import {StoryType} from "./StoryTypes";

/*

STORY AUTHORSHIP IS HANDLED HERE!

StoryContent is a singleton that contains a StoryCollection and is the source of truth
for the content in this experience. The moments in RoleMoments.svelte are
pulled from this object. The GraphData to display in Graph.svelte
is generated at runtime as an object consumed by the Cytoscape library.

 */

class StoryContent {

    //// Source of truth for app story content! ////
    readonly StoryCollection = new StoryType.StoryCollection();
    readonly GraphData = [];

    constructor() {
        console.log("StoryContent constructed")

        const story1 = new StoryType.Story(
            "Story 1",
            "Hello DJ! This is the first story",
            "Hello MC! This is the first story",
            [],
            "",
            this.StoryCollection)

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "StoryStep 1-1",
                "DJ Red Alert",
                "KRS-One",
                "I'm a DJ at step 1-1",
                "I'm an MC at step 1-1",
                "",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "StoryStep 1-2",
                "DJ Red Alert",
                "KRS-One",
                "I'm a DJ at step 1-2",
                "I'm an MC at step 1-2",
                "",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "StoryStep 1-3",
                "KRS-One",
                "Public Enemy",
                "I'm a DJ at step 1-3",
                "I'm an MC at step 1-3",
                "",
                ""
            )
        )

        const story2 = new StoryType.Story(
            "Story 2",
            "Hello DJ! This is the second story",
            "Hello MC! This is the second story",
            [],
            "",
            this.StoryCollection)

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "StoryStep 2-1",
                "Melle Mel",
                "KRS-One",
                "I'm a DJ at step 2-1",
                "I'm an MC at step 2-1",
                "",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "StoryStep 2-2",
                "KRS-One",
                "Melle Mel",
                "I'm a DJ at step 2-2",
                "I'm an MC at step 2-2",
                "",
                ""
            )
        )
        console.log("[StoryContent()] StoryData = ", this.StoryCollection)
        this.GraphData = this.generateGraphData();
        console.log("[StoryContent()] GraphData = ", this.GraphData)
    }

    // make GraphData for Cytoscape from StoryData
    // Format: https://js.cytoscape.org/#notation/elements-json
    // making a 1D array of actor data and storystep data objects
    // actor data:  {id: 'djredalert', stories: {'a': true, 'b': true}}
    //      id: displayed on node; stories: the names of the stories that the actor is in
    //
    // storystep data: {id: 'redalert-to-krs-one', source: 'krsone', target: 'djredalert', story: 'a'}
    //      id: the name of the storystep; story: the story that owns this step
    generateGraphData(): object[] {
        let actorData = new Map<string, {}>(); // keyed by id to check for collisions
        let storyStepData = new Map<string, {}>(); // ^ ditto

        for (const [storyTitle, story] of this.StoryCollection.Stories) {

            for (const step of story.StorySteps) {
                ////// modify actor nodes data to reflect this storyStep ////////
                // if actorData doesn't have the target actor, add them to the Map with
                //      appropriate stories property value
                if (!actorData.has(step.Target)) {
                    actorData.set(step.Target,
                        {id:step.Target, stories:{[storyTitle]: true}})
                } else {
                    actorData.get(step.Target)["stories"][storyTitle] = true;
                }

                if (!actorData.has(step.Source)) {
                    actorData.set(step.Source,
                        {id:step.Source, stories:{[storyTitle]: true}})
                } else {
                    actorData.get(step.Source)["stories"][storyTitle] = true;
                }

                ////// modify storystep edges data to reflect this storyStep /////////
                if (storyStepData.has(step.Title)) {
                    console.log("[generateGraphData] ERROR: storyStepData already has step with id = ", step.Title)
                }
                storyStepData.set(step.Title, {
                    id:step.Title,
                    source:step.Source,
                    target:step.Target,
                    story:storyTitle,
                })

            }
        }

        console.log("[generateGraphData] finished actorData: ", actorData)
        console.log("[generateGraphData] finished storyStepData: ", storyStepData)

        let nodeObjs = Array.from(actorData.values()).map(obj => ({data:obj}))
        let edgeObjs = Array.from(storyStepData.values()).map(obj => ({data:obj}))
        return nodeObjs.concat(edgeObjs)
    }

}

export const storyContent = new StoryContent();