define(
    'app/Components/ProfileAvatar.js', [
        'app/Components/Component.js',
        'css!assets/css/ProfileAvatar.css',
        "app/Components/ProfilePhotos.js",
    ], function (Component, Photo) {

        return class ProfileAvatar extends Component {

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
                    <div class="block block--avatar">
                        <div class="panel">
                            <img class="block__img" src="assets/img/people.jpg" alt=""/>
                            <div class="panel-body">
                                <i class="fas fa-user-edit"></i>
                            </div>
                        </div>
                    </div>
                `;
            }

        };

    });
