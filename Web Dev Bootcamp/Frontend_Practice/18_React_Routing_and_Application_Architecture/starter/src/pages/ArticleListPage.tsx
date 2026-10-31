import React from 'react';
import { Link } from 'react-router-dom';
import { ARTICLES } from '../data/articles';

export function ArticleListPage() {
  return (
    <div>
      <h1>Engineering Journal</h1>
      <p>Latest articles and technical deep dives.</p>
      <div>
        {ARTICLES.map((art) => (
          <article key={art.slug} className="article-item">
            <Link to={`/articles/${art.slug}`}>{art.title}</Link>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{art.publishedAt}</p>
            <p>{art.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
