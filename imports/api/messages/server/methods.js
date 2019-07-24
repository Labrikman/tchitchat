import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.methods({
  "message.create"({ content, username }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    if (content!=''){
      Messages.insert({
        content,
        username,
        roomId: this.roomId,
        createdAt: new Date(),
        userId: this.userId,
      });
    }
  }
});