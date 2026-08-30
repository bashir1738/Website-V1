export default function Work() {
  const projects = [
    {
      title: 'Intensive Bootcamp',
      description: 'Structured training with real-world projects and professional code review',
      id: 1
    },
    {
      title: 'Supervised Residency',
      description: 'Hands-on mentorship and career guidance from industry experts',
      id: 2
    },
    {
      title: 'ProdFest 2026',
      description: 'Annual showcase where cohorts demonstrate shipped products',
      id: 3
    },
    {
      title: 'Ecosystem Access',
      description: 'Networking with founders, investors, and tech partners',
      id: 4
    }
  ]

  return (
    <section id="work" className="mb-24 pb-12 border-b border-dark-border">
      <div className="text-xs tracking-widest bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent text-center mb-4 font-normal">
        03 / Process
      </div>
      <h3 className="text-3xl font-serif font-light text-center mb-12 tracking-tighter text-text-primary">
        Our <em className="italic font-light text-text-secondary">approach</em>
      </h3>
      <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
        {projects.map((project, i) => (
          <div key={project.id} className="text-center">
            <div className="text-xs tracking-widest bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent mb-4 font-normal">
              {String(i + 1).padStart(2, '0')}
            </div>
            <div className="w-full aspect-square bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 border border-dark-border mb-4 hover:border-accent-purple hover:from-accent-purple/15 hover:to-accent-pink/15 transition-all duration-300 transform hover:-translate-y-1 backdrop-blur-sm"></div>
            <h4 className="text-lg font-light text-text-primary mb-2 tracking-normal">{project.title}</h4>
            <p className="text-xs text-text-secondary font-light">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
