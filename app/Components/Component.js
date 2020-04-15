define('app/Components/Component.js',['app/Controllers/ComponentController.js'], function (ComponentController) {

    return class Component {

        /**
         * Создание и инициализация объектов
         */
        constructor() {
            return ComponentController.addModule(this);
        }

        /**
         * Переопределение метода, возвращающая строку
         * @returns {*}
         */
        toString() {
            this.beforeRender();
            return this.render();
        }

        beforeRender() {}
        
        render() {}
        
        afterRender() {}
        

    }

});
