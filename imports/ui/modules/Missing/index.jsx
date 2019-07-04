import React, { useState, useCallback } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import StyledConnect from '../../components/StyledConnect';
import StyledButton from '../../components/StyledButton';
import StyledFlex from '../../components/StyledFlex';

import Fields from './Fields';

const Inscription = () => {
  const [ email,    setEmail    ] = useState("");
  const [ username, setUsername ] = useState("");

  const update = useCallback((e, { name, value }) => {
    switch(name) {
      case 'email':
        setEmail(value);
        break;
      case 'username':
        setUsername(value);
        break;
    }
  }, [ setEmail, setUsername ]);

  const signup = useCallback(() => {
    Accounts.createUser({ email, username }, (err) => {
      if (err)
        console.log(err);
    });
  }, [ email, username ]);

  return (
    <StyledConnect>
      <h1>Mot de passe oublié</h1>
      <Fields
        update={update}
        state={{
          username,
          email,
        }}
      />
      <StyledFlex>
        <StyledButton>
          <Link to="/account/signup">
            Inscription
          </Link>
        </StyledButton>
        <StyledButton>
          <Link 
            to="/account/signin"
            >Connection
          </Link>
        </StyledButton>
      </StyledFlex>
    </StyledConnect>
  );
}

export default Inscription;
