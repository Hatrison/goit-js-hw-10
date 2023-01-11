export default function fetchCountries(name) {
  const params = '?fields=name,capital,population,flags,languages';

  return fetch(`${name}` + params).then(response => {
    if (response.status === 404) throw new Error();
    return response.json();
  });
}
