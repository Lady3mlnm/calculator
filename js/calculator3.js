/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

// Экран вывода информации
let display = document.getElementById('display');

// Вывод информации в лог-окно
let logWindow = document.getElementById('logWindow');

// Если в sessionStorage.memory сохранено значение, то помещаем его во всплывающую посказку
if (sessionStorage.memory)
    document.getElementById('memoryRead').title = sessionStorage.memory;

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
    'memoryState': fMemoryState,
    'memoryRead': fMemoryRead,
    'equality' : equality,
};


/**
 * Действие по нажатию кнопки "равно"
 */
function equality() {

    try {
        display.value = calculate(calculateFormat(display.value));
        display.focus();
    } catch (err) {
        logWindow.out('<span style="color: red">'+err+'</span>');
        console.error(err);
        alert('Выражение не может быть вычислено');
    }

}


// Прикрепление к кнопкам функций-обработчиков,
// прописанных нами в объекте calculatorBinds.
// Обращаю внимание, что в отличие от Нэнсиного кода,
// этот выполняется уже после загрузки всего документа
for (let t in calculatorBinds) 
    document.getElementById(t).addEventListener('click', calculatorBinds[t]);


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


// Передаём фокус на поле ввода калькулятора
display.focus();


/**
 * Задаём функцию сохранения содержимого окна ввода в память
 */
function fMemoryState() {
    sessionStorage.memory = display.value;
    document.getElementById('memoryRead').title = sessionStorage.memory;
    if (sessionStorage.memory != '')
        logWindow.out('<br><span style="color: blue">'+sessionStorage.memory+' &nbsp;сохранено в памяти</span>');
    else
        logWindow.out('<br><span style="color: blue">Очистка памяти</span>');
}


/**
 * Задаём функцию помещения содержимого памяти в окно ввода
 */
function fMemoryRead() {
    if (sessionStorage.memory !== undefined && sessionStorage.memory !== '') {
        display.value += sessionStorage.memory;
        logWindow.out('<br><span style="color: blue">'+sessionStorage.memory+' &nbsp;помещено в окно ввода</span>');
    } else 
        logWindow.out('<br><span style="color: blue">Память пуста</span>');
}