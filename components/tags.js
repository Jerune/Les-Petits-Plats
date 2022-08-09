// @ts-nocheck
// Imports
import { updateGeneralSearch } from './searchBar.js'
import { toggleAdvancedSearchOptions } from './advancedSearch.js'

let tags = []
const tagsSection = document.getElementById('tags')

/**
 * Adds a tag to the tags object whenever user clicks on advanced search option in menu
 * @function setTags
 * @param {string} type one of the three types of advanced search options menu's (ingredients, machines or utensils)
 * @param {HTMLElement} option clicked advanced search option by the user
 * @returns {Array} list of chosen tags by user
 */
function setTags (type, option) {
  let activeTags = []
  if (tags.length > 0) {
    activeTags = tags.filter((tag) => tag.title === option.innerText.toLowerCase())
  }
  if (activeTags.length === 0) {
    const bgColor = type === 'ingredients' ? 'bg-primary' : type === 'machines' ? 'bg-success' : type === 'utensils' ? 'bg-danger' : ''
    const newTag = {
      title: option.innerText.toLowerCase(),
      bg: bgColor,
      tagType: type
    }
    tags.push(newTag)
    updateGeneralSearch(tags)
    showTags(tags)
    toggleAdvancedSearchOptions(type)
  }
}

/**
 * Creates list items from tags and shows them on the page
 * @function showTags
 * @param {Array} tagsArray list of active tags
 * @returns {HTMLCollection} list of tags (li) on page
 */
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

/**
 * Removes a tag from the taglist and updates recipes on page
 * @function deleteTags
 * @param {HTMLElement} option clicked advanced search option by the user
 * @returns {Array} list of remaining tags to be used for updating recipes and tags
 */
function deleteTags (option) {
  const tagTitle = option.previousElementSibling.innerText.toLowerCase()
  const newTagsArray = tags.filter((tag) => tag.title !== tagTitle)
  tags = newTagsArray
  updateGeneralSearch(tags)
  showTags(tags)
}

export { setTags, showTags, deleteTags }
