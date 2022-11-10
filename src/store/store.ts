import { applyMiddleware, createStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk));

const store = createStore(rootReducer, composedEnhancer);

export type RootReducer = ReturnType<typeof rootReducer>;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
