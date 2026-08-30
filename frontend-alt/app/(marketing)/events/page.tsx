export default function EventsPage() {
  const upcomingEvents = [
    {
      date: 'Sep 15 - 17, 2024',
      title: 'Web3 Engineering Workshop: Smart Contracts & Security',
      description: 'Three-day intensive workshop covering smart contract architecture, security patterns, and audit-ready development practices.',
      location: 'Jos, Nigeria',
      type: 'Workshop',
      capacity: '25 engineers',
      link: '#',
    },
    {
      date: 'Oct 5, 2024',
      title: 'ProdFest 2024: Showcase Your Web3 Projects',
      description: 'Annual demo day where our engineers and ecosystem builders showcase production dApps, protocols, and AI projects.',
      location: 'Jos Engineering Studio + Virtual',
      type: 'Demo Day',
      capacity: 'Open to public',
      link: '#',
    },
    {
      date: 'Oct 20 - 22, 2024',
      title: 'Protocol Development Hackathon',
      description: 'Build and compete: 48-hour hackathon focused on EVM and Solana protocol development with $50K in prizes.',
      location: 'Jos + Remote',
      type: 'Hackathon',
      capacity: '100+ participants',
      link: '#',
    },
  ]

  const pastEvents = [
    {
      date: 'Aug 10, 2024',
      title: 'AI Agents in DeFi: Technical Deep Dive',
      type: 'Workshop',
      attendees: '30+',
    },
    {
      date: 'Jul 28, 2024',
      title: 'Cohort 4 Graduation & Hiring Showcase',
      type: 'Hiring Event',
      attendees: '50+',
    },
    {
      date: 'Jul 15, 2024',
      title: 'Open Source Contribution Sprint',
      type: 'Community Event',
      attendees: '45+',
    },
    {
      date: 'Jul 1, 2024',
      title: 'Infrastructure & DevOps for Web3 Systems',
      type: 'Workshop',
      attendees: '35+',
    },
    {
      date: 'Jun 18, 2024',
      title: 'Frontend Development for dApps',
      type: 'Workshop',
      attendees: '40+',
    },
    {
      date: 'Jun 5, 2024',
      title: 'Smart Contract Auditing & Security',
      type: 'Workshop',
      attendees: '28+',
    },
  ]

  const eventTypes = ['All', 'Workshops', 'Hackathons', 'Demo Days', 'Community']

  return (
    <>
      {/* Hero - Calendar Focus Layout */}
      <section className="border-b border-dark-border mb-24 py-12">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // COMMUNITY EVENTS
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-6xl font-light leading-[1.1] tracking-tighter text-text-primary">
              Workshops, hackathons,
              <br />
              <span className="text-text-secondary">
                and showcases.
              </span>
            </h1>

            <p className="text-base text-text-secondary font-light max-w-2xl">
              Where we bring engineers together to learn, build, and showcase production-grade projects.
            </p>
          </div>

          {/* Next Event Highlight - Card Style */}
          {upcomingEvents.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8">
                <div className="p-8 border border-accent-purple/50 bg-gradient-to-br from-accent-purple/10 to-transparent relative overflow-hidden group">
                  <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-block text-[11px] font-mono tracking-widest text-accent-purple bg-accent-purple/20 border border-accent-purple/30 px-3 py-1">
                        NEXT EVENT
                      </span>
                      <span className="inline-block text-[11px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-3 py-1">
                        {upcomingEvents[0].type}
                      </span>
                    </div>

                    <h2 className="text-2xl font-light text-text-primary leading-tight">
                      {upcomingEvents[0].title}
                    </h2>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary font-light">
                      <div className="flex items-center gap-1">
                        <span>📅</span>
                        <span>{upcomingEvents[0].date}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <span>📍</span>
                        <span>{upcomingEvents[0].location}</span>
                      </div>
                    </div>

                    <p className="text-sm text-text-secondary font-light leading-relaxed">
                      {upcomingEvents[0].description}
                    </p>

                    <a
                      href={upcomingEvents[0].link}
                      className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-accent-purple text-accent-purple hover:bg-accent-purple hover:text-dark-bg transition-all text-xs tracking-widest uppercase font-mono"
                    >
                      Learn More <span>→</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Stats Column */}
              <div className="lg:col-span-4 space-y-4">
                <div className="p-6 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                  <p className="text-4xl font-light text-accent-purple mb-2">
                    {upcomingEvents.length}
                  </p>
                  <p className="text-xs text-text-muted font-light">Upcoming Events</p>
                </div>

                <div className="p-6 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                  <p className="text-4xl font-light text-accent-purple mb-2">
                    1000+
                  </p>
                  <p className="text-xs text-text-muted font-light">Engineers Engaged</p>
                </div>

                <div className="p-6 border border-dark-border hover:border-accent-pink hover:bg-accent-pink/5 transition-all text-center">
                  <p className="text-4xl font-light text-accent-purple mb-2">
                    3
                  </p>
                  <p className="text-xs text-text-muted font-light">Events Per Quarter</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Event Type Filter */}
      <div className="mb-16 pb-12 border-b border-dark-border">
        <p className="text-xs tracking-widest text-text-muted uppercase mb-6 font-normal">Filter events</p>
        <div className="flex flex-wrap gap-3">
          {eventTypes.map((type) => (
            <button
              key={type}
              className={`px-4 py-2 border text-xs tracking-widest font-light transition-all duration-300 ${
                type === 'All'
                  ? 'border-accent-purple text-accent-purple bg-accent-purple/10'
                  : 'border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Upcoming <em className="italic font-light text-text-secondary">events</em>
        </h2>
        <div className="space-y-6 max-w-4xl">
          {upcomingEvents.map((event, i) => (
            <a
              key={event.title}
              href={event.link}
              className="group block p-8 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <div className="flex items-start gap-6">
                <div className="flex-shrink-0 pt-1">
                  <span className="text-xs font-mono text-accent-purple">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="text-xs text-text-muted font-light mb-2">{event.date}</p>
                      <h3 className="text-xl font-light text-text-primary group-hover:text-accent-purple transition-all mb-3">
                        {event.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono tracking-widest text-accent-pink bg-accent-pink/10 border border-accent-pink/20 px-2.5 py-0.5 whitespace-nowrap">
                      {event.type}
                    </span>
                  </div>

                  <p className="text-sm text-text-secondary font-light leading-relaxed mb-4">
                    {event.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-muted font-light">
                    <div className="flex items-center gap-1">
                      <span>📍</span>
                      <span>{event.location}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <span>👥</span>
                      <span>{event.capacity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="mb-24 pb-12 border-b border-dark-border">
        <h2 className="text-3xl font-light mb-12 tracking-tighter text-text-primary">
          Recent <em className="italic font-light text-text-secondary">events</em>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
          {pastEvents.map((event) => (
            <div
              key={event.title}
              className="group p-6 border border-dark-border hover:border-accent-purple hover:bg-accent-purple/5 transition-all duration-300 relative"
            >
              <div className="absolute top-0 left-0 w-0 h-[1px] bg-gradient-to-r from-accent-purple to-accent-pink group-hover:w-full transition-all duration-500" />

              <p className="text-xs text-text-muted font-light mb-3">{event.date}</p>
              <h3 className="text-base font-light text-text-primary mb-4 leading-tight group-hover:text-accent-purple transition-colors">
                {event.title}
              </h3>
              <div className="flex items-center justify-between text-xs text-text-muted font-light">
                <span className="px-2 py-1 border border-dark-border text-[10px]">{event.type}</span>
                <span>{event.attendees} attended</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Event Info */}
      <section className="py-12 text-center border-t border-dark-border">
        <h3 className="text-2xl font-light text-text-primary mb-4">Want to host an event?</h3>
        <p className="text-sm text-text-secondary mb-8 max-w-xl mx-auto">
          We partner with protocols, companies, and communities to host workshops, hackathons, and showcase events. Let's build something great together.
        </p>
        <a href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple transition-all duration-300 text-xs tracking-widest uppercase font-mono">
          Get in Touch
          <span>→</span>
        </a>
      </section>
    </>
  )
}
