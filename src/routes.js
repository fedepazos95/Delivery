// Dependencies
import React from 'react';
import { Route, Switch } from 'react-router-dom';

// Components
import App from './components/App';

// Containers
import Home from './containers/Home';
import Deliveries from './containers/Deliveries';

const AppRoutes = () =>
  <App>
    <Switch>
      <Route exact path="/deliveries" component={Deliveries} />
      <Route component={Home}/>
    </Switch>
  </App>;

export default AppRoutes;
