import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '/imports/ui/components/Body';
import Center from '/imports/ui/components/Center';
import Article from '/imports/ui/components/Article';

import Rooms from '/imports/api/rooms';
import AddMessage from './AddMessage';
import Messages from '/imports/api/messages';

const Room = ({ user, userId, messages }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
      <Body>
        <Center>
          {/* <h1>{room.title}</h1> */}
            {messages.map(message => (
              <Article 
                key={message._id} 
                style={ message.userId===userId ? { textAlign:'right' } : {textAlign: 'left'}}>
                <h6>{message.username}</h6>
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              </Article>
            ))}
         </Center>
          <AddMessage />
      </Body>
    )
  }

 
export default withTracker(() => {
  const messagesPublication = Meteor.subscribe('messages.lasts');
  const loading = !messagesPublication.ready();
  const messages = Messages.find({}, { sort: { createdAt: 1 } }).fetch();

  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    messages,
  }
})(Room);

