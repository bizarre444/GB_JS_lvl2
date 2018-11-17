function Container() {
  this.id = "";
  this.className = "";
  this.htmlCode = "";
};

Container.prototype.render = function() {
   return this.htmlCode;
};

Container.prototype.remove = function() {
	var elem = document.getElementById(this.id);
    elem.parentNode.removeChild(elem);
};


function Menu(my_id, my_class, my_items) {
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   this.items = my_items;
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function() {
	var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
	
	for(var item in this.items) {
		if(this.items[item] instanceof MenuItem) {
			result += this.items[item].render();
		}
	}
	result += "</ul>";
	return result;
};

function MenuItem(my_href, my_name, my_items) {
   Container.call(this);
   this.className = "menu-item";
   this.href = my_href;
   this.itemName = my_name;
    this.my_items = my_items;
};

function SubMenu(myId, myClass, items) {
	Menu.call(this);
};

SubMenu.prototype = Object.create(Container.prototype);
SubMenu.prototype.constructor = SubMenu;

Menu.prototype.remove = function() {
	var del = document.getElementById(this.id);
	del.parentNode.removeChild(del);
};


MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

SubMenu.prototype.render = function() {
	var result = '<ul class="' + this.className + '" id="' + this.id + '">';
		for (var i = 0; i < this.items.length; i++) {
			if (this.items[i] instanceof MenuItem) {
				result += this.items[i].render();
			} else if (this.items[i] instanceof SubMenu) {
				result += this.items[i].render();
			}
		}
			
	result += '</ul>';
    this.htmlCode = result;
    return result;
};

MenuItem.prototype.render = function() {
	return "<li class='"+this.className+"' href='"+ this.href +"'>" + this.itemName + "</li>";
};

var menuSubItem1 = new MenuItem("/", "О нас");
var menuSubItem2 = new MenuItem("/", "Контакты");

var menuSubItem3 = new MenuItem("/", "Описание");
var menuSubItem4 = new MenuItem("/", "Фото");
var menuSubItem5 = new MenuItem("/", "Видео");

var m_item1 = new MenuItem("/", "Главная", {0: menuSubItem1, 1: menuSubItem2});
var m_item2 = new MenuItem("/catalogue/", "Каталог", {
	0: menuSubItem3,
    1: menuSubItem4,
    2: menuSubItem5
});
var m_item3 = new MenuItem("/gallery/", "Галерея");

var m_items = {0: m_item1, 1: m_item2, 2: m_item3};

var menu = new Menu("my_menu", "My_class", m_items);
var div = document.write(menu.render());



