import type { ErrorStateProps } from "../types/types"

export const ErrorState = ({ message, onRetry }: ErrorStateProps) => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 [data-theme=dark]:border-gray-700 bg-white [data-theme=dark]:bg-gray-900 px-6 py-12 text-center">
      <h2 className="mb-2 text-lg font-semibold text-gray-900 [data-theme=dark]:text-gray-100">
        We hit a snag
      </h2>
      <p className="mb-4 text-sm text-gray-500">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="rounded-full bg-blue-500 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        Try again
      </button>
    </div>
  )
}

export const EmptyState = () => {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 [data-theme=dark]:border-gray-700 bg-white [data-theme=dark]:bg-gray-900 px-6 py-12 text-center">
      <h2 className="mb-2 text-lg font-semibold text-gray-900 [data-theme=dark]:text-gray-100">
        No videos found
      </h2>
      <p className="text-sm text-gray-500">
        Try a different keyword or adjust the sort order.
      </p>
    </div>
  )
}
