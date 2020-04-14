define(
    'app/Components/Header.js', [
        'app/Components/Component.js',
        'css!assets/css/Header.css'
    ], function (Component) {

        return class Header extends Component {

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
                    <header class="header">
                        <div class="block block--header">
                            <aside class="block__title">
                                В сети
                            </aside>
                            <div class="block__manage">
                                <a class="block__link" href="#">Редактировать</a>
                                <img class="block__img" src="assets/img/people-square.jpg" alt=""/>
                                <i class="fas fa-ellipsis-v"></i>
                            </div>
                        </div>
                    </header>
                `;
            }

        };

    });
