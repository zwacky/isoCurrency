/* global angular */
'use strict';

/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */
angular.module('isoCurrency', ['isoCurrency.common'])
    .filter('isoCurrency', ['$filter', '$locale', 'iso4217', function ($filter, $locale, iso4217) {
        var numberFilter, formats, pattern;

        formats = $locale.NUMBER_FORMATS;
        pattern = formats.PATTERNS[1];
        numberFilter = $filter('number');
        formats.DEFAULT_PRECISION = angular.isUndefined(formats.DEFAULT_PRECISION) ? 2 : formats.DEFAULT_PRECISION;

        function formatCurrency(amount, currencySymbol, fractionSize, suffix) {
            var isNegative, formattedNumber,
                parts = [];

            isNegative = amount < 0;
            formattedNumber = numberFilter(Math.abs(amount), fractionSize);

            parts.push(isNegative ? pattern.negPre : pattern.posPre);
            parts.push(!suffix ? currencySymbol : formattedNumber);
            parts.push(suffix ? currencySymbol : formattedNumber);
            parts.push(isNegative ? pattern.negSuf : pattern.posSuf);

            return parts.join('').replace(/\u00A4/g, '');
        }

        /**
         * transforms an amount into the right format and currency according to a passed currency code (3 chars).
         *
         * @param float amount
         * @param string currencyCode e.g. EUR, USD
         * @param number fraction User specified fraction size that overwrites default value
         * @return string
         */
        return function (amount, currencyCode, fraction) {
            var currency, fractionSize;

            currency = iso4217.getCurrencyByCode(currencyCode);

            if (!currency) {
                return amount;
            }

            fractionSize = (fraction === void 0) ? currency.fraction : fraction;
            fractionSize = angular.isUndefined(fractionSize) ? formats.DEFAULT_PRECISION : fractionSize;

            return formatCurrency(Number(amount), currency.symbol || (currencyCode + ' '), fractionSize, currency.suffix);
        };
    }]);
