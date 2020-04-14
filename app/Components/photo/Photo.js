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
    constructor(url, size) {
      super();
      this.url = url;
      this.size = size;
    }ы

    /**
     * Рендеринг компонента
     * @returns {string}
     */
    render() {
      return `
             <img src="${
               this.url || "app/Components/photo/default_photo.jpg"
             }" class='${this.size || "l"}-photo' alt="Photo">`;
    }
  };
});
