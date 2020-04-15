define("app/Components/gallery/Gallery.js", [
  "app/Components/Component.js",
  "app/Components/photo/Photo.js",
  "css!app/Components/gallery/gallery.css",
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

    renderPhoto() {
      let photo = "";
      for (let i = 0; i < this.photos.length; i++) {
        photo += `${new Photo(this.photos[i], "m")}`;
      }
      return photo;
    }

    /**
     * Рендеринг компонента
     * @returns {string}
     */
    render() {
      return this.renderPhoto();
    }
  };
});
