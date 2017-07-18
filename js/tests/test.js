/* Функции, позволяющие поэкспериментировать.
   Можете свободно переписывать их значения.
   Не размещайте в них ничего ценного.
   Если вы изменили только их, то не стоит делать их commit в репозиторий*/

function test1(){
  console.log('Функция test2 запущена.');
  var x = prompt('Введите число','2');
  var y = root2(x);
  console.log(y);
}

function test2(){
  console.log('Функция test2 запущена.');
  var ch = document.getElementById('idArg1').value[0];
  console.log(ch);
  /* console.log(ch.match(/[\.0-9]/),'malvina'); */
  var patt=/[\.0-9]/;
  console.log(patt.test(ch));
}