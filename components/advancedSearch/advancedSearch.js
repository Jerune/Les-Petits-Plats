// @ts-nocheck
// Variables
let advancedSearchOptions = {}

// Set available advanced search options based on current recipes
function setAdvancedSearchOptions (recipesArray) {
  advancedSearchOptions = {
    ingredients: [],
    machines: [],
    utensils: []
  }
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
  updateAdvancedSearchOptions(advancedSearchOptions)
}

function updateAdvancedSearchOptions (advancedSearchOptions) {
  const types = ['ingredients', 'machines', 'utensils']
  types.forEach((type) => {
    const list = document.getElementsByClassName(type).item(1)
    let listItems = ''
    advancedSearchOptions[type].forEach((element) => {
      listItems += `<li class="p-0 me-2">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
    })
    if (listItems.length > 0) {
      list.innerHTML = listItems
    }
  })
}

function toggleAdvancedSearchOptions (type) {
  const icon = document.getElementsByClassName(type).item(0)
  const iconState = icon.getAttribute('data-state')
  const list = document.getElementsByClassName(type).item(1)
  if (iconState === 'show') {
    icon.classList.remove('.bi-chevron-down')
    icon.classList.add('.bi-chevron-up')
    icon.setAttribute('state', 'hide')
    list.classList.remove('d-none')
    list.classList.add('d-flex')
  } else if (iconState === 'hide') {
    icon.classList.remove('.bi-chevron-up')
    icon.classList.add('.bi-chevron-down')
    icon.setAttribute('state', 'show')
    list.classList.remove('d-none')
    list.classList.add('d-flex')
  }
}

function filterAdvancedSearchOptions (type) {
  const inputFieldValue = document.getElementById(type).value.toLowerCase()
  if (inputFieldValue.length > 2) {
    const filteredSearchOptions = {
      ...advancedSearchOptions,
      [type]: advancedSearchOptions[type].filter((item) => item.includes(inputFieldValue))
    }
    advancedSearchOptions = filteredSearchOptions
    updateAdvancedSearchOptions(filteredSearchOptions)
  }
}

export { setAdvancedSearchOptions, toggleAdvancedSearchOptions, filterAdvancedSearchOptions }
