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
        this.servings = 4;
    }
    calcTime() {
        // assume 15 min for each 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }
    parseIngredients() {
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
        const units = [...unitsShort, 'kg', 'g'];
        const newIngredients = this.ingredients.map(el => {
            // uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) => {
                ingredient = ingredient.replace(unit, unitsShort[i]);
            });
            // remove parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');
            // parse ingredients in to count, unit and ingredient
            const arrIng = ingredient.split(' ');
            const unitIndx = arrIng.findIndex(part => units.includes(part));
            let objIng;
            if (unitIndx > -1) {
                objIng = {
                    count: eval(arrIng.slice(0, unitIndx).join('+').replace('-', '+')),
                    unit: arrIng[unitIndx],
                    ingredient: arrIng.slice(unitIndx + 1).join(' '),
                    raw: el
                }
            } else if (parseInt(arrIng[0], 10)) {
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.slice(1).join(' '),
                    raw: el
                }
            } else {
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient,
                    raw: el
                }
            }
            return objIng;
        });
        this.ingredients = newIngredients;
    }
}