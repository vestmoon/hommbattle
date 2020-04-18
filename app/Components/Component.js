define('app/Components/Component.js', ['app/ComponentStorage.js'], function (ComponentStorage) {

    /**
     * Класс, представляющий компонент
     */
    return class Component {

        /**
         * Создание и инициализация объектов
         */
        constructor() {

            // Идентификатор компонента
            this.id = Math.floor(Math.random() * (999999 - 100000)) + 100000;

            // Добавление компонента в хранилище
            ComponentStorage.add(this);

            // Метод, который запускается непосредственно перед рендерингом компонента
            this.beforeRender();
        }

        /**
         * Переопределение метода, возвращающая строку
         * @returns {string}
         */
        toString() {

            const template = this.render();
            const tagName = template.trim().split(' ')[0];

            return template.replace(tagName, `${tagName} id="${this.id}"`);
        }

        /**
         * Рендеринг компонента
         * @returns {string}
         */
        render() {}

        /**
         * Метод, который запускается непосредственно перед рендерингом компонента
         * @returns {void}
         */
        beforeRender() {}

        /**
         * Метод, который запускается после того, как компонент отрендерился в DOM
         * @returns {void}
         */
        afterRender() {}
        
    }

});
