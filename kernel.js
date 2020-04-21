/**
 * Получение первого элемент массива
 * @returns {*}
 */

Array.prototype.first = function () {
    return this[0];
};

/**
 * Инициализация сайта
 */

require([
    'app/ComponentStorage.js',
    'app/Controllers/UserPage.js'
], function (ComponentStorage) {

    // Авторизация (временно)
    let urlencoded = new URLSearchParams();
    urlencoded.append("login", "testlogin");
    urlencoded.append("password", "123123");

    let requestOptions = {
        method: 'POST',
        body: urlencoded,
        credentials: 'include'
    };

    fetch("https://tensor-school.herokuapp.com/user/login", requestOptions)
        .then(response => response.text())
        .then(result => main())
        .catch(error => document.body.innerHTML = "Connection error!");


    function main() {
        document.body.innerHTML = ComponentStorage["list"].first();

        ComponentStorage["list"].forEach(instance => {
            instance.afterRender();
        });
    }

});
