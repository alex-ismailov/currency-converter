import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import './assets/scss/main.scss';

const initStateTest = {
  baseCurrency: {
    rates: {
      CAD: 0.0170236297,
      HKD: 0.1018850411,
      ISK: 1.7451524457,
      PHP: 0.6329551402,
      DKK: 0.081642326,
      HUF: 3.9452996854,
      CZK: 0.2873697527,
      GBP: 0.0098574891,
      RON: 0.0534670998,
      SEK: 0.1116673743,
      IDR: 186.1500330796,
      INR: 0.9735396445,
      BRL: 0.0696908954,
      RUB: 1,
      HRK: 0.0828777351,
      JPY: 1.3691536131,
      THB: 0.3977995236,
      CHF: 0.0118921837,
      EUR: 0.0109716613,
      MYR: 0.0535493873,
      BGN: 0.0214583752,
      TRY: 0.1022065108,
      CNY: 0.0864544967,
      NOK: 0.1158717149,
      NZD: 0.0186814477,
      ZAR: 0.2021539565,
      USD: 0.0131440502,
      MXN: 0.263867357,
      SGD: 0.0175864759,
      AUD: 0.0178245609,
      ILS: 0.043496054,
      KRW: 14.5493006115,
      PLN: 0.0490542977
    },
    base: 'RUB',
    date: '2020-11-30'
  },
  form: {
    leftInputValue: '',
    leftSelectCurrency: 'RUB',
    rightInputValue: '',
    rightSelectCurrency: 'USD',
  },
};

/* eslint-disable no-underscore-dangle */
const store = createStore(
  reducers,
  initStateTest, // <= Это потом убрать !!!!
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);
/* eslint-enable */

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
