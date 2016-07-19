//
// also we need to dispatch actions and set up a redux store for our fake login.
//

const EMAIL = 'joe@example.com'
const PASSWORD = 'password1'

export function generateToken () {
  return Math.random().toString(36).substring(7)
}

// fn is a function with no arguments,
// once it is

function delay (time) {
  var promise = new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
  return promise
}

function checkCredentials (email, password) {
  return email === EMAIL && password === PASSWORD ? {authenticated: true, token: generateToken()} : {authenticated: false}
}

export function login (email, password) {
  return delay(0)
    .then(checkCredentials)
    .catch(error => {
      throw error
    })
}

export function logout () {
  window.localStorage.token = null
}

export function setToken (token) {
  window.localStorage.token = token
}

export function getToken () {
  return window.localStorage.token
}

export function isLoggedIn () {
  return !!window.localStorage.token
}

/*
  1. a Promise based fake login API,
     react-router only uses the onChange callback because it uses setState
     first things first, wrap setTimeout in a Promise call it delay
  2. a redux store and redux-actions for using our fake login API:

      LOGIN
      LOGIN_SUCCESS
      LOGIN_FAILURE
      REQUIRE_LOGIN
      LOGOUT

  3. this means that we need to connect redux with react-router

  4. we need a mechanism to manage the authentication flow without using too many thunks...
     what should we do `onEnter` and `onLeave`
 */
