const BUDGET_CONTROLLER = (() => {
  class Expense {
    constructor(id, description, value) {
      this.id = id;
      this.description = description;
      this.value = value;
      this.percentage = -1;
    }
  }

  Expense.prototype.calcPercentage = function(totalInc) {
    if (totalInc > 0) {
      this.percentage = Math.round((this.value / totalInc) * 100);
    }
  };
  Expense.prototype.getPercentage = function() {
    return this.percentage;
  };

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
    calculatePercentage: () => {
      data.allItems.exp.forEach(val => val.calcPercentage(data.totals.inc));
    },

    getPercentage: () => {
      const allPrc = data.allItems.exp.map(val => val.getPercentage());
      return allPrc;
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
    percentLable: '.item__percentage',
    dateLable: '.budget__title--month',
  };

  const {
    typeInp,
    descriptionInp,
    valueInp,
    addBtn,
    incomeList,
    expensesList,
    budgetLable,
    incLable,
    expLable,
    percLable,
    percentLable,
    dateLable,
  } = DOM_CLASSES;

  formatNumbers = (num, type) => {
    num = Math.abs(num);
    num = num.toFixed(2);

    let numSplit = num.split('.');
    let int = numSplit[0];
    if (int.length > 3) {
      int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
    }

    dec = numSplit[1];

    return (type === 'inc' ? ' + ' : ' - ') + int + '.' + dec;
  };

  listNodeForEach = (list, callback) => {
    for (let i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

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
                <div class="item__value">${formatNumbers(value, type)}</div>
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
                <div class="item__value">${formatNumbers(value, type)}</div>
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
    displayBudget: ({ incTotal, expTotal, budget, percentage }) => {
      let type = budget > 0 ? 'inc' : 'exp';
      document.querySelector(budgetLable).textContent = formatNumbers(
        budget,
        type,
      );
      document.querySelector(incLable).textContent = formatNumbers(
        incTotal,
        'inc',
      );
      document.querySelector(expLable).textContent = formatNumbers(
        expTotal,
        'exp',
      );
      document.querySelector(percLable).textContent = percentage
        ? `${percentage}%`
        : '---';
    },
    displayPercentage: percentage => {
      const percList = document.querySelectorAll(percentLable);

      listNodeForEach(percList, (curent, index) => {
        if (percentage[index] > 0) {
          curent.textContent = percentage[index] + '%';
        } else {
          curent.textContent = '--';
        }
      });
    },

    changedType: () => {
      let classList = [typeInp, descriptionInp, valueInp];
      let fields = document.querySelectorAll(classList.join(','));
      listNodeForEach(fields, current => {
        current.classList.toggle('red-focus');
      });
      document.querySelector(addBtn).classList.toggle('red');
    },

    getDate: () => {
      let now = new Date();
      let mL = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      let year = now.getFullYear();
      let month = now.getMonth();
      document.querySelector(dateLable).textContent = `${mL[month]}  ${year}`;
    },
  };
})();

const APP_CONTROLLER = ((budget, ui) => {
  iventListenersHandler = () => {
    const { addBtn, container, typeInp } = ui.getDOMclasses();
    document.querySelector(addBtn).addEventListener('click', addItemsHandler);

    document.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.which === 13) {
        addItemsHandler();
      }
    });

    document
      .querySelector(container)
      .addEventListener('click', deleteItemsHandler);

    document.querySelector(typeInp).addEventListener('change', ui.changedType);
  };

  updateBudget = type => {
    budget.calculateBudget(type);
    const budgetItem = budget.getBudget();
    ui.displayBudget(budgetItem);
  };

  calculatePercentage = () => {
    budget.calculatePercentage();
    const allPrc = budget.getPercentage();
    ui.displayPercentage(allPrc);
  };

  addItemsHandler = () => {
    const { type, description, value } = ui.getInput();
    if (value !== '' && !isNaN(value) && value > 0) {
      const newItem = budget.addItem(type, description, value);
      ui.addItemItem(newItem, type);
      updateBudget(type);
      calculatePercentage();
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
      calculatePercentage();
    }
  };

  return {
    init: () => {
      console.log('Application started');
      ui.displayBudget({
        incTotal: 0,
        expTotal: 0,
        budget: 0,
        percentage: null,
      });
      ui.getDate();
      iventListenersHandler();
    },
  };

  // some code
})(BUDGET_CONTROLLER, UI_CONTROLLER);

APP_CONTROLLER.init();
