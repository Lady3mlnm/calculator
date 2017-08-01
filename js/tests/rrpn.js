/**
 * Функция rRPN, обеспечивающая разбивку строки в стек польской записи рекурсивным методом.
 * Является альтернативой функции RPN
 * Для задействования необходимо вставить в функцию calculate(exp) строку
 * let data = rRPN(exp.split(/[\s]+/), []);
 */

 /**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

/**
 * Преобразование выражения в обратную польскую нотацию
 * NOTE: Используются рекурсивные вызовы
 * @param data
 * @param stack
 * @returns {*}
 */
 /*
function rRPN(data, stack) {

    // Получение последнего значения из
    // стека без его удаления
    stack.last = () => stack[stack.length - 1];

    // Если число, то переходим в следующему элементу данных
    if (isNumber(data[0]))
        return [data[0]].concat(rRPN(data.slice(1), stack));

    // Если текущий элемент является оператором
    if (isOperator(data[0])) {

        // Объявляем формулу сравнения в зависимости от
        // ассоциативности текущей операции
        let opCompare = rightAssociativity.indexOf(data[0]) > -1 ?
            () => opWeight[stack.last()] > opWeight[data[0]] :
            () => opWeight[stack.last()] >= opWeight[data[0]];

        // Переносим операции из стека с высоким приоритетом
        if (stack.length > 0 && opCompare())
            return [stack.pop()].concat(rRPN(data, stack));

        stack.push(data[0]);
        return rRPN(data.slice(1), stack);
    }

    // Заносим открывающую скобку в стек
    if (data[0] === '(') {
        stack.push(data[0]);
        return rRPN(data.slice(1), stack);
    }

    if (data[0] === ')') {

        // Если в стеке нет операций
        if (stack.length < 1)
            throw 'ERROR: There is no opening bracket on the stack';

        // Переносим операции из стека пока не
        // встретим открывающую скобку
        if (stack.last() === '(') {
            stack.pop();
            return rRPN(data.slice(1), stack);

        } else return [stack.pop()].concat(rRPN(data, stack));

    }

    // Остатки операций в стеке
    if (data.length < 1)
        return [].concat(stack);

    // Если в выражении есть недопустимое значение
    throw 'ERROR: Expression not valid';
}
*/