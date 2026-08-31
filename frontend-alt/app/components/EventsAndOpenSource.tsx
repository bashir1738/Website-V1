'use client'

import React, { useState, useEffect } from 'react'

export default function EventsAndOpenSource() {
  const [activeTab, setActiveTab] = useState<'events' | 'opensource'>('events')
  const [currentEventIndex, setCurrentEventIndex] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [currentOSIndex, setCurrentOSIndex] = useState(0)

  // Mock Events Data with Real Image URLs
  const events = [
    {
      id: 1,
      name: 'ProdFest 2024',
      date: 'Oct 5, 2024',
      description: 'Annual showcase where engineers demo production dApps, protocols, and AI projects',
      logo: '🚀',
      images: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=95',
      ],
    },
    {
      id: 2,
      name: 'Quai Meetup',
      date: 'Sep 20, 2024',
      description: 'Technical deep dive into Quai network protocol development and integration',
      logo: '🔗',
      images: [
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=85',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=75',
        'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=400&h=400&fit=crop&q=80',
      ],
    },
    {
      id: 3,
      name: 'Web3 Engineering Workshop',
      date: 'Sep 15-17, 2024',
      description: 'Three-day intensive covering smart contracts, security, and audit-ready practices',
      logo: '⚙️',
      images: [
        'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=400&h=400&fit=crop&q=90',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop&q=85',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
      ],
    },
    {
      id: 4,
      name: 'Protocol Development Hackathon',
      date: 'Oct 20-22, 2024',
      description: '48-hour hackathon with $50K in prizes for EVM and Solana protocol development',
      logo: '🏆',
      images: [
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop&q=80',
        'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=85',
        'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=400&h=400&fit=crop&q=75',
        'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
      ],
    },
  ]

  // Mock Open Source Data with Real Logo/Image URLs
  const openSourceProjects = [
    {
      id: 1,
      name: 'Foundry',
      description: 'Core contributor to Ethereum smart contract development framework',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop',
    },
    {
      id: 2,
      name: 'The Graph',
      description: 'Subgraph development and indexing infrastructure improvements',
      logo: 'https://images.unsplash.com/photo-1540575467063-178f50002cbc?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Solana Programs',
      description: 'Rust-based smart contract development and optimization',
      logo: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Web3.py',
      description: 'Python Web3 library enhancements and documentation',
      logo: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=400&fit=crop&q=90',
    },
  ]

  // Rotate through events and images
  useEffect(() => {
    const eventTimer = setInterval(() => {
      setCurrentEventIndex((prev) => (prev + 1) % events.length)
      setCurrentImageIndex(0)
    }, 10000)

    return () => clearInterval(eventTimer)
  }, [])

  // Rotate through images within current event
  useEffect(() => {
    if (activeTab !== 'events') return

    const imageTimer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % events[currentEventIndex].images.length)
    }, 2000)

    return () => clearInterval(imageTimer)
  }, [currentEventIndex, activeTab, events])

  // Rotate through open source projects
  useEffect(() => {
    if (activeTab !== 'opensource') return

    const osTimer = setInterval(() => {
      setCurrentOSIndex((prev) => (prev + 1) % openSourceProjects.length)
    }, 5000)

    return () => clearInterval(osTimer)
  }, [activeTab, openSourceProjects])

  const currentEvent = events[currentEventIndex]
  const currentImage = currentEvent.images[currentImageIndex]
  const currentOS = openSourceProjects[currentOSIndex]

  return (
    <section className="border-b border-dark-border">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 h-screen py-4">
        {/* LEFT SIDE - Controls & Info */}
        <div className="lg:col-span-5 border-r border-dark-border py-12 px-8 overflow-y-auto flex flex-col justify-center space-y-8">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-purple/10 border border-accent-purple/30 text-[11px] font-mono tracking-widest text-accent-purple uppercase w-fit">
              <span className="h-1.5 w-1.5 bg-accent-purple inline-block animate-pulse" />
              // COMMUNITY & ECOSYSTEM
            </div>

            <h2 className="text-3xl lg:text-4xl font-light tracking-tighter text-text-primary leading-tight">
              Events &
              <br />
              <em className="font-light text-text-secondary">open source</em>
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300 border ${
                activeTab === 'events'
                  ? 'border-accent-purple text-accent-purple bg-accent-purple/10'
                  : 'border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple'
              }`}
            >
              Events
            </button>
            <button
              onClick={() => setActiveTab('opensource')}
              className={`px-4 py-2 text-xs tracking-widest uppercase font-light transition-all duration-300 border ${
                activeTab === 'opensource'
                  ? 'border-accent-purple text-accent-purple bg-accent-purple/10'
                  : 'border-dark-border text-text-primary hover:border-accent-purple hover:text-accent-purple'
              }`}
            >
              Open Source
            </button>
          </div>

          {/* EVENT DETAILS */}
          {activeTab === 'events' && (
            <div className="space-y-6 flex-1">
              {/* Pulsing Circle */}
              <div className="relative inline-block">
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-purple to-accent-pink flex items-center justify-center text-4xl shadow-lg animate-pulse">
                  {currentEvent.logo}
                </div>
                <div className="absolute inset-0 rounded-full bg-accent-purple/20 animate-ping" />
              </div>

              {/* Event Info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-light text-text-primary">
                  {currentEvent.name}
                </h3>
                <p className="text-sm text-text-secondary font-light">
                  📅 {currentEvent.date}
                </p>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {currentEvent.description}
                </p>
              </div>

              {/* Gallery Indicator */}
              <div className="space-y-2 pt-4 border-t border-dark-border/50">
                <p className="text-xs text-text-muted font-light tracking-widest uppercase">
                  Gallery
                </p>
                <div className="flex gap-2">
                  {currentEvent.images.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1 transition-all duration-500 ${
                        idx === currentImageIndex ? 'w-8 bg-accent-purple' : 'w-2 bg-dark-border'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Progress */}
              <div className="text-xs text-text-muted font-light">
                Event {currentEventIndex + 1} of {events.length} • Image {currentImageIndex + 1} of{' '}
                {currentEvent.images.length}
              </div>
            </div>
          )}

          {/* PROJECT DETAILS */}
          {activeTab === 'opensource' && (
            <div className="space-y-6 flex-1">
              {/* Pulsing Circle with Logo */}
              <div className="relative inline-block">
                <img src={currentOS.logo} className="w-20 h-20 rounded-full bg-gradient-to-r from-accent-pink to-accent-purple flex items-center justify-center text-4xl shadow-lg animate-pulse" />
                <div className="absolute inset-0 rounded-full bg-accent-pink/20 animate-ping" />
              </div>

              {/* Project Info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-light text-text-primary">
                  {currentOS.name}
                </h3>
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {currentOS.description}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-text-primary hover:text-accent-pink transition-colors uppercase"
                >
                  View on GitHub <span>→</span>
                </a>
              </div>

              {/* Progress */}
              <div className="text-xs text-text-muted font-light pt-4 border-t border-dark-border/50">
                Project {currentOSIndex + 1} of {openSourceProjects.length}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT SIDE - Full Height Images */}
        <div className="lg:col-span-7 h-full bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 flex items-center justify-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-accent-purple/5 to-accent-pink/5 group-hover:from-accent-purple/10 group-hover:to-accent-pink/10 transition-all" />

          {/* Image Showcase */}
          <div className="relative z-10 w-full h-full">
            {/* Main Large Image - Full Cover */}
            <img
              src={activeTab === 'events' ? currentImage : currentOS.logo}
              alt={activeTab === 'events' ? currentEvent.name : currentOS.name}
              className="w-full h-full object-cover animate-fade-in-out transition-all duration-1000"
            />

            {/* Thumbnail Gallery - Absolute Bottom */}
            <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-3 px-8">
              {activeTab === 'events' ? (
                currentEvent.images.map((img, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg overflow-hidden transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                      idx === currentImageIndex ? 'scale-110 opacity-100 ring-2 ring-white' : 'scale-75 opacity-50 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${currentEvent.name} ${idx + 1}`}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))
              ) : (
                openSourceProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className={`rounded-lg overflow-hidden transition-all duration-500 cursor-pointer backdrop-blur-sm ${
                      idx === currentOSIndex ? 'scale-110 opacity-100 ring-2 ring-white' : 'scale-75 opacity-50 hover:opacity-70'
                    }`}
                  >
                    <img
                      src={project.logo}
                      alt={project.name}
                      className="w-16 h-16 object-cover"
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInOut {
          0%, 100% { opacity: 1; }
          45%, 55% { opacity: 1; }
        }
        .animate-fade-in-out {
          animation: fadeInOut 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
