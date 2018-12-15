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

  calculateTotals = type => {
    let sum = 0;
    data.allItems[type].forEach(({ value }) => {
      sum += value;
    });
    data.totals[type] = sum;
  };

  const data = {
    allItems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: null,
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
    calculateBudget: type => {
      calculateTotals(type);
      data.budget = data.totals.inc - data.totals.exp;
      if (data.totals.inc > 0) {
        data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
      }
    },
    getBudget: () => {
      return {
        incTotal: data.totals.inc,
        expTotal: data.totals.exp,
        budget: data.budget,
        percentage: data.percentage,
      };
    },
    deleteItems: (type, id) => {
      let ids = data.allItems[type].map(item => item.id);
      let index = ids.indexOf(id);
      if (index !== -1) {
        data.allItems[type].splice(index, 1);
      }
    },

    test: () => {
      console.log(data);
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
    incomeList: '.income__list',
    expensesList: '.expenses__list',
    budgetLable: '.budget__value',
    incLable: '.budget__income--value',
    expLable: '.budget__expenses--value',
    percLable: '.budget__expenses--percentage',
    container: '.container',
  };

  const {
    typeInp,
    descriptionInp,
    valueInp,
    incomeList,
    expensesList,
    budgetLable,
    incLable,
    expLable,
    percLable,
  } = DOM_CLASSES;

  return {
    getInput: () => {
      return {
        type: document.querySelector(typeInp).value,
        description: document.querySelector(descriptionInp).value,
        value: parseFloat(document.querySelector(valueInp).value),
      };
    },
    getDOMclasses: () => DOM_CLASSES,
    addItemItem: ({ id, description, value }, type) => {
      let html;
      if (type === 'inc') {
        html = `<div class="item clearfix" id="inc-${id}">
            <div class="item__description">${description}</div>
            <div class="right clearfix">
                <div class="item__value">${value}</div>
                <div class="item__delete">
                    <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                </div>
            </div>
        </div>`;
        return document
          .querySelector(incomeList)
          .insertAdjacentHTML('beforeend', html);
      } else if (type === 'exp') {
        html = `<div class="item clearfix" id="exp-${id}">
            <div class="item__description">${description}</div>
            <div class="right clearfix">
                <div class="item__value">${value}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
            </div>
        </div>`;
        return document
          .querySelector(expensesList)
          .insertAdjacentHTML('beforeend', html);
      }
    },
    deleteItems: id => {
      let item = document.getElementById(id);
      item.parentNode.removeChild(item);
    },
    clearFields: () => {
      const fields = document.querySelectorAll(
        `${valueInp}, ${descriptionInp}`,
      );
      const fieldsArr = Array.prototype.slice.call(fields);

      fieldsArr.forEach(input => (input.value = ''));
      fieldsArr[0].focus();
    },
    dispalyBudget: ({ incTotal, expTotal, budget, percentage }) => {
      document.querySelector(budgetLable).textContent = budget;
      document.querySelector(incLable).textContent = incTotal;
      document.querySelector(expLable).textContent = expTotal;
      document.querySelector(percLable).textContent = percentage
        ? `${percentage}%`
        : '---';
    },
  };
})();

const APP_CONTROLLER = ((budget, ui) => {
  iventListenersHandler = () => {
    const { addBtn, container } = ui.getDOMclasses();
    document.querySelector(addBtn).addEventListener('click', addItemsHandler);

    document.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.which === 13) {
        addItemsHandler();
      }
    });

    document
      .querySelector(container)
      .addEventListener('click', deleteItemsHandler);
  };

  updateBudget = type => {
    budget.calculateBudget(type);
    const budgetItem = budget.getBudget();
    ui.dispalyBudget(budgetItem);
    console.log(budgetItem);
    //value
  };

  addItemsHandler = () => {
    const { type, description, value } = ui.getInput();
    if (value !== '' && !isNaN(value) && value > 0) {
      const newItem = budget.addItem(type, description, value);
      ui.addItemItem(newItem, type);
      updateBudget(type);
    }

    ui.clearFields();
  };

  deleteItemsHandler = ({ target }) => {
    let itemId = target.parentNode.parentNode.parentNode.parentNode.id;
    if (itemId) {
      let splitId = itemId.split('-');
      let type = splitId[0];
      let ID = parseInt(splitId[1]);
      budget.deleteItems(type, ID);
      ui.deleteItems(itemId);
      updateBudget(type);
    }
    console.log(itemId);
  };

  return {
    init: () => {
      console.log('Application started');
      ui.dispalyBudget({
        incTotal: 0,
        expTotal: 0,
        budget: 0,
        percentage: null,
      });
      iventListenersHandler();
    },
  };

  // some code
})(BUDGET_CONTROLLER, UI_CONTROLLER);

APP_CONTROLLER.init();
