import { createAction } from 'redux-actions';

export const updateBaseCurrency = createAction('BASE_CURRENCY_UPDATE');
export const updateLeftInput = createAction('LEFT_INPUT_VALUE_UPDATE');
export const updateRightInput = createAction('RIGHT_INPUT_VALUE_UPDATE');
export const updateLeftSelect = createAction('LEFT_SELECT_CURRENCY_UPDATE');
export const updateRightSelect = createAction('RIGHT_SELECT_CURRENCY_UPDATE');
// export const updateProcessState = createAction('PROCESS_STATE_UPDATE');
