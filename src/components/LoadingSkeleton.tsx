const skeletonItems = Array.from({ length: 9 })

export const LoadingSkeleton = () => {
  return (
    <div
      aria-hidden="true"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {skeletonItems.map((_, index) => (
        <div
          key={index}
          className="
            overflow-hidden
            rounded-2xl
            border border-transparent
            bg-gray-100 [data-theme=dark]:bg-gray-800
            animate-pulse
          "
        >
          <div className="relative w-full pt-[56.25%] bg-gray-200 [data-theme=dark]:bg-gray-700" />

          <div className="flex flex-col gap-2 p-3">
            <div className="h-4 w-full rounded-full bg-gray-300 [data-theme=dark]:bg-gray-600" />
            <div className="h-3 w-full rounded-full bg-gray-300 [data-theme=dark]:bg-gray-600" />
            <div className="h-3 w-3/5 rounded-full bg-gray-300 [data-theme=dark]:bg-gray-600" />
          </div>
        </div>
      ))}
    </div>
  )
}
