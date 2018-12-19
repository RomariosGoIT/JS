import { elements } from '../store/domElements';

const { searchInput, resultList } = elements;

export const getInput = () => searchInput.value;

export const clearInput = () => (searchInput.value = '');

export const clearResult = () => (resultList.innerHTML = '');

const limitRecipeTitle = (title, limit = 17) => {
  const newTitle = [];
  if (title.length > limit) {
    title.split(' ').reduce((acc, cur) => {
      if (acc + cur.length < limit) {
        newTitle.push(cur);
      }
      return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')}...`;
  }
  return title;
};

const renderRecipe = recipe => {
  const { recipe_id, image_url, title, publisher } = recipe;
  const markup = `<li>
        <a class="results__link" href="#${recipe_id}">
            <figure class="results__fig">
                <img src=${image_url} alt='${title}'>
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(title)}</h4>
                <p class="results__author">${publisher}</p>
            </div>
        </a>
    </li>`;
  resultList.insertAdjacentHTML('beforeend', markup);
};

export const renderRecipes = recipes => {
  recipes.forEach(renderRecipe);
};
