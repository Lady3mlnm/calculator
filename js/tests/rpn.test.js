/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */
//Для вычисления эталонных значений использовался калькулятор https://www.calculator-pro.ru/
console.group("Test block");

console.log(calculate("1"),' vs ',1);
console.log(calculate(calculateFormat("(1)")),' vs ',1);
console.log(calculate(calculateFormat("1+3")),' vs ',4);
console.log(calculate(calculateFormat("5 +((1 + 2) * 4)   - 3")),' vs ',14);
console.log(calculate(calculateFormat("((-6.6+(10.4+(-4)))/(1+4^2)+1)")),' vs ',0.988235294117647);
console.log(calculate(calculateFormat("-1+(-6.6 +  (10.4   +(-4)))/(1+4^2)+1--1")),' vs ',0.988235294117647);
console.log(calculate(calculateFormat("-(1+1)+(-(2+2))+(-(3+3))")),' vs ',-12);
console.log(calculate(calculateFormat("11+22*33+44*55^6")),' vs ',1217948188237);
console.log(calculate(calculateFormat("5*3/2")),' vs ',7.5);
console.log(calculate(calculateFormat("13+11+5*3/2-7")),' vs ',24.5);
console.log(calculate(calculateFormat("13.+11.+5*3/2,-7,+1.")),' vs ',25.5);

console.groupEnd();
console.log("Testing done");