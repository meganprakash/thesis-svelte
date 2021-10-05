import { derived, writable, Writable } from "svelte/store";

/********

Svelte stores are singletons that components can subscribe to.
Components are notified and can dynamically update accordingly.

 ********/

/*

PersonalizationStore holds the role and avatar personalization for the user.

bool init = True iff the user has been to the Personalization page
bool submitted = True iff the user has completed their personalization

 userRole = MC or DJ
userInitials = 3 chars, all caps
userColor = color for avatar

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
        public userInitials: Writable<string> = writable("--"),
        public userColorHex: Writable<string> = writable("#555") // include the #
    ) { }
}

// Export a singleton
export const personalizationStore = new PersonalizationStore();

// Allow for multiple stores (good for contexts)
// export const createMyFormStore = () => new MyFormStore();