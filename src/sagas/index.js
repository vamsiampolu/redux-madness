import loginSaga from './loginSaga'
export default function * rootSaga () {
  yield [
    loginSaga()
  ]
}
