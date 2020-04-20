define("app/Components/modalWindow/ModalWindow.js", [
  "app/Components/Component.js",
  "css!app/Components/modalWindow/ModalWindow.css",
  "css!app/Components/photo/Photo.css",
], function (Component) {
  return class ModalWindow extends Component {
    /**
     *
     *@param {url} url - url фото
     */
    constructor(url = "app/Components/photo/default_photo.jpg") {
      super();
      this.url = url;
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
        <button class="btn"><img class="btn-img" src="assets/img/icons/x_close.png"></button>
        </div>
        <div class="modal">
          <img class="photo photo_curs size_xl" src="${this.url}">
        </div>`;
    }
   
    afterRender() {
      let click_layer = document.querySelector(".layer");
      click_layer.addEventListener("click", this.closePhoto);
      document.body.style.overflow="hidden";
    }

  };
});
