import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Home,
  Numbers
} from 'views'
import './App.less';

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route path="/numbers">
          <Numbers />
        </Route>
        <Route path="/">
          <Home />
        {/*<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
        </Route>
      </Switch>
    </Suspense>
  </Router>
);

export default App;
