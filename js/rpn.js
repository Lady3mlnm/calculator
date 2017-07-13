/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */


"use strict";


/**
 * Набор методов для вычисления выражения
 */
let calcMethods = {
    '*': (op2, op1) => (op1 * op2),
    '/': (op2, op1) => (op1 / op2),
    '+': (op2, op1) => (op1 + op2),
    '-': (op2, op1) => (op1 - op2),
    '^': (op2, op1) => Math.pow(op1, op2)
};


/**
 * Вес операции
 */
let opWeight = {
    '^': 4,
    '*': 3, '/': 3,
    '+': 2, '-': 2,
    '(': 1, ')': 1
};


/**
 * Право-ассоциированные операторы
 * @type {string[]}
 */
let rightAssociativity = ['^'];


/**
 * Преобразование в число с плавающей точкой
 * @param data
 * @returns {Number}
 */
function toFloat(data) {
    return parseFloat(parseFloat(data).toFixed(10));
}


/**
 * Проверка на число
 * @param data
 * @returns {boolean}
 */
function isNumber(data) {
    return /^[-]?([\d]+|[\d]+\.[\d]+)$/.test(data);
}


/**
 * Проверка на оператор
 * @param data
 * @returns {boolean}
 */
function isOperator(data) {
    return Object.keys(calcMethods).indexOf(data) > -1;
}


/**
 * Преобразование выражения в обратную польскую нотацию
 * @param data
 * @param stack
 * @returns {*}
 */
function RPN(data, stack) {

    // Получение последнего значения из
    // стека без его удаления
    stack.last =
        () => stack[stack.length - 1];

    // Если число то переходим в следующему элементу данных
    if (isNumber(data[0]))
        return [data[0]].concat(RPN(data.slice(1), stack));

    // Если текущий элемент является оператором
    if (isOperator(data[0])) {

        // Объявляем формулу сравнения в зависимости от
        // ассоциативности текущей операции
        let opCompare = rightAssociativity.indexOf(data[0]) > -1 ?
            () => opWeight[stack.last()] > opWeight[data[0]] :
            () => opWeight[stack.last()] >= opWeight[data[0]];

        // Переносим операции из стека с высоким приоритетом
        if (stack.length > 0 && opCompare())
            return [stack.pop()].concat(RPN(data, stack));

        stack.push(data[0]);
        return RPN(data.slice(1), stack);
    }

    // Заносим открывающую скобку в стек
    if (data[0] === '(') {
        stack.push(data[0]);
        return RPN(data.slice(1), stack);
    }

    if (data[0] === ')') {

        // Если в стеке нет операций
        if (stack.length < 1)
            throw 'ERROR: There is no opening bracket on the stack';

        // Переносим операции из стека пока не
        // встретим открывающую скобку
        if (stack.last() === '(') {
            stack.pop();
            return RPN(data.slice(1), stack);

        } else return [stack.pop()].concat(RPN(data, stack));

    }

    // Остатки операций в стеке
    if (data.length < 1)
        return [].concat(stack);

    // Если в выражении есть недопустимое значение
    throw 'ERROR: Expression not valid';
}


/**
 * Расчёт выражения
 * @param exp
 * @returns {float}
 */
function calculate(exp) {

    let stack = [];
    stack.pushFloat =
        value => stack.push(parseFloat(parseFloat(value).toFixed(10)));

    // Если выражение не задано
    if (!exp) throw "ERROR: Expression is not specified";

    // Преобразуем выражение в обратную польскую нотацию
    let data = RPN(exp.split(/[\s]+/), []);

    data.forEach((item, i, arr) => {

        if (isOperator(item)) {

            // Выдаём ошибку если не достаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 2)
                throw 'ERROR: No data in the stack for the operation';

            // Запускаем расчёты
            stack.pushFloat(
                calcMethods[item](stack.pop(), stack.pop())
            );

        } else if (isNumber(item)) {
            // Заносим числа сразу в стек
            stack.pushFloat(item);

        } else throw 'ERROR: Unknown symbols';

    });

    // Если в стеке остался не один операнд
    if (stack.length > 1)
        throw 'ERROR: Few operators in the stack';

    return stack.pop();
}
