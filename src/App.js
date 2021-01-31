import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginLogistica from './login/components/Login'
import ProtectedRoutes from './routes/ProtectedRoutes'
import PublicRoutes from './routes/PublicRoutes'

//state redux global
import { Provider } from 'react-redux'
import store from './redux/store'
const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <PublicRoutes exact path="/login" component={LoginLogistica} />
          <ProtectedRoutes path="/dashboard" />
          <ProtectedRoutes exact path="/gerente" />
          <ProtectedRoutes path="/requerimientos" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
