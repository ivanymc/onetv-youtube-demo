import type { VideoCardProps } from '../types/types'

export const VideoCard = ({ video }: VideoCardProps) => {
  return (
    <a
      href={video.url}
      target="_blank"
      rel="noreferrer"
      aria-label={`Watch ${video.title} on YouTube`}
      className="
        group
        flex flex-col
        overflow-hidden
        rounded-2xl
        border border-gray-200 [data-theme=dark]:border-gray-800
        [data-theme=dark]:bg-gray-900
        shadow-lg
        transition
        duration-300
        hover:-translate-y-1 hover:scale-[1.02]
        hover:border-blue-500
        hover:shadow-2xl
        focus-visible:outline-none
        focus-visible:ring-2 focus-visible:ring-blue-500
      "
    >
      <div className="relative w-full pt-[56.25%] overflow-hidden bg-gray-100 [data-theme=dark]:bg-gray-800">
        <img
          src={video.thumbnailUrl}
          alt=""
          loading="lazy"
          className="
            absolute inset-0
            h-full w-full
            object-cover
            transition-transform
            duration-300
            group-hover:scale-105
          "
        />

        <div
          className="
            absolute inset-0
            flex items-center justify-center
            opacity-0
            transition
            duration-300
            group-hover:opacity-100
            group-hover:drop-shadow-[0_0_30px_rgba(239,68,68,0.35)]
          "
        >

          <div
            className="
              scale-100
              transition-transform
              duration-200
              group-hover:scale-200
            "
          >
            <svg
              width="68"
              height="68"
              viewBox="0 0 68 68"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-xl"
            >
              <circle
                cx="34"
                cy="34"
                r="32"
                fill="rgba(0,0,0,0.5)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <path d="M28 22L46 34L28 46V22Z" fill="white" />
            </svg>
          </div>
        </div>

        <div
          className="
            pointer-events-none
            absolute bottom-0 left-0 right-0
            h-1/2
            bg-linear-to-t
            from-black/10 to-transparent
            opacity-0
            transition-opacity
            duration-300
            group-hover:opacity-100
          "
        />
      </div>

      <div className="flex flex-col gap-1 p-3">
        <h3 className="text-sm leading-snug line-clamp-1 [data-theme=dark]:text-gray-100">
          {video.title}
        </h3>

        <p className="flex items-center gap-1 text-xs text-gray-500">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
          </svg>
          {video.channelTitle}
        </p>

        <p className="flex items-center gap-1 text-xs text-gray-500">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
          </svg>
          {new Date(video.publishedAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </p>
      </div>
    </a>
  )

}
