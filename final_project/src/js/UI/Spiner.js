import { classes } from '../store/domElements';

export const renderLoader = parent => {
  const loader = `
      <div class='${classes.loader}'>
        <svg>
          <use href='img/icons.svg#icon-cw'></use>
        </svg>
      </div>
    `;
  parent.insertAdjacentHTML('afterbegin', loader);
};

export const removeLoader = () => {
  const loader = document.querySelector(`.${classes.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
