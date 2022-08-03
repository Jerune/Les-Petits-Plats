// @ts-nocheck
// Imports
import { recipes } from './Data/recipes.js'
import { showRecipeCards } from './components/recipeCards/recipeCards.js'
import { handleGeneralSearch } from './components/searchbar/searchBar.js'
import { setAdvancedSearchOptions, filterAdvancedSearchOptions, toggleAdvancedSearchOptions } from './components/advancedSearch/advancedSearch.js'

// DOM
const searchGeneralInput = document.getElementById('search_general_input')
const ingredientsInput = document.getElementById('ingredients')
const ingredientsIcon = document.getElementsByClassName('ingredients').item(0)
const machinesInput = document.getElementById('machines')
const machinesIcon = document.getElementsByClassName('machines').item(0)
const utensilsInput = document.getElementById('utensils')
const utensilsIcon = document.getElementsByClassName('utensils').item(0)

// Event Listeners
searchGeneralInput.addEventListener('input', () => handleGeneralSearch(recipes))
ingredientsInput.addEventListener('input', () => filterAdvancedSearchOptions('ingredients'))
machinesInput.addEventListener('input', () => filterAdvancedSearchOptions('machines'))
utensilsInput.addEventListener('input', () => filterAdvancedSearchOptions('utensils'))
ingredientsIcon.addEventListener('click', () => toggleAdvancedSearchOptions('ingredients'))
machinesIcon.addEventListener('click', () => toggleAdvancedSearchOptions('machines'))
utensilsIcon.addEventListener('click', () => toggleAdvancedSearchOptions('utensils'))

function initRecipes (recipesArray) {
  showRecipeCards(recipesArray)
}

function initSearchOptions (advancedSearchOptions) {
  setAdvancedSearchOptions(advancedSearchOptions)
}

initRecipes(recipes)
initSearchOptions(recipes)

export { initRecipes, initSearchOptions }
