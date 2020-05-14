import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }
    async getRecipe() {
        try {
            const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            const recipe = result.data.recipe;
            this.title = recipe.title;
            this.author = recipe.publisher;
            this.image = recipe.image_url;
            this.url = recipe.source_url;
            this.ingredients = recipe.ingredients;
            this.calcServings();
            this.calcTime();
        } catch (error) {
            console.log(error);
            alert('Something went wrong :(');
        }
    }
    calcServings() {
        // assume always 4 servings
        this.serviings = 4;
    }
    calcTime() {
        // assume 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
}