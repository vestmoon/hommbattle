define('app/Controllers/UserPage.js', [
    "app/Components/Component.js",
    "app/Components/Header.js",
    "app/Components/ProfileInfo.js",
    "app/Components/gallery/Gallery.js",
    "app/Components/photo/Photo.js",
    "app/Components/ProfileActions.js",
    "app/Components/Message.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/libs/fa/scss/fontawesome.css',
    'css!assets/css/theme.css',
], function (Component, Header, ProfileInfo, Gallery, Photo, ProfileActions, Message) {

    class UserPage extends Component {

        /**
         * Инициализация компонента
         */
        constructor() {
            // Функция, вызывающая родительский конструктор
            super();              

            // Данные о пользователе
            this.user = {
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

            // Данные о стене
            this.postsData = [
                {
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
                }
            ];

            // Данные о сообщениях
            this.messagesData = [
                {
                    avatar:"assets/img/7_square.jpg",
                    name:"Дэвид Грей",
                    date:"Вчера 16:10",
                    text:"Давно тебя не было в уличных гонках!",
                },
                {
                    avatar:"assets/img/6_square.jpg",
                    name:"Мак ДеМарко",
                    date:"Вчера 16:10",
                    text:"Ты уже послушала мой новый альбом? Тебе понравится, обещаю.",
                },
                {
                    avatar:"assets/img/8_square.jpg",
                    name:"Девочка в пуховике",
                    date:"Вчера 16:10",
                    text:"Я к вам пишу — чего же боле? Что я могу ещё сказать? Теперь, я знаю, в вашей воле Меня презреньем наказать.",
                }
            ];

            // Данные о фотографиях
            this.photos = [
                "assets/img/1_square.jpg",
                "assets/img/2_square.jpg",
                "assets/img/3_square.jpg",
                "assets/img/4_square.jpg",
                "assets/img/1_square.jpg",
                "assets/img/2_square.jpg",
                "assets/img/3_square.jpg",
                "assets/img/4_square.jpg",
                "assets/img/1_square.jpg",
                "assets/img/2_square.jpg",
                "assets/img/3_square.jpg",
                "assets/img/4_square.jpg",
                "assets/img/1_square.jpg",
                "assets/img/2_square.jpg",
                "assets/img/3_square.jpg",
                "assets/img/4_square.jpg",
            ];

        }

        // Получение данных о фотографии пользователя
        async renderUserPhoto(){
            const API_URL = 'https://tensor-school.herokuapp.com';
            let photoUser='app/Components/photo/default_photo.jpg';
            let url = API_URL + '/user/current';
            let options = {"credentials": "include"};
            const response = await fetch(url, options);

            try {
                const code = response.status;
                if(code == 200){
                    const user = await response.json();
                    photoUser = new Photo(API_URL+user['computed_data']['photo_ref'], 'l');
                    document.querySelector(".block_pos").innerHTML = `${photoUser}`;
                }

            }catch(e) {
                photoUser='Упс, что-то пошло не так'
            }

            photoUser.afterRender();

            return photoUser;
        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {

            return `
               <div class="container">
                    ${new Header("assets/img/people.jpg")}
                    <section class="layout">
                        <aside>
							<div class="block">
								${new ProfileInfo(this.user)}
							</div>
                            <div class="block">
                                ${new Gallery(this.photos)}
                            </div>
                            <div class="block">
                                ${new Message(this.postsData, 'post')}
                            </div>
                        </aside>
                        <div> 
                            <div class="block  block_pos">
                            </div>
                            ${new ProfileActions()}
                            <div class="block">
                                ${new Message(this.messagesData, 'message')}
                            </div>
                        </div>
                    </section>
                </div>
            `;
        }

        // Вызов функции для отрисовки фотографии пользователя
        afterRender(){
            (async () => {
                await this.renderUserPhoto();
            })();
        }

    }

    // Создание и возвращение экземпляра
    return new UserPage();

});

