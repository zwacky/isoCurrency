/* global describe, beforeEach, inject, it, expect */
describe('the filtering of isoCurrency', function () {

    var $filter;

    beforeEach(function () {
        module('isoCurrency');

        inject(function (_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should return well known currencies', function () {
        var amount = 15.23;
        var testCases = [
            { code: 'EUR', shouldBe: '€15.23' },
            { code: 'USD', shouldBe: '$15.23' },
            { code: 'JPY', shouldBe: '¥15' }
        ];

        testCases.forEach(function (item) {
            expect($filter('isoCurrency')(amount, item.code))
                .toBe(item.shouldBe);
        });
    });

    it('should return the currency code if no symbol is available', function () {
        var amount = 15;
        var testCases = [
            'AMD', 'XAF', 'CLF', 'COU'
        ];

        testCases.forEach(function (currency) {
            expect($filter('isoCurrency')(amount, currency).indexOf(currency))
                .toBe(0);
        });

    });

    it('should return no currency if the currency code is invalid', function () {
        var amount = 15.23;
        var testCases = [
            'A', 'B', '===', '320932', '$', '€', '', undefined, null
        ];

        testCases.forEach(function (item) {
            expect($filter('isoCurrency')(amount, item))
                .toBe(amount);
        });
    });

    it('should parse the number out of string, if string is passed as amount', function () {
        var positiveCases = ['10', '20', '10.5', '0.5'],
            currency = 'USD';

        positiveCases.forEach(function (item) {
            expect($filter('isoCurrency')(item, currency))
                .toBe('$' + Number(item).toFixed(2));
        });
    });

    // Make sure to comply with http://ux.stackexchange.com/questions/1869/preferred-format-to-display-negative-currency-us-english
    it('should place - in front of the currency sygn when formatting negative numbers', function () {
        var negativeCases = [-10, -20, -10.5, -0.5],
            currency = 'USD';

        negativeCases.forEach(function (item) {
            expect($filter('isoCurrency')(item, currency))
                .toBe('-$' + Math.abs(item).toFixed(2));
        });
    });

    function startsWith(str, substr) {
        return str.indexOf(substr) === 0;
    }

    function endsWith(str, substr) {
        return str.lastIndexOf(substr) === str.length - substr.length;
    }

    it('should place the sign behind the number if the currency is with suffix symbol', function () {
        var amount = 15.23;
        var prefixCases = [
            { currency: 'USD', symbol: '$' },
            { currency: 'EUR', symbol: '€' },
            { currency: 'JPY', symbol: '¥' },
        ];

        var suffixCases = [
            { currency: 'BGN', symbol: 'лв' },
            { currency: 'RUB', symbol: 'руб' }
        ];

        prefixCases.forEach(function (item) {
            expect(startsWith($filter('isoCurrency')(amount, item.currency), item.symbol)).toBeTruthy();
        });

        suffixCases.forEach(function (item) {
            expect(endsWith($filter('isoCurrency')(amount, item.currency), item.symbol)).toBeTruthy();
        });
    });
});
