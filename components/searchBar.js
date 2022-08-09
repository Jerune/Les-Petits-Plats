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
  machines: [],
  utensils: []
}

// Manage general search input users
function handleGeneralSearch () {
  const searchGeneralInput = document.getElementById('search_general_input').value.toLowerCase()
  if (searchGeneralInput.length > 2) {
    let newRecipes = []
    if (filteredRecipes.length > 0) {
      activeRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
      newRecipes = filteredRecipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
    } else if (filteredRecipes.length === 0) {
      newRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput) || recipe.description.includes(searchGeneralInput) || recipe.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(searchGeneralInput)))
      activeRecipes = newRecipes
    }
    showRecipeCards(newRecipes)
    removeTagsFromRecipesAndsetAdvancedSearchOptions(newRecipes)
  } else {
    activeRecipes = recipes
    if (filteredRecipes.length > 0) {
      const recipesInLowerCase = putRecipesInLowerCase(activeRecipes)
      filteredRecipes = recipesInLowerCase.filter((recipe) => recipe.appliance.toLowerCase().includes(activeTags.machines) && activeTags.utensils.every((value) => recipe.ustensils.includes(value)) && activeTags.ingredients.every((value) => recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(value))))
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
  activeTags.ingredients = ingredients
  activeTags.machines = machines
  activeTags.utensils = utensils
  if (tagsArray.length > 0) {
    const recipesInLowerCase = putRecipesInLowerCase(activeRecipes)
    filteredRecipes = recipesInLowerCase.filter((recipe) => recipe.appliance.toLowerCase().includes(machines) && utensils.every((value) => recipe.ustensils.includes(value)) && ingredients.every((value) => recipe.ingredients.some((ingredient) => ingredient.ingredient.includes(value))))
    showRecipeCards(filteredRecipes)
    removeTagsFromRecipesAndsetAdvancedSearchOptions(filteredRecipes)
  } else {
    filteredRecipes = []
    showRecipeCards(activeRecipes)
    setAdvancedSearchOptions(activeRecipes)
  }
}

function putRecipesInLowerCase (recipesArray) {
  const recipesInLowerCase = recipesArray.map((recipe) => {
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
  return recipesInLowerCase
}

function removeTagsFromRecipesAndsetAdvancedSearchOptions (filteredRecipes) {
  const recipesWithActiveTagsRemoved = filteredRecipes.map((recipe) => {
    return {
      ...recipe,
      ustensils: activeTags.utensils.length > 0 ? recipe.ustensils.filter((ustensil) => !activeTags.utensils.some((value) => ustensil.includes(value))) : recipe.ustensils,
      appliance: activeTags.machines.length > 0 ? '' : recipe.appliance,
      ingredients: activeTags.ingredients.length > 0 ? recipe.ingredients.filter((ingr) => !activeTags.ingredients.some((value) => ingr.ingredient.includes(value))) : recipe.ingredients
    }
  })
  setAdvancedSearchOptions(recipesWithActiveTagsRemoved)
}

export { handleGeneralSearch, updateGeneralSearch }
