import { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  Home,
  Numbers,
  Coin,
  Dice,
  Wheel,
  Cards
} from 'views'
import './App.less';

const App = () => (
  <Router>
    <Suspense fallback={<div>Loading...</div>}>
      <div className='centering-flex'>
        <div className='app-content-container'>
          <Switch>
            <Route path="/numbers">
              <Numbers />
            </Route>
            <Route path="/coin">
              <Coin />
            </Route>
            <Route path="/dice">
              <Dice />
            </Route>
            <Route path="/wheel">
              <Wheel />
            </Route>
            <Route path="/cards">
              <Cards />
            </Route>
            <Route path="/">
              <Home />
            {/*<div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
            {/*<div>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
            {/*<div>Icons made by <a href="" title="Vectors Market">Vectors Market</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
            {/*<a href="https://www.freepik.com/free-photos-vectors/cards">Cards vector created by rawpixel.com - www.freepik.com</a>*/}
            {/*<div>Icons made by <a href="https://www.flaticon.com/authors/smashicons" title="Smashicons">Smashicons</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>*/}
            </Route>
          </Switch>
        </div>
      </div>
    </Suspense>
  </Router>
);

export default App;
