define("app/Components/photo/Photo.js", [
    "app/Components/Component.js",
    "app/Components/modalWindow/ModalWindow.js",
    "css!app/Components/photo/photo.css",
  ], function (Component) {
    return class Photo extends Component {
      /**
      *
      *@param {url} url - url фото
      *@param {string} size - размер, 's' (40px*40px круглая), 'm' (height: 140px;), 'l' (width: 230px)
      */
      constructor(url = "app/Components/photo/default_photo.jpg", size = "l") {
        super();
        this.url = url;
        this.size = size;
      }

      round() {
        let mod_round ='';
        if (this.size == 'xs' || this.size == 's') {
          mod_round = 'photo_round';
        }
        return mod_round;
      }

      openWindow(event) {
        let src_photo = event.currentTarget.src;
        require(['app/Components/modalWindow/ModalWindow.js'], function (ModalWindow) {
          let photoModal = new ModalWindow(src_photo);
          document.body.insertAdjacentHTML('afterbegin', `${photoModal}`);
          photoModal.afterRender();
        });
      }

      /**
       * Рендеринг компонента
       * @returns {string}
      */

      render() {
        return `
            <img src="${this.url}" class='photo size_${this.size} ${this.round()}' alt="Photo">
            `;
      }

      afterRender() {
        if (this.size == 'm' || this.size == 'l' || this.size == 'xl') {
          let click_photo = document.querySelectorAll(`.size_${this.size}`);
          for(let i = 0; i < click_photo.length; i++) {
            click_photo[i].addEventListener("click", this.openWindow);
          }
        }
      }

    };
  });
