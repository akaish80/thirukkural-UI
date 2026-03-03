import { configureStore } from '@reduxjs/toolkit';
import contentReducer from './content/content.slice'; // see next step for slice creation
import userReducer from './user/user.slice';
import kurralReducer from './kurral/kurral.slice';

const store = configureStore({
  reducer: {
    content: contentReducer,
    user: userReducer,
    kurral: kurralReducer,
  },
  // Redux DevTools and thunk middleware are included by default
});

export default store;
