const BUDGET_CONTROLLER = (() => {
  // some code
})();

const UI_CONTROLLER = (() => {
  // some code
  return {
    getInput: () => {
      let type = document.querySelector('.add__type').value;
      let description = document.querySelector('.add__description').value;
      let value = document.querySelector('.add__value').value;
      return { type, description, value };
    },
  };
})();

const APP_CONTROLLER = ((budget, ui) => {
  clickHandler = () => {
    const input = ui.getInput();
    console.log(input);
  };
  document.querySelector('.add__btn').addEventListener('click', clickHandler);

  document.addEventListener('keydown', event => {
    if (event.keyCode === 13 || event.which === 13) {
      clickHandler();
    }
  });

  // some code
})(BUDGET_CONTROLLER, UI_CONTROLLER);
