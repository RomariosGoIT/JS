import { elements } from '../store/domElements';
import { Fraction } from 'fractional';
const { viewRecipe } = elements;

export const clearRecipe = () => (viewRecipe.innerHTML = '');

const formatCount = count => {
  if (count) {
    const [inc, dec] = count
      .toString()
      .split('.')
      .map(num => parseInt(num, 10));

    if (!dec) return count;
    if (inc === 0) {
      const fr = new Fraction(count);
      return `${fr.numerator}/${fr.denominator}`;
    } else {
      const fr = new Fraction(count - inc);
      return `${inc} ${fr.numerator}/${fr.denominator}`;
    }
  }

  return count;
};

const createIngredien = el => {
  const markup = `<li class="recipe__item">
        <svg class="recipe__icon">
            <use href="./img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(el.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${el.unit}</span>
            ${el.ingredient}
        </div>
    </li>`;
  return markup;
};

export const renderRecipe = (recipe, isLiked) => {
  const { title, author, image, url, ingredients, time, servings } = recipe;
  const markup = `
    <figure class="recipe__fig">
              <img src="${image}" alt="${title}" class="recipe__img">
              <h1 class="recipe__title">
                  <span>${title}</span>
              </h1>
          </figure>
          <div class="recipe__details">
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                      <use href="./img/icons.svg#icon-stopwatch"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--minutes">${time}</span>
                  <span class="recipe__info-text"> minutes</span>
              </div>
              <div class="recipe__info">
                  <svg class="recipe__info-icon">
                      <use href="./img/icons.svg#icon-man"></use>
                  </svg>
                  <span class="recipe__info-data recipe__info-data--people">${servings}</span>
                  <span class="recipe__info-text"> servings</span>
                  <div class="recipe__info-buttons">
                      <button class="btn-tiny btn-decrease">
                          <svg>
                              <use href="./img/icons.svg#icon-circle-with-minus"></use>
                          </svg>
                      </button>
                      <button class="btn-tiny btn-increase">
                          <svg>
                              <use href="./img/icons.svg#icon-circle-with-plus"></use>
                          </svg>
                      </button>
                  </div>
              </div>
              <button class="recipe__love">
                  <svg class="header__likes">
                      <use href="./img/icons.svg#icon-heart${
                        isLiked ? '' : '-outlined'
                      }"></use>
                  </svg>
              </button>
          </div>
          <div class="recipe__ingredients">
              <ul class="recipe__ingredient-list">
                ${ingredients
                  .map(el => createIngredien(el))
                  .join('')}                               
              </ul>
              <button class="btn-small recipe__btn recipe__btn--add">
                  <svg class="search__icon">
                      <use href="./img/icons.svg#icon-shopping-cart"></use>
                  </svg>
                  <span>Add to shopping list</span>
              </button>
          </div>    
          <div class="recipe__directions">
              <h2 class="heading-2">How to cook it</h2>
              <p class="recipe__directions-text">
                  This recipe was carefully designed and tested by
                  <span class="recipe__by">${author}</span>. Please check out directions at their website.
              </p>
              <a class="btn-small recipe__btn" href="${url}" target="_blank">
                  <span>Directions</span>
                  <svg class="search__icon">
                      <use href="./img/icons.svg#icon-triangle-right"></use>
                  </svg>
              </a>
          </div>
    `;
  viewRecipe.insertAdjacentHTML('afterbegin', markup);
};

export const updateServingIngradients = recipe => {
  document.querySelector('.recipe__info-data--people').textContent =
    recipe.servings;

  const countElement = Array.from(document.querySelectorAll('.recipe__count'));
  countElement.forEach((el, i) => {
    el.textContent = formatCount(recipe.ingredients[i].count);
  });
};
