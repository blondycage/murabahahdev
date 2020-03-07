import { combineReducers } from 'redux';
import shelfReducer from './shelf/reducer';
import cartReducer from './cart/reducer';
import totalReducer from './total/reducer';
import filtersReducer from './filters/reducer';
import sortReducer from './sort/reducer';
import sessionReducer from './firebasereducers/session';
import userReducer from './firebasereducers/user';
import messageReducer from './firebasereducers/message';
export default combineReducers({
  shelf: shelfReducer,
  cart: cartReducer,
  total: totalReducer,
  filters: filtersReducer,
  sort: sortReducer,
  sessionState: sessionReducer,
  userState: userReducer,
  messageState: messageReducer
});
