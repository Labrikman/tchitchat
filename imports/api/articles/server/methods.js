import { Meteor } from 'meteor/meteor';
import Articles from '..';

Meteor.methods({
  "articles.create"({ title, content }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }
    
    Articles.insert({
      title,
      content,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "articles.update"({ id, title, content }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const article = Articles.findOne(id);

    if (article.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of article');
    }
    
    Articles.update(id, { $set: { title, content } });
  },

  "articles.remove"({ id }) {
    if (!this.userId) {
      throw new Meteor.Error('403', 'You must be connected');
    }

    const article = Articles.findOne(id);

    if (article.userId !== this.userId) {
      throw new Meteor.Error('403', 'You must be the owner of article');
    }

    Articles.remove(id);
  },
});
