const BUDGET_CONTROLLER = (() => {
  // some code
})();

const UI_CONTROLLER = (() => {
  const DOM_CLASSES = {
    typeInp: '.add__type',
    descriptionInp: '.add__description',
    valueInp: '.add__value',
    addBtn: '.add__btn',
  };

  const { typeInp, descriptionInp, valueInp } = DOM_CLASSES;

  return {
    getInput: () => {
      return {
        type: document.querySelector(typeInp).value,
        description: document.querySelector(descriptionInp).value,
        value: document.querySelector(valueInp).value,
      };
    },
    getDOMclasses: () => DOM_CLASSES,
  };
})();

const APP_CONTROLLER = ((budget, ui) => {
  const { addBtn } = ui.getDOMclasses();
  clickHandler = () => {
    const input = ui.getInput();
    console.log(input);
  };
  document.querySelector(addBtn).addEventListener('click', clickHandler);

  document.addEventListener('keydown', event => {
    if (event.keyCode === 13 || event.which === 13) {
      clickHandler();
    }
  });

  // some code
})(BUDGET_CONTROLLER, UI_CONTROLLER);
