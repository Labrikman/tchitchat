import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '/imports/ui/components/Body';
import Center from '/imports/ui/components/Center';
import Article from '/imports/ui/components/Article';
import AddMessage from './AddMessage';
import Messages from '/imports/api/messages';
import Rooms from '/imports/api/rooms';

const Room = ({ userId, messages, rooms, roomId }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
      <Body>
        <Center>
            {messages.map(message => (
              <Article 
                key={message.roomId} 
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

export default withTracker(({ match }) => {
  const roomId = match.params.id || "";
  const rooms = Rooms.findOne({ roomId : roomId });
  const messagesPublication = Meteor.subscribe('messages.lasts', roomId);
  const loading = !messagesPublication.ready();
  const messages = Messages.find(
    { roomId : roomId }, 
    { sort: { createdAt: 1 } }
  ).fetch();
   
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    roomId,
    messages,
    rooms,
  }
})(Room);

