# isoCurrency [![Build Status](https://travis-ci.org/zwacky/isoCurrency.svg?branch=master)](https://travis-ci.org/zwacky/isoCurrency)

AngularJS filter that retrieves currency symbols according to ISO 4217 currency codes.

## Installation

- `npm install iso-currency`
- or `bower install iso-currency`
- add `'isoCurrency'` to your angular.module dependency, usually in app.js

## Demo

http://jsfiddle.net/nqf0ye00/55/

## Usage

Instead of directly using the currency symbol, you only need the 3 char long currency code (e.g. USD or JPY).
It will take the right symbol, format and fraction size. The latter can be overridden by providing
an explicity fraction size value after the currency field (see below).

```javascript
// in controller
$scope.amount = 50.50;
$scope.currency = 'USD';

// in template
{{ amount | isoCurrency:currency }} // $50.50
{{ amount | isoCurrency:currency:0 }} // $50
```

## Currency reference

Mainly taken from the list of https://en.wikipedia.org/wiki/ISO_4217. If something is missing, feel free to create a PR.
