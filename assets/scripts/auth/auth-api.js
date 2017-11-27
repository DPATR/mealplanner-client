'use strict'

const config = require('../config')
const store = require('../store')

const signUp = function (data) {
  console.log('in signUp api.js')

  return $.ajax({
    url: config.apiOrigin + '/sign-up',
    method: 'POST',
    data
  })
}

const signIn = function (data) {
  console.log('in signIn api.js')

  return $.ajax({
    url: config.apiOrigin + '/sign-in',
    method: 'POST',
    data
  })
}

const changePassword = function (data) {
  console.log('in changePassword api.js')

  return $.ajax({
    url: config.apiOrigin + '/change-password/' + store.user.id,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const signOut = function () {
  console.log('in signOut api.js')

  return $.ajax({
    url: config.apiOrigin + '/sign-out/' + store.user.id,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

module.exports = {
  signUp,
  signIn,
  changePassword,
  signOut
}
