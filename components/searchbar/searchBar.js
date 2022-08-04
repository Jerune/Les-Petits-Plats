// @ts-nocheck
// Imports
import { recipes } from '../../data/recipes.js'
import { showRecipeCards } from '../recipeCards/recipeCards.js'
import { setAdvancedSearchOptions } from '../advancedSearch/advancedSearch.js'

// DOM
const recipeCards = document.querySelector('.recipes')

// Variables
let activeRecipes = recipes

// Manage general search input users
function handleGeneralSearch () {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    const filteredRecipes = activeRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    if (filteredRecipes.length > 0) {
      activeRecipes = filteredRecipes
      showRecipeCards(activeRecipes)
      setAdvancedSearchOptions(activeRecipes)
      console.log(activeRecipes)
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

function updateGeneralSearch (tagsArray) {
  const ingredients = []
  const machines = []
  const utensils = []
  tagsArray.forEach((tag) => {
    tag.tagType === 'ingredients'
      ? ingredients.push(tag.title)
      : tag.tagType === 'machines'
        ? machines.push(tag.title)
        : tag.tagType === 'utensils'
          ? utensils.push(tag.title)
          : console.log('an error has occured')
  })
  console.log(utensils)
  const filteredRecipes = activeRecipes.filter((recipe) => recipe.appliance.toLowerCase().includes(machines) && recipe.ustensils.some((ustensil) => ustensil.toLowerCase().includes(utensils)) && recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ingredients)))
  showRecipeCards(filteredRecipes)
}

export { handleGeneralSearch, updateGeneralSearch }
