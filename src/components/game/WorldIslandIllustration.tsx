import React from 'react';

export type WorldId =
  | 'vocabulary-island'
  | 'grammar-castle'
  | 'pronunciation-jungle'
  | 'reading-forest'
  | 'listening-cave';

interface Props {
  worldId: WorldId | string;
  size?: 'sm' | 'md' | 'lg' | 'banner';
  className?: string;
}

export const WorldIslandIllustration: React.FC<Props> = ({
  worldId,
  size = 'md',
  className = '',
}) => {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-28 h-28 sm:w-32 sm:h-32',
    lg: 'w-44 h-44 sm:w-52 sm:h-52',
    banner: 'w-full h-36 sm:h-48 max-w-md',
  }[size];

  switch (worldId) {
    case 'vocabulary-island':
      return (
        <div className={`relative inline-block ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="vocabSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFF9E6" />
                <stop offset="100%" stopColor="#FFE082" />
              </linearGradient>
              <linearGradient id="vocabSand" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FFE082" />
                <stop offset="100%" stopColor="#FFB300" />
              </linearGradient>
              <linearGradient id="vocabWater" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4DD0E1" />
                <stop offset="100%" stopColor="#00ACC1" />
              </linearGradient>
              <linearGradient id="vocabRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#8D6E63" />
                <stop offset="100%" stopColor="#5D4037" />
              </linearGradient>
            </defs>

            {/* Floating Island Floating Base (underground soil/rock) */}
            <path d="M40 120 Q100 175 160 120 Q135 155 100 170 Q65 155 40 120 Z" fill="url(#vocabRock)" />
            {/* Rock cracks and roots */}
            <path d="M85 135 L95 155 L105 145" stroke="#4E342E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <path d="M120 130 L115 150" stroke="#4E342E" strokeWidth="2" fill="none" strokeLinecap="round" />

            {/* Island Grass & Sand Layer */}
            <ellipse cx="100" cy="120" rx="65" ry="22" fill="url(#vocabSand)" />
            <ellipse cx="100" cy="116" rx="58" ry="17" fill="#C8E6C9" />
            <ellipse cx="98" cy="114" rx="52" ry="14" fill="#81C784" />

            {/* Turquoise Island Water Ring */}
            <path d="M30 125 Q100 148 170 125 Q100 152 30 125 Z" fill="url(#vocabWater)" opacity="0.85" />

            {/* Palm Tree Trunk */}
            <path d="M85 116 Q80 80 95 65 Q98 80 92 116 Z" fill="#8D6E63" />
            <path d="M86 100 Q89 98 92 100" stroke="#5D4037" strokeWidth="1.5" fill="none" />
            <path d="M88 85 Q91 83 94 85" stroke="#5D4037" strokeWidth="1.5" fill="none" />

            {/* Palm Tree Leaves */}
            <path d="M95 65 Q65 55 50 75 Q70 65 95 65 Z" fill="#43A047" />
            <path d="M95 65 Q85 40 75 35 Q85 50 95 65 Z" fill="#66BB6A" />
            <path d="M95 65 Q115 40 125 35 Q110 50 95 65 Z" fill="#43A047" />
            <path d="M95 65 Q135 55 145 75 Q120 65 95 65 Z" fill="#66BB6A" />
            <path d="M95 65 Q95 45 98 32 Q95 50 95 65 Z" fill="#81C784" />

            {/* Coconuts */}
            <circle cx="92" cy="67" r="4.5" fill="#5D4037" />
            <circle cx="98" cy="68" r="4" fill="#6D4C41" />

            {/* Golden Pirate Treasure Chest */}
            <rect x="115" y="105" width="24" height="15" rx="3" fill="#A1887F" stroke="#4E342E" strokeWidth="1.5" />
            <path d="M115 105 Q127 96 139 105 Z" fill="#FFB300" stroke="#FFA000" strokeWidth="1.5" />
            <circle cx="127" cy="112" r="2.5" fill="#FFD54F" />
            {/* Sparkle on Chest */}
            <path d="M136 98 L138 93 L140 98 L145 100 L140 102 L138 107 L136 102 L131 100 Z" fill="#FFF" />

            {/* Friendly Little Starfish */}
            <text x="60" y="125" fontSize="14">⭐</text>
            {/* Cartoon Sunny Cloud */}
            <circle cx="150" cy="50" r="14" fill="#FFEB3B" opacity="0.9" />
            <circle cx="140" cy="65" r="12" fill="#FFF" opacity="0.9" />
            <circle cx="155" cy="65" r="15" fill="#FFF" opacity="0.9" />
            <circle cx="168" cy="68" r="10" fill="#FFF" opacity="0.9" />
          </svg>
        </div>
      );

    case 'grammar-castle':
      return (
        <div className={`relative inline-block ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="castleRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5E35B1" />
                <stop offset="100%" stopColor="#311B92" />
              </linearGradient>
              <linearGradient id="castleWall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#9575CD" />
                <stop offset="100%" stopColor="#673AB7" />
              </linearGradient>
              <linearGradient id="castleRoof" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF7043" />
                <stop offset="100%" stopColor="#D84315" />
              </linearGradient>
            </defs>

            {/* Floating Island Floating Base */}
            <path d="M35 125 Q100 180 165 125 Q135 160 100 172 Q65 160 35 125 Z" fill="url(#castleRock)" />
            {/* Magical Glowing Crystals under island */}
            <polygon points="75,145 80,165 85,145" fill="#FFD54F" />
            <polygon points="115,145 120,168 125,145" fill="#80DEEA" />

            {/* Island Grass Surface */}
            <ellipse cx="100" cy="125" rx="66" ry="20" fill="#B39DDB" />
            <ellipse cx="100" cy="122" rx="58" ry="16" fill="#EDE7F6" />

            {/* Castle Central Keep */}
            <rect x="75" y="75" width="50" height="48" rx="2" fill="url(#castleWall)" />
            {/* Crenellations */}
            <rect x="75" y="70" width="10" height="6" fill="#7E57C2" />
            <rect x="95" y="70" width="10" height="6" fill="#7E57C2" />
            <rect x="115" y="70" width="10" height="6" fill="#7E57C2" />

            {/* Left Tower */}
            <rect x="52" y="65" width="24" height="58" rx="3" fill="#7E57C2" />
            <polygon points="50,65 64,35 78,65" fill="url(#castleRoof)" />
            {/* Left Tower Flag */}
            <line x1="64" y1="35" x2="64" y2="22" stroke="#FFD54F" strokeWidth="2" />
            <polygon points="64,22 80,27 64,32" fill="#FFB74D" />

            {/* Right Tower */}
            <rect x="124" y="65" width="24" height="58" rx="3" fill="#7E57C2" />
            <polygon points="122,65 136,35 150,65" fill="url(#castleRoof)" />
            {/* Right Tower Flag */}
            <line x1="136" y1="35" x2="136" y2="22" stroke="#FFD54F" strokeWidth="2" />
            <polygon points="136,22 152,27 136,32" fill="#FFB74D" />

            {/* Royal Portal / Gate */}
            <path d="M88 123 L88 102 Q100 94 112 102 L112 123 Z" fill="#FFCA28" stroke="#FFA000" strokeWidth="2" />
            <circle cx="100" cy="108" r="3" fill="#5D4037" />

            {/* Windows with Warm Golden Glow */}
            <rect x="60" y="80" width="8" height="12" rx="4" fill="#FFF59D" />
            <rect x="132" y="80" width="8" height="12" rx="4" fill="#FFF59D" />
            <rect x="96" y="82" width="8" height="12" rx="4" fill="#FFF59D" />

            {/* Floating Grammar Alphabet Blocks */}
            <rect x="36" y="96" width="16" height="16" rx="3" fill="#42A5F5" transform="rotate(-12 36 96)" />
            <text x="40" y="110" fontSize="12" fill="#FFF" fontWeight="bold" transform="rotate(-12 36 96)">A</text>

            <rect x="148" y="98" width="16" height="16" rx="3" fill="#66BB6A" transform="rotate(15 148 98)" />
            <text x="153" y="112" fontSize="12" fill="#FFF" fontWeight="bold" transform="rotate(15 148 98)">B</text>

            {/* Friendly Little Dragon Sparkles */}
            <text x="156" y="55" fontSize="16">✨</text>
            <text x="32" y="60" fontSize="14">⭐</text>
          </svg>
        </div>
      );

    case 'pronunciation-jungle':
      return (
        <div className={`relative inline-block ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="jungleRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2E7D32" />
                <stop offset="100%" stopColor="#1B5E20" />
              </linearGradient>
              <linearGradient id="jungleLeaf" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#66BB6A" />
                <stop offset="100%" stopColor="#388E3C" />
              </linearGradient>
            </defs>

            {/* Island Base with Hanging Jungle Vines */}
            <path d="M35 125 Q100 178 165 125 Q135 158 100 170 Q65 158 35 125 Z" fill="url(#jungleRock)" />
            <path d="M60 135 Q55 160 62 175" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M140 135 Q145 158 138 178" stroke="#4CAF50" strokeWidth="3" fill="none" strokeLinecap="round" />
            <path d="M100 145 Q96 168 102 182" stroke="#81C784" strokeWidth="2.5" fill="none" strokeLinecap="round" />

            {/* Island Surface */}
            <ellipse cx="100" cy="125" rx="66" ry="20" fill="#81C784" />
            <ellipse cx="100" cy="122" rx="58" ry="16" fill="#A5D6A7" />

            {/* Giant Exotic Jungle Leaves */}
            <path d="M50 120 Q30 70 70 60 Q80 90 50 120 Z" fill="url(#jungleLeaf)" />
            <path d="M150 120 Q170 70 130 60 Q120 90 150 120 Z" fill="url(#jungleLeaf)" />
            <path d="M100 120 Q80 50 100 35 Q120 50 100 120 Z" fill="#4CAF50" />

            {/* Exotic Tropical Parrot */}
            <ellipse cx="105" cy="85" rx="14" ry="20" fill="#E53935" />
            <circle cx="105" cy="70" r="10" fill="#E53935" />
            <circle cx="108" cy="68" r="3" fill="#FFF" />
            <circle cx="109" cy="68" r="1.5" fill="#000" />
            {/* Beak */}
            <polygon points="115,67 126,71 115,77" fill="#FFB300" />
            {/* Wing */}
            <path d="M96 82 Q115 88 102 102 Z" fill="#1E88E5" />
            {/* Tail feathers */}
            <path d="M100 102 L98 122 L104 122 L106 102 Z" fill="#FDD835" />

            {/* Sound Wave Rings (Pronunciation Echo) */}
            <circle cx="130" cy="65" r="8" fill="none" stroke="#00E676" strokeWidth="2.5" opacity="0.8" />
            <circle cx="130" cy="65" r="16" fill="none" stroke="#00E676" strokeWidth="2" opacity="0.5" strokeDasharray="4 4" />
            <circle cx="130" cy="65" r="24" fill="none" stroke="#00E676" strokeWidth="1.5" opacity="0.3" strokeDasharray="4 4" />

            {/* Sound Stone with "P" and "B" */}
            <ellipse cx="70" cy="118" rx="14" ry="10" fill="#90A4AE" />
            <text x="64" y="122" fontSize="10" fill="#FFF" fontWeight="black">P/B</text>

            <text x="40" y="85" fontSize="16">🌺</text>
            <text x="145" y="115" fontSize="14">🍃</text>
          </svg>
        </div>
      );

    case 'reading-forest':
      return (
        <div className={`relative inline-block ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="forestRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00838F" />
                <stop offset="100%" stopColor="#006064" />
              </linearGradient>
              <linearGradient id="treeCanopy" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4DD0E1" />
                <stop offset="100%" stopColor="#0097A7" />
              </linearGradient>
            </defs>

            {/* Island Base */}
            <path d="M35 125 Q100 178 165 125 Q135 158 100 170 Q65 158 35 125 Z" fill="url(#forestRock)" />

            {/* Forest Moss Surface */}
            <ellipse cx="100" cy="125" rx="66" ry="20" fill="#80DEEA" />
            <ellipse cx="100" cy="122" rx="58" ry="16" fill="#B2EBF2" />

            {/* Ancient Storybook Tree Center */}
            <rect x="94" y="80" width="12" height="45" rx="3" fill="#6D4C41" />
            <circle cx="100" cy="65" r="28" fill="url(#treeCanopy)" />
            <circle cx="85" cy="72" r="18" fill="#26C6DA" />
            <circle cx="115" cy="72" r="18" fill="#26C6DA" />
            <circle cx="100" cy="50" r="16" fill="#80DEEA" />

            {/* Left Pine Tree */}
            <rect x="62" y="95" width="6" height="28" fill="#5D4037" />
            <polygon points="50,110 65,85 80,110" fill="#00838F" />
            <polygon points="54,95 65,75 76,95" fill="#00ACC1" />

            {/* Right Pine Tree */}
            <rect x="132" y="95" width="6" height="28" fill="#5D4037" />
            <polygon points="120,110 135,85 150,110" fill="#00838F" />
            <polygon points="124,95 135,75 146,95" fill="#00ACC1" />

            {/* Magical Glowing Storybook Page on Island */}
            <rect x="90" y="112" width="20" height="14" rx="2" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1" transform="rotate(-5 90 112)" />
            <line x1="94" y1="116" x2="106" y2="116" stroke="#BDBDBD" strokeWidth="1.5" />
            <line x1="94" y1="120" x2="104" y2="120" stroke="#BDBDBD" strokeWidth="1.5" />

            {/* Friendly Little Orange Fox */}
            <ellipse cx="125" cy="116" rx="9" ry="7" fill="#FF7043" />
            <circle cx="132" cy="112" r="6" fill="#FF7043" />
            <polygon points="132,107 134,103 136,108" fill="#D84315" />
            <circle cx="134" cy="112" r="1" fill="#000" />
            <ellipse cx="118" cy="118" rx="6" ry="4" fill="#FF7043" transform="rotate(-20 118 118)" />

            {/* Magic Forest Mushrooms & Stars */}
            <text x="68" y="126" fontSize="12">🍄</text>
            <text x="145" y="70" fontSize="14">✨</text>
            <text x="45" y="65" fontSize="12">📖</text>
          </svg>
        </div>
      );

    case 'listening-cave':
      return (
        <div className={`relative inline-block ${sizeClasses} ${className}`}>
          <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="caveRock" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4A148C" />
                <stop offset="100%" stopColor="#1A237E" />
              </linearGradient>
              <linearGradient id="crystalPink" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#FF80AB" />
                <stop offset="100%" stopColor="#F50057" />
              </linearGradient>
              <linearGradient id="crystalPurple" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E040FB" />
                <stop offset="100%" stopColor="#7B1FA2" />
              </linearGradient>
              <linearGradient id="crystalCyan" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#18FFFF" />
                <stop offset="100%" stopColor="#00B0FF" />
              </linearGradient>
            </defs>

            {/* Island Base with Stalactites */}
            <path d="M35 125 Q100 180 165 125 Q135 160 100 174 Q65 160 35 125 Z" fill="url(#caveRock)" />
            {/* Hanging Glowing Stalactite Crystals */}
            <polygon points="70,140 75,168 80,140" fill="url(#crystalPink)" />
            <polygon points="120,140 125,172 130,140" fill="url(#crystalCyan)" />
            <polygon points="95,145 100,165 105,145" fill="url(#crystalPurple)" />

            {/* Cave Floor */}
            <ellipse cx="100" cy="125" rx="66" ry="20" fill="#311B92" />
            <ellipse cx="100" cy="122" rx="58" ry="16" fill="#4527A0" />

            {/* Arching Cave Cavern Silhouette */}
            <path d="M45 124 Q40 50 100 45 Q160 50 155 124 Q135 75 100 70 Q65 75 45 124 Z" fill="#283593" />
            <path d="M55 122 Q52 65 100 60 Q148 65 145 122 Q130 82 100 78 Q70 82 55 122 Z" fill="#1A237E" />

            {/* Glowing Crystal Clusters on Cave Floor */}
            {/* Cluster 1 Left (Cyan) */}
            <polygon points="65,122 70,88 77,122" fill="url(#crystalCyan)" />
            <polygon points="56,122 62,96 68,122" fill="#80D8FF" />
            <polygon points="73,122 80,102 85,122" fill="#0091EA" />

            {/* Cluster 2 Right (Pink / Magenta) */}
            <polygon points="125,122 132,85 139,122" fill="url(#crystalPink)" />
            <polygon points="118,122 123,98 128,122" fill="#FF4081" />
            <polygon points="135,122 142,95 148,122" fill="#C51162" />

            {/* Center Glowing Sound Crystal (Echo Shard) */}
            <polygon points="94,120 100,75 106,120" fill="url(#crystalPurple)" />
            <polygon points="98,120 100,75 106,120" fill="#EA80FC" opacity="0.6" />

            {/* Magical Glowing Echo Rings radiating from center crystal */}
            <ellipse cx="100" cy="75" rx="14" ry="7" fill="none" stroke="#EA80FC" strokeWidth="2" opacity="0.8" />
            <ellipse cx="100" cy="75" rx="26" ry="13" fill="none" stroke="#EA80FC" strokeWidth="1.5" opacity="0.5" strokeDasharray="4 4" />
            <ellipse cx="100" cy="75" rx="38" ry="19" fill="none" stroke="#18FFFF" strokeWidth="1" opacity="0.3" strokeDasharray="3 3" />

            {/* Shimmering Sparks & Headphone Sound Symbols */}
            <text x="94" y="60" fontSize="16">🎧</text>
            <text x="35" y="70" fontSize="14">✨</text>
            <text x="155" y="65" fontSize="14">💎</text>
          </svg>
        </div>
      );

    default:
      return null;
  }
};

