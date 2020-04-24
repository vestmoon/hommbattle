define("app/Components/photo/Photo.js", [
  "app/Components/Component.js",
  "app/Components/modalWindow/ModalWindow.js",
  "css!app/Components/photo/photo.css",
], function (Component) {
  return class Photo extends Component {
    /**
     *
     *@param {url} url - url фото
     *@param {string} size - размер, 's' (40px*40px круглая), 'm' (height: 140px;) - по умолчанию, 'l' (width: 230px), 'xl' (width: 640px)
     */
    constructor(url = "app/Components/photo/default_photo.jpg", size = "m") {
      super();
      this.url = url;
      this.size = size;
    }

    round() {
      let mod_round = "";
      if (this.size == "xs" || this.size == "s") {
        mod_round = "photo_round";
      }
      return mod_round;
    }

    /**
     * открытие модального окна с фотографией
     * @param {Event} event 
     */
    openWindow(event) {
      let src_photo = event.currentTarget.src;
      require(["app/Components/modalWindow/ModalWindow.js"], function (
        ModalWindow
      ) {
        let photoModal = new ModalWindow(src_photo);
        document.body.insertAdjacentHTML("afterbegin", `${photoModal}`);
        photoModal.afterRender();
      });
    }

    /**
     * загрузка новой фотографии профиля
     */
    avatar() {
      let edit_photo = document.getElementById(`${this.id}`);
      edit_photo.insertAdjacentHTML(
        "afterEnd",
        `<form class="edit-field"><input name="myFile" class="load-file" type="file" id="fileUpload" accept="image/*"/>       
        <input class = "subm" title="ок" type="image" src="assets/img/icons/ok.png">
        <label for ="fileUpload" title="загрузить новую фотографию"><img class="load-img" src="assets/img/icons/download.png"></label></form>`
      );
      let edit_field = document.querySelector(".subm");
      edit_field.addEventListener("click", this.handleImageUpload);
    }

    /**
     * асинхронная функция обновления фотографии на сервере
     */
    handleImageUpload = async (event) => {
      event.preventDefault();
      let selectedFile = document.getElementById("fileUpload").files[0];
      const formData = new FormData();
      formData.append("myFile", selectedFile);

      if(!selectedFile || selectedFile == this.url) {
        alert("Выберите файл для загрузки фотографии.");
      }

      else {
        fetch("https://tensor-school.herokuapp.com/user/upload_photo", {
          method: "POST",
          headers: {"Content-Type": "image/png"},
          body: selectedFile,
          "credentials": "include"
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(selectedFile);
          })
          .catch((error) => {
            console.error("ERROR!!!!!");
          })

          setTimeout( () => { let new_src = fetch(`${this.url}`, {"credentials": "include"})
          .then( res => { document.querySelector('.size_l').src = res.url;
          document.querySelector('.size_xs').src = res.url } );
        }, 1000);         
      }
    };

    /**
     * Рендеринг компонента
     * @returns {string}
     */

    render() {
      return `
            <img src="${this.url}" id=${this.id} class='photo size_${this.size} ${this.round()}' alt="Photo">
            `;
    }

    afterRender() {
      if (this.size == "m" || this.size == "l" || this.size == "xl") {
        let click_photo = document.getElementById(`${this.id}`);
        click_photo.addEventListener("click", this.openWindow);
      }
      if (this.size == "l") {
        this.avatar();
      }
    }
  };
});
