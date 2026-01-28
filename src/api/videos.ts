import type { ApiError, FetchParams, VideoResponse } from '../types/types';

const normalizeError = async (response: Response) => {
  try {
    const body = (await response.json()) as ApiError;
    return body.error?.message || 'Something went wrong while fetching videos.';
  } catch {
    return 'Something went wrong while fetching videos.';
  }
}

export const fetchVideos = async ({
  query,
  order,
  limit,
  pageToken,
  signal,
}: FetchParams): Promise<VideoResponse> => {
  const params = new URLSearchParams();
  params.set('query', query);
  params.set('order', order);
  params.set('limit', String(limit));
  if (pageToken) {
    params.set('pageToken', pageToken);
  }

  const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}?${params.toString()}`, { signal });
  if (!response.ok) {
    const message = await normalizeError(response);
    throw new Error(message);
  }
  return (await response.json()) as VideoResponse;
}
