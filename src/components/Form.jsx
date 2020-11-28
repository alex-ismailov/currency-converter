import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index.js';
import CurrencyItem from './CurrencyItem.jsx';

const mapStateToProps = (state) => state;

const actionCreators = {
  changeBaseCurrency: actions.changeBaseCurrency,
  changeNewCurrency: actions.changeNewCurrency,
  updateBaseCurrencyValue: actions.updateBaseCurrencyValue,
  updateNewCurrencyValue: actions.updateNewCurrencyValue,
  updateProcessState: actions.updateProcessState,
};

const exchange = (baseValue, rate) => baseValue * rate;

class Form extends React.Component {
  handleInputBaseCurrency = (e) => {
    const { target: { value } } = e;
    const { updateBaseCurrencyValue } = this.props;
    updateBaseCurrencyValue({ baseValue: value });
  };

  handleInputNewCurrency = (e) => {
    const { target: { value } } = e;
    const { updateNewCurrencyValue } = this.props;
    updateNewCurrencyValue({ newValue: value });
  };

  render() {
    const {
      currency,
      form,
      // updateBaseCurrencyValue,
      // updateNewCurrencyValue,
    } = this.props;
    const currenciesKeys = Object.keys(currency.rates);

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
