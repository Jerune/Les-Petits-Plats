// @ts-nocheck
// DOM
const ingredientsList = document.getElementById('ingredients_list')

function showAdvancedSearchOptions (advancedSearchOptions) {
  let listItems = ''
  advancedSearchOptions.ingredients.forEach((ingredient) => {
    listItems += `<li class="p-0 me-2">${ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</li>`
  })
  if (listItems.length > 0) {
    ingredientsList.innerHTML = listItems
    ingredientsList.classList.remove('d-none')
    ingredientsList.classList.add('d-flex')
  }
}

export { showAdvancedSearchOptions }
