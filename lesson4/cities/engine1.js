$('#button').click(function() {
	event.preventDefault();
	var nameValue = $('#name').val();
	var nameReg = /^[A-ZА-Я]+$/ig;
	//console.log(nameValue);
	var emailValue = $('#email').val();
	var emailReg = /^([A-z0-9_-]+\.)*[A-z0-9_-]+@[A-z0-9_-]+(\.[A-z0-9_-]+)*\.[A-z]{2,6}$/ig;
	//console.log(emailValue);
	var phoneValue = $('#phone').val();
	var phoneReg = /^\+[7]{1}\([0-9]{3}\)[0-9]{3}-[0-9]{4}$/;


	if (nameValue.search(nameReg) == -1) {
		console.log('error in name');
		$('#error').html('Проверьте правильность введения данных!');
		$('#name').css('border', 'red solid 3px');
	} else if (emailValue.search(emailReg) == -1) {
		console.log('error in email');
		$('#error').html('');
		$('#name').css('border', 'green solid 3px');
		$('#error2').html('Проверьте правильность введения данных!');
		$('#email').css('border', 'red solid 3px');
	} else if (phoneValue.search(phoneReg) == -1) {
		console.log('error in phone');
		$('#error2').html('');
		$('#name').css('border', 'green solid 3px');
		$('#email').css('border', 'green solid 3px');
		$('#error3').html('Проверьте правильность введения данных!');
		$('#phone').css('border', 'red solid 3px');
	} else {
		$('#error3').html('');
		$('#name').css('border', 'green solid 3px');
		$('#email').css('border', 'green solid 3px');
		$('#phone').css('border', 'green solid 3px');
	}
});

$(document).ready(function(){
		$.ajax({
			type:"GET",
			url:"./menu.json",
			dataType:"json",
			success: function (data) { 

				if (data.result === "success") {
					var cityArr = data.message;

					for (var i = 0; i < cityArr.length; i++ ){
						$('#city').append($('<option value="' + i + '">' + cityArr[i] + '</option>'));
					}
					if ($('select[id="city"] option').length > 0) {
						$('#city').find(':first').attr('selected', 'selected');
					}
				}
			}
	});
});
	