// Components
import IntroPage from './routes/IntroPage.svelte'
import NotFound from './routes/NotFound.svelte'
import PersonalizationSurvey from './routes/PersonalizationSurvey.svelte'
import RoleExplore from './routes/RoleExplore.svelte'
import { wrap } from 'svelte-spa-router/wrap'
import { get } from 'svelte/store'
import { personalizationStore } from './stores'

// Export the route definition object
export default {
    // Exact path
    '/': IntroPage,
    '/ps' : wrap({
            component: PersonalizationSurvey,

            conditions: [ // has the user been to the intro page?
                (detail) => { return get(personalizationStore.init) }
            ]
        }),
    '/role' : wrap({
        component: RoleExplore,

        conditions: [ // has the user been through the personalization page?
            (detail) => {
                return get(personalizationStore.submitted)
            }
        ]
    }),

    // Catch-all, must be last
    '*': NotFound,
}