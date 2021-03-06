import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';
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
            recipeView.renderRecipe(
                state.recipe,
                state.likes.isLiked(id)
            );
        } catch (error) {
            alert('Error processing recipe!'); // doesn't alert. exception already caught?
        }
    }
}

// shopping list controller
function controlList() {
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach(ing => {
        const item = state.list.addItem(ing.count, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });
}

// likes controller
function controlLikes() {
    const id = state.recipe.id;
    if (!state.likes.isLiked(id)) {
        const newLike = state.likes.addLike(id, state.recipe.title, state.recipe.author, state.recipe.image);
        likesView.renderLike(newLike);
        likesView.toggleLikeBtn(true);
    } else {
        state.likes.deleteLike(id);
        likesView.deleteLike(id);
        likesView.toggleLikeBtn(false);
    }
    likesView.toggleLikesMenu(state.likes.getNumLikes());
}

window.addEventListener('hashchange', controlRecipe);
window.addEventListener('load', () => {
    state.likes = new Likes();
    likesView.toggleLikesMenu(state.likes.getNumLikes());
    state.likes.likes.forEach(like => {likesView.renderLike(like)});
    controlRecipe();
})
// handle recipe button clicks
elements.recipe.details.addEventListener('click', e => {
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateServings(state.recipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateServings(state.recipe);
    } else if (e.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLikes();
    }
});
// handle shopping list button clicks
elements.shopping.list.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.itemid;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    } else if (e.target.matches('.shopping__count-value')) {
        const val = parseFloat(e.target.value, 10);
        state.list.updateCount(id, val);
    }
});