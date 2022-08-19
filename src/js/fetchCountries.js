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
        return `<div><h1>${country.name.official}</h1>
        <img src = '${country.flags.svg}' width = 60>
        <ul>
        <li><span>Capital: </span>${country.capital}</li>
        <li><span>Population: </span>${country.population}</li>
        <li><span>languages: </span>${Object.values(country.languages)}</li>
        </ul>
        </div>`
    });
    return oneCard.join('');
}

export function createCountryCards(countriesArray = []) {
    const manyCards = countriesArray.map(country => {
        return `<li><img src = '${country.flags.svg}' width = 60>  ${country.name.official}</li>`
    });
    return manyCards.join('');
}

