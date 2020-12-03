import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import * as actions from '../actions/index.js';
import CurrencyItem from './CurrencyItem.jsx';

const BASE_URL = 'https://api.exchangeratesapi.io/latest?base=';

const mapStateToProps = (state) => state;

const actionCreators = {
  updateBaseCurrency: actions.updateBaseCurrency,
  updateLeftInput: actions.updateLeftInput,
  updateRightInput: actions.updateRightInput,
  updateLeftSelect: actions.updateLeftSelect,
  updateRightSelect: actions.updateRightSelect,
  updateProcessState: actions.updateProcessState,
};

const exchangeBaseToNew = (baseValue, rate) => baseValue * rate;
const exchangeNewToBase = (baseValue, rate) => baseValue / rate;

const refreshBaseCurrency = async (base, updateBaseCurrencyAction, updateProcessStateAction) => {
  const path = `${BASE_URL}${base.toUpperCase()}`;
  const updatedBaseCurrency = await axios.get(path);
  updateBaseCurrencyAction({ baseCurrency: updatedBaseCurrency.data });
  updateProcessStateAction({ processState: 'filling' });
};

class Form extends React.Component {
  componentDidMount() {
    const rightInput = document.getElementById('baseCurrencyInput');
    rightInput.focus();
  }
  
  handleLeftInput = (e) => {
    const { target } = e;
    const { updateLeftInput, updateRightInput, baseCurrency } = this.props;
    const leftInputValue = target.value;

    if (!leftInputValue) {
      updateLeftInput({ leftInputValue });
      updateRightInput({ rightInputValue: '' });
      return;
    }

    const newCurrencySelect = document.getElementById('right-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const exchangedValue = exchangeBaseToNew(leftInputValue, rate).toFixed(2);

    updateLeftInput({ leftInputValue });
    updateRightInput({ rightInputValue: exchangedValue });
  };

  handleRightInput = (e) => {
    const { target } = e;
    const { updateLeftInput, updateRightInput, baseCurrency } = this.props;
    const rightInputValue = target.value;

    if (!rightInputValue) {
      updateLeftInput({ leftInputValue: '' });
      updateRightInput({ rightInputValue });
      return;
    }

    const newCurrencySelect = document.getElementById('right-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const exchangedValue = exchangeNewToBase(rightInputValue, rate).toFixed(2);

    updateRightInput({ rightInputValue });
    updateLeftInput({ leftInputValue: exchangedValue });
  };

  handleSelect = (e) => {
    const { target } = e;
    const {
      updateLeftSelect,
      updateRightSelect,
      updateLeftInput,
      updateRightInput,
      updateBaseCurrency,
      updateProcessState,
      baseCurrency,
      form,
    } = this.props;

    const selectId = target.id;
    const [selectSide] = selectId.split('-');
    const selectValue = target.value;

    if (selectSide === 'left') {
      refreshBaseCurrency(selectValue, updateBaseCurrency, updateProcessState);

      updateLeftSelect({ leftSelectCurrency: selectValue });
      updateLeftInput({ leftInputValue: '' });
      updateRightInput({ rightInputValue: '' });
      updateProcessState({ processState: 'processing' });

      return;
    }

    updateRightSelect({ rightSelectCurrency: selectValue });
    const newCurrencySelect = document.getElementById('right-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const { leftInputValue } = form;
    if (!leftInputValue) {
      updateRightInput({ rightInputValue: '' });
      return;
    }

    const exchangedValue = exchangeBaseToNew(leftInputValue, rate).toFixed(2);
    updateRightInput({ rightInputValue: exchangedValue });
  };

  render() {
    const {
      baseCurrency,
      form,
    } = this.props;

    /* ********************************************************************* */
    /* костыль для EUR, так как его rates не имеет ключа EUR из-за этого он
    не отрисовывается в left select. */
    // const currenciesKeys = Object.keys(baseCurrency.rates);
    const rawCurrenciesKeys = Object.keys(baseCurrency.rates);
    const currenciesKeys = rawCurrenciesKeys.includes(form.leftSelectCurrency)
      ? [...rawCurrenciesKeys]
      : [...rawCurrenciesKeys, form.leftSelectCurrency];
    /* ********************************************************************* */

    return (
      <form className="converter" action="">
        <CurrencyItem
          value={form.leftInputValue}
          currency={form.leftSelectCurrency}
          currenciesKeys={currenciesKeys}
          handleInput={this.handleLeftInput}
          inputId="baseCurrencyInput"
          handleSelect={this.handleSelect}
          selectId="left-select"
        />
        <i className="fas fa-exchange-alt" />
        <CurrencyItem
          value={form.rightInputValue}
          currency={form.rightSelectCurrency}
          currenciesKeys={currenciesKeys}
          handleInput={this.handleRightInput}
          inputId="newCurrencyInput"
          handleSelect={this.handleSelect}
          selectId="right-select"
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Form);
