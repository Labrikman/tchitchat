import { Meteor } from 'meteor/meteor';
import Rooms from '..';

Meteor.publish('rooms.lasts', () => {
    return Rooms.find({}, {
        fields: {
            title: 1,
            createdAt: 1,
            userId: 1,
        },
        sort: { createdAt: -1 },
        limit: 5000,
    })
})