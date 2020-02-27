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
    Expense.prototype.calcPercentage = function(totalInc) {
        var percentage;
        if (totalInc > 0) {
            percentage = Math.round(this.value / totalInc * 100);
        }
        return percentage;
    };

    var updateTotal = function(type) {
        var sum = 0;
        data.items[type].forEach(function(item) {
            sum += item.value;
        });
        data.totals[type] = sum;
    };

    var data = {
        items: {
            inc: [],
            exp: []
        },
        totals: {
            inc: 0,
            exp: 0
        },
        budget: 0,
        percentage: undefined
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

        deleteItem: function(type, id) {
            var idx, itemArray, idArray;

            itemArray = data.items[type];
            idArray = itemArray.map(function(current) {
                return current.id;
            });
            idx = idArray.indexOf(id);
            if (idx !== -1) {
                itemArray.splice(idx, 1);
            }
        },

        calculateBudget: function() {
            updateTotal('inc');
            updateTotal('exp');
            data.budget = data.totals.inc - data.totals.exp;
            if (data.totals.inc > 0) {
                data.percentage = Math.round(data.totals.exp / data.totals.inc * 100);
            } else {
                data.percentage = undefined;
            }
        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
                expPercentages: data.items.exp.map(function(expItem) {
                    return expItem.calcPercentage(data.totals.inc);
                })
            };
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
            container: '.container',
            income: '.income__list',
            expense: '.expenses__list'
        },
        expPercentage: '.item__percentage',
        budget: {
            title: '.budget__title',
            value: '.budget__value',
            income: '.budget__income--value',
            expense: '.budget__expenses--value',
            percentage: '.budget__expenses--percentage'
        }
    };

    var formatNumber = function(num, type) {
        var numSplit, int, dec;
        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        int = numSplit[0];
        if (int.length > 3) {
            int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        }
        dec = numSplit[1];
        return (type === 'exp' ? '-' : '+') + ' ' + int + '.' + dec;
    };

    return {
        getDOMstrings: function() {
            return domStrings;
        },

        getItemInput: function() {
            return {
                type: document.querySelector(domStrings.input.type).value, // either 'inc' or 'exp'
                description: document.querySelector(domStrings.input.description).value,
                value: parseFloat(document.querySelector(domStrings.input.value).value)
            };
        },

        clearInputFields: function() {
            var fields, nodes;
            nodes = document.querySelectorAll(domStrings.input.description + ', ' + domStrings.input.value);
            fields = Array.prototype.slice.call(nodes);
            fields.forEach(function(field) {
                field.value = '';
            });
            fields[0].focus();
        },

        addListItem: function(item, type) {
            var htmlTempl, html, listElement;
            
            if (type === 'inc') {
                listElement = domStrings.lists.income;
                htmlTempl = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                listElement = domStrings.lists.expense;
                htmlTempl = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">/div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }

            html = htmlTempl.replace('%id%', item.id)
                            .replace('%description%', item.description)
                            .replace('%value%', formatNumber(item.value, type));
            
            document.querySelector(listElement).insertAdjacentHTML('beforeend', html);
        },

        removeListItem: function(listItemID) {
            var el = document.getElementById(listItemID);
            el.parentNode.removeChild(el);
        },

        displayBudget: function(budget) {
            document.querySelector(domStrings.budget.value).textContent = formatNumber(budget.budget, budget.budget > 0 ? 'inc' : 'exp');
            document.querySelector(domStrings.budget.income).textContent = formatNumber(budget.totalInc, 'inc');
            document.querySelector(domStrings.budget.expense).textContent = formatNumber(budget.totalExp, 'exp');
            if (budget.percentage) {
                document.querySelector(domStrings.budget.percentage).textContent = budget.percentage + '%';
            } else {
                document.querySelector(domStrings.budget.percentage).textContent = '---';
            }
        },

        displayExpPercentages: function(expPercentages) {
            var expPercentageNodes = document.querySelectorAll(domStrings.expPercentage);
            var nodeListForEach = function(list, callback) {
                for (var i = 0; i < list.length; i++) {
                    callback(list[i], i);
                }
            };
            nodeListForEach(expPercentageNodes, function(current, index) {
                if (expPercentages[index]) {
                    current.textContent = expPercentages[index] + '%';
                } else {
                    current.textContent = '---';
                }
            });
        }
    };
})();


var controller = (function(budget, ui) {

    var addItem = function() {
        var itemInput, budgetItem;

        itemInput = ui.getItemInput();
        if (itemInput.description !== "" && !isNaN(itemInput.value) && itemInput.value > 0) {
            budgetItem = budget.addItem(itemInput.type, itemInput.description, itemInput.value);
            ui.addListItem(budgetItem, itemInput.type);
            ui.clearInputFields();
            updateBudget();
        }
    };

    var deleteItem = function(event) {
        var elemID, itemSplit, itemType, itemID;
        if (event.target.parentElement.classList.contains('item__delete--btn')) {
            elemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
            if (elemID) {
                itemSplit = elemID.split('-');
                itemType = itemSplit[0];
                itemID = parseInt(itemSplit[1]);
                budget.deleteItem(itemType, itemID);
                ui.removeListItem(elemID);
                updateBudget();
            }
        }
    };

    var updateBudget = function() {
        var b;
        budget.calculateBudget();
        b = budget.getBudget();
        ui.displayBudget(b);
        ui.displayExpPercentages(b.expPercentages);
    };

    var setupEventListeners = function() {
        var dom = ui.getDOMstrings();

        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                addItem();
            }
        });

        document.querySelector(dom.addButton).addEventListener('click', addItem);

        document.querySelector(dom.lists.container).addEventListener('click', deleteItem);
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
            ui.displayBudget(budgetModel.getBudget());
        }
    };
})(budgetModel, uiView);

controller.init();
