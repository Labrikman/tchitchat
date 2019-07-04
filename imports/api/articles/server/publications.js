import { Meteor } from 'meteor/meteor';
import Articles from '..';

Meteor.publish('articles.lasts', () => {
  return Articles.find({}, {
    sort: { createdAt: -1 },
    limit: 50,
    // skip: 50,
  });
});
