import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import reduxReset from 'redux-reset';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import { persistStore } from 'redux-persist';
import persistedReducer, { rootSaga } from './modules';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: { history: customHistory },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware, logger],
  enhancers: [reduxReset()],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);
persistor.pause();

export { persistor, customHistory };
export default store;
