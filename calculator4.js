/* Файл содержит набор функций для работы со вторым интерфейсом кальлькулятора.
   Все они могут быть легко применимы и для третьего интерфейса. */

// Очистка поля ввода
function fClearField() {
  window.Display = 0;
  window.LastDisplay = 0;
  window.Act = NaN;
  window.LastKey = NaN;
  document.getElementById('calculatedExpression').innerHTML = '';
  document.getElementById('inOutField').value = '0';
}

// Вставка нового символа в конец поля ввода
function fInsetChar(ch) {
	if (ch=='±') {
		if (window.Display==0) {
			return;
		} else {
		   window.Display=-window.Display;
		   fRefreshDisplay ('');
		   return;
		}
	}
	
	
	if (ch=='0' || ch=='1' || ch=='2' || ch=='3' || ch=='4' || ch=='5' || ch=='6' || ch=='7' || ch=='8' || ch=='9') {
	ch = Number(ch);
	}
 
    if (ch=='=') {
		Equally();
	} 
	if  (ch=='+' || ch=='-' || ch=='*' || ch=='/' || ch=='^') {
		if (window.Act != NaN) {
			Consider();
		}
		window.Act = ch;
		window.LastDisplay = window.Display;
		window.LastKey = ch;
	}
	if (ch==0 || ch==1 || ch==2 || ch==3 || ch==4 || ch==5 || ch==6 || ch==7 || ch==8 || ch==9 || ch==".") {
		if (window.LastKey=='=' || window.LastKey=='+' || window.LastKey=='-' || window.LastKey=='*' || window.LastKey=='/' || window.LastKey=='^') {
			window.LastDisplay = window.Display;
			window.Display=0;  
			fRefreshDisplay (ch);
		}
		if (window.Display == 0 && ch!='.') {
			if (window.LastKey != '.') {
				window.Display = ch; 
				fRefreshDisplay (ch);
			} else {
				window.Display = window.Display + ch / 10; 
				fRefreshDisplay (ch);
			} 
		} else {
			if (ch != '.') {
				if (window.LastKey != '.') { 
					if (Math.floor(window.Display) == window.Display) {
			            window.Display = window.Display * 10 + ch;
					} else {
						Dlina = String(window.Display).length; 
						NumberPoint = String(window.Display).indexOf(".");
						Kol = Dlina - NumberPoint;
						Koeff = Math.pow(10, Kol);
						window.Display = window.Display + ch/Koeff;
						window.Display = round(window.Display, Kol);
						fRefreshDisplay (ch);
					}
				}	
				if  (window.LastKey == '.') {
					window.Display = window.Display + ch / 10; 
					fRefreshDisplay (ch);
				}
			}
			fRefreshDisplay (ch); 
		}
		window.LastKey=ch;
	}

}



//Произвести расчет когда нажата кнопка Равно, но вызывается она из другой (главной) функции
function Equally() {
	
	if (window.Act=='+') 
	{   
		window.Display = Number(window.Display)+Number(window.LastDisplay);
		fRefreshDisplay('');
		window.LastDisplay = 0;
		window.Act         = NaN;
		window.LastKey     = '=';
	}	
	
	if (window.Act=='-') 
	{
		window.Display = window.LastDisplay - window.Display;
		fRefreshDisplay('');
		window.LastDisplay=0;
		window.Act = NaN;
		window.LastKey='=';
    }	
	
	if (window.Act=='*') 
	{
		window.Display = window.LastDisplay * window.Display;
		fRefreshDisplay('');
		window.LastDisplay=0;
		window.Act = NaN;
		window.LastKey='=';
	}
	
	if (window.Act == '/') {
		if (window.Display != 0) {
			window.Display = window.LastDisplay / window.Display;
        } else {
			window.Display = 0;
        }
		fRefreshDisplay ('');
		window.LastDisplay=0;
		window.Act = NaN;
		window.LastKey='=';	
    }
	
	if (window.Act == '^') {
		window.Display = Math.pow(window.LastDisplay, window.Display);
		fRefreshDisplay('');
		window.LastDisplay=0;
		window.Act = NaN;
		window.LastKey='=';
    }
	
}


//Функция Произвести вычисление, когда нажата кнопка арифм операции но не кнопка Равно 
function Consider() {
	if (window.Act == '+') {
		window.Display = window.Display + window.LastDisplay;
		fRefreshDisplay ('');
		window.LastKey='+';
	}
	if (window.Act == '-') {
		window.Display = window.LastDisplay - window.Display;
		fRefreshDisplay ('');
		window.LastKey='-';
	}	
	if (window.Act == '*') {
		window.Display = window.LastDisplay * window.Display;
		fRefreshDisplay ('');
		window.LastKey='*';
	}	
	if (window.Act == '/') {
		if (window.Display != 0) {
			window.Display = window.LastDisplay / window.Display;
		} else {
			window.Display = 0;
		}
		fRefreshDisplay('');
		window.LastKey='/';	
	}
	if (window.Act == '^') {
		window.Display = Math.pow(window.LastDisplay, window.Display);
		fRefreshDisplay('');
		window.LastKey='^';
    }
	
}


//Выведем на Дисплей значение переменной Display
function fRefreshDisplay(ch) {
	elem = document.getElementById('inOutField');
	elem.value = String(window.Display);
	if (ch == '.') {
	    elem.value = String(window.Display) + '.';
     }
}

// Удаление последнего символа в поле ввода
function fDeleteLastCh() {
  //Срезаем точку
  if (String(window.Display)+'.' == document.getElementById('inOutField').value) {
	fRefreshDisplay('');
	return;
  }
  //Когда число не целое
  NumberPoint = String(window.Display).indexOf(".");
  if (NumberPoint>-1) {
	Dlina = String(window.Display).length;
	window.Display = Number(String(window.Display).substring(0, Dlina-1));
	if (Math.round(window.Display)==window.Display) {
		fRefreshDisplay('.');
	} else {
		fRefreshDisplay('');
	}
	return;
  }
	
	
  if (window.Display.length<=1) {
      window.Display = 0;
  } else {
    window.Display = Math.floor(window.Display/10);
  }
  fRefreshDisplay('');
}

// Считывание значений, определение выполняемой операции,
// вызов соответствующей вычисляющей функции,
// вывод результата
function fCalculateExpression() {
  
}

// Обработчик нажатия клавиш, чтобы можно было запускать вычисление с клавиатуры
// по нажатию на Enter или =
function fKeyPress(e){
  if (e.keyCode==13 || e.charCode==61) {
    e.preventDefault();      //останавливаем дальнейшую обработку нажатия, чтобы '=' не пропечатывалось
    fCalculateExpression();  //запускаем функцию вычисления
  }
}

function round(value, decimals) {

return Number(Math.round(value+'e'+decimals)+'e-'+decimals);

}
