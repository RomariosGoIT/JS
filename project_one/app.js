const BUDGET_CONTROLLER = (() => {
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
    }
  }
  class Income extends Expense {
    constructor(id, description, value) {
      super(id, description, value);
    }
  }

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
  };

  return {
    addItem: (type, descr, val) => {
      let newItem, ID;

      if (data.allItems[type].length > 0) {
        ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
      } else {
        ID = 0;
      }

      if (type === 'exp') {
        newItem = new Expense(ID, descr, val);
      } else if (type === 'inc') {
        newItem = new Income(ID, descr, val);
      }

      data.allItems[type].push(newItem);
      return newItem;
    },
  };

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
  iventListenersHandler = () => {
    const { addBtn } = ui.getDOMclasses();
    document.querySelector(addBtn).addEventListener('click', clickHandler);

    document.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.which === 13) {
        clickHandler();
      }
    });
  };
  clickHandler = () => {
    const { type, description, value } = ui.getInput();
    budget.addItem(type, description, value);
  };

  return {
    init: () => {
      console.log('Application started');
      return iventListenersHandler();
    },
  };

  // some code
})(BUDGET_CONTROLLER, UI_CONTROLLER);

APP_CONTROLLER.init();
