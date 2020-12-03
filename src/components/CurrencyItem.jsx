import React from 'react';

export default (props) => {
  const {
    value,
    currency,
    currenciesKeys,
    handleInput,
    inputId,
    handleSelect,
    selectId,

  } = props;

  return (
    <div className="converter__currency">
      <input
        id={inputId}
        onChange={handleInput}
        className="converter__currency__input"
        type="number"
        value={value}
        data-select-id={selectId}
      />
      <select
        id={selectId}
        onChange={handleSelect}
        value={currency}
        className="converter__currency__select"
      >
        {currenciesKeys.map((key) => <option key={key} value={key}>{key}</option>)}
      </select>
    </div>
  );
};
