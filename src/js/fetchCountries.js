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

//fields=name,capital,languages,flags,population