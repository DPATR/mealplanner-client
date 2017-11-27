'use strict'

const mealsApi = require('./meals-api.js')

const showEventsTemplate = require('../templates/meals-list.handlebars')

const getFormFields = require(`../../../lib/get-form-fields`)

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
  mealsApi.getAllMeals()
    .then(getMealsSuccess)
    .catch(getMealsFailure)
}

const addMealFailure = function () {
  $('#message').text('Unexpected error creating your experience. Please try again.')
  $('#message').show()
  setTimeout(function () { $('#message').text('') }, 4000)
  $('#new-experience').modal('hide')
  $('#new-experience').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

const getMealsSuccess = function (data) {
  // console.log('in meals-ui.js getMealsSuccess')

  // data.experiences.map((experiences) => {
  //   switch (experiences.eventType) {
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
  //     default:
  //       experiences.url = 'http://google.com/search?q=' + experiences.name
  //       experiences.label = 'Search Google to get started'
  //   }
  // })
  $('#list-content').empty()
  const showEventsHtml = showEventsTemplate({meals: data.meals})
  $('.content').html(showEventsHtml)
}

const getMealsFailure = function () {
  $('#message').text('Unexpected error retrieving data for this experience. Please try again.')
}

const deleteExperienceSuccess = function () {
  mealsApi.getAllMeals()
    .then(getMealsSuccess)
    .catch(getMealsFailure)
}

const deleteExperienceFailure = function () {
  $('#message').show()
  $('#message').text('Unexpected error deleting your experience. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const onMealUpdate = function (event) {
  // console.log('in meals-ui.js onMealUpdate')

  event.preventDefault()
  const data = getFormFields(this)
  console.log('event.target is', event.target)
  console.log('event.target.id is', event.target.id)
  console.log('data is ', data)
  console.log('data.meal is ', data.meal)
  // const currentMealID = $(this).data('id')
  // console.log(this.data('id'))
  // console.log('currentMealID is ', currentMealID)

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
  deleteExperienceSuccess,
  deleteExperienceFailure,
  onUpdateSuccess,
  onUpdateFailure,
  onMealUpdate
}
