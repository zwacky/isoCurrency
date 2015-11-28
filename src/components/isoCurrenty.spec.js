describe('the filtering of isoCurrency', function() {

    var $filter;

    beforeEach(function() {
        module('isoCurrency');

        inject(function(_$filter_) {
            $filter = _$filter_;
        });
    });

    it('should return well known currencies', function() {
        var amount  = 15.23;
        var testCases = [
            {code: 'EUR', shouldBe: '€15.23'},
            {code: 'USD', shouldBe: '$15.23'},
            {code: 'JPY', shouldBe: '¥15'}
        ];

        testCases.forEach(function(item) {
            expect($filter('isoCurrency')(amount, item.code))
                .toBe(item.shouldBe);
        });
    });

    it('should return the currency code if no symbol is available', function() {
        var amount = 15;
        var testCases = [
            'AMD', 'XAF', 'CLF', 'COU'
        ];

        testCases.forEach(function(currency) {
            expect($filter('isoCurrency')(amount, currency).indexOf(currency))
                .toBe(0);
        });

    });

    it('should return no currency if the currency code is invalid', function() {
        var amount = 15.23;
        var testCases = [
            'A', 'B', '===', '320932', '$', '€', '', undefined, null
        ];

        testCases.forEach(function(item) {
            expect($filter('isoCurrency')(amount, item))
                .toBe(amount);
        });
    });
});
