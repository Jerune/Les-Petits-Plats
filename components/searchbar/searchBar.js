// Imports
import { recipes } from '../../data/recipes.js'
import { init } from '../../index.js'

// DOM
const recipeCards = document.querySelector('.recipes')

function handleSearch () {
  const searchGeneralInput = document.getElementById('search_general_input')
  if (searchGeneralInput.value.length > 2) {
    const filteredRecipes = recipes.filter((recipe) => recipe.name.toLowerCase().includes(searchGeneralInput.value) || recipe.description.includes(searchGeneralInput.value))
    if (filteredRecipes.length > 0) {
      init(filteredRecipes)
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

export { handleSearch }
