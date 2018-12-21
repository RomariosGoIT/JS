import { elements } from '../store/domElements';

const { searchInput, resultList, resultPages } = elements;

export const getInput = () => searchInput.value;

export const clearInput = () => (searchInput.value = '');

export const clearResult = () => {
  resultList.innerHTML = '';
  resultPages.innerHTML = '';
};

export const highliteSelected = id => {
  const selArr = Array.from(document.querySelectorAll('.results__link'));
  selArr.forEach(el => el.classList.remove('results__link--active'));

  document
    .querySelector(`a[href="#${id}"]`)
    .classList.add('results__link--active');
};

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

const createBbutton = (page, type) => {
  const btn = `
    <button class="btn-inline results__btn--${type}" data-goto=${
    type === 'prev' ? page - 1 : page + 1
  }>
    <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
        <svg class="search__icon">
            <use href="./img/icons.svg#icon-triangle-${
              type === 'next' ? 'right' : 'left'
            }"></use>
        </svg>
        
    </button>
    `;
  return btn;
};

const renderButtons = (page, numResults, resPerPage) => {
  const pages = Math.ceil(numResults / resPerPage);
  let btn;
  if (page === 1 && pages > 1) {
    btn = createBbutton(page, 'next');
  } else if (page < pages) {
    btn = `${createBbutton(page, 'next')}
        ${createBbutton(page, 'prev')}`;
  } else if (page === pages && pages > 1) {
    btn = createBbutton(page, 'prev');
  }
  resultPages.insertAdjacentHTML('afterbegin', btn);
};

export const renderRecipes = (recipes, page = 1, resPerPage = 10) => {
  let start = (page - 1) * resPerPage;
  let end = page * resPerPage;
  renderButtons(page, recipes.length, resPerPage);
  recipes.slice(start, end).forEach(renderRecipe);
};
