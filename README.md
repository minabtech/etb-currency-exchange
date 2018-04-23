# etb-currency-exchange
Ethiopian Birr Currency Exchange currently using [Dashen Bank](http://dashenbanksc.com)

## USAGE



```
$ npm install etb-currency-exchange
```

```
const exchange = require('etb-currency-exchange');

exchange.getRate().then((rates) => console.log(rates))

```