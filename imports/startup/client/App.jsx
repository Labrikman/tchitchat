import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MyRoute        from '/imports/ui/components/MyRoute';
import Inscription    from '/imports/ui/modules/Inscription';
import Connection     from '/imports/ui/modules/Connection';
import Missing        from '/imports/ui/modules/Missing';
import Rooms          from '/imports/ui/modules/Rooms';
import UserConnected  from '/imports/ui/modules/UserConnected';
import Tchat          from '/imports/ui/modules/Tchat';
import Setting        from '/imports/ui/modules/Setting';
import { Verify }     from 'crypto';

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/account/signup"         component={Inscription}      />
      <MyRoute path="/account/signin"         component={Connection}       />
      <MyRoute path="/account/missing"        component={Missing}          />
      <MyRoute path="/account/setting"        component={Setting}          />
      <MyRoute path="/account/verify"         component={Verify}           />  
      <MyRoute path="/rooms"              component={Rooms}         logged />
      <MyRoute path="/user-connected"     component={UserConnected} logged />
      <MyRoute path="/tchat"              component={Tchat}         logged />
      <MyRoute path="/landing"            component={landing}         logged />
      <MyRoute path="/"                   component={Rooms}         logged />
    </Switch>
  </Router>
);

export default App;
