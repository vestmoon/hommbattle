define('app/Pages/UserPage.js', [
    "app/Components/Component.js",
    "app/Components/Header.js",
    "app/Components/ProfileInfo.js",
    "app/Components/ProfilePhotos.js",
    "app/Components/photo/Photo.js",
    "app/Components/ProfileActions.js",
    "app/Components/Message.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/libs/fa/scss/fontawesome.css',
    'css!assets/css/theme.css',
], function (Component, Header, ProfileInfo, ProfilePhotos, Photo, ProfileActions, Message) {

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

    class UserPage extends Component {

        /**
         * Инициализация компонента
         */
        constructor() {

            // Функция, вызывающая родительский конструктор
            super();

            // Выборка для стены
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
            }];

            // Выборка для сообщений
            this.messagesData = [{
                avatar:"assets/img/6_square.jpg",
                name:"Дэвид Грей",
                date:"Вчера 16:10",
                text:"Давно тебя не было в уличных гонках!",
            },
            {
                avatar:"assets/img/7_square.jpg",
                name:"Мак ДеМарко",
                date:"Вчера 16:10",
                text:"Ты уже послушала мой новый альбом? Тебе понравится, обещаю.",
            },
            {
                avatar:"assets/img/8_square.jpg",
                name:"Девочка в пуховике",
                date:"Вчера 16:10",
                text:"Я к вам пишу — чего же боле? Что я могу ещё сказать? Теперь, я знаю, в вашей воле Меня презреньем наказать.",
            }];

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
                            ${new Message(this.postsData, 'post')}
                        </aside>
                        <div>
                            ${new Photo("assets/img/people-square.jpg",'l')}
                            ${new ProfileActions()}
                            ${new Message(this.messagesData, 'message')}
                        </div>
                    </section>
                </div>
            `;

        }

    }

    // Создание и возвращение экземпляра
    return new UserPage();

});

