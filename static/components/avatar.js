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
     </g>`,

    // 6: Cyborg Eye
    `<g>
        <circle cx="39" cy="45" r="5" fill="#2c2d42" />
        <circle cx="37.5" cy="43.5" r="1.5" fill="#fff" />
        <circle cx="61" cy="45" r="7" fill="none" stroke="#ef476f" stroke-width="3.5" />
        <circle cx="61" cy="45" r="3" fill="#ef476f" />
        <path d="M68 45 h6" stroke="#ef476f" stroke-width="2" />
     </g>`,

    // 7: Laser Eyes
    `<g>
        <circle cx="39" cy="45" r="5.5" fill="#ef476f" stroke="#2c2d42" stroke-width="2" />
        <circle cx="61" cy="45" r="5.5" fill="#ef476f" stroke="#2c2d42" stroke-width="2" />
        <line x1="39" y1="45" x2="31" y2="85" stroke="#ef476f" stroke-width="4.5" opacity="0.8" stroke-linecap="round" />
        <line x1="39" y1="45" x2="31" y2="85" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
        <line x1="61" y1="45" x2="69" y2="85" stroke="#ef476f" stroke-width="4.5" opacity="0.8" stroke-linecap="round" />
        <line x1="61" y1="45" x2="69" y2="85" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
     </g>`,

    // 8: Anime Tears/Crying
    `<g>
        <path d="M34 47 q5 -7 10 0" fill="none" stroke="#2c2d42" stroke-width="4" stroke-linecap="round" />
        <path d="M56 47 q5 -7 10 0" fill="none" stroke="#2c2d42" stroke-width="4" stroke-linecap="round" />
        <path d="M36 49 q0 8 -4 14" fill="none" stroke="#9bf6ff" stroke-width="3" stroke-linecap="round" />
        <path d="M64 49 q0 8 4 14" fill="none" stroke="#9bf6ff" stroke-width="3" stroke-linecap="round" />
     </g>`,

    // 9: 4-pointed stars eyes
    `<g>
        <path d="M38 37 L40 43 L46 45 L40 47 L38 53 L36 47 L30 45 L36 43 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="36.5" cy="43.5" r="1.5" fill="#fff" />
        <path d="M62 37 L64 43 L70 45 L64 47 L62 53 L60 47 L54 45 L60 43 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
        <circle cx="60.5" cy="43.5" r="1.5" fill="#fff" />
     </g>`,

    // 10: Harry Potter Glasses & Lightning Scar
    `<g>
        <path d="M43 26 L47 31 L44 31 L48 37" fill="none" stroke="#d90429" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
        <circle cx="38" cy="45" r="9" fill="none" stroke="#2c2d42" stroke-width="4.5" />
        <circle cx="62" cy="45" r="9" fill="none" stroke="#2c2d42" stroke-width="4.5" />
        <line x1="47" y1="45" x2="53" y2="45" stroke="#2c2d42" stroke-width="4.5" />
        <path d="M29 45 L22 41 M71 45 L78 41" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <circle cx="39" cy="45" r="5" fill="#2c2d42" />
        <circle cx="61" cy="45" r="5" fill="#2c2d42" />
        <circle cx="37.5" cy="43.5" r="1.5" fill="#fff" />
        <circle cx="59.5" cy="43.5" r="1.5" fill="#fff" />
     </g>`,

    // 11: Electric Lightning Eyes
    `<g>
        <path d="M33 41 L43 45 L38 46 L42 51 L32 47 L37 46 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M57 41 L67 45 L62 46 L66 51 L56 47 L61 46 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M28 42 L24 38 M72 42 L76 38" stroke="#ffd166" stroke-width="2" stroke-linecap="round" />
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
    `<ellipse cx="50" cy="62" rx="6" ry="9" fill="#800f2f" stroke="#2c2d42" stroke-width="4" />`,

    // 6: Vampire Fangs
    `<g>
        <path d="M39 58 q11 10 22 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
        <path d="M43 59 l1 5 l3 -5 z" fill="#fff" stroke="#2c2d42" stroke-width="1" />
        <path d="M54 59 l-1 5 l-3 -5 z" fill="#fff" stroke="#2c2d42" stroke-width="1" />
     </g>`,

    // 7: Bubblegum Bubble
    `<g>
        <path d="M42 62 q8 5 16 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
        <circle cx="50" cy="65" r="11" fill="#ffccd5" stroke="#ff85a2" stroke-width="3" />
        <ellipse cx="46" cy="61" rx="3.5" ry="1.5" fill="#fff" transform="rotate(-20 46 61)" />
     </g>`,

    // 8: Cat Mouth
    `<path d="M43 62 q4 5 7 0 q3 5 7 0" fill="none" stroke="#2c2d42" stroke-width="4" stroke-linecap="round" opacity="0.9" />`,

    // 9: Smirk
    `<path d="M48 60 q8 5 10 -4" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />`,

    // 10: Vampire Fangs Smile
    `<g>
        <path d="M40 60 q10 10 20 0 Z" fill="#800f2f" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <path d="M44 60 l2 4 L48 60 Z" fill="#fff" />
        <path d="M56 60 l-2 4 L52 60 Z" fill="#fff" />
     </g>`,

    // 11: Zip Mouth
    `<g>
        <line x1="40" y1="62" x2="60" y2="62" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />
        <line x1="43" y1="60" x2="43" y2="64" stroke="#2c2d42" stroke-width="2" />
        <line x1="47" y1="60" x2="47" y2="64" stroke="#2c2d42" stroke-width="2" />
        <line x1="51" y1="60" x2="51" y2="64" stroke="#2c2d42" stroke-width="2" />
        <line x1="55" y1="60" x2="55" y2="64" stroke="#2c2d42" stroke-width="2" />
        <line x1="59" y1="60" x2="59" y2="64" stroke="#2c2d42" stroke-width="2" />
     </g>`,

    // 12: W-shaped Cute Mouth
    `<path d="M43 61 q4 -3 7 0 q3 -3 7 0" fill="none" stroke="#2c2d42" stroke-width="4.5" stroke-linecap="round" />`,

    // 13: Mouth with Rose
    `<g>
        <path d="M44 62 q6 5 12 0" fill="none" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <path d="M30 64 Q44 63 50 62" fill="none" stroke="#52b788" stroke-width="2.5" stroke-linecap="round" />
        <path d="M33 64 L31 60" stroke="#52b788" stroke-width="2" />
        <path d="M26 64 C24 60 30 58 30 64 C30 66 26 68 26 64 Z" fill="#d90429" stroke="#2c2d42" stroke-width="1.5" />
     </g>`
];

