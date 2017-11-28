'use strict'

const ingredientsApi = require('./ingredients-api.js')
const showEventsTemplate = require('../templates/ingredients-list.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)
const store = require('../store')

const addIngredientSuccess = function (data) {
  console.log('in ingredients-ui addIngredientSuccess')

  $('#message').text('Your new grocery item was added!')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-ingredient').modal('hide')
  $('#nnew-ingredient').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
  ingredientsApi.getAllIngredients()
    .then(getIngredientsSuccess)
    .catch(getIngredientsFailure)
}

const addIngredientFailure = function () {
  $('#message').text('Unexpected error creating your grocery item. Please try again.')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-ingredient').modal('hide')
  $('#new-ingredient').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const getIngredientsSuccess = function (data) {
// const getIngredientsSuccess = function () {
  console.log('in ingredients-ui.js getIngredientsSuccess')
  console.log('data is ', data)

  $('#create-meal').addClass('hidden')
  $('#getIngredients').addClass('hidden')
  $('.topHeading2').addClass('hidden')
  $('#searchLocation').addClass('hidden')
  $('.topHeading3').removeClass('hidden')
  $('#create-ingredient').removeClass('hidden')
  $('#getMeals').removeClass('hidden')

  const searchText = 'grocery stores'
  // const searchText2 = ' carrying '
  const location = store.currentLocation
  // const location = document.getElementById('googleLocationInput').value

  console.log('searchText is ', searchText)
  // console.log('searchText2 is ', searchText2)
  console.log('location is ', location)

  data.ingredients.map((ingredients) => {
    switch (ingredients.ingredient) {
    // case 'Book':
    //   experiences.url = 'https://www.goodreads.com/'
    //   experiences.label = 'Go to Goodread s'
    //   break
    // case 'Movie':
    //   experiences.url = 'https://www.fandango.com/'
    //   experiences.label = 'Go to Fandango'
    //   break
    // case 'Relaxation':
    //   experiences.url = 'https://www.tripadvisor.com/'
    //   experiences.label = 'Go to Tripadvisor to get started'
    //   break
      default:
        // ingredients.url = 'http://google.com/search?q=' + searchText + ' in ' + location + searchText2 + ingredients.ingredient
        ingredients.url = 'http://google.com/search?q=' + searchText + ' in ' + location + ' ' + ingredients.ingredient
        ingredients.label = 'Search Stores Near Me'
    }
  })
  $('#list-content').empty()
  const showEventsHtml = showEventsTemplate({ingredients: data.ingredients})
  $('.content').html(showEventsHtml)
}

const getIngredientsFailure = function () {
  $('#message').text('Unexpected error retrieving data for this grocery item. Please try again.')
}

const deleteIngredientSuccess = function () {
  ingredientsApi.getAllIngredients()
    .then(getIngredientsSuccess)
    .catch(getIngredientsFailure)
}

const deleteIngredientFailure = function () {
  $('#message').show()
  $('#message').text('Unexpected error deleting your grocery item. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const onIngredientUpdate = function (event) {
  console.log('in ingredients-ui.js onIngredientUpdate')

  event.preventDefault()
  const data = getFormFields(this)
  console.log('event.target is', event.target)
  console.log('event.target.id is', event.target.id)
  console.log('data is ', data)
  console.log('data.ingredient is ', data.ingredient)

  // if (!data.experience.hasOwnProperty('completed')) {
  //   data.experience.completed = false
  // }
  ingredientsApi.updateIngredient(data) // removed ID
    .then(onUpdateSuccess)
    .catch(onUpdateFailure)
}

const onUpdateSuccess = function () {
  console.log('in ingredients-ui.js onUpdateSuccess')

  $('#message').text('Your grocery item was updated!')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#edit-ingitem').modal('hide')
  $('#edit-ingitem').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
  ingredientsApi.getAllIngredients()
    .then(getIngredientsSuccess)
    .catch(getIngredientsFailure)
}

const onUpdateFailure = function () {
  $('#message').text('Unexpected error updating your grocery item. Please confirm you are signed-in and try again')
  $('.modal-message').text('Unexpected error updating your grocery item. Please confirm you are signed-in and try again')
  $('.modal').on('hidden.bs.modal', function () {
    $('.modal-message').text('')
  })
}

module.exports = {
  addIngredientSuccess,
  addIngredientFailure,
  getIngredientsSuccess,
  getIngredientsFailure,
  deleteIngredientSuccess,
  deleteIngredientFailure,
  onUpdateSuccess,
  onUpdateFailure,
  onIngredientUpdate
}
