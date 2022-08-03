// @ts-nocheck
// Imports
import { recipes } from '../../data/recipes.js'
import { init } from '../../index.js'
import { showAdvancedSearchOptions } from '../advancedSearch/advancedSearch.js'

// DOM
const recipeCards = document.querySelector('.recipes')

// Variables
let filteredRecipes = []
const advancedSearchOptions = {
  ingredients: [],
  machines: [],
  utensils: []
}

// Manage general search input users
function handleGeneralSearch () {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    if (filteredRecipes.length > 0) {
      init(filteredRecipes)
      updateAdvancedSearchOptions(filteredRecipes)
    } else {
      recipeCards.innerHTML = `
            <div class="col-12 d-flex flex-column align-items-center py-5">
                <h1 class="fs-1 pb-3">On n'a pas trouver une recette</h1>
                <h3 class="fs-2">Changer votre recherche svp</h3>
            </div>
            `
    }
  } else {
    init(recipes)
  }
}

// Update available advanced search options based on current recipes
function updateAdvancedSearchOptions (recipesArray) {
  recipesArray.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (!advancedSearchOptions.ingredients.includes(ingredient.ingredient.toLowerCase())) {
        advancedSearchOptions.ingredients.push(ingredient.ingredient.toLowerCase())
      }
    })
    if (!advancedSearchOptions.machines.includes(recipe.appliance.toLowerCase())) {
      advancedSearchOptions.machines.push(recipe.appliance.toLowerCase())
    }
    recipe.ustensils.forEach((utensil) => {
      if (!advancedSearchOptions.utensils.includes(utensil.toLowerCase())) {
        advancedSearchOptions.utensils.push(utensil.toLowerCase())
      }
    })
  })
  showAdvancedSearchOptions(advancedSearchOptions)
}

export { handleGeneralSearch, updateAdvancedSearchOptions, filteredRecipes, advancedSearchOptions }
