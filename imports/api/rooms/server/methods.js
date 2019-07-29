import { Meteor } from 'meteor/meteor';
import Rooms from '..';

Meteor.methods({
  "rooms.create"({ id, title }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    
    Rooms.insert({
      id,
      title,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "rooms.update"({ id, title }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    if (!title) {
      throw new Meteor.Error('403', 'You must to rename you room');
    }
    const room = Rooms.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }
    
    Rooms.update(id, { $set: { title } });
  },

  "rooms.remove"({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const room = Rooms.findOne(id);

    if (room.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of room');
    }

    Rooms.remove(id);
  },
});
