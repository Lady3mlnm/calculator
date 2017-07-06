// Функции для реализации

function sum(a,b) {     // функция сложения, входящие данные - два числа
    var c = a + b;      // переменная в которую записываем сумму
    return c;           // сложение двух чисел и запись результата в "с"      
}                       // возврат результата суммирования двух чисел

function sub(arg1, arg2) { //Аня
    var subResult = arg1 - arg2;
    return subResult;
}

function mul(arg1, arg2) { //Саша
  return "'mul()' ещё не реализовано";
}

function div(arg1, arg2) { //Саша
  return "'div()' ещё не реализовано";
}

function module(arg1, arg2) { //Ваня
  return 'Ещё не реализовано';
}

function power2(arg1) { // Яна
  return 'Ещё не реализовано';
}

function powerX(arg1, arg2) { // Яна
  return 'Ещё не реализовано';
}

function root2(a) { // функция квадратного корня
    var c=rootX(a,2);
    return c;
}

function rootX(a, b) {              // Извлечение из числа a корня степени b
    if (a<0 && (b%2)==0)            // Проверяем область определения
        alert ('Нельзя извлечь корень четной степени из отрицательного числа');
     else { 
         if (b==0)                  // Проверяем область определения
         alert ('Нельзя извлечь корень нулевой степени') 
         else {
             var c=Math.pow(a,(1/b));    // Вычисляем корень
             return c; 
              }        
          }         
}

function logarithmE(x1) {   // Мальвина
    // выводим сообщение в лог, что функция получила управление - для отладки
  console.log('Function logarithmE is launched.');
    // проверяем, что нам передано именно число, иначе выбрасываем сообщение об ошибке
  if (typeof x1 != 'number') {
    alert('Ошибка! Функция logarithmE получила неверное значение');
    return 'ERROR'; }
  else
    return Math.log(x1);
}

function logarithm10(arg1) { // Витя
  return 'Ещё не реализовано';
}

function logarithmX(arg1, arg2) { // Витя
  return 'Ещё не реализовано';
}

function circlePeriphery(arc1) { // Карина
  return 'Ещё не реализовано';
}

function circleSquare(r) {          // функция площади круга, входящее число - радиус
    var s = Math.PI*Math.pow(r,2);  // переменная в которую записываем площадь
    return s;                       // вычисление площади круга по формуле      
}                                   // возврат результата плащади круга

function gradRad(arc1) { // Катя
  return 'Ещё не реализовано';
}

function RadGrad(arg1) { // Катя
  return 'Ещё не реализовано';
}
