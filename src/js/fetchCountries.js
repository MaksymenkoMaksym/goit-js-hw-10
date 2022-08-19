const BASE_URL = 'https://restcountries.com';
const searchField = new URLSearchParams({
    fields: ['name', 'capital', 'languages', 'flags', 'population'],
})

export function fetchCountries(name = '') {
    return fetch(`${BASE_URL}/v3.1/name/${name}?${searchField}`)
        .then(
            (response) => {
                // console.log(response);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        ).then(data => {
            const countriesArray = data.filter(v => v.name.official.toLowerCase().includes(name));
            // console.log(countriesArray);
            return countriesArray;
        })

}


export function createOneCard(countriesArray = []) {
    const oneCard = countriesArray.map(country => {
        return `<li class="card">
        <div class="card_box">
        <img class="card_img" src = "${country.flags.svg}" width = 300 alt ="flag of ${country.name.official}">
        <h1 class="card_title">${country.name.official}</h1>
        </div>
        <ul class="card_list">
        <li><span>Capital: </span>${country.capital}</li>
        <li><span>Population: </span>${country.population}</li>
        <li><span>languages: </span>${Object.values(country.languages)}</li>
        </ul>
        </li>`
    });
    return oneCard.join('');
}

export function createCountryCards(countriesArray = []) {
    const manyCards = countriesArray.map(country => {
        return `<li class="list_item"><img src = '${country.flags.svg}' width = 60><span>  ${country.name.official}</span></li>`
    });
    return manyCards.join('');
}

