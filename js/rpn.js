/**
 * Created by group "TechhnoFractal" http://technofractal.org/
 * Date: 2017 Jule-August
 */

"use strict";


/**
 * Наборы методов и констант для вычисления выражения
 */
let calcMethods2 = {
    '*': (op2, op1) => op1 * op2,
    '/': (op2, op1) => div(op1,op2),
    '+': (op2, op1) => op1 + op2,    // function(op2, op1) { return op1 + op2 }
    '-': (op2, op1) => op1 - op2,
    '^': (op2, op1) => powerX(op1, op2)
};

let calcMethods1 = {
    'v': root2,
    'ln': logarithmE,
    'lg': logarithm10,
    'log2': logarithm2,
    '!': factorial,
    'abs': (op) => op<0 ? -op : op,
    'sin': (op) => fSin(op,document.getElementById('unitGrad').checked),
    'cos': (op) => fCos(op,document.getElementById('unitGrad').checked),
    'tg': (op) => fTg(op,document.getElementById('unitGrad').checked),
    'arcsin': (op) => fArcsin(op,document.getElementById('unitGrad').checked),
    'arccos': (op) => fArccos(op,document.getElementById('unitGrad').checked),
    'arctg': (op) => fArctg(op,document.getElementById('unitGrad').checked)
};

let calcConstants = {
    'pi': Math.PI,
    'e': Math.E,
    '-pi': -Math.PI,
    '-e': -Math.E
};


/**
 * Хранилище последней операции
 */
let lastOperationStore = [];


/**
 * Вес операции
 */
let opWeight = {
    'v': 10, 'ln': 10, 'lg': 10, 'log2': 10, '!': 10, 'abs': 10,
    'sin': 10, 'cos': 10, 'tg': 10, 'arcsin': 10, 'arccos': 10, 'arctg': 10,
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
    return /^-?\d+\.?\d*$/.test(data);
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
 * Одновременно проверяем на число и константу
 */
function isNumberOrConstant(data) {
    return isNumber(data) || isConstant(data);
}


/**
 * Проверки на операторы
 * @param data
 * @returns {boolean}
 */
// Если переданный в функцию символ есть в объекте операторов calcMethods2,
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

        } else throw 'ОШИБКА: нераспознанное выражение '+t+'\nРекомендуется изучить лог операций';

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

    let stack = [];
    // Прикрепляем к массиву-стеку stack метод pushFloat,
    // который получает строку, переводит её в число,
    // чуть округляет его для избавления от ошибок вычисления
    // и помещает в конец массива-стека stack )
    stack.pushFloat =
        value => stack.push(parseFloat(parseFloat(value).toFixed(15)));

    // Если выражение не задано
    // то генерируем ошибку с пояснительным текстом
    if (!exp) throw "ОШИБКА: выражение не задано";

    // Если в выражении есть факториалы, то перемещаем их вперёд числа
    exp = exp.replace(
        new RegExp('(-?\\d+\\.?\\d*)\\s*(!+)', 'g'),
        '$2 $1'
    );

    // Преобразование выражения в обратную польскую нотацию
    let data =  RPN(exp.split(/[\s]+/));

    // Если выражение состоит из одного числа и у нас есть запомненная операция, то применяем её.
    // Иначе если введена лишь одна простая операция, то запоминаем её.
    // Иначе удаляем из памяти запомненную операцию, чтобы не путала
    if (data.length == 1 && isNumberOrConstant(data[0]) && lastOperationStore.length > 0) {

        logWindowOut('Повторение последней операции:');
        if (lastOperationStore.length==2)
            logWindowOut(data[0]+' '+lastOperationStore[1]+' '+lastOperationStore[0])
        else if (lastOperationStore[0]=='!')
            logWindowOut(data[0]+' !')
        else
            logWindowOut(lastOperationStore[0]+' '+data[0]);
        data = data.concat(lastOperationStore);

    } else {

        if (data.length == 2 && isOperator1(data[1]) && isNumberOrConstant(data[0])) {
            lastOperationStore = [data[1]];
        } else if (data.length == 3 && isOperator2(data[2]) && isNumberOrConstant(data[1]) && isNumberOrConstant(data[0])) {
            lastOperationStore = [data[1],data[2]];
        } else
        lastOperationStore = [];

        // Выводим в лог-окно получившуюся обратную польскую запись
        logWindowOut('Обратная польская запись:',data);
    }

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
            // Вместо мат.константы заносим в стек её значение
            stack.push(calcConstants[item]);

        else if (isOperator1(item)) {

            // Выдаём ошибку если недостаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 1)
                throw 'ОШИБКА: предполагается пропуск числа или лишний оператор';

            // Запускаем расчёты
            stack.pushFloat(
                calcMethods1[item](stack.pop())
            );

        } else if (isOperator2(item)) {

            // Выдаём ошибку если не достаточно операндов
            // в стеке для выполнения текущей операции
            if (stack.length < 2)
                throw 'ОШИБКА: предполагается пропуск числа или лишний оператор';

            // Запускаем расчёты
            stack.pushFloat(
                calcMethods2[item](stack.pop(), stack.pop())
            );

        // Это исключение никогда не должно сработать, поскольку все символы
        // уже профильтрованы в функции RPN, но лучше перестраховаться
        } else throw 'ОШИБКА: нераспознанное выражение '+item+' в функции calculate';

    });

    // Если в стеке остался не один операнд,
    // то генерируем ошибку с пояснительным текстом
    if (stack.length > 1)
        throw 'ОШИБКА: предполагается наличие лишнего числа или пропуск оператора';

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
 * (О работе регулярных выражений здесь смотреть doc/RegExp_explanation.js)
 * NOTE: Может пригодится для вызова из приложения
 * @param data
 * @return {*}
 */
function calculateFormat(data) {

    // Если при записи дробных чисел использованы запятые,
    // то они интерпретируются как точки )
    data = data.replace(/,/g, '.');

    // Перевод символов строки в нижний регистр
    data = data.toLowerCase();

    // Замена 'tan'->'tg', 'log10'->'lg'
    data = data.replace(/tan/g, 'tg');
    data = data.replace(/log10/g, 'lg');

    // расшифровка символов ½, ⅓, π
    data = data.replace(/½/g, '0.5');
    data = data.replace(/⅓/g, '(1/3)');
    data = data.replace(/π/g, 'pi');

    // Очистка концов выражения от наиболее распространённого мусора,
    // который мог быть прихвачен при копировании (такого как кавычки).
    // Умышленно исключаем из очистки символы мат.операций,
    // поскольку лучше выдать ошибку, чем вычислить неполностью скопированный пример.
    data = data.replace(/^[^0-9a-z\.\(\+\-\*\/\^\!]+/, '');
    data = data.replace(/[^0-9a-z\)\+\-\*\/\^\!]+$/, '');

    // Если пользователь ввёл числа в виде '.3' или '-.2', то перед точкой вставляем '0'
    data = data.replace(/^\./,'0.');                 // в начале строки
    data = data.replace(/([\D])(\.\d)/g, '$10$2');   // в середине строки

    // Преобразование операторов и скобок.
    // Вокруг знаков операторов и скобок размещаем ровно один пробел.
    // ('Некрасивость' этой команды в том, что пробелы между последовательно
    //  найденными символами суммируются.)
    data = data.replace(
        new RegExp('\\s*(' + shieldedOperators.join('|')+'|\\(|\\))\\s*', 'g'),
        ' $1 '
    );

    // Там, где получилось 2 и более пробелов, схлопываем их.
    // И сразу же удаляем пробелы с концов строки.
    data = data.replace(/\s{2,}/g, ' ').trim();

    // Отфильтровка случаев, когда знак минус является признаком отрицательности числа,
    // а не символом мат.операции.
    // Вначале обрабатываем случай, когда отрицательное значение стоит в самом начале выражения.
    // В том числе учитываем существование мат.констант.
    data = data.replace(/^-\s?(\d+|pi|e)/, '-$1');

    // Общий случай, когда отрицательное число в середине выражения.
    data = data.replace(
        new RegExp('(' + shieldedOperators.join('|') + '|\\()\\s?-\\s?(\\d+|pi|e)', 'g'),
        '$1 -$2'
    );

    // Обрабатываем случай, когда выражение начинается с '-(', '-sin' и т.п.
    data = data.replace(
        new RegExp('^-\\s?(' + shieldedOperators.join('|')+'|\\()'),
        '0 - $1'
    );

    // Обрабатываем случаи с выражениями '(-(', '(-sin' и т.п.
    data = data.replace(
        new RegExp('\\(\\s?-\\s?(' + shieldedOperators.join('|')+'|\\()', 'g'),
        '( 0 - $1'
    );

    // Выводим в лог-окно получившуюся отформатированную строку
    logWindowOut('','Воспринятое выражение:',data);

    return data;
}