import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeToggle } from './components/ThemeToggle';
import { VideoFilters } from './components/VideoFilters';
import { VideoListingPage } from './pages/VideoListingPage';
import { applyThemeClass, getStoredTheme, resolveTheme, setStoredTheme } from './utils/theme';
import type { OrderValue } from './types/types';
import { DEFAULT_QUERIES } from './utils/defaultValues';
import navLogo from './assets/logo.svg';

const queryClient = new QueryClient();

const getDailyDefaultQuery = () => {
  const index = Math.floor(Math.random() * DEFAULT_QUERIES.length);
  return DEFAULT_QUERIES[index];
}

const DEFAULT_QUERY = getDailyDefaultQuery();

export default function App() {
  const [themeMode, setThemeMode] = useState(getStoredTheme);
  const [queryInput, setQueryInput] = useState(DEFAULT_QUERY);
  const [order, setOrder] = useState<OrderValue>('relevance');

  useEffect(() => {
    setStoredTheme(themeMode);
    const resolved = resolveTheme(themeMode);
    applyThemeClass(resolved);
  }, [themeMode])

  const resolvedTheme = useMemo(() => resolveTheme(themeMode), [themeMode]);

  return (
  <QueryClientProvider client={queryClient}>
    <div
      data-theme={resolvedTheme}
      className="min-h-screen flex flex-col bg-(--color-bg) text-(--color-text)"
    >
      <nav
        className="
          sticky top-0 z-50
          flex items-center justify-between gap-4
          px-[6vw] py-3
          border-b border-(--color-border)
          bg-(--color-surface)/90 backdrop-blur
          max-[768px]:px-[4vw] max-[768px]:py-2
          max-[480px]:flex-wrap
        "
      >
        <img
          src={navLogo}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="
            logo
            h-8 w-auto
            cursor-pointer
            [data-theme=light]:invert
            [data-theme=dark]:invert-0
          "
          alt="Back to top"
        />


        <div
          className="
            flex w-full max-w-150 gap-3
            flex-1 mx-auto
            max-[480px]:order-3 max-[480px]:basis-full
          "
        >
          <VideoFilters
            query={queryInput}
            order={order}
            onQueryChange={setQueryInput}
            onOrderChange={setOrder}
          />
        </div>

        <ThemeToggle mode={themeMode} onChange={setThemeMode} />
      </nav>

      <main className="flex-1 px-[6vw] pb-6 max-[768px]:px-[4vw]">
        <VideoListingPage queryInput={queryInput} order={order} />
      </main>
    </div>
  </QueryClientProvider>
)

}
