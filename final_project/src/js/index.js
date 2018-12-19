import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements } from './store/domElements';
import * as Spinner from './UI/Spinner';
import * as searchView from './views/searchView';

const { searchForm, searchResult, resultPages } = elements;
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

const resultPagesHandler = event => {
  const btn = event.target.closest('.btn-inline');
  if (btn) {
    const goToPage = parseInt(btn.dataset.goto, 10);
    clearResult();
    renderRecipes(state.search.result, goToPage);
  }
};

resultPages.addEventListener('click', resultPagesHandler);

const controlRecipes = async id => {
  state.recipe = new Recipe(id);
  await state.recipe.getRecipe();
};

controlRecipes(47746);
