// @ts-nocheck
// Imports
import { recipes } from '../data/recipes.js'
import { showRecipeCards } from './recipeCards.js'
import { setAdvancedSearchOptions } from './advancedSearch.js'

// Variables
let activeRecipes = recipes
let filteredRecipes = []
const activeTags = {
  ingredients: [],
  machine: [],
  utensils: []
}

// Manage general search input users
function handleGeneralSearch (recipesArray) {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    let newRecipes = []
    if (filteredRecipes.length > 0) {
      newRecipes = filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    } else if (filteredRecipes.length === 0) {
      newRecipes = recipesArray.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    }
    activeRecipes = newRecipes
    showRecipeCards(activeRecipes)
    removeTagsFromRecipesAndsetAdvancedSearchOptions(activeRecipes)
  } else {
    activeRecipes = recipes
    if (filteredRecipes.length > 0) {
      showRecipeCards(filteredRecipes)
      removeTagsFromRecipesAndsetAdvancedSearchOptions(filteredRecipes)
    } else {
      showRecipeCards(recipes)
      setAdvancedSearchOptions(recipes)
    }
  }
}

function updateGeneralSearch (tagsArray) {
  const ingredients = []
  const machine = []
  const utensils = []
  tagsArray.forEach((tag) => {
    tag.tagType === 'ingredients'
      ? ingredients.push(tag.title)
      : tag.tagType === 'machines'
        ? machine.push(tag.title)
        : tag.tagType === 'utensils'
          ? utensils.push(tag.title)
          : console.log('an error has occured')
  })
  activeTags.ingredients = ingredients
  activeTags.machine = machine
  activeTags.utensils = utensils
  if (tagsArray.length > 0) {
    const recipesInLowerCase = activeRecipes.map((recipe) => {
      return (
        {
          ...recipe,
          ingredients: recipe.ingredients.map((ingr) => {
            return {
              ...ingr,
              ingredient: ingr.ingredient.toLowerCase()
            }
          }),
          ustensils: recipe.ustensils.map((ustensil) => {
            return ustensil.toLowerCase()
          }),
          appliance: recipe.appliance.toLowerCase()
        }
      )
    })
    filteredRecipes = recipesInLowerCase.filter((recipe) => recipe.appliance.toLowerCase().includes(machine) && utensils.every((value) => recipe.ustensils.includes(value)) && ingredients.every((value) => recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(value))))
    showRecipeCards(filteredRecipes)
    removeTagsFromRecipesAndsetAdvancedSearchOptions(filteredRecipes)
  } else {
    filteredRecipes = []
    showRecipeCards(activeRecipes)
    setAdvancedSearchOptions(activeRecipes)
  }
}

function removeTagsFromRecipesAndsetAdvancedSearchOptions (filteredRecipes) {
  const recipesWithActiveTagsRemoved = filteredRecipes.map((recipe) => {
    return {
      ...recipe,
      ustensils: activeTags.utensils.length > 0 ? recipe.ustensils.filter((ustensil) => !activeTags.utensils.some((value) => ustensil.includes(value))) : recipe.ustensils,
      appliance: activeTags.machine.length > 0 ? '' : recipe.appliance,
      ingredients: activeTags.ingredients.length > 0 ? recipe.ingredients.filter((ingr) => !activeTags.ingredients.some((value) => ingr.ingredient.includes(value))) : recipe.ingredients
    }
  })
  setAdvancedSearchOptions(recipesWithActiveTagsRemoved)
}

export { handleGeneralSearch, updateGeneralSearch }
