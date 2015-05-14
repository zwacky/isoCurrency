'use strict';

/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */
angular.module('isoCurrency', ['isoCurrency.common'])
	.filter('isoCurrency', ['$filter', 'iso4217', function($filter, iso4217) {

		/**
		 * transforms an amount into the right format and currency according to a passed currency code (3 chars).
		 *
		 * @param float amount, if undefined return only currency symbol or name
		 * @param string currencyCode e.g. EUR, USD
		 * @param number fraction User specified fraction size that overwrites default value
		 * @param string type of result you want, "text" to return currency name anything else to return the symbol
		 * @return string
		 */
		return function(amount, currencyCode, fraction, type) {
			if (!currencyCode) {
				return;
			}
			var currency = iso4217.getCurrencyByCode(currencyCode);
			var fractionSize = (fraction === void 0) ? currency.fraction : fraction;
			var out = (type === 'text') ? currency.text : currency.symbol;

			if (currency.symbol) {
				if (amount !== undefined) {
					return $filter('currency')(amount, out, fractionSize);
				} else {
					return out;
				}
			} else {
				return $filter('currency')(amount, currencyCode, fractionSize);
			}
		};

	}]);
