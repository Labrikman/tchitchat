import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';

import Articles from '/imports/api/articles';

const REMOVE = ({ target: { id } }) => {
  Meteor.call('articles.remove', { id }, (err) => {
    if (err) console.log(err);
  });
}

const Home = ({ user, userId, loading, articles }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
    <div>
      <h1>Hello {user.username} !</h1>
      <button
        onClick={Meteor.logout}
      >Logout
      </button>
      <Link to="/articles/add">Create an article</Link>
      {loading ? (
        <h2>Chargement...</h2>
      ) : (
        <div>
          {articles.map(article => (
            <article key={article._id} style={{ border: '1px solid black' }} >
              <h3>{article.title}</h3>
              {(article.userId === userId) && (
                <div>
                  <button
                    id={article._id}
                    onClick={REMOVE}
                  >Supprimer</button>
                  <Link to={`/articles/edit/${article._id}`} >Modifier</Link>
                </div>
              )}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          ))}
        </div>
      )}
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