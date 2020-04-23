define('app/Controllers/AuthPage.js', [
    "app/Components/Component.js",
    'css!assets/libs/normalize/normalize.css',
    'css!assets/css/theme.css',
    'css!assets/css/auth.css',
], function (Component) {

    // Страница авторизации
    class AuthPage extends Component {

        /**
         * Инициализация компонента
         */
        constructor() {
            // Функция, вызывающая родительский конструктор
            super();
        }

        /**
         * Событие, когда отправляется форма
         * @param {Event} e
         */
        async _formSubmit(e) {

            // Действие по умолчанию не должно выполняться так, как обычно
            e.preventDefault();

            // Уведомления
            const alerts = document.getElementById(this.id)
                .querySelector('.form-sign__message');

            // Очистка уведомлений
            alerts.innerHTML = '';

            // Адрес API
            const url = 'https://tensor-school.herokuapp.com/user/login';

            // Опции запроса
            const options = {
                method: 'post',
                body: new FormData(this),
                credentials: 'include'
            };

            try {

                // Выполнение запроса
                const response = await fetch(url, options);
                const code = response.status;

                // Проверка корректности кода
                if(code === 200) {
                    location.reload();
                } else {
                    alerts.innerHTML = `
                        <div class="alert alert_error">
                            Введен неверный логин или пароль.
                        </div>
                    `;
                }

            } catch (e) {
                alerts.innerHTML = `
                    <div class="alert alert_error">
                        Упс, похоже, что-то пошло не так.
                    </div>
                `;
            }

        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {
            return `
                <div class="block block--auth">
                    <form id="signForm" class="form-sign" method="POST">
                        <div class="form-sign__title">Авторизация</div>
                        <div class="form-sign__message">
                        </div>
                        <label>
                            <input type="text" name="login" value="testlogin" placeholder="Имя пользователя">
                        </label>
                        <label>
                            <input type="password" name="password" value="123123" placeholder="Пароль">
                        </label>
                        <button type="submit">Войти</button>
                    </form>
                </div>
            `;
        }

        /**
         * Метод, который запускается после того, как компонент отрендерился в DOM
         * @returns {void}
         */
        afterRender() {
            const formSign = document.getElementById('signForm');
            formSign.addEventListener('submit', this._formSubmit);
        }

    }

    // Создание и возвращение экземпляра
    return AuthPage;

});

