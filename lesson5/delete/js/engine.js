/*
* описания классов
*/
function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Basket(){
	Container.call(this);
	this.id = "basket";
	this.count_goods = 0;
	this.amount = 0;
	
	this.basket_items = [];
	this.collectBasketItems();
}

Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;


//Рендеринг корзины
Basket.prototype.render = function(recipient){
	var basket_div = $('<div/>', {
		id: this.id,
		text: 'Корзина'
	})

	var basket_items_div = $('<div/>', {
		id: this.id + "_items",		
	})

	basket_items_div.appendTo(basket_div);
	basket_div.appendTo(recipient);
}


//GET запрос к серверу, получение данных о корзине
Basket.prototype.collectBasketItems = function(){
	var append_id = "#" + this.id + "_items";

	//Запрос к серверу на получение корзины
	$.get({
		url: 'http://localhost:8080/basket/1',
		//получаем доступ к свойствам Basket
		context: this,
		success: function(respond) {
			
			//Создаю div с данными корзины
			var basket_data = $('<div/>', {
				id: 'basket_data',				
			})

			//Считаем все quantity в каждом элементе корзины и добавляем в свойства объекта Basket this.count_goods
			respond.basket.map(item=>{
				this.count_goods += item.quantity;
			})

			//Обновляю свойство this.amount
			this.amount = respond.full_price;

			//Выводим данные на экран
			basket_data.append("<p>Всего товаров: " + this.count_goods + "</p>");
			basket_data.append("<p>Сумма: " + this.amount + "</p>");

			basket_data.appendTo(append_id);

			respond.basket.map(item=>{
				this.basket_items.push(item);
			})
		},
		dataType: "json"
	});
}

//Добавить товар в корзину
Basket.prototype.add = function(id_product, quantity, price){
	
	console.log('price: ', price);
	//Переменная data хранит тело запроса post

	var data = {
		 "id_product": id_product,
		  "price": price,
		  "quantity": quantity
	}

	//Создаем запрос post 
	$.post({
		//url запроса (см. сваггер или апи)
		url: 'http://localhost:8080/basket/1',
		// перепривязываем контекст, чтобы работать со свойствами класса Basket
		context: this,
		//Отправляем заголовки
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		//Тело запроса
		data: JSON.stringify(data),
		//Получаем ответ от сервера и работаем с ним
		success: function(respond) {	
			console.log(data);		
			//Общее количество товаров
			var totalQuantity = 0;

			var basket_item = {
				"id_product": id_product,
				"price": price,
			}

			console.log('basket_item: ', basket_item);

			//Считаем общее количество товаров
			respond.basket.map(item => {
				totalQuantity += item.quantity;
			})

			this.count_goods = totalQuantity;

			//Бэкэнд сам считает стоимость корзины
			this.amount = respond.full_price;



			this.basket_items.push(basket_item);
			this.refresh();
		},
		error: function(jqXhr, textStatus, errorThrown){
			console.log(textStatus, jqXhr);
		}

	})
	
}

//Обновить корзину
Basket.prototype.refresh = function(answer){
	var basket_data_div = $('#basket_data');

	basket_data_div.empty();
	basket_data_div.append("<p>Всего товаров: " + this.count_goods + "</p>");
	basket_data_div.append("<p>Сумма: " + this.amount + "</p>");

}

//Удалить товар из корзины
Basket.prototype.delete = function(id_product, quantity, price){
	
	//Переменная data хранит тело запроса post

	var data = {
		"id_product": id_product,
		"price": price,
		"quantity": quantity
	}

	//Создаем запрос post 
	$.post({
		//url запроса (см. сваггер или апи)
		url: 'http://localhost:8080/basket/1/delete',
		// перепривязываем контекст, чтобы работать со свойствами класса Basket
		context: this,
		//Отправляем заголовки
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		//Тело запроса
		data: JSON.stringify(data),
		//Получаем ответ от сервера и работаем с ним
		success: function(respond) {	
		
			//Общее количество товаров
			var totalQuantity = 0;

			var basket_item = {
				"id_product": id_product,
				"price": price,
			}

			console.log('basket_item: ', basket_item);

			//Считаем общее количество товаров
			respond.basket.map(item => {
				totalQuantity -= item.quantity;
			})

			this.count_goods = totalQuantity;

			//Бэкэнд сам считает стоимость корзины
			this.amount = respond.full_price;

			this.basket_items.pop(basket_item);
			console.log(basket_items);
			this.refresh();
		},
		error: function(jqXhr, textStatus, errorThrown){
			console.log(textStatus, jqXhr);
		}

	})
	
}
