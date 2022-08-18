import { debounce } from 'lodash.debounce';

import './css/styles.css';

import { fetchCountries, nameInput } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
// let link = 'https://restcountries.com/v2/all';
const refs = {
    searchInput: document.querySelector('#search-box'),
}
const { searchInput: search } = refs;

search.addEventListener('input', name)

fetchCountries(name);

function name() {
    _.debounce(() => { fetchCountries(this.value.toLowerCase()) }, 300);
    return this.value.toLowerCase();

}


