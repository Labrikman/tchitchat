import React, { useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import StyledConnect from '../../components/StyledConnect';
import StyledButton from '../../components/StyledButton';



import Fields from './Fields';

const Connection = () => {
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");

  const update = useCallback((e, { name, value }) => {
    switch(name) {
      case 'password':
        setPassword(value);
        break;
      case 'username':
        setUsername(value);
        break;
    }
  }, [ setPassword, setUsername ]);

  const signin = useCallback(() => {
    Meteor.loginWithPassword(username, password, (err) => {
      if (err)
        console.log(err);
    });
  }, [ username, password ]);

  return (
    <StyledConnect >
      <h1>Tchitchat connection</h1>
      <Fields
        update={update}
        state={{ username, password }}
      />
      <StyledButton
        onClick={signin}
      >Signup
      </StyledButton>
      <Link to="/signup">Inscription</Link>
    </StyledConnect >
  );
}

export default Connection;
