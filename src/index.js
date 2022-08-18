import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries.js';

const DEBOUNCE_DELAY = 300;
// let link = 'https://restcountries.com/v2/all';
let link = 'https://restcountries.com/v2/all?fields=name,capital,languages,flags,population';

const refs = {
    searchInput: document.querySelector('#search-box'),
    countryList: document.querySelector('.country-list'),
}
const { searchInput: search, countryList } = refs;
let name = null;

search.addEventListener('input', debounce(() => { onInputGetName.call(search) }, DEBOUNCE_DELAY));



function onInputGetName() {
    name = this.value.toLowerCase().trim();
    renderMarkup(name);
}


function renderMarkup(name) {
    fetchCountries(name)
        .then(countriesArray => {
            notify(countriesArray.length);
            countriesArray.length === 1 ? createOneCard(countriesArray) : createCountryCards(countriesArray);
        })
        .catch(err => {
            if (err.name === '404') {
            }
            console.log(err.message, err.name)
        })
}




function createCountryCards(countriesArray = []) {
    const countriesCards = countriesArray.map(country => {
        return `<li><img src = '${country.flags.svg}' width = 60>  ${country.name}</li>`
    });
    countryList.innerHTML = name !== '' ? countriesCards.join('') : '';
    return countriesCards.join('');
}

function createOneCard(countriesArray = []) {
    const countryCard = countriesArray.map(country => {
        return `<di>
        <h1>${country.name}</h1>
        <img src = '${country.flags.svg}' width = 60>
        <ul>
        <li><span>Capital: </span>${country.capital}</li>
        <li><span>Population: </span>${country.population}</li>
        <li><span>languages: </span>${(country.languages.map(lang => lang.name))}</li>
        </ul>
        </di>
                `
    });
    countryList.innerHTML = name !== '' ? countryCard.join('') : '';
    return countryCard.join('');
}


function notify(length) {
    if (length === 0) {
        countryList.innerHTML = '';
        return Notify.failure("Oops, there is no country with that name")
    }
    if (length > 10) {
        countryList.innerHTML = '';
        return Notify.info("Too many matches found. Please enter a more specific name.")
    }
}


/*
https://restcountries.com/v2/{service}?fields={field},{field},{field}
https://restcountries.com/v2/all?fields=name,capital,currencies
*/

