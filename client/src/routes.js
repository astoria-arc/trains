import React from 'react';
import { Switch, Route } from 'react-router';
import TrainsIndex from './components/trains/TrainsIndex';

const routes = (
  <div>
    <Switch>
      <Route path='/' component={TrainsIndex} />
    </Switch>
  </div>
)

export default routes;
