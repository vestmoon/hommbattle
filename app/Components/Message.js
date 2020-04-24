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
        this.updMessages = [];
      }

      /**
       * Рендеринг компонента
       * @returns {string}
       */
      render() {
        this.getMessages()
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
      /**
       * Получем id авторизованного пользователя
       */
      async getCurrentUser() {
        const url = "https://tensor-school.herokuapp.com/user/current";
        let response = await fetch(url, {
          "credentials": "include"
        });
        let result = await response.json();
        return result.id
      }

      /**
       * Получаем массив сообщений авторизованного пользователя
       */
      async getMessages() {
        const currentUser = await this.getCurrentUser()
        const url = `https://tensor-school.herokuapp.com/message/list/${currentUser}`;
        let response = await fetch(url, {
          "credentials": "include"
        });
        let result = await response.json();

        await result.messages.reverse().forEach(item => {
          this.updMessages.push({
            avatar: '/assets/img/6_square.jpg',
            name: "Джон Тестер",
            date: "Когда-то",
            text: item.message
          })
        })
        await this.updateMessages();
      }

      /**
       * Апдейт сообщений. Заменяем заглушки, сообщениями полученными с сервера
       */
      updateMessages() {
        let i = 0;
        if (this.type == "message") {
          const block = document.getElementById(this.id)
          const messages = block.querySelectorAll('.post')
          messages.forEach(item => {
            item.querySelector('.post-head__img').innerHTML = new Photo(this.updMessages[i].avatar, 's')
            item.querySelector('.post-head__name a').innerHTML = this.updMessages[i].name;
            item.querySelector('.post-head__date').innerHTML = this.updMessages[i].date;
            item.querySelector('.post-head__text').innerHTML = this.updMessages[i].text;
            i++;
          })
        }
      }
    };

  });