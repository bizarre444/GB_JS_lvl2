$(document).ready(function(){
	var basket = new Basket();
	basket.render('#basket_wrapper');
	
	$('.buyme').on('click', function(){
		//Поиск id товара
		var id_product = parseInt($(this).attr('id').split('_')[1]);		
		//Количество добавляемого товара
		var quantity = 1;
		//Поиск цены товара
		var price = parseInt($(this).parent().find('.product-price').text());

		//Нашли данные о товаре и добавляем в корзину
		basket.add(id_product, quantity, price);

	})

	$('.deleteme').on('click', function(){
		//Поиск id товара
		var id_product = parseInt($(this).attr('id').split('_')[1]);		
		//Количество добавляемого товара
		var quantity = 1;
		//Поиск цены товара
		var price = parseInt($(this).parent().find('.product-price').text());

		//Нашли данные о товаре и удаляем из корзины
		basket.delete(id_product, quantity, price);

	})

});


// $(document).ready(function(){

// 	var basket = new Basket();

// 	$('.deleteme').on('click', function(){
// 		//Поиск id товара
// 		var id_product =parseInt($(this).attr('id').split('_')[1]);		
// 		//Количество добавляемого товара
// 		var quantity = -1;
// 		//Поиск цены товара
// 		var price = parseInt($(this).parent().find('.product-price').text());

// 		//Нашли данные о товаре и удаляем из корзины
// 		basket.delete(id_product, quantity, price);

// 	})
// });