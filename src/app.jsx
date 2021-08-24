import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PsychologyTest from './components/test';
import PsychologyTestComplete from './components/complete';
import store from './store';
import PsychologyTestResult from './components/result';

// TODO: Provider 위치 결정하기!!
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exam">
          <Provider store={store}>
            <PsychologyTest />
          </Provider>
        </Route>
        <Route path="/complete/:seq">
          <PsychologyTestComplete />
        </Route>
        <Route path="/result/:seq">
          <PsychologyTestResult />
        </Route>
        <Route path="/">
          <Redirect to="/exam" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
