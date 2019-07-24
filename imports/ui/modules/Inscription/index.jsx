import React, { useState, useCallback } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import Body from '../../components/Body';
import Button from '../../components/Button';
import Flex from '../../components/Flex';
import Form from '../../components/Form';
import StyledLink from '../../components/StyledLink';

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
    <Body>
      <Form>
        <h1>Tchitchat inscription</h1>
        <Fields
          update={update}
          state={{
            password,
            username,
            email,
          }}
        />
        <Flex>
          <Button
            onClick={signup}
          >Signup
          </Button>
            <StyledLink 
              to="/account/signin"
              >Connection
            </StyledLink>
            <StyledLink 
              to="/account/missing"
              >Missing
            </StyledLink>
        </Flex>
      </Form>
    </Body>
  );
}

export default Inscription;
