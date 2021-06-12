import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Home,
  Other
} from 'views'
import './App.css';

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/other">
          <Other />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
