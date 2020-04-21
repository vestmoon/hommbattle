/**
 * Компонент ProfileInfo отвечает за рендер информации пользователя 
 * На вход принимает массив объектов вида:
 * {
        id: 1,
        firstName: 'Эммелин',
        lastName: 'Лоуренс',
        bDay: '13.05.1998',
        city: 'Колумбус',
        status: "Похоже, в наши дни многие крупные газеты стараются ответить на один вопрос: что самое плохое сегодня случилось на Земле?",
        edu: 'Университет Финикс',
        eduYear: 2016,
        jobName: "Тесла"
    }
 */
define(
    'app/Components/ProfileInfo.js', [
        'app/Components/Component.js',
        'css!app/Components/ProfileInfo.css'
    ], function (Component) {
        
		const MILLISECONDS = (60 * 60 * 24 * 1000 * 365);
        const undefine = "Неизвестно";
        
        return class ProfileInfo extends Component {
            
            /**
             * Инициализация компонента
             * @param {Array} data - массив данных пользователя
             */
            constructor() {
                super();
            }
            
			/**
             * Приводим дату рождения к виду "дата месяц, кол-во лет"
             */
            birthday(data){
                let yearString = ["год", "года", "лет"];
                let months = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                let currentTime = new Date();
                if(data.bDay != null) {
                    let numbers = data.bDay.split('.');
                    let bornTime = new Date(numbers[2], numbers[1], numbers[0]);
                    let bornYear = Math.floor((currentTime-bornTime) / MILLISECONDS);
                    let bornYearStr = yearString[(bornYear % 100 > 4 && bornYear % 100 < 20) ? 2 : [2, 0, 1, 1, 1, 2][(bornYear % 10 < 5) ? bornYear % 10 : 5]];
                    return `${numbers[0]} ${months[bornTime.getMonth()-1]}, ${bornYear} ${bornYearStr}`;
                } else {
                    return undefine;
                }
            }
            
            // Обработчик клика
            moreButton() {
                let block = document.querySelector(".user__fullinfo");
                block.classList.toggle("visible");
                this.innerText == "Подробнее" ? this.innerText="Скрыть подробности" : this.innerText="Подробнее";
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
             * @param data
             */
            update(data) {
                let mainInfo = this.renderInfo("День рождения", this.birthday(data) || undefine);
                mainInfo += this.renderInfo("Город", data.city || undefine);

                let additionalInfo = this.renderInfo("Образование", `${data.edu || undefine} ${data.eduYear || undefine}`);
                additionalInfo += this.renderInfo("Место работы", data.jobName || undefine);

                let block = document.createElement('div');
                block.innerHTML = `
                        <h2 class="user__name">${data.firstName || undefine} ${data.lastName || undefine}</h2>
                        <p class="user__status">${data.status || undefine}</p>
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
                        this.update(result.data);
                    },
                    error => {
                        document.getElementById(this.id).innerText = "Connection Error";
                    }
                );
                return `<div class="user"></div>`;
            }
			
			/**
             * Поиск кнопки и блока дополнительной информации, добавление события клика на кнопку
             */
            afterUpdate() {
                let button = document.getElementById(this.id).querySelector(".button__user_blue");
                button.addEventListener("click", this.moreButton);
            }

        };

    });
