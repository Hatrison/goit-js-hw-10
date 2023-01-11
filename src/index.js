const debounce = require('lodash.debounce');
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import './css/styles.css';
import fetchCountries from './fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const BASE_URL = 'https://restcountries.com/v3.1/name/';
const search = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryBlock = document.querySelector('.country-info');

search.addEventListener('input', debounce(onInput, 300));

function onInput() {
  const value = search.value.trim();

  if (!value) return;

  const searchURL = BASE_URL + `${value}`;

  fetchCountries(searchURL)
    .then(data => {
      if (data.length > 10)
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      else if (data.length >= 2 && data.length <= 10) renderList(data);
      else renderBlock(data);
    })
    .catch(error => {
      Notify.failure('Oops, there is no country with that name');
    });
}

function renderList(data) {
  const markup = data.reduce(
    (acc, { name: { official }, flags: { svg } }) =>
      acc +
      `<li class="country-list__item">
            <img
              src="${svg}"
              alt="Flag of ${official}"
              class="country-list__flag"
            />
            <p class="country-list__name">${official}</p>
          </li>`,
    ''
  );

  countryList.innerHTML = markup;
  countryBlock.innerHTML = '';
}

function renderBlock(data) {
  const markup = data.reduce(
    (
      acc,
      { name: { official }, flags: { svg }, capital, population, languages }
    ) =>
      acc +
      `<div class="title-thumb">
        <img
          src="${svg}"
          alt="Flag of ${official}"
          class="country-info__flag"
        />
        <h2 class="country-info__name">${official}</h2>
      </div>
      <p class="country-info__text">
        Capital:&nbsp;<span class="country-info__text-value">${
          capital[0]
        }</span>
      </p>
      <p class="country-info__text">
        Population:&nbsp;<span class="country-info__text-value">${population}</span>
      </p>
      <p class="country-info__text">
        Languages:&nbsp;<span class="country-info__text-value">${Object.values(
          languages
        ).join(', ')}</span>
      </p>`,
    ''
  );

  countryList.innerHTML = '';
  countryBlock.innerHTML = markup;
}