export const SHIRT_OPTIONS = [
    // 0: None
    ``,
    
    // 1: Bow Tie (elegant black bow tie)
    `<g>
        <path d="M42 66 L58 74 L58 66 L42 74 Z" fill="#2c2d42" />
        <circle cx="50" cy="70" r="3.5" fill="#ef476f" />
     </g>`,
     
    // 2: Necktie (red necktie)
    `<g>
        <path d="M47 66 L53 66 L55 82 L50 87 L45 82 Z" fill="#ef476f" stroke="#2c2d42" stroke-width="2" />
        <circle cx="50" cy="66" r="3.5" fill="#2c2d42" />
     </g>`,
     
    // 3: Thick Gold Chain (hip-hop chain)
    `<g>
        <path d="M30 60 Q50 78 70 60 Q50 82 30 60" fill="none" stroke="#ffd166" stroke-width="4.5" stroke-linecap="round" />
        <path d="M47 75 L53 75 L50 81 Z" fill="#ffd166" />
     </g>`,
     
    // 4: Superhero Star (yellow star emblem)
    `<g>
        <path d="M50 68 l2 4 l4 1 l-3 3 l1 4 l-4 -2 l-4 2 l1 -4 l-3 -3 l4 -1 z" fill="#ffd166" stroke="#2c2d42" stroke-width="2" />
     </g>`,
     
    // 5: Hoodie Strings
    `<g>
        <path d="M46 66 L43 78 M54 66 L57 78" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
        <circle cx="43" cy="78" r="2.5" fill="#2c2d42" />
        <circle cx="57" cy="78" r="2.5" fill="#2c2d42" />
     </g>`,
     
    // 6: Sailor Collar (blue stripes)
    `<g>
        <path d="M26 66 Q50 82 74 66 L68 82 Q50 86 32 82 Z" fill="#118ab2" stroke="#2c2d42" stroke-width="2" />
     </g>`,

    // 7: Patriot's Cape & Suit (Homelander)
    `<g>
        <path d="M20 64 C10 65 5 80 15 84 C25 84 25 75 28 68 Z" fill="#d90429" stroke="#2c2d42" stroke-width="2.5" />
        <path d="M80 64 C90 65 95 80 85 84 C75 84 75 75 72 68 Z" fill="#d90429" stroke="#2c2d42" stroke-width="2.5" />
        <path d="M14 69 C10 75 10 80 15 83" fill="none" stroke="#ffffff" stroke-width="2" />
        <path d="M86 69 C90 75 90 80 85 83" fill="none" stroke="#ffffff" stroke-width="2" />
        <path d="M26 66 Q50 82 74 66 L68 84 Q50 86 32 84 Z" fill="#0d47a1" stroke="#2c2d42" stroke-width="3" stroke-linejoin="round" />
        <path d="M44 72 L47 70 L50 73 L53 70 L56 72 L50 76 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="1.5" />
        <path d="M22 62 Q30 58 34 68 Q24 72 22 62" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
        <path d="M78 62 Q70 58 66 68 Q76 72 78 62" fill="#ffd166" stroke="#2c2d42" stroke-width="2.5" stroke-linejoin="round" />
     </g>`,

    // 8: Fox Tail & Nose
    `<g>
        <path d="M76 68 C88 64 96 48 90 40 C84 32 78 48 70 60 Z" fill="#fb8500" stroke="#2c2d42" stroke-width="3" stroke-linejoin="round" />
        <path d="M90 40 C88 36 84 32 80 34 C78 40 82 46 84 45 Z" fill="#ffffff" stroke="#2c2d42" stroke-width="2" stroke-linejoin="round" />
        <ellipse cx="50" cy="62" rx="10" ry="7" fill="#ffffff" stroke="#2c2d42" stroke-width="3" />
        <polygon points="50,57 46,54 54,54" fill="#2c2d42" />
        <path d="M50 57 L50 63 Q50 66 47 66 M50 63 Q50 66 53 66" fill="none" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
     </g>`
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
     </g>`,
     
    // 6: Chef Hat
    `<g>
        <!-- Chef hat base -->
        <path d="M34 26 h32 v-5 h-32 z" fill="#e0e0e0" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <!-- Chef hat puff -->
        <path d="M32 21 q-4 -12 8 -12 q6 0 10 3 q4 -3 10 -3 q12 0 8 12 z" fill="#ffffff" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
     </g>`,
     
    // 7: Cowboy Hat
    `<g>
        <!-- Crown -->
        <path d="M28 26 q5 -16 22 -16 q17 0 22 16 z" fill="#7f5539" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <!-- Band -->
        <path d="M29 25 q21 3 42 0 L71 27 q-21 3 -42 0 z" fill="#ffd166" stroke="#2c2d42" stroke-width="1.5" />
        <!-- Brim (curved up on sides) -->
        <path d="M12 28 q38 -10 76 0 q-10 8 -76 0 z" fill="#9c6644" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
     </g>`,
     
    // 8: Viking Helmet with Horns
    `<g>
        <!-- Left Horn -->
        <path d="M29 24 q-14 -12 -12 -24 q8 4 6 18 z" fill="#ffffff" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <!-- Right Horn -->
        <path d="M71 24 q14 -12 12 -24 q-8 4 -6 18 z" fill="#ffffff" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <!-- Helmet Dome -->
        <path d="M26 28 q24 -18 48 0 z" fill="#b8c0ff" stroke="#2c2d42" stroke-width="4.5" />
        <!-- Nose guard / center strip -->
        <path d="M47 16 h6 v12 h-6 z" fill="#8d99ae" stroke="#2c2d42" stroke-width="3" />
     </g>`,
     
    // 9: Wizard / Witch Hat
    `<g>
        <!-- Hat Cone -->
        <path d="M28 26 L50 -4 L72 26 Z" fill="#240046" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <!-- Star decoration -->
        <path d="M50 8 l1.5 2.5 l2.5 0.5 l-2 2 l0.5 2.5 l-2.5 -1.5 l-2.5 1.5 l0.5 -2.5 l-2 -2 l2.5 -0.5 z" fill="#ffd166" />
        <!-- Brim -->
        <ellipse cx="50" cy="27" rx="34" ry="4" fill="#3d348b" stroke="#2c2d42" stroke-width="4.5" />
     </g>`,
     
    // 10: Santa Hat
    `<g>
        <!-- Red Cone -->
        <path d="M30 26 Q32 4 52 4 Q66 4 72 14 L62 26 Z" fill="#d90429" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <!-- White Pom-pom -->
        <circle cx="74" cy="14" r="5" fill="#ffffff" stroke="#2c2d42" stroke-width="3" />
        <!-- Fluffy Base -->
        <rect x="25" y="22" width="50" height="7" rx="3.5" fill="#ffffff" stroke="#2c2d42" stroke-width="4" />
     </g>`,
     
    // 11: Angel Halo
    `<g>
        <!-- Support beams -->
        <line x1="40" y1="10" x2="40" y2="20" stroke="#ffd166" stroke-width="2" opacity="0.6" />
        <line x1="60" y1="10" x2="60" y2="20" stroke="#ffd166" stroke-width="2" opacity="0.6" />
        <!-- Glowing Halo -->
        <ellipse cx="50" cy="9" rx="18" ry="4" fill="none" stroke="#fff3b0" stroke-width="5" opacity="0.95" />
        <ellipse cx="50" cy="9" rx="18" ry="4" fill="none" stroke="#ffffff" stroke-width="1.5" />
     </g>`,
     
    // 12: Detective Hat (Deerstalker)
    `<g>
        <!-- Cap dome -->
        <path d="M26 28 q24 -18 48 0 z" fill="#8c7853" stroke="#2c2d42" stroke-width="4" />
        <!-- Left flap / visor -->
        <path d="M26 28 q-8 2 -12 -3 q6 -5 12 3" fill="#6f5e3b" stroke="#2c2d42" stroke-width="3.5" stroke-linejoin="round" />
        <!-- Right flap / visor -->
        <path d="M74 28 q8 2 12 -3 q-6 -5 -12 3" fill="#6f5e3b" stroke="#2c2d42" stroke-width="3.5" stroke-linejoin="round" />
        <!-- Top bow -->
        <path d="M47 18 q3 -4 6 0 q-3 4 -6 0" fill="#fff" stroke="#2c2d42" stroke-width="2.5" />
     </g>`,
     
    // 13: Flower Crown
    `<g>
        <!-- Vine -->
        <path d="M24 25 q26 -8 52 0" fill="none" stroke="#52b788" stroke-width="3.5" stroke-linecap="round" />
        <!-- Flowers -->
        <circle cx="28" cy="23" r="4" fill="#ffb703" stroke="#2c2d42" stroke-width="2" />
        <circle cx="28" cy="23" r="1.5" fill="#fff" />
        
        <circle cx="39" cy="21" r="5.5" fill="#ffb5a7" stroke="#2c2d42" stroke-width="2" />
        <circle cx="39" cy="21" r="2" fill="#fec5bb" />
        
        <circle cx="50" cy="20" r="5" fill="#bde0fe" stroke="#2c2d42" stroke-width="2" />
        <circle cx="50" cy="20" r="1.5" fill="#fff" />
        
        <circle cx="61" cy="21" r="5.5" fill="#ffb5a7" stroke="#2c2d42" stroke-width="2" />
        <circle cx="61" cy="21" r="2" fill="#fec5bb" />
        
        <circle cx="72" cy="23" r="4" fill="#ffb703" stroke="#2c2d42" stroke-width="2" />
        <circle cx="72" cy="23" r="1.5" fill="#fff" />
     </g>`,

    // 14: Fox Ears
    `<g>
        <!-- Left Fox Ear -->
        <path d="M26 23 L22 10 L38 20 Z" fill="#fb8500" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <path d="M28 21 L25 13 L35 19 Z" fill="#fff" />
        <path d="M29 20 L27 15 L33 19 Z" fill="#ffb5a7" />
        <!-- Right Fox Ear -->
        <path d="M74 23 L78 10 L62 20 Z" fill="#fb8500" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <path d="M72 21 L75 13 L65 19 Z" fill="#fff" />
        <path d="M71 20 L73 15 L67 19 Z" fill="#ffb5a7" />
     </g>`,

    // 15: Iron Man Mask
    `<g>
        <rect x="20" y="24" width="60" height="58" rx="28" fill="#d90429" stroke="#2c2d42" stroke-width="4.5" />
        <path d="M28 42 C28 32 72 32 72 42 C72 54 66 74 50 74 C34 74 28 54 28 42 Z" fill="#ffd166" stroke="#2c2d42" stroke-width="3.5" stroke-linejoin="round" />
        <path d="M42 34 L50 38 L58 34" fill="none" stroke="#2c2d42" stroke-width="2.5" />
        <polygon points="34,45 46,47 45,50 35,49" fill="#9bf6ff" stroke="#2c2d42" stroke-width="2" />
        <polygon points="66,45 54,47 55,50 65,49" fill="#9bf6ff" stroke="#2c2d42" stroke-width="2" />
        <path d="M42 62 H58" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <path d="M40 58 L44 64 H56 L60 58" fill="none" stroke="#2c2d42" stroke-width="2" />
     </g>`,

    // 16: Scream Mask
    `<g>
        <rect x="18" y="20" width="64" height="66" rx="32" fill="#2c2d42" stroke="#2c2d42" stroke-width="2" />
        <path d="M28 36 C28 26 72 26 72 36 C72 52 64 78 50 78 C36 78 28 52 28 36 Z" fill="#f0f0f0" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M34 43 C34 38 44 40 44 49 C44 51 34 51 34 43 Z" fill="#2c2d42" />
        <path d="M66 43 C66 38 56 40 56 49 C56 51 66 51 66 43 Z" fill="#2c2d42" />
        <path d="M48 53 L46 57 M52 53 L54 57" stroke="#2c2d42" stroke-width="2.5" stroke-linecap="round" />
        <ellipse cx="50" cy="66" rx="5" ry="9" fill="#2c2d42" />
     </g>`,

    // 17: Michael Myers Mask
    `<g>
        <path d="M21 30 Q50 10 79 30 Q50 18 21 30" fill="#582f0e" stroke="#2c2d42" stroke-width="4" stroke-linejoin="round" />
        <rect x="23" y="28" width="54" height="54" rx="27" fill="#e2eafc" stroke="#2c2d42" stroke-width="4.5" />
        <ellipse cx="38" cy="48" rx="6" ry="4.5" fill="#2c2d42" />
        <circle cx="38" cy="48" r="1.5" fill="#fff" />
        <ellipse cx="62" cy="48" rx="6" ry="4.5" fill="#2c2d42" />
        <circle cx="62" cy="48" r="1.5" fill="#fff" />
        <path d="M31 41 Q38 39 45 43" fill="none" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <path d="M69 41 Q62 39 55 43" fill="none" stroke="#2c2d42" stroke-width="3" stroke-linecap="round" />
        <path d="M50 47 L48 57 H52" fill="none" stroke="#2c2d42" stroke-width="2" stroke-linejoin="round" />
        <line x1="43" y1="65" x2="57" y2="65" stroke="#2c2d42" stroke-width="3.5" stroke-linecap="round" />
     </g>`,

    // 18: Jason Voorhees Mask (вурхиза)
    `<g>
        <rect x="24" y="26" width="52" height="56" rx="26" fill="#f8f9fa" stroke="#2c2d42" stroke-width="4.5" />
        <circle cx="38" cy="46" r="5" fill="#2c2d42" />
        <circle cx="62" cy="46" r="5" fill="#2c2d42" />
        <polygon points="50,37 46,30 54,30" fill="#d90429" />
        <polygon points="34,56 40,53 35,50" fill="#d90429" />
        <polygon points="66,56 60,53 65,50" fill="#d90429" />
        <circle cx="50" cy="42" r="1" fill="#2c2d42" />
        <circle cx="50" cy="47" r="1" fill="#2c2d42" />
        <circle cx="50" cy="52" r="1" fill="#2c2d42" />
        <circle cx="45" cy="50" r="1" fill="#2c2d42" />
        <circle cx="55" cy="50" r="1" fill="#2c2d42" />
        <circle cx="45" cy="54" r="1" fill="#2c2d42" />
        <circle cx="55" cy="54" r="1" fill="#2c2d42" />
        <circle cx="50" cy="60" r="1" fill="#2c2d42" />
        <circle cx="47" cy="64" r="1" fill="#2c2d42" />
        <circle cx="53" cy="64" r="1" fill="#2c2d42" />
        <path d="M24 44 H18 M76 44 H82" stroke="#2c2d42" stroke-width="4" />
     </g>`,

    // 19: Minecraft Creeper Head
    `<g>
        <rect x="22" y="16" width="56" height="56" rx="4" fill="#2a9d8f" stroke="#2c2d42" stroke-width="4.5" />
        <rect x="30" y="32" width="10" height="10" fill="#2c2d42" />
        <rect x="60" y="32" width="10" height="10" fill="#2c2d42" />
        <path d="M44 42 h12 v12 h-4 v-6 h-4 v6 h-4 z" fill="#2c2d42" />
     </g>`,

    // 20: Shrek Ogre Ears
    `<g>
        <path d="M24 36 C14 36 8 28 14 26 C18 25 22 32 24 36" fill="#8dc63f" stroke="#2c2d42" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="14" cy="27" rx="2" ry="4" fill="#5c8a1b" transform="rotate(-15 14 27)" />
        <path d="M76 36 C86 36 92 28 86 26 C82 25 78 32 76 36" fill="#8dc63f" stroke="#2c2d42" stroke-width="3" stroke-linejoin="round" />
        <ellipse cx="86" cy="27" rx="2" ry="4" fill="#5c8a1b" transform="rotate(15 86 27)" />
     </g>`,

    // 21: Patriot's Hair (Homelander)
    `<g>
        <!-- Blonde styled hair (Homelander) -->
        <path d="M22 34 C16 30 18 20 28 16 C38 12 62 12 72 16 C82 20 84 30 78 34" fill="#ffd166" stroke="#2c2d42" stroke-width="4.5" stroke-linejoin="round" />
        <path d="M24 32 C28 20 40 16 50 18 C60 16 72 20 76 32 C70 24 60 22 50 24 C40 22 30 24 24 32 Z" fill="#ffe3a8" stroke="#2c2d42" stroke-width="3" stroke-linejoin="round" />
        <path d="M32 24 C40 18 45 18 50 20" fill="none" stroke="#ffd166" stroke-width="2" />
        <path d="M68 24 C60 18 55 18 50 20" fill="none" stroke="#ffd166" stroke-width="2" />
     </g>`
];

export const EFFECT_OPTIONS = [
    // 0: Classic Blush (rosy cheeks)
    `<circle cx="28" cy="54" r="4.5" fill="#ff758f" opacity="0.65" />
     <circle cx="72" cy="54" r="4.5" fill="#ff758f" opacity="0.65" />`,

    // 1: None
    ``,

    // 2: Anime Sweat Drop
    `<path d="M72 48 q3 0 3 4 q0 4 -3 8 q-3 -4 -3 -8 q0 -4 3 -4 Z" fill="#9bf6ff" stroke="#2c2d42" stroke-width="1.5" />`,

    // 3: Bandage (cross plaster patch)
    `<g>
        <path d="M20 54 L28 54" stroke="#fceade" stroke-width="4.5" stroke-linecap="round" />
        <path d="M24 50 L24 58" stroke="#fceade" stroke-width="4.5" stroke-linecap="round" />
        <path d="M20 54 L28 54" stroke="#2c2d42" stroke-width="1" opacity="0.5" />
        <path d="M24 50 L24 58" stroke="#2c2d42" stroke-width="1" opacity="0.5" />
     </g>`,

    // 4: Battle Scar
    `<g>
        <path d="M22 50 L28 58" stroke="#ef476f" stroke-width="2" stroke-linecap="round" />
        <path d="M24 49 L30 57" stroke="#ef476f" stroke-width="2" stroke-linecap="round" />
     </g>`,

    // 5: Fox Whiskers
    `<g>
        <line x1="26" y1="52" x2="16" y2="50" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
        <line x1="27" y1="54" x2="15" y2="54" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
        <line x1="26" y1="56" x2="16" y2="58" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
        <line x1="74" y1="52" x2="84" y2="50" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
        <line x1="73" y1="54" x2="85" y2="54" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
        <line x1="74" y1="56" x2="84" y2="58" stroke="#2c2d42" stroke-width="2" stroke-linecap="round" />
     </g>`,

    // 6: Star blush
    `<g>
        <path d="M26 51 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z" fill="#ffd166" />
        <path d="M74 51 l1 2 l2 1 l-2 1 l-1 2 l-1 -2 l-2 -1 l2 -1 z" fill="#ffd166" />
     </g>`,

    // 7: Embarrassed (Anime lines)
    `<g>
        <line x1="24" y1="51" x2="28" y2="57" stroke="#ff758f" stroke-width="2" stroke-linecap="round" />
        <line x1="28" y1="51" x2="32" y2="57" stroke="#ff758f" stroke-width="2" stroke-linecap="round" />
        <line x1="68" y1="51" x2="72" y2="57" stroke="#ff758f" stroke-width="2" stroke-linecap="round" />
        <line x1="72" y1="51" x2="76" y2="57" stroke="#ff758f" stroke-width="2" stroke-linecap="round" />
     </g>`
];

export function getRandomAvatarConfig() {
    return {
        bgColor: BG_COLORS[Math.floor(Math.random() * BG_COLORS.length)],
        bodyColor: BODY_COLORS[Math.floor(Math.random() * BODY_COLORS.length)],
        eyes: Math.floor(Math.random() * EYE_OPTIONS.length),
        mouth: Math.floor(Math.random() * MOUTH_OPTIONS.length),
        shirt: Math.floor(Math.random() * SHIRT_OPTIONS.length),
        accessory: Math.floor(Math.random() * ACCESSORY_OPTIONS.length),
        effect: Math.floor(Math.random() * EFFECT_OPTIONS.length)
    };
}

export function renderAvatarSvg(config) {
    const bg = config.bgColor || "#FFADAD";
    const body = config.bodyColor || "#F4A261";
    const eyes = EYE_OPTIONS[config.eyes] || EYE_OPTIONS[0];
    const shirt = SHIRT_OPTIONS[config.shirt || 0] || SHIRT_OPTIONS[0];
    const accessory = ACCESSORY_OPTIONS[config.accessory] || ACCESSORY_OPTIONS[0];
    
    // Hide mouth if Fox Nose (shirt 8) or if wearing a full face mask (accessory 15-19)
    const hideMouth = (parseInt(config.shirt) === 8) || (parseInt(config.accessory) >= 15 && parseInt(config.accessory) <= 19);
    const mouth = hideMouth ? "" : (MOUTH_OPTIONS[config.mouth] || MOUTH_OPTIONS[0]);

    // Hide cheek blush under masks (accessory 15-19)
    const hideEffect = (parseInt(config.accessory) >= 15 && parseInt(config.accessory) <= 19);
    const effect = hideEffect ? "" : (EFFECT_OPTIONS[config.effect !== undefined ? config.effect : 0] || EFFECT_OPTIONS[0]);

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
        
        <!-- Shirt / Clothes decoration -->
        ${shirt}

        <!-- White Glossy Reflection Highlight -->
        <ellipse cx="36" cy="34" rx="10" ry="5" fill="#ffffff" opacity="0.3" transform="rotate(-25 36 34)" />

        <!-- Cheeks Blush / Effect -->
        ${effect}
        
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
