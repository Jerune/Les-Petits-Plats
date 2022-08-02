function showRecipeCards (recipesData) {
  let recipeCards = ''
  recipesData.forEach(recipe => {
    let recipeIngredients = ''
    recipe.ingredients.forEach(ingredient => {
      recipeIngredients += `<li><strong>${ingredient.ingredient}</strong>:&nbsp;${ingredient.quantity}${ingredient.unit}</li>`
    })

    recipeCards += `
        <div class="col-4">
            <div class="card border-0">
                <div class="card-img-top bg-dark" style="height: 178px ;"></div>
                <div class="card-body bg-light">
                    <div class="card-title d-flex flex-row justify-content-between">
                        <h3 class="fs-1">${recipe.name}</h3>
                        <i class="bi bi-clock fw-bold fst-normal fs-1">&nbsp;&nbsp;${recipe.time}&nbsp;min</i>
                    </div>
                    <div class="card-text pt-3 d-flex flex-row justify-content-between">
                        <ul class="w-50 fs-3 p-0">
                            ${recipeIngredients}
                        </ul>
                        <p class="fs-3 tk-roboto w-50 lh-1">${recipe.description}</p>
                    </div>
                </div>
            </div>
        </div>
        `
  })

  return recipeCards
}

export { showRecipeCards }
