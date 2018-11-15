function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Menu(my_id, my_class, my_items){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   this.items = my_items;
};

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(){
  var result = "<ul class='"+this.className+"' id='"+this.id+"'>";
  
  for(var item in this.items){
    if(this.items[item] instanceof MenuItem){
      result += this.items[item].render();
    } else if(this.items[item] instanceof MenuSubItem) {
      result += '<ul>' + this.items[item].render() + '</ul>';
    }
  }
  
  result += "</ul>";
  return result;
};

function MenuItem(my_href, my_name){
   Container.call(this);
   this.className = "menu-item";
   this.href = my_href;
   this.itemName = my_name;
};

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
  return "<li class='" + this.className + "' href='"+ this.href + "'>" + this.itemName + "</li>";
};

function MenuSubItem(my_href, my_name) {
  Container.call(this);
  this.className = 'menu-sub-item';
  this.href = my_href;
  this.itemName = my_name;
};

MenuSubItem.prototype = Object.create(Container.prototype);
MenuSubItem.prototype.constructor = MenuSubItem;

MenuSubItem.prototype.render = function(){
  return "<li class='" + this.className + "' href='" + this.href + "'>" + this.itemName + "</li>";
};

function fullMenuContent(xhr){
  var my_items = {};

  if(xhr.readyState == 4){
    if(xhr.status == 0){
        var items = [];
        var subItems;
        var my_items = JSON.parse(xhr.responseText);
               
        for (var i = 0; i < my_items.menu_items.length; i++){
            items.push(new MenuItem(my_items.menu_items[i].href, my_items.menu_items[i].title));
            if (my_items.menu_items[i].submenu) {
              for (var j = 0; j < my_items.menu_items[i].submenu.length; j++ ) {
                subItems = my_items.menu_items[i].submenu[j];
                items.push( new MenuSubItem(subItems.href, subItems.title));
              }
            }
          }
      var menuNew = new Menu("my_menu", "My_class", items);
      var div = document.getElementById('menu');
      div.innerHTML = menuNew.render();
    }
  }
};

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
};

xhr.onreadystatechange = function (){fullMenuContent(xhr)};
xhr.open('GET', "./menu.json", true); //
xhr.send();




