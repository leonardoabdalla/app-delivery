// End-points dos receitas //
export const mealByName = 'www.themealdb.com/api/json/v1/1/search.php?s=';
export const mealsByFirstLetter = 'www.themealdb.com/api/json/v1/1/search.php?f=';
export const fullMealDetailsById = 'www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const singleRandomMeal = 'www.themealdb.com/api/json/v1/1/random.php';
export const allMealCategories = 'www.themealdb.com/api/json/v1/1/categories.php';
export const allCategories = 'www.themealdb.com/api/json/v1/1/list.php?c=';
export const allArea = 'www.themealdb.com/api/json/v1/1/list.php?a=';
export const allIngredients = 'www.themealdb.com/api/json/v1/1/list.php?i=';
export const byMainIngredient = 'www.themealdb.com/api/json/v1/1/filter.php?i=';
export const byCategory = 'www.themealdb.com/api/json/v1/1/filter.php?c=';
export const byArea = 'www.themealdb.com/api/json/v1/1/filter.php?a=';
// End-points dos drinks//
export const cocktailByName = 'www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const cocktailsByFirstLetter = 'www.thecocktaildb.com/api/json/v1/1/search.php?f=';
export const ingredientIyName = 'www.thecocktaildb.com/api/json/v1/1/search.php?i=';
export const detailsById = 'www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
export const ingredientByID = 'www.thecocktaildb.com/api/json/v1/1/lookup.php?iid=';
export const randomCocktail = 'www.thecocktaildb.com/api/json/v1/1/random.php';
export const byIngredient = 'www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
/* www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka */
export const byAlcoholic = 'www.thecocktaildb.com/api/json/v1/1/filter.php?a=';/* Alcoholic */
/* www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic */
export const category = 'www.thecocktaildb.com/api/json/v1/1/filter.php?c=';/* Ordinary_Drink */
/* www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail */
export const byGlass = 'www.thecocktaildb.com/api/json/v1/1/filter.php?g=';/* Cocktail_glass */
/* www.thecocktaildb.com/api/json/v1/1/filter.php?g=Champagne_flute */
export const categories = 'www.thecocktaildb.com/api/json/v1/1/list.php?c=';/* list */
export const glasses = 'www.thecocktaildb.com/api/json/v1/1/list.php?g=';/* list */
export const cocktailIngredients = 'www.thecocktaildb.com/api/json/v1/1/list.php?i=';/* list */
export const alcoholicFilters = 'www.thecocktaildb.com/api/json/v1/1/list.php?a=';/* list */

// A mesma função pode ser usada para fazer todas as requisições//
export const requestApi = async (request, param) => {
  const ENDPOINT = `https://${request}${param}`;
  const response = await fetch(ENDPOINT);

  const json = await response.json();
  return (response.ok
    ? Promise.resolve(json)
    : Promise.reject(json));
};
