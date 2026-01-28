# OneTV YouTube Explorer

A production-grade take-home showcasing a React + TypeScript frontend and a Vercel serverless proxy to the YouTube Data API. The UI delivers a clean, product-like listing experience with search, pagination, skeleton states, and dark mode.

## ✅ Requirements checklist

- React + TypeScript frontend (Vite).  
- Node.js `/api/videos` proxy.  
- YouTube API key stays server-side only (env var).  
- Video cards with external YouTube links.  
- Keyword filter + sort control.  
- Infinite scrolling pagination with a token stack.  
- Dark mode toggle (system default) persisted in localStorage.  
- Skeleton loading state, error state with retry, and empty state.  
- Jest test.  

## Features

- Search by keyword with relevance/date sorting.  
- Video cards with titles, thumbnails, channel info, publish date, and external YouTube links.  
- Infinite scrolling pagination with a token stack for fetching subsequent pages.  
- Loading skeletons, empty state, and retryable error state.  
- Dark mode toggle (system default) persisted in localStorage.  
- React Query caching and background refetching, plus sorting by relevance or date.  
- Serverless `/api/videos` proxy with validation and normalized responses.  

## Approach rationale

I kept the UI and data layer intentionally provider-agnostic by normalizing the API response (`id`, `title`, `thumbnailUrl`, `channelTitle`, `publishedAt`, `url`). This keeps the frontend simple, makes pagination predictable, and makes it easy to swap providers later. The Vercel proxy centralizes validation and hides the API key, while React Query manages caching and pagination state so the interface stays responsive even during page transitions.

## Getting started

```bash
npm install
```

Create a `.env.local` file with:

```
BACKEND_SERVER_URL=url_here
```

Run locally:

```bash
npm run dev
```

Run tests:

```bash
npm test
```

## API contract
Errors are normalized:

```json
{
  "error": {
    "message": "Human-readable message",
    "code": "error_code",
    "status": 400
  }
}
```

## Architecture notes

### Provider-agnostic backend contract
The API normalizes YouTube’s response into a provider-neutral shape (`id`, `title`, `thumbnailUrl`, `channelTitle`, `publishedAt`, `url`) so the frontend never depends on a specific provider response.

### Why a proxy?
- Keeps the YouTube API key server-side only.  
- Centralizes validation and caching.  
- Makes it easy to swap or add providers later.  

### React Query usage
The UI uses React Query to manage caching, background refetching, and request cancellation. Pagination uses `placeholderData` to keep previous results on screen while loading the next page.

### Pagination token stack
The YouTube API only supports forward pagination, so the client stores page tokens in a stack and uses them to fetch subsequent pages for infinite scrolling without losing the current results.

### Pagination & API Strategy
- The initial render displays 9 videos (PAGE_SIZE = 9) to satisfy the assessment requirement.
- Infinite scroll is implemented using YouTube’s `nextPageToken` to progressively load additional content.
- The YouTube Search API returns up to 50 results per request. The application fetches 48 items per call to reduce API round trips and improve perceived performance.
- A batch size of 48 was chosen as it divides cleanly into the 3-column and 2-column responsive grid layouts, allowing consistent 9-item UI pagination and avoiding uneven rows during rendering.
- Results are then paginated client-side into 9-item batches to maintain a clean and predictable layout while scrolling.


### Dark mode approach
Theme mode defaults to system preferences and is persisted in `localStorage`. The theme is applied via a `data-theme` attribute with CSS variables for consistent styling.

## Deployment (Vercel)

1. Push the repo to GitHub.  
2. Import into Vercel.  
3. Add `YOUTUBE_API_KEY` in Vercel Environment Variables.  
4. Deploy.  

## Improvements with more time

- Persistent caching (Redis/Upstash).  
- Rate limiting at the edge.  
- E2E tests with Playwright.  
- Usage analytics dashboard.  
- View count + rating support (requires YouTube Videos API lookups per item; avoided to prevent N+1 requests without batching).  

## Known limitations / tradeoffs

- View count and rating are not shown because they require additional per-video API calls, which would introduce an N+1 query pattern unless a batching strategy is added.