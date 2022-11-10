import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
// import { composeWithDevTools } from '@reduxjs/toolkit/dist/devtoolsExtension';

// const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));

const store = configureStore({
  reducer: rootReducer,
  // composedEnhancer,
});

export default store;
