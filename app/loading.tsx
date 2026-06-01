import SkeletonCard from './components/SkeletonCard'

export default function Loading() {
  return (
    <div className="flex min-h-screen bg-[#0a0a0f]">
      {/* Skeleton sidebar */}
      <div className="hidden lg:block w-64 h-screen bg-[#111118] border-r border-white/5 animate-pulse" />
      {/* Skeleton grid */}
      <main className="flex-1 p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </main>
    </div>
  )
}