/**
 * Компонент Person
 * Рисует маленький аватар, имя, дату и текст 
 * Получает на вход массив объектов формата: 
 * {
 *  img : 'Путь до изображения',
 *  name : 'Имя Фамилия',
 *  date : 'дата' (Пока не форматируется),
 *  text : 'Текст сообщения'
 *  type : 'message / post' 
 * }
 */

define(function () {
  class Person {
    constructor(options) {
      this.person = options;
    }
    render() {
      return `<div class="person">
                ${this.setImage()}
                ${this.setName()}
                ${this.setDate()}
                ${this.setText()}
              </div>`
    }
    setImage() {
      let img = '../../assets/img/default.jpg';
      if (this.person.img) {
        img = this.person.img;
      } 
      return `<div class="person__image">
                <div class="avatar avatar_circle avatar_post">
                  <img class="image" src="${img}" alt="Аватар пользователя">
                </div>
              </div>`;
    }
    setName() {
      let name = 'Name Surname';
      if (this.person.name) {
        name = this.person.name; 
      }
      return `<span class="person__name">${name}</span>`;
    }
    setText() {
      let result = '';
      if (this.person.type === 'post'){
        result = '';
      } else if (this.person.text) {
        result = `<span class="person__text person__text_message">${this.person.text}</span>`
      }
      return result;
    }
    setDate() {
      let result = '';
      if (this.person.date) {
        if (this.person.type === 'message') {
          result = `<span class="person__date person__date_message person__date_gray">${this.person.date}</span>`;
        } else {
          result = `<span class="person__date person__date_gray">${this.person.date}</span>`;
        }
      }
      return result;
    }
  }
  return Person;
});
