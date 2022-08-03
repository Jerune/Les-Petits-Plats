// @ts-nocheck
// Imports
import { recipes } from './Data/recipes.js'
import { showRecipeCards } from './components/recipeCards/recipeCards.js'
import { handleGeneralSearch } from './components/searchbar/searchBar.js'
import { setAdvancedSearchOptions, filterAdvancedSearchOptions } from './components/advancedSearch/advancedSearch.js'

// DOM
const searchGeneralInput = document.getElementById('search_general_input')
const ingredientsInput = document.getElementById('ingredients')
const machinesInput = document.getElementById('machines')
const utensilsInput = document.getElementById('utensils')

// Event Listeners
searchGeneralInput.addEventListener('input', () => handleGeneralSearch(recipes))
ingredientsInput.addEventListener('input', () => filterAdvancedSearchOptions('ingredients'))
machinesInput.addEventListener('input', () => filterAdvancedSearchOptions('machines'))
utensilsInput.addEventListener('input', () => filterAdvancedSearchOptions('utensils'))

function initRecipes (recipesArray) {
  showRecipeCards(recipesArray)
}

function initSearchOptions (advancedSearchOptions) {
  setAdvancedSearchOptions(advancedSearchOptions)
}

initRecipes(recipes)
initSearchOptions(recipes)

export { initRecipes, initSearchOptions }
