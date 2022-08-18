export function fetchCountries(name = '') {
    return fetch('https://restcountries.com/v2/al?fields=name,capital,languages,flags,population')
        .then(
            (response) => {
                console.log(response);
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        ).then(data => {
            const countriesArray = data.filter(v => v.name.toLowerCase().includes(name));
            console.log(countriesArray);
            return countriesArray;
        })

}