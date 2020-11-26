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

class Form extends React.Component {
  render() {
    console.log(this.props);
    const {
      currency,
      form,
      updateBaseCurrencyValue,
      updateNewCurrencyValue,
    } = this.props;
    const currenciesKeys = Object.keys(currency.rates);

    return (
      <form className="converter" action="">
        <CurrencyItem
          currency={currency.base}
          value={form.baseValue}
          handleInput={updateBaseCurrencyValue}
          currenciesKeys={currenciesKeys}
        />
        <i className="fas fa-exchange-alt" />
        <CurrencyItem
          currency={currency.new}
          value={form.newValue}
          handleInput={updateNewCurrencyValue}
          currenciesKeys={currenciesKeys}
        />
      </form>
    );
  }
}

export default connect(mapStateToProps, actionCreators)(Form);
