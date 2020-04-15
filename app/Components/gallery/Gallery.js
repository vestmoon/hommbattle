define("app/Components/gallery/Gallery.js", [
    "app/Components/Component.js",
    "css!app/Components/gallery/gallery.css",
    "app/Components/photo/Photo.js",
  ], function (Component, Photo) {
    return class Gallery extends Component {
      /**
       *
       *@param {[photos]} [photos] - массив url фото
       */
      constructor(photos) {
        super();
        this.photos = photos;
      }  
      /**
       * Рендеринг компонента
       * @returns {string}
       */
      render() {
          return `<div class="gallery">
          
          </div>`
      }
    };
  });
  