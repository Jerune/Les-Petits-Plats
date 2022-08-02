// Imports
import { recipes } from './Data/recipes.js'
import { showRecipeCards } from './components/recipeCards/recipeCards.js'

// DOM
console.log(recipes)
const recipeCards = document.querySelector('.recipes')

function init (data) {
  recipeCards.innerHTML = showRecipeCards(recipes)
}

init(recipes)
