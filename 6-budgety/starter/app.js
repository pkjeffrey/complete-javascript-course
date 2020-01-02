var budgetModel = (function() {

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        }
    };

    return {
        INCOME_TYPE: 'inc',
        EXPENSE_TYPE: 'exp',

        addItem: function(type, description, value) {
            var newItem, id, itemArray;

            itemArray = data.items[type];
            if (itemArray) {
                itemArray.length === 0 ?
                    id = 0 :
                    id = itemArray[itemArray.length - 1].id + 1;
                newItem = type === this.INCOME_TYPE ?
                    new Income(id, description, value) :
                    new Expense(id, description, value);
                itemArray.push(newItem);
            } else {
                console.log('ERROR: budgetModel: invalid type.');
            }

            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };
})();


var uiView = (function() {

    var domStrings = {
        input: {
            type: '.add__type',
            description: '.add__description',
            value: '.add__value'
        },
        addButton: '.add__btn',
        lists: {
            income: '.income__list',
            expense: '.expenses__list'
        }
    };

    return {
        getDOMstrings: function() {
            return domStrings;
        },

        getItemInput: function() {
            return {
                type: document.querySelector(domStrings.input.type).value, // either 'inp' or 'exp'
                description: document.querySelector(domStrings.input.description).value,
                value: document.querySelector(domStrings.input.value).value
            };
        },

        addListItem: function(item, type) {
            var htmlTempl, html, listElement;
            
            if (type === 'inc') {
                listElement = domStrings.lists.income;
                htmlTempl = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                listElement = domStrings.lists.expense;
                htmlTempl = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">%percentage%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            html = htmlTempl.replace('%id%', item.id)
                            .replace('%description%', item.description)
                            .replace('%value%', item.value)
                            .replace('%percentage%', 'TODO%'); //TODO
            
            document.querySelector(listElement).insertAdjacentHTML('beforeend', html);
        }
    };
})();


var controller = (function(budget, ui) {

    var addItem = function() {
        var itemInput, budgetItem;

        itemInput = ui.getItemInput();
        budgetItem = budget.addItem(itemInput.type, itemInput.description, itemInput.value);
        ui.addListItem(budgetItem, itemInput.type);
        // calculate budget
        // update budget to ui
    };

    var setupEventListeners = function() {
        var dom = ui.getDOMstrings();

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(dom.addButton).addEventListener('click', addItem);
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };
})(budgetModel, uiView);

controller.init();
