/**
 * Компонент Wall отвечает за рендер стены пользователя
 * На вход принимает массив объектов вида:
 * {
    avatar:"assets/img/1_square.jpg",
    name:"Джон Сноу",
    date:"Вчера 16:10",
    text:"Я снова в строю и готов воевать за свою королеву!",
    img:"assets/img/2_full.jpg"
    }
 *   
 */
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
        // Возвращение рендера
        return `
              <div class="block wall">
                ${this.renderPosts()}
              </div>
              `;
      }
      /**
       * Рендер постов 
       */
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
                  ${post.img ? `<img class="block__img post-body__img" src="${post.img}" alt=""/>` : ''}
                </div>
              </div>
          `
        });
        return posts;
      }
    };

  });