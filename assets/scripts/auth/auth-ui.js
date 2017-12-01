'use strict'

const store = require('../store')
const mealsApi = require('../meals/meals-api.js')
const mealsUi = require('../meals/meals-ui.js')

// NEXT 2 LINES ONLY TEMPORARY to get rid of temp errors
console.log(mealsApi)
console.log(mealsUi)
// PRIOR 2 LINES ONLY TEMPORARY to get rid of temp errors

const signUpSuccess = function () {
  console.log('in signUpSuccess ui.js')

  $('#register').modal('hide')
  $('#register').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
  })
  $('#signup').addClass('hidden')
}

const signUpFailure = function () {
  $('.modal-message').show()
  $('.modal-message').text('Unexpected error creating your account. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const signInSuccess = function (data) {
  console.log('in signInSuccess ui.js')

  store.user = data.user
  $('#register').modal('hide')
  $('#register').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
  })
  $('#login').modal('hide')
  $('#login').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
  })
  $('#signup').addClass('hidden')
  $('#log-in').addClass('hidden')
  $('#getMeals').addClass('hidden')
  $('#change-pw').removeClass('hidden')
  $('#log-out').removeClass('hidden')
  $('#create-meal').removeClass('hidden')
  $('#getIngredients').removeClass('hidden')
  $('#google_map').show()
  $('.topHeading').show()

  // $('body').css('background-image', 'none')
  $('body').css('background-image', 'url("https://i.imgur.com/OIHPtuV.jpg")')

  console.log('in auth-ui.js about to call getAllMeals')

  mealsApi.getAllMeals()
    .then(mealsUi.getMealsSuccess)
    .catch(mealsUi.getMealsFailure)
}

const signInFailure = function () {
  $('.modal-message').show()
  $('.modal-message').text('Unexpected error signing in. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const changePasswordSuccess = function (data) {
  console.log('in changePasswordSuccess ui.js')

  $('#message').text('Your password has been changed.')
  $('#message').show()
  setTimeout(function () { $('#message').fadeOut() }, 6000)
  $('#password-change').modal('hide')
  $('#password-change').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
  })
}

const changePasswordFailure = function () {
  $('.modal-message').show()
  $('.modal-message').text('Unexpected error changing your password. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

const signOutSuccess = function (data) {
  console.log('in signOutSuccess ui.js')

  $('#logout').modal('hide')
  $('#logout').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
  })
  $('#signup').removeClass('hidden')
  $('#log-in').removeClass('hidden')
  $('#change-pw').addClass('hidden')
  $('#log-out').addClass('hidden')
  $('#create-meal').addClass('hidden')
  $('#create-ingredient').addClass('hidden')
  $('#getIngredients').addClass('hidden')
  $('#getMeals').addClass('hidden')
  $('.topHeading2').addClass('hidden')
  $('.topHeading3').addClass('hidden')
  $('#google_map').hide()
  $('.topHeading').hide()

  // $('body').css('background-image', 'url("https://i.imgur.com/76TYS7S.jpg")')
  // $('body').css('background-image', 'url("https://i.imgur.com/hocs4oa.jpg")')
  // $('body').css('background-image', 'url("https://i.imgur.com/DqZo1AT.jpg")')
  $('body').css('background-image', 'url("https://i.imgur.com/sK3o13L.jpg")')
  $('.content').empty()
}

const signOutFailure = function () {
  $('.modal-message').show()
  $('.modal-message').text('Unexpected error signing out. Please try again.')
  setTimeout(function () { $('.modal-message').fadeOut() }, 6000)
}

module.exports = {
  signUpSuccess,
  signUpFailure,
  signInSuccess,
  signInFailure,
  changePasswordSuccess,
  changePasswordFailure,
  signOutSuccess,
  signOutFailure
}
