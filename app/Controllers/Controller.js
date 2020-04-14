define('app/Controllers/Controller.js', function () {

    return class Controller {

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

    }

});
