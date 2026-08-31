import React, { useMemo } from 'react'

export default function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 2 + Math.random() * 1,
      delay: Math.random() * 2,
      size: Math.random() * 2 + 1,
    }))
  }, [])

  const shootingStars = useMemo(() => {
    const edgePositions = [
      // From top edge
      { startX: Math.random() * 100, startY: -10, endX: Math.random() * 100 - 20, endY: 110 },
      // From bottom edge
      { startX: Math.random() * 100, startY: 110, endX: Math.random() * 100 - 20, endY: -10 },
      // From left edge
      { startX: -10, startY: Math.random() * 100, endX: 110, endY: Math.random() * 100 - 20 },
      // From right edge
      { startX: 110, startY: Math.random() * 100, endX: -10, endY: Math.random() * 100 - 20 },
      // From top-left corner
      { startX: -10, startY: -10, endX: 110, endY: 110 },
      // From top-right corner
      { startX: 110, startY: -10, endX: -10, endY: 110 },
      // From bottom-left corner
      { startX: -10, startY: 110, endX: 110, endY: -10 },
      // From bottom-right corner
      { startX: 110, startY: 110, endX: -10, endY: -10 },
    ]

    return Array.from({ length: 3 }).map((_, i) => {
      const position = edgePositions[Math.floor(Math.random() * edgePositions.length)]

      return {
        id: i,
        delay: i * 8 + Math.random() * 3,
        duration: 5 + Math.random() * 5,
        direction: {
          startX: `${position.startX}%`,
          startY: `${position.startY}%`,
          endX: `${position.endX}%`,
          endY: `${position.endY}%`,
        },
      }
    })
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden">
      {stars.map(star => (
        <div
          key={`star-${star.id}`}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: Math.random() * 0.5 + 0.3,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {shootingStars.map(star => (
        <div
          key={`shooting-star-${star.id}`}
          className="absolute"
          style={{
            width: '2px',
            height: '2px',
            background: 'white',
            boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.8)',
            animation: `shootingStar-${star.id} ${star.duration}s ease-in infinite`,
            animationDelay: `${star.delay}s`,
            left: star.direction.startX,
            top: star.direction.startY,
          }}
        />
      ))}

      <style>{`
        ${shootingStars.map((star, idx) => `
          @keyframes shootingStar-${idx} {
            0% {
              left: ${star.direction.startX};
              top: ${star.direction.startY};
              opacity: 1;
            }
            100% {
              left: ${star.direction.endX};
              top: ${star.direction.endY};
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  )
}
