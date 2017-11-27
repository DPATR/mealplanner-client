'use strict'

const getFormFields = require(`../../../lib/get-form-fields`)
const ingredientsApi = require('./ingredients-api.js')
const ingredientsUi = require('./ingredients-ui.js')
// const store = require('../store')

// initialize variables used for messages on screen
const initVariables = function () {
  $('#message').text('')
  $('.modal-message').text('')
  return true
}

const onAddIngredient = function (event) {
  console.log('in ingredients events, onAddIngredient')

  event.preventDefault()
  const data = getFormFields(this)
  initVariables()
  ingredientsApi.addNewIngredient(data)
    .then(ingredientsUi.addIngredientSuccess)
    .catch(ingredientsUi.addIngredientFailure)
}

const onGetIngredients = function () {
  console.log('in ingredients events, onGetIngredients')

  initVariables()
  ingredientsApi.getAllIngredients()
    .then(ingredientsUi.getIngredientsSuccess)
    .catch(ingredientsUi.getIngredientsFailure)
}

const OnCancelModal = function () {
  event.preventDefault()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-ingredient').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const onDeleteIngredient = function (event) {
  console.log('In ingredients-events.js')

  const ingredientId = event.target.getAttribute('id')
  // event.target is <button class="delete" type="button" data-id="9">

  console.log('In ingredients-events, ingredient id is ', ingredientId)

  ingredientsApi.deleteIngredient(ingredientId)
    .then(ingredientsUi.deleteIngredientSuccess)
    .catch(ingredientsUi.deleteIngredientFailure)
}

const onEditIngEvent = function (event) {
  console.log('in ingredients-events.js event.target is ', event.target)
  console.log('event.target.id is ', event.target.id)

  ingredientsApi.showIngredientById(event.target.id)
    .then(onShowIdForEditSuccess)
    .catch(onShowByIdForEditFailure)
}

const onShowIdForEditSuccess = function (response) {
  // $('#message').text('Single Record loaded')
  console.log('response is ', response)

  $('#edit-ingitem').modal('show')
  $('#ingredient').val(response.ingredient.ingredient)
  // // $('#event-update').on('submit', onEventUpdate)
}

const onShowByIdForEditFailure = function () {
  $('#message').text('Ingredient could not be displayed.')
  $('.modal-message').text('Ingredient details could not be loaded.  Make sure you are signed-in and try again.')
  $('.modal').on('hidden.bs.modal', function () {
    $('.modal-message').text('')
  })
}

const onExternalLink = function (event) {
  event.preventDefault()
  window.open(event.target.id, 'http://www.google.com')
}

const addHandlers = function () {
  $('#add-ingredient').on('submit', onAddIngredient)
  $('#getIngredients').on('click', onGetIngredients)
  $('.btn-secondary').on('click', OnCancelModal)
  $('.content').on('click', '.removeIngredientEvent', onDeleteIngredient)
  $('.content').on('click', '.externalLink', onExternalLink)
  // $('.content').on('click', '.editMealEvent', onEditMeal)
  $('.content').on('click', '.editIngEvent', onEditIngEvent)
  // $('#edit-meal').on('submit', onMealUpdate)
  $('#edit-ingredient').on('submit', ingredientsUi.onIngredientUpdate)
  //  submit-getall
}

module.exports = {
  addHandlers
}
