/*

Content for the RoleExplore.svelte page. Each role has a set of moments, which correspond to a name, id number,
    image, blurb, and audio.

TODO how to manage background music? audio component in App.svelte, but have to be able to pause it
 */

// Moment content for the Carousel in RoleExplore.svelte
// Paths are relative to public/index.html, so please start from root ("content/foo.jpg" with no leading slash)
export class Moment {
    id: number
    title: string
    photoPath: string
    blurb: string
    audioPath: string
    constructor(id: number, title: string, photoPath:string, blurb: string, audioPath: string) {
        this.id = id
        this.title = title
        this.photoPath = photoPath
        this.blurb = blurb
        this.audioPath = audioPath
    }
}

export const mcMoments = [
    new Moment(0, "Moment Title 0", "static/foo.png", "This is the moment blurb", "static/foo.mp3"),

    new Moment(1, "Moment Title 1", "static/foo.png", "This is the moment blurb", "static/foo.mp3"),

    new Moment(2, "Moment Title 2", "static/foo.png", "This is the moment blurb", "static/foo.mp3"),

    new Moment(3, "Moment Title 3", "static/foo.png", "This is the moment blurb", "static/foo.mp3")
]

// Global content obj. Encode the text and ids for traversing the graph
/*



 */