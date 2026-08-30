import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Blockfuse Labs',
  description: 'Develop production-ready engineers',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-dark-bg text-text-primary">
        {children}
      </body>
    </html>
  )
}
