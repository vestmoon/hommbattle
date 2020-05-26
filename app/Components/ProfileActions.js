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
            this.config = [
                {
                    "title": "Поклонники",
                    "iconClass": ["fas", "fa-heart"],
                    "src": "fans/{id}"
                },
                {
                    "title": "Интересное",
                    "iconClass": ["fas", "fa-star"],
                    "src": "interesting/{id}"
                },
                {
                    "title": "Друзья",
                    "iconClass": ["fas", "fa-user-friends"],
                    "src": "friends/{id}"
                },
                {
                    "title": "Видео",
                    "iconClass": ["fas", "fa-video"],
                    "src": "video/{id}"
                },
                {
                    "title": "Фотки",
                    "iconClass": ["fas", "fa-image"],
                    "src": "photo/{id}"
                },
                {
                    "title": "Музыка",
                    "iconClass": ["fas", "fa-music"],
                    "src": "audios/{id}"
                }
            ];
        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {

            // Генерация кнопок меню
            let menuItems = '';

            this.config.forEach((item) => {
                menuItems += `
                    <a target="_blank" href="action.html">
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
