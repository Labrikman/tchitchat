import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '../../components/Body';
import Button from '../../components/Button';
import Flex from '../../components/Flex';
import Center from '../../components/Center';
import Article from '../../components/Article';

import Rooms from '/imports/api/rooms';
import AddMessage from './AddMessage';
import Messages from '/imports/api/messages';

const Room = ({ user, userId, roomId, rooms, messages }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
      <Body>
        <Center>
          {rooms.title(room =>(<h1>{room.title}</h1>))}
            {messages.map(message => (
              <Article 
                key={user._id} 
                style={ userId===this.userId ? { textAlign:'left' } : {textAlign: 'right'}}>
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
  const rooms = Rooms.findOne().fetch();

  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    rooms,
    loading,
    messages,
  }
})(Room);

