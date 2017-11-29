'use strict'

const setAPIOrigin = require('../../lib/set-api-origin')
const config = require('./config')
const auth = require('./auth/auth-events')
const mealEvents = require('./meals/meals-events')
const ingredientEvents = require('./ingredients/ingredients-events')

// document read (this is the page load function)
$(() => {
  setAPIOrigin(location, config)
})

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

// mealEvents.onGetCurrentPosition() => initializes my map to get current location
// on page load!
$(() => {
  auth.addHandlers()
  mealEvents.addHandlers()
  ingredientEvents.addHandlers()
  mealEvents.onGetCurrentPosition()
})
