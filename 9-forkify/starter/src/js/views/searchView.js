import {elements} from './base';

export const getInput = () => elements.search.input.value;
export const clearInput = () => {elements.search.input.value = ''};
export const clearRecipes = () => {elements.results.list.innerHTML = ''};
export const renderRecipes = recipes => recipes.forEach(renderRecipe);

function renderRecipe(recipe) {
    const markup = `
        <li>
            <a class="results__link" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>`;
    elements.results.list.insertAdjacentHTML('beforeend', markup);
}

function limitRecipeTitle(title, limit = 20) {
    if (title.length > limit) {
        return title.split(' ').reduce((acc, cur) => {
            if (acc.length + 1 + cur.length <= limit) {
                acc += ' ' + cur;
            }
            return acc;
        }, '') + '&hellip;'
    }
    return title;
}