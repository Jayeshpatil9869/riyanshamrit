import React, { useRef, useState } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
  enableTilt?: boolean;
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(218, 197, 167, 0.22)',
  spotlightRadius = 500,
  enableTilt = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setPosition({ x, y });

    if (enableTilt) {
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -6; // max 6 deg
      const rotateY = ((x - centerX) / centerX) * 6;
      setRotate({ x: rotateX, y: rotateY });
    }
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
    if (enableTilt) {
      setRotate({ x: 0, y: 0 });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: enableTilt
          ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
          : undefined,
        transition: enableTilt
          ? 'transform 0.15s ease-out, box-shadow 0.3s ease'
          : undefined,
      }}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Spotlight radial beam */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 rounded-[inherit] z-10"
        style={{
          opacity,
          background: `radial-gradient(${spotlightRadius}px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 50%)`,
        }}
      />
      {children}
    </div>
  );
};
