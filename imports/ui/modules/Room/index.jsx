import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data'
import Body from '/imports/ui/components/Body';
import Center from '/imports/ui/components/Center';
import Article from '/imports/ui/components/Article';
import AddMessage from './AddMessage';

import Messages from '/imports/api/messages';
import Rooms from '/imports/api/rooms';

const Room = ({ userId, messages, roomId }) => {
  const [roomTitle, setRoomTitle] = useState("");

  console.log(roomTitle);

  useEffect(() => {
    Meteor.call('rooms.get_title_by_id', { roomId }, (err, result) => {
      if (err)
        console.log(err);
      else
        setRoomTitle(result);
    })
  }, [ roomId ]);

  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }
  
  return (
      <Body>
        <Center>
          <h1>Room : </h1>
            {messages.map((message, index) => (
              <Article 
                key={index} 
                style={ message.userId===userId ? { textAlign:'right' } : {textAlign: 'left'}}>
                <h6>{message.username}</h6>
                <div dangerouslySetInnerHTML={{ __html: message.content }} />
              </Article>
            ))}
         </Center>
          <AddMessage 
            roomId={roomId}
          />
      </Body>
    )
  }

export default withTracker(({ match }) => {
  const roomId = match.params.id || "";

  const messagesPublication = Meteor.subscribe('messages.lasts_by_roomId', { roomId });
  const loading = !messagesPublication.ready();
  const messages = Messages.find({ roomId },  { sort: { createdAt: 1 }}).fetch();
  
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    roomId,
    messages,
  }
})(Room);

