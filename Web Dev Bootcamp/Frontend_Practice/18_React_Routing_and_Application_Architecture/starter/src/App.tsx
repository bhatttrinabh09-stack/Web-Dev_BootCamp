import React from 'react';
import { Routes, Route, NavLink, Outlet } from 'react-router-dom';
import { ArticleListPage } from './pages/ArticleListPage';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import { NotFoundPage } from './pages/NotFoundPage';

function RootLayout() {
  return (
    <div>
      <nav className="navbar">
        <NavLink to="/" end>Articles</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
      <main className="main-layout">
        {/* TODO: Place Outlet here for nested child routes */}
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  return (
    // TODO: Define Routes
    // 1. RootLayout on path "/"
    // 2. index route -> ArticleListPage
    // 3. "articles/:slug" -> ArticleDetailPage
    // 4. "about" -> Simple About component
    // 5. "*" -> NotFoundPage
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<ArticleListPage />} />
        <Route path="articles/:slug" element={<ArticleDetailPage />} />
        <Route path="about" element={<h2>About This Publication</h2>} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
