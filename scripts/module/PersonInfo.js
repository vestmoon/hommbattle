/*
*   Модуль PersonInfo
*   При загрузке модуля подключаются собственные стили (нужно указать путь к папке со стилями)
*   Класс PersonInfo получает объект след. вида
*       const data = {
*           id: 1,
*           firstName: 'Артур',
*           lastName: 'Харисов',
*           bDay: '19.01.1998',
*           city: 'Уфа',
*           status: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perspiciatis impedit, veniam tenetur aspernatur soluta?",
*           edu: 'БГУ',
*           eduYear: 2016,
*           jobName: "None"
*       };
*   После рендера, необходимо вызвать метод addEvents для добавления события клика на кнопку Показать/Скрыть подробности
*/


define(function () {
    const STYLEPATH = "css";
    const MILLISECONDS = (60 * 60 * 24 * 1000 * 365);
    
    // Подключение стилей
    let link = document.createElement("link");
    link.type = "text/css";
    link.rel = "stylesheet";
    link.href = `${STYLEPATH}/PersonInfo.css`;
    document.head.appendChild(link); 
    
    class PersonInfo {
        constructor(data) {
            this.data = data;
        }
        // Получаем полное имя
        get fullname() {
            return `${this.data.firstName} ${this.data.lastName}`
        }
        // Приводим дату рождения к виду "дата месяц, кол-во лет"
        get birthday(){
            let months = [ "Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря" ];
            let currentTime = new Date();
            if(this.data.bDay != null) {
                let numbers = this.data.bDay.split('.');
                let bornTime = new Date(numbers[2], numbers[1], numbers[0])
                return `${numbers[0]} ${months[bornTime.getMonth()-1]}, ${Math.floor((currentTime-bornTime) / MILLISECONDS)} лет`;
            } else {
                return this.data.bDay;
            }
        }
        
        // Методы для отрисовки основной и дополнительной информации 
        mainInfo() {
            let block = "";
            block += this.renderInfo("День рождения", this.birthday);
            block += this.renderInfo("Город", this.data.city);
            return block;
        }

        additionalInfo() {
            let block = "";
            block += this.renderInfo("Образование", `${this.data.edu} ${this.data.eduYear}`);
            block += this.renderInfo("Место работы", this.data.jobName);
            return block;
        }

        renderInfo(title, text) {
            return `
                <div class="user__info">
                    <span class="user__info user__info_left">${title}</span>
                    <span class="user__info user__info_right">${text}</span>
                </div>
            `; 
        }
        
        // Добавление/Удаление события на кнопку Показать/Скрыть подробности
        addEvents() {
            let button = document.querySelector(".button__user_blue");
            button.addEventListener("click", this.moreButton);
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

        // Рендер
        render() {   
            return (`
                <div class="user">
                    <h2 class="user__name">${this.fullname}</h2>
                    <p class="user__status">${this.data.status}</p>
                    ${this.mainInfo()}
                    <p class="button button__user button__user_blue">Подробнее</p>
                    <div class="user__fullinfo">${this.additionalInfo()}</div>
                </div>
            `);
        }

        toString() {
            return this.render();
        }
    }
    
    return PersonInfo;
});

