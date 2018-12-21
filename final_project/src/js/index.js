import Search from './models/Search';
import Recipe from './models/Recipe';
import { elements } from './store/domElements';
import * as Spinner from './UI/Spinner';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const { searchForm, searchResult, resultPages, viewRecipe } = elements;
const {
  getInput,
  renderRecipes,
  clearInput,
  clearResult,
  highliteSelected,
} = searchView;
const { renderRecipe, clearRecipe } = recipeView;

const state = {};

const controlSearch = async event => {
  event.preventDefault();
  const query = getInput();
  clearInput();
  clearResult();
  Spinner.renderLoader(searchResult);
  if (query) {
    state.search = new Search(query);
    try {
      await state.search.getResults();

      Spinner.removeLoader();
      renderRecipes(state.search.result);
    } catch (error) {
      console.log(`Result error: ${error}`);
      Spinner.removeLoader();
    }
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

const controlRecipes = async () => {
  const id = window.location.hash.replace('#', '');
  if (id) {
    clearRecipe();

    Spinner.renderLoader(viewRecipe);
    if (state.search) highliteSelected(id);
    state.recipe = new Recipe(id);
    try {
      await state.recipe.getRecipe();

      state.recipe.calcTime();
      state.recipe.calcSerivngs();
      state.recipe.parseIngredients();

      Spinner.removeLoader();
      renderRecipe(state.recipe);
    } catch (error) {
      console.log(`Recipe error: ${error}`);
      Spinner.removeLoader();
    }
  }
};

['hashchange', 'load'].forEach(event =>
  window.addEventListener(event, controlRecipes),
);
