/**
 * Created by Nancy Vasilyeva <gothness@ymail.com>
 * Date: 12.07.2017
 */

console.log(calculate("1"));
console.log(calculate(calculateFormat("(1)")));
console.log(calculate(calculateFormat("1+3")));
console.log(calculate(calculateFormat("((-6.6+(10.4+(-4)))/(1+4^2)+1)")));
console.log(calculate(calculateFormat("-1+(-6.6 +  (10.4   +(-4)))/(1+4^2)+1--1")));
console.log(calculate(calculateFormat("-(1+1)")));