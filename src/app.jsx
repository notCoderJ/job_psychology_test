import React from 'react';
import './app.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import PsyTestPage from './pages';
import store from './store';
import PsyTestCompletedPage from './pages/completed/completedPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exam">
          <Provider store={store}>
            <PsyTestPage />
          </Provider>
        </Route>
        <Route path="/completed/:seq">
          <PsyTestCompletedPage />
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
