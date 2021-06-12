import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Home,
  Other
} from 'views'
import './App.css';

const App = () => (
  <Router>
    <Switch>
      <Route path="/other">
        <Other />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
