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

function div(arg1, arg2) {
  if (arg2==0) {
    alert('Попытка деления на 0');
    return 'ERROR'; }
  else
    return arg1/arg2;
}

//Остаток от деления
function mod(x,y) {
  if (y==0) {
    alert('Ошибка! Нельзя получить остаток от деления числа на 0');
    return 'ERROR'; }
  return x%y;
}

//Модуль числа
function module(x) {
  return (x<0)?-x:x;
}

function power2(x) {
  return x*x;
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
        alert ('Извлечение корня чётной степени из отрицательного числа приводит к появлению мнимой единицы и в классической алгебре запрещено');
    else { 
        if (b==0)                   // Проверяем область определения
            alert ('Нельзя извлечь корень нулевой степени'); 
        else {
            var c=Math.pow(a,(1/b));    // Вычисляем корень
            return c; 
             }        
         }         
}

//Взятие натурального логарифма
function logarithmE(x) {   // Мальвина
    //Проверяем, что нам передано именно число,
    //иначе выводим во всплывающем окне сообщение об ошибке.
    //Затем делаем проверку ОДЗ.
  if (typeof x != 'number') {
    alert('Ошибка! Функция logarithmE получила неверное значение');
    return 'ERROR'; }
  if (x<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  return Math.log(x);
}

//Взятие десятичного логарифма
function logarithm10(x) {
  if (x<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  return Math.log(x)/Math.LN10;
}

//Взятие произвольного логарифма x1 по основанию x2
function logarithmX(x1, x2) {
  if (x1<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  if (x2<=0 || x2==1) {
    alert('Ошибка! Нельзя взять логарифм по отрицательному основанию, равному 0 и 1');
    return 'ERROR'; }
  return Math.log(x1)/Math.log(x2);
}

//Вычисление окружности по введённому радиусу
function circlePeriphery(r) {
  if (r<0) {
    alert('Ошибка! Введён отрицательный радиус');
    return 'ERROR'; }
  return 2*Math.PI*r;
}

function circleSquare(r) {          // функция площади круга, входящее число - радиус
    if (r<0) {                      // проверка, что введённый радиус неотрицательный
        alert('Ошибка! Введён отрицательный радиус');
        return 'ERROR'; }
    var s = Math.PI*Math.pow(r,2);  // переменная в которую записываем площадь
    return s;                       // вычисление площади круга по формуле      
}                                   // возврат результата плащади круга

//Перевод из градусов в радианы
function gradRad(grad) {
  return grad*Math.PI/180;
}

//Перевод из радиан в градусы
function RadGrad(rad) {
  return rad*180/Math.PI;
}

//Взятие факториала
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
