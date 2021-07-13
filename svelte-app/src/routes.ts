// Components
import IntroPage from './routes/IntroPage.svelte'
import NotFound from './routes/NotFound.svelte'
import PersonalizationSurvey from './routes/PersonalizationSurvey.svelte'
import RoleExplore from './routes/RoleExplore.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': IntroPage,
    '/ps' : PersonalizationSurvey,
    '/role' : RoleExplore,

    // Catch-all, must be last
    '*': NotFound,
}