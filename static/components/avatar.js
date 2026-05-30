// High-Quality, Glossy Cartoon SVG Avatars Generator for Gartic Phone Style

export const BG_COLORS = [
    "#FFADAD", "#FFD6A5", "#FDFFB6", "#CAFFBF",
    "#9BF6FF", "#A0C4FF", "#BDB2FF", "#FFC6FF",
    "#ECE4B7", "#D0F4DE", "#FF9999", "#E8A598"
];

export const BODY_COLORS = [
    "#F4A261", "#E76F51", "#2A9D8F", "#E9C46A",
    "#457B9D", "#1D3557", "#A8DADC", "#8D99AE",
    "#FFB703", "#FB8500", "#219EBC", "#6A4C93"
];

export const EYE_OPTIONS = [
    // 0: Happy/Dots with small sparkles
    `<circle cx="39" cy="45" r="5" fill="#2c2d42" />
     <circle cx="37.5" cy="43.5" r="1.5" fill="#fff" />
     <circle cx="61" cy="45" r="5" fill="#2c2d42" />
     <circle cx="59.5" cy="43.5" r="1.5" fill="#fff" />`,
     
    // 1: Cute Starry/Shining eyes
    `<g>
        <circle cx="38" cy="45" r="7" fill="#2c2d42" />
        <path d="M38 41 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z" fill="#fff" />
        <circle cx="62" cy="45" r="7" fill="#2c2d42" />
        <path d="M62 41 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z" fill="#fff" />
     </g>`,
     
    // 2: Cool Sunglasses with gradients
    `<g>
        <path d="M25 40 h18 l-3 10 h-12 z" fill="url(#lens-grad)" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M57 40 h18 l-3 10 h-12 z" fill="url(#lens-grad)" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M43 42 h14" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
     </g>`,
     
    // 3: Nerd Glasses
    `<g>
        <circle cx="38" cy="45" r="9" fill="none" stroke="#2c2d42" stroke-width="4.5" />
        <circle cx="62" cy="45" r="9" fill="none" stroke="#2c2d42" stroke-width="4.5" />
        <line x1="47" y1="45" x2="53" y2="45" stroke="#2c2d42" stroke-width="4.5" />
        <path d="M29 45 L22 41 M71 45 L78 41" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
     </g>`,
     
    // 4: Wink/Anime Happy
    `<g>
        <path d="M30 46 q8 -8 14 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
        <circle cx="62" cy="45" r="6" fill="#2c2d42" />
        <circle cx="60.5" cy="43" r="2" fill="#fff" />
     </g>`,
     
    // 5: Crazy / Dizzy Spirals
    `<g>
        <path d="M33 45 a5 5 0 1 0 10 0 a4 4 0 1 0 -8 0 a3 3 0 1 0 6 0" fill="none" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <path d="M57 45 a5 5 0 1 0 10 0 a4 4 0 1 0 -8 0 a3 3 0 1 0 6 0" fill="none" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
     </g>`
];

export const MOUTH_OPTIONS = [
    // 0: Classic Cute Smile
    `<path d="M42 62 q8 7 16 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />`,
    
    // 1: Big open laughing mouth (with teeth/tongue)
    `<g>
        <path d="M38 58 q12 14 24 0 z" fill="#800f2f" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <path d="M42 59 h16 v3 h-16 z" fill="#fff" />
        <path d="M44 68 q6 -6 12 0 z" fill="#ff758f" />
     </g>`,
     
    // 2: Silly Tongue Out
    `<g>
        <path d="M40 60 q10 6 20 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
        <path d="M47 62 q0 10 3 10 q3 0 3 -10 z" fill="#ff4d6d" stroke="#2c2d42" stroke-width="3.5" stroke-linejoin="round" />
     </g>`,
     
    // 3: Funny Mustache with Beard stubble
    `<g>
        <!-- Stubble -->
        <path d="M32 58 q18 16 36 0" fill="none" stroke="#2c2d42" stroke-width="3" stroke-dasharray="2,3" opacity="0.4" />
        <!-- Mustache -->
        <path d="M43 61 q7 -5 14 0 q-7 8 -14 0" fill="#2c2d42" stroke="#2c2d42" stroke-width="2.5" />
        <path d="M57 61 q-7 -5 14 0 q7 8 14 0" fill="#2c2d42" stroke="#2c2d42" stroke-width="2.5" />
     </g>`,
     
    // 4: Flat Neutral Line
    `<line x1="43" y1="62" x2="57" y2="62" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />`,
    
    // 5: Surprised / Screaming O
    `<ellipse cx="50" cy="62" rx="6" ry="9" fill="#800f2f" stroke="#2c2d42" stroke-width="4" />`
];

export const ACCESSORY_OPTIONS = [
    // 0: None
    ``,
    
    // 1: Baseball Cap with gradient and logo
    `<g>
        <path d="M25 28 q25 -18 50 0 z" fill="url(#cap-grad)" stroke="#2c2d42" stroke-width="4.5" />
        <path d="M72 28 q18 -5 23 2 q3 10 -20 3" fill="#ffd166" stroke="#2c2d42" stroke-width="4" />
        <ellipse cx="50" cy="18" rx="3.5" ry="2" fill="#fff" stroke="#2c2d42" stroke-width="2.5" />
        <circle cx="50" cy="24" r="2.5" fill="#fff" />
     </g>`,
     
    // 2: Shiny Crown
    `<g>
        <path d="M28 28 l6 -16 l16 11 l16 -11 l6 16 z" fill="url(#crown-grad)" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <circle cx="28" cy="12" r="3.5" fill="#ef476f" stroke="#2c2d42" stroke-width="2" />
        <circle cx="50" cy="23" r="3.5" fill="#118ab2" stroke="#2c2d42" stroke-width="2" />
        <circle cx="72" cy="12" r="3.5" fill="#ef476f" stroke="#2c2d42" stroke-width="2" />
     </g>`,
     
    // 3: DJ Headphones
    `<g>
        <path d="M24 48 q0 -34 26 -34 q26 0 26 34" fill="none" stroke="#2b2d42" stroke-width="6.5" stroke-linecap="round" />
        <path d="M24 48 q0 -34 26 -34 q26 0 26 34" fill="none" stroke="#118ab2" stroke-width="3" stroke-linecap="round" />
        <rect x="18" y="38" width="9" height="18" rx="4.5" fill="#ef476f" stroke="#2c2d42" stroke-width="3.5" />
        <rect x="73" y="38" width="9" height="18" rx="4.5" fill="#ef476f" stroke="#2c2d42" stroke-width="3.5" />
     </g>`,
     
    // 4: Bunny Ears
    `<g>
        <!-- Left Ear -->
        <path d="M33 24 Q20 -5 26 -5 Q38 -5 38 20" fill="#fff" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M31 22 Q24 0 28 0 Q34 0 35 18" fill="#ff85a2" />
        <!-- Right Ear -->
        <path d="M67 24 Q80 -5 74 -5 Q62 -5 62 20" fill="#fff" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M69 22 Q76 0 72 0 Q66 0 65 18" fill="#ff85a2" />
     </g>`,
     
    // 5: Cool Pirate Hat with Skull
    `<g>
        <path d="M20 28 Q50 10 80 28 Q50 20 20 28 Z" fill="#2c2d42" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M34 26 Q50 -5 66 26 Z" fill="#2c2d42" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <!-- Miniature skull and bones -->
        <circle cx="50" cy="14" r="3.5" fill="#fff" />
        <rect x="48.5" y="16.5" width="3" height="3" rx="1" fill="#fff" />
        <line x1="44" y1="10" x2="56" y2="18" stroke="#fff" stroke-width="1.5" />
        <line x1="56" y1="10" x2="44" y2="18" stroke="#fff" stroke-width="1.5" />
     </g>`
];

export function getRandomAvatarConfig() {
    return {
        bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
        bodyColor: BODY_COLORS[Math.floor(Math.random() * BODY_COLORS.length)],
        eyes: Math.floor(Math.random() * EYE_OPTIONS.length),
        mouth: Math.floor(Math.random() * MOUTH_OPTIONS.length),
        accessory: Math.floor(Math.random() * ACCESSORY_OPTIONS.length)
    };
}

export function renderAvatarSvg(config) {
    const bg = config.bgColor || "#FFADAD";
    const body = config.bodyColor || "#F4A261";
    const eyes = EYE_OPTIONS[config.eyes] || EYE_OPTIONS[0];
    const mouth = MOUTH_OPTIONS[config.mouth] || MOUTH_OPTIONS[0];
    const accessory = ACCESSORY_OPTIONS[config.accessory] || ACCESSORY_OPTIONS[0];

    return `
    <svg viewBox="0 0 100 100" class="avatar-svg" style="width: 100%; height: 100%; display: block; border-radius: 50%;">
        <defs>
            <!-- Background Radial Gradient -->
            <radialGradient id="bg-grad-${bg.replace('#','')}" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="${bg}"/>
            </radialGradient>
            <!-- Body Linear Gradient for 3D look -->
            <linearGradient id="body-grad-${body.replace('#','')}" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="${body}"/>
                <stop offset="100%" stop-color="${adjustBrightness(body, -25)}"/>
            </linearGradient>
            <!-- Lens gradient for sunglasses -->
            <linearGradient id="lens-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ab47bc" />
                <stop offset="100%" stop-color="#ef476f" />
            </linearGradient>
            <!-- Cap gradient -->
            <linearGradient id="cap-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ef476f" />
                <stop offset="100%" stop-color="#b5179e" />
            </linearGradient>
            <!-- Crown gradient -->
            <linearGradient id="crown-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#ffd166" />
                <stop offset="100%" stop-color="#f5a623" />
            </linearGradient>
        </defs>

        <!-- Background circle -->
        <circle cx="50" cy="50" r="50" fill="url(#bg-grad-${bg.replace('#','')})" />

        <!-- Head / Body Base with 3D gradient -->
        <circle cx="50" cy="52" r="32" fill="url(#body-grad-${body.replace('#','')})" stroke="#2c2d42" stroke-width="4.5" />
        
        <!-- White Glossy Reflection Highlight -->
        <ellipse cx="36" cy="34" rx="10" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-25 36 34)" />

        <!-- Cheeks Blush -->
        <circle cx="28" cy="54" r="4.5" fill="#ff758f" opacity="0.65" />
        <circle cx="72" cy="54" r="4.5" fill="#ff758f" opacity="0.65" />
        
        <!-- Eyes -->
        ${eyes}
        
        <!-- Mouth -->
        ${mouth}
        
        <!-- Accessories / Hat -->
        ${accessory}
    </svg>
    `;
}

// Simple color adjuster helper to darken body color for bottom gradients
function adjustBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    let rHex = R.toString(16).padStart(2, '0');
    let gHex = G.toString(16).padStart(2, '0');
    let bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
}
