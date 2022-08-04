// @ts-nocheck
// Variables
let activeRecipes = []
let advancedSearchOptions = {}
const tags = []

// ---------------------------- TAGS FUNCTIONS ---------------

function setTags (type, ev) {
  console.log(type)
  console.log(ev)
  let activeTags = []
  if (tags.length > 0) {
    activeTags = tags.filter((tag) => tag.lowerCase().title !== ev.innerText.lowerCase())
  }
  if (activeTags.length === 0) {
    const tagID = tags.length + 1
    const bgColor = type === 'ingredients' ? 'bg-primary' : type === 'machines' ? 'bg-success' : type === 'utensils' ? 'bg-danger' : ''
    const newTag = {
      title: ev.innerText,
      bg: bgColor,
      id: tagID
    }
    tags.push(newTag)
    showTags(tags)
  }
}

function showTags (tagsArray) {
  const tagsList = document.getElementById('search_tags')
  let tagsItems = ''
  tagsArray.forEach((tag) => {
    tagsItems += `
      <li class="d-flex flex-row justify-content-between align-items-center py-1 px-3 w-auto ${tag.bg} text-white rounded-2 fs-2 me-3">
          <span class="search_tags_title pe-3">${tag.title}</span>
          <i id=${tag.id} class="bi bi-x-circle fs-1"></i>
      </li>
    `
  })
  tagsList.innerHTML = tagsItems
}

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

export { setAdvancedSearchOptions, toggleAdvancedSearchOptions, filterAdvancedSearchOptions, setPlaceholder, setTags }
