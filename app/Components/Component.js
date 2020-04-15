define('app/Components/Component.js',['app/Components/ComponentController.js'], function (ComponentController) {

    return class Component {

        /**
         * Создание и инициализация объектов
         */
        constructor() {
            return (new ComponentController()).addModule(this);
        }

        /**
         * Переопределение метода, возвращающая строку
         * @returns {*}
         */
        toString() {
            return this.render();
        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {}
        
        afterRender() {}

    }

});
