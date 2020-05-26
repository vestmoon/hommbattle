define("app/Components/modalWindow/ModalWindow.js", [
  "app/Components/Component.js",
  "css!app/Components/modalWindow/modalWindow.css",
  "css!app/Components/photo/photo.css",
], function (Component) {
  return class ModalWindow extends Component {
    /**
     *
     *@param {url} url - url фото
     */
    constructor(url = "app/Components/photo/default_photo.jpg", gallery = '') {
      super();
      this.url = url;
      this.gallery = gallery;
    }

    /**
     * Закрытие модального окна при клике на свободную область
     */

    closePhoto() {
      let element = document.querySelector(".layer");
      element.parentNode.removeChild(element);
      let element1 = document.querySelector(".modal");
      element1.parentNode.removeChild(element1);
      document.body.style.overflow="scroll";
    }

    /**
    * Рендеринг компонента
    * @returns {string}
    */

    render() {
      return `
        <div class="layer">
        </div>
        <div class="modal">
          <img class="photo photo_cursor size_mod" src="${this.url}">
          ${this.gallery}
        </div>`;
    }
   
    afterRender() {
      let click_layer = document.querySelector(".layer");
      click_layer.addEventListener("click", this.closePhoto);
      document.body.style.overflow="hidden";
    }

  };
});
