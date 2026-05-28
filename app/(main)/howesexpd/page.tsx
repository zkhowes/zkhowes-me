import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Howes Expedition",
  description:
    "A practical family sailing primer for the Howes Expedition around the San Juan Islands.",
  alternates: {
    canonical: "https://zkhowes.me/howesexpd",
  },
  openGraph: {
    title: "Howes Expedition",
    description:
      "A practical family sailing primer for a six-day San Juan Islands sailing trip.",
    url: "https://zkhowes.me/howesexpd",
    type: "article",
  },
};

const pageHtml = String.raw`
  <header class="expedition-header">
    <h1>Howes Expedition</h1>
    <p>A simple, practical primer for family crew joining a six-day sailing trip around the San Juan Islands. The goal is not certification. The goal is useful, safe, calm crew.</p>
  </header>

  <nav class="section-nav" aria-label="Page sections">
    <div class="inner">
      <a href="#goal">Goal</a>
      <a href="#map">San Juan Islands</a>
      <a href="#wind">Wind &amp; Sails</a>
      <a href="#boat">Boat Parts</a>
      <a href="#docking">Docking</a>
      <a href="#knots">Knots</a>
      <a href="#safety">Safety</a>
      <a href="#head">The Head</a>
      <a href="#practice">Practice Plan</a>
      <a href="#resources">Videos</a>
      <a href="#fun">Fun</a>
    </div>
  </nav>

  <main class="expedition-main">
    <section id="goal" class="hero-card">
      <h2>The One-Page Mission</h2>
      <p>By departure day, everyone should be able to understand basic sailing instructions, move safely around the boat, help with docking, tie a few useful knots, and know how not to create avoidable emergencies.</p>
      <div class="grid three">
        <div class="card">
          <h4>Be Useful</h4>
          <p>Know the basic words: port, starboard, bow, stern, main, jib, sheet, halyard, windward, leeward.</p>
        </div>
        <div class="card">
          <h4>Be Safe</h4>
          <p>Move slowly, keep one hand for the boat, watch the boom, and never use hands or feet to stop the boat.</p>
        </div>
        <div class="card">
          <h4>Be Calm</h4>
          <p>Docking, anchoring, and sail handling go better when people listen, pause, and do one thing at a time.</p>
        </div>
      </div>
    </section>

    <section id="map">
      <h2>Our Route: Counterclockwise Around the San Juans</h2>
      <p>Our planned loop is a counterclockwise circumnavigation from Bellingham through the northern and western San Juans, then back through the east side of the islands. The working route is <strong>Bellingham -> Sucia -> Stuart -> Roche Harbor on San Juan Island -> Rosario Resort on Orcas -> Cypress -> Bellingham</strong>.</p>
      <p>Weather, wind, current, marina space, crew energy, and the boat will dictate the actual route. Sailing is about being flexible: the plan gives us structure, but good decisions beat a perfect itinerary.</p>

      <iframe class="map-frame" title="Map of the San Juan Islands" src="https://www.openstreetmap.org/export/embed.html?bbox=-123.35%2C48.35%2C-122.65%2C48.75&amp;layer=mapnik"></iframe>

      <div class="grid two">
        <div class="card">
          <h3>Planned Stops</h3>
          <table>
            <thead><tr><th>Stop</th><th>Quick Read</th></tr></thead>
            <tbody>
              <tr><td><strong>Bellingham</strong></td><td>Home base and departure point. This is where we provision, learn the boat, and leave the dock with a conservative plan.</td></tr>
              <tr><td><strong>Sucia Island</strong></td><td>A favorite marine-state-park destination with protected bays, hiking, and strong we-are-really-out-here energy.</td></tr>
              <tr><td><strong>Stuart Island</strong></td><td>Remote-feeling island with classic cruising stops such as Reid Harbor and Prevost Harbor.</td></tr>
              <tr><td><strong>Roche Harbor, San Juan Island</strong></td><td>A polished marina stop with fuel, food, showers, and easy access to San Juan Island history.</td></tr>
              <tr><td><strong>Rosario Resort, Orcas Island</strong></td><td>Historic resort stop on mountainous Orcas, with Moran State Park and Mount Constitution nearby.</td></tr>
              <tr><td><strong>Cypress Island</strong></td><td>Quiet, forested, and closer to Bellingham. A good final island stop if conditions line up.</td></tr>
            </tbody>
          </table>
        </div>
        <div class="card">
          <h3>How to Think About the Loop</h3>
          <ol class="route-list">
            <li><span><strong>Leave Bellingham carefully.</strong> First day is about getting settled, not proving anything.</span></li>
            <li><span><strong>Work north and west.</strong> Sucia and Stuart feel more remote and exposed than the inner islands.</span></li>
            <li><span><strong>Turn south toward Roche.</strong> San Juan Island gives us services, history, and a good reset.</span></li>
            <li><span><strong>Cross back through Orcas.</strong> Rosario is the scenic resort stop if timing and weather cooperate.</span></li>
            <li><span><strong>Use Cypress as the last island hop.</strong> Close enough to Bellingham to keep the final day sane.</span></li>
          </ol>
        </div>
      </div>

      <div class="callout">
        San Juan cruising rule of thumb: the islands feel protected, but current, ferry traffic, cold water, and rocks make attention matter.
      </div>
      <div class="video-list compact">
        <a href="https://www.youtube.com/results?search_query=sailing+san+juan+islands+sucia+stuart+roche+harbor" target="_blank" rel="noopener">YouTube: San Juan sailing routes</a>
        <a href="https://www.youtube.com/results?search_query=sailing+sucia+island+stuart+island+san+juans" target="_blank" rel="noopener">YouTube: Sucia and Stuart cruising</a>
      </div>
    </section>

    <section id="wind">
      <h2>How a Sailboat Navigates the Wind</h2>
      <p>A sailboat cannot sail directly into the wind. Instead, it sails at angles to the wind. The basic wind clock helps crew understand what the skipper is trying to do.</p>

      <svg class="diagram" viewBox="0 0 760 560" role="img" aria-label="Wind clock and points of sail diagram">
        <rect width="760" height="560" rx="18" fill="#f8fbfc" />
        <defs>
          <marker id="wind-arrow" markerWidth="10" markerHeight="10" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="#2f80a8" />
          </marker>
        </defs>
        <text x="380" y="40" text-anchor="middle" font-size="25" font-weight="800" fill="#123047">Wind Clock: Boat Points North</text>
        <line x1="380" y1="94" x2="380" y2="160" stroke="#2f80a8" stroke-width="5" marker-end="url(#wind-arrow)" />
        <text x="404" y="125" font-size="17" fill="#2f80a8" font-weight="800">Wind blowing from north</text>

        <circle cx="380" cy="310" r="190" fill="#ffffff" stroke="#d9e3e8" stroke-width="3" />
        <path d="M247.4 174 A190 190 0 0 1 512.6 174 L456 232 A108 108 0 0 0 304 232 Z" fill="#fff0ed" stroke="#b64b3b" stroke-width="2" />
        <path d="M513 174 A190 190 0 0 1 570 310 L462 310 A82 82 0 0 0 456 232 Z" fill="#eef7f1" stroke="#cfe6d5" stroke-width="2" />
        <path d="M570 310 A190 190 0 0 1 513 446 L456 388 A82 82 0 0 0 462 310 Z" fill="#eaf6fb" stroke="#c6dde8" stroke-width="2" />
        <path d="M513 446 A190 190 0 0 1 247 446 L304 388 A82 82 0 0 0 456 388 Z" fill="#fff8ea" stroke="#f1dbac" stroke-width="2" />
        <path d="M247 446 A190 190 0 0 1 190 310 L298 310 A82 82 0 0 0 304 388 Z" fill="#eaf6fb" stroke="#c6dde8" stroke-width="2" />
        <path d="M190 310 A190 190 0 0 1 247 174 L304 232 A82 82 0 0 0 298 310 Z" fill="#eef7f1" stroke="#cfe6d5" stroke-width="2" />

        <line x1="380" y1="120" x2="380" y2="500" stroke="#d9e3e8" stroke-width="2" />
        <line x1="190" y1="310" x2="570" y2="310" stroke="#d9e3e8" stroke-width="2" />
        <line x1="246" y1="176" x2="514" y2="444" stroke="#d9e3e8" stroke-width="1.5" />
        <line x1="514" y1="176" x2="246" y2="444" stroke="#d9e3e8" stroke-width="1.5" />

        <path d="M380 222 L405 310 L380 398 L355 310 Z" fill="#123047" />
        <path d="M380 228 L397 310 L380 294 L363 310 Z" fill="#ffffff" opacity="0.92" />
        <line x1="380" y1="398" x2="380" y2="422" stroke="#123047" stroke-width="7" stroke-linecap="round" />
        <text x="380" y="316" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">BOAT</text>

        <text x="380" y="190" text-anchor="middle" font-size="18" font-weight="900" fill="#b64b3b">NO GO ZONE</text>
        <text x="380" y="104" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Into wind</text>
        <text x="532" y="232" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Close reach</text>
        <text x="228" y="232" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Close reach</text>
        <text x="610" y="318" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Beam reach</text>
        <text x="150" y="318" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Beam reach</text>
        <text x="535" y="420" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Broad reach</text>
        <text x="225" y="420" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Broad reach</text>
        <text x="380" y="522" text-anchor="middle" font-size="16" font-weight="800" fill="#123047">Run / downwind</text>
        <text x="510" y="150" text-anchor="middle" font-size="13" fill="#5b6770">~45 degrees</text>
        <text x="250" y="150" text-anchor="middle" font-size="13" fill="#5b6770">~45 degrees</text>
      </svg>

      <div class="grid two">
        <div class="card">
          <h3>Words to Know</h3>
          <p><span class="tag">Windward</span> toward the wind</p>
          <p><span class="tag">Leeward</span> away from the wind</p>
          <p><span class="tag">Tack</span> turn the bow through the wind</p>
          <p><span class="tag">Jibe</span> turn the stern through the wind</p>
          <p><span class="tag">Jib</span> the front sail</p>
        </div>
        <div class="card">
          <h3>What Crew Should Listen For</h3>
          <ul>
            <li>"Ready about?" - get ready to tack.</li>
            <li>"Hard alee" - the boat is turning through the wind.</li>
            <li>"Ready to jibe?" - heads down, watch the boom.</li>
            <li>"Trim the jib" - pull in the jib sheet.</li>
            <li>"Ease the sheet" - let a sail out slightly.</li>
          </ul>
        </div>
      </div>
      <div class="video-list compact">
        <a href="https://asa.com/news/2020/04/16/points-of-sail-explained/" target="_blank" rel="noopener">ASA: Points of Sail Explained</a>
        <a href="https://www.youtube.com/results?search_query=points+of+sail+beginner+sailing" target="_blank" rel="noopener">YouTube: Points of sail</a>
        <a href="https://www.youtube.com/results?search_query=how+sailboats+sail+against+the+wind+beginner" target="_blank" rel="noopener">YouTube: How sailboats use wind</a>
      </div>
    </section>

    <section id="boat">
      <h2>Parts of the Boat</h2>
      <p>They do not need to memorize every fitting. They need enough vocabulary to understand instructions quickly.</p>

      <div class="grid three">
        <div class="card">
          <h3>1. Directional View</h3>
          <svg class="diagram" viewBox="0 0 560 420" role="img" aria-label="Overhead boat orientation diagram with bow, stern, port, starboard, and beam">
            <rect width="560" height="420" rx="18" fill="#f8fbfc" />
            <text x="280" y="36" text-anchor="middle" font-size="22" font-weight="800" fill="#123047">Overhead Orientation</text>
            <path d="M280 78 C390 108 444 188 420 302 C382 346 178 346 140 302 C116 188 170 108 280 78 Z" fill="#dfeef3" stroke="#123047" stroke-width="4" />
            <path d="M280 78 L300 132 L260 132 Z" fill="#486b57" />
            <line x1="145" y1="210" x2="415" y2="210" stroke="#2f80a8" stroke-width="3" stroke-dasharray="8 6" />
            <line x1="280" y1="96" x2="280" y2="330" stroke="#d9e3e8" stroke-width="2" />
            <circle cx="280" cy="88" r="15" fill="#123047" /><text x="280" y="94" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">1</text>
            <circle cx="280" cy="328" r="15" fill="#123047" /><text x="280" y="334" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">2</text>
            <circle cx="153" cy="210" r="15" fill="#123047" /><text x="153" y="216" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">3</text>
            <circle cx="407" cy="210" r="15" fill="#123047" /><text x="407" y="216" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">4</text>
            <circle cx="280" cy="210" r="15" fill="#123047" /><text x="280" y="216" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">5</text>
            <text x="280" y="68" text-anchor="middle" font-size="15" font-weight="800" fill="#123047">Bow</text>
            <text x="280" y="371" text-anchor="middle" font-size="15" font-weight="800" fill="#123047">Stern</text>
            <text x="98" y="216" text-anchor="middle" font-size="15" font-weight="800" fill="#123047">Port</text>
            <text x="462" y="216" text-anchor="middle" font-size="15" font-weight="800" fill="#123047">Starboard</text>
            <text x="280" y="194" text-anchor="middle" font-size="15" font-weight="800" fill="#2f80a8">Beam</text>
          </svg>
        </div>
        <div class="card">
          <h3>2. Sails, Sheets &amp; Halyards</h3>
          <svg class="diagram" viewBox="0 0 620 420" role="img" aria-label="Side view sailboat rigging diagram with main, jib, mast, boom, sheets, and halyards">
            <rect width="620" height="420" rx="18" fill="#f8fbfc" />
            <text x="310" y="36" text-anchor="middle" font-size="22" font-weight="800" fill="#123047">Sails, Sheets &amp; Halyards</text>
            <path d="M90 322 Q310 382 530 322 Q482 360 310 368 Q138 360 90 322 Z" fill="#dfeef3" stroke="#123047" stroke-width="4" />
            <line x1="310" y1="320" x2="310" y2="68" stroke="#123047" stroke-width="7" />
            <line x1="310" y1="206" x2="472" y2="310" stroke="#123047" stroke-width="6" />
            <path d="M320 82 L320 304 L465 304 Z" fill="#ffffff" stroke="#2f80a8" stroke-width="3" />
            <path d="M300 96 L178 304 L300 304 Z" fill="#ffffff" stroke="#486b57" stroke-width="3" />
            <path d="M310 72 C286 118 264 176 250 236" fill="none" stroke="#b64b3b" stroke-width="3" stroke-dasharray="7 5" />
            <path d="M310 72 C346 126 382 190 418 280" fill="none" stroke="#b64b3b" stroke-width="3" stroke-dasharray="7 5" />
            <line x1="178" y1="304" x2="118" y2="342" stroke="#486b57" stroke-width="4" />
            <line x1="466" y1="304" x2="526" y2="342" stroke="#2f80a8" stroke-width="4" />
            <circle cx="393" cy="230" r="15" fill="#123047" /><text x="393" y="236" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">6</text>
            <circle cx="248" cy="214" r="15" fill="#123047" /><text x="248" y="220" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">7</text>
            <circle cx="310" cy="82" r="15" fill="#123047" /><text x="310" y="88" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">8</text>
            <circle cx="452" cy="294" r="15" fill="#123047" /><text x="452" y="300" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">9</text>
            <circle cx="238" cy="148" r="15" fill="#123047" /><text x="238" y="154" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">10</text>
            <circle cx="400" cy="180" r="15" fill="#123047" /><text x="400" y="186" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">11</text>
            <circle cx="118" cy="342" r="15" fill="#123047" /><text x="118" y="348" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">12</text>
            <text x="430" y="215" font-size="14" font-weight="800" fill="#2f80a8">Main</text>
            <text x="198" y="204" font-size="14" font-weight="800" fill="#486b57">Jib</text>
            <text x="324" y="82" font-size="14" font-weight="800" fill="#123047">Mast</text>
            <text x="480" y="292" font-size="14" font-weight="800" fill="#123047">Boom</text>
            <text x="144" y="362" font-size="14" font-weight="800" fill="#486b57">Jib sheet</text>
            <text x="442" y="360" font-size="14" font-weight="800" fill="#2f80a8">Mainsheet</text>
            <text x="232" y="128" font-size="13" font-weight="800" fill="#b64b3b">Halyards</text>
          </svg>
        </div>
        <div class="card">
          <h3>3. Useful Parts</h3>
          <svg class="diagram" viewBox="0 0 620 420" role="img" aria-label="Side view sailboat useful parts diagram with hull, keel, rudder, winch, cleat, fender, and spring line">
            <rect width="620" height="420" rx="18" fill="#f8fbfc" />
            <text x="310" y="36" text-anchor="middle" font-size="22" font-weight="800" fill="#123047">Useful Parts</text>
            <path d="M82 265 Q310 338 538 265 Q494 320 310 330 Q126 320 82 265 Z" fill="#dfeef3" stroke="#123047" stroke-width="4" />
            <path d="M278 326 L318 326 L298 386 Z" fill="#486b57" stroke="#123047" stroke-width="3" />
            <path d="M486 292 L520 314 L504 348 L476 318 Z" fill="#2f80a8" stroke="#123047" stroke-width="3" />
            <circle cx="408" cy="260" r="17" fill="#ffffff" stroke="#123047" stroke-width="4" />
            <rect x="176" y="255" width="36" height="12" rx="6" fill="#123047" />
            <rect x="514" y="214" width="18" height="68" rx="9" fill="#fff8ea" stroke="#b64b3b" stroke-width="3" />
            <line x1="156" y1="246" x2="432" y2="314" stroke="#b64b3b" stroke-width="4" stroke-dasharray="8 6" />
            <circle cx="310" cy="292" r="15" fill="#123047" /><text x="310" y="298" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">13</text>
            <circle cx="298" cy="358" r="15" fill="#123047" /><text x="298" y="364" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">14</text>
            <circle cx="500" cy="324" r="15" fill="#123047" /><text x="500" y="330" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">15</text>
            <circle cx="408" cy="260" r="15" fill="#123047" /><text x="408" y="266" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">16</text>
            <circle cx="194" cy="260" r="15" fill="#123047" /><text x="194" y="266" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">17</text>
            <circle cx="524" cy="236" r="15" fill="#123047" /><text x="524" y="242" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">18</text>
            <circle cx="158" cy="246" r="15" fill="#123047" /><text x="158" y="252" text-anchor="middle" font-size="14" font-weight="900" fill="#ffffff">19</text>
            <text x="308" y="250" text-anchor="middle" font-size="14" font-weight="800" fill="#123047">Hull</text>
            <text x="250" y="392" font-size="14" font-weight="800" fill="#486b57">Keel</text>
            <text x="526" y="346" font-size="14" font-weight="800" fill="#2f80a8">Rudder</text>
            <text x="428" y="244" font-size="14" font-weight="800" fill="#123047">Winch</text>
            <text x="178" y="234" font-size="14" font-weight="800" fill="#123047">Cleat</text>
            <text x="474" y="210" font-size="14" font-weight="800" fill="#b64b3b">Fender</text>
            <text x="166" y="222" font-size="14" font-weight="800" fill="#b64b3b">Spring line</text>
          </svg>
        </div>
      </div>

      <div class="grid three">
        <div class="card">
          <h3>Orientation</h3>
          <ul>
            <li><strong>1 Bow:</strong> front</li>
            <li><strong>2 Stern:</strong> back</li>
            <li><strong>3 Port:</strong> left</li>
            <li><strong>4 Starboard:</strong> right</li>
            <li><strong>5 Beam:</strong> widest middle section</li>
          </ul>
        </div>
        <div class="card">
          <h3>Sails &amp; Lines</h3>
          <ul>
            <li><strong>6 Main:</strong> large rear sail</li>
            <li><strong>7 Jib:</strong> front sail</li>
            <li><strong>8 Mast:</strong> vertical spar holding the sails</li>
            <li><strong>9 Boom:</strong> horizontal spar attached to the main</li>
            <li><strong>10 Halyard:</strong> raises a sail</li>
            <li><strong>11 Mainsheet:</strong> controls the mainsail angle</li>
            <li><strong>12 Jib sheet:</strong> controls the jib angle</li>
          </ul>
        </div>
        <div class="card">
          <h3>Useful Hardware</h3>
          <ul>
            <li><strong>13 Hull:</strong> the body of the boat</li>
            <li><strong>14 Keel:</strong> underwater fin that resists sideways drift</li>
            <li><strong>15 Rudder:</strong> underwater steering blade</li>
            <li><strong>16 Winch:</strong> helps tension loaded lines</li>
            <li><strong>17 Cleat:</strong> secures a line</li>
            <li><strong>18 Fender:</strong> protects the hull at the dock</li>
            <li><strong>19 Spring line:</strong> keeps the boat from moving forward/back</li>
          </ul>
        </div>
      </div>
      <div class="video-list compact">
        <a href="https://improvesailing.com/guides/sailboat-parts-explained" target="_blank" rel="noopener">Read: Sailboat parts diagram</a>
        <a href="https://www.youtube.com/results?search_query=basic+parts+of+a+sailboat+beginner" target="_blank" rel="noopener">YouTube: Parts of a sailboat</a>
        <a href="https://www.youtube.com/results?search_query=sailboat+running+rigging+halyards+sheets+beginner" target="_blank" rel="noopener">YouTube: Sheets and halyards</a>
      </div>
    </section>

    <section id="docking">
      <h2>Docking Basics</h2>
      <p>Docking is when calm crew matter most. The skipper drives the boat. Crew prepare fenders, handle dock lines, and stay out of danger.</p>

      <div class="callout danger">
        Never stop the boat with your hands, feet, arms, or legs. Boats are heavy. Pilings and docks are stronger than you are.
      </div>

      <div class="grid two">
        <div class="card">
          <h3>Docking Jobs</h3>
          <ol>
            <li><strong>Fenders:</strong> put them on the side that will meet the dock.</li>
            <li><strong>Lines:</strong> have bow, stern, and spring lines ready.</li>
            <li><strong>Communication:</strong> repeat back instructions so the skipper knows you heard.</li>
            <li><strong>Step, don't jump:</strong> only step onto the dock when it is safe and close.</li>
          </ol>
        </div>
        <div class="card">
          <h3>Prop Walk</h3>
          <p>In reverse, many sailboats pull the stern sideways because of the propeller. This is called <strong>prop walk</strong>. It is normal. It can make backing up feel weird.</p>
          <p>The exact direction depends on the boat. Learn what our boat does before assuming.</p>
        </div>
      </div>
      <div class="video-list compact">
        <a href="https://www.offshoresailing.com/docking/" target="_blank" rel="noopener">Watch: Sailboat docking basics</a>
        <a href="https://sailing-blog.nauticed.org/keelboat-docking-90-45-22-approach/" target="_blank" rel="noopener">Watch: 90-45-22 docking approach</a>
        <a href="https://www.youtube.com/results?search_query=sailboat+docking+prop+walk+beginner" target="_blank" rel="noopener">YouTube: Sailboat docking and prop walk</a>
      </div>
    </section>

    <section id="knots">
      <h2>Four Knots Worth Learning</h2>
      <p>Do not try to learn every sailor knot. These four are enough to become very useful.</p>

      <div class="grid two">
        <div class="card knot-card">
          <h3>1. Cleat Hitch</h3>
          <img class="source-image" src="https://commons.wikimedia.org/wiki/Special:FilePath/Cleat_04.jpg" alt="Cleat hitch tied on a dock cleat" />
          <p>The docking knot. Around the base, figure eight, locking turn. Clean, quick, and easy to release.</p>
          <a class="learn-more" href="https://www.animatedknots.com/cleat-hitch-knot-dock-line" target="_blank" rel="noopener">Animated Knots: Cleat Hitch</a>
        </div>
        <div class="card knot-card">
          <h3>2. Bowline</h3>
          <img class="source-image" src="https://commons.wikimedia.org/wiki/Special:FilePath/Knot_bowline.jpg" alt="Step diagram for tying a bowline knot" />
          <p>Makes a fixed loop that will not slip. Useful for dock lines, attaching things, and rescue situations.</p>
          <a class="learn-more" href="https://www.animatedknots.com/bowline/" target="_blank" rel="noopener">Animated Knots: Bowline</a>
        </div>
        <div class="card knot-card">
          <h3>3. Round Turn + Two Half Hitches</h3>
          <img class="source-image" src="https://commons.wikimedia.org/wiki/Special:FilePath/Round_turn_and_two_half_hitches.png" alt="Diagram of a round turn and two half hitches knot" />
          <p>A reliable general-purpose knot for securing a line to a rail, ring, or post.</p>
          <a class="learn-more" href="https://www.animatedknots.com/roundturn/index.php?Categ=boating" target="_blank" rel="noopener">Animated Knots: Round Turn + Two Half Hitches</a>
        </div>
        <div class="card knot-card">
          <h3>4. Reef Knot / Square Knot</h3>
          <img class="source-image" src="https://commons.wikimedia.org/wiki/Special:FilePath/Square_knot.svg" alt="Diagram of a square knot also known as a reef knot" />
          <p>Good for tying bundles or light-duty sail ties. Not for heavy loads or life-safety use.</p>
          <a class="learn-more" href="https://www.animatedknots.com/square-knot" target="_blank" rel="noopener">Animated Knots: Reef / Square Knot</a>
        </div>
      </div>
      <p class="caption">Knot images from Wikimedia Commons. Step-by-step animations are linked to Animated Knots by Grog.</p>
    </section>

    <section id="safety">
      <h2>Safety: The Most Important Section</h2>
      <p>Good crew are safe, predictable, and aware. This is more important than knowing fancy sailing language.</p>

      <div class="grid two">
        <div class="card">
          <h3>On Deck Rules</h3>
          <ul>
            <li>One hand for yourself, one for the boat.</li>
            <li>Move slowly and deliberately.</li>
            <li>Keep your head out of the boom's path.</li>
            <li>Ask before leaving the cockpit underway.</li>
            <li>Wear a PFD when asked, at night, in rough weather, or when uncomfortable.</li>
          </ul>
        </div>
        <div class="card">
          <h3>Man Overboard</h3>
          <ol>
            <li>Shout: <strong>"Man overboard!"</strong></li>
            <li>Point at the person continuously.</li>
            <li>Do not stop pointing.</li>
            <li>Throw flotation if nearby.</li>
            <li>Let the skipper handle the boat.</li>
          </ol>
        </div>
      </div>

      <h3>San Juan-Specific Hazards</h3>
      <div class="grid three">
        <div class="card">
          <h4>Cold Water</h4>
          <p>The water is cold enough that falling in is serious. Avoid hero moves. Stay clipped in or seated when conditions warrant.</p>
        </div>
        <div class="card">
          <h4>Current</h4>
          <p>Currents can push the boat sideways, especially in narrow passes. The boat may not move where it appears to be pointing.</p>
        </div>
        <div class="card">
          <h4>Ferries</h4>
          <p>Washington State Ferries are large, fast, and constrained. Stay clear and never assume they can maneuver around us easily.</p>
        </div>
      </div>
    </section>

    <section id="head">
      <h2>How to Use the Head Without Clogging It</h2>
      <p>The head is the boat toilet. It is not like a house toilet. Marine plumbing uses smaller hoses, less water, valves, pumps, and a holding tank. Treat it gently.</p>

      <div class="callout danger">
        Nothing goes in the head unless it came out of your body, unless the skipper specifically says otherwise.
      </div>

      <div class="grid two">
        <div class="card">
          <h3>Do This</h3>
          <ul>
            <li>Ask for instructions before first use.</li>
            <li>Use very little toilet paper, or put paper in the lined trash if that is the boat rule.</li>
            <li>Flush/pump long enough to clear the bowl and move waste through the hose.</li>
            <li>Tell the skipper immediately if it gets slow, weird, or clogged.</li>
          </ul>
        </div>
        <div class="card">
          <h3>Never Do This</h3>
          <ul>
            <li>No wipes, even flushable wipes.</li>
            <li>No paper towels.</li>
            <li>No feminine products.</li>
            <li>No large wads of toilet paper.</li>
            <li>No pretending a problem will fix itself.</li>
          </ul>
        </div>
      </div>

      <h3>Simple Manual Head Pattern</h3>
      <ol>
        <li>Switch to wet/fill mode if the head has one.</li>
        <li>Pump a little water into the bowl.</li>
        <li>Use the head.</li>
        <li>Switch to dry/flush mode.</li>
        <li>Pump until the bowl is clear, then pump extra strokes to clear the hose.</li>
        <li>Leave the bowl as instructed by the skipper.</li>
      </ol>

      <div class="video-list">
        <a href="https://www.youtube.com/watch?v=JXy0vUi_lMQ" target="_blank" rel="noopener">Watch: How to Use a Boat Toilet Properly | Avoid Clogs</a>
        <a href="https://theboatgalley.com/clog-free-head/" target="_blank" rel="noopener">Read: The Boat Galley - How to Prevent a Clogged Marine Head</a>
      </div>
    </section>

    <section id="practice">
      <h2>Two-Week Practice Plan</h2>
      <p>The goal is light, repeatable exposure. Ten to twenty minutes at a time beats one long lecture.</p>

      <table>
        <thead><tr><th>When</th><th>What to Learn</th><th>Outcome</th></tr></thead>
        <tbody>
          <tr><td><strong>Days 1-3</strong></td><td>Wind clock, port/starboard, bow/stern, main/jib, tack/jibe.</td><td>They understand the basic language.</td></tr>
          <tr><td><strong>Days 4-6</strong></td><td>Cleat hitch, bowline, round turn + two half hitches.</td><td>They can tie useful knots without pressure.</td></tr>
          <tr><td><strong>Days 7-10</strong></td><td>Docking roles, fenders, lines, prop walk, step don't jump.</td><td>They know how to help at the dock.</td></tr>
          <tr><td><strong>Days 11-14</strong></td><td>Safety review, head instructions, San Juan map, ferry/current awareness.</td><td>They are safe, calm, and ready to contribute.</td></tr>
        </tbody>
      </table>

      <div class="callout success">
        Departure-day test: each person ties a cleat hitch, identifies port/starboard/bow/stern, explains where the wind is coming from, and says the one rule for the head.
      </div>
    </section>

    <section id="resources">
      <h2>Videos &amp; Deeper Resources</h2>
      <div class="grid two">
        <div class="card resource-list">
          <h3>Sailing Basics</h3>
          <a href="https://asa.com/news/2020/04/16/points-of-sail-explained/" target="_blank" rel="noopener">ASA: Points of Sail Explained</a>
          <a href="https://www.youtube.com/results?search_query=points+of+sail+beginner+sailing" target="_blank" rel="noopener">YouTube Search: Points of Sail for Beginners</a>
          <a href="https://www.youtube.com/results?search_query=basic+parts+of+a+sailboat+beginner" target="_blank" rel="noopener">YouTube Search: Parts of a Sailboat</a>
          <a href="https://improvesailing.com/guides/sailboat-parts-explained" target="_blank" rel="noopener">Improve Sailing: Sailboat Parts Explained</a>
          <a href="https://www.offshoresailing.com/docking/" target="_blank" rel="noopener">Offshore Sailing: Docking a Sailboat</a>
          <a href="https://www.animatedknots.com/boating-knots" target="_blank" rel="noopener">Animated Knots: Boating Knots</a>
        </div>
        <div class="card resource-list">
          <h3>San Juan Islands &amp; Local Awareness</h3>
          <a href="https://www.youtube.com/results?search_query=sailing+san+juan+islands+sucia+stuart+roche+harbor" target="_blank" rel="noopener">YouTube Search: San Juan Sailing Routes</a>
          <a href="https://www.visitsanjuans.com/plan-your-trip" target="_blank" rel="noopener">Visit San Juans: Plan Your Trip</a>
          <a href="https://wsdot.com/ferries/vesselwatch/" target="_blank" rel="noopener">Washington State Ferries: VesselWatch</a>
          <a href="https://tidesandcurrents.noaa.gov/" target="_blank" rel="noopener">NOAA Tides &amp; Currents</a>
          <a href="https://www.weather.gov/marine/" target="_blank" rel="noopener">NOAA Marine Weather</a>
          <a href="https://whalemuseum.org/pages/whale-watch-information" target="_blank" rel="noopener">The Whale Museum: Whale Watch Information</a>
        </div>
      </div>
    </section>

    <section id="fun">
      <h2>Frivolous but Fun</h2>
      <p>Useful conversation fuel for slow reaches, dock walks, and evenings when nobody wants another knot lesson.</p>

      <div class="grid two">
        <div class="card">
          <h3>The Pig War</h3>
          <p>In 1859, the United States and Great Britain nearly fought over the San Juan boundary after an American settler shot a British-owned pig eating potatoes. The dispute became a 12-year joint military occupation and was ultimately settled by arbitration in 1872.</p>
          <a href="https://www.nps.gov/sajh/learn/historyculture/the-pig-war.htm" target="_blank" rel="noopener">NPS: The Pig War</a>
        </div>
        <div class="card">
          <h3>Spanish Names Before Vancouver</h3>
          <p>The Spanish were charting these waters before George Vancouver's expedition. Francisco de Eliza's expedition named the San Juan archipelago, and names like Rosario, Fidalgo, Guemes, Lopez, and Orcas preserve pieces of that Spanish mapping history.</p>
          <a href="https://www.nps.gov/places/the-rosario-strait.htm" target="_blank" rel="noopener">NPS: Rosario Strait history</a>
        </div>
        <div class="card">
          <h3>Vancouver Mapped the Maze</h3>
          <p>Vancouver's 1792 work helped turn a confusing maze of channels into charts that European and American mariners could use. A lot of modern place-name history in the Salish Sea is a layered mix of Indigenous places, Spanish charting, British charting, and later American names.</p>
          <a href="https://historylink.org/File/10767" target="_blank" rel="noopener">HistoryLink: Vancouver's exploration</a>
        </div>
        <div class="card">
          <h3>Why Orcas Like It Here</h3>
          <p>The San Juans sit in critical Southern Resident killer whale habitat, with feeding routes tied heavily to salmon. Bigg's killer whales also use the wider Salish Sea while hunting marine mammals. Sightings are never guaranteed, and boaters need to give whales legal space.</p>
          <a href="https://www.fisheries.noaa.gov/species/killer-whale/science" target="_blank" rel="noopener">NOAA: Killer whale science</a>
        </div>
        <div class="card">
          <h3>Roche Harbor's Afterglow Vista</h3>
          <p>Near Roche Harbor is the McMillin family mausoleum, an open-air memorial with heavy Masonic symbolism, stone chairs, a limestone table, and a wooded trail approach. It is less a ghost story than a genuinely strange, atmospheric historical site.</p>
          <a href="https://www.nps.gov/places/afterglow-vista.htm" target="_blank" rel="noopener">NPS: Afterglow Vista</a>
        </div>
        <div class="card">
          <h3>The Better Livestock Story</h3>
          <p>The easy-to-source livestock tale is not mystery cattle on Whidbey, but the Hudson's Bay Company's Belle Vue Sheep Farm on San Juan Island. By the late 1850s it had thousands of sheep plus cattle, oxen, hogs, horses, and one very consequential pig.</p>
          <a href="https://www.nps.gov/places/belle-vue-sheep-farm.htm" target="_blank" rel="noopener">NPS: Belle Vue Sheep Farm</a>
        </div>
      </div>
    </section>
  </main>

  <footer class="expedition-footer">
    Made for a family San Juan Islands sailing trip. Keep it simple. Stay safe. Don't clog the head.
  </footer>
`;

export default function HowesExpedition() {
  return (
    <article
      className={styles.expedition}
      dangerouslySetInnerHTML={{ __html: pageHtml }}
    />
  );
}
