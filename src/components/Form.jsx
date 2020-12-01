import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import CurrencyItem from './CurrencyItem.jsx';

const mapStateToProps = (state) => state;

const actionCreators = {
  updateBaseCurrency: actions.updateBaseCurrency,
  updateLeftInput: actions.updateLeftInput,
  updateRightInput: actions.updateRightInput,
  // updateProcessState: actions.updateProcessState,
};

const exchangeBaseToNew = (baseValue, rate) => baseValue * rate;
const exchangeNewToBase = (baseValue, rate) => baseValue / rate;

class Form extends React.Component {
  handleLeftInput = (e) => {
    const { target } = e;
    const { updateLeftInput, updateRightInput, baseCurrency } = this.props;
    const leftInputValue = target.value;

    if (!leftInputValue) {
      updateLeftInput({ leftInputValue });
      updateRightInput({ rightInputValue: '' });
      return;
    }

    const baseCurrencySelect = document.getElementById('base-currency-select');
    const currentBaseCurrency = baseCurrencySelect.value;

    if (currentBaseCurrency !== baseCurrency.base) {
      // TODO: через axios.get  получить новые ставки для выбранной валюты
    }

    const newCurrencySelect = document.getElementById('new-currency-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const exchangedValue = exchangeBaseToNew(leftInputValue, rate).toFixed(2);

    updateLeftInput({ leftInputValue });
    updateRightInput({ rightInputValue: exchangedValue});
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

    const newCurrencySelect = document.getElementById('new-currency-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const exchangedValue = exchangeNewToBase(rightInputValue, rate).toFixed(2);

    updateRightInput({ rightInputValue });
    updateLeftInput({ leftInputValue: exchangedValue});
  };

  componentDidMount() {
    const rightInput = document.getElementById('baseCurrencyInput');
    rightInput.focus();
  }

  render() {
    const {
      baseCurrency,
      form,
    } = this.props;

    const currenciesKeys = Object.keys(baseCurrency.rates);

    return (
      <form className="converter" action="">
        <CurrencyItem
          currency={currency.base}
          value={form.baseValue}
          handleInput={this.handleInputBaseCurrency}
          // onChange={this.handleInputBaseCurrency}
          currenciesKeys={currenciesKeys}
        />
        <i className="fas fa-exchange-alt" />
        <CurrencyItem
          currency={currency.new}
          value={form.newValue}
          handleInput={this.handleInputNewCurrency}
          // onChange={this.handleInputNewCurrency}
          currenciesKeys={currenciesKeys}
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Form);
