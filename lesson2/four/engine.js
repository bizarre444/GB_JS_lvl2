var xhr = false;
if (window.XMLHttpRequest){
  xhr = new XMLHttpRequest();
} else if(window.ActiveXObject){
  try{
    xhr = new ActiveXObject('Msxml2.XMLHTTP');
  } catch(e){
    try{
      xhr = new ActiveXObject('Microsoft.XMLHTTP');
    }catch(e){}
  }
}

if (!xhr){
  alert("Ошибка: невозможно создать");
}


xhr.onreadystatechange = function (){fullResult(xhr)};
xhr.open('GET', "./result.json", true); //
xhr.send();

function fullResult(xhr){
  var answer;

  if(xhr.readyState == 4){
    if(xhr.status == 0){
        var my_result = JSON.parse(xhr.responseText);
        for (var i = 0; i < my_result.result_choise.length; i++) {
          
            if (my_result.result_choise[i] == 'success') {
              answer = 'Успех!';
            } else {
              answer = 'Ошибка!'
            }
          console.log(answer);
        }
    }
  }
}

