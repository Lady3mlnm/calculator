/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */


"use strict";


/**
 * Разделение строки на операторы и операнды
 * NOTE: Отрицательные значения должны быть заключены в скобки
 * @param exp
 * @returns {*}
 */
function splitExpression (exp) {

    let data = [];

    // Преобразование отрицательных значений
    let junk = exp.replace(/\(-([\d.]+)\)/g, '(0-$1)');

    // Разделение строки
    junk.split(/([()+\-*\/^])/)
        .forEach((item, i, arr) => {
            if (item !== '') { data.push(item); }
        });

    return data;
}

/**
 * Проверка на число
 * @param data
 * @returns {boolean}
 */
function isNumber(data) {
    return /(^[\d]+$)|(^[\d]+[.][\d]+$)/.test(data);
}

/**
 * Проверка на оператор
 * @param data
 * @returns {boolean}
 */
function isOperator(data) {
    return /^[+\-*\/^]$/.test(data);
}

/**
 * Вес операции
 * @param value
 * @returns {number}
 */
function opWeight (value) {
    switch (value) {
        case '^': return 4;
        case '*': case '/': return 3;
        case '-': case '+': return 2;
        case '(': case ')': return 1;
        default: throw 'ERROR: Operator ' + value + ' has no weight';
    }
}

/**
 * Проверка на право-ассоциированный оператор
 * @param value
 * @return {*}
 */
function isRightAssociativity(value) {
    return ['^'].indexOf(value) > -1;
}

/**
 * Преобразование выражения в обратную польскую нотацию
 * @param exp
 * @returns {*}
 */
function reversePolishNotation(exp) {

    // Стэк
    let stack = [];
    stack.last = () => stack[stack.length - 1];

    let output = [];

    // Разделяем строку
    let data = splitExpression(exp);

    console.log(data);

    for (let i = 0; data[i] !== undefined; i++) {

        if (isNumber(data[i])) {
            // Число заносим сразу в выходной массив
            output.push(data[i]);

        } else if (isOperator(data[i])) {

            let opCompare = isRightAssociativity(data[i]) ?
                () => opWeight(stack.last()) > opWeight(data[i]) :
                () => opWeight(stack.last()) >= opWeight(data[i]);

            // Переносим элементы из стека в выходной массив
            while (stack.length > 0 && opCompare())
                output.push(stack.pop());

            stack.push(data[i]);

        } else if (data[i] === '(') {
            // Заносим в стек
            stack.push(data[i]);

        } else if (data[i] === ')') {
            // Переносим операторы из стека до открывающей скобки
            let operator;
            while (stack.length > 0) {
                operator = stack.pop();
                if (operator !== '(') output.push(operator); else break;
            }

        } else throw 'ERROR: Incorrect expression';

    }

    // Записываем в выходной массив оставшиеся операции
    while (stack.length > 0) {
        output.push(stack.pop());
    }

    return output;
}

/**
 * Расчёт выражения
 * @param exp
 * @returns {float}
 */
function calculate(exp) {

    let stack = [];
    stack.pushFloat = value =>
        stack.push(parseFloat(parseFloat(value).toFixed(10)));

    let data = reversePolishNotation(exp);

    data.forEach((item, i, arr) => {

        if (isOperator(item)) {

            // Оператор может быть только если в стеке есть 2 значения
            if (stack.length < 2)
                throw 'ERROR: No data in the stack for the operation';

            let op2 = stack.pop();
            let op1 = stack.pop();

            switch (item) {
                case '*': stack.pushFloat(op1 * op2); break;
                case '/': stack.pushFloat(op1 / op2); break;
                case '+': stack.pushFloat(op1 + op2); break;
                case '-': stack.pushFloat(op1 - op2); break;
                case '^': stack.pushFloat(Math.pow(op1, op2)); break;
            }

        } else if (isNumber(item)) {

            // Число заносим в стек
            stack.pushFloat(item);

        } else throw 'ERROR: Unknown symbols';
    });

    // В стеке остались операнды
    if (stack.length > 1) throw 'ERROR: Few operators in the stack';

    return stack.pop();
}
