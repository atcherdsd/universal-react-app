import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';
import formReducer from './formSlice';

const rootReducer = combineReducers({
  api: apiReducer,
  form: formReducer,
});

export default rootReducer;
