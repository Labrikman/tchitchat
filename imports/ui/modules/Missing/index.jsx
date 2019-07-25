import React, { useState, useCallback } from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Link } from 'react-router-dom';
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Form from '/imports/ui/components/Form';
import StyledLink from '/imports/ui/components/StyledLink';

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
    <Body>
      <Form>
        <h1>Mot de passe oublié</h1>
        <Fields
          update={update}
          state={{
            username,
            email,
          }}
        />
        <Flex>
            <StyledLink to="/account/signup">
              Inscription
            </StyledLink>
            <StyledLink 
              to="/account/signin"
              >Connection
            </StyledLink>
        </Flex>
      </Form>
    </Body>
  );
}

export default Inscription;
