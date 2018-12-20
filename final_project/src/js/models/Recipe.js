import axios from 'axios';
import { key, key2 } from '../../../keys/key';

export default class Recipe {
  constructor(id) {
    this.id = id;
  }

  async getRecipe() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`,
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
}
