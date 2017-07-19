/* Файл содержит набор функций для работы со вторым интерфейсом кальлькулятора.
   Все они могут быть легко применимы и для третьего интерфейса. */

// Очистка поля ввода
function fClearField() {
    Display = 0;
    LastDisplay = 0;
    Act = NaN;
    LastKey = NaN;
    DisplayStr = '';
    document.getElementById('calculatedExpression').innerHTML = '';
    document.getElementById('inOutField').value = '0';
}

// Вставка нового символа в конец поля ввода
function fInsetChar(ch) {
    if (ch=='±') {
		if (String(Display) != '0') {
		   Display=-Display;
		   DisplayStr = String(Display);
		   fRefreshDisplay ('');
		   return;
		}
    }
    if (ch=='=') {
		Equally();
		DisplayStr ='';
		return;
    } 
    if  (ch=='+' || ch=='-' || ch=='*' || ch=='/' || ch=='^') {
		if (Act != NaN) {
			Consider();
			DisplayStr ='';
		}
		Act = ch;
		LastDisplay = Display;
		LastKey = ch;
		return;
    }
    //var re = /^[0-9]*$/;
    //if (re.test(ch) || ch=='.') {
    if (ch==0 || ch==1 || ch==2 || ch==3 || ch==4 || ch==5 || ch==6 || ch==7 || ch==8 || ch==9 || ch=='.') {
		if (DisplayStr =='' && ch=='.') {
			DisplayStr = '0.';
		} else {
			DisplayStr = DisplayStr + String(ch);
		}
		if (LastKey=='=' || LastKey=='+' || LastKey=='-' || LastKey=='*' || LastKey=='/' || LastKey=='^') {
			LastDisplay = Display;
		}
		if (DisplayStr =='') {
			Display = 0;
		} else {
			Display = Number(CheckPoint(DisplayStr)); 
		}
		fRefreshDisplay();
		LastKey=ch;
    }	
}



//Произвести расчет когда нажата кнопка Равно, но вызывается она из другой (главной) функции
function Equally() {
	if (Act=='+') 
	{   
		Display = Number(Display)+Number(LastDisplay);
		LastDisplay = 0;
		Act         = NaN;
		LastKey     = '=';
	}	
	if (Act=='-') 
	{
		Display = LastDisplay - Display;
		LastDisplay=0;
		Act = NaN;
		LastKey='=';
        }	
	if (Act=='*') 
	{
		Display = LastDisplay * Display;
		LastDisplay=0;
		Act = NaN;
		LastKey='=';
	}
	if (Act == '/') {
		if (Display != 0) {
			Display = LastDisplay / Display;
        } else {
			Display = 0;
        }
		LastDisplay=0;
		Act = NaN;
		LastKey='=';	
        }
	if (Act == '^') {
		Display = Math.pow(LastDisplay, Display);
		LastDisplay=0;
		Act = NaN;
		LastKey='=';
        }
	DisplayStr = String(Display);
	fRefreshDisplay();
}


//Функция Произвести вычисление, когда нажата кнопка арифм операции но не кнопка Равно 
function Consider() {
	if (Act == '+') {
		Display = Display + LastDisplay;
		LastKey='+';
	}
	if (Act == '-') {
		Display = LastDisplay - Display;
		LastKey='-';
	}	
	if (Act == '*') {
		Display = LastDisplay * Display;
		LastKey='*';
	}	
	if (Act == '/') {
		if (Display != 0) {
			Display = LastDisplay / Display;
		} else {
			Display = 0;
		}
		LastKey='/';	
	}
	if (Act == '^') {
		Display = Math.pow(LastDisplay, Display);
		LastKey='^';
        }
	DisplayStr = String(Display);
	fRefreshDisplay();
}


//Выведем на Дисплей значение переменной Display
function fRefreshDisplay() {
	elem = document.getElementById('inOutField');
	elem.value = String(Display);
	if (DisplayStr == '') {
	    elem.value = '0';
    } else {
		elem.value = DisplayStr; 
	}
}

// Удаление последнего символа в поле ввода
function fDeleteLastCh() {
  DisplayStr = DisplayStr.substring(0, DisplayStr.length-1);
  Display = Number(CheckPoint(DisplayStr));
  fRefreshDisplay();
}

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

function CheckPoint(Strok) {
	//Если последний символ точка обрезаем его
	if (Strok[Strok.length-1] == '.') {
		Strok = Strok.substring(0, Strok.length-1);
	}
   return Strok;	
}	
