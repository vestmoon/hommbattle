"use strict";
    /**класс возвращает фотографию */
  class Photo {
    /**
    *
    *@param {url} url - url фото
    *@param {string} size - размер, 's' (40px*40px круглая), 'm' (height: 140px;), 'l' (width: 230px)
    *@param {string} opening - открытие 'click' по клику, 'hover' по наведению, 'click-hover' клик и наведение (пока не реализовано)
    */
    constructor(url, size, opening) {
      this.url = url;
      this.size = size;
      this.opening = opening;
      this.render();
    }

    /**выбор размера фотографии, в зависимости от переданного в конструктор класса параметра s(маленький), m(средний), l(большой/размер по умолчанию) */
    chooseStyle() {
      let class_style = "l-photo"; //размер по умолчанию
      switch (this.size) {
        case "s":
          class_style = "s-photo";
          break;
        case "m":
          class_style = "m-photo";
          break;
      }
      return class_style;
    }

    /**устанавливается фотография, если в конструктор класса не была передана фотография, то устанавливается изображение по умолчанию*/
    urlPhoto() {
      let def_url = "default_photo.png"; //фото по умолчанию
      if (this.url != undefined) {
        def_url = this.url;
      }
      return def_url;
    }

    render() {
    return `<link rel="stylesheet" type="text/css" href="photo.css"/>
      <img src="${this.urlPhoto()}" class='${this.chooseStyle()}' alt="Photo">`;
    }
  }
