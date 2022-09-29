import { readInLocalStorage } from './localStorage';
// End-points dos receitas //
// export const mealByName = 'www.themealdb.com/api/json/v1/1/search.php?s=';

// A mesma função pode ser usada para fazer todas as requisições//
/* const requestApi = async (request, param, options) => {
  const ENDPOINT = `http://${request}${param}`;
  const response = await fetch(ENDPOINT, options);

  const json = await response.json();
  return (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
}; */

const requestApi = async (path, method = 'GET', body) => {
  const { token } = readInLocalStorage('user') || {};
  const endpoint = `http://localhost:3001${path}`;
  const response = await fetch(endpoint, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body,
  });

  const json = await response.json();

  if (!response.ok) throw json;
  return json;
};

export default requestApi;
