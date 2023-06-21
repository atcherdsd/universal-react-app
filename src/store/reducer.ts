import { combineReducers } from '@reduxjs/toolkit';
import apiReducer from './apiSlice';

const rootReducer = combineReducers({
  apiStateData: apiReducer,
});

export default rootReducer;
