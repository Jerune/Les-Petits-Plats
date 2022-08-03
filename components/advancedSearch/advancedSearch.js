// @ts-nocheck

function showAdvancedSearchOptions (advancedSearchOptions, type) {
  const list = document.getElementById(type)
  let listItems = ''
  advancedSearchOptions[type].forEach((element) => {
    listItems += `<li class="p-0 me-2">${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
  })
  if (listItems.length > 0) {
    list.innerHTML = listItems
    list.classList.remove('d-none')
    list.classList.add('d-flex')
    console.log(document.getElementById(type))
  }
}

export { showAdvancedSearchOptions }
