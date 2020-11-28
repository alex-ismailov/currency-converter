+ 1. Сверстать простой html страниц:
    + 1. конвертер +
    - 2. список курсов -

+ 2. Перенести html шаблон страницы converter на React.

+ 3. Разбить форму на отдельные компоненты


+ 4. API курсы
    Найти в сети открытый API сервера обменника
    * [quandl](https://docs.quandl.com/)
    * [Европейский центробанк](https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml)
    * [cbr-xml-daily](https://www.cbr-xml-daily.ru/)

    -> https://exchangeratesapi.io/ <- выбрал этот, так как есть rates и base currency, возвращвет JSON.


+ 5. Вынести состояние в Redux.

+ 6. Создать класс Form и соеденить его с контейнером.

- Разобраться с Warning => /home/smile/code/currency-converter/src/components/Form.jsx
    16:1  error  Component should be written as a pure function  react/prefer-stateless-function
      ✖ 1 problem (1 error, 0 warnings)

- Расчет будет производится по вводу в левый (base currency) input.

- Закэшировать полученные данные

/* init Test State */
const dataRubBase = {
  rates: {
    CAD: 0.0171954277,
    HKD: 0.1023871182,
    ISK: 1.7875334815,
    PHP: 0.6357686672,
    DKK: 0.0826764787,
    HUF: 4.0120072479,
    CZK: 0.2907935915,
    GBP: 0.009901869,
    RON: 0.0541426005,
    SEK: 0.1126046107,
    IDR: 186.7795845679,
    INR: 0.9760221659,
    BRL: 0.0707125582,
    RUB: 1,
    HRK: 0.0839829668,
    JPY: 1.3797003298,
    THB: 0.4008341082,
    CHF: 0.0120372438,
    EUR: 0.0111095928,
    MYR: 0.053992621,
    BGN: 0.0217281416,
    TRY: 0.1053744877,
    CNY: 0.0868647951,
    NOK: 0.1171928725,
    NZD: 0.0189263023,
    ZAR: 0.2016168901,
    USD: 0.0132093058,
    MXN: 0.2650904376,
    SGD: 0.0177364649,
    AUD: 0.0179864307,
    ILS: 0.0439139984,
    KRW: 14.6160024797,
    PLN: 0.0496365497
  },
  base: 'RUB',
  date: '2020-11-25'
};

===== Абстракция Money =====
class Money {
  constructor(value, currency = 'usd') {
    this.value = value;
    this.currency = currency;
  }

  exchangeTo(newCurrency) {
    if (this.currency === newCurrency) {
      return new Money(this.value, this.currency);
    }
    // this.constructor.rates находится в функции-конструкторе
    const newValue = this.value * this.constructor.rates[this.currency][newCurrency];
    return new Money(newValue, newCurrency);
  };

  // Другие методы
}

Money.rates = {
  usd: {
    eur: 0.7,
  },
  eur: {
    usd: 1.2,
  },
};
== == == == == == == == == ==