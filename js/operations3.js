/**
 * Created by group "TechhnoFractal" http://technofractal.org/
 * Date: 2017 Jule-August
 */

"use strict";


// Перевод из градусов в радианы
function gradRad(grad) {
    return grad*Math.PI/180;
}

// Перевод из радиан в градусы
function radGrad(rad) {
    return rad*180/Math.PI;
}

// Деление
function div(x, y) {
    if (y==0)
        throw 'Недопустимая мат.операция: деление на ноль';
    return x/y;
}

// Возведение в произвольную степень
function powerX(x,y) {
    if (x==0 && y<=0)
        throw 'Недопустимая мат.операция: результат от возведения 0 в неположительную степень неопределён';
    if (x<0 && y!=Math.floor(y))
        throw 'Недопустимая мат.операция: отрицательное основание при дробной степени';
    return Math.pow(x,y);
}

// Квадратный корень
function root2(x) {
    if (x<0)
        throw 'Недопустимая мат.операция: взятие корня из отрицательного числа'
    return Math.sqrt(x);
}

// Взятие натурального логарифма
function logarithmE(x) {
    if (x<=0)
        throw 'Недопустимая мат.операция: взятие натурального логарифма от неположительного числа';
    return Math.log(x);
}

// Взятие десятичного логарифма
function logarithm10(x) {
    if (x<=0)
        throw 'Недопустимая мат.операция: взятие десятичного логарифма от неположительного числа';
    return Math.log(x)/Math.LN10;
}

// Взятие логарифма по основанию 2
function logarithm2(x) {
    if (x<=0)
        throw 'Недопустимая мат.операция: взятие логарифма от неположительного числа';
    return Math.log(x)/Math.LN2;
}

// Взятие факториала
function factorial(n) {
    if (n<0)
        throw 'Недопустимая мат.операция: взятие факториала от отрицательного числа';
    if (n!=Math.floor(n))
        throw 'Недопустимая мат.операция: взятие факториала от дробного числа';

    let r=1;
        for (let i=1; i<=n; i++)
    r *= i;

    return r;
}

// Синус
function fSin(angle, isGrad) {
    if (isGrad)
        angle = gradRad(angle);
    return Math.sin(angle);
}

// Косинус
function fCos(angle, isGrad) {
    if (isGrad)
        angle = gradRad(angle);
    return Math.cos(angle);
}

// Тангенс
function fTg(angle, isGrad) {
    if (isGrad)
        angle = gradRad(angle);
    if (!toFloat(fCos(angle,false)))
        throw 'Недопустимая мат.операция: попадание тангенса на асимптоту';
    return Math.tan(angle);
}

// Арксинус
function fArcsin(x, isGrad) {
    if (x<-1 || x>1)
        throw 'Недопустимая мат.операция: взятие арксинуса от числа, выходящего за границы [-1,1]';
    return isGrad ? radGrad(Math.asin(x)) : Math.asin(x);
}

// Арккосинус
function fArccos(x, isGrad) {
    if (x<-1 || x>1)
        throw 'Недопустимая мат.операция: взятие арккосинуса от числа, выходящего за границы [-1,1]';
    return isGrad ? radGrad(Math.acos(x)) : Math.acos(x);
}

// Арктангенс
function fArctg(x, isGrad) {
    return isGrad ? radGrad(Math.atan(x)) : Math.atan(x);
}