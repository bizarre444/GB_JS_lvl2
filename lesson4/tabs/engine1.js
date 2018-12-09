var tabs = $('#tabs > div');
console.log(tabs);

tabs.hide().filter(':first').show();

$('#tabs ul.tabNav a').click(function(){
	tabs.hide();
	tabs.filter(this.hash).show();
	$('#tabs ul.tabNav a').removeClass('selected');
	$(this).addClass('selected');
});


