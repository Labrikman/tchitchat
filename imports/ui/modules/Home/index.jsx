import React, { useCallback } from 'react';
import { Meteor } from 'meteor/meteor';
import { Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Articles from '/imports/api/articles';

import Loader from '/imports/ui/components/Loader';
import Article from './Article';

const Home = ({ user, userId, loading, articles }) => {

  const remove = useCallback(({ target: { id } }) => {
    Meteor.call('articles.remove', { id }, (err) => {
      if (err) console.log(err);
    });
  }, []);

  return (
    <div>
      <h1>Hello {user.username} !</h1>
      <button
        onClick={Meteor.logout}
      >Logout
      </button>
      <Link to="/articles/add">Create an article</Link>
      <Loader
        loading={loading}
        render={articles.map(article =>
          <Article
            key={article._id}
            userId={userId}
            article={article}
            remove={remove}
          />
        )}
      />
    </div>
  );
}

export default withTracker(() => {
  const articlesPublication = Meteor.subscribe('articles.lasts');
  const loading = !articlesPublication.ready();
  const articles = Articles.find({}, { sort: { createdAt: -1 } }).fetch();
  return {
    userId: Meteor.userId(),
    user: Meteor.user() || {},
    loading,
    articles,
  }
})(Home);
