'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const mealsApi = require('./meals-api.js')
const mealsUi = require('./meals-ui.js')
// const store = require('../store')

// initialize variables used for messages on screen
const initVariables = function () {
  $('#message').text('')
  $('.modal-message').text('')
  return true
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

const OnCancelModal = function () {
  event.preventDefault()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-meal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const onDeleteMeal = function (event) {
  console.log('In meals-events.js')

  const mealId = event.target.getAttribute('id')
  // event.target is <button class="delete" type="button" data-id="9">

  console.log('In meal-events, meal id is ', mealId)

  mealsApi.deleteMeal(mealId)
    .then(mealsUi.deleteMealSuccess)
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
  window.open(event.target.id, 'http://www.google.com')
}

const addHandlers = function () {
  $('#add-meal').on('submit', onAddMeal)
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