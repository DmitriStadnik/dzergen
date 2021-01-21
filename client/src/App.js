import React from 'react';
import { Route, Switch } from "react-router-dom";
import Generator from './components/Generator';
import Collection from './components/Collection';
import Market from './components/Market';
import Missions from './components/Missions';
import Auth from './components/Auth';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

export default () => (
  <> 
    <Sidebar />
    <Switch>
      <Route exact path="/" component={Generator} />
      // <Route path="/collection/:id" component={Collection} />
      // <Route path="/market/" component={Market} />
      // <Route path="/user/:id" component={Profile} />
      // <Route path="/missions/:id" component={Missions} />
      // <Route path="/auth/:type" component={Auth} />
    </Switch>
    <ScrollToTop />
  </>
);
