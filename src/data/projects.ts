import { Project } from "@/types/project";

export const architecturalProjects: Project[] = [
  {
    id: "armity-duplex",
    title: "The Armity Contemporary Duplex",
    slug: "armity-duplex",
    category: "Residential",
    location: "Ejioku Village, ARMITY Estate",
    yearCompleted: "2025 (Under Construction)",
    client: "Private Client",
    siteArea: "650 m²",
    gfa: "380 m²",
    budget: "Confidential",
    shortDescription:
      "A contemporary residential duplex featuring a double-height glazed atrium tower, cantilevered upper balcony, and integrated ambient lighting in ARMITY Estate.",
    longDescription:
      "Privileged to have designed this contemporary duplex at Ejioku Village, ARMITY Estate. Designed by DIZTINCT TOUCH HOME DESIGN under our core ethos of 'Remarkable design, long lasting', the residence pairs an imposing textured dark brickwork tower with a double-height glazed atrium, clean white cantilevered volumes, and protective perimeter security integration. Currently under active construction, the ground floor and decking stages have been successfully completed, with construction progressing at the first-floor level.",
    fullCaseStudy: {
      contextAndChallenge:
        "Located in the serene ARMITY Estate in Ejioku Village, the brief called for a multi-generational contemporary family residence offering privacy, natural ventilation, and generous spatial flow. The site demanded careful consideration of solar orientation to keep the double-height atrium naturally illuminated throughout the day without excessive heat accumulation.",
      designConcept:
        "The building massing is defined by two interlocking geometric volumes: a bold, dark textured brickwork tower framing a dramatic 6.4-meter floor-to-ceiling glass curtain wall, counterbalanced by a crisp white cantilevered first-floor balcony accented by vertical architectural privacy louvers.",
      materialityAndStructure:
        "Reinforced concrete column-and-beam frame with high-tensile suspended deck slab. Exterior finishes blend charcoal textured brick cladding, smooth weatherproof stucco, powder-coated black aluminum curtain wall framing, tempered glass balcony railings, and integrated warm perimeter architectural wall lighting.",
      environmentalPerformance:
        "Deep cantilevered eaves protect the upper floor bedrooms from intense tropical afternoon sun, while cross-ventilation corridors across both levels promote natural airflow. Ground-floor construction and suspended decking have been successfully completed, with first-floor masonry and reinforcement currently underway.",
    },
    techStack: [
      "2D Architectural Drawings",
      "3D Modeling & Visualization",
      "Revit (BIM)",
      "AutoCAD",
      "Concrete Decking",
      "Textured Brick",
      "V-Ray",
    ],
    coverImage: "/projects/armity-duplex/cover.jpg",
    featured: true,
    featuredRank: 1,
    dateStr: "2025-09-23",
    architecture: {
      diagramUrl: "/projects/armity-duplex/axonometric.svg",
      description:
        "Structural massing showing the completed reinforced ground-floor frame, the cast suspended decking slab, and active first-floor construction featuring the master cantilever balcony and double-height glazed atrium.",
    },
    drawings: [
      {
        title: "Construction Stage & Massing Axonometric",
        type: "Axonometric",
        scale: "1:100",
        url: "/projects/armity-duplex/axonometric.svg",
        caption: "Ground floor and decking completed; first floor masonry currently in progress.",
      },
      {
        title: "Ground Floor Architectural Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
        caption: "Open-plan main living lounge, dining hall, kitchen suite, and en-suite guest quarters.",
      },
      {
        title: "First Floor Plan & Cantilever Balcony",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
        caption: "Private family lounge, en-suite bedrooms, and wrap-around terrace.",
      },
    ],
    gallery: [
      {
        url: "/projects/armity-duplex/cover.jpg",
        caption: "Hero twilight perspective showing the double-height glazed atrium, cantilevered balcony, and ambient garden lighting.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
        caption: "Double-height living lounge interior with full daylight penetration and seamless sightlines.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        caption: "First-floor family terrace and cantilever balcony detail with vertical architectural privacy louvers.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        caption: "Contemporary kitchen and dining suite with seamless transition into the courtyard.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
        caption: "Textured charcoal brick facade cladding and architectural bronze sconce fixtures.",
        category: "detail",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Facade Massing & Daylight",
        decision: "Double-height floor-to-ceiling curtain wall atrium paired with dark textured brickwork tower.",
        reason: "Maximizes natural daylight penetration deep into the main living lounge while establishing an imposing contemporary presence.",
        tradeoff: "Required heavy-gauge reinforced structural steel wind-load transoms for the tall glass mullions.",
      },
      {
        topic: "Upper Floor Shading & Privacy",
        decision: "Cantilevered wrap-around balcony with vertical architectural privacy louvers.",
        reason: "Passively shields ground-floor entry from tropical rain and overhead sun while providing private outdoor leisure for the master suite.",
        tradeoff: "Demanded careful cantilever reinforcement moment-calculations during the decking slab casting stage.",
      },
      {
        topic: "Perimeter Security & Landscape Integration",
        decision: "Integrated boundary lighting and continuous perimeter security envelope.",
        reason: "Maintains optimal residential security while ensuring the entrance driveway feels warm and welcoming at dusk.",
      },
    ],
    metrics: [
      {
        label: "Construction Progress",
        value: "1st Floor",
        description: "Ground-floor & suspended decking completed; first floor masonry in progress.",
        changeBadge: "Active Build",
      },
      {
        label: "Atrium Window Height",
        value: "6.4 Meters",
        description: "Double-height floor-to-ceiling curtain wall providing daylight throughout the day.",
        changeBadge: "Double-Height",
      },
      {
        label: "Gross Internal Area",
        value: "380 m²",
        description: "Spacious 2-storey contemporary layout with 5 en-suite bedrooms and dual lounges.",
        changeBadge: "Residential",
      },
      {
        label: "Balcony Cantilever",
        value: "2.8 Meters",
        description: "Post-supported cantilevered terrace offering deep solar shading to the ground level.",
        changeBadge: "Deep Shading",
      },
    ],
    futureImprovements: [
      "Ground-floor construction: Completed",
      "Reinforced concrete decking slab: Completed",
      "First-floor structural blockwork: In Progress",
      "Roof parapet & interior mechanical/electrical rough-in: Upcoming",
      "Final bespoke finishes & landscape illumination: Final Phase",
    ],
  },
  {
    id: "pavilion-corten",
    title: "Komorebi Forest Pavilion & Research Center",
    slug: "komorebi-pavilion",
    category: "Civic & Cultural",
    location: "Nagano, Japan",
    yearCompleted: "2025",
    client: "Nagano Prefectural Forestry Institute",
    siteArea: "18,500 m²",
    gfa: "2,400 m²",
    budget: "$8.4M USD",
    shortDescription:
      "A mass-timber canopy structure balancing delicate reciprocal timber framing with raw rammed-earth thermal mass walls in an alpine cedar grove.",
    longDescription:
      "Commissioned by the Nagano Forestry Institute, the Komorebi Pavilion serves as a public exhibition hall, community sanctuary, and alpine climate research facility. The primary design challenge was building within a sensitive cedar grove with zero root disruption. The solution employs an elevated pad foundation supporting a reciprocal timber lattice made entirely of locally felled Japanese Larch. Deep eaves eliminate midday solar gain while allowing low-angle winter sunlight to passively charge the rammed-earth interior cores.",
    fullCaseStudy: {
      contextAndChallenge:
        "The site sits on an 18-degree alpine slope populated by 90-year-old Japanese Larch and Hinoki Cypress trees. Local environmental zoning strictly prohibited conventional trench excavation or soil disturbance exceeding 800mm depth. Furthermore, winter conditions generate heavy snowpack up to 2.1 meters, exerting immense vertical and lateral loads.",
      designConcept:
        "Taking inspiration from the Japanese phenomenon of 'Komorebi' (sunlight filtering through forest leaves), the canopy is generated using reciprocal Voronoi computational geometry. The roof opens and closes selectively, casting dynamic shadow matrices on the interior rammed-earth walls that shift throughout the diurnal cycle.",
      materialityAndStructure:
        "The primary structural frame utilizes 100% locally harvested Larch, processed into dowel-laminated timber (DLT) modules without petro-chemical adhesives. Lateral loads are absorbed by four monolithic 350mm rammed-earth pylons stabilized with pozzolanic volcanic ash rather than Portland cement.",
      environmentalPerformance:
        "With passive solar heat gain, a subterranean earth-tube geothermal air exchange system, and high-performance quadruple glazed envelope walls, the building functions in off-grid net-positive operational balance through all four seasons.",
    },
    techStack: ["Rhino 8", "Grasshopper", "Revit (BIM)", "Mass Timber", "Rammed Earth", "Enscape"],
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-wooden-panels-42790-large.mp4",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/virtual-tour",
    featured: true,
    featuredRank: 2,
    dateStr: "2025-06-15",
    architecture: {
      diagramUrl: "/projects/komorebi-pavilion/axonometric.svg",
      description:
        "The roof structure uses an algorithmic Voronoi reciprocal frame generated via Grasshopper, distributing snow loads laterally onto four hyper-compact rammed-earth shear pylons. Natural ventilation operates via stack effect through an automated operable oculus at the canopy zenith.",
    },
    drawings: [
      {
        title: "Ground Level Master Plan",
        type: "Plan",
        scale: "1:200",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
        caption: "Ground floor circulation connecting cedar grove trails through the central atrium.",
      },
      {
        title: "Transverse Cross Section",
        type: "Section",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
        caption: "Section showing the oculus air exhaust stack and passive thermal core interaction.",
      },
      {
        title: "Reciprocal Joint Detail",
        type: "Detail",
        scale: "1:10",
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?auto=format&fit=crop&w=1400&q=80",
        caption: "CNC-milled timber interlocking lap joint with oak dowels and concealed tension ties.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
        caption: "Exterior view of the mass timber canopy floating among alpine Japanese Larch trees at twilight.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        caption: "Double-height central research atrium with continuous skylight filtration and rammed earth pylons.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        caption: "Intricate underside perspective of the reciprocal dowel-laminated timber geometric roof grid.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
        caption: "Botanical observation gallery with flush frameless triple-pane structural glass framing.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
        caption: "South terrace illuminated during winter snowfall showing thermal performance.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1600&q=85",
        caption: "Tectonic junction where the rammed-earth wall meets the copper-flashed perimeter eaves.",
        category: "detail",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Structural Primary Framing",
        decision: "Reciprocal Dowel-Laminated Timber (DLT) instead of Glulam with steel plates.",
        reason: "Eliminates petrochemical adhesives and visible steel connector plates, allowing all timber members to be disassembled, reclaimed, or naturally composted at end-of-life.",
        tradeoff: "Required sub-millimeter CNC fabrication tolerances (±0.5mm) and strict offsite prefabrication sheltering.",
      },
      {
        topic: "Thermal Mass & Envelope",
        decision: "350mm Stabilized Rammed Earth (SRE) spine walls.",
        reason: "Provides a 12-hour thermal lag that absorbs internal heat gains during operational hours and releases it during freezing alpine nights.",
        tradeoff: "Increased total foundation bearing load, requiring micro-piles anchored into basalt bedrock.",
      },
      {
        topic: "Solar Shading & Daylight",
        decision: "Parametric overhangs calibrated to 36.4° solar angle on summer solstice.",
        reason: "Achieves 100% solar cutoff at peak heat while admitting deep morning light during sub-zero winter mornings.",
        tradeoff: "Required bespoke structural eave outriggers fabricated with concealed carbon fiber rods.",
      },
    ],
    metrics: [
      {
        label: "Embodied Carbon",
        value: "-148 kgCO₂e/m²",
        description: "Carbon-negative superstructure sequestering more carbon than emitted during extraction and transport.",
        changeBadge: "Net-Negative",
      },
      {
        label: "Gross Internal Area",
        value: "2,400 m²",
        description: "Exhibition spaces, research labs, public forum, and botanical greenhouse.",
        changeBadge: "Optimized",
      },
      {
        label: "Daylight Autonomy",
        value: "91% sDA",
        description: "Operates 91% of working daylight hours without artificial lighting.",
        changeBadge: "High Comfort",
      },
      {
        label: "Thermal EUI",
        value: "24 kWh/m²/yr",
        description: "Surpasses Passivhaus Institute standards for alpine high-altitude climates.",
        changeBadge: "Passivhaus",
      },
    ],
    futureImprovements: [
      "Phase II expansion: 60-meter elevated canopy skywalk connecting the pavilion to upper ridge observatories.",
      "Integration of integrated greywater phytoremediation reedbeds along the southern terrace slope.",
      "Expansion of the alpine spore seed bank beneath the bedrock basement level.",
    ],
  },
  {
    id: "brutalist-residence",
    title: "The Monolith: Cantilevered Coastal Villa",
    slug: "the-monolith",
    category: "Residential",
    location: "Cascais, Portugal",
    yearCompleted: "2024",
    client: "Private Collector",
    siteArea: "4,200 m²",
    gfa: "780 m²",
    budget: "$4.9M USD",
    shortDescription:
      "A board-marked concrete cliffside residence designed around internal courtyards, maritime wind shielding, and framed Atlantic vistas.",
    longDescription:
      "Perched on an Atlantic bluff exposed to gale-force westerly winds and salt spray, The Monolith is conceived as an excavated rock mass. Rather than opening completely to the ocean with fragile floor-to-ceiling glass, the house organizes living spaces around sheltered micro-climate courtyards that capture warm southern daylight while blocking harsh sea winds.",
    fullCaseStudy: {
      contextAndChallenge:
        "The site overlooks the Sintra-Cascais coastal ridge, where salt-laden winds reach speeds in excess of 110 km/h during winter storms. The primary architectural objective was creating a serene, highly protective sanctuary without forfeiting panoramic ocean horizons.",
      designConcept:
        "The residence is sculpted as two interlocking tectonic volumes: an excavated subterranean base rooted in granite bedrock, and a dramatic 9.2-meter post-tensioned cantilever that extends outward toward the Atlantic horizon.",
      materialityAndStructure:
        "White Pozzolanic concrete mixed with local granite aggregates was cast in rough-sawn maritime pine formwork. The exterior concrete is left untreated, developing a weathered biological patina that harmonizes with the maritime flora over time.",
      environmentalPerformance:
        "Deep courtyard voids act as solar windbreaks and natural convection chimneys, drawing cooler sea breezes through thermal underground labyrinths to maintain 21°C interior temperatures without mechanical cooling.",
    },
    techStack: ["Revit", "V-Ray", "AutoCAD", "Post-Tensioned Concrete", "Corten Steel"],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-curved-modern-building-facade-42792-large.mp4",
    liveUrl: "https://example.com/monolith-tour",
    featured: true,
    featuredRank: 3,
    dateStr: "2024-11-20",
    architecture: {
      diagramUrl: "/projects/the-monolith/section.svg",
      description:
        "A 9.2-meter post-tensioned board-marked concrete cantilever hovers over the cliff edge. Internal structural walls act as deep beams, preventing deflection and transferring wind uplift into deep rock anchors.",
    },
    drawings: [
      {
        title: "Upper Living Level Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
        caption: "Living room, ocean terrace cantilever, and wind-shielded patio layout.",
      },
      {
        title: "Longitudinal Cliff Section",
        type: "Section",
        scale: "1:75",
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80",
        caption: "Section displaying the 32-meter tension cables anchored into basalt bedrock.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        caption: "The 9.2-meter white concrete cantilever extending dramatically over the coastal cliff edge.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
        caption: "Internal wind-shielded courtyard featuring native coastal olive trees and stone paving.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        caption: "Minimalist living hall with board-marked concrete textures and recessed sliding bronze screens.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1600&q=85",
        caption: "Detail of rough-sawn pine board texture cast into the white pozzolanic concrete wall.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=1600&q=85",
        caption: "Cliffside infinity pool cantilevered above the Atlantic breaking waves at sunset.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Facade Materiality & Salt Durability",
        decision: "White Pozzolanic Concrete with board-marked texture, impregnated with hydrophobic silane.",
        reason: "Withstands extreme maritime salt crystallisation without spalling or requiring recurring repainting.",
        tradeoff: "Demanded bespoke Scandinavian pine formwork constructed by specialist maritime carpenters.",
      },
      {
        topic: "Cantilever Structural Mechanics",
        decision: "Post-tensioned high-yield tendons running through perimeter shear spandrels.",
        reason: "Permits unobstructed 270-degree ocean views without corner columns or structural mullions.",
        tradeoff: "Required strict 28-day curing protocols before progressive staged tendon tensioning.",
      },
      {
        topic: "Glazing Engineering",
        decision: "Motorized pocket glass panels recessed into insulated wall cavities.",
        reason: "Allows total seamless opening during calm seasons while sealing hermetically against hurricane winds.",
        tradeoff: "Significant MEP coordination for hidden automated track drainage channels.",
      },
    ],
    metrics: [
      {
        label: "Cantilever Span",
        value: "9.2 meters",
        description: "Post-tensioned clear span floating unobstructed over the coastal slope.",
        changeBadge: "Record Span",
      },
      {
        label: "Acoustic Attenuation",
        value: "48 dB",
        description: "Internal calm achieved even during Force 9 coastal gale conditions.",
        changeBadge: "Silent Interior",
      },
      {
        label: "Concrete Cement Reduction",
        value: "55% Clinker Sub.",
        description: "Substituted with volcanic pozzolana and ground granulated blast-furnace slag.",
        changeBadge: "Low Carbon",
      },
      {
        label: "Rainwater Harvesting",
        value: "120,000 L/yr",
        description: "100% landscape irrigation and greywater supply provided by roof runoff.",
        changeBadge: "Self-Sustaining",
      },
    ],
    futureImprovements: [
      "Subterranean wine cellar and ocean-view meditation cave excavated into the cliff strata.",
      "Tidal energy micro-turbine installed in the private cove below for supplementary electrical storage.",
    ],
  },
  {
    id: "aethelgard-tower",
    title: "Aethelgard Mass Timber Commercial Tower",
    slug: "aethelgard-tower",
    category: "Commercial",
    location: "Stockholm, Sweden",
    yearCompleted: "2025",
    client: "Nordic Sustainable Property Trust",
    siteArea: "3,800 m²",
    gfa: "22,400 m²",
    budget: "$64M USD",
    shortDescription:
      "A 16-storey hybrid mass timber office building setting Nordic precedents for carbon sequestration and biophilic workplace design.",
    longDescription:
      "Located in Stockholm's Hagastaden life-sciences district, Aethelgard redefines the speculative commercial office. By pairing a Cross-Laminated Timber (CLT) structural core with glued-laminated timber (Glulam) columns and perimeter diagrids, the project demonstrates that high-density urban office towers can act as long-term atmospheric carbon vaults.",
    fullCaseStudy: {
      contextAndChallenge:
        "Nordic building regulations impose strict acoustic vibration thresholds and fire resistance standards on multi-storey timber structures. The client required flexible, column-free commercial floor plates exceeding 1,200 m² with full Class-A commercial certifications.",
      designConcept:
        "The tower takes cues from Scandinavian stave churches, expressing primary timber columns outwardly behind a double-skin glass envelope. A continuous spiral atrium snakes up the building, encouraging spontaneous encounters and vertical movement across 16 storeys.",
      materialityAndStructure:
        "Locally sourced Swedish Spruce CLT floor slabs (220mm thickness) are supported by GL32c Glulam columns. A low-carbon recycled steel perimeter moment frame provides torsional stiffness against northern Baltic gale wind loads.",
      environmentalPerformance:
        "Certified LEED Platinum and WELL Platinum, Aethelgard generates 32% of its annual energy from building-integrated photovoltaic (BIPV) glass panels on the southern facade.",
    },
    techStack: ["Revit", "Grasshopper", "Karamba3D", "Mass Timber", "CLT", "V-Ray"],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-office-building-with-glass-facade-42795-large.mp4",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/aethelgard-model",
    featured: true,
    featuredRank: 4,
    dateStr: "2025-02-10",
    architecture: {
      diagramUrl: "/projects/aethelgard-tower/axonometric.svg",
      description:
        "A central CLT elevator and egress core provides shear resistance, allowing perimeter columns to remain exceptionally slender. Biophilic sky-gardens punctuate every fourth level, acting as natural thermal buffer zones.",
    },
    drawings: [
      {
        title: "Typical High-Rise Office Floor Plan",
        type: "Plan",
        scale: "1:200",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
        caption: "Column-free modular workplace floor plate organized around the central timber core.",
      },
      {
        title: "Double-Skin Facade Assembly Detail",
        type: "Detail",
        scale: "1:20",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
        caption: "Natural airflow cavity between outer single glazing and inner double-glazed timber window wall.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
        caption: "Aethelgard 16-storey mass timber tower rising above Stockholm's urban landscape.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
        caption: "Exposed spruce glulam beams and warm timber ceiling finishes in the executive collaborative suites.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
        caption: "The 4-storey sky-garden atrium with biophilic green walls and natural timber stepped amphitheater.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
        caption: "Facade detail of the double-skin glass curtain wall with automated timber shading louvers.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1600&q=85",
        caption: "Ground-level public galleria connecting urban pedestrian corridors into the heart of the tower.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Fire Engineering & Timber Exposure",
        decision: "Sacrificial charring layer design (70mm excess timber thickness) instead of drywall encapsulation.",
        reason: "Preserves the therapeutic, biophilic visual benefits of raw wood grain while exceeding 120-minute fire resistance ratings.",
        tradeoff: "Added ~8% volume to timber member sizing throughout the column schedule.",
      },
      {
        topic: "Acoustic Floor Assembly",
        decision: "Dry screed gravel ballast layer atop elastomeric acoustic isolation strips.",
        reason: "Achieves impact sound insulation of Ln,w ≤ 46 dB without pouring heavy wet concrete over the wood slabs.",
        tradeoff: "Required rigorous factory-fitted moisture barrier membranes during transport.",
      },
    ],
    metrics: [
      {
        label: "Total Carbon Sequestered",
        value: "3,150 tonnes CO₂",
        description: "Equivalent to removing 2,200 gasoline passenger vehicles from roads for a full year.",
        changeBadge: "LEED Platinum",
      },
      {
        label: "Construction Speed",
        value: "-35% Schedule",
        description: "Prefabricated timber modules erected in 11 months vs 17 months for equivalent steel/concrete.",
        changeBadge: "Rapid Build",
      },
      {
        label: "Daylight Factor",
        value: "4.8% DF",
        description: "Floor plates enjoy natural illumination across 94% of regularly occupied workspaces.",
        changeBadge: "WELL Certified",
      },
      {
        label: "Energy Generation",
        value: "145 MWh/yr",
        description: "Building-integrated solar facade feeding clean electricity directly into the building microgrid.",
        changeBadge: "On-Site Solar",
      },
    ],
    futureImprovements: [
      "Phase II rooftop urban apiary and community botanical greenhouse opening in summer 2026.",
      "Automated robotic facade cleaning system utilizing recirculated rainwater.",
    ],
  },
  {
    id: "foundry-reuse",
    title: "Foundry 04: Industrial Boilerhouse Adaptive Reuse",
    slug: "foundry-04",
    category: "Adaptive Reuse",
    location: "Ruhr Valley, Germany",
    yearCompleted: "2024",
    client: "Essen Metropolitan Arts Foundation",
    siteArea: "9,600 m²",
    gfa: "5,100 m²",
    budget: "$14.2M USD",
    shortDescription:
      "Transformation of a 1912 coal boilerhouse into an experimental contemporary art center and creative production hub.",
    longDescription:
      "Foundry 04 honors the Ruhr Valley's industrial legacy while offering a flexible canvas for 21st-century immersive art. By surgically inserting steel suspended cat-walks, acoustic timber chambers, and high-performance climate zones inside the monumental 28-meter riveted steel skeleton, the building preserves its raw historic patina while exceeding contemporary civic building codes.",
    fullCaseStudy: {
      contextAndChallenge:
        "The disused boilerhouse had stood abandoned for 38 years, suffering from industrial chemical contamination, water infiltration, and deteriorating masonry. The challenge was converting this cavernous, uninsulated volume into museum-grade microclimates without demolishing the monumental historic fabric.",
      designConcept:
        "Conceived as a 'box-within-a-box' spatial strategy. The raw exterior masonry and riveted steel trusses act as an unconditioned weather shield, inside of which autonomous, climate-controlled timber-and-glass pavilions are suspended like tectonic lanterns.",
      materialityAndStructure:
        "Oxidized Corten steel, historic Flemish-bond clinker brick, black hot-rolled steel plate, and acoustic perforated birch plywood create a rich tactile conversation between historic heavy industry and delicate contemporary interventions.",
      environmentalPerformance:
        "A closed-loop mine-water geothermal heat pump utilizes abandoned flooded colliery shafts 450 meters below the site to provide 100% of winter heating and summer chilled-beam cooling.",
    },
    techStack: ["Rhino", "Revit", "Point Cloud Scanning", "Corten Steel", "Timber", "Enscape"],
    coverImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-museum-interior-with-abstract-art-42797-large.mp4",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/foundry-virtual",
    featured: true,
    featuredRank: 5,
    dateStr: "2024-08-30",
    architecture: {
      diagramUrl: "/projects/foundry-04/axonometric.svg",
      description:
        "A series of steel bridges and suspended exhibition cubes hang directly from the refurbished 1912 overhead gantry crane tracks, leaving the 24-meter central nave entirely open for monumental art installations.",
    },
    drawings: [
      {
        title: "Main Nave & Mezzanine Level Plan",
        type: "Plan",
        scale: "1:250",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
        caption: "Circulation pathway weaving through original turbine foundations and new art pods.",
      },
      {
        title: "Longitudinal Spatial Section",
        type: "Section",
        scale: "1:150",
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?auto=format&fit=crop&w=1400&q=80",
        caption: "Cross-section showing suspended galleries and mine-water geothermal shafts.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85",
        caption: "Exterior view of the historic brick clinker boilerhouse with new Corten entry vestibule.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1600&q=85",
        caption: "Monumental main nave displaying the restored riveted steel gantry crane and suspended bridges.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1600&q=85",
        caption: "Acoustic timber experimental theater box nestled within the raw industrial framework.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?auto=format&fit=crop&w=1600&q=85",
        caption: "Detail of the custom Corten steel stair treads meeting the historic distressed brickwork.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
        caption: "Twilight illumination showcasing the warm lantern effect through restored industrial clerestory windows.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Historic Brick Restoration & Insulation",
        decision: "Vapor-permeable aerogel interior plaster insulation (40mm thickness).",
        reason: "Prevents freeze-thaw spalling in the 110-year-old masonry while boosting U-values from 2.2 to 0.28 W/m²K.",
        tradeoff: "Specialist application required hand-troweled multi-stage curing under climate tents.",
      },
      {
        topic: "Geothermal Heat Exchange",
        decision: "Subterranean colliery mine-water heat loop at 22°C year-round temperature.",
        reason: "Provides low-cost, zero-carbon thermal energy using existing industrial subterranean shafts.",
        tradeoff: "Demanded titanium heat exchangers to resist the corrosive sulfuric minerals in mine water.",
      },
    ],
    metrics: [
      {
        label: "Embodied Carbon Saved",
        value: "2,840 tCO₂e",
        description: "Avoided demolition and new structural framing emissions compared to a new-build civic facility.",
        changeBadge: "Heritage Saver",
      },
      {
        label: "Exhibition Floor Area",
        value: "5,100 m²",
        description: "Galleries, experimental black box theater, artist studios, and community cafe.",
        changeBadge: "Full Activation",
      },
      {
        label: "Energy Efficiency",
        value: "82% Reduction",
        description: "Compared to standard historical building baseline operational footprints.",
        changeBadge: "A+ Rated",
      },
      {
        label: "Salvaged Material",
        value: "94% Reused",
        description: "Steel gantry members, brickwork, and industrial timber repurposed on-site.",
        changeBadge: "Circular Economy",
      },
    ],
    futureImprovements: [
      "Phase II outdoor sculpture park and wetlands remediation along the adjacent industrial canal.",
      "Artist-in-residence live-work lofts occupying the upper historic coal silo tower.",
    ],
  },
  {
    id: "terracielo-masterplan",
    title: "Terracielo Modular Urban Masterplan",
    slug: "terracielo-masterplan",
    category: "Urban & Masterplan",
    location: "Milan, Italy",
    yearCompleted: "2024",
    client: "City of Milan Urban Planning Department",
    siteArea: "142,000 m²",
    gfa: "88,000 m²",
    budget: "$210M USD",
    shortDescription:
      "A biophilic post-car neighborhood masterplan reconnecting Milan's Porta Romana rail yards with porous courtyards and timber residential blocks.",
    longDescription:
      "Terracielo reimagines obsolete rail infrastructure as a continuous public landscape park bordered by timber hybrid residential blocks. By lifting vehicular traffic entirely below grade and designing a multi-layered canopy of shaded walkways, public piazzas, and communal rooftop gardens, the masterplan establishes a new model for high-density European urban living.",
    fullCaseStudy: {
      contextAndChallenge:
        "The former railway yard was a severe urban barrier severing adjacent neighborhoods for over a century. The urban planning brief called for 1,200 residential units (40% affordable), public schools, civic parks, and comprehensive pedestrian priority.",
      designConcept:
        "The masterplan is organized around the historic 'cardo and decumanus' Roman urban grid, rotated 15 degrees to optimize solar exposure and capture prevailing Alpine summer breezes.",
      materialityAndStructure:
        "Buildings are conceived as modular timber-and-terracotta blocks, featuring prefabricated terracotta rainscreens manufactured in Lombardy that echo historic Milanese brick palazzos.",
      environmentalPerformance:
        "The entire district functions on a shared 5th-generation ambient heat network, coupled with 35,000 m² of bioswales and permeable parkland that absorbs 100% of severe storm flash-flooding.",
    },
    techStack: ["CityEngine", "Rhino 8", "GIS Mapping", "Grasshopper", "Enscape", "Revit"],
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/terracielo-gis",
    featured: false,
    dateStr: "2024-05-18",
    architecture: {
      diagramUrl: "/diagrams/terracielo-masterplan.svg",
      description:
        "A continuous 1.4-kilometer linear public park serves as the masterplan's green spine, with residential blocks tapering downward toward the park to ensure unobstructed daylight reaches all courtyard gardens.",
    },
    drawings: [
      {
        title: "Masterplan Ground Circulation & Public Realm",
        type: "Plan",
        scale: "1:1000",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
        caption: "Pedestrian walkways, civic piazzas, and green park arteries.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
        caption: "Aerial masterplan perspective showing the central park green spine and residential blocks.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
        caption: "Pedestrian street level with active retail colonnades, terracotta facades, and lush greenery.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=85",
        caption: "Shared community greenhouse pavilion atop the central residential courtyard.",
        category: "interior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "District Microclimate & Wind Mitigation",
        decision: "Parametrically sculpted block heights and stepped courtyard voids.",
        reason: "Reduces peak summer urban heat island effect by 3.4°C across all outdoor public gathering areas.",
        tradeoff: "Required non-standard structural roof level transitions across multiple residential blocks.",
      },
      {
        topic: "Stormwater Sponge Infrastructure",
        decision: "Continuous interconnected bioswale network with subterranean gravel aquifer recharge basins.",
        reason: "Zero runoff into Milan's municipal sewer system even during 100-year storm events.",
        tradeoff: "Dedicated 14% of ground surface area exclusively to retention plantings and gravel filters.",
      },
    ],
    metrics: [
      {
        label: "Masterplan Area",
        value: "14.2 Hectares",
        description: "Brownfield rail yard converted to 65% public parkland and pedestrian realms.",
      },
      {
        label: "Affordable Housing",
        value: "40% of Units",
        description: "480 high-performance mass timber homes reserved for affordable civic tenancies.",
      },
      {
        label: "Urban Heat Island",
        value: "-3.4°C Relief",
        description: "Targeted tree canopy density and biophilic surfaces reduce summer thermal stress.",
      },
      {
        label: "Renewable Generation",
        value: "100% Net Zero",
        description: "Onsite solar roofs and geothermal district network cover all residential energy demands.",
      },
    ],
    futureImprovements: [
      "Phase II light-rail transit hub connecting directly into Milan's high-speed rail corridor.",
    ],
  },
  {
    id: "hyperborea-station",
    title: "Hyperborea Polar Observatory & Climate Station",
    slug: "hyperborea-station",
    category: "Competitions",
    location: "Svalbard, Norway",
    yearCompleted: "2025",
    client: "International Arctic Research Council",
    siteArea: "6,000 m²",
    gfa: "1,850 m²",
    budget: "$12M USD (Concept)",
    shortDescription:
      "First Prize Winning Competition Entry: An aerodynamic extreme-climate polar station elevated on hydraulic stilts above moving ice permafrost.",
    longDescription:
      "Engineered for sub-zero conditions reaching -50°C and arctic blizzard winds up to 180 km/h, Hyperborea was awarded First Prize in the International Arctic Architecture Competition. The station's teardrop aerodynamic form deflects gale winds downward, preventing snowdrifts from burying entrances. The entire facility rests on 12 computer-controlled hydraulic legs that raise the station automatically as snow levels accumulate.",
    fullCaseStudy: {
      contextAndChallenge:
        "Building in Longyearbyen, Svalbard requires contending with melting permafrost, months of total winter darkness (polar night), and extreme logistics where all building components must be transported via icebreaker cargo vessel.",
      designConcept:
        "An aerodynamic monocoque hull inspired by polar research aircraft and traditional Inuit snow windbreaks. The interior is conceived as a warm, timber-lined capsule prioritizing circadian lighting to support researchers through four months of 24-hour darkness.",
      materialityAndStructure:
        "Triple-insulated aerodynamic carbon-fiber reinforced polymer (CFRP) shell over a titanium-welded space frame, resting on telescopic hydraulic footing cylinders anchored into deep bedrock.",
      environmentalPerformance:
        "Equipped with vertical-axis wind turbines, hydrogen fuel cell backup, and 100% wastewater recycling, the station operates completely off-grid with zero localized emissions.",
    },
    techStack: ["Rhino", "Grasshopper", "CFD Wind Modeling", "Revit", "V-Ray", "Carbon Fiber"],
    coverImage: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=85",
    githubUrl: "https://example.com/bim-sheets",
    liveUrl: "https://example.com/hyperborea-3d",
    featured: false,
    dateStr: "2025-01-15",
    architecture: {
      diagramUrl: "/diagrams/hyperborea-axonometric.svg",
      description:
        "The monocoque teardrop shell creates a high-pressure aerodynamic foil that forces snow particles to blow smoothly underneath the belly rather than accumulating against windows or doorways.",
    },
    drawings: [
      {
        title: "Station Habitation & Laboratory Plan",
        type: "Plan",
        scale: "1:150",
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=80",
        caption: "Radial plan layout grouping sleeping quarters around central social atrium and labs.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=85",
        caption: "Elevated aerodynamic shell glowing amidst Svalbard's polar night landscape.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        caption: "Timber-lined panoramic observation cupola with full-spectrum circadian illumination.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1541888946425-d0fbb18f15f4?auto=format&fit=crop&w=1600&q=85",
        caption: "Detail of the hydraulic stilt telescoping piston and thermal break foundation sleeve.",
        category: "detail",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Permafrost Protection",
        decision: "Elevated station hull (3.5m clearance) on heated hydraulic micro-piles.",
        reason: "Prevents building heat loss from melting the delicate permafrost layer beneath, which would cause catastrophic ground subsidence.",
        tradeoff: "Demanded specialized sub-arctic hydraulic fluids rated to -65°C.",
      },
      {
        topic: "Circadian Health & Well-being",
        decision: "Full-spectrum biodynamic LED lighting programmed to 24-hour solar wavelength curves.",
        reason: "Mitigates Seasonal Affective Disorder (SAD) and hormone disruption for crew during the 110-day polar night.",
        tradeoff: "Required custom microcontroller dimming integration into every living and working module.",
      },
    ],
    metrics: [
      {
        label: "Wind Velocity Rating",
        value: "220 km/h",
        description: "Aerodynamic CFD-modeled hull withstands Category 5 hurricane-force arctic blizzards.",
      },
      {
        label: "Operational Balance",
        value: "100% Off-Grid",
        description: "Powered by dual vertical-axis wind turbines and green hydrogen storage cells.",
      },
      {
        label: "Thermal U-Value",
        value: "0.08 W/m²K",
        description: "Quadruple vacuum-insulated panels provide unparalleled thermal retention.",
      },
      {
        label: "Competition Standing",
        value: "1st Prize",
        description: "Selected out of 240 global architectural studio entries by the Nordic jury.",
      },
    ],
    futureImprovements: [
      "Modular medical emergency isolation annex to be pre-fabricated and air-dropped via cargo helicopter.",
    ],
  },
];
