'use strict';

/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */
angular.module('isoCurrency', ['isoCurrency.common', 'isoCurrency.symbol'])
	.filter('isoCurrency', ['$filter', 'iso4217', '$log', function($filter, iso4217, $log) {

		/**
		 * transforms an amount into the right format and currency according to a passed currency code (3 chars).
		 *
		 * @param float amount
		 * @param string currencyCode e.g. EUR, USD
		 * @param number fraction User specified fraction size that overwrites default value
		 * @return string
		 */
		return function(amount, currencyCode, fraction) {
			if (!currencyCode) {
				return;
			}
			/**
			 * Get the currency for currencyCode from the iso4217 service
			 * @type {object}
			 */
			var currency = iso4217.getCurrencyByCode(currencyCode);

			/**
			 * If the given currencyCode doesn't translate into a valid currency a warning will be posted to the console.			
			 */
			if(typeof currency === 'undefined'){$log.warn('The provided currencyCode \"' + currencyCode + '\" did not transalte into a valid currency'); return;}

			var fractionSize = (fraction === void 0) ? currency.fraction : fraction;
			return $filter('currency')(amount, currency.symbol, fractionSize);
		};

	}]);
