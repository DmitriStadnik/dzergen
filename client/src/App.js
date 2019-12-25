import React from 'react';
import { Route, Switch } from "react-router-dom";
import Generator from './components/Generator';
import Collection from './components/Collection';
import Auth from './components/Auth';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

export default () => (
  <> 
    <Header />
    <Switch>
      <Route exact path="/" component={Generator} />
      <Route path="/collection" component={Collection} />
      <Route path="/auth/:type" component={Auth} />
    </Switch>
    <ScrollToTop />
  </>
);
