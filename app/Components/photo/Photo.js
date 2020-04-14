define([
  'css!style/photo.css'
], function() {

    'use strict';
      /**класс возвращает фотографию */
    return class Photo {
      /**
      *
      *@param {url} url - url фото
      *@param {string} size - размер, 's' (40px*40px круглая), 'm' (height: 140px;), 'l' (width: 230px)
      */
      constructor(url, size) {
        this.url = url;
        this.size = size;
        this.render();
      }
  
      render() {
       return      
        `
        <link rel="stylesheet" type="text/css" href="style/photo.css"/>
        <img src="${this.url || 'img/default_photo.jpg'}" class='${this.size || 'l'}-photo' alt="Photo">`;
      }
    }
  });

  