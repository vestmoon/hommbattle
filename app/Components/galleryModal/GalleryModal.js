define("app/Components/galleryModal/GalleryModal.js", [
  "app/Components/Component.js",
  "app/Components/photo/Photo.js",
  "css!app/Components/galleryModal/galleryModal.css",
], function (Component, Photo) {
  return class GalleryModal extends Component {
    /**
     *
     *@param {Array} photos - массив фотографий в галерее
     */
    constructor(photos = ["app/Components/photo/default_photo.jpg"]) {
      super();
      this.photos = [];
      for (let i = photos.length - 1; i >= 0 ; i--) {
        this.photos.push(new Photo(photos[i], "lmod"));
      }
    }

    closeGalleryModal() {
      let element = document.querySelector(".layer_zindex");
      element.parentNode.removeChild(element);
      let element1 = document.querySelector(".modal-gallery");
      element1.parentNode.removeChild(element1);
      document.body.style.overflow="scroll";
    }

    renderPhotos() {
      let gallery = "";
      for (let i = 0; i < this.photos.length; i++) {
        gallery += `<div class="photo__item">${this.photos[i]}</div>`;
      }
      return gallery;
    }

    /**
     * Рендеринг компонента
     * @returns {string}
     */

    render() {
      return `
      <div class = "layer_zindex">
      </div>
      <div class="modal-gallery">
        ${this.renderPhotos()}
      </div>`;
    }

    afterRender() {
      for (let i = 0; i < this.photos.length; i++) {
        this.photos[i].afterRender();
      }
      let click_layer = document.querySelector(".layer_zindex");
      click_layer.addEventListener("click", this.closeGalleryModal);
      document.body.style.overflow="hidden";
    }
  };
});
