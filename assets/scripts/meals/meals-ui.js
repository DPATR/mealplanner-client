'use strict'

// const ingredientsApi = require('../ingredients/ingredients-api.js')
// const ingredientsUi = require('../ingredients/ingredients-ui.js')
const mealsApi = require('./meals-api.js')
const showEventsTemplate = require('../templates/meals-list.handlebars')
const getFormFields = require(`../../../lib/get-form-fields`)

const store = require('../store')

const addIngredientsFromMeal = function () {
  let newGroceryItem = false

  // console.log('newGroceryItem is ', newGroceryItem)

  if (store.entree) {
    const newElement = store.entree
    // console.log('store.entree is ', newElement)
    newGroceryItem = true
    buildNewGroceryItem(newElement)
  }
  if (store.side1) {
    const newElement = store.side1
    // console.log('store.side1 is ', newElement)
    newGroceryItem = true
    buildNewGroceryItem(newElement)
  }
  if (store.side2) {
    const newElement = store.side2
    // console.log('store.side2 is ', newElement)
    newGroceryItem = true
    buildNewGroceryItem(newElement)
  }
}
//
const buildNewGroceryItem = function (element) {
  // console.log('in buildNewGroceryItem, element = ', element)

  const newIngredientData = {
    'ingredient': {
      'ingredient': element
    }
  }
  // console.log('newIngredientData is ', newIngredientData)

  mealsApi.addMealIngredient(newIngredientData)
    .then(addMealIngredientSuccess)
    .catch(addMealIngredientFailure)
}

const addMealIngredientSuccess = function (data) {
  // console.log('in meals-ui addMealIngredientsSuccess')

  $('#message').text('Your new meal item was added!')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  // $('#new-meal').modal('hide')
  // $('#new-meal').on('hidden.bs.modal', function () {
  //   $(this).find('form')[0].reset()
  //   $('.modal-message').text('')
  // })
}

const addMealIngredientFailure = function () {
  $('#message').text('Unexpected error creating your meal item.')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
}

const addMealSuccess = function (data) {
  // console.log('in meals-ui addMealSuccess')

  $('#message').text('Your new meal was added!')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-meal').modal('hide')
  $('#new-meal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })

  addIngredientsFromMeal()

  mealsApi.getAllMeals()
    .then(getMealsSuccess)
    .catch(getMealsFailure)
}

const addMealFailure = function () {
  $('#message').text('Unexpected error creating your meal. Please try again.')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-meal').modal('hide')
  $('#new-meal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const getMealsSuccess = function (data) {
  // console.log('in meals-ui.js getMealsSuccess')

  $('.topHeading3').addClass('hidden')
  $('#create-ingredient').addClass('hidden')
  $('#getMeals').addClass('hidden')
  $('#searchLocation').removeClass('hidden')
  $('.topHeading2').removeClass('hidden')
  $('#getIngredients').removeClass('hidden')
  $('#create-meal').removeClass('hidden')

  data.meals.map((meals) => {
    switch (meals.entree) {
      //     case 'Book':
      //       experiences.url = 'https://www.goodreads.com/'
      //       experiences.label = 'Go to Goodreads'
      //       break
      //     case 'Movie':
      //       experiences.url = 'https://www.fandango.com/'
      //       experiences.label = 'Go to Fandango'
      //       break
      //     case 'Relaxation':
      //       experiences.url = 'https://www.tripadvisor.com/'
      //       experiences.label = 'Go to Tripadvisor to get started'
      //       break
      default:
        meals.url = 'https://www.epicurious.com/search/' + meals.entree
        meals.label = 'Recipes '
    }
  })
  $('#list-content').empty()
  const showEventsHtml = showEventsTemplate({meals: data.meals})
  $('.content').html(showEventsHtml)
}

const getMealsFailure = function () {
  $('#message').text('Unexpected error retrieving data for this meal. Please try again.')
}

const deleteMealSuccess = function () {
  // console.log('in deleteMealSuccess')

  mealsApi.getAllMeals()
    .then(getMealsSuccess)
    .catch(getMealsFailure)
}

const deleteMealFailure = function () {
  // console.log('in deleteMealFailure')

  $('#message').show()
  $('#message').text('Unexpected error deleting your meal. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const onMealUpdate = function (event) {
  // console.log('in meals-ui.js onMealUpdate')

  event.preventDefault()
  const data = getFormFields(this)
  // if (!data.experience.hasOwnProperty('completed')) {
  //   data.experience.completed = false
  // }
  mealsApi.updateMeal(data) // removed ID
    .then(onUpdateSuccess)
    .catch(onUpdateFailure)
}

const onUpdateSuccess = function () {
  // console.log('in meals-ui.js onUpdateSuccess')

  $('#message').text('Your meal was updated!')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#edit-mealitem').modal('hide')
  $('#edit-mealitem').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
  mealsApi.getAllMeals()
    .then(getMealsSuccess)
    .catch(getMealsFailure)
}

const onUpdateFailure = function () {
  $('#message').text('Unexpected error updating your meal. Please confirm you are signed-in and try again')
  $('.modal-message').text('Unexpected error updating your meal. Please confirm you are signed-in and try again')
  $('.modal').on('hidden.bs.modal', function () {
    $('.modal-message').text('')
  })
}

module.exports = {
  addMealSuccess,
  addMealFailure,
  getMealsSuccess,
  getMealsFailure,
  deleteMealSuccess,
  deleteMealFailure,
  onUpdateSuccess,
  onUpdateFailure,
  onMealUpdate
}
