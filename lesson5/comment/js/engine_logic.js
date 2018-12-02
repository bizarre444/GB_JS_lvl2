$(document).ready(function(){
	var comments = new Comments();
	comments.render('#comments_wrapper');
	
	$('.comments-add').on('click', function(){
		//Поиск id товара
		var id_comment = parseInt($(this).attr('id').split('_')[1]);		
		//Количество добавляемого товара
		var text = $(this).parent().parent().find('.comments-text').val();
		
		comments.add(id_comment, text, 'Your review is waiting for moderator approval');

	})

	$('.comments-delete').on('click', function(){
		
		var id_comment = parseInt($(this).attr('id').split('_')[1]);
		comments.delete(id_comment);

	})

	$('.comments-submit').on('click', function(){
		
		var id_comment = parseInt($(this).attr('id').split('_')[1]);
		var text = $(this).parent().parent().find('.comments-text').val();
		
		comments.submit(id_comment, text, 'Your review has been approved');

	})

	$('.comments-list').on('click', function(){
		
		//var id_comment = parseInt($(this).attr('id').split('_')[1]);
		comments.list();

	})

});


