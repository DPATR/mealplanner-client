'use strict'

const getFormFields = require('../../../lib/get-form-fields')
const authApi = require('./auth-api')
const authUi = require('./auth-ui')

const addHandlers = function () {
  // console.log('in events.js, addHandlers function')

  $('#sign-up').on('submit', onSignUp)
  $('#sign-in').on('submit', onSignIn)
  $('#change-password').on('submit', onChangePassword)
  $('#sign-out').on('submit', onSignOut)
  $('.btn-secondary').on('click', OnCancelModal)
  $('.external').on('click', onOpenHtml)
  $('#search').on('submit', onSearchGoogle)
}

const onSearchGoogle = function (event) {
  event.preventDefault()
  const name = this[0].value
  const location = this[1].value
  window.open('http://google.com/search?q=' + name + ' in ' + location)
  document.getElementById('googleTopicInput').value = ''
  document.getElementById('googleLocationInput').value = ''
}

const onOpenHtml = function (event) {
  event.preventDefault()
  const url = $(this).attr('href')
  window.open(url)
}

const onSignUp = function (event) {
  // console.log('in events.js, onSignUp')

  event.preventDefault()
  const data = getFormFields(this)
  authApi.signUp(data)
    .then(authUi.signUpSuccess)
    .then(() => authApi.signIn(data))
    .then(authUi.signInSuccess)
    .catch(authUi.signUpFailure)
}

const onSignIn = function (event) {
  // console.log('in events.js, onSignIn')

  event.preventDefault()
  const data = getFormFields(this)
  authApi.signIn(data)
    .then(authUi.signInSuccess)
    .catch(authUi.signInFailure)
}

const onChangePassword = function (event) {
  // console.log('in events.js, onChangePassword')

  event.preventDefault()
  const data = getFormFields(this)
  authApi.changePassword(data)
    .then(authUi.changePasswordSuccess)
    .catch(authUi.changePasswordFailure)
}

const onSignOut = function (event) {
  // console.log('in events.js, onSignOut')

  event.preventDefault()
  const data = getFormFields(this)
  authApi.signOut(data)
    .then(authUi.signOutSuccess)
    .catch(authUi.signOutFailure)
}

const OnCancelModal = function (event) {
  // console.log('in events.js, OnCancelModal')

  event.preventDefault()
  $('.modal').on('hidden.bs.modal', function () {
    $(this).find('form')[0].reset()
    $('.modal-message').text('')
  })
}

module.exports = {
  onSignUp,
  onSignIn,
  onChangePassword,
  onSignOut,
  OnCancelModal,
  addHandlers
}
