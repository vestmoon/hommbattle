/**
 * Инициализация сайта
 */

require(['app/Controllers/UserPage.js'], function (UserPage) {
    document.body.innerHTML = new UserPage();
});
