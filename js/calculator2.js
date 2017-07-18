/* Файл содержит набор функций для работы со вторым интерфейсом кальлькулятора.
   Все они могут быть легко применимы и для третьего интерфейса. */

// Очистка поля ввода
function fClearField() {
  document.getElementById('calculatedExpression').innerHTML = '';
  document.getElementById('inOutField').value = '0';
}

// Вставка нового символа в конец поля ввода
function fInsetChar (ch) {
  var elem = document.getElementById('inOutField');
    //Вначале проверяем некоторые частные случаи и обрабатываем их особо,
    //а иначе добавляем новый символ в конец.
    //Работает, но следует додумать - это не самый оптимальный путь.
  if (elem.value==='0' && (ch=='+'||ch=='*'||ch=='/'||ch=='%'||ch=='^')) 
    elem.value = '0'+ch;
  else if (elem.value==='0' || elem.value==='')
    elem.value = (ch==='.')?'0.':ch;     //не пугаться: мудрёный, но быстрый тернарный оператор
  else if (elem.value=='.')
    elem.value = '0.'+ch;
  else if (elem.value=='-.')
    elem.value = '-0.'+ch;
  else
    elem.value += ch;
}

// Удаление последнего символа в поле ввода
function fDeleteLastCh () {
  var elem = document.getElementById('inOutField');
  var str = elem.value;
  if (str.length<=1)
    elem.value = '0';
  else
    elem.value = str.substring(0,str.length-1);
}

// Считывание значений, определение выполняемой операции,
// вызов соответствующей вычисляющей функции,
// вывод результата
function fCalculateExpression() {
  var str = document.getElementById('inOutField').value;
    //Выделяем в выражении операнды и оператор
  var op = str.match(/[(\s]*([\-\.\d]+)[)\s]*([+\-*\/%^])[(\s]*([\-\.\d]+)/);
    //Проверяем успешность предыдущей операции
  if(!op) {
    alert('Не удалось разбить выражение на составные части');
    return; }
    //Преобразуем строки в числа,
    //иначе при дробных значениях те сложатся как строки
  op[1] = Number(op[1]);
  op[3] = Number(op[3]);

  var calExp = document.getElementById('calculatedExpression');
  var i;
  var result;
    
    //Выводим вычисляемое выражение в верхний верхний угол строки ввода калькулятора,
    //полезно для проверки и тестирования
  calExp.innerHTML = '';
  for (i=1; i<op.length; i++)
    calExp.innerHTML += op[i]+' ';
  calExp.innerHTML += '=';

    //Выбор и вызов вычисляющей функции
  switch(op[2]) {
    case '+': result = sum(op[1], op[3]); break;
    case '-': result = sub(op[1], op[3]); break;
    case '*': result = mul(op[1], op[3]); break;
    case '/': result = div(op[1], op[3]); break;
    case '%': result = mod(op[1], op[3]); break;
    case '^': result = powerX(op[1], op[3]); break;
    default: alert('Неизвестная операция'); return; }
  
    // Вывод результата
  document.getElementById('inOutField').value = result;
}

// Обработчик нажатия клавиш, чтобы можно было запускать вычисление с клавиатуры
// по нажатию на Enter или =
function fKeyPress(e){
  if (e.keyCode==13 || e.charCode==61) {
    e.preventDefault();      //останавливаем дальнейшую обработку нажатия, чтобы '=' не пропечатывалось
    fCalculateExpression();  //запускаем функцию вычисления
  }
}