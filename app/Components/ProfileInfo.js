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
        let button, block;
        
        return class ProfileInfo extends Component {
            
            /**
             * Инициализация компонента
             * @param {Array} data - массив данных пользователя
             */
            constructor(data) {
                super();
                this.data = data;
            }
            
			/**
             * Приводим дату рождения к виду "дата месяц, кол-во лет"
             */
            get birthday(){
                let months = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                let currentTime = new Date();
                if(this.data.bDay != null) {
                    let numbers = this.data.bDay.split('.');
                    let bornTime = new Date(numbers[2], numbers[1], numbers[0])
                    return `${numbers[0]} ${months[bornTime.getMonth()-1]}, ${Math.floor((currentTime-bornTime) / MILLISECONDS)} лет`;
                } else {
                    return undefine;
                }
            }
            
            // Обработчик клика
            moreButton() {
                switch(block.style.display) {
                    case 'block':
                        block.style.display = "none";
                        button.innerText = "Подробнее";
                        break;
                    default:
                        block.style.display = "block";
                        button.innerText = "Скрыть подробности";
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
             * Рендеринг компонента
             * @returns {string}
             */
            render() {
                let mainInfo = "";
                let additionalInfo = "";
                mainInfo += this.renderInfo("День рождения", this.birthday || undefine);
                mainInfo += this.renderInfo("Город", this.data.city || undefine);
                additionalInfo += this.renderInfo("Образование", `${this.data.edu || undefine} ${this.data.eduYear || undefine}`);
                additionalInfo += this.renderInfo("Место работы", this.data.jobName || undefine); 
                
                return (`
                    <div class="user">
                        <h2 class="user__name">${this.data.firstName || undefine} ${this.data.lastName || undefine}</h2>
                        <p class="user__status">${this.data.status || undefine}</p>
                        ${mainInfo}
                        <p class="button button__user button__user_blue">Подробнее</p>
                        <div class="user__fullinfo">${additionalInfo}</div>
                    </div>
                `);
            }
			
			/**
             * Поиск кнопки и блока дополнительной информации, добавление события клика на кнопку
             */
            afterRender() {
                button = document.getElementById(this.id).querySelector(".button__user_blue");
                block = document.getElementById(this.id).querySelector(".user__fullinfo");
                button.addEventListener("click", this.moreButton);
            }

        };

    });
