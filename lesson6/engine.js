$(document).ready(function(){


	$('#datepicker').datepicker({
		//поле формы дата
		monthNames: ["Январь","Февраль","Март","Апрель","Май","Июнь","Июль","Август", "Сентябрь","Октябрь","Ноябрь","Декабрь"],
		dayNamesMin: ["Вс", "Пн", "Вт", "Ср","Чт","Пт","Сб"],
		//shortYearCutoff: -50,
		minDate: -120,
		maxDate: '+1M +10D',
		firstDay: 1,
		changeMonth: true,
      	changeYear: true,
		dateFormat: "dd.mm.yy"
	})

	$('#button').click(function(){
		//валидация поля Имя формы и эффект bounce при некорректно введенных данных
		var patName = /^[А-яA-z]+$/;
		var name = $('#name').val();
		console.log(name);

		if (name.search(patName) == -1) {
			$( "#name" ).effect( "bounce", { times: 3 }, "slow" );
			$("#dialog-confirm").dialog({
				resizable: false,
				width:400,
				height:"auto",
				modal: true,
				button: {
					"Delete all items": function(){
						$(this).dialog('close');
					},
					Cancel: function() {
						$(this).dialog('close');
					}
				}
			})
		}
	})

	setInterval(carousel(), 2000);


	var tovar_1 = $('#tovar_1');
	tovar_1 = {
		price: 100,
		count: 1
	}

	var basket = $('#basket');
	basket = {
		price: 0,
		count: 0
	}

	// function renderBasket() {
	// 	basket.html('<p>' + 'Стоимость: ' + basket.price + '</p>');
	// }

	$('#tovar_1').draggable({axis:['x', 'y'], cursor:"move", revert: true, helper: "clone"});
	$('#basket').droppable({
		accept: "#tovar_1",
		drop: function(event, ui) {
					$(this).text('Add');
			},
		activate: function(event, ui) {
            $(this).css({
                border: "medium double green",
                backgroundColor: "lightGreen"
            });
        },
        deactivate: function(event, ui) {
            $(this).css("border", "").css("background-color", "");
        },
        over: function() {
            $('#droppable').css({
                border: "medium double red",
                backgroundColor: "red"
            });
        },
        out: function() {
            $('#droppable').css("border", "").css("background-color", "");
        }
    });


	//})

	//renderBasket();


})


function carousel() {
	$('.carousel').effect("slide", 5000, "slow", carousel); 
}

setInterval(carousel, 5000);