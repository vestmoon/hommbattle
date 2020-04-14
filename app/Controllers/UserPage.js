define('app/Controllers/UserPage.js', [
    "app/Controllers/Controller.js",
    "app/Components/Header.js",
    "app/Components/ProfileInfo.js",
    "app/Components/ProfilePhotos.js",
    "app/Components/photo/Photo.js",
    "app/Components/ProfileActions.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/libs/fa/scss/fontawesome.css',
    'css!assets/css/theme.css',
], function (Controller, Header, ProfileInfo, ProfilePhotos, Photo, ProfileActions) {

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
                            ${new ProfileInfo()}
                            ${new ProfilePhotos()}
                        </aside>
                        <div>
                            ${new Photo("assets/img/people-square.jpg",'l')}
                            ${new ProfileActions()}
                        </div>
                    </section>
                </div>
            `;
        }

    }

});
