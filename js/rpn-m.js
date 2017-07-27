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
    '+': function(op2, op1) { return op1 + op2 },  //(Более понятная запись сокращений)
    '-': function(op2, op1) { return op1 - op2 },
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
 // (Массив с перечнем операций из объекта opWeight, имеющих максимальный приоритет.
 //  В данный момент таких операций всего одна - '^'. )
let rightAssociativity = ['^'];


/**
 * Преобразование в число с плавающей точкой
 * @param data
 * @returns {Number}
 */
// Ремонтируются вещи, вроде 0.1+0.2=0.30000000000000004
// периодические возникающие в JS.
function toFloat(data) {
    return parseFloat(parseFloat(data).toFixed(15));
}


/**
 * Проверка на число
 * @param data
 * @returns {boolean}
 */
function isNumber(data) {
    return /^[-]?([\d]+|[\d]+\.|[\d]+\.[\d]+)$/.test(data);
}


/**
 * Проверка на оператор
 * @param data
 * @returns {boolean}
 */
// Если переданный в функцию символ есть в объекте операторов calcMethods,
// то возвращается true, иначе false
function isOperator(data) {
    return Object.keys(calcMethods).indexOf(data) > -1;
}


/**
 * Преобразование выражения в обратную польскую нотацию
 * @param data
 * @returns {*}
 */
function RPN(data) {

    // Стек, используемый для временного хранения операторов
    let stack = [];
    // (Прикрепляем к массиву-стеку stack метод last,
    //  который который возвращает последний элемент этого стека )
    stack.last = function() { return stack[stack.length-1]; }

    // Основной стек, который возвращается из функции
    let output = [];

    // Последовательно рассматриваем каждый элемент полученного массива
    for (let i = 0; i<data.length; i++) {

        let t = data[i];
        if (isNumber(t)) {
            // Число заносим сразу в выходной массив
            output.push(data[i]);

        } else if (isOperator(t)) {

            // Объявляем формулу сравнения в зависимости от
            // ассоциативности текущей операции
            // (перемудрено)
            let opCompare = (rightAssociativity.indexOf(data[i]) > -1) ?
                function() { return opWeight[stack.last()] > opWeight[data[i]] } :
                function() { return opWeight[stack.last()] >= opWeight[data[i]] };

            // Переносим элементы из временного стека в выходной
            while (stack.length > 0 && opCompare())
                output.push(stack.pop());
            
            // Помещаем текущий элемент на хранение во временный стек
            stack.push(data[i]);

        } else if (t === '(') {
            // Заносим в стек
            stack.push(t);

        } else if (t === ')') {
            // Переносим операторы из стека до открывающей скобки
            let operator;

            while (stack.length > 0) {
                operator = stack.pop();
                if (operator !== '(')
                    output.push(operator);
                else
                    break; }

        } else throw 'ERROR: Incorrect expression';

    }

    // Записываем в выходной массив оставшиеся операции
    while (stack.length > 0)
        output.push(stack.pop());

    return output;
}


/**
 * Расчёт выражения
 * @param exp
 * @returns {float}
 */
function calculate(exp) {
    // Рабочий стек
    let stack = [];
    // Прикрепляем к массиву-стеку stack метод pushFloat,
    // который получает строку, переводит её в число,
    // чуть округляет то для избавления от ошибок вычисления
    // и помещает в конец массива-стека stack 
    stack.pushFloat = function(value) {
        return stack.push(parseFloat(parseFloat(value).toFixed(15))); }

    // Если выражение не задано,
    // то генерируем ошибку с пояснительным текстом
    if (!exp) throw "ERROR: Expression is not specified";

console.info(exp);
    // Преобразование выражения в обратную польскую нотацию
    let data = RPN(exp.split(/[\s]+/));
    // Выводим в лог получившуюся польскую запись
console.info(data);

    // идём по массиву data,
    // в случае обнаружения числа заносим его в массив-стек stack,
    // в случае обнаружения оператора изымаем из стека два последних числа,
    // производим с ними операцию, прописанную в объекте calcMethods и
    // помещаем результат в конец стека stack
    let item;
    for (let i=0; i<data.length; i++) {

        item = data[i];

        if (isOperator(item)) {

            // Выдаём ошибку если не достаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 2)
                throw 'ERROR: No data in the stack for the operation';

            // Запускаем расчёты
            stack.pushFloat( calcMethods[item](stack.pop(), stack.pop()) );

        } else if (isNumber(item)) {
            // Заносим числа сразу в стек
            stack.pushFloat(item);

        } else throw 'ERROR: Unknown symbols'; }

    // Если в стеке осталось более одного операнда,
    // то генерируем ошибку с пояснительным текстом
    if (stack.length > 1)
        throw 'ERROR: Few operators in the stack';

    return stack.pop();
}

/**
 * Форматирование выражения для использования в вычислениях
 * NOTE: Может пригодится для вызова из приложения
 * @param data
 * @return {*}
 */
function calculateFormat(data) {
    // Если при записи дробных чисел использованы запятые,
    // то они интерпретируются как точки )
    data = data.replace(/,/g, '.');

    // Если пользователь решил ввёл числа вроде '.3' или '-.2',
    // то перед точкой вставляется '0'
    data = data.replace(/^\./,'0.');
    data = data.replace(/([^\d])(\.[\d])/g, '$10$2');

    // Составляем строку из операций, которые будут обрабатываться.
    // Перечень операций берём из объекта calcMethods
    // Предостережение: в конце строке остаётся '|'
    let operators = '';
    for (let t in calcMethods)
        operators += '\\'+t+'|';

    // Вокруг всех операций, а также скобок (дописываются),
    // ставим по дополнительному пробелу
    data = data.replace(
        new RegExp('(' + operators + '\\(|\\))', 'g'), ' $1 ' );

    // Где пробелов получилось несколько подряд, схлопываем их
    data = data.replace(/[\s]+/g,' ');

    // Преобразование отрицательных значений
    // В случае отрицательного значения знак пробела между самим числом и его минусом удаляется.
    // Не обрабатывается только случай, когда отрицательное число стоит в самом начале.
    data = data.replace(
        new RegExp('[\\s]*(' + operators + '\\()[\\s]*-[\\s]*([\\d]+)', 'g'), ' $1 -$2' );

   // Дорабатываем ранее упомянутое исключение
    data = data.replace(/^[\s]*-[\s]*([\d]+)/, '-$1');

    // Отдельно обрабатываем случай, когда выражение начинается с '-('
    data = data.replace(/^[\s]*-[\s]*\(/, '0 - (');

    // И отдельно обрабатываем случаи с выражениями '(-('
    data = data.replace(/\([\s]*-[\s]*\(/g, '( 0 - (');

    // Метод 'trim' удаляет с концов строки пробелы
    return data.trim();
}