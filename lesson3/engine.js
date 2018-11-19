var bigtext = "Secure shy favour length all twenty denote. Happiness 'remainder' joy but earnestly for off. Pain son aren't rose more park way that. Words don't to up style of since world. He in sportsman household otherwise it perceived instantly. If in so bred at dare rose 'lose' good. An concluded sportsman offending so provision' mr education. If as increasing contrs inquiry no he several excited am. We me rent been part what. Sitting hearted on it without me. Estate was tended ten boy nearer seemed. Ecstatic elegance gay but disposed. Polite do object at passed it is. Limits far yet turned highly repair parish talked six. Up hung mr we give rest half. He in sportsman household otherwisHe felicity no an at packages answered opinions juvenile. Do play they miss give so up. Detract yet delight written farther his general. Made neat an on be gave show snug tore. Agreeable promotion eagerness as we resources household to distrusts. Am wound worth water he linen at vexed.. At principle perfectly by sweet";

var text = bigtext;
var regexp = /\s\'|\'\s/g;  //замена одинарных кавычек на двойные, конструкции aren't, don't не учитываются
var answer = text.replace(regexp, '"');

document.getElementById('text_first').innerHTML = bigtext;
document.getElementById('result').innerHTML = answer;

//console.log(answer);

var messageError = document.getElementById('error');
var messageError2 = document.getElementById('error2');
var messageError3 = document.getElementById('error3');

var elem = document.getElementById('button');
elem.addEventListener('click', onButtonClick);

var elemName = document.getElementById('name');
var elemEmail = document.getElementById('email');
var elemPhone = document.getElementById('phone');

patName = /^[А-Яа-я]+$/;
patEmail = /^([A-zА-я0-9_-]+\.)*[A-zА-я0-9_-]+@[A-zА-я0-9_-]+(\.[A-zА-я0-9_-]+)*\.[A-zА-я]{2,6}$/;     
patPhone = /^\+[7|8]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;

var inpArr = [elemName.value, elemEmail.value, elemPhone.value];
console.log(inpArr);
function onButtonClick(e) {
  e.preventDefault();
  // var inpName = elemName.value;
  // var inpEmail = elemEmail.value;
  // var inpPhone = elemPhone.value;

  var inpArr = [elemName.value, elemEmail.value, elemPhone.value];
  console.log(inpArr);

  messageError.innerHTML = "";
  messageError2.innerHTML = "";
  messageError3.innerHTML = "";

  if (inpArr[0].search(patName) == -1) {
      elemName.className = "errorWarn";
      messageError.innerHTML = "Проверьте корректность введенных данных";
    } else if (inpArr[1].search(patEmail) == -1) {
      elemName.className = "goodWarn";
      elemEmail.className = "errorWarn";
      messageError2.innerHTML = "Проверьте корректность введенных данных";
    } else if (inpArr[2].search(patPhone) == -1) {
      elemName.className = "goodWarn";
      elemEmail.className = "goodWarn";
      elemPhone.className = "errorWarn";
      messageError3.innerHTML = "Проверьте корректность введенных данных";
    } else {
      elemPhone.className = "goodWarn";
    };
};
