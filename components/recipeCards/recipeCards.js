// @ts-nocheck
// DOM
const recipeCardsElement = document.querySelector('.recipes')

function showRecipeCards (recipesData) {
  let recipeCards = ''
  if (recipesData.length > 0) {
    recipesData.forEach(recipe => {
      let recipeIngredients = ''
      recipe.ingredients.forEach(ingredient => {
        recipeIngredients += `<li><strong>${ingredient.ingredient}</strong>${ingredient.quantity ? ` : ${ingredient.quantity} ` : ''}${ingredient.unit ? ingredient.unit : ''}</li>`
      })

      recipeCards += `
        <div class="col-4">
            <div class="card border-0 h-100">
                <div class="card-img-top bg-dark" style="height: 178px ;"></div>
                <div class="card-body bg-light">
                    <div class="card-title d-flex flex-row justify-content-between">
                        <h3 class="fs-1 w-75 pe-1">${recipe.name}</h3>
                        <i class="bi bi-clock fw-bold fst-normal fs-1 w-25">&nbsp;&nbsp;${recipe.time}&nbsp;min</i>
                    </div>
                    <div class="card-text pt-3 d-flex flex-row justify-content-between">
                        <ul class="w-50 pe-2 fs-3 p-0">
                            ${recipeIngredients}
                        </ul>
                        <p class="fs-3 tk-roboto w-50 lh-1">${recipe.description}</p>
                    </div>
                </div>
            </div>
        </div>
        `
    })

    recipeCardsElement.innerHTML = recipeCards
  } else {
    recipeCardsElement.innerHTML = `
            <div class="col-12 d-flex flex-column align-items-center py-5">
                <h1 class="fs-1 pb-3">Aucune recette ne correspond à votre critère...</h1>
                <h3 class="fs-2">vous pouvez chercher « tarte aux pommes », « poisson », etc.</h3>
            </div>
            `
  }
}

export { showRecipeCards }
