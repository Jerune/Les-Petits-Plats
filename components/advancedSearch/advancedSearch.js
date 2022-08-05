// @ts-nocheck
// Variables
let activeRecipes = []
let advancedSearchOptions = {}

// --------------------- ADVANCED SEARCH OPTIONS FUNCTIONS ---------------

// Set available advanced search options based on current recipes
function setAdvancedSearchOptions (recipesArray) {
  activeRecipes = recipesArray
  advancedSearchOptions = {
    ingredients: [],
    machines: [],
    utensils: []
  }
  recipesArray.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      if (recipe.ingredients.length > 0 && !advancedSearchOptions.ingredients.includes(ingredient.ingredient.toLowerCase())) {
        advancedSearchOptions.ingredients.push(ingredient.ingredient.toLowerCase())
      }
    })
    if (recipe.appliance.length > 0 && !advancedSearchOptions.machines.includes(recipe.appliance.toLowerCase())) {
      advancedSearchOptions.machines.push(recipe.appliance.toLowerCase())
    }
    recipe.ustensils.forEach((utensil) => {
      if (recipe.ustensils.length > 0 && !advancedSearchOptions.utensils.includes(utensil.toLowerCase())) {
        advancedSearchOptions.utensils.push(utensil.toLowerCase())
      }
    })
  })
  showAdvancedSearchOptions(advancedSearchOptions)
}

function showAdvancedSearchOptions (advancedSearchOptions) {
  const types = ['ingredients', 'machines', 'utensils']
  types.forEach((type) => {
    const list = document.getElementsByClassName(type).item(1)
    let listItems = ''
    advancedSearchOptions[type].forEach((element) => {
      listItems += `<li onclick="setTags('${type}', this)" class="py-1 fw-normal">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
    })
    if (listItems.length > 0) {
      list.innerHTML = listItems
    }
  })
}
function setPlaceholder (type, action) {
  const inputField = document.getElementById(type)
  const placeholderValueOpen = type === 'ingredients' ? 'Rechercher un ingédient' : type === 'machines' ? 'Rechercher un appareil' : type === 'utensils' ? 'Rechercher un ustensil' : ''
  const placeholderValueClosed = type === 'ingredients' ? 'Ingredients' : type === 'machines' ? 'Appareils' : type === 'utensils' ? 'Ustensils' : ''
  if (action === 'close') {
    inputField.placeholder = placeholderValueClosed
    inputField.classList.remove('placeholder-opacity-50')
  } else if (action === 'open') {
    inputField.placeholder = placeholderValueOpen
    inputField.classList.add('placeholder-opacity-50')
  }
}

function toggleAdvancedSearchOptions (type) {
  const icon = document.getElementsByClassName(type).item(0)
  const iconState = icon.getAttribute('data-state')
  const list = document.getElementsByClassName(type).item(1)
  if (iconState === 'show') {
    icon.classList.remove('bi-chevron-down')
    icon.classList.add('bi-chevron-up')
    icon.setAttribute('data-state', 'hide')
    list.classList.remove('d-none')
    list.classList.add('d-flex')
    setPlaceholder(type, 'open')
  } else if (iconState === 'hide') {
    icon.classList.remove('bi-chevron-up')
    icon.classList.add('bi-chevron-down')
    icon.setAttribute('data-state', 'show')
    list.classList.remove('d-flex')
    list.classList.add('d-none')
    setPlaceholder(type, 'close')
  }
}

function filterAdvancedSearchOptions (type) {
  const inputFieldValue = document.getElementById(type).value.toLowerCase()
  const list = document.getElementsByClassName(type).item(1)
  if (inputFieldValue.length > 0) {
    const filteredSearchOptions = {
      ...advancedSearchOptions,
      [type]: advancedSearchOptions[type].filter((item) => item.includes(inputFieldValue))
    }
    showAdvancedSearchOptions(filteredSearchOptions)
    if (list.classList.contains('d-none')) {
      list.classList.remove('d-none')
      list.classList.add('d-flex')
      setPlaceholder(type, 'open')
    }
  } else {
    setAdvancedSearchOptions(activeRecipes)
    if (list.classList.contains('d-flex')) {
      list.classList.remove('d-flex')
      list.classList.add('d-none')
      setPlaceholder(type, 'closed')
    }
  }
}

export { setAdvancedSearchOptions, toggleAdvancedSearchOptions, filterAdvancedSearchOptions, setPlaceholder }
