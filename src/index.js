import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import './css/styles.css';
import { fetchCountries, createOneCard, createCountryCards } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
const INFO_MSG = "Too many matches found. Please enter a more specific name.";
const FAILURE_MSG = "Oops, there is no country with that name";

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
}
const { searchInput: search, countryList } = refs;
let name = '';

search.addEventListener('input', debounce(() => { onInputGetName.call(search) }, DEBOUNCE_DELAY));



function onInputGetName() {
    name = this.value.toLowerCase().trim();
    if (!name) {
        return countryList.innerHTML = '';
    }
    renderMarkup(name);
}


function renderMarkup(name) {
    fetchCountries(name)
        .then(countriesArray => {
            if (countriesArray.length > 1 && countriesArray.length <= 10) {
                countryList.innerHTML = createCountryCards(countriesArray);
            }
            if (countriesArray.length === 1) {
                countryList.innerHTML = createOneCard(countriesArray);
            }
            if (countriesArray.length > 10) {
                Notify.info(INFO_MSG);
                countryList.innerHTML = ''
            }
        })
        .catch(({ name, message }) => {
            if (message === "404") {
                countryList.innerHTML = '';
                Notify.failure(FAILURE_MSG);
            }
            else { Notify.failure(`Error name: ${name}.Error name: ${message}`) }
        })
}




