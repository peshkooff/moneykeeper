'use strict';

// Recieve button
let startBtn = document.getElementById("start"),
	budgetValue = document.getElementsByClassName('budget-value')[0],
	dayBudgetValue = document.getElementsByClassName('daybudget-value')[0],
	levelValue = document.getElementsByClassName('level-value')[0],
	expensesValue = document.getElementsByClassName('expenses-value')[0],
	optionalExpensesValue = document.getElementsByClassName('optionalexpenses-value')[0],
	incomeValue = document.getElementsByClassName('income-value')[0],
    monthSavingsValue = document.getElementsByClassName('monthsavings-value')[0],
    yearSavingsValue = document.getElementsByClassName('yearsavings-value')[0],


	expensesItem = document.getElementsByClassName('expenses-item'),
	expensesBtn = document.getElementsByTagName('button')[0],
	optionalExpensesBtn = document.getElementsByTagName('button')[1],
    countBtn = document.getElementsByTagName('button')[2],
    optionalExpensesItem = document.querySelectorAll('.optionalexpenses-item'),
	incomeItem = document.querySelector('.choose-income'),
	checkSavings = document.querySelector('#savings'),
	sumValue = document.querySelector('.choose-sum'),
    percentValue = document.querySelector('.choose-percent'),
    yearValue = document.querySelector('.year-value'),
    monthValue = document.querySelector('.month-value'),
    dayValue = document.querySelector('.day-value');

let money, time;


expensesBtn.disabled = true;
optionalExpensesBtn.disabled = true;
countBtn.disabled = true;

startBtn.addEventListener('click', function() {
    money = prompt('Ваш бюджет на месяц?', '');
    time = prompt('Укажите дату в формате (YYYY-MM-DD)');

    while(isNaN(money) || money == null) {
        money = prompt('Ваш бюджет на месяц', '');
    }
    appData.budjet = money;
    appData.timeData = time;
    budgetValue.textContent = money;
    yearValue.value = new Date(Date.parse(time)).getFullYear();
    monthValue.value = new Date(Date.parse(time)).getMonth() + 1;
    dayValue.value = new Date(Date.parse(time)).getDay();

    expensesBtn.disabled = false;
    optionalExpensesBtn.disabled = false;
    countBtn.disabled = false;
});


expensesBtn.addEventListener('click', function() {
    let summ = 0;
    for (let i = 0; i < expensesItem.length;i++){
        let a = expensesItem[i].value,
        b = expensesItem[++i].value;

        if (a != null && a != '' && typeof(a) === 'string' && b != null && typeof(b) != null, b != '', a.length < 50) {
            console.log('done');
            appData.expenses[a] = b;
            summ += +b;
            expensesValue.textContent = summ;
        } else {
            console.log('bad');
            i--;
        }
    }
});


optionalExpensesBtn.addEventListener('click', function() {
    for (let i = 0; i <= optionalExpensesItem.length; i++) {
        let question = optionalExpensesItem[i].value;
        appData.optionalExpenses[i] = question;
        optionalExpensesValue.textContent += appData.optionalExpenses[i] + ' ';
    }
});


countBtn.addEventListener('click', function() {
    appData.moneyPerday = (appData.budjet / 30).toFixed();
    dayBudgetValue.textContent = appData.moneyPerday;

    if (appData.moneyPerday < 100) {
        levelValue.textContent = 'Минимальный уровень достатка';
    } else if (appData.moneyPerday > 100 && appData.moneyPerday < 2000) {
        levelValue.textContent = 'Средний уровень достатка';
    } else if (appData.moneyPerday > 2000) {
        levelValue.textContent = 'Высокий уровень достатка';
    } else {
        dayBudgetValue.textContent = 'Ошибка при вычислении';
        levelValue.textContent = '';
    }
});


incomeItem.addEventListener('input', function() {
    let question = incomeItem.value;
    appData.income = question.split(', ');
    incomeValue.textContent = appData.income;
});


checkSavings.addEventListener('click', function() {
    if (appData.savings == true) {
        appData.savings = false;
    } else {
        appData.savings = true;
    }
});

sumValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let summ = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = summ/100/12*percent; 
        appData.yearIncome = summ/100*percent; 
        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
        }
});

percentValue.addEventListener('input', function() {
    if (appData.savings == true) {
        let summ = +sumValue.value,
            percent = +percentValue.value;
        appData.monthIncome = summ/100/12*percent; 
        appData.yearIncome = summ/100*percent; 
        monthSavingsValue.textContent = appData.monthIncome;
        yearSavingsValue.textContent = appData.yearIncome;
        }
});

let appData = {
    budjet : money,
    expenses: {},
    optionalExpenses: {},
    income: [],
    timeData: time,
    savings: false,
};



