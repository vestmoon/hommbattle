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
 *  и тип ('message'/'post') 
 *  в зависимости от которой изменяется внешний вид компонента
 */
define(
  'app/Components/Message.js', [
    'app/Components/Component.js',
    'app/Components/photo/Photo.js',
    'css!app/Components/Message.css'
  ],
  function (Component, Photo) {

    return class Message extends Component {

      /**
       * Инициализация компонента
       * @param {Array} posts - массив объектов
       * @param {String} type - тип сообщения: message или post
       */
      constructor(posts, type = 'post') {

        // Функция, вызывающая родительский конструктор
        super();
        this.posts = posts;
        this.type = type;
      }

      /**
       * Рендеринг компонента
       * @returns {string}
       */
      render() {
        // Возвращение рендера
        return `
          <div class="messages">
            ${this.renderPosts()}
          </div>
          `;
      }
      /**
       * Рендер постов 
       */
      renderPosts() {
        let posts = '';
        this.posts.forEach(post => {
          posts += `
              <div class="post ${this.type == 'message' ? 'message' : ''}">
                <div class="post-head">
                  <div class="post-head__img">
                    ${new Photo(post.avatar,'s')}
                  </div>
                  <span class="post-head__name" title="${post.name}"><a href="#">${post.name}</a></span>
                  <span class="post-head__date" title="${post.date}">${post.date}</span>
                  <span class="post-head__text" title="${post.text}">${post.text}</span>
                </div>
                  ${this.type == 'post' ? this.renderPostAttachments(post) : ''}        
              </div>
          `
        });
        return posts;
      }
      /**
       * При выборе типа "post" возможен
       * пендер прикрепленных файлов (фото)
       */
      renderPostAttachments(post) {
        return `
        <div class="post-attachments">
          ${post.img ? new Photo(post.img, 'xl') : ''}
        </div>
        `;
      }
    };

  });