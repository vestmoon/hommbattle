/**
 * Компонент Messages отвечает за отрисовку сообщений
 * Принимает на вход массив объектов
 * Зависим от Person
 */

define(function (require) {
  let Person = require('modules/Person');
  class Messages{
    constructor(options) {
      this.options = options;
    }
    render(){
      return `
            <span class="messages__title">Сообщения</span>  
              ${this.renderMessages()}
          `
    }
    renderMessages(){
      let result = '';
      for (let message = 0; message < this.options.length; message++){
        result += '<div class="message">';
        result += new Person(this.options[message]).render();
        result += '</div>';
      }
      
      return result;
    }
  }

  return Messages;
});