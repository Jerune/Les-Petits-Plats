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
  const filteredSearchOptions = {}
  const ingredientsInputFieldValue = document.getElementById('ingredients').value.toLowerCase()
  const machinesInputFieldValue = document.getElementById('machines').value.toLowerCase()
  const utensilsInputFieldValue = document.getElementById('utensils').value.toLowerCase()

  filteredSearchOptions.ingredients = advancedSearchOptions.ingredients.filter((searchOptionValue) => searchOptionValue.includes(ingredientsInputFieldValue))
  filteredSearchOptions.machines = advancedSearchOptions.machines.filter((searchOptionValue) => searchOptionValue.includes(machinesInputFieldValue))
  filteredSearchOptions.utensils = advancedSearchOptions.utensils.filter((searchOptionValue) => searchOptionValue.includes(utensilsInputFieldValue))

  showAdvancedSearchOptions(filteredSearchOptions)
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
      if (!list.classList.contains('pt-3')) {
        list.classList.add('pt-3')
      }
    } else {
      list.innerHTML = ''
      if (list.classList.contains('pt-3')) {
        list.classList.remove('pt-3')
      }
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
  const types = ['ingredients', 'machines', 'utensils']
  const otherTypes = types.filter((lst) => lst !== type)
  const otherIcon1 = document.getElementsByClassName(otherTypes[0]).item(0)
  const otherList1 = document.getElementsByClassName(otherTypes[0]).item(1)
  const otherIcon2 = document.getElementsByClassName(otherTypes[1]).item(0)
  const otherList2 = document.getElementsByClassName(otherTypes[1]).item(1)
  const activeIcon = document.getElementsByClassName(type).item(0)
  const activeIconState = activeIcon.getAttribute('data-state')
  const activeList = document.getElementsByClassName(type).item(1)
  if (activeIconState === 'hide') {
    activeIcon.classList.remove('bi-chevron-down')
    activeIcon.classList.add('bi-chevron-up')
    activeIcon.setAttribute('data-state', 'show')
    activeList.classList.remove('d-none')
    activeList.classList.add('d-flex')
    setPlaceholder(type, 'open')
    if (otherIcon1.getAttribute('data-state') === 'show') {
      otherIcon1.classList.remove('bi-chevron-up')
      otherIcon1.classList.add('bi-chevron-down')
      otherIcon1.setAttribute('data-state', 'hide')
      otherList1.classList.remove('d-flex')
      otherList1.classList.add('d-none')
      setPlaceholder(otherTypes[0], 'close')
    } else if (otherIcon2.getAttribute('data-state') === 'show') {
      otherIcon2.classList.remove('bi-chevron-up')
      otherIcon2.classList.add('bi-chevron-down')
      otherIcon2.setAttribute('data-state', 'hide')
      otherList2.classList.remove('d-flex')
      otherList2.classList.add('d-none')
      setPlaceholder(otherTypes[1], 'close')
    }
  } else if (activeIconState === 'show') {
    activeIcon.classList.remove('bi-chevron-up')
    activeIcon.classList.add('bi-chevron-down')
    activeIcon.setAttribute('data-state', 'hide')
    activeList.classList.remove('d-flex')
    activeList.classList.add('d-none')
    setPlaceholder(type, 'close')
  }
}

function filterAdvancedSearchOptions (type) {
  const inputFieldValue = document.getElementById(type).value.toLowerCase()
  const icon = document.getElementsByClassName(type).item(0)
  const iconState = icon.getAttribute('data-state')
  if (inputFieldValue.length > 0) {
    const filteredSearchOptions = {
      ...advancedSearchOptions,
      [type]: advancedSearchOptions[type].filter((item) => item.includes(inputFieldValue))
    }
    showAdvancedSearchOptions(filteredSearchOptions)
    if (iconState === 'hide') {
      toggleAdvancedSearchOptions(type)
    }
  } else {
    setAdvancedSearchOptions(activeRecipes)
    if (iconState === 'show') {
      toggleAdvancedSearchOptions(type)
    }
  }
}

export { setAdvancedSearchOptions, toggleAdvancedSearchOptions, filterAdvancedSearchOptions, setPlaceholder }
