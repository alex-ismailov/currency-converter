import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore} from 'redux';
import reducers from './reducers/index.js';
import App from './components/App.jsx';
import './assets/scss/main.scss';

const initStateTest = {
  currency: {
    base: 'RUB',
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
    new: 'USD',
  },
  form: {
    baseValue: '',
    newValue: '',
    processState: 'filling',
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
