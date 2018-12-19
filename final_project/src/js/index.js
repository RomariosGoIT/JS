import Search from './models/Search';
import { elements } from './store/domElements';
import * as Spinner from './UI/Spinner';
import * as searchView from './views/searchView';

const { searchForm, searchResult } = elements;
const { getInput, renderRecipes, clearInput, clearResult } = searchView;

const state = {};

const controlSearch = async event => {
  event.preventDefault();
  const query = getInput();
  clearInput();
  clearResult();
  Spinner.renderLoader(searchResult);
  if (query) {
    state.search = new Search(query);

    await state.search.getResults();

    Spinner.removeLoader();
    renderRecipes(state.search.result);
  }
};

searchForm.addEventListener('submit', controlSearch);
