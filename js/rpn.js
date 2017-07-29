/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

"use strict";


/**
 * Набор методов для вычисления выражения
 */
let calcMethods = {
    '*': (op2, op1) => op1 * op2,
    '/': (op2, op1) => div(op1,op2),
    '+': function(op2, op1) { return op1 + op2 },  //(Более понятная запись сокращений)
    '-': function(op2, op1) { return op1 - op2 },
    '^': (op2, op1) => powerX(op1, op2),
    // 'v': (op) => Math.sqrt(op),
    // 'ln': (op) => Math.log(op),
    // 'lg': (op) => Math.log(op)/Math.LN10,
    // 'log2': (op) => Math.log(op)/Math.LN2,
    // 'pi': (op) => Math.PI,
    // 'e': (op) => Math.E
};


/**
 * Вес операции
 */
// (Помещение скобок в этот объект излишне)
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
// (Ремонтируются вещи, вроде 0.1+0.2=0.30000000000000004
//  периодические возникающие в JS )
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
// (Если переданный в функцию символ есть в объекте операторов calcMethods,
//  то возвращается true, иначе false)
function isOperator(data) {
    return Object.keys(calcMethods).indexOf(data) > -1;
}


/**
 * Преобразование выражения в обратную польскую нотацию
 * @param data
 * @returns {*}
 */
function RPN(data) {

    // Стек (используемый для временного хранения операторов)
    let stack = [];
    // (Прикрепляем к массиву-стеку stack метод last,
    //  который который возвращает последний элемент этого стека )
    stack.last = () => stack[stack.length - 1];

    // (Основной стек, который возвращается из функции)
    let output = [];

    // (Последовательно рассматриваем каждый элемент полученного массива)
    for (let i = 0; data[i] !== undefined; i++) {

        if (isNumber(data[i])) {
            // Число заносим сразу в выходной массив
            output.push(data[i]);

        } else if (isOperator(data[i])) {

            // Объявляем формулу сравнения в зависимости от
            // ассоциативности текущей операции
            // (перемудрено)
            let opCompare = rightAssociativity.indexOf(data[i]) > -1 ?
                () => opWeight[stack.last()] > opWeight[data[i]] :
                () => opWeight[stack.last()] >= opWeight[data[i]];

            // Переносим элементы из временного стека в выходной
            while (stack.length > 0 && opCompare())
                output.push(stack.pop());
            
            // Помещаем текущий элемент на хранение во временный стек
            stack.push(data[i]);

        } else if (data[i] === '(') {
            // Заносим '(' в стек
            stack.push(data[i]);

        } else if (data[i] === ')') {
            // Переносим операторы из стека до открывающей скобки
            let operator;

            while (stack.length > 0) {
                operator = stack.pop();
                if (operator !== '(')
                    output.push(operator);
                else
                    break;
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
 * Преобразование выражения в обратную польскую нотацию
 * NOTE: Используются рекурсивные вызовы
 * @param data
 * @param stack
 * @returns {*}
 */
 /*
function rRPN(data, stack) {

    // Получение последнего значения из
    // стека без его удаления
    stack.last = () => stack[stack.length - 1];

    // Если число, то переходим в следующему элементу данных
    if (isNumber(data[0]))
        return [data[0]].concat(rRPN(data.slice(1), stack));

    // Если текущий элемент является оператором
    if (isOperator(data[0])) {

        // Объявляем формулу сравнения в зависимости от
        // ассоциативности текущей операции
        let opCompare = rightAssociativity.indexOf(data[0]) > -1 ?
            () => opWeight[stack.last()] > opWeight[data[0]] :
            () => opWeight[stack.last()] >= opWeight[data[0]];

        // Переносим операции из стека с высоким приоритетом
        if (stack.length > 0 && opCompare())
            return [stack.pop()].concat(rRPN(data, stack));

        stack.push(data[0]);
        return rRPN(data.slice(1), stack);
    }

    // Заносим открывающую скобку в стек
    if (data[0] === '(') {
        stack.push(data[0]);
        return rRPN(data.slice(1), stack);
    }

    if (data[0] === ')') {

        // Если в стеке нет операций
        if (stack.length < 1)
            throw 'ERROR: There is no opening bracket on the stack';

        // Переносим операции из стека пока не
        // встретим открывающую скобку
        if (stack.last() === '(') {
            stack.pop();
            return rRPN(data.slice(1), stack);

        } else return [stack.pop()].concat(rRPN(data, stack));

    }

    // Остатки операций в стеке
    if (data.length < 1)
        return [].concat(stack);

    // Если в выражении есть недопустимое значение
    throw 'ERROR: Expression not valid';
}
*/

/**
 * Расчёт выражения
 * @param exp
 * @returns {float}
 */
function calculate(exp) {

    let stack = [];
    // (Прикрепляем к массиву-стеку stack метод pushFloat,
    //  который получает строку, переводит её в число,
    //  чуть округляет то для избавления от ошибок вычисления
    //  и помещает в конец массива-стека stack )
    stack.pushFloat =
        value => stack.push(parseFloat(parseFloat(value).toFixed(15)));

    // Если выражение не задано
    // (то генерируем ошибку с пояснительным текстом)
    if (!exp) throw "ERROR: Expression is not specified";

    // (Выводим в лог-окно отформатированную строку)
    logWindowOut('','Воспринятое выражение:',exp);

    // Преобразование выражения в обратную польскую нотацию
    // let data = rRPN(exp.split(/[\s]+/), []);
    let data = RPN(exp.split(/[\s]+/));

    // (Выводим в лог-окно получившуюся обратную польскую запись)
    logWindowOut('Обратная польская запись:',data);

    // (идём по массиву data,
    //  в случае обнаружения числа заносим его в массив-стек stack,
    //  в случае обнаружения оператора изымаем из стека два последних числа,
    //  производим с ними операцию, прописанную в объекте calcMethods и
    //  помещаем результат в конец стека stack )
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
    // (то генерируем ошибку с пояснительным текстом)
    if (stack.length > 1)
        throw 'ERROR: Few operators in the stack';

    // Округляем ответ до меньшей точности.
    // Если этого не сделать, то, к примеру, 
    // вычисление кубического корня из 1000 вернёт 9.999999999999975
    stack[0] = parseFloat(stack[0].toFixed(12));

    // (Выводим в лог-окно ответ)
    logWindowOut('Ответ: &nbsp;'+stack[0]);
    return stack.pop();
}

/**
 * Форматирование выражения для использования в вычислениях
 * NOTE: Может пригодится для вызова из приложения
 * @param data
 * @return {*}
 */
function calculateFormat(data) {

    // Экранирование выражений для использования
    // в регулярных выражениях
    // На первом шаге образуется переменная, содержащая в себе функцию,
    // экранирующую операторы
    let escape =
        value => value.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');

    // Список операторов пригодный для использования
    // в регулярных выражениях
    // Список операторов берётся из объекта calcMethods,
    // на выходе получается массив [ "\*", "\/", "\+", "\-", "\^", ... ]
    let operators = [];
    Object.keys(calcMethods).forEach(
        (item, i, arr) => operators.push(escape(item))
    );

    // Если при записи дробных чисел использованы запятые,
    // то они интерпретируются как точки )
    data = data.replace(/,/g, '.');
    
    // Перевод символов строки в нижний регистр
    data = data.toLowerCase();

    // Если перед началом вычисляемого выражения или после него есть неразрешённые
    // для мат.операций символы (к примеру, прихватились кавычки при копировании
    // примера), то они удаляются
    data = data.replace(
        new RegExp('^[^' + operators.join('|')+'|\\(|\\.|\\d]+', 'g'),
        ''
    );
    data = data.replace(
        new RegExp('[^\\)|\\.|\\d]+$', 'g'),
        ''
    );

    // Если пользователь решил ввёл числа в виде '.3' или '-.2',
    // то перед точкой вставляется '0'
    data = data.replace(/^\./,'0.');
    data = data.replace(/([^\d])(\.[\d])/g, '$10$2');

    // Преобразование операторов и скобок
    // Вокруг знаков операторов и скобок размещаем ровно один пробел
    // ('Некрасивость' этой команды в том, что пробелы между последовательно 
    //  найденными символами суммируются.)
    data = data.replace(
        new RegExp('[\\s]*(' + operators.join('|')+'|\\(|\\))[\\s]*', 'g'),
        ' $1 '
    );

    // Преобразование отрицательных значений
    // В случае отрицательного значения знак пробела между самим числом и его минусом удаляется.
    // Не обрабатывается только случай, когда отрицательное число стоит в самом начале.)
    data = data.replace(
        new RegExp('[\\s]*(' + operators.join('|') + '|\\()[\\s]*-[\\s]*([\\d]+)', 'g'),
        ' $1 -$2'
    );

    // Дорабатываем ранее упомянутое исключение
    data = data.replace(/^[\s]*-[\s]*([\d]+)/, '-$1');

    // Отдельно обрабатываем случай, когда выражение начинается с '-('
    data = data.replace(/^[\s]*-[\s]*\(/, '0 - (');

    // Отдельно обрабатываем случаи с выражениями '(-('
    data = data.replace(/\([\s]*-[\s]*\(/g, '( 0 - (');

    // Там, где получилось 2 и более пробелов, схлопываем их
    data = data.replace(/[\s]{2,}/g, ' ');

    // Метод 'trim' удаляет пробелы с концов строки
    return data.trim();
}

