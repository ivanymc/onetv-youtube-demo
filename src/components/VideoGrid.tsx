import type { VideoGridProps } from '../types/types'
import { VideoCard } from './VideoCard'

export const VideoGrid = ({ items }: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}
