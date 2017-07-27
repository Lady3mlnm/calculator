/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

// Экран вывода информации
let display;

// Вывод информации в лог-окно
let logWindow;

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
        logWindow.out('<span style="color: red">'+err+'</span>');
        console.error(err);
        alert('Выражение не может быть вычислено');
    }

}



// К объекту document привязываем слушатель события "DOMContentLoaded".
// После формирования структуры документа тот запускает функцию,
// выполняющую ряд действий
document.addEventListener("DOMContentLoaded", function(event) {

    // Привязываем объекты к переменным
    display = document.getElementById('display');
    logWindow = document.getElementById('logWindow');

    // Передаём фокус на поле ввода калькулятора
    display.focus();

    // Формируем метод, позволяющий выводить сообщения в лог-окно.
    // Количество параметров может быть любым,
    // каждый выводится в отдельной строке
    logWindow.out = function() {

        // Выводим полученные функцией аргументы,
        // беря их из свойства arguments.
        // Благодаря этому приёму мы можем динамически определить число переданных параметров
        for (let i=0; i<arguments.length; i++)
            logWindow.innerHTML += Array.isArray(arguments[i]) ? '<br>'+arguments[i].join(' &nbsp;') : '<br>'+arguments[i];

        // Перематываем окно вниз
        logWindow.scrollTop = logWindow.scrollHeight - logWindow.clientHeight;
    }

    // Привязываем функции к кнопкам.
    // Идентификаторы кнопок и соответствующие им функции
    // берутся из объекта calculatorBinds
    Object.keys(calculatorBinds)
        .forEach(function (item, i, arr) {
            document.getElementById(item).onclick = calculatorBinds[item];
        }
    );

});