// @ts-nocheck
// Imports
import { recipes } from '../../data/recipes.js'
import { showRecipeCards } from '../recipeCards/recipeCards.js'
import { setAdvancedSearchOptions } from '../advancedSearch/advancedSearch.js'

// Variables
let activeRecipes = recipes
let filteredRecipes = []

// Manage general search input users
function handleGeneralSearch () {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    let newRecipes = []
    if (filteredRecipes.length > 0) {
      newRecipes = filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    } else if (filteredRecipes.length === 0) {
      newRecipes = activeRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    }
    if (newRecipes.length > 0) {
      activeRecipes = newRecipes
      showRecipeCards(activeRecipes)
      setAdvancedSearchOptions(activeRecipes)
    } else {
      showRecipeCards(newRecipes)
      setAdvancedSearchOptions(newRecipes)
    }
  } else {
    activeRecipes = recipes
    if (filteredRecipes.length > 0) {
      showRecipeCards(filteredRecipes)
      setAdvancedSearchOptions(filteredRecipes)
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
          })
        }
      )
    })
    filteredRecipes = recipesInLowerCase.filter((recipe) => recipe.appliance.toLowerCase().includes(machine) && utensils.every((value) => recipe.ustensils.includes(value)) && ingredients.every((value) => recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(value))))
    showRecipeCards(filteredRecipes)
    const recipesWithActiveTagsRemoved = filteredRecipes.map((recipe) => {
      return {
        ...recipe,
        ustensils: utensils.length > 0 ? recipe.ustensils.filter((ustensil) => !ustensil.includes(utensils)) : recipe.ustensils,
        appliance: machine.length > 0 ? recipe.appliance.includes(machine) : recipe.appliance,
        ingredients: ingredients.length > 0 ? recipe.ingredients.filter((ingr) => !ingr.ingredient.includes(ingredients)) : recipe.ingredients
      }
    })
    setAdvancedSearchOptions(recipesWithActiveTagsRemoved)
  } else {
    filteredRecipes = []
    showRecipeCards(activeRecipes)
    setAdvancedSearchOptions(activeRecipes)
  }
}

export { handleGeneralSearch, updateGeneralSearch }
