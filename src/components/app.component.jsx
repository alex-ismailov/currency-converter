import React from 'react';

export default () => (
  <div class="container">
    <main class="wrapper">
      <form class="converter" action="">
        <div class="convrter__currency">
          <input class="converter__currency__input" type="number" />
          <select class="converter__currency__select" name="" id="">
            <option value="">USD</option>
            <option value="" selected>RUB</option>
            <option value="">EUR</option>
          </select>
        </div>
        <i class="fas fa-exchange-alt"></i>
        <div class="converter__currency">
          <input class="converter__currency__input" type="number" />
          <select class="converter__currency__select" name="" id="">
            <option value="">USD</option>
            <option value="">RUB</option>
            <option value="">EUR</option>
          </select>
        </div>
      </form>
    </main>
  </div>
);
