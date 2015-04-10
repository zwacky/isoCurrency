

(function () {
   'use strict';
/**
* IsoCurrencySymbol Service
*
* Description
* A filter for retrieving the currency symbol from a given currencty code
*/
angular.module('isoCurrency.symbol', []).filter('isoCurrencySymbol', isoCurrencySymbol);



function isoCurrencySymbol ($filter, iso4217) {
   



    return function(currencyCode) {
    	if(!currencyCode){throw new Error('A currency code must be provided'); return;}
    	
    	/**
		 * Get the currency for currencyCode from the iso4217 service
		 * @type {object}
		 */
		var currency = iso4217.getCurrencyByCode(currencyCode);

		/**
		 * If the given currencyCode doesn't translate into a valid currency a warning will be posted to the console.			
		 */
		if(typeof currency === 'undefined'){$log.warn('The provided currencyCode \"' + currencyCode + '\" did not transalte into a valid currency'); return;}


    	return currency.symbol || currencyCode;
    }
    
}


isoCurrencySymbol.$inject = ['$filter', 'iso4217'];



}());
