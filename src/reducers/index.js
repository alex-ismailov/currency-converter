import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const {
  updateBaseCurrency,
  updateLeftInput,
  updateRightInput,
} = actions;

const defaultState = {
  form: {},
  baseCurrency: {},
  // state: {
  //   ???
  // },
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
