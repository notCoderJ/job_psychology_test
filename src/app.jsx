import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PsychologyTestComplete from './components/complete';
import PsychologyTestResult from './components/result';
import store from './store';
import MainPage from './components/main';
import TestPage from './components/test';

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/test">
            <TestPage />
          </Route>
          <Route path="/result/:seq">
            <PsychologyTestResult />
          </Route>
          <Route path="/complete/:seq">
            <PsychologyTestComplete />
          </Route>
          <Route path="/result/:seq">
            <PsychologyTestResult />
          </Route>
          <Route path="*">
            {/* TODO: Add 404 Not found */}
            {/* <Redirect to="/" /> */}
          </Route>
        </Switch>
      </Provider>
    </Router>
  );
}

export default App;
