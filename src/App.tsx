import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Navbar,
  Home,
  Numbers,
  Coin,
  Wheel,
  Dice
} from 'views'
import './App.less';

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <div className='centering-flex'>
        <div className='app-content-container'>
          <Navbar/>
          <div className='p-3'>
            <Switch>
              <Route path="/numbers">
                <Numbers />
              </Route>
              <Route path="/coin">
                <Coin />
              </Route>
              <Route path="/wheel">
                <Wheel />
              </Route>
              <Route path="/dice">
                <Dice />
              </Route>
              <Route path="/">
                <Home />
              {/*<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
              {/*<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
              {/*<div>Icons made by <a href="" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
              </Route>
            </Switch>
          </div>
        </div>
      </div>
    </Suspense>
  </Router>
);

export default App;
