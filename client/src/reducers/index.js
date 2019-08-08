import {combineReducers} from 'redux';
import userReducer from './userReducer.js';
import pageReducer from './pageReducer.js';

export default combineReducers({
  userReducer,
  pageReducer
});
 
