import React, { useCallback, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import CustomInput from '/imports/ui/components/CustomInput';
import { withTracker } from 'meteor/react-meteor-data'
import Button from '/imports/ui/components/Button';
import Flex from '/imports/ui/components/Flex';
import Center from '/imports/ui/components/Center';
import StyledLink from '/imports/ui/components/StyledLink';
import Form from '../../components/Form';

const AddMessage = ({ roomId }) => {
  const [ content, setContent ] = useState("");

  const update = useCallback((e, { name, value }) => {
     setContent(value);
  }, []);

  const send = useCallback((e) => {
    e.preventDefault();
    Meteor.call("message.create", { content, roomId }, (err) => {
      if (err)
        console.log(err);
      else
        setContent("");
    });
  }, [ content, roomId ]);

  return (
    <Center>
      <Form onSubmit={send} >
        <CustomInput
          placeholder="Message"
          name="content"
          value={content}
          update={update}
        />
        <Flex>
          <Button>Send</Button>
          <StyledLink to={`/rooms`} >Back</StyledLink>
        </Flex>
      </Form>
    </Center>
  )
}
 
export default withTracker(({}) => ({
 userId: Meteor.userId(),
}))(AddMessage);
