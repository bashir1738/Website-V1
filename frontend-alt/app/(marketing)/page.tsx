import Hero from '@/app/components/Hero'
import ProgramPaths from '@/app/components/ProgramPaths'
import CoreReality from '@/app/components/CoreReality'
import ForStudentsAndOrgs from '@/app/components/ForStudentsAndOrgs'
import HowItWorks from '@/app/components/HowItWorks'
import EventsAndOpenSource from '@/app/components/EventsAndOpenSource'
import CohortShowcase from '@/app/components/CohortShowcase'
import About from '@/app/components/About'
import FinalCTA from '@/app/components/FinalCTA'

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <ProgramPaths />
      <CoreReality />
      <ForStudentsAndOrgs />
      <HowItWorks />
      <EventsAndOpenSource />
      <CohortShowcase />
      <About />
      <FinalCTA />
    </div>
  )
}
