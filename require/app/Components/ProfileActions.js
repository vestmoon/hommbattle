define(
    'app/Components/ProfileActions.js', [
        'app/Components/Component.js',
        'text!dataset/ProfileActionsItems.json',
        'css!assets/css/ProfileActions.css'
    ], function (Component, ProfileActionsItems) {

    return class ProfileActions extends Component {

        /**
         * Инициализация компонента
         */
        constructor() {

            // Функция, вызывающая родительский конструктор
            super();

            // Конфигурация меню
            this.config = JSON.parse(ProfileActionsItems);

        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {

            // Генерация кнопок меню
            let menuItems = '';

            this.config.buttons.forEach((item) => {
                menuItems += `
                    <a href="/${item.src}">
                        <div class="details__item" title="${item.title}">
                            <div class="details__title">
                                <i class="${item.iconClass.join(' ')}"></i>
                            </div>
                            <div class="details__value">${item.title}</div>
                        </div>
                    </a>
                `;
            });

            // Возвращение рендера
            return `
                <div class="block block--actions">
                    <div class="details details--column">
                        ${menuItems}
                    </div>
                </div>
            `;
        }

    };

});
