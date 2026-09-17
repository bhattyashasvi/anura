import React from 'react';

interface AnuraLogoProps {
  variant?: 'full' | 'icon' | 'white';
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const AnuraLogo: React.FC<AnuraLogoProps> = ({
  variant = 'full',
  className = '',
  size = 'md'
}) => {
  const sizeMap = {
    sm: { icon: 28, text: 'text-xl', sub: 'text-[9px]' },
    md: { icon: 38, text: 'text-2xl', sub: 'text-[11px]' },
    lg: { icon: 52, text: 'text-3xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size];
  const isWhite = variant === 'white';

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized Geometric 'A' Monogram Icon from Attachment */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105 shrink-0"
        style={{
          width: Math.round(currentSize.icon * 1.15),
          height: currentSize.icon,
        }}
        title="Anura"
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1000 870"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          <g fill={isWhite ? '#FFFFFF' : '#0F1738'}>
            {/* Lower-left wave & foot */}
            <path d="M 35 830 L 205 830 L 348 440 C 258 440, 148 522, 116 610 L 35 830 Z" />
            
            {/* Upper central wave */}
            <path d="M 348 440 L 518 440 L 646 45 C 555 45, 481 76, 443 180 L 348 440 Z" />
            
            {/* Right pillar */}
            <path d="M 646 45 C 725 45, 792 82, 842 180 L 966 830 L 796 830 L 646 45 Z" />
          </g>
        </svg>
      </div>

      {variant !== 'icon' && (
        <div className="flex flex-col">
          <div className="flex items-baseline gap-1.5">
            <span
              className={`font-extrabold tracking-tight font-sans ${currentSize.text} ${
                isWhite ? 'text-white' : 'text-[#121942]'
              }`}
              style={{ letterSpacing: '-0.03em' }}
            >
              anura
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#F26B3B] mb-1 inline-block animate-pulse"></span>
          </div>
          <span
            className={`font-medium tracking-wide -mt-1 ${currentSize.sub} ${
              isWhite ? 'text-[#AEE1F9]' : 'text-[#8E8E93]'
            }`}
          >
            where growth finds beauty
          </span>
        </div>
      )}
    </div>
  );
};
