define(
    'app/Components/ProfileInfo.js', [
        'app/Components/Component.js',
        'css!assets/css/ProfileInfo.css'
    ], function (Component) {

        return class ProfileInfo extends Component {

            /**
             * Инициализация компонента
             */
            constructor() {

                // Функция, вызывающая родительский конструктор
                super();

            }

            /**
             * Рендеринг компонента
             * @returns {string}
             */
            render() {

                // Возвращение рендера
                return `
                    <div class="block block--user">
                        <div class="block__title block__title--heading"
                             title="Эммелин Лоуренс">
                            Эммелин Лоуренс
                        </div>
                        <div class="block__subtitle"
                             title="Похоже, в наши дни многие крупные газеты стараются ответить на один вопрос: что самое плохое сегодня случилось на Земле?">
                            Похоже, в наши дни многие крупные газеты стараются ответить на один вопрос: что самое плохое сегодня случилось на Земле?
                        </div>
                        <div class="details">
                            <div class="details__item details__item--column">
                                <div class="details__title" title="День рождение">День рождение</div>
                                <div class="details__value" title="13 мая, 21 год">
                                    13 мая, 21 год
                                </div>
                            </div>
                            <div class="details__item details__item--column">
                                <div class="details__title" title="Город">Город</div>
                                <div class="details__value" title="Колумбус">Колумбус</div>
                            </div>
                            <div class="details__item details__item--column">
                                <div class="details__title" title="Семейное положение">Семейное положение</div>
                                <div class="details__value" title="Встречаюсь">Встречаюсь</div>
                            </div>
                            <div class="details__item details__item--column">
                                <div class="details__title" title="Образование">Образование</div>
                                <div class="details__value" title="Университет Финикс">Университет Финикс</div>
                            </div>
                            <div class="details__item details__item--column">
                                <div class="details__title" title="Место работы">Место работы</div>
                                <div class="details__value" title="Тесла">Тесла</div>
                            </div>
                        </div>
                    </div>
                `;
            }

        };

    });
