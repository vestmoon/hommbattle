define('app/Controllers/UserPage.js', [
    "app/Controllers/Controller.js",
    "app/Components/Header.js",
    "app/Components/ProfileInfo.js",
    "app/Components/ProfilePhotos.js",
    "app/Components/photo/Photo.js",
    "app/Components/ProfileActions.js",
    "app/Components/Wall.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/libs/fa/scss/fontawesome.css',
    'css!assets/css/theme.css',


], function (Controller, Header, ProfileInfo, ProfilePhotos, ProfileAvatar, ProfileActions, Photo, Wall) {


    return class UserPage extends Controller {

        /**
         * Инициализация компонента
         */
        constructor() {

            // Функция, вызывающая родительский конструктор
            super();
            this.postsData = [{
                avatar:"assets/img/1_square.jpg",
                name:"Джон Сноу",
                date:"Вчера 16:10",
                text:"Я снова в строю и готов воевать за свою королеву!",
                img:"assets/img/2_full.jpg"
            },
            {
                avatar:"assets/img/3_square.jpg",
                name:"Питер Паркер",
                date:"Вчера 13:10",
                text:"Не судите обо мне по моему обтягивающему костюму.",
                img:"assets/img/4_full.jpg"
            },
            {
                avatar:"assets/img/5_square.jpg",
                name:"Кристофер Нолан",
                date:"8 ноя 16:10",
                text:"Остановился ли волчок... Кто знает...",
            }]

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
                            ${new Wall(this.postsData)}
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

