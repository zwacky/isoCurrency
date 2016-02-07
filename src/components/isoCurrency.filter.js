/**
 * wraps angular's currency filter with an additional layer, in case the currency symbol is not available.
 */
angular.module('isoCurrency', ['isoCurrency.common'])
	.filter('isoCurrency', ($filter, iso4217) => {

		/**
		 * transforms an amount into the right format and currency according to a passed currency code (3 chars).
		 *
		 * @param float amount
		 * @param string currencyCode e.g. EUR, USD
		 * @param number fraction User specified fraction size that overwrites default value
		 * @return string
		 */
		return (amount, currencyCode, fraction) => {
			const currency = iso4217.getCurrencyByCode(currencyCode);

			if (!currency) {
				return amount;
			}

			const fractionSize = (fraction === void 0) ? currency.fraction : fraction;
			return $filter('currency')(amount, currency.symbol || (currencyCode + ' '), fractionSize);
		};

	});
