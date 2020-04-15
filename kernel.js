/**
 * Инициализация сайта
 */

require(['app/Controllers/UserPage.js'], function (UserPage) {
    let main = new UserPage();
    document.body.innerHTML = main;
    main.afterRender();
});
