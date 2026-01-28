import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Loader2 } from 'lucide-react'
import { fetchVideos } from '../api/videos'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import type { VideoItem, VideoListingPageProps, VideoResponse } from '../types/types'
import { EmptyState, ErrorState } from '../components/States'
import { LoadingSkeleton } from '../components/LoadingSkeleton'
import { VideoGrid } from '../components/VideoGrid'

const DEFAULT_QUERIES = [
  'BBC World News',
  'BBC Documentary',
  'BBC Earth',
  'National Geographic',
  'TED Talks',
]

const getDailyDefaultQuery = () => {
  const day = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  return DEFAULT_QUERIES[day % DEFAULT_QUERIES.length] || 'BBC World News';
}

const DEFAULT_QUERY = getDailyDefaultQuery();
const PAGE_SIZE = 9;
const BACKEND_LIMIT = 48;
const debounceTimeout = 500;
const revealTimeout = 300;

export const VideoListingPage = ({ queryInput, order }: VideoListingPageProps) => {
  const [items, setItems] = useState<VideoItem[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(undefined);
  const [currentToken, setCurrentToken] = useState<string | undefined>(undefined);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [pendingReveal, setPendingReveal] = useState(false);

  const loadedTokensRef = useRef<Set<string>>(new Set());
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const revealTimeoutRef = useRef<number | null>(null);

  const trimmedInput = queryInput.trim();
  const debouncedInput = useDebouncedValue(trimmedInput, debounceTimeout);
  const normalizedQuery = trimmedInput === '' ? DEFAULT_QUERY : (debouncedInput || DEFAULT_QUERY);

  const prevQueryRef = useRef(normalizedQuery);
  const prevOrderRef = useRef(order);

  useEffect(() => {
    if (prevQueryRef.current !== normalizedQuery || prevOrderRef.current !== order) {
      setItems([]);
      setNextPageToken(undefined);
      setCurrentToken(undefined);
      setVisibleCount(PAGE_SIZE);
      setIsLoadingMore(false);
      setPendingReveal(false);
      loadedTokensRef.current = new Set();
      
      prevQueryRef.current = normalizedQuery;
      prevOrderRef.current = order;
    }
  }, [normalizedQuery, order])

  const { data, isFetching, isError, error, refetch, isPlaceholderData } = useQuery<VideoResponse, Error>({
    queryKey: ['videos', normalizedQuery, order, currentToken],
    queryFn: ({ signal }) =>
      fetchVideos({
        query: normalizedQuery,
        order,
        limit: BACKEND_LIMIT,
        pageToken: currentToken,
        signal,
      }),
    placeholderData: (previous) => previous,
    staleTime: 60*1000,
  })

  useEffect(() => {
    if (!data || isPlaceholderData) return;
    const tokenKey = `${normalizedQuery}-${order}-${currentToken ?? '__initial__'}`;
    if (loadedTokensRef.current.has(tokenKey)) return;

    loadedTokensRef.current.add(tokenKey);

    setItems((prev) => {
      const nextItems = currentToken ? [...prev] : [];
      const seenIds = new Set(nextItems.map((item) => item.id));

      data.items.forEach((item) => {
        if (!seenIds.has(item.id)) {
          seenIds.add(item.id);
          nextItems.push(item);
        }
      })

      return nextItems;
    })

    setNextPageToken(data.nextPageToken);
  }, [data, currentToken, isPlaceholderData, normalizedQuery, order])

  useEffect(() => {
    if (!pendingReveal) return;

    if (items.length > visibleCount) {
      if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current);

      revealTimeoutRef.current = window.setTimeout(() => {
        setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, items.length));
        setPendingReveal(false);
        setIsLoadingMore(false);
      }, revealTimeout)

      return () => {
        if (revealTimeoutRef.current) window.clearTimeout(revealTimeoutRef.current);
      }
    }

    if (nextPageToken && !isFetching && currentToken !== nextPageToken) {
      setCurrentToken(nextPageToken);
      return;
    }

    if (!nextPageToken) {
      setPendingReveal(false);
      setIsLoadingMore(false);
    }
  }, [items.length, nextPageToken, pendingReveal, visibleCount, isFetching, currentToken])

  useEffect(() => {
    if (!sentinelRef.current) return;

    const sentinel = sentinelRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          if (isLoadingMore) return;

          if (visibleCount < items.length) {
            setIsLoadingMore(true);
            setPendingReveal(true);
            return;
          }

          if (nextPageToken && !isFetching) {
            setIsLoadingMore(true);
            setPendingReveal(true);
            setCurrentToken(nextPageToken);
          }
        }
      },
      { rootMargin: '200px' }
    )

    observer.observe(sentinel);

    return () => {
      observer.unobserve(sentinel);
      observer.disconnect();
    }
  }, [items.length, visibleCount, nextPageToken, isFetching, isLoadingMore])

  useEffect(() => {
    if (isError && isLoadingMore) {
      setIsLoadingMore(false);
      setPendingReveal(false);
    }
  }, [isError, isLoadingMore])

  const visibleItems = items.slice(0, visibleCount);
  const hasResults = visibleItems.length > 0;

  return (
    <section className="flex flex-col gap-4 mt-4">
      {isFetching && !hasResults ? (
        <LoadingSkeleton />
      ) : isError ? (
        <ErrorState
          message={error?.message || 'Something went wrong.'}
          onRetry={() => refetch()}
        />
      ) : hasResults ? (
        <VideoGrid items={visibleItems} />
      ) : (
        <EmptyState />
      )}

      {/* Infinite scroll sentinel */}
      <div ref={sentinelRef} />

      {isLoadingMore && (
        <div
          className="flex justify-center mt-4"
          aria-live="polite"
        >
          <Loader2
            className="animate-spin text-[var(--color-accent)]"
            size={48}
            aria-label="Loading more videos"
          />
        </div>
      )}
    </section>
  )

}