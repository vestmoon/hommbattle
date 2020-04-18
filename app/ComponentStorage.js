define('app/ComponentStorage.js', function () {

    /**
     * Класс, представляющий хранилище компонентов
     */
    class ComponentStorage {

        /**
         * Создание и инициализация объектов
         */
        constructor(){
            this.list = [];
        }

        /**
         * Добавить новый компонент
         * @param {Object} item
         * @returns {void}
         */
        add(item){
            this.list.push(item);
        }

    }

    // Создание экземпляра
    const instance = new ComponentStorage();

    // Заморозка объекта
    Object.freeze(instance);

    // Возвращение экземпляра
    return instance;

});
