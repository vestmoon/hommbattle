define(
    'app/Components/ProfilePhotos.js', [
        'app/Components/Component.js',
        'css!assets/css/ProfilePhotos.css'
    ], function (Component) {

        return class ProfilePhotos extends Component {

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
                    <div class="block block--photos">
                        <a target="_blank" href="assets/img/1_full.jpg" title="Открыть в новом окне">
                            <img class="block__img" src="assets/img/1_square.jpg" alt=""/>
                        </a>
                        <a target="_blank" href="assets/img/2_full.jpg" title="Открыть в новом окне">
                            <img class="block__img" src="assets/img/2_square.jpg" alt=""/>
                        </a>
                        <a target="_blank" href="assets/img/3_full.jpg" title="Открыть в новом окне">
                            <img class="block__img" src="assets/img/3_square.jpg" alt=""/>
                        </a>
                        <a target="_blank" href="assets/img/4_full.jpg" title="Открыть в новом окне">
                            <img class="block__img" src="assets/img/4_square.jpg" alt=""/>
                        </a>
                    </div>
                `;
            }

        };

    });
