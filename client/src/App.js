import React from 'react';
import { Route, Switch } from "react-router-dom";
import Generator from './components/Generator';
import Collection from './components/Collection';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

export default () => (
  <>
    <Header />
    <Switch>
      <Route exact path="/" component={Generator} />
      <Route path="/collection" component={Collection} />
    </Switch>
    <ScrollToTop />
  </>
);
