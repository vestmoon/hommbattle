define('app/Components/Component.js', function () {

    return class Component {

        /**
         * Создание и инициализация объектов
         */
        constructor() {}

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
