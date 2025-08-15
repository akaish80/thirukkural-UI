import { combineReducers } from 'redux';
import kurralReducer from './kurral/kurral.reducer';
import userReducer from './user/user-reducer';

// import userReducer from './user/user.reducer';
// import cartReducer from './cart/cart.reducer';
// import directoryReducer from './directory/directory.reducers';
// import shopReducer from './shop/shop.reducer';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['cart'],
// };

const rootReducer = combineReducers({
  kurralMaster: kurralReducer,
  userData: userReducer,
  //   cart: cartReducer,
  //   directory: directoryReducer,
  //   shop: shopReducer,
});

export default rootReducer;