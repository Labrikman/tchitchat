import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.publish('messages.lasts_by_roomId', ({ roomId }) => {
  return Messages.find({
    roomId
  }, {
    sort: { createdAt: 1 },
    limit: 10000,
  });
});
