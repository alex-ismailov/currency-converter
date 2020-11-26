import React from 'react';

export default (props) => {
  const {
    currency, value, handleInput, currenciesKeys,
  } = props;

  return (
    <div className="converter__currency">
      <input onChange={handleInput} className="converter__currency__input" type="number" value={value} />
      <select value={currency.toLowerCase()} className="converter__currency__select" name="" id="">
        {currenciesKeys.map((key) => <option key={key} value={key.toLowerCase()}>{key}</option>)}
      </select>
    </div>
  );
};
