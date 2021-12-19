import {StoryType} from "./StoryTypes";

/*

STORY AUTHORSHIP IS HANDLED HERE!

StoryContent is a singleton that contains a StoryCollection and is the source of truth
for the content in this experience. The moments in RoleMoments.svelte are
pulled from this object. The GraphData to display in Graph.svelte
is generated at runtime as an object consumed by the Cytoscape library.

Paths are relative to public/index.html, so please start from root ("content/foo.jpg" with no leading slash)

 */

class StoryContent {

    //// Source of truth for app story content! ////
    readonly StoryCollection = new StoryType.StoryCollection();
    readonly GraphData = [];

    readonly AmbientIntroAudio = "./static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3"

    constructor() {
        console.log("StoryContent constructed")

        const story1 = new StoryType.Story(
            "KRS-One battles Melle Mel and ushers in the Golden Era of Hip-Hop",
            "the moment when the golden age took hold",
            [],
            "static/audio/instrumentals/Grandmaster Melle Mel & the Furious Five - Pump Me Up (Instrumental).mp3",
            "static/images/edit/12_bdp_redalert.jpg",
            this.StoryCollection)

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "Melle Mel is onstage challenging any of the younger MCs to a rap battle",
                "Melle Mel",
                "KRS-One",
                "I'm at step 1-1",
                "static/audio/instrumentals/Grandmaster Melle Mel & the Furious Five - Pump Me Up (Instrumental).mp3",
                "static/foo.png"
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "Paradise helps KRS-One onstage",
                "Paradise",
                "KRS-One",
                "I'm a at step 1-2",
                "static/audio/Melle Mel - Pump Me Up.mp3",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "KRS-One freestyles, then ends his freestyle asking the crowd, \"Who won?\"",
                "KRS-One",
                "KRS-One",
                "I'm at step 1-3",
                "static/audio/instrumentals/Boogie Down Productions - Poetry (Instrumental).mp3",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "KRS-One and DJ Scott La Rock conclusively leave their mark",
                "KRS-One",
                "DJ Scott La Rock",
                "Though Melle also freestyled and protested, KRS-One had won the crowd over. Hip-hop fans craved the new sound and the new messages that the \"Golden Age\" brought",
                "static/audio/instrumentals/Boogie Down Productions - Poetry (Instrumental).mp3",
                ""
            )
        )

        const story2 = new StoryType.Story(
            "Audio Two's \"Top Billin'\" rocks the LQ",
            "Paradise convinces Red Alert to give the B-side a try",
            [],
            "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
            "static/images/edit/AudioTwo_AlbumArt.jpg",
            this.StoryCollection)

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Audio Two manager brought \"Make It Funky\" to Red Alert",
                "Audio Two",
                "DJ Red Alert",
                "Red Alert rejected it vehemently",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Audio Two manager brought the B-side \"Top Billin'\" to Paradise and DJ Roman",
                "Audio Two",
                "Paradise",
                "They played it and immediately knew it would be a hit",
                "static/audio/Audio Two - Make It Funky.mp3",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Paradise convinces DJ Red Alert to play \"Top Billin'\"",
                "Paradise",
                "DJ Red Alert",
                "text",
                "static/audio/Audio Two - Top Billin.mp3",
                ""
            )
        )


        story2.appendStepToStory(
            new StoryType.StoryStep(
                "DJ Red Alert plays \"Top Billin'\" in the LQ",
                "DJ Red Alert",
                "Audio Two",
                "He played it 3 times in a row",
                "static/audio/Audio Two - Top Billin.mp3",
                ""
            )
        )

        const story3 = new StoryType.Story(
            "Boogie Down Productions breaks through with \"South Bronx\"",
            "Scott La Rock and KRS-One become a force for \"conscious hip-hop\" and instantly change the game",
            [],
            "static/audio/Boogie Down Productions - South Bronx.mp3",
            "static/images/edit/17_scott_krsone.jpg",
            this.StoryCollection)

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "Scott La Rock encounters KRS-One in a shelter",
                "DJ Scott La Rock",
                "KRS-One",
                "text 1",
                "static/audio/instrumentals/Boogie Down Productions - South Bronx (Instrumental).mp3",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "KRS-One impresses Scott La Rock with his sharp lyricism and perspective",
                "KRS-One",
                "DJ Scott La Rock",
                "text 2",
                "static/audio/instrumentals/Boogie Down Productions - South Bronx (Instrumental).mp3",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "They form Boogie Down Productions",
                "KRS-One",
                "DJ Scott La Rock",
                "text 3",
                "static/audio/Boogie Down Productions - South Bronx.mp3",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "DJ Red Alert plays \"South Bronx\" in the LQ",
                "DJ Red Alert",
                "KRS-One",
                "text 3",
                "static/audio/Boogie Down Productions - South Bronx.mp3",
                ""
            )
        )

        const story4 = new StoryType.Story(
            "Eric B. and Rakim enter the scene with \"Eric B. Is President\"",
            "Rakim brought his intricate lyricism and Islamic influences. Eric B & Rakim quickly left their mark on the culture",
            [],
            "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
            "static/images/edit/10_ericb_rakim.jpg",
            this.StoryCollection)

        story4.appendStepToStory(
            new StoryType.StoryStep(
                "title 1",
                "Rakim",
                "Eric B",
                "text 1",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                ""
            )
        )

        story4.appendStepToStory(
            new StoryType.StoryStep(
                "title 2",
                "Eric B",
                "Rakim",
                "text 2",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                ""
            )
        )

        story4.appendStepToStory(
            new StoryType.StoryStep(
                "title 3",
                "DJ Red Alert",
                "Eric B",
                "text 3",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                ""
            )
        )

        story4.appendStepToStory(
            new StoryType.StoryStep(
                "title 4",
                "Rakim",
                "Eric B",
                "text 4",
                "static/audio/instrumentals/Rakim - Paid In Full (Instrumental).mp3",
                ""
            )
        )

        const story5 = new StoryType.Story(
            "Public Enemy brings a new attitude to the LQ",
            "The club was shocked when they arrived with fake Uzis",
            [],
            "static/audio/instrumentals/Public Enemy - Public Enemy No. 1 (Instrumental).mp3",
            "static/images/edit/07_publicenemy.jpg",
            this.StoryCollection)

        story5.appendStepToStory(
            new StoryType.StoryStep(
                "Public Enemy arrives at the LQ",
                "Public Enemy",
                "Paradise",
                "Their suitcases are full of fake Uzi machine guns",
                "static/audio/instrumentals/Public Enemy - Public Enemy No. 1 (Instrumental).mp3",
                ""
            )
        )

        story5.appendStepToStory(
            new StoryType.StoryStep(
                "Melle Mel hates them",
                "Melle Mel",
                "Public Enemy",
                "text 2",
                "static/audio/instrumentals/Public Enemy - Public Enemy No. 1 (Instrumental).mp3",
                ""
            )
        )

        story5.appendStepToStory(
            new StoryType.StoryStep(
                "They perform and influence the culture",
                "Public Enemy",
                "Public Enemy",
                "text 3",
                "static/audio/instrumentals/Public Enemy - Public Enemy No. 1 (Instrumental).mp3",
                ""
            )
        )

        story5.appendStepToStory(
            new StoryType.StoryStep(
                "Also, they end up friends with Melle Mel",
                "Public Enemy",
                "Melle Mel",
                "text 3",
                "static/audio/instrumentals/Public Enemy - Public Enemy No. 1 (Instrumental).mp3",
                ""
            )
        )

        const story6 = new StoryType.Story(
            "Stetsasonic becomes \"the first Hip-Hop Band\"",
            "South Africa, \"Africans are dying for the gold we're wearing\"s",
            [],
            "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
            "static/images/edit/14_stet.jpg",
            this.StoryCollection)

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Stetsasonic does a live performance with Bobby Simmons from the LQ",
                "Stetsasonic",
                "Bobby Simmons",
                "text 1",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
                ""
            )
        )

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Go Stetsa is the anthem of the LQ",
                "Stetsasonic",
                "Bobby Simmons",
                "4 MCs onstage, \"hip hop band\"",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
                ""
            )
        )

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Stetsasonic influences conscious hip-hop",
                "Stetsasonic",
                "Bobby Simmons",
                "Stetsasonic influences conscious hip-hop",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
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
                if (step.Target && !actorData.has(step.Target)) {
                    actorData.set(step.Target,
                        {id:step.Target, stories:{[storyTitle]: true}})
                } else if (step.Target) {
                    actorData.get(step.Target)["stories"][storyTitle] = true;
                }

                if (step.Source && !actorData.has(step.Source)) {
                    actorData.set(step.Source,
                        {id:step.Source, stories:{[storyTitle]: true}})
                } else if (step.Source) {
                    actorData.get(step.Source)["stories"][storyTitle] = true;
                }

                ////// modify storystep edges data to reflect this storyStep /////////
                if (step.Target && step.Source) { // we need to draw an edge
                    if (storyStepData.has(step.Title)) {
                        console.log("[generateGraphData] ERROR: storyStepData already has step with id = ", step.Title)
                    }
                    storyStepData.set(step.Title, {
                        id: step.Title,
                        source: step.Source,
                        target: step.Target,
                        story: storyTitle,
                    })
                }

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