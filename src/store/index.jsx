import { configureStore } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import reducer from './modules';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [logger],
});

// sagaMiddleware.run(rootSaga);

export default store;
