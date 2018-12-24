import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Likes from './models/Likes';
import { elements } from './store/domElements';
import * as Spinner from './UI/Spinner';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';

const {
  searchForm,
  searchResult,
  resultPages,
  viewRecipe,
  shoppintList,
} = elements;
const {
  getInput,
  renderRecipes,
  clearInput,
  clearResult,
  highliteSelected,
} = searchView;
const { renderRecipe, clearRecipe, updateServingIngradients } = recipeView;
const { renderItem, deleteItem } = listView;
const { renderLike, toggleLikeBtn, toggleLikeMenu, deleteLike } = likeView;

const state = {};
window.state = state;

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
      renderRecipe(state.recipe, state.likes.isLiked(id));
    } catch (error) {
      console.log(`Recipe error: ${error}`);
      Spinner.removeLoader();
    }
  }
};

// ['hashchange', 'load'].forEach(event =>
//   window.addEventListener(event, controlRecipes),
// );

window.addEventListener('hashchange', controlRecipes);

const controlList = () => {
  if (!state.list) state.list = new List();

  state.recipe.ingredients.forEach(el => {
    const { count, unit, ingredient } = el;
    const item = state.list.addItem(count, unit, ingredient);
    renderItem(item);
  });
};

const deleteShoppingListHandler = evt => {
  const id = evt.target.closest('.shopping__item').dataset.itemid;
  if (evt.target.matches('.shopping__delete, .shopping__delete *')) {
    state.list.deleteItem(id);
    deleteItem(id);
  } else if (evt.target.matches('.shopping__count-value')) {
    const val = parseFloat(evt.target.value, 10);
    if (val > -1) state.list.updateCount(id, val);
  }
};

shoppintList.addEventListener('click', deleteShoppingListHandler);

// ************* JUST FOR TEST!!! ***** START *******

state.likes = new Likes();
toggleLikeMenu(state.likes.getNumLikes());

// ************************************* END  *****

const controlLikes = () => {
  if (!state.likes) state.likes = new Likes();
  const currentId = state.recipe.id;

  if (!state.likes.isLiked(currentId)) {
    const newLike = state.likes.addLike(
      currentId,
      state.recipe.title,
      state.recipe.author,
      state.recipe.image,
    );
    renderLike(newLike);
    toggleLikeBtn(true);
  } else {
    deleteLike(currentId);
    state.likes.deleteLike(currentId);
    toggleLikeBtn(false);
  }

  toggleLikeMenu(state.likes.getNumLikes());
};

const servingButtonHandler = evt => {
  if (evt.target.matches('.btn-decrease, .btn-decrease *')) {
    if (state.recipe.servings > 1) {
      state.recipe.updateServing('dec');
      updateServingIngradients(state.recipe);
    }
  } else if (evt.target.matches('.btn-increase, .btn-increase *')) {
    if (state.recipe.servings < 100) {
      state.recipe.updateServing('inc');
      updateServingIngradients(state.recipe);
    }
  } else if (evt.target.matches('.recipe__btn--add, .recipe__btn--add *')) {
    controlList();
  } else if (evt.target.matches('.recipe__love, .recipe__love *')) {
    controlLikes();
  }
};

viewRecipe.addEventListener('click', servingButtonHandler);
