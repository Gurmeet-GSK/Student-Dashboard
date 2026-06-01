export default function SkeletonCard() {
  return (
    <div className="bg-[#16161f] rounded-2xl p-5 border border-white/5">
      <div className="animate-pulse space-y-3">
        <div className="h-6 w-6 bg-white/10 rounded-md"></div>
        <div className="h-4 w-3/4 bg-white/10 rounded"></div>
        <div className="h-3 w-1/2 bg-white/10 rounded"></div>
        <div className="h-1.5 w-full bg-white/10 rounded-full"></div>
      </div>
    </div>
  )
}