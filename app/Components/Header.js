define(
    'app/Components/Header.js', [
        'app/Components/Component.js',
        'app/Components/photo/Photo.js',
        'css!app/Components/Header.css'
    ], function (Component, Photo) {

        return class Header extends Component {

            /**
             * Инициализация компонента
             */
            constructor(photoUrl, status = 'В сети', navItems) {

                // Функция, вызывающая родительский конструктор
                super();

                this.status = status;
                this.photoUrl = photoUrl;
                this._clickHandler = this._clickHandler.bind(this);
                this.navItems = [   
                    {
                        linkName: 'Редактировать',
                        link: '#'
                    },
                    {
                       linkName: 'Настройки',
                       link: '#'
                    }
                ];
                if(navItems) {
                    this.navItems = [];
                    navItems.forEach((item) =>  {
                        this.navItems.push(item);
                    })
                }
            }

            /**
             * Рендер ссылок
             */
            renderNavItems() {
                let result = '';
                this.navItems.forEach((item) =>  {
                    result +=  `<a class="nav-link" href="${item.link}">${item.linkName}</a>` ;
                })
                return result;
            }

            /**
             * Обработчик клика по иконке меню
             */
            _clickHandler() {
                if(event.target && !document.querySelector(".header__profile").contains(event.target)) {
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
                 document.querySelector(".header__profile").addEventListener("click", 
                 () => this.toggleHeaderMenu());
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
