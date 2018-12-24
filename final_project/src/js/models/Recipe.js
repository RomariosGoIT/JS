import axios from 'axios';
import { key, key2 } from '../../../keys/key';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key2}&rId=${this.id}`,
      );
      if (!res.data.error) {
        this.title = res.data.recipe.title;
        this.author = res.data.recipe.publisher;
        this.image = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
      }
    } catch (error) {
      console.log(error);
    }
  }

  calcTime() {
    const numIng = this.ingredients.length;
    const periods = Math.ceil(numIng / 3);
    this.time = periods * 3;
  }

  calcSerivngs() {
    this.servings = 4;
  }

  parseIngredients() {
    const unitLong = [
      'tablespoons',
      'tablespoon',
      'ounces',
      'ounce',
      'teaspoons',
      'teaspoon',
      'cups',
      'pounds',
    ];
    const unitShort = [
      'tbsp',
      'tbsp',
      'oz',
      'oz',
      'tsp',
      'tsp',
      'cup',
      'pound',
    ];
    const unit = [...unitShort, 'kd', 'g'];
    const newIgredients = this.ingredients.map(el => {
      let ingredient = el.toLowerCase();

      unitLong.forEach((unit, i) => {
        ingredient = ingredient.replace(unit, unitShort[i]);
      });
      ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

      const arrIng = ingredient.split(' ');
      const unitIdx = arrIng.findIndex(el2 => unit.includes(el2));
      let objIng;

      if (unitIdx > -1) {
        let count;
        const arrCount = arrIng.slice(0, unitIdx);
        if (arrCount.length === 1) {
          count = eval(arrCount[0].replace('-', '+'));
          if (count) {
            let num = count.toString();
            if (num.length > 3) {
              count = Number(count.toFixed(1));
            }
          }
        } else {
          count = eval(arrCount.join('+'));
        }
        objIng = {
          count: arrCount[0] === '' ? 1 : count,
          unit: arrIng[unitIdx],
          ingredient: arrIng.slice(unitIdx + 1).join(' '),
        };
      } else if (parseInt(arrIng[0], 10)) {
        objIng = {
          count: parseInt(arrIng[0], 10),
          unit: '',
          ingredient: arrIng.slice(1).join(' '),
        };
      } else if (unitIdx === -1) {
        objIng = {
          count: 1,
          unit: '',
          ingredient,
        };
      }
      return objIng;
    });
    this.ingredients = newIgredients;
  }

  updateServing(type) {
    const newServing = type === 'dec' ? this.servings - 1 : this.servings + 1;

    this.ingredients.forEach(ing => {
      ing.count *= newServing / this.servings;
    });

    this.servings = newServing;
  }
}
