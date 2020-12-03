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
  handleLeftInput = (e) => {
    const { target } = e;
    const { updateLeftInput, updateRightInput, baseCurrency } = this.props;
    const leftInputValue = target.value;

    if (!leftInputValue) {
      updateLeftInput({ leftInputValue });
      updateRightInput({ rightInputValue: '' });
      return;
    }

    const baseCurrencySelect = document.getElementById('left-select');
    const currentBaseCurrency = baseCurrencySelect.value;

    if (currentBaseCurrency !== baseCurrency.base) {
      // TODO: через axios.get  получить новые ставки для выбранной валюты
      console.log('You need axios bro #$%');
      return;
    }

    const newCurrencySelect = document.getElementById('right-select');
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

    const newCurrencySelect = document.getElementById('right-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const exchangedValue = exchangeNewToBase(rightInputValue, rate).toFixed(2);

    updateRightInput({ rightInputValue });
    updateLeftInput({ leftInputValue: exchangedValue});
  };

  handleSelect = (e) => {
    const { target } = e;
    const { updateLeftSelect, updateRightSelect, updateLeftInput, updateRightInput, baseCurrency, form } = this.props;
    const selectId = target.id;
    const [selectSide] = selectId.split('-');
    const selectValue = target.value;

    if (selectSide === 'left') {
      updateLeftSelect({ selectValue });
      updateLeftInput({ leftInputValue: '' });
      updateRightInput({ rightInputValue: '' });
      return;
    }

    updateRightSelect({ selectValue });
    const newCurrencySelect = document.getElementById('right-select');
    const currentNewCurrency = newCurrencySelect.value;
    const rate = baseCurrency.rates[currentNewCurrency];
    const leftInputValue = form.leftInputValue;
    if (!leftInputValue) {
      updateRightInput({rightInputValue: ''});
      return;
    }
    
    const exchangedValue = exchangeBaseToNew(leftInputValue, rate).toFixed(2);
    updateRightInput({ rightInputValue: exchangedValue }); 
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
          value={form.leftInputValue}
          currency={form.leftSelectCurrency}
          currenciesKeys={currenciesKeys}
          handleInput={this.handleLeftInput}
          inputId={'baseCurrencyInput'}
          handleSelect={this.handleSelect}
          selectId={'left-select'}
        />
        <i className="fas fa-exchange-alt" />
        <CurrencyItem
          value={form.rightInputValue}
          currency={form.rightSelectCurrency}
          currenciesKeys={currenciesKeys}
          handleInput={this.handleRightInput}
          inputId={'newCurrencyInput'}
          handleSelect={this.handleSelect}
          selectId={'right-select'}
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Form);
