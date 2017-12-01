'use strict'

const config = require('../config')
const store = require('../store')

const addNewIngredient = function (data) {
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
  return $.ajax({
    url: config.apiOrigin + '/ingredients',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteIngredient = function (ingredientId) {
  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + ingredientId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showIngredientById = function (id) {
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
  return $.ajax({
    url: config.apiOrigin + '/ingredients/' + store.currentIngredientID,
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
