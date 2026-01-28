import type { Sparkles } from "lucide-react";
import type { ThemeMode } from "../utils/theme"

export type VideoItem = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
};

export type VideoResponse = {
  items: VideoItem[];
  nextPageToken?: string;
}

export type ApiError = {
  error: {
    message: string;
    code?: string;
    status?: number;
  }
}

export type FetchParams = {
  query: string;
  order: OrderValue;
  limit: number;
  pageToken?: string;
  signal?: AbortSignal;
}

export type VideoCardProps = {
  video: VideoItem
}

export type ErrorStateProps = {
  message: string;
  onRetry: () => void;
}

export type ThemeToggleProps = {
  mode: ThemeMode;
  onChange: (mode: ThemeMode) => void;
}

export type VideoFiltersProps = {
  query: string;
  order: OrderValue;
  onQueryChange: (value: string) => void;
  onOrderChange: (value: OrderValue) => void;
}

export type VideoGridProps = {
  items: VideoItem[];
}

export const ORDER_VALUES_ARRAY = ["relevance", "date", "viewCount", "rating", "title"] as const;
export type OrderValue = (typeof ORDER_VALUES_ARRAY)[number];
export const ORDER_VALUES = new Set<OrderValue>(ORDER_VALUES_ARRAY);

export const isOrderValue = (v: string): v is OrderValue =>
  ORDER_VALUES.has(v as OrderValue);

export type SortOption = {
  value: OrderValue
  label: string
  icon: typeof Sparkles
}

export interface VideoListingPageProps {
  queryInput: string;
  order: OrderValue;
}