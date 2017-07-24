/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

// Экран вывода информации
let display;


let calculatorBinds = {
    'one': () => display.value += '1',
    'two': () => display.value += '2',
    'three': function() { return display.value += '3'; }, //(Более понятная запись сокращений)
    'four': function() { return display.value += '4'; },
    'five': () => display.value += '5',
    'six': () => display.value += '6',
    'seven': () => display.value += '7',
    'eight': () => display.value += '8',
    'nine': () => display.value += '9',
    'zero': () => display.value += '0',
    'delimiter': () => display.value += '.',
    'backspace': () => display.value = display.value.slice(0, -1),
    'clear': () => display.value = '',
    'div': () => display.value += '/',
    'mul': () => display.value += '*',
    'sub': () => display.value += '-',
    'sum': () => display.value += '+',
    'lbracket': () => display.value += '(',
    'rbracket': () => display.value += ')',
    'power2': () => display.value += '^2',
    'powerX': () => display.value += '^',
    'root2': () => alert("Not implemented"),
    'rootX': () => alert("Not implemented"),
    'logarithmE': () => alert("Not implemented"),
    'logarithmX': () => alert("Not implemented"),
    'equality' : equality,
};

/**
 * Действие по нажатию кнопки "равно"
 */
function equality() {

    try {
        display.value = calculate(calculateFormat(display.value));
    } catch (err) {
        console.log(err);
        alert('Выражение не может быть вычислено');
    }

}


// Выполнить код после полной загрузки документа
// (К объекту document привязывается слушатель события "DOMContentLoaded".
//  После формирования структуры документа тот привязывает к кнопкам
//  калькулятора соответствующие им функции)
document.addEventListener("DOMContentLoaded", function(event) {

    // (Привязка объекта к переменной)
    display = document.getElementById('display');

    // Привязка функций к кнопкам
    // (Идентификаторы кнопок и привязываемые к ним функции
    //  берутся из объекта calculatorBinds)
    Object.keys(calculatorBinds)
        .forEach(function (item, i, arr) {
            document.getElementById(item).onclick = calculatorBinds[item];
        }
    );

});