/**
 * Компонент ProfileInfo отвечает за рендер информации пользователя
 */
define(
    'app/Components/ProfileInfo.js', [
        'app/Components/Component.js',
        'app/Helpers/Declensions.js',
        'app/Helpers/Loader.js',
        'css!app/Components/ProfileInfo.css'
    ], function (Component, Declensions, Loader) {
        
		const MILLISECONDS = (60 * 60 * 24 * 1000 * 365);
        const undefine = "Неизвестно";
        const userKeyRegExp = /^[0-3][0-9]\.[0-1][1-9]\.[1-2][0-9]{3}$/;
        
        return class ProfileInfo extends Component {
            
            /**
             * Инициализация компонента
             * @param {Array} data - массив данных пользователя
             */
            constructor() {
                super();
                this.data = {};
                this.module;
            }
            
			/**
             * Геттер для получения даты рождения в виде "дата месяц"
             */
            get bMonth(){
                if(userKeyRegExp.test(this.data.bDay)) {
                    let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
                    let numbers = this.data.bDay.split('.');
                    let bornTime = new Date(numbers[2], numbers[1], numbers[0]);
                    return `${numbers[0]} ${months[bornTime.getMonth() - 1]}`;
                }
            }

            /**
             * Геттер для получения кол-во лет пользователя
             */
            get age() {
                if(userKeyRegExp.test(this.data.bDay)) {
                    let currentTime = new Date();
                    let numbers = this.data.bDay.split('.');
                    let bornTime = new Date(numbers[2], numbers[1], numbers[0]);
                    let bornYear = Math.floor((currentTime - bornTime) / MILLISECONDS);
                    return Declensions.getSupplementPrefix(bornYear, ["год", "года", "лет"]);
                }
            }

            /**
             * Обработчик кнопки "Подробности"
             */
            moreButton() {
                let block = document.querySelector(".user__fullinfo");
                block.classList.toggle("visible");
                this.innerText = (this.innerText == "Подробнее") ? "Скрыть подробности" : "Подробнее";
            }

            /**
             * Обработчик кнопки "Изменить статус", "Отмена"
             */
            changeStatusButton() {
                let statusFrame = this.module.querySelector(".user__status-frame");
                let statusChangeFrame = this.module.querySelector(".user__status-change");
                let statusText = statusChangeFrame.querySelector(".user__status-area");
                statusFrame.classList.toggle("visible");
                statusChangeFrame.classList.toggle("visible");
                statusText.value = this.data.status;
            }

            /**
             * Обработчик кнопки "Подтвердить"
             */
            changeStatusAccept() {
                let statusFrame = this.module.querySelector(".user__status-frame");
                let status = statusFrame.querySelector(".user__status");
                let statusChangeFrame = this.module.querySelector(".user__status-change");
                let statusText = statusChangeFrame.querySelector(".user__status-area");
                if (statusText.value !== status.innerText){
                    this.data.status = statusText.value;
                    let raw = JSON.stringify(this.data);
                    let options = {
                        method: 'POST',
                        body: raw,
                        credentials: 'include'
                    };
                    Loader.create(this.id);
                    let promise = this.getData("https://tensor-school.herokuapp.com/user/update", options)
                    promise.then(
                        result => {
                            statusFrame.classList.toggle("visible");
                            statusChangeFrame.classList.toggle("visible");
                            status.innerText = this.data.status;
                            Loader.completeLoader(this.id);
                        },
                        error => {
                            Loader.errorLoader(this.id, "Ошибка подключения");
                        }
                    );
                } else {
                    statusFrame.classList.toggle("visible");
                    statusChangeFrame.classList.toggle("visible");
                }
            }

            /**
             * Отрисовка основной и дополнительной информации 
             */
            renderInfo(title, text) {
                return `
                    <div class="user__info">
                        <span class="user__info user__info_left">${title}</span>
                        <span class="user__info user__info_right">${text}</span>
                    </div>
                `; 
            }

            /**
             * Метод обновления компонента после получения данных
             */
            update() {
                let mainInfo = this.renderInfo("День рождения", `${this.bMonth || undefine}, ${this.age || undefine}`);
                mainInfo += this.renderInfo("Город", this.data.city || undefine);

                let additionalInfo = this.renderInfo("Образование", `${this.data.edu || undefine} ${this.data.eduYear || undefine}`);
                additionalInfo += this.renderInfo("Место работы", this.data.jobName || undefine);

                let block = document.createElement('div');
                block.innerHTML = `
                        <h2 class="user__name">${this.data.firstName || undefine} ${this.data.lastName || undefine}</h2>
                        <div class="user__status-frame visible">
                            <p class="user__status">${this.data.status || ""}</p>
                            <p class="button button__user button__user_status">Изменить статус</p>
                        </div>
                        <div class="user__status-change">
                            <textarea class="user__status-area" maxlength="256"></textarea>
                            <p class="button button__user button__user_status button__user_accept">Подтвердить</p>
                            <p class="button button__user button__user_status button__user_deny">Отмена</p>
                        </div>
                        ${mainInfo}
                        <p class="button button__user button__user_blue">Подробнее</p>
                        <div class="user__fullinfo">${additionalInfo}</div>
                `;
               document.getElementById(this.id).appendChild(block);
               this.afterUpdate();
            }

            /**
             * Асинхронный метод получения данных из сервера
             * @param url
             * @param options
             * @returns {Promise<any>}
             */
            async getData(url, options){
                let response = await fetch(url, options);
                return response.json();
            }

            /**
             * Рендеринг компонента
             * @returns {string}
             */
            render() {
                let promise = this.getData("https://tensor-school.herokuapp.com/user/current", {credentials: 'include'})
                promise.then(
                    result => {
                        this.data = result.data;
                        this.update();
                    },
                    error => {
                        document.getElementById(this.id).innerText = "Connection Error";
                    }
                );
                return `<div class="user"></div>`;
            }
			
			/**
             * Добавление события к кнопкам
             */
            afterUpdate() {
                this.module = document.getElementById(this.id);
                let buttonDetailInfo = this.module.querySelector(".button__user_blue");
                let buttonChangeStatus = this.module.querySelector(".user__status-frame").querySelector(".button__user_status");
                let buttonDenyStatus = this.module.querySelector(".user__status-change").querySelector(".button__user_deny");
                let buttonAcceptStatus = this.module.querySelector(".user__status-change").querySelector(".button__user_accept");

                buttonDenyStatus.addEventListener("click", () => this.changeStatusButton());
                buttonDetailInfo.addEventListener("click", this.moreButton);
                buttonChangeStatus.addEventListener("click", () => this.changeStatusButton());
                buttonAcceptStatus.addEventListener("click", () => this.changeStatusAccept());
            }

        };

    });
