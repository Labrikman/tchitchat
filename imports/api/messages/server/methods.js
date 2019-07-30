import { Meteor } from 'meteor/meteor';
import Messages from '..';

Meteor.methods({
  "message.create"({ content, roomId, username }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    if (content===''){
      throw new Meteor.Error('403', 'Content cannot be empty');
    }
    
      Messages.insert({
        content,
        username,
        roomId,
        ownerId : this.userId,
        createdAt: new Date(),
        userId: this.userId,
      });
    
  }
});
