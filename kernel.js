/**
 * Инициализация приложения
 */

(async function f() {
    // Адрес API
    const url = 'https://tensor-school.herokuapp.com/user/current';

    // Опции запроса
    const options = {
        method: 'get',
        credentials: 'include'
    };

    // Объект текущего пользователя
    let user = null;

    try {

        // Выполнение запроса
        const response = await fetch(url, options);
        const code = response.status;

        // Проверка корректности кода для авторизованного пользователя
        if(code === 200) {
            user = await response.json();
        }

        // Название подгружаемой страницы
        const includedPage = user ? 'UserPage' : 'AuthPage';

        // Загрузка компонентов
        require([
            'app/ComponentStorage.js',
            `app/Controllers/${includedPage}.js`
        ], function (ComponentStorage, Page) {
            document.body.innerHTML = new Page();
            ComponentStorage.list.forEach(instance => {
                instance.afterRender();
            });
        });

    } catch (e) {
        document.body.innerHTML = 'Упс, похоже, что-то пошло не так.';
    }

})();
