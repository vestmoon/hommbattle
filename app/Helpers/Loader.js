define('app/Helpers/Loader.js',["css!app/Helpers/Loader.css"],
    function () {
        /**
         * Отображение загрузки
         */
        class Loader {

            /**
             * Создает анимацию загрузки
             * @param id - идентификатор компонента
             */
            create(id) {
                let block = document.getElementById(id);
                let loader = document.createElement("img");
                loader.className = "loader";
                loader.src = "./assets/img/loader/loader.gif";
                block.style.position = "relative";
                block.appendChild(loader);
            }

            /**
             * Смена анимации загрузки на иконку ok
             * @param id - идентификатор компонента
             */
            completeLoader(id) {
                let block = document.getElementById(id);
                let loader = block.querySelector(".loader");
                loader.src = "./assets/img/loader/ok.png";
                setTimeout(() => {
                    block.style.position = "";
                    loader.remove();
                }, 2000);
            }

            /**
             * Смена анимации загрузки на иконку error
             * @param id - идентификатор компонента
             * @param error - сообщение ошибки
             */
            errorLoader(id, error="Неизвестная ошибка") {
                let block = document.getElementById(id);
                let loader = block.querySelector(".loader");
                loader.src = "./assets/img/loader/error.png";
                loader.title = error;
                setTimeout(() => {
                    block.style.position = "";
                    loader.remove();
                }, 10000);
            }

        }

        // Создание экземпляра
        const init = new Loader();
        Object.freeze(init);
        return init;

});
