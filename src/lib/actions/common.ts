export const API_URL = 'https://jsonplaceholder.typicode.com';
type params = {
    method: string,
    url: string,
    data:object|undefined|null
}
export function fetchApi( method:string, url:string, data:object|undefined|null) {
    return fetch(url, {
        method: method,
        headers:method!=="GET"&& {
            'Content-Type': 'application/json',
        }||{},
        body: method!=="GET"&&JSON.stringify(data??{})||undefined,
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erreur lors de la requête: ${response.statusText}`);
        }
        return response.json();
    })
    .catch(error => {
        console.error('Une erreur est survenue:', error);
        throw error;
    });
}