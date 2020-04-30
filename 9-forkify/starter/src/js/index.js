// get:    https://forkify-api.herokuapp.com/api/get?rId=47746

import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements, renderLoader, clearLoader} from './views/base';

/**Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

async function controlSearch() {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query);
        searchView.clearInput();
        searchView.clearRecipes();
        renderLoader(elements.results.results);
        await state.search.getResults();
        clearLoader();
        searchView.renderRecipes(state.search.recipes);
    }
}

elements.search.form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})