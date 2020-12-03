import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions';
import * as actions from '../actions/index.js';

const {
  updateBaseCurrency,
  updateLeftInput,
  updateRightInput,
  updateLeftSelect,
  updateRightSelect,
  updateProcessState,
} = actions;

const defaultState = {
  form: {},
  baseCurrency: {},
  processState: '',
};

const baseCurrency = handleActions({
    [updateBaseCurrency]: (state, { payload: { baseCurrency }}) => {
      return { ...state, ...baseCurrency };
    },
}, defaultState.baseCurrency);

const form = handleActions({
  [updateLeftInput]: (state, { payload: { leftInputValue }}) => {
    return { ...state, leftInputValue };
  },
  [updateRightInput]: (state, { payload: { rightInputValue }}) => {
    return { ...state, rightInputValue };
  },
  [updateLeftSelect]: (state, { payload: { leftSelectCurrency }}) => {
    return { ...state, leftSelectCurrency };
  },
  [updateRightSelect]: (state, { payload: { rightSelectCurrency }}) => {
    return { ...state, rightSelectCurrency };
  },
}, defaultState.form);

const processState = handleActions({
  [updateProcessState]: (state, { payload: { processState }}) => {
    return processState;
  },
}, defaultState.processState);

export default combineReducers({
  baseCurrency,
  form,
});
