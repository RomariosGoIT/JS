import Search from './models/Search';
import { elements } from './store/domElements';
import * as Spiner from './UI/Spiner';
import * as searchView from './views/searchView';

const { searchForm, searchResult } = elements;
const { getInput, renderRecipes, clearInput, clearResult } = searchView;

const state = {};

const controlSearch = async event => {
  event.preventDefault();
  const query = getInput();
  clearInput();
  clearResult();
  Spiner.renderLoader(searchResult);
  if (query) {
    state.search = new Search(query);

    await state.search.getResults();

    Spiner.removeLoader();
    renderRecipes(state.search.result);
  }
};

searchForm.addEventListener('submit', controlSearch);
