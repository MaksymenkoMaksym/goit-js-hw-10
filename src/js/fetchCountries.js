export function fetchCountries(name) {

    fetch(link = 'https://restcountries.com/v2/all')
        .then(
            (response) => {
                if (!response.ok) {
                    throw new Error(response.status);
                }
                return response.json();
            }
        )
        .then(data => {
            console.log(data.filter(v => v.name.toLowerCase().includes(name)));
        })
        .catch(err => console.log(err.name))

}

