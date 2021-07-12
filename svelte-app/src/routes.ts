// Components
import IntroPage from './routes/IntroPage.svelte'
import NotFound from './routes/NotFound.svelte'

// Export the route definition object
export default {
    // Exact path
    '/': IntroPage,

    // Catch-all, must be last
    '*': NotFound,
}