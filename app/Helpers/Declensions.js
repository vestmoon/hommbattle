define('app/Helpers/Declensions.js', function () {

    return {

        /**
         * Получение склонение для слова
         * @param {number} value - Число
         * @param {string[]} declensions - Приставки со склонением
         * @returns {string} - Число с приставкой
         */
        getSupplementPrefix: function (value, declensions) {
            let prefix,
                digit = Math.abs(value) % 100;

            if (digit >= 5 && digit <= 20) {
                prefix = declensions[2];
            } else {
                digit = digit % 10;
                if (digit === 1) {
                    prefix = declensions[0];
                } else if (digit >= 2 && digit <= 4) {
                    prefix = declensions[1];
                } else {
                    prefix = declensions[2];
                }
            }

            return `${value} ${prefix}`;
        }

    };

});
