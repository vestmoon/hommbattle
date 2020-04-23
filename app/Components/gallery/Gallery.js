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
      this.count = photos.length;
      this.step = 163;
      this.visible_photos = 4;
    }

    renderPhoto() {
      let photo = "";
      for (let i = 0; i < this.photos.length; i++) {
        photo += `<div class="gallery__item">${new Photo(this.photos[i], "m")}</div>`;
      }
      return photo;
    }

    slideTo(direction, reverse) { 
      let translate = '';
      let condition = false;
      let add_to = 0;
      if(direction == 'rigth') {
        condition = this.count <= this.visible_photos + 1;
        translate = 'translateX(' + (-this.step) + 'px)';
        add_to = -1;
      }
      else {
        condition = this.count >= this.photos.length - 1;
        translate = 'translateX(' + (this.step) + 'px)';
        add_to = 1;
      }

      if(document.querySelector(`.slider-${reverse}-hidden`))
      {
        document.querySelector(`.slider-${reverse}-hidden`).classList.add("slider");
        document.querySelector(`.slider-${reverse}-hidden`).classList.add(`slider-${reverse}`);
        document.querySelector(`.slider-${reverse}`).classList.remove(`slider-${reverse}-hidden`);
      }

      let slide = document.querySelector(`.slider-${direction}`);

      let gall = document.querySelector(".gallery");
      if(this.photos.length >= this.visible_photos)
      {
        gall.style.transform += translate;
        this.count += add_to;
        if(condition) {
          slide.classList.remove("slider");
          slide.classList.remove(`slider-${direction}`);
          slide.classList.add(`slider-${direction}-hidden`);
        }
        else if (`.slider-${direction}-hidden`) {
          slide.classList.remove(`slider-${direction}-hidden`);
          slide.classList.add("slider");
          slide.classList.add(`slider-${direction}`);
        }
      }
    }

    toLeft = () => {
      this.slideTo('left', 'rigth');
    }

    toRigth = () => {
      this.slideTo('rigth', 'left');
    }

    /**
     * Рендеринг компонента
     * @returns {string}
     */
    render() {
      
      return `<div class="gallery-wrapper">
                <div class="gallery">
                 ${this.renderPhoto()}
                </div>
                <div class="slider slider-rigth"><img class="btn-slider" src="assets/img/icons/rigth_slider.png" alt="rigth"></div>
                <div class="slider-left-hidden"><img class="btn-slider" src="assets/img/icons/left_slider.png" alt="left"></div>
              </div>`;
    }

    afterRender(){
      let gall = document.querySelector(".gallery");
      let btn_left = document.querySelector(".slider-left-hidden");
      let btn_rigth = document.querySelector(".slider-rigth");
      btn_left.addEventListener("click", this.toLeft);
      btn_rigth.addEventListener("click", this.toRigth);
    }
  };
});
