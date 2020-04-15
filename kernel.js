/**
 * Получение первый элемент массива
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
    'app/Pages/UserPage.js'
], function (ComponentStorage) {

    document.body.innerHTML = ComponentStorage["list"].first();

    ComponentStorage["list"].forEach(instance => {
        instance.afterRender();
    });

});
