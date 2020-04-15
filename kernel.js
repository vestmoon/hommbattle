/**
 * Инициализация сайта
 */

require(['app/Controllers/UserPage.js', 'app/Controllers/ComponentController.js'], function (UserPage, ComponentController) {
    
    document.body.innerHTML = new UserPage();
    
    let list = ComponentController.listModule;
    list.forEach(name => {
        name.afterRender();
    });
});
