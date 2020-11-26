import { createAction } from 'redux-actions';

export const changeBaseCurrency = createAction('BASE_CURRENCY_CHANGE');
export const changeNewCurrency = createAction('NEW_CURRENCY_CHANGE');

export const updateBaseCurrencyValue = createAction('BASE_CURRENCY_VALUE_UPDATE');
export const updateNewCurrencyValue = createAction('NEW_CURRENCY_VALUE_UPDATE');

export const updateProcessState = createAction('PROCESS_STATE_UPDATE');
