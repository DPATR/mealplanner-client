'use strict'

const config = require('../config')
const store = require('../store')

const addNewMeal = function (data) {
  console.log('In meals-api addNewMeal')

  console.log('In meals-api addNewMeal, data is ', data)
  console.log('data.meal.entree is ', data.meal.entree)
  console.log('data.meal.entree is ', data.meal.side1)
  console.log('data.meal.entree is ', data.meal.side2)

  store.entree = data.meal.entree
  store.side1 = data.meal.side1
  store.side2 = data.meal.side2

  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const addMealIngredient = function (data) {
  console.log('In meals-api addMealIngredient')

  console.log('data is ', data)

  return $.ajax({
    url: config.apiOrigin + '/ingredients',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

const getAllMeals = function () {
  console.log('in meals-api getAllMeals')

  return $.ajax({
    url: config.apiOrigin + '/meals',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const deleteMeal = function (mealId) {
  // console.log('In meals-api.js')

  return $.ajax({
    url: config.apiOrigin + '/meals/' + mealId,
    method: 'DELETE',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const showMealById = function (id) {
  // console.log('in meals-api.js id is ', id)

  store.currentID = id
  return $.ajax({
    url: config.apiOrigin + '/meals/' + id,
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + store.user.token
    }
  })
}

const updateMeal = function (data) {
  // console.log('in meals-api.js updateMeal')
  // console.log('data is ', data)

  return $.ajax({
    url: config.apiOrigin + '/meals/' + store.currentID,
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + store.user.token
    },
    data
  })
}

module.exports = {
  addNewMeal,
  addMealIngredient,
  getAllMeals,
  deleteMeal,
  showMealById,
  updateMeal
}
