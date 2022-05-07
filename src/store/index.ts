import { createBrowserHistory } from 'history';
import { configureStore } from '@reduxjs/toolkit';
import reduxReset from 'redux-reset';
import createSagaMiddleware from 'redux-saga';
import { persistStore } from 'redux-persist';
import persistedReducer from './modules';
import rootSaga from './saga';

const customHistory = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware({
  context: { history: customHistory },
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
  enhancers: [reduxReset()],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

export { persistor, customHistory };
export default store;
