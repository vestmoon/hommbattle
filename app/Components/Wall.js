define(
  'app/Components/Wall.js', [
    'app/Components/Component.js',
    'css!app/Components/Wall.css'
  ],
  function (Component) {

    return class Wall extends Component {

      /**
       * Инициализация компонента
       */
      constructor(posts) {

        // Функция, вызывающая родительский конструктор
        super();
        this.posts = posts;
      }

      /**
       * Рендеринг компонента
       * @returns {string}
       */
      render() {
        this.renderPosts()
        // Возвращение рендера
        return `
              <div class="block wall">
                ${this.renderPosts()}
              </div>
              `;
      }

      renderPosts(){
        let posts = '';
        this.posts.forEach(post => {
          posts += `
              <div class="post">
                <div class="post-head">
                  <img class="block__img post-head__img" src="${post.avatar}" alt=""/>
                  <span class="post-head__name" title="${post.name}">${post.name}</span>
                  <span class="post-head__date" title="${post.date}">${post.date}</span>
                </div>
                <div class="post-body">
                  <p class="post-body__text" title="${post.text}">${post.text}</p>
                  ${this.renderPostImage(post.img)}
                </div>
              </div>
          `
        });
        return posts;
      }
      
      renderPostImage(img){
        if (img){
          return `<img class="block__img post-body__img" src="${img}" alt=""/>`;
        } else {
          return ``;
        }
      }

    };

  });