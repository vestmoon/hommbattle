define('app/Controllers/UserPage.js', [
    "app/Controllers/Controller.js",
    "app/Components/Header.js",
    "app/Components/ProfileInfo.js",
    "app/Components/ProfilePhotos.js",
    "app/Components/ProfileAvatar.js",
    "app/Components/ProfileActions.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/libs/fa/scss/fontawesome.css',
    'css!assets/css/theme.css',
], function (Controller, Header, ProfileInfo, ProfilePhotos, ProfileAvatar, ProfileActions) {
	const user = {
        id: 1,
        firstName: 'Эммелин',
        lastName: 'Лоуренс',
        bDay: '13.05.1998',
        city: 'Колумбус',
        status: "Похоже, в наши дни многие крупные газеты стараются ответить на один вопрос: что самое плохое сегодня случилось на Земле?",
        edu: 'Университет Финикс',
        eduYear: 2016,
        jobName: "Тесла"
    };
    return class UserPage extends Controller {

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

            return `
               <div class="container">
                    ${new Header()}
                    <section class="layout">
                        <aside>
                            ${new ProfileInfo(user)}
                            ${new ProfilePhotos()}
                        </aside>
                        <div>
                            ${new ProfileAvatar()}
                            ${new ProfileActions()}
                        </div>
                    </section>
                </div>
            `;

        }

    }

});
