import Navigation from '@/app/components/Navigation'
import AppFooter from '@/app/components/AppFooter'

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-dark-bg overflow-hidden">

      {/* Left column — empty, border-right runs full height */}
      <div style={{ flex: '0.5' }} className="hidden xl:block shrink-0 border-r border-dark-border h-full" />

      {/* Middle column — nav on top, scrollable content below */}
      <div style={{ flex: '3' }} className="flex flex-col flex-1 h-full overflow-hidden">
        <Navigation />

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          <div className="px-6 py-8 sm:px-12 sm:py-10 md:px-16 md:py-12">
            {children}
            <AppFooter />
          </div>
        </div>
      </div>

      {/* Right column — empty, border-left runs full height */}
      <div style={{ flex: '0.5' }} className="hidden xl:block shrink-0 border-l border-dark-border h-full" />

    </div>
  )
}
