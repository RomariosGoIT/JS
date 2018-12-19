import axios from 'axios';
import { key, key2 } from '../../../keys/key';

export default class Search {
  constructor(query) {
    this.query = query;
    this.result;
  }

  async getResults() {
    try {
      const res = await axios(
        `https://www.food2fork.com/api/search?key=${key2}&q=${this.query}`,
      );
      this.result = res.data.recipes;
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  }
}
