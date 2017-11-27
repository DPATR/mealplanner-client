'use strict'

const config = require('../config')
const store = require('../store')

const addNewIngredient = function (data) {
  // console.log('In ingredients-api addNewIngredient')

  return $.ajax({
    url: config.apiOrigin + '/ingredients',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getAllIngredients = function () {
  // console.log('in ingredients-api getAllIngredients')

  return $.ajax({
    url: config.apiOrigin + '/ingredients',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteIngredient = function (ingredientId) {
  // console.log('In ingredients-api.js')

  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + ingredientId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showIngredientById = function (id) {
  // console.log('in ingredients-api.js id is ', id)

  store.currentIngredientID = id
  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateIngredient = function (data) {
  // console.log('in ingredients-api.js updateIngredient')
  // console.log('data is ', data)

  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + store.currentID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  addNewIngredient,
  getAllIngredients,
  deleteIngredient,
  showIngredientById,
  updateIngredient
}
