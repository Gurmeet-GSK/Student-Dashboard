import ActivityTile from '../ActivityTile'
import LearningVelocity from '../LearningVelocity'

export default function ActivityView() {
  return (
    <section className="h-full flex flex-col">
      <h1 className="text-2xl font-bold text-white mb-6">Analytics</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <ActivityTile />
        <LearningVelocity />
      </div>
    </section>
  )
}