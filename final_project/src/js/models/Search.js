import axios from 'axios';

export default class Search {
  constructor(query) {
    this.query = query;
    this.result;
  }

  async getResults() {
    const key = 'fcef7e49101ae3fb50f38ba07e780d20';
    const res = await axios(
      `https://www.food2fork.com/api/search?key=${key}&q=${this.query}`,
    );
    this.result = res.data.recipes;
  }
}
