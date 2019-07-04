import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MyRoute        from '/imports/ui/components/MyRoute';
import Home           from '/imports/ui/modules/Home';
import Inscription    from '/imports/ui/modules/Inscription';
import Connection     from '/imports/ui/modules/Connection';
import Missing        from '/imports/ui/modules/Missing';
import Rooms          from '/imports/ui/modules/Rooms';
import UserConnected  from '/imports/ui/modules/UserConnected';
import Tchat          from '/imports/ui/modules/Tchat';
import Setting        from '/imports/ui/modules/Setting';

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/home"           component={Home}          logged />
      <MyRoute path="/signup"         component={Inscription}          />
      <MyRoute path="/signin"         component={Connection}           />
      <MyRoute path="/missing"        component={Missing}              />  
      <MyRoute path="/rooms"          component={Rooms}         logged />
      <MyRoute path="/user-connected" component={UserConnected} logged />
      <MyRoute path="/tchat"          component={Tchat}         logged />
      <MyRoute path="/setting"        component={Setting}       logged />
    </Switch>
  </Router>
);

export default App;
