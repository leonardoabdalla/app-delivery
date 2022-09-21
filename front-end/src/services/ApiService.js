// End-points dos receitas //
// export const mealByName = 'www.themealdb.com/api/json/v1/1/search.php?s=';

// A mesma função pode ser usada para fazer todas as requisições//
const requestApi = async (request, param, options) => {
  const ENDPOINT = `http://${request}${param}`;
  const response = await fetch(ENDPOINT, options);

  const json = await response.json();
  return (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
};

export default requestApi;
