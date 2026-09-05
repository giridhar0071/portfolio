export const VIZ = {
  loan: `
    <svg viewBox="0 0 420 280" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">
      <defs>
        <marker id="ah" markerWidth="7" markerHeight="7" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6" fill="none" stroke="oklch(0.66 0.05 60)" stroke-width="1"/>
        </marker>
      </defs>
      <g font-family="JetBrains Mono, monospace" font-size="9" fill="oklch(0.78 0.014 72)">
        <!-- client -->
        <rect x="26" y="120" width="74" height="40" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/>
        <text x="63" y="138" text-anchor="middle">Angular</text>
        <text x="63" y="150" text-anchor="middle" fill="oklch(0.6 0.01 66)">client</text>
        <!-- gateway -->
        <rect x="142" y="120" width="74" height="40" rx="6" fill="oklch(0.24 0.02 52)" stroke="oklch(0.735 0.165 52 / 0.45)"/>
        <text x="179" y="138" text-anchor="middle" fill="oklch(0.82 0.11 56)">API</text>
        <text x="179" y="150" text-anchor="middle" fill="oklch(0.7 0.08 56)">gateway</text>
        <!-- services -->
        <rect x="258" y="40" width="74" height="34" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/>
        <text x="295" y="61" text-anchor="middle">eligibility</text>
        <rect x="258" y="123" width="74" height="34" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/>
        <text x="295" y="144" text-anchor="middle">repayments</text>
        <rect x="258" y="206" width="74" height="34" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/>
        <text x="295" y="227" text-anchor="middle">audit</text>
        <!-- kafka bus -->
        <rect x="352" y="40" width="44" height="200" rx="6" fill="oklch(0.2 0.02 52)" stroke="oklch(0.735 0.165 52 / 0.35)"/>
        <text x="374" y="142" text-anchor="middle" fill="oklch(0.8 0.1 56)" transform="rotate(90 374 142)">Kafka bus</text>
        <!-- lines -->
        <g stroke="oklch(0.6 0.05 60)" stroke-width="1.1" fill="none" marker-end="url(#ah)">
          <path d="M100 140 H140"/>
          <path d="M216 140 C236 140, 236 57, 256 57"/>
          <path d="M216 140 H256"/>
          <path d="M216 140 C236 140, 236 223, 256 223"/>
          <path d="M332 57 H350"/>
          <path d="M332 140 H350"/>
          <path d="M332 223 H350"/>
        </g>
        <!-- traveling packets -->
        <g fill="#ff3b2f">
          <circle r="2.2"><animateMotion dur="3.2s" repeatCount="indefinite" path="M100 140 H140"/></circle>
          <circle r="2.2"><animateMotion dur="2.6s" begin="0.4s" repeatCount="indefinite" path="M216 140 C236 140, 236 57, 256 57"/></circle>
          <circle r="2.2"><animateMotion dur="3s" begin="0.8s" repeatCount="indefinite" path="M216 140 C236 140, 236 223, 256 223"/></circle>
          <circle r="2.2"><animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M332 140 H350"/></circle>
        </g>
      </g>
    </svg>`,
  securenote: `
    <svg viewBox="0 0 420 280" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">
      <g font-family="JetBrains Mono, monospace" font-size="9">
        <circle cx="210" cy="140" r="86" fill="none" stroke="oklch(1 0 0 / 0.08)" stroke-width="1"/>
        <circle cx="210" cy="140" r="62" fill="none" stroke="oklch(0.735 0.165 52 / 0.35)" stroke-width="1.2" stroke-dasharray="4 6"/>
        <!-- lock -->
        <rect x="188" y="128" width="44" height="34" rx="5" fill="oklch(0.24 0.02 52)" stroke="oklch(0.735 0.165 52 / 0.6)"/>
        <path d="M196 128 v-8 a14 14 0 0 1 28 0 v8" fill="none" stroke="oklch(0.8 0.1 56)" stroke-width="2"/>
        <circle cx="210" cy="144" r="4" fill="oklch(0.82 0.11 56)"/>
        <!-- timer ticks -->
        <g fill="oklch(0.7 0.012 70)">
          <text x="210" y="44" text-anchor="middle">self-destruct</text>
          <text x="210" y="248" text-anchor="middle" fill="oklch(0.6 0.01 66)">end-to-end encrypted</text>
        </g>
        <g stroke="oklch(0.735 0.165 52 / 0.7)" stroke-width="2" stroke-linecap="round">
          <line x1="210" y1="78" x2="210" y2="88"/>
          <line x1="272" y1="140" x2="262" y2="140"/>
          <line x1="148" y1="140" x2="158" y2="140"/>
        </g>
        <circle r="3" fill="#ff3b2f">
          <animate attributeName="opacity" values="0.2;1;0.2" dur="2.2s" repeatCount="indefinite"/>
          <animateMotion dur="2.2s" repeatCount="indefinite" path="M210,52 a62,62 0 1,1 -0.1,0"/>
        </circle>
      </g>
    </svg>`,
  ewallet: `
    <svg viewBox="0 0 420 280" preserveAspectRatio="xMidYMid meet" style="width:100%;height:100%;display:block">
      <g font-family="JetBrains Mono, monospace" font-size="8.5" fill="oklch(0.78 0.014 72)">
        <!-- central bus -->
        <rect x="150" y="128" width="120" height="26" rx="13" fill="oklch(0.2 0.02 52)" stroke="oklch(0.735 0.165 52 / 0.4)"/>
        <text x="210" y="145" text-anchor="middle" fill="oklch(0.82 0.11 56)">Kafka · Redis</text>
        <!-- nodes -->
        <g>
          <rect x="40" y="40" width="78" height="32" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/><text x="79" y="60" text-anchor="middle">profiles</text>
          <rect x="40" y="210" width="78" height="32" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/><text x="79" y="230" text-anchor="middle">balances</text>
          <rect x="302" y="40" width="78" height="32" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/><text x="341" y="60" text-anchor="middle">transactions</text>
          <rect x="302" y="210" width="78" height="32" rx="6" fill="oklch(0.22 0.01 56)" stroke="oklch(1 0 0 / 0.12)"/><text x="341" y="230" text-anchor="middle">notifications</text>
        </g>
        <g stroke="oklch(0.6 0.05 60)" stroke-width="1.1" fill="none">
          <path d="M118 56 C160 56, 165 130, 175 128"/>
          <path d="M118 226 C160 226, 165 152, 175 154"/>
          <path d="M302 56 C262 56, 257 130, 245 128"/>
          <path d="M302 226 C262 226, 257 152, 245 154"/>
        </g>
        <g fill="#ff3b2f">
          <circle r="2.2"><animateMotion dur="2.8s" repeatCount="indefinite" path="M118 56 C160 56, 165 130, 175 128"/></circle>
          <circle r="2.2"><animateMotion dur="3.1s" begin="0.5s" repeatCount="indefinite" path="M118 226 C160 226, 165 152, 175 154"/></circle>
          <circle r="2.2"><animateMotion dur="2.6s" begin="1s" repeatCount="indefinite" path="M302 56 C262 56, 257 130, 245 128"/></circle>
          <circle r="2.2"><animateMotion dur="3.3s" begin="1.5s" repeatCount="indefinite" path="M302 226 C262 226, 257 152, 245 154"/></circle>
        </g>
        <text x="210" y="262" text-anchor="middle" fill="oklch(0.6 0.01 66)">OAuth2 across services · Docker-orchestrated</text>
      </g>
    </svg>`
};
