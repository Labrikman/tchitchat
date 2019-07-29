import React, { useState, useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Center from '/imports/ui/components/Center';
import Form from '/imports/ui/components/Form';
import StyledLink from '/imports/ui/components/StyledLink';

import Fields from './Fields';

const Connection = () => {
  const [ password, setPassword ] = useState("");
  const [ username, setUsername ] = useState("");
  const [ erreur, setErreur] = useState("");


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

  const signin = useCallback((e) => {
    e.preventDefault();
    Meteor.loginWithPassword(username, password, (err) => {
      if (err)
        console.log(err);
        setErreur(1);  
    });
  }, [ username, password ]);

  return (

    <Body>
      <Center>
        <Form onSubmit={signin} >
          <h1>Tchitchat connection</h1>
          <Fields
            update={update}
            state={{ username, password }}
          />
          { erreur===1 ? 'incorrect pseudo or password' : '' }
          <Flex>
            <Button type="submit">
              Signup
            </Button>
            <StyledLink to="/account/signup">
              Inscription
            </StyledLink>
            <StyledLink to="/account/missing">
              Missing
            </StyledLink>
          </Flex>
        </Form>
      </Center>
    </Body>
  );
}

export default Connection;
