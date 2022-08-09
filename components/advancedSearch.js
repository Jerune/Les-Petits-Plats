// @ts-nocheck
// Variables
let activeRecipes = []
let advancedSearchOptions = {}

/**
 * Builds up the advancedSearchOptions object from the active recipes that can be used to show advanced search options
 * @function setAdvancedSearchOptions
 * @param {Array.<Object>} recipesArray Array of recipe objects that are currently active on the page
 * @return {Object} All filtered advanced search options to showAdvancedSearchOptions function
 */
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

/**
 * Creates list items (li) from every active advanced search option that is currently active
 * @function showAdvancedSearchOptions
 * @param {Object} advancedSearchOptions All active advanced search options from active recipes
 * @returns {HTMLCollection} Adds advanced search items as list items (li) to every advanced search menu (ul)
 */
function showAdvancedSearchOptions (advancedSearchOptions) {
  const types = ['ingredients', 'machines', 'utensils']
  types.forEach((type) => {
    const list = document.getElementsByClassName(type).item(1)
    let listItems = ''
    advancedSearchOptions[type].forEach((element) => {
      listItems += `<li onclick="setTags('${type}', this)" class="py-1 fw-normal">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
    })
    // Removes or adds padding to advanced search lists in case there are items or not
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

/**
 * Changes the placeholder of one of the advanced search menu's to closed or open value
 * @param {string} type one of the three types of advanced search options menu's (ingredients, machines or utensils)
 * @param {string} action open or close action for placeholder value
 * @returns {string} Placeholder attribute value and opacity class
 */
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
/**
 * Toggles between making of one (or more) of the advanced search menus visible or invisible based on the 'data-state' of the toggle icon.
 * @function toggleAdvancedSearchOptions
 * @param {string} type one of the three types of advanced search options menu's (ingredients, machines or utensils)
 * @returns changes class and attribute values of an advanced search menu to show or hide its content
 */
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
    // Closes other two menu's if they are open when opening another menu
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

/**
 * Filters advanced search options in one of the advanced search option menu's based on users input
 * @function filterAdvancedSearchOptions
 * @param {string} type one of the three types of advanced search options menu's (ingredients, machines or utensils)
 * @returns {Object} filtered search options
 */
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
    // Shows the advanced search options when user starts typing
    if (iconState === 'hide') {
      toggleAdvancedSearchOptions(type)
    }
    // Hides the advanced search options when no content is present
  } else {
    setAdvancedSearchOptions(activeRecipes)
    if (iconState === 'show') {
      toggleAdvancedSearchOptions(type)
    }
  }
}

export { setAdvancedSearchOptions, toggleAdvancedSearchOptions, filterAdvancedSearchOptions, setPlaceholder }
