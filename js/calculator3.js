/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

// Экран вывода информации
let display = document.getElementById('display');
display.value = '';

// Вывод информации в лог-окно
let logWindow = document.getElementById('logWindow');

// Если в sessionStorage.memory сохранено значение, то помещаем его во всплывающую посказку
if (sessionStorage.memory)
    document.getElementById('memoryRead').title = sessionStorage.memory;

let calculatorBinds = {
    'one': () => displayInput('1'),
    'two': () => displayInput('2'),
    'three': () => displayInput('3'),
    'four': () => displayInput('4'),
    'five': () => displayInput('5'),
    'six': () => displayInput('6'),
    'seven': () => displayInput('7'),
    'eight': () => displayInput('8'),
    'nine': () => displayInput('9'),
    'zero': () => displayInput('0'),
    'delimiter': () => displayInput('.'),
    'backspace': () => displayDelete(),
    'clear': () => display.value = '',
    'div': () => displayInput('/'),
    'mul': () => displayInput('*'),
    'sub': () => displayInput('-'),
    'sum': () => displayInput('+'),
    'lbracket': () => displayInput('('),
    'rbracket': () => displayInput(')'),
    'power2': () => displayInput('^2'),
    'powerX': () => displayInput('^'),
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
        display.select();
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


// Добавляем к полю ввода обработчик нажатия клавиш
display.addEventListener('keypress', function(e) {
    
  if (e.keyCode==13 || e.charCode==61) {
      
    //останавливаем дальнейшую обработку нажатия, чтобы '=' не пропечатывалось
    e.preventDefault();
    
    //запускаем функцию вычисления
    equality();
  }
});


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
    
    let selStart = display.selectionStart;
    let selEnd = display.selectionEnd;
    
    sessionStorage.memory = selStart == selEnd ? display.value : display.value.slice(selStart,selEnd);
     
    document.getElementById('memoryRead').title = sessionStorage.memory;
    if (sessionStorage.memory != '')
        logWindow.out('<br><span style="color: blue">память &nbsp;&larr;&nbsp; '+sessionStorage.memory+'</span>');
    else
        logWindow.out('<br><span style="color: blue">Очистка памяти</span>');
    
    display.focus();
}


/**
 * Задаём функцию помещения содержимого памяти в окно ввода
 */
function fMemoryRead() {
    if (sessionStorage.memory !== undefined && sessionStorage.memory !== '') {
        displayInput(sessionStorage.memory);
        logWindow.out('<br><span style="color: blue">'+sessionStorage.memory+' &nbsp;&rarr;&nbsp; дисплей</span>');
    } else 
        logWindow.out('<br><span style="color: blue">Память пуста</span>');
}


/**
 * Задаём функцию ввода нового символа в окно ввода
 */
function displayInput(newCh) {

    let str = display.value;
    let selStart = display.selectionStart;
    display.value = str.slice(0,selStart)+newCh+str.slice(display.selectionEnd,str.length);
    display.selectionEnd = selStart+newCh.length;
    display.focus(); 
}


/**
 * Задаём функцию удаления части окна ввода
 */
function displayDelete() {

    let str = display.value;
    let selStart = display.selectionStart;
    let selEnd = display.selectionEnd;
    
    if (selEnd > 0 && selStart == selEnd) {
        display.value = str.slice(0,selStart-1)+str.slice(display.selectionEnd,str.length);
        display.selectionEnd = selStart-1;
    } else {
        display.value = str.slice(0,selStart)+str.slice(selEnd,str.length);
        display.selectionEnd = selStart;
    }

    display.focus();  
}