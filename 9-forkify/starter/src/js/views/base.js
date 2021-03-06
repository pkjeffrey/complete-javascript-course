export const elements = {
    search: {
        form: document.querySelector('.search'),
        input: document.querySelector('.search__field')
    },
    results: {
        results: document.querySelector('.results'),
        list: document.querySelector('.results__list'),
        pages: document.querySelector('.results__pages')
    },
    recipe: {
        details: document.querySelector('.recipe')
    },
    shopping: {
        list: document.querySelector('.shopping__list')
    },
    likes: {
        menu: document.querySelector('.likes__field'),
        list: document.querySelector('.likes__list')
    }
}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
        <div class="${elementStrings.loader}">
            <svg>
                <use href="img/icons.svg#icon-cw"></use>
            </svg>
        </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) {
        loader.parentElement.removeChild(loader);
    }
}