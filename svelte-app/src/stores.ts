import { derived, writable, Writable } from "svelte/store";

/*

PersonalizationStore holds the role and avatar personalization for the user.

bool init = True iff the user has been to the Personalization page
bool submitted = True iff the user has completed their personalization

Role userRole = MC or DJ
String userInitials = 3 chars, all caps
FOO userColor = color for avatar

use as:
import { personalizationStore } from 'stores'
const { userColor } = personalizationStore;
{$userColor}

 */

class PersonalizationStore {
    constructor(
        public init: Writable<boolean> = writable(false), // if false, user should be at the welcome page
        public submitted: Writable<boolean> = writable(false), // if false, user should be at the survey page
        public userRole: Writable<string> = writable(null),
        public userInitials: Writable<string> = writable(null),
        public userColorHex: Writable<string> = writable(null) // include the #
    ) { }

     public toString() {
        const vals = {
            "init": this.init,
            "submitted": this.submitted,
            "userRole": this.userRole,
            "userInitials": this.userInitials,
            "userColorHex": this.userColorHex,
        }

        return JSON.stringify(vals)

    }

    // get fullName() {
    //     // Use derived to access writable values and export as readonly
    //     return derived(
    //         [this.firstname, this.lastname],
    //         ([$firstName, $lastName]) => {
    //             return $firstName + " " + $lastName
    //         }
    //     )
    // }
}

// Export a singleton
export const personalizationStore = new PersonalizationStore();

// Allow for multiple stores (good for contexts)
// export const createMyFormStore = () => new MyFormStore();

/*

StateStore holds ...

 */