import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Redirect, Link } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import Body from '/imports/ui/components/Body';
import Button from '/imports/ui/components/Button';

import Articles from '/imports/api/articles';


const REMOVE = ({ target: { id } }) => {
  Meteor.call('Artices.remove', { id }, (err) => {
    if (err) console.log(err);
  });
}

const Rooms = ({ user, userId, loading, articles }) => {
  if (!userId) {
    return (
      <Redirect to="/accounts/signin" />
    );
  }

  return (
    <Body>
      <h3>Tchatrooms</h3>
      {loading ? (
        <h2>Chargement...</h2>
      ) : (
        <div>
          {articles.map(article => (
            <article key={article._id} style={{ border: '1px solid black' }} >
              <h3>{article.title}</h3>
              {(article.userId === userId) && (
                <Button>
                  <button
                    id={article._id}
                    onClick={REMOVE}
                  >Supprimer</button>
                  <Link to={`/article/edit/${article._id}`} >Modifier</Link>
                </Button>
              )}
              <div dangerouslySetInnerHTML={{ __html: article.content }} />
            </article>
          ))}
        </div>
      )}
    </Body>
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
})(Rooms);