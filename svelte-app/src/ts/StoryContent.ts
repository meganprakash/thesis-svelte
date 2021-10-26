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
    readonly StoryData = new StoryType.StoryCollection();
    readonly GraphData = [];

    constructor() {
        const story1 = new StoryType.Story(
            "Story 1",
            "Hello DJ! This is the first story",
            "Hello MC! This is the first story",
            [],
            "",
            this.StoryData)

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
            this.StoryData)

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
    }

    // make GraphData for Cytoscape from StoryData
    // Format: https://js.cytoscape.org/#notation/elements-json
    // actor data:  {id: 'djredalert', stories: {'a': true, 'b': true}}
    //      id: displayed on node; stories: the names of the stories that the actor is in
    // storystep data: {id: '0', source: 'krsone', target: 'djredalert', story: 'a', step: 0}
    //      id: the name of the storystep; story: the story that owns this step
    generateGraphData() {

    }


    //
    // readonly GraphData =
    //     [
    //         {
    //             data: {id: 'djredalert', name: 'DJ Red Alert', stories: {'a': true, 'b': true}}
    //         },
    //         {
    //             data: {id: 'iou', name: 'IOU Dancers', stories: {'c': true}}
    //         },
    //
    //         {
    //             data: {id: 'krsone', name: "KRS One", stories: {'a': true}}
    //         },
    //         {
    //             data: {id: 'mellemel', name: "Melle Mel", stories: {'a': true, 'b': true}}
    //         },
    //         {
    //             data: {id: 'publicenemy', name: "Public Enemy", stories: {'b': true, 'c': true}}
    //         },
    //         {
    //             data: {id: '0', name: '0', source: 'krsone', target: 'djredalert', story: 'a', step: 0}
    //         },
    //         {
    //             data: {id: '1', name: '1', source: 'krsone', target: 'mellemel', story: 'a', step: 1}
    //         },
    //         {
    //             data: {id: '5', name: '5', source: 'krsone', target: 'djredalert', story: 'a', step: 2}
    //         },
    //         {
    //             data: {id: '2', name: '2', source: 'mellemel', target: 'publicenemy', story: 'b', step: 0}
    //         },
    //         {
    //             data: {id: '3', name: '3', source: 'publicenemy', target: 'djredalert', story: 'b', step: 1}
    //         },
    //         {
    //             data: {id: '4', name: '4', source: 'publicenemy', target: 'iou', story: 'c', step: 2}
    //         }
    //     ]

}

export const storyContent = new StoryContent();