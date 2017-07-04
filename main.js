// Главная функция.
// Считывает аргументы с веб-страницы, выбирает операцию,
// передаёт управление вычисляющей функции и выводит результат

function calculate(){
  var arg1 = Number(document.getElementById('idArg1').value);
  var arg2 = Number(document.getElementById('idArg2').value);
  console.log('arg1 = '+arg1+', arg2 = '+arg2);

  var selection = document.getElementById('radioBox').getElementsByTagName('input');
  var i, operation;
  for (i=0; i<selection.length; i++) {
    if (selection[i].checked) {
      operation = selection[i].value;
      break;
    }
  }
  console.log('i = '+i+', operation = '+operation);

  var result;
  switch (operation) {
    case 'sum': result=sum(arg1, arg2); break;
    case 'sub': result=sub(arg1, arg2); break;
    case 'mul': result=mul(arg1, arg2); break;
    case 'div': result=div(arg1, arg2); break;
    case 'module': result=module(arg1); break;
    case 'construction2': result=construction2(arg1); break;
    case 'constructionX': result=constructionX(arg1, arg2); break;
    case 'root2': result=root2(arg1); break;
    case 'rootX': result=rootX(arg1, arg2); break;
    case 'logarithmE': result=logarithmE(arg1); break;
    case 'logarithm10': result=logarithm10(arg1); break;
    case 'logarithmX': result=logarithmX(arg1, arg2); break;
    case 'circlePeriphery': result=circlePeriphery(arg1); break;
    case 'circleSquare': result=(arg1); break;
    case 'gradRad': result=gradRad(arg1); break;
    case 'RadGrad': result=RadGrad(arg1); break;
    default: alert('Error! The variable \'operation\' has value '+operation);
  }

  alert(result);
}