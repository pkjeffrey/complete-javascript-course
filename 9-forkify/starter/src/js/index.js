// get:    https://forkify-api.herokuapp.com/api/get?rId=47746

import Search from './models/Search';
import * as searchView from './views/searchView';
import {elements} from './views/base';

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
        await state.search.getResults();
        // TODO: render results on UI
        searchView.renderRecipes(state.search.recipes);
    }
}

elements.search.form.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
})