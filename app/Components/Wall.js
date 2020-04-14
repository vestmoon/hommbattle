define(
  'app/Components/Wall.js', [
    'app/Components/Component.js',
    'css!assets/css/Wall.css'
  ],
  function (Component) {

    return class Wall extends Component {

      /**
       * Инициализация компонента
       */
      constructor() {

        // Функция, вызывающая родительский конструктор
        super();

      }

      /**
       * Рендеринг компонента
       * @returns {string}
       */
      render() {

        // Возвращение рендера
        return `
              <div class="block wall">
                <div class="wall-head">
                  <img class="block__img wall-head__img" src="assets/img/people-square.jpg" alt=""/>
                  <span class="wall-head__name" title="Эммелин Лоуренс">Эммелин Лоуренс</span>
                  <span class="wall-head__date" title="Вчера 14:33">Вчера 14:33</span>
                </div>
                <div class="wall-body">
                  <p class="wall-body__text" title="Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, fuga!">Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, fuga!</p>
                  <img class="block__img wall-body__img" src="assets/img/2_full.jpg" alt=""/>
                </div>
              </div>
              `;
      }

    };

  });