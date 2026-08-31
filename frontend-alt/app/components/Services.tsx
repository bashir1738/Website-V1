export default function Services() {
  const services = [
    {
      title: 'AI-Native Engineering',
      desc: 'Teach software foundations alongside modern AI tool integration'
    },
    {
      title: 'Applied AI Engineering',
      desc: 'Design, build, and deploy AI-powered products reliably'
    },
    {
      title: 'Blockchain Engineering',
      desc: 'Smart contracts, decentralized applications, and infrastructure'
    },
    {
      title: 'Team Training',
      desc: 'Customized enterprise programs for organizational upskilling'
    },
    {
      title: 'Engineering Services',
      desc: 'Senior technical advisory and system delivery across domains'
    },
    {
      title: 'Talent Services',
      desc: 'Graduate placement, contracts, and ecosystem partnerships'
    }
  ]

  return (
    <section id="services" className="mb-24 pb-12 border-b border-dark-border">
      <div className="text-xs tracking-widest bg-gradient-to-r from-accent-purple to-accent-pink bg-clip-text text-transparent text-center mb-4 font-normal">
        02 / Programs
      </div>
      <h3 className="text-3xl font-serif font-light text-center mb-12 tracking-tighter text-text-primary">
        Training <em className="italic font-light text-text-secondary">programs</em>
      </h3>
      <ul className="grid grid-cols-2 gap-6 max-w-2xl mx-auto list-none p-0 m-0">
        {services.map((service, i) => (
          <li
            key={service.title}
            className="px-6 py-6 bg-white/2 border border-dark-border text-center hover:border-accent-purple hover:bg-accent-purple/8 transition-all duration-300 transform hover:-translate-y-0.5 backdrop-blur-sm"
          >
            <strong className="block text-white font-normal text-sm mb-2">
              {String(i + 1).padStart(2, '0')}. {service.title}
            </strong>
            <p className="text-xs text-text-secondary font-light leading-tight">{service.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
