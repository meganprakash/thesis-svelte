// Components
import IntroPage from './routes/IntroPage.svelte'
import NotFound from './routes/NotFound.svelte'
import PersonalizationSurvey from './routes/PersonalizationSurvey.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': IntroPage,
    '/ps' : PersonalizationSurvey,

    // Catch-all, must be last
    '*': NotFound,
}