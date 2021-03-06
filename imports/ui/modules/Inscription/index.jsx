import React, { useState, useCallback } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Form from '/imports/ui/components/Form';
import Center from '/imports/ui/components/Center';
import StyledLink from '/imports/ui/components/StyledLink';

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

  const signup = useCallback((e) => {
    Accounts.createUser({ email, password, username }, (err) => {
      if (err)
        console.log(err);
    });
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (err)
        console.log(err);
        setErreur(1);  
    });
  }, [ email, password, username ]);

  return (
    <Body>
      <Center>
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
      </Center>
    </Body>
  );
}

export default Inscription;
