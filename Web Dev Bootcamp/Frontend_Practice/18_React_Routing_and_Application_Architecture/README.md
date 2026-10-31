# 18. React Routing and Application Architecture

## 1. Learning outcomes
By the end of this topic, you will be able to:
- Explain how Single Page Application (SPA) client-side routing works without triggering full-page server reloads.
- Configure client-side routes, nested layouts, and path parameters using React Router.
- Access dynamic route parameters using the `useParams` hook (e.g. `/users/:id`).
- Implement client navigation with `<Link>`, `<NavLink>`, and programmatic navigation via `useNavigate`.
- Build a Catch-All 404 Not Found route and handle missing resource boundaries.
- Structure React applications by feature folders rather than shallow file types.

## 2. What is this?
**Client-Side Routing** intercepts browser URL changes and renders the corresponding component hierarchy in JavaScript without requesting a new HTML page from the web server. **React Router** is the industry-standard declarative routing library for React.

## 3. Why does it exist?
Traditional multi-page websites refresh the entire browser screen on every link click, destroying all in-memory JavaScript state, re-executing scripts, and causing visible white-screen flashes. SPAs preserve state and deliver instantaneous page transitions.

## 4. How does it work?
React Router uses the HTML5 **History API** (`window.history.pushState` and the `popstate` event):

```
User clicks <Link to="/products/42">
     │
     ▼
React Router intercepts click ──> Calls history.pushState() (Updates URL bar without reload)
     │
     ▼
Matches URL path to Route Table:
  /               ──> <HomePage />
  /products       ──> <ProductsLayout />
    └─ /:id       ──> <ProductDetail /> (useParams() extracts id: "42")
  *               ──> <NotFoundPage />
```

### Nested Routing and Layouts:
Layouts share persistent headers/navbars while swapping out content via `<Outlet />`:
```tsx
function RootLayout() {
  return (
    <div>
      <Navbar />
      <main><Outlet /></main> {/* Child route renders here */}
      <Footer />
    </div>
  );
}
```

## 5. Important concepts and syntax
- `BrowserRouter`: Top-level context provider wrapping the route tree.
- `Routes` and `Route`: Define path mappings.
- `useParams()`: Access dynamic URL parameters (`const { id } = useParams<{ id: string }>()`).
- `<Link to="/path">`: Accessible anchor replacement that prevents full page refresh.
- `<NavLink to="/path">`: Applies an `.active` class automatically when route matches.
- `useNavigate()`: Trigger navigation programmatically (e.g. after form submission).

## 6. Small worked example
A router configuration with nested layouts and dynamic detail route:

```tsx
import { BrowserRouter, Routes, Route, Outlet, Link, useParams } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <nav><Link to="/">Home</Link> | <Link to="/users">Users</Link></nav>
      <Outlet />
    </div>
  );
}

function UserDetail() {
  const { userId } = useParams();
  return <h2>Viewing Profile of User #{userId}</h2>;
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<h1>Welcome Home</h1>} />
          <Route path="users/:userId" element={<UserDetail />} />
          <Route path="*" element={<h2>404: Page Not Found</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
```

## 7. Common mistakes
1. **Using standard HTML anchor tags (`<a href="/about">`):** Clicking an `<a>` tag causes the browser to execute a full server reload, wiping all application state! Always use `<Link>` or `<NavLink>`.
2. **Missing the 404 Catch-All route:** Forgetting `path="*"` leaves the screen blank when a user enters a mistyped URL.
3. **Not providing a server rewrite in production:** When deploying an SPA, refreshing `/users/12` returns a server 404 unless the web host is configured to rewrite all requests to `index.html`.

## 8. Coding challenge
**Environment:** Browser & Terminal (Vite + React Router + TS).

Open `Frontend_Practice/18_React_Routing_and_Application_Architecture/starter/`:
Build a multi-page Blog & Article Viewer:
1. Configure routes in `src/App.tsx`:
   - `/`: Home / Article List page (`ArticleListPage`).
   - `/articles/:slug`: Dynamic article viewer (`ArticleDetailPage`).
   - `*`: 404 Not Found page (`NotFoundPage`).
2. Wrap routes in a shared `Layout` containing an active navigation bar.
3. In `ArticleDetailPage`:
   - Extract the article `slug` parameter using `useParams`.
   - Find the matching article in the sample articles dataset.
   - If the slug does not exist, display an informative "Article does not exist" message with a button to navigate back to `/`.
4. Run `npm install` and `npm run dev` to test route transitions and URL sharing.

## 9. Acceptance criteria
- [ ] Clicking articles transitions to detail page without page reloads.
- [ ] Active navigation links highlight using `<NavLink>`.
- [ ] Visiting `/articles/non-existent-slug` renders an error message.
- [ ] Visiting an unknown URL path triggers the 404 Not Found page.

## 10. Test cases
- **Normal:** Clicking article "Mastering CSS Grid" loads URL `/articles/mastering-css-grid` with full article content.
- **Back Navigation:** Clicking "Back to Articles" navigates to `/`.
- **404:** Typing `/unknown-path` displays the 404 component.

## 11. Hints
1. *Concept:* Remember `<Outlet />` must be placed inside the parent layout component where child route elements should appear.
2. *Approach:* Type route parameters safely: `const { slug } = useParams<{ slug: string }>();`.
3. *Specifics:* Use `useNavigate()` to create a back button: `const navigate = useNavigate(); navigate(-1);`.

## 12. Bonus challenge
Add query string search support: use `useSearchParams()` on the Article List page to filter articles by tag (`?tag=css`) and keep the input box synchronized with the URL.

## 13. Self-check
1. How does client-side routing change the URL in the browser bar without causing a server request?
2. What is the role of `<Outlet />` in React Router?
3. Why does refreshing `/articles/my-post` on a production static server fail unless rewrite rules are configured?
4. What is the difference between `useParams` and `useSearchParams`?

## 14. References
- [React Router Official Tutorial](https://reactrouter.com/en/main/start/tutorial)
- [MDN: History API](https://developer.mozilla.org/en-US/docs/Web/API/History_API)
