function Container() {
  this.id = '';
  this.className = '';
  this.htmlCode = '';
  this.src = '';
  this.alt = '';
};

Container.prototype.render = function() {
  return this.htmlCode;
};

function Gallery(myId, myClass, myItems, mySrc, myAlt) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
  this.src = mySrc;
  this.alt = myAlt;
};

Gallery.prototype = Object.create(Container.prototype);
Gallery.prototype.constructor = Gallery;

Gallery.prototype.render = function() {
  var result = "<div class='" + this.className + "'>";

  for (var item in this.items) {
    if (this.items[item] instanceof GalleryItem){
      result += this.items[item].render();
    }
  }  
  result += '</div>';
  return result;
};

function GalleryItem(myId, myClass, myItems, mySrc, myAlt) {
  Container.call(this);
  this.id = myId;
  this.className = myClass;
  this.items = myItems;
  this.src = mySrc;
  this.alt = myAlt;
};

GalleryItem.prototype = Object.create(Container.prototype);
GalleryItem.prototype.constructor = GalleryItem;

GalleryItem.prototype.render = function() {
  return '<a href="' + this.src + '" terget="_blank">' + '<img src="' + this.src + '" alt="' + this.alt + '" class="' + this.className + '"></a>';

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
}


xhr.onreadystatechange = function (){fullGalleryContent(xhr)};
xhr.open('GET', "./gallery.json", true); //
xhr.send();

// var my_items;
function fullGalleryContent(xhr){
  var items = [];

  if(xhr.readyState == 4){
    if(xhr.status == 0){
        var myItems = JSON.parse(xhr.responseText);
               console.log(myItems);
        for (var i = 0; i < myItems.gallery_img.length; i++) {
            items.push(new GalleryItem('galleryItemId', 'gallery_items', 'galleryItemItems', myItems.gallery_img[i].src, myItems.gallery_img[i].alt));
        }
      var galleryNew = new Gallery('galleryId', 'gallery', items, 'gallerySrc', 'galleryAlt');

      var y = document.getElementById('gallery-block');
      console.log(y);
      y.innerHTML = galleryNew.render();
    }
  }
}

