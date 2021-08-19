import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PsyTest from './pages';
import store from './store';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exam">
          <Provider store={store}>
            <PsyTest />
          </Provider>
        </Route>
        <Route path="/completed/:seq">
          <Redirect to="/exam" />
        </Route>
        <Route path="/result/:seq">
          <Redirect to="/exam" />
        </Route>
        <Route path="/">
          <Redirect to="/exam" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
