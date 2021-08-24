import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import reducer from './reducer';
// import createSagaMiddleware from 'redux-saga';

// const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [logger],
});

// sagaMiddleware.run(rootSaga);

export default store;
