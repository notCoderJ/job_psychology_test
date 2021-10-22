import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import persistedReducer from './modules';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: [logger],
});

// sagaMiddleware.run(rootSaga);

export default store;
