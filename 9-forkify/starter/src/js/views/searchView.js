import {elements} from './base';

export const getInput = () => elements.search.input.value;
export const clearInput = () => {elements.search.input.value = ''};
export const clearRecipes = () => {elements.results.list.innerHTML = ''};

export const renderRecipes = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = start + resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderPageButtons(page, recipes.length, resultsPerPage);
}

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

function renderPageButtons(page, numResults, resultsPerPage) {
    const pages = Math.ceil(numResults / resultsPerPage);
    let markup = '';
    if (page > 1) {
        markup += `
            <button class="btn-inline results__btn--prev" data-goto=${page - 1}>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-left"></use>
                </svg>
                <span>Page ${page - 1}</span>
            </button>`;
    }
    if (page < pages) {
        markup += `
            <button class="btn-inline results__btn--next" data-goto=${page + 1}>
                <span>Page ${page + 1}</span>
                <svg class="search__icon">
                    <use href="img/icons.svg#icon-triangle-right"></use>
                </svg>
            </button>`;
    }
    elements.results.pages.innerHTML = markup;
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