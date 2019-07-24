import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MyRoute        from '/imports/ui/components/MyRoute';
import Inscription    from '/imports/ui/modules/Inscription';
import Connection     from '/imports/ui/modules/Connection';
import Missing        from '/imports/ui/modules/Missing';
import Rooms          from '/imports/ui/modules/Rooms';
import UserConnected  from '/imports/ui/modules/UserConnected';
import Room        from '/imports/ui/modules/Room';
import Setting        from '/imports/ui/modules/Setting';
import NewRoom        from '/imports/ui/modules/NewRoom';

const App = () => (
  <Router>
    <Switch>
      <MyRoute path="/account/signup"         component={Inscription}   />
      <MyRoute path="/account/signin"         component={Connection}    />
      <MyRoute path="/account/missing"        component={Missing}       />
      <MyRoute path="/account/setting"        component={Setting}       logged/>
      <MyRoute path="/new-room/add"           component={NewRoom}       logged/>
      <MyRoute path="/new-room/edit/:id"      component={NewRoom}       logged/>  
      <MyRoute path="/rooms"                  component={Rooms}         logged />
      <MyRoute path="/Room/:id"               component={Room}          logged />
      <MyRoute path="/"                       component={Rooms}         logged />
    </Switch>
  </Router>
);

export default App;
