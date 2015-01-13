'use strict';

/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */
angular.module('isoCurrency', ['isoCurrency.common'])
	.filter('isoCurrency', ['$filter', 'iso4217', function($filter, iso4217) {

		/**
		 * transforms an amount into the right format and currency according to a passed currency code (3 chars).
		 * 
		 * @param float amount
		 * @param string currencyCode e.g. EUR, USD
		 * @return string
		 */
		return function(amount, currencyCode) {
            		if (!currencyCode) return;
            
			var currency = iso4217.getCurrencyByCode(currencyCode);
			return $filter('currency')(amount, currency.symbol, currency.fraction);
		};

	}]);
