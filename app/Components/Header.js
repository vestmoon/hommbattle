define(
    'app/Components/Header.js', [
        'app/Components/Component.js',
        'app/Components/photo/Photo.js',
        'css!app/Components/Header.css',
        'css!app/Components/photo/photo.css'
    ], function (Component, Photo) {

        return class Header extends Component {

            /**
             * Инициализация компонента
             */
            constructor(status = 'В сети', photoUrl = 'app/Components/photo/default_photo.jpg') {

                // Функция, вызывающая родительский конструктор
                super();

                this.status = status;
                this.photoUrl = photoUrl;
                this._clickHandler = this._clickHandler.bind(this);
                this.navItems = [];

                this.addItemMenu('Редактировать','#');
                this.addItemMenu('Настройки','#');
            }


            /**
             * Добавить ссылку в меню
             * @param {String} linkName - Имя ссылки
             * @param {String} link - ссылка
             */
            addItemMenu(linkName,link) {
                let navItemString = `<a class="nav-link" href="${link}">${linkName}</a>` 
                this.navItems.push(navItemString);
            }

            /**
             * Рендер ссылок
             */
            renderNavItems() {
                let result = '';
                this.navItems.forEach((item) =>  {
                    result += item;
                })
                return result;
            }

            /**
             * Обработчик клика по иконке меню
             */
            _clickHandler() {
                let headerProfile = document.querySelector(".header__profile");
                if(event.target && !headerProfile.contains(event.target)) {
                    this.toggleHeaderMenu();
                   }
            }

            /**
             * Открытие/закрытие меню и удаление обработчика
             * При открытие на документ вешается обработчик клика,
             * при клике на область не содержащую меню, закрываю меню
             * и удаляю обработчик 
             */
            toggleHeaderMenu() {
                let profileNav = document.querySelector(".profile__nav").classList;
                if(profileNav.contains('visible') ){
                    profileNav.remove('visible');
                    document.removeEventListener('click', this._clickHandler);
                } else {
                    profileNav.add('visible');
                    document.addEventListener('click', this._clickHandler);
                }
            }


            /**
             * Вешаю обработчик клика по иконке меню
             */
            afterRender() {
                 let headerProfile = document.querySelector(".header__profile");
                headerProfile.addEventListener("click", () => this.toggleHeaderMenu());
            }



            /**
             * Рендеринг компонента
             * @returns {string}
             */
            render() {
                // Возвращение рендера
                return `
                    <header class="header header_blue header_rounded">
                        <div class="header__wraper wraper">
                            <div class="header__status">
                                <p>${this.status}</p>
                            </div>
                            <div class="header__profile">
                                    ${new Photo(this.photoUrl, 'xs')}
                                <span class="profile__settings">
                                    <span class="settings-dot"></span>
                                    <span class="settings-dot"></span>
                                    <span class="settings-dot"></span>
                                </span>
                                <div class="profile__nav">
                                    ${this.renderNavItems()}
                                    <hr class="nav-link__line">
                                    <a class="nav-link" href="#">Выйти</a>
                                </div>
                            </div>
                        </div>
                    </header>
                    `;
            }

        };

    });
