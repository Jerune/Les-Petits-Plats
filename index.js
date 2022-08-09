// @ts-nocheck
// Imports
import { recipes } from './Data/recipes.js'
import { showRecipeCards } from './components/recipeCards.js'
import { handleGeneralSearch } from './components/searchBar.js'
import { setAdvancedSearchOptions, filterAdvancedSearchOptions, toggleAdvancedSearchOptions, setPlaceholder } from './components/advancedSearch.js'
import { setTags, deleteTags } from './components/tags.js'

// Expose functions globally
window.setTags = setTags
window.deleteTags = deleteTags

// DOM
const searchGeneralInput = document.getElementById('search_general_input')
const ingredientsInput = document.getElementById('ingredients')
const ingredientsIcon = document.getElementsByClassName('ingredients').item(0)
const machinesInput = document.getElementById('machines')
const machinesIcon = document.getElementsByClassName('machines').item(0)
const utensilsInput = document.getElementById('utensils')
const utensilsIcon = document.getElementsByClassName('utensils').item(0)

// -----------------   Event Listeners ----------------------------
// General Search input event filtering
searchGeneralInput.addEventListener('input', () => handleGeneralSearch())

// Advanced Search input event filtering
ingredientsInput.addEventListener('input', () => filterAdvancedSearchOptions('ingredients'))
machinesInput.addEventListener('input', () => filterAdvancedSearchOptions('machines'))
utensilsInput.addEventListener('input', () => filterAdvancedSearchOptions('utensils'))

// Advanced Search input focus/blur placeholder change event
ingredientsInput.addEventListener('focus', () => setPlaceholder('ingredients', 'open'))
machinesInput.addEventListener('focus', () => setPlaceholder('machines', 'open'))
utensilsInput.addEventListener('focus', () => setPlaceholder('utensils', 'open'))
ingredientsInput.addEventListener('blur', () => setPlaceholder('ingredients', 'close'))
machinesInput.addEventListener('blur', () => setPlaceholder('machines', 'close'))
utensilsInput.addEventListener('blur', () => setPlaceholder('utensils', 'close'))

// Toggle Advanced Search Options list icon click event to manually open/close list
ingredientsIcon.addEventListener('click', () => toggleAdvancedSearchOptions('ingredients'))
machinesIcon.addEventListener('click', () => toggleAdvancedSearchOptions('machines'))
utensilsIcon.addEventListener('click', () => toggleAdvancedSearchOptions('utensils'))

/**
 * Initiates all recipes to be shown when page is loaded
 * @function initRecipes
 */
function initRecipes () {
  showRecipeCards(recipes)
}

/**
 * Initiates all possible search options to be shown when page is loaded
 * @function initSearchOptions
 */
function initSearchOptions () {
  setAdvancedSearchOptions(recipes)
}

initRecipes()
initSearchOptions()
