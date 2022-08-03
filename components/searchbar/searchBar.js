// @ts-nocheck
// Imports
import { recipes } from '../../data/recipes.js'
import { showRecipeCards } from '../recipeCards/recipeCards.js'
import { setAdvancedSearchOptions, showAdvancedSearchOptions } from '../advancedSearch/advancedSearch.js'

// DOM
const recipeCards = document.querySelector('.recipes')

// Manage general search input users
function handleGeneralSearch (recipesArray) {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    const filteredRecipes = recipesArray.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    if (filteredRecipes.length > 0) {
      showRecipeCards(filteredRecipes)
      setAdvancedSearchOptions(filteredRecipes)
      showAdvancedSearchOptions()
    } else {
      recipeCards.innerHTML = `
            <div class="col-12 d-flex flex-column align-items-center py-5">
                <h1 class="fs-1 pb-3">Aucune recette ne correspond à votre critère...</h1>
                <h3 class="fs-2">vous pouvez chercher « tarte aux pommes », « poisson », etc.</h3>
            </div>
            `
    }
  } else {
    showRecipeCards(recipes)
    setAdvancedSearchOptions(recipes)
  }
}

export { handleGeneralSearch }
