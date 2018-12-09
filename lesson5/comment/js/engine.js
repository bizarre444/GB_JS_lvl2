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

function Comments(){
	Container.call(this);
	this.id = "comment";
	this.countComments = 0;
	
	this.comments_item = [];
	this.collectCommentsItems();
}

Comments.prototype = Object.create(Container.prototype);
Comments.prototype.constructor = Comments;

Comments.prototype.render = function(recipient){
	var comments_div = $('<div/>', {
		id: this.id,
		text: 'Отзывы:'
	})

	var comments_items_div = $('<div/>', {
		id: this.id + "_items",		
	})

	comments_items_div.appendTo(comments_div);
	comments_div.appendTo(recipient);
}

Comments.prototype.collectCommentsItems = function(){
	var append_id = "#" + this.id + "_items";


	$.get({
		url: 'http://localhost:8080/review/123',
		context: this,
		success: function(respond) {
			
			var comments_data = $('<div/>', {
				id: 'comments_data',				
			})

			// console.log(respond);
			// this.countComments = respond.comments.length;

			// comments_data.append("<p>Всего отзывов: " + this.countComments + "</p>");

			// countComments.appendTo(append_id);

			// respond.comments.map(item=>{
			// 	this.comments_item.push(comments_item);
			// })
			for (var item in respond.comments) {
                this.comments_item.push(respond.comments[item]);
            }
		},
		dataType: "json"
	});
}

Comments.prototype.add = function(id_comment, text, userMessage){
	
	var data = {
		 "id_comment": id_comment,
		  "text": text,
		  "userMessage": userMessage
	}
 
	$.post({
		url: 'http://localhost:8080/review/',
		context: this,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(data),
		success: function(respond) {	
			console.log(data);		
			var comments_item = {
				"id_comment": id_comment,
				"text": text,
			}

			respond.comments.map(item => {
				countComments ++;
			})

			this.comments_item.push(comments_item);
			this.refresh();
		},
		error: function(jqXhr, textStatus, errorThrown){
			console.log(textStatus, jqXhr);
		}

	})
	
}

Comments.prototype.refresh = function(answer){
	var comments_data_div = $('#comments_data');

	comments_data_div.empty();
	comments_data.append("<p>Всего отзывов: " + this.countComments + "</p>");

	if (this.countComments < 1) {
        $('.comments').hide();
    } else {
        $('.comments').show();
    }


}

Comments.prototype.delete = function(id_comment){

	var data = {
		"id_comment": id_comment
	}

	$.post({
		url: 'http://localhost:8080/review/123',
		context: this,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(data),
		success: function(respond) {	

			var totalQuantity = 0;

			var comments_item = {
				"id_comment": id_comment
			}

			respond.comments.map(item => {
				this.countComments --;
			})

			this.comments_item.pop();
			this.refresh();
		},
		error: function(jqXhr, textStatus, errorThrown){
			console.log(textStatus, jqXhr);
		}

	})
	
}

Comments.prototype.submit = function(id_comment) {
	var data = {
		"id_comment": id_comment
	}
	$.post ({
		url: 'http://localhost:8080/review/approve',
		context: this,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		data: JSON.stringify(data),
		success: function(respond){
			var comments_item = {
				"id_product": id_product,
			}
			respond.comments.map(item => {
				this.comments_items[this.countComments - 1].submit = true;
			})
			this.refresh();

		},
		error: function(jqXhr, textStatus, errorThrown){
			console.log(textStatus, jqXhr);
		}

	})
}


Comments.prototype.list = function() {
	$('#comments_list').remove();

	var comments_div = $('<div />', {
        id: 'comments_list',
        html: '<br><hr><br>СПИСОК ВСЕХ ОТЗЫВОВ:<br>&nbsp;'
    });

    for (var item in this.comments_items) {
       var comment = this.comments_items[item],
       comments_items_div = $('<div />', {
            html: '<hr><p>Отзыв №' + comment.id_comment + '</p>'
            + '<p>Текст: <span class="comments-text-list">' + comment.text + '</span></p>'
            + '<p>Отзыв одобрен: ' + comment.submit + '</p>'
        });

        comments_items_div.appendTo(comments_div);
    }

    comments_div.appendTo('body');
}

