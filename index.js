// Imports
import { recipes } from './Data/recipes.js'
import { showRecipeCards } from './components/recipeCards/recipeCards.js'
import { handleSearch } from './components/searchbar/searchBar.js'

// DOM
const recipeCards = document.querySelector('.recipes')
const searchGeneralInput = document.getElementById('search_general_input')

// Event Listeners
searchGeneralInput.addEventListener('input', handleSearch)

function init (data) {
  recipeCards.innerHTML = showRecipeCards(data)
}

init(recipes)

export { init }
