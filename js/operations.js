// Функции для реализации

// Сложение
function sum(a,b) {
    return a+b;      
}                  

// Вычитание
function sub(a, b) {
    return a-b;
}

// Умножение
function mul(arg1, arg2) {
  return arg1*arg2;
}

// Деление
function div(arg1, arg2) {
  if (arg2==0) {
    alert('Попытка деления на 0');
    return 'ERROR'; }
  else
    return arg1/arg2;
}

// Остаток от деления
function mod(x,y) {
  if (y==0) {
    alert('Ошибка! Нельзя получить остаток от деления числа на 0');
    return 'ERROR'; }
  return x%y;
}

// Модуль числа
function module(x) {
  return (x<0)?-x:x;
}

// Возведение в квадрат
function power2(x) {
  return x*x;
}

// Возведение в произвольную степень
function powerX(x,y) {
  if (x==0 && y<=0) {
    alert('Результат от возведения 0 в неположительную степень неопределён');
    return 'ERROR'; }
  if (x<0 && !Number.isInteger(y)){
    alert('Возведение отрицательного числа дробную степень приводит к комплексным числам и в классической алгебре запрещено.');
    return 'ERROR'; }
  return Math.pow(x,y);
}

// Квадратный корень
function root2(x) {
  if (x<0) {
    alert('Взятие корня из отрицательного числа приводит к комплексным числам и в классической алгебре забрещено.');
    return 'ERROR'; }
  return Math.sqrt(x);
}

// Извлечение из числа a корня степени b
function rootX(a, b) {              
    if (a<0 && (b%2)==0)             // Проверяем область определения
        alert ('Извлечение корня чётной степени из отрицательного числа приводит к появлению мнимой единицы и в классической алгебре запрещено');
    else
        if (b==0)                    // Проверяем область определения
            alert ('Нельзя извлечь корень нулевой степени'); 
        else
            return Math.pow(a,(1/b)); // Вычисляем корень
}

// Взятие натурального логарифма
function logarithmE(x) {
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

// Взятие десятичного логарифма
function logarithm10(x) {
  if (x<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  return Math.log(x)/Math.LN10;
}

// Взятие произвольного логарифма x1 по основанию x2
function logarithmX(x1, x2) {
  if (x1<=0) {
    alert('Ошибка! Нельзя взять логарифм от переменной со значением меньшим или равным 0');
    return 'ERROR'; }
  if (x2<=0 || x2==1) {
    alert('Ошибка! Нельзя взять логарифм по отрицательному основанию, равному 0 и 1');
    return 'ERROR'; }
  return Math.log(x1)/Math.log(x2);
}

// Вычисление окружности по введённому радиусу
function circlePeriphery(r) {
  if (r<0) {
    alert('Ошибка! Введён отрицательный радиус');
    return 'ERROR'; }
  return 2*Math.PI*r;
}

// Вычисление площади круга по введённому радиусу
function circleSquare(r) {          
    if (r<0) {
        alert('Ошибка! Введён отрицательный радиус');
        return 'ERROR'; }
    return Math.PI*r*r;     
}

// Перевод из градусов в радианы
function gradRad(grad) {
  return grad*Math.PI/180;
}

// Перевод из радиан в градусы
function RadGrad(rad) {
  return rad*180/Math.PI;
}

// Взятие факториала
function Factorial(n) {
  if (typeof n != 'number') {
    alert('Ошибка! Функция Factorial получила неверное значение');
    return 'ERROR'; }
  if (n<0) {
    alert('Ошибка! Попытка взятия факториала от отрицательного числа.');
    return 'ERROR'; }
  if (!Number.isInteger(n)) {
    alert('Ошибка! Попытка взятия факториала от дробного числа.');
    return 'ERROR'; }

  var r=1;
  for (var i=1; i<=n; i++)
    r *= i;

  return r;
}
