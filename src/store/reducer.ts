import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  apiStateData: apiReducer,
  formStateData: formReducer,
});

export default rootReducer;
