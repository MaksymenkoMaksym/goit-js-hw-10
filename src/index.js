import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;

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
            notify(countriesArray.length);
            countriesArray.length === 1 ? createOneCard(countriesArray) : countriesArray.length <= 10 ? createCountryCards(countriesArray) : countryList.innerHTML = '';;
        })
        .catch(err => {
            if (err.message === "404") {
                countryList.innerHTML = '';
                Notify.failure("Oops, there is no country with that name");
            }
        })
}


function createCountryCards(countriesArray = []) {
    const countriesCards = countriesArray.map(country => {
        return `<li><img src = '${country.flags.svg}' width = 60>  ${country.name.official}</li>`
    });
    return countryList.innerHTML = name !== '' ? countriesCards.join('') : '';
}



function createOneCard(countriesArray) {
    const countryCard = countriesArray.map(country => {
        return `<div><h1>${country.name.official}</h1>
        <img src = '${country.flags.svg}' width = 60>
        <ul>
        <li><span>Capital: </span>${country.capital}</li>
        <li><span>Population: </span>${country.population}</li>
        <li><span>languages: </span>${Object.values(country.languages)}</li>
        </ul>
        </div>`
    });
    countryList.innerHTML = name !== '' ? countryCard.join('') : name;
    return countryCard.join('');
}


function notify(length) {
    if (length > 10) {
        return Notify.info("Too many matches found. Please enter a more specific name.")
    }
}


