  /**
   * Компонент Wall отвечает за отрисовку стены
   * Принимает массив объектов 
   * Зависим от Person  
   */

define(function (require) {
  let Person = require('modules/Person');

  class Wall{
    constructor(options) {
      this.options = options;
    }
    render(){
      let result = '';
      for(let post = 0; post < this.options.length; post++){
        result += `<div class="post"> ${this.renderHeader(this.options[post])} ${this.renderBody(this.options[post])} </div>`
      }
      return result;
    }
    renderHeader(post){
      return `<div class="post-header"> ${new Person(post).render()}</div> `;
    }
    renderBody(post){
      return `
              <div class="post-body">
                <p class="post-body__text">${post.text}</p>
                <div class="post-body__image">
                  <img class="image" src="${post.postImg}" alt="Аватар пользователя">
                </div>
              </div>`
    }
  }

  return Wall;
});