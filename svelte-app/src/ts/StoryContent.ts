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
            "A new MC's boldness wins over the Latin Quarter crowd, which kickstarts a new era.",
            [],
            "static/audio/instrumentals/Grandmaster Melle Mel & the Furious Five - Pump Me Up (Instrumental).mp3",
            "static/images/edit/12_bdp_redalert.jpg",
            this.StoryCollection)

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "Mele Mel challenges any young MC to a battle",
                "Mele Mel",
                "Mele Mel",
                "The year is 1987, and Grandmaster Mele Mel is a hip-hop legend with an ego. One night at the LQ," +
                " he arrives with a wad of cash and is determined to challenge any MC to a rap battle. Eventually, he " +
                "jumps onstage and announces his intentions to the crowd. KRS-One, a young MC with his own perspective, " +
                "accepts the challenge and is ready to prove his worth on the biggest hip-hop stage of the time.",
                "static/audio/instrumentals/Grandmaster Melle Mel & the Furious Five - Pump Me Up (Instrumental).mp3",
                "",
                "static/images/edit/03_melle.jpg"
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "Paradise helps KRS-One onstage",
                "Paradise",
                "KRS-One",
                "Paradise Gray, the host of the LQ, hands the mic to KRS-One, the MC of the group Boogie Down Productions. Later, KRS-One " +
                "described his surprise at the challenge: \"Mele Mel was my idol. He did 'The Message,' a song that " +
                "inspired my career, and now he was challenging me. The one you look up to is now in your face with " +
                "a beef.\"",
                "static/audio/instrumentals/Grandmaster Melle Mel & the Furious Five - Pump Me Up (Instrumental).mp3",
                "",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "KRS-One freestyles, then ends his freestyle asking the crowd, \"Who won?\"",
                "KRS-One",
                "Mele Mel",
                "KRS-One takes the mic and raps his freestyle, filling it with his characteristic complex rhymes " +
                "and alluding to themes of knowledge and social consciousness. KRS-One's confidence and individuality " +
                "captivates the crowd. He ends his freestyle by asking the crowd, \"Who won?\" and without even hearing " +
                "Mele Mel's response, the crowd screams their approval. \n\n Boogie Down Productions - Poetry (1987)",
                "static/audio/instrumentals/Boogie Down Productions - Poetry (Instrumental).mp3",
                "static/audio/snippets/Boogie Down Productions - Poetry.mp3",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "KRS-One claims victory",
                "KRS-One",
                "Mele Mel",
                "Mele Mel jumps up and down on the stage and furiously demands the opportunity to respond. As " +
                "Paradise retells it: \"I gave him the mic and he rocked one of the hottest rhymes I ever heard. ... " +
                "It was an incredible rhyme, but the crowd had heard enough and was screaming at the top of their lungs " +
                "for KRS-One. \" ",
                "static/audio/instrumentals/Boogie Down Productions - Poetry (Instrumental).mp3",
                "",
                ""
            )
        )

        story1.appendStepToStory(
            new StoryType.StoryStep(
                "The \"Golden Age\" has arrived",
                "KRS-One",
                "KRS-One",
                "KRS-One's defeat of Mele Mel is the conclusive moment that marked the beginning of hip-hop's " +
                "\"Golden Age,\" where the old-school gave way to the individuality and creativity of the new-school. " +
                "KRS-One himself continues to inspire younger generations of socially-conscious MCs with his conscious " +
                "rap style that explicitly discusses history, police brutality, and systemic racism. \n\n" +
                "Boogie Down Productions - You Must Learn (1989)",
                "static/audio/instrumentals/Boogie Down Productions - Poetry (Instrumental).mp3",
                "static/audio/snippets/Boogie Down Productions - You Must Learn.mp3",
                ""
            )
        )

        const story2 = new StoryType.Story(
            "Audio Two's \"Top Billin'\" rocks the LQ",
            "Audio Two's \"Top Billin'\" surprises the LQ's main tastemaker and becomes an lasting classic.",
            [],
            "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
            "static/images/edit/AudioTwo_AlbumArt.jpg",
            this.StoryCollection)

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Audio Two works with Daddy-O of Stetsasonic",
                "Audio Two",
                "Stetsasonic",
                "Audio Two is made up of Brooklyn sibling duo MC Kirk \"Milk Dee\" Robinson and DJ Nat \"Gizmo\" " +
                "Robinson. In 1987, they worked with Daddy-O of Stetsasonic to produce the A-side \"Make It Funky\" " +
                "and the B-Side \"Top Billin'\" the latter of which includes a sample from Stetsasonic's \"Go Stetsa I.\"",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Audio Two manager brought the B-side \"Top Billin'\" to Paradise and DJ Roman",
                "Audio Two",
                "Paradise",
                "They played it and immediately knew it would be a hit",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "",
                "static/images/edit/AudioTwo_AlbumArt.jpg"
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "\"Make It Funky\" is a hit everywhere except for the LQ",
                "DJ Red Alert",
                "Audio Two",
                "Every hip-hop radio DJ in the city is playing Make It Funky, except for DJ Red Alert. He's the " +
                "club's prime time DJ and takes his job as the ultimate tastemaker very seriously. Red Alert is known " +
                "for refusing to play any record he doesn't like, and he's rejected \"Make It Funky\" repeatedly despite " +
                "Nat Robinson's pleas. \n\n Audio Two - Make It Funky (1987)",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "static/audio/snippets/Audio Two - Make It Funky.mp3",
                ""
            )
        )


        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Paradise Gray discovers a hidden gem",
                "Audio Two",
                "Paradise Gray",
                "Nat Robinson, the father of Milk Dee and Gizmo and owner of their record label, persists in " +
                "trying to convince the LQ to play one of Audio Two's tracks. Paradise Gray, the host of the LQ and a " +
                "luminary of hip-hop, agrees to listen to their record in hopes of finding something Red Alert would " +
                "be willing to play. When he flips the record over and plays the B-side \"Top Billin',\" he hears an instant hit." +
                "\n\n Audio Two - Top Billin' (1987)",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "static/audio/instrumentals/Audio Two - Top Billin'.mp3",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "Paradise convinces Red Alert to give Audio Two a chance",
                "Paradise Gray",
                "DJ Red Alert",
                "Paradise takes the record to Red Alert, his close friend. In response, Red Alert snatches the " +
                "vinyl and throws it across the room, screaming, \"This record is a Frisbee, and I'm tired of everybody " +
                "throwing it in my face! I already told Nat Robinson that I'm not feeling it!\" Paradise insists, and " +
                "when Red Alert finally listens to \"Top Billin',\" he decides to play it during his set at the club later that night. ",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "",
                ""
            )
        )

        story2.appendStepToStory(
            new StoryType.StoryStep(
                "DJ Red Alert plays \"Top Billin'\" in the club",
                "DJ Red Alert",
                "Audio Two",
                "When \"Top Billin'\" booms into the club, the crowd goes wild, and the song becomes an instant " +
                "classic and one of the LQ's anthems. While Audio Two was somewhat of a one-hit wonder, the song \"Top Billin'\" " +
                "has been sampled and remixed hundreds of times. It remains imprinted on hip-hop as its vocals, lyrics, " +
                "and beats can be heard across decades of hip-hop, including in songs by Eminem, Wale, and Ne-Yo.",
                "static/audio/instrumentals/Audio Two - Top Billin' (Instrumental).mp3",
                "",
                ""
            )
        )

        const story3 = new StoryType.Story(
            "Eric B. & Rakim enter the scene with \"My Melody\" ",
            "A night described as \"the most magical moment in Hip-Hop\" foreshadows the seismic impact of " +
            "Rakim, one of the most influential rappers in Hip-Hop history.",
            [],
            "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
            "static/images/edit/10_ericb_rakim",
            this.StoryCollection)

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "DJ Eric B. meets high-schooler Rakim",
                "Eric B.",
                "Rakim",
                "The story of \"My Melody\" begins outside of the Latin Quarter in 1986. Eric B., a DJ, was " +
                "searching for an MC to collaborate with when he first encountered Rakim and heard his mixtape. On " +
                "that tape was a groundbreaking rap style that was born from the teenage Rakim's love for jazz, R&B, " +
                "soul, disco, and other genres his family played at home. Together, Eric B. and Rakim create the A-side " +
                "single \"Eric B. Is President\" with its B-side \"My Melody.\" \n\nEric B. & Rakim - Eric B. Is President (1986)",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                "static/audio/snippets/Eric B. & Rakim - Eric B. Is President.mp3",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "DJ Red Alert plays \"My Melody\"",
                "DJ Red Alert",
                "Rakim",
                "\"My Melody\" makes its way into the hands of DJ Red Alert, who plays it at the Latin Quarter " +
                "one night. As the beat drops and Rakim's voice comes on, the entire club is astounded by the skill " +
                "and presence of this unknown MC. Daddy-O of Stetsasonic later said, \"That might even be my most " +
                "magical moment in Hip-Hop. ... I remember [\"My Melody\"] coming on and just thinking, ‘What " +
                "the hell is happening right now?’\" That night, DJ Red Alert plays \"My Melody\" three times in a row. " +
                "\n\nEric B. & Rakim - My Melody (1986)",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                "static/audio/snippets/Eric B. & Rakim - My Melody.mp3",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "The game has changed",
                "Rakim",
                "Rakim",
                "Rakim's lyricism incorporates multisyllabic internal rhyming, inventive rhythms, and a laid-back " +
                "literary style that contrasted the typical improvisational style of the time. DJ Clark Kent said, " +
                "\"The biggest change in Hip-Hop was Rakim. ... He changed the way everybody rap. And the way things " +
                "were spoken about. And that was definitively Latin Quarters days.\"",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                "",
                ""
            )
        )

        story3.appendStepToStory(
            new StoryType.StoryStep(
                "Rakim's impact on the form",
                "Rakim",
                "Rakim",
                "The Latin Quarter of 1986 is where old-school Hip-Hop gave way to the young, ambitious, and " +
                "creative artists of the future, and Rakim is a crucial part of this evolution. To this day, his " +
                "lyrics are exemplary and intricate, and he is a living legend that holds the title \"the God MC\" " +
                "to many. Artists like 50 Cent, Nas, Epik High, and Jay-Z have sampled and referenced Eric B. and " +
                "Rakim, often specifically mentioning \"Eric B. Is President\" and \"My Melody.\"" +
                "\n\nRakim - It's Been A Long Time (1997)",
                "static/audio/instrumentals/Eric B. & Rakim - Eric B. Is President (instrumental).mp3",
                "static/audio/snippets/Rakim - It's Been A Long Time.mp3",
                ""
            )
        )

        const story6 = new StoryType.Story(
            "Stetsasonic puts a new twist on Hip-Hop performance",
            "The first \"Hip-Hop Band\" moves their live instrumentals and Afrocentric themes into the mainstream.",
            [],
            "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
            "static/images/edit/14_stet.jpg",
            this.StoryCollection)

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "\"Go Stetsa I\" is created as a Brooklyn anthem with a unique sound",
                "Stetsasonic",
                "Stetsasonic",
                "The band Stetsasonic was a staple of the LQ community with DJs Prince Paul," +
                " Wise, keyboardist/drummer/DJ DBC, and rappers Daddy-O and Delite, and was one of the first " +
                "hip-hop groups to use live instruments. In 1986, they're in the studio recording a new song, " +
                "\"Go Stetsa I,\" where they add live drum fills in addition to beats from a drum machine. While " +
                "playing back the recorded tracks, they accidentally listen to the song with only the live drums " +
                "playing and realize they have hit upon a unique sound. \n\n Stetsasonic - Go Stetsa I (1986)",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
                "static/audio/snippets/Stetsasonic - Go Stetsa I.mp3",
                ""
            )
        )

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Stetsasonic and Bobby Simmons do a sensational live performance",
                "Bobby Simmons",
                "Stetsasonic",
                "At the time, Bobby Simmons was DJ Red Alert's back-up DJ at the Latin Quarter and a talented " +
                "drummer. One day, he approaches his friend Daddy-O with an idea – doing a performance of Go Stetsa I " +
                "that incorporates Bobby playing live drums. Bobby and Stetsasonic set up the Latin Quarter in an " +
                "unorthodox way: Bobby's drum kit doesn't fit on the stage, so it's set up on the dance floor. " +
                "The crowd, which already hailed \"Go Stetsa I\" as a staple of the LQ, is thrilled by the new setup. " +
                "By Stetsasonic's next album, Bobby is an official member of the band.",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
                "",
                ""
            )
        )

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Stetsasonic influences conscious hip-hop",
                "Stetsasonic",
                "Stetsasonic",
                "In addition to paving the way for future Hip-Hop bands such as The Roots, Stetsasonic " +
                "adds South African civil rights to the discourse in the larger hip-hop community. Their 1987 " +
                "song \"A.F.R.I.C.A.\" makes a strong statement against apartheid at a time when it wasn't widely " +
                "discussed in the Western world, let alone in hip-hop. With the song, Stetsasonic becomes one of the " +
                "first artists to focus on politics and social activism, an approach adopted soon after by other " +
                "artists like KRS-One and Public Enemy. \n\n Stetsasonic - A.F.R.I.C.A. (1987)",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
                "static/audio/snippets/Stetsasonic - A.F.R.I.C.A..mp3",
                ""
            )
        )

        story6.appendStepToStory(
            new StoryType.StoryStep(
                "Stetsasonic pioneers Afrocentrism in Hip-Hop culture",
                "Stetsasonic",
                "Stetsasonic",
                "Stetsasonic's legacy includes this social activism as well as their commitment to including " +
                "African and Black cultural heritage in their art. The Afrocentrism they championed is unmistakable " +
                "in today's hip-hop, such as in African music samples that appear in work by Tyler, the Creator, J. " +
                "Cole, and Missy Elliott.",
                "static/audio/instrumentals/Stetsasonic - Music for the Stetfully Insane.mp3",
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
    // For steps that are only about one person, put their name as both the source and target
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