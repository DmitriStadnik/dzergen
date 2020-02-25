import React from 'react';
import { Route, Switch } from "react-router-dom";
import Generator from './components/Generator';
import Collection from './components/Collection';
import Auth from './components/Auth';
import Header from './components/Header';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';

export default () => (
  <> 
    <Header />
    <Switch>
      <Route exact path="/" component={Generator} />
      <Route path="/collection/:id" component={Collection} />
      <Route path="/user/:id" component={Profile} />
      <Route path="/auth/:type" component={Auth} />
    </Switch>
    <ScrollToTop />
  </>
);
