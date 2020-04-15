define(
    'app/Components/ProfileInfo.js', [
        'app/Components/Component.js',
        'css!app/Components/ProfileInfo.css'
    ], function (Component) {
        
		const MILLISECONDS = (60 * 60 * 24 * 1000 * 365);
        
        return class ProfileInfo extends Component {
            /**
             * Инициализация компонента
             */
            constructor(data) {
                super();
                this.data = data;
            }
            
            // Приводим дату рождения к виду "дата месяц, кол-во лет"
            get birthday(){
                let months = [ "января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря" ];
                let currentTime = new Date();
                if(this.data.bDay != null) {
                    let numbers = this.data.bDay.split('.');
                    let bornTime = new Date(numbers[2], numbers[1], numbers[0])
                    return `${numbers[0]} ${months[bornTime.getMonth()-1]}, ${Math.floor((currentTime-bornTime) / MILLISECONDS)} лет`;
                } else {
                    return this.data.bDay;
                }
            }
            
            // Добавление/Удаление события на кнопку Показать/Скрыть подробности
            addEvents() {
                let button = document.querySelector(".button__user_blue");
                button.addEventListener("click", () => this.moreButton());
            }

            removeEvents() {
                let button = document.querySelector(".button__user_blue");
                button.removeEventListener("click", this.moreButton);
            }

            moreButton() {
                let button = document.querySelector(".button__user_blue");
                let block = document.querySelector(".user__fullinfo");
                switch(block.style.display) {
                    case 'block':
                        block.style.display = "none";
                        button.innerText = "Подробнее";
                        break;
                    case 'none':
                        block.style.display = "block";
                        button.innerText = "Скрыть подробности";
                        break;
                    default:
                        block.style.display = "block";
                        button.innerText = "Скрыть подробности";
                }
            }

            // Метод для отрисовки основной и дополнительной информации 
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
                mainInfo += this.renderInfo("День рождения", this.birthday);
                mainInfo += this.renderInfo("Город", this.data.city);
                additionalInfo += this.renderInfo("Образование", `${this.data.edu} ${this.data.eduYear}`);
                additionalInfo += this.renderInfo("Место работы", this.data.jobName); 
                
                return (`
                    <div class="user">
                        <h2 class="user__name">${this.data.firstName} ${this.data.lastName}</h2>
                        <p class="user__status">${this.data.status}</p>
                        ${mainInfo}
                        <p class="button button__user button__user_blue">Подробнее</p>
                        <div class="user__fullinfo">${additionalInfo}</div>
                    </div>
                `);
            }
            
            afterRender() {
                this.addEvents();
            }

        };

    });
