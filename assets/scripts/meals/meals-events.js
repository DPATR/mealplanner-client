'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
// const ingredientsApi = require('../ingredients/ingredients-api.js')
const mealsApi = require('./meals-api.js')
const mealsUi = require('./meals-ui.js')
const store = require('../store')

// initialize variables used for messages on screen
const initVariables = function () {
  $('#message').text('')
  $('.modal-message').text('')
  store.entree = ''
  store.side1 = ''
  store.side2 = ''
  return true
}

const c = function (pos) {
  const lat = pos.coords.latitude
  const long = pos.coords.longitude
  const coords = lat + ',' + long

  // const myGrocery = 'pizza'
  document.getElementById('google_map').setAttribute('src', 'https://maps.google.co.uk?q=' + coords + '&z=60&output=embed')

  console.log('in c function, coords = ', coords)
  // https://www.google.com/maps/place/Pizza@42.3746074,-70.989201
  // https://www.google.com/maps/search/?api=1&query=pizza+seattle+wa
  // https://www.google.com/maps/search/pizza/@42°21'10.9"N, 71°03'26.0"W
  // https://www.google.com/maps/search/green beans/@42°21'10.8"N, 71°03'25.7"W
  // https://www.google.com/maps/search/spanish omelet/@42°21'10.8"N, 71°03'25.7"W
  // https://www.google.com/maps/search/italian bread/@42.3566423,-71.0557196,15z
  // https://www.google.com/maps/search/baked haddock/@42.3566423,-71.0557196,15z
  store.coords = coords
}
const onGetCurrentPosition = function (event) {
  console.log('in onGetCurrentPosition')
  navigator.geolocation.getCurrentPosition(c)
}

const onAddMeal = function (event) {
  console.log('in meals events, onAddMeal')

  event.preventDefault()
  const data = getFormFields(this)
  initVariables()
  mealsApi.addNewMeal(data)
    .then(mealsUi.addMealSuccess)
    .catch(mealsUi.addMealFailure)
}

const onGetMeals = function () {
  // console.log('in meals events, onGetMeals')

  initVariables()
  mealsApi.getAllMeals()
    .then(mealsUi.getMealsSuccess)
    .catch(mealsUi.getMealsFailure)
}

const OnCancelModal = function () {
  event.preventDefault()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-meal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const onDeleteMeal = function (event) {
  // console.log('In meals-events.js')

  const mealId = event.target.getAttribute('id')
  // event.target is <button class="delete" type="button" data-id="9">

  // console.log('In meal-events, meal id is ', mealId)

  mealsApi.deleteMeal(mealId)
    .then(mealsUi.deleteMealSuccess)
    .then(() => mealsApi.getAllMeals())
    .then(mealsUi.getMealsSuccess)
    .catch(mealsUi.deleteMealFailure)
}

const onEditEvent = function (event) {
  // console.log('in meals-events.js event.target is ', event.target)
  // console.log('event.target.id is ', event.target.id)

  mealsApi.showMealById(event.target.id)
    .then(onShowIdForEditSuccess)
    .catch(onShowByIdForEditFailure)
}

const onShowIdForEditSuccess = function (response) {
  // $('#message').text('Single Record loaded')
  // console.log('response is ', response)

  $('#edit-mealitem').modal('show') //
  $('#weekday').val(response.meal.weekday) //
  $('#mealtype').val(response.meal.mealtype) //
  $('#entree').val(response.meal.entree) //
  $('#side1').val(response.meal.side1) //
  $('#side2').val(response.meal.side2) //
  // // $('#event-update').on('submit', onEventUpdate)
}

const onShowByIdForEditFailure = function () {
  $('#message').text('Meal could not be displayed.')
  $('.modal-message').text('Meal details could not be loaded.  Make sure you are signed-in and try again.')
  $('.modal').on('hidden.bs.modal', function () {
    $('.modal-message').text('')
  })
}

const onExternalLink = function (event) {
  event.preventDefault()
  window.open(event.target.id, 'https://www.epicurious.com/search/')
}

const addHandlers = function () {
  $('#add-meal').on('submit', onAddMeal)
  $('#getMeals').on('click', onGetMeals)
  $('#get_location').on('click', onGetCurrentPosition)
  $('.btn-secondary').on('click', OnCancelModal)
  $('.content').on('click', '.removeMealEvent', onDeleteMeal)
  $('.content').on('click', '.externalLink', onExternalLink)
  // $('.content').on('click', '.editMealEvent', onEditMeal)
  $('.content').on('click', '.editEvent', onEditEvent)
  // $('#edit-meal').on('submit', onMealUpdate)
  $('#edit-meal').on('submit', mealsUi.onMealUpdate)
  //  submit-getall
}

module.exports = {
  addHandlers
}
