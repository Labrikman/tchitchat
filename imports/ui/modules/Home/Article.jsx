import React from 'react';
import { Link } from 'react-router-dom';

const Article = ({ article, userId, remove }) => (
    <article style={{ border: '1px solid black' }} >
    <h3>{article.title}</h3>
    {(article.userId === userId) && (
      <div>
        <button
          id={article._id}
          onClick={remove}
        >Supprimer</button>
        <Link to={`/articles/edit/${article._id}`} >Modifier</Link>
      </div>
    )}
    <div dangerouslySetInnerHTML={{ __html: article.content }} />
  </article>
);

export default Article;