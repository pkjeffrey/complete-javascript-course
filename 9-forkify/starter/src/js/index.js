import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import {elements, renderLoader, clearLoader} from './views/base';

/**Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Liked recipes
 */
const state = {};

// search controller
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

elements.results.pages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goto = parseInt(btn.dataset.goto);
        searchView.clearRecipes();
        searchView.renderRecipes(state.search.recipes, goto);
    }
})

// recipe controller
async function controlRecipe() {
    const id = window.location.hash.replace('#', '');
    if (id) {
        if (state.search) searchView.hightlightSelected(id);
        state.recipe = new Recipe(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe.details);
        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            clearLoader();
            recipeView.renderRecipe(state.recipe);
        } catch (error) {
            alert('Error processing recipe!'); // doesn't alert. exception already caught?
        }
    }
}

['hashchange', 'load'].forEach(
    event => {window.addEventListener(event, controlRecipe)}
);
elements.recipe.details.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    }
});

window.l = new List();