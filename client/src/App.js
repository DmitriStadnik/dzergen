import React from 'react';
import { Route, Switch } from "react-router-dom";
import styled from 'styled-components';
import Generator from './components/Generator';
import Collection from './components/Collection';
import Market from './components/Market';
import Auth from './components/Auth';
import Profile from './components/Profile';
import ScrollToTop from './components/ScrollToTop';
import Sidebar from './components/Sidebar';

const FlexWrapper = styled.div`
  display: flex;
  position: fixed;
  height: 100%;
  width: 100%;
`;

export default () => (
  <> 
    <FlexWrapper>
      <Sidebar />
      <Switch>
        <Route exact path="/" component={Generator} />
        <Route path="/collection/:id" component={Collection} />
        <Route path="/market/" component={Market} />
        <Route path="/user/:id" component={Profile} />
        <Route path="/auth/:type" component={Auth} />
      </Switch>
    </FlexWrapper>
    <ScrollToTop />
  </>
);
