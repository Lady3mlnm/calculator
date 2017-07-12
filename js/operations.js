// Функции для реализации

function catOperation(arg1)
{
	alert('Мяу ' + arg1);
}

function sum(a,b) {     // функция сложения, входящие данные - два числа
    var c = a + b;      // переменная в которую записываем сумму
    return c;           // сложение двух чисел и запись результата в "с"      
}                       // возврат результата суммирования двух чисел

function sub(arg1, arg2) { //Аня
    var subResult = arg1 - arg2;
    return subResult;
}

function mul(arg1, arg2) {
  return arg1*arg2;
}

//Остаток от деления
function mod(x,y) {
  return x%y;
}

function div(arg1, arg2) {
  if (arg2==0) {
    alert('Попытка деления на 0');
    return 'ERROR'; }
  else
    return arg1/arg2;
}

function module(arg1, arg2) {
  return 'Ещё не реализовано';
}

function power2(arg1) {
  return 'Ещё не реализовано';
}

function powerX(x,y) {
  if (x==0 && y<=0) {
    alert('Результат от возведения 0 в неположительную степень неопределён');
    return 'ERROR'; }
  if (x<0) {
    alert('Возведение в степень отрицательного числа часто приводит к комплексным числам и в классической алгебре запрещено.');
    return 'ERROR'; }
  return Math.pow(x,y);
}

function root2(a) { // функция квадратного корня
    var c=rootX(a,2);
    return c;
}

function rootX(a, b) {              // Извлечение из числа a корня степени b
    if (a<0 && (b%2)==0)            // Проверяем область определения
        alert ('Нельзя извлечь корень четной степени из отрицательного числа');
    else { 
        if (b==0)                   // Проверяем область определения
            alert ('Нельзя извлечь корень нулевой степени'); 
        else {
            var c=Math.pow(a,(1/b));    // Вычисляем корень
            return c; 
             }        
         }         
}

function logarithmE(x1) {   // Мальвина
    //Проверяем, что нам передано именно число,
    //иначе выводим во всплывающем окне сообщение об ошибке.
    //Затем делаем проверку ОДЗ.
  if (typeof x1 != 'number') {
    alert('Ошибка! Функция logarithmE получила неверное значение');
    return 'ERROR'; }
  if (x1<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  return Math.log(x1);
}

function logarithm10(arg1) {
  return 'Ещё не реализовано';
}

function logarithmX(arg1, arg2) {
  return 'Ещё не реализовано';
}

function circlePeriphery(arc1) {
  return 'Ещё не реализовано';
}

function circleSquare(r) {          // функция площади круга, входящее число - радиус
    var s = Math.PI*Math.pow(r,2);  // переменная в которую записываем площадь
    return s;                       // вычисление площади круга по формуле      
}                                   // возврат результата плащади круга

function gradRad(arc1) {
  return 'Ещё не реализовано';
}

function RadGrad(arg1) {
  return 'Ещё не реализовано';
}

function Factorial(n) {
  if (typeof n != 'number') {
    alert('Ошибка! Функция Factorial получила неверное значение');
    return 'ERROR'; }
  if (n<0) {
    alert('Ошибка! Попытка взятия факториала от отрицательного числа.');
    return 'ERROR'; }
  if (Math.floor(n)-n != 0) {
    alert('Ошибка! Попытка взятия факториала от дробного числа.');
    return 'ERROR'; }

  var i,r=1;
  for (i=1; i<=n; i++)
    r *= i;

  return r;
}
