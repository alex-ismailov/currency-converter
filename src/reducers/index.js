/* *** state scratch: *** */
// state = {
//   currency: {
//     base: 'RUB',
//     rates: {
//       RUB: 1,
//       EUR: 0.0111095928,
//       USD: 0.0132093058,
//     },
//     new: 'USD',
//   },
//   form: {
//     baseValue: 0,
//     newValue: 0,
//     processState: 'filing',
//   },
// };
// Возможно state.state стоит распределить по state.form

// Пока идея такая: При смене state.currency.base запрашиваем новую data:
// axios.get('https://api.exchangeratesapi.io/latest?base=# new state.currency.base #');

// TODO !!!: Кэширование, использ.подсказки от Александр Усков из слак:
// - можно использовать внутренние хранилища браузера (indexedDB) и хранить дату последнего обновления.
//   обновлять при истечении срока давности, кеширование обычно делается так.
// - можно использовать localStorage, смотря сколько данны надо хранить.
//   В принципе суть одна, и localStorage чуть больше поддерживается.
// - у LocalStorage есть ограничение по размеру. Если вы в него вписываетесь, то его достаточно.

import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const {
  changeBaseCurrency,
  changeNewCurrency,
  updateBaseCurrencyValue,
  updateNewCurrencyValue,
  updateProcessState,
} = actions;

const defaultState = {
  currency: {
    base: '',
    rates: {},
    new: '',
  },
  form: {
    baseValue: 0,
    newValue: 0,
    processState: '',
  },
};

const currency = handleActions({
    [changeBaseCurrency]: (state, { payload: { baseCurrency }}) => {
      return { ...state, base: baseCurrency };
    },
    [changeNewCurrency]: (state, { payload: { newCurrency }}) => {
      return { ...state, new: newCurrency };
    },
}, defaultState.currency);

const form = handleActions({
  [updateBaseCurrencyValue]: (state, { payload: { baseValue }}) => {
    return { ...state, baseValue };
  },
  [updateNewCurrencyValue]: (state, { payload: { newValue }}) => {
    return { ...state, newValue };
  },
  [updateProcessState]: (state, { payload: { processState }}) => {
    return { ...state, processState };
  },
}, defaultState.form);

export default combineReducers({
  currency,
  form,
});
