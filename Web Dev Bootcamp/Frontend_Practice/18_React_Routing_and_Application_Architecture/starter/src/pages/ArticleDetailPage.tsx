import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ARTICLES } from '../data/articles';

export function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  // TODO: Find article by slug
  const article = ARTICLES.find(a => a.slug === slug);

  if (!article) {
    return (
      <div>
        <h2>Article Not Found</h2>
        <p>No article matching the slug "{slug}" exists.</p>
        <button className="btn-back" onClick={() => navigate('/')}>Back to Articles</button>
      </div>
    );
  }

  return (
    <article>
      <button className="btn-back" onClick={() => navigate(-1)}>&larr; Back</button>
      <h1>{article.title}</h1>
      <p style={{ color: '#64748b' }}>Published: {article.publishedAt}</p>
      <div style={{ marginTop: '1.5rem', lineHeight: 1.7 }}>
        <p>{article.content}</p>
      </div>
    </article>
  );
}
