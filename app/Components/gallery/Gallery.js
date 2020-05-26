define("app/Components/gallery/Gallery.js", [
  "app/Components/Component.js",
  "app/Components/photo/Photo.js",
  "app/Components/galleryModal/GalleryModal.js",
  "css!app/Components/gallery/gallery.css",
], function (Component, Photo, galleryModal) {
  // Количество сдвинутых при пролистовании слайдера пикселей
  const STEP = 163;
  const COUNT_VISIBLE_PHOTOS = 4;
  return class Gallery extends Component {
    /**
     *
     *@param {[photos]} [photos] - массив url фото
     */
    constructor(photos) {
      super();
      this.photos = photos;
      this.count = photos.length;
    }

    /**
     * Отрисовка всех фотографий в галерее
     */
    renderPhoto() {
      let photo = "";
      for (let i = this.photos.length - 1; i >= 0; i--) {
        photo += `<div class="gallery__item">${new Photo(
          this.photos[i],
          "m"
        )}</div>`;
      }
      return photo;
    }

    /**
     * Пролистование галереи
     */
    slideTo(direction, reverse) {
      let translate = "";
      let condition = false;
      let add_to = 0;
      if (direction == "rigth") {
        condition = this.count <= COUNT_VISIBLE_PHOTOS + 1;
        translate = "translateX(" + -STEP + "px)";
        add_to = -1;
      } else {
        condition = this.count >= this.photos.length - 1;
        translate = "translateX(" + STEP + "px)";
        add_to = 1;
      }

      if (document.querySelector(`.slider-${reverse}-hidden`)) {
        document
          .querySelector(`.slider-${reverse}-hidden`)
          .classList.add("slider");
        document
          .querySelector(`.slider-${reverse}-hidden`)
          .classList.add(`slider-${reverse}`);
        document
          .querySelector(`.slider-${reverse}`)
          .classList.remove(`slider-${reverse}-hidden`);
      }

      let slide = document.querySelector(`.slider-${direction}`);

      let galleryBlock = document.querySelector(".gallery");
      if (this.photos.length >= COUNT_VISIBLE_PHOTOS) {
        galleryBlock.style.transform += translate;
        this.count += add_to;
        if (condition) {
          slide.classList.remove("slider");
          slide.classList.remove(`slider-${direction}`);
          slide.classList.add(`slider-${direction}-hidden`);
        } else if (`.slider-${direction}-hidden`) {
          slide.classList.remove(`slider-${direction}-hidden`);
          slide.classList.add("slider");
          slide.classList.add(`slider-${direction}`);
        }
      }
    }

    /**
     * Нажатие на левый слайдер
     */
    toLeft = () => {
      this.slideTo("left", "rigth");
    };

    /**
     * Нажатие на правый слайдер
     */
    toRigth = () => {
      this.slideTo("rigth", "left");
    };

    // /**
    //  * Открытие модального окна галереи
    //  */
    openModalGallery = () => {
      let galleryModalWindow = new galleryModal(this.photos);
      document.body.insertAdjacentHTML("afterbegin", `${galleryModalWindow}`);
      galleryModalWindow.afterRender();
    };

    /**
     * Рендеринг компонента
     * @returns {string}
     */
    render() {
      return `<div class="gallery-wrapper">
                <div class="slider slider-top"> open </div>
                <div class="gallery">
                 ${this.renderPhoto()}
                </div>
                <div class="slider slider-rigth"><img class="btn-slider" src="assets/img/icons/rigth_slider.png" alt="rigth"></div>
                <div class="slider-left-hidden"><img class="btn-slider" src="assets/img/icons/left_slider.png" alt="left"></div>
              </div>`;
    }

    afterRender() {
      let btn_left = document.querySelector(".slider-left-hidden");
      let btn_rigth = document.querySelector(".slider-rigth");
      let btn_top = document.querySelector(".slider-top");
      btn_left.addEventListener("click", this.toLeft);
      btn_rigth.addEventListener("click", this.toRigth);
      btn_top.addEventListener("click", this.openModalGallery);
    }
  };
});
