import React from 'react';
import './app.css';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import MainPage from './components/main';
import TestPage from './components/test';
import PsychologyTestComplete from './components/complete';
import PsychologyTestResult from './components/result';
import store, { persistor, customHistory } from './store';

function App() {
  return (
    <Router history={customHistory}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/test">
              <TestPage />
            </Route>
            <Route path="/complete">
              <PsychologyTestComplete />
            </Route>
            <Route path="/result">
              <PsychologyTestResult />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </PersistGate>
      </Provider>
    </Router>
  );
}

export default App;
