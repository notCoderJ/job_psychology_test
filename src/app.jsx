import React from "react";
import "./app.css";
import PsyExamProvider from './context/psyexam_context';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Exam from './pages/exam_page';


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/exam">
          <PsyExamProvider>
            <Exam />
          </PsyExamProvider>
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