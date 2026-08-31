import { stats } from '@/app/content/home'

export default function Stats() {
  return (
    <section id="stats" className="py-6 border-y border-dark-border">
      <div className="flex items-center justify-around w-full gap-8">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-3xl sm:text-4xl font-light text-transparent bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-text-secondary font-light leading-tight">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
