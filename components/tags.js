// @ts-nocheck
// Imports
import { updateGeneralSearch } from './searchBar.js'
import { toggleAdvancedSearchOptions } from './advancedSearch.js'

let tags = []
const tagsSection = document.getElementById('tags')

// ---------------------------- TAGS FUNCTIONS ---------------

function setTags (type, element) {
  let activeTags = []
  if (tags.length > 0) {
    activeTags = tags.filter((tag) => tag.title === element.innerText.toLowerCase())
  }
  if (activeTags.length === 0) {
    const bgColor = type === 'ingredients' ? 'bg-primary' : type === 'machines' ? 'bg-success' : type === 'utensils' ? 'bg-danger' : ''
    const newTag = {
      title: element.innerText.toLowerCase(),
      bg: bgColor,
      tagType: type
    }
    tags.push(newTag)
    updateGeneralSearch(tags)
    showTags(tags)
    toggleAdvancedSearchOptions(type)
  }
}

function showTags (tagsArray) {
  const tagsList = document.getElementById('search_tags')
  let tagsItems = ''
  tagsArray.forEach((tag) => {
    tagsItems += `
      <li class="d-flex flex-row justify-content-between align-items-center py-1 px-3 w-auto ${tag.bg} text-white rounded-2 fs-2 me-3">
          <span class="search_tags_title pe-3">${tag.title.charAt(0).toUpperCase() + tag.title.slice(1)}</span>
          <i data-id=${tag.id} onclick='deleteTags(this)' class="bi bi-x-circle fs-1"></i>
      </li>
    `
  })
  if (tagsItems !== '' && !tagsSection.classList.contains('mt-4')) {
    tagsSection.classList.add('mt-4')
  } else if (tagsItems === '' && tagsSection.classList.contains('mt-4')) {
    tagsSection.classList.remove('mt-4')
  }
  tagsList.innerHTML = tagsItems
}

function deleteTags (element) {
  const tagTitle = element.previousElementSibling.innerText.toLowerCase()
  const newTagsArray = tags.filter((tag) => tag.title !== tagTitle)
  tags = newTagsArray
  updateGeneralSearch(tags)
  showTags(tags)
}

export { setTags, showTags, deleteTags }
