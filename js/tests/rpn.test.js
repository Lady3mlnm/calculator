/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */
// Для вычисления эталонных значений использовался калькулятор https://www.calculator-pro.ru/
// Обращу внимание, что тестовые числа лучше выводить как строки, а не как числа,
// поскольку даже при выводе в консоль имеет место округление

console.group("Test block");

console.log(calculate("1"),' vs 1');
console.log(calculate(calculateFormat("(1)")),' vs 1');
console.log(calculate(calculateFormat("1+3")),' vs 4');
console.log(calculate(calculateFormat("5 +((1 + 2) * 4)   - 3")),' vs 14');
console.log(calculate(calculateFormat("((-6.6+(10.4+(-4)))/(1+4^2)+1)")),' vs 0.988235294117647');
console.log(calculate(calculateFormat("-1+(-6.6 +  (10.4   +(-4)))/(1+4^2)+1--1")),' vs 0.988235294117647');
console.log(calculate(calculateFormat("-(1+1)+(-(2+2))+(-(3+3))")),' vs -12');
console.log(calculate(calculateFormat("11+22*33+44*55^6")),' vs 1217948188237');
console.log(calculate(calculateFormat("5*3/2")),' vs 7.5');
console.log(calculate(calculateFormat("13+11+5*3/2-7")),' vs 24.5');
console.log(calculate(calculateFormat("13.+11.+5*3/2,-7,+1.")),' vs 25.5');
console.log(calculate(calculateFormat(".3+.2+,8*.45/.12/,9-.5--,9")),' vs 4.2333333333333333');
console.log(calculate(calculateFormat("_ )'-,5+6.6'( _")),' vs 6.1');
console.log(calculate(calculateFormat("pi")),' vs pi');
console.log(calculate(calculateFormat("v(4-1)!!")),' vs 26.8328157299974764');

console.groupEnd();
console.log("Testing done");

// display.value = '888+123+999';
// display.selectionEnd = 6;