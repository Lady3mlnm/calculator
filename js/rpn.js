/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

"use strict";


/**
 * Набор методов для вычисления выражения
 */
let calcMethods2 = {
    '*': (op2, op1) => op1 * op2,
    '/': (op2, op1) => div(op1,op2),
    '+': (op2, op1) => op1 + op2,
    '-': (op2, op1) => op1 - op2,
    '^': (op2, op1) => powerX(op1, op2)
};

let calcMethods1 = {
    'arcsin': (op) => fArcsin(op,document.getElementById('unitGrad').checked),
    'arccos': (op) => fArccos(op,document.getElementById('unitGrad').checked),
    'arctg': (op) => fArctg(op,document.getElementById('unitGrad').checked),
    'sin': (op) => fSin(op,document.getElementById('unitGrad').checked),
    'cos': (op) => fCos(op,document.getElementById('unitGrad').checked),
    'tg': (op) => fTg(op,document.getElementById('unitGrad').checked),
    'v': root2,
    'ln': logarithmE,
    'lg': logarithm10,
    'log2': logarithm2,
    '!': factorial,
    'abs': (op) => op<0 ? -op : op
};
    // '+': function(op2, op1) { return op1 + op2 },
    // '-': function(op2, op1) { return op1 - op2 },

let calcConstants = {
    'pi': Math.PI,
    'e': Math.E,
};

/**
 * Вес операции
 */
let opWeight = {
    'arcsin': 10, 'arccos': 10, 'arctg': 10, 'sin': 10, 'cos': 10, 'tg': 10, 'v': 10, 'ln': 10, 'lg': 10, 'log2': 10, 'abs': 10, '!': 10,
    '^': 4,
    '*': 3, '/': 3,
    '+': 2, '-': 2,
    '(': 1, ')': 1
};


/**
 * Право-ассоциированные операторы
 * @type {string[]}
 */
// Список операций, имеющих правую ассоциативность.
// В данный момент таких операций всего одна - '^'.
let rightAssociativity = ['^', 'arcsin', 'arccos', 'arctg', 'sin', 'cos', 'tg', 'v', 'ln', 'lg', 'log2', 'abs', '!'];


/**
 * Преобразование в число с плавающей точкой
 * @param data
 * @returns {Number}
 */
// Ремонтируются вещи, вроде 0.1+0.2=0.30000000000000004,
// периодические возникающие в JS
function toFloat(data) {
    return parseFloat(parseFloat(data).toFixed(15));
}


/**
 * Проверка на число
 * @param data
 * @returns {boolean}
 */
function isNumber(data) {
    return /^-?\d+.?\d*$/.test(data);
}


/**
 * Проверка на предписанную мат.константу
 * @param data
 * @returns {boolean}
 */
function isConstant(data) {
    return Object.keys(calcConstants).indexOf(data) > -1;
}


/**
 * Проверка на оператор
 * @param data
 * @returns {boolean}
 */
// Если переданный в функцию символ есть в объекте операторов calcMethods,
// то возвращается true, иначе false
function isOperator2(data) {
    return Object.keys(calcMethods2).indexOf(data) > -1;
}

function isOperator1(data) {
    return Object.keys(calcMethods1).indexOf(data) > -1;
}

/**
 * Преобразование выражения в обратную польскую нотацию
 * @param data
 * @returns {*}
 */
function RPN(data) {

    // Стек, используемый для временного хранения операторов.
    // К нему сразу же прикрепляем метод наш last,
    // который возвращает последний элемент стека
    let stack = [];
    stack.last = () => stack[stack.length - 1];

    // Основной стек, который возвращается из функции RPN
    let output = [];

    // Текущие элемент массива
    let t;
    
    // Последовательно рассматриваем каждый элемент полученного массива
    for (let i = 0; data[i] !== undefined; i++) {
        
        t = data[i];

        if (isNumber(t) || Object.keys(calcConstants).indexOf(t) > -1) {
            // Число заносим сразу в выходной массив
            output.push(t);

        } else if (isOperator2(t) || isOperator1(t)) {

            // Объявляем формулу сравнения в зависимости от
            // ассоциативности текущей операции
            let opCompare = rightAssociativity.indexOf(t) > -1 ?
                () => opWeight[stack.last()] > opWeight[t] :
                () => opWeight[stack.last()] >= opWeight[t];

            // Переносим элементы из временного стека в выходной
            while (stack.length > 0 && opCompare())
                output.push(stack.pop());
            
            // Помещаем текущий элемент на хранение во временный стек
            stack.push(t);

        } else if (t === '(') {
            // Заносим '(' в стек
            stack.push(t);

        } else if (t === ')') {
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
 * Расчёт выражения
 * @param exp
 * @returns {float}
 */
function calculate(exp) {

    let stack = [];
    // Прикрепляем к массиву-стеку stack метод pushFloat,
    // который получает строку, переводит её в число,
    // чуть округляет его для избавления от ошибок вычисления
    // и помещает в конец массива-стека stack )
    stack.pushFloat =
        value => stack.push(parseFloat(parseFloat(value).toFixed(15)));

    // Если выражение не задано
    // то генерируем ошибку с пояснительным текстом
    if (!exp) throw "ERROR: Expression is not specified";

    // Выводим в лог-окно принятую строку
    logWindowOut('','Воспринятое выражение:',exp);
    
    exp = exp.replace(
        new RegExp('(-?\\d+\\.?\\d*)\\s*(!+)', 'g'),
        '$2 $1'
    );
console.log(exp);
    // Преобразование выражения в обратную польскую нотацию
    let data =  RPN(exp.split(/[\s]+/));

    // Выводим в лог-окно получившуюся обратную польскую запись
    logWindowOut('Обратная польская запись:',data);
//return 'Done';
    // Идём по массиву data.
    // В случае обнаружения числа заносим его в массив-стек stack.
    // В случае обнаружения оператора изымаем из стека два последних числа,
    // производим с ними операцию, прописанную в объекте calcMethods и
    // помещаем результат в конец стека stack 
    data.forEach((item, i, arr) => {

        if (isNumber(item))
            // Заносим числа сразу в стек
            stack.pushFloat(item);
            
        else if (isConstant(item))
            //
            stack.push(calcConstants[item]);

        else if (isOperator1(item)) {

            // Выдаём ошибку если не достаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 1)
                throw 'ERROR: No data in the stack for the operation';

            // Запускаем расчёты
            stack.pushFloat(
                calcMethods1[item](stack.pop())
            );
            
        } else if (isOperator2(item)) {

            // Выдаём ошибку если не достаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 2)
                throw 'ERROR: No data in the stack for the operation';

            // Запускаем расчёты
            stack.pushFloat(
                calcMethods2[item](stack.pop(), stack.pop())
            );

        } else throw 'ERROR: Unknown symbols';

    });

    // Если в стеке остался не один операнд,
    // то генерируем ошибку с пояснительным текстом
    if (stack.length > 1)
        throw 'ERROR: Few operators in the stack';

    // Округляем ответ до меньшей точности.
    // Если этого не сделать, то, к примеру, 
    // вычисление кубического корня из 1000 вернёт 9.999999999999975
    stack[0] = parseFloat(stack[0].toFixed(12));

    // Выводим в лог-окно ответ
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
    Object.keys(calcMethods2).forEach(
        (item, i, arr) => operators.push(escape(item))
    );
    Object.keys(calcMethods1).forEach(
        (item, i, arr) => operators.push(escape(item))
    );
    Object.keys(calcConstants).forEach(
        (item, i, arr) => operators.push(escape(item))
    );
    
    // Если при записи дробных чисел использованы запятые,
    // то они интерпретируются как точки )
    data = data.replace(/,/g, '.');
    
    // Перевод символов строки в нижний регистр
    data = data.toLowerCase();
    
    // Замена 'tan'->'tg', 'log10'->'lg'
    data = data.replace(/tan/g, 'tg');
    data = data.replace(/log10/g, 'lg');
    
    // Очистка концов выражения от наиболее распространённого мусора,
    // который мог быть прихвачен при копировании (такого как кавычки).
    // Умышленно исключаем из очистки символы мат.операций,
    // поскольку лучше выдать ошибку, чем вычислить неполностью скопированный пример.
    data = data.replace(
        new RegExp('^[^0-9a-z\\.\\(\\+\\-\\*\\/\\^\\!]+', 'g'),
        ''
    );
    data = data.replace(
        new RegExp('[^0-9a-z\\)\\+\\-\\*\\/^\\^\\!]+$', 'g'),
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