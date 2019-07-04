import React, { useState, useCallback } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import StyledConnect from '../../components/StyledConnect';
import StyledButton from '../../components/StyledButton';

import Fields from './Fields';

const Inscription = () => {
  const [ email,    setEmail    ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");

  const update = useCallback((e, { name, value }) => {
    switch(name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'username':
        setUsername(value);
        break;
    }
  }, [ setEmail, setPassword, setUsername ]);

  const signup = useCallback(() => {
    Accounts.createUser({ email, password, username }, (err) => {
      if (err)
        console.log(err);
    });
  }, [ email, password, username ]);

  return (
    <StyledConnect>
      <h1>Tchitchat inscription</h1>
      <Fields
        update={update}
        state={{
          password,
          username,
          email,
        }}
      />
      <StyledButton
        onClick={signup}
      >Signup
      </StyledButton>
      <StyledButton>
        <Link 
          to="signin"
          >Connection
        </Link>
      </StyledButton>
    </StyledConnect>
  );
}

export default Inscription;
