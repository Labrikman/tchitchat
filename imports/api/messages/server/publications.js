import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.publish('messages.lasts', () => {
  return Messages.find({}, {
    username: username,
    roomId: roomId,
    sort: { createdAt: -1 },
  });
});
