import { all, call } from 'redux-saga/effects';
import { kurralSagas } from './kurral/kurral.sagas';
// import { userSagas } from './user/user.sagas';
// import { cartSagas } from './cart/cart.sagas';

export default function* rootSaga() {
  yield all([call(kurralSagas)]);
}
