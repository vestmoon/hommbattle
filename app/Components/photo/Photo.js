define("app/Components/photo/Photo.js", [
  "app/Components/Component.js",
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

    round(){
      let mod_round ='';
      if(this.size == 'xs' || this.size == 's')
      {
        mod_round = 'photo_round';
      }
      return mod_round;
    }

    /**
     * Рендеринг компонента
     * @returns {string}
     */
    render() {
      return ` <img src="${this.url}" class='photo size_${this.size} ${this.round()}' alt="Photo">`;
    }
  };
});
