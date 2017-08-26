// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/app';

// Containers
import Home from './containers/Home';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </App>;

export default AppRoutes;
