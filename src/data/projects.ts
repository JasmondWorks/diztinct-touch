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
    title: "The Haven Luxury Contemporary Villa",
    slug: "komorebi-pavilion",
    category: "Residential",
    location: "Lekki Phase 1, Lagos",
    yearCompleted: "2024",
    client: "Private Client",
    siteArea: "1,200 m²",
    gfa: "580 m²",
    budget: "Confidential",
    shortDescription:
      "A contemporary private residence featuring double-height living areas, cantilevered bedroom terraces, and seamless indoor-outdoor courtyard integration.",
    longDescription:
      "Designed by DIZTINCT TOUCH HOME DESIGN under Mayowa's creative leadership, The Haven Villa embodies our founding motto: 'Remarkable design, long lasting.' Located in Lekki Phase 1, the design prioritizes functional family comfort, generous natural cross-ventilation, and high aesthetic presence. From initial 2D space planning to photorealistic 3D visualization and construction oversight, the project seamlessly combines textured exterior walls with deep cantilevered overhangs.",
    fullCaseStudy: {
      contextAndChallenge:
        "The urban plot required maximizing garden privacy and natural daylight while buffering against coastal humidity and intense afternoon sun. The client requested an expansive double-height living area that remained naturally cool without constant heavy air conditioning.",
      designConcept:
        "The building form uses interlocking rectilinear volumes. A primary double-height glass atrium floods the living spaces with morning daylight, while cantilevered upper-floor balconies shield the lower floor glazing from harsh midday sun.",
      materialityAndStructure:
        "Reinforced concrete frame with suspended concrete decking, textured exterior finishes, powder-coated aluminum curtain wall framing, tempered glass balcony railings, and integrated warm perimeter ambient lighting.",
      environmentalPerformance:
        "Strategic cross-ventilation apertures and high-level operable transom windows create a natural stack effect, expelling warm air upward and drawing cooler garden breezes across the ground-floor living pavilion.",
    },
    techStack: [
      "2D Architectural Drawings",
      "Photorealistic 3D Modeling",
      "V-Ray & Lumion",
      "AutoCAD",
      "Revit (BIM)",
      "Concrete Decking",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-building-with-wooden-panels-42790-large.mp4",
    liveUrl: "https://example.com/virtual-tour",
    featured: true,
    featuredRank: 2,
    dateStr: "2024-11-15",
    architecture: {
      diagramUrl: "/projects/komorebi-pavilion/axonometric.svg",
      description:
        "Axonometric massing displaying the central double-height living volume, cantilevered master terrace, and rear courtyard garden orientation.",
    },
    drawings: [
      {
        title: "Ground Floor Living & Dining Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
        caption: "Open-plan main lounge, dining salon, chef's kitchen, and guest suite.",
      },
      {
        title: "First Floor Bedroom Suites Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
        caption: "Private family lounge, master suite with walk-in closet, and secondary en-suite bedrooms.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85",
        caption: "Twilight perspective showing illuminated double-height glazing and cantilevered balcony.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
        caption: "Double-height main living room interior with polished floors and natural daylight.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
        caption: "Upper floor family terrace overlooking landscaped gardens.",
        category: "detail",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85",
        caption: "Master bathroom suite with floor-to-ceiling tiling and modern sanitary ware.",
        category: "interior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Solar Shading & Daylight",
        decision: "Cantilevered upper-floor slab projecting 2.4 meters over ground-floor glass.",
        reason: "Eliminates direct solar glare and radiant heat gain on the main living room while maintaining open daylight views.",
        tradeoff: "Required reinforced cantilever beams tied back into the central structural columns.",
      },
      {
        topic: "Natural Ventilation Strategy",
        decision: "High-level transom clerestory windows across opposing facades.",
        reason: "Promotes stack effect ventilation, keeping the interior fresh and reducing cooling costs.",
        tradeoff: "Required specialized motorized window actuators for high-level openings.",
      },
    ],
    metrics: [
      {
        label: "Gross Floor Area",
        value: "580 m²",
        description: "5 en-suite bedrooms, dual living lounges, and detached staff quarters.",
        changeBadge: "Spacious",
      },
      {
        label: "Design-to-Site Match",
        value: "100%",
        description: "Exact adherence between approved 3D renders and physical construction.",
        changeBadge: "Precision",
      },
      {
        label: "Daylight Autonomy",
        value: "88% sDA",
        description: "Operates throughout daytime hours without artificial illumination.",
        changeBadge: "Energy Smart",
      },
      {
        label: "Construction Decking",
        value: "Grade 30",
        description: "High-tensile suspended reinforced concrete deck slab.",
        changeBadge: "Durable",
      },
    ],
    futureImprovements: [
      "Phase II rooftop terrace pergola and solar photovoltaic micro-inverter installation.",
    ],
  },
  {
    id: "brutalist-residence",
    title: "The Horizon Cantilevered Residence",
    slug: "the-monolith",
    category: "Residential",
    location: "Guzape Hills, Abuja",
    yearCompleted: "2024",
    client: "Private Client",
    siteArea: "1,500 m²",
    gfa: "640 m²",
    budget: "Confidential",
    shortDescription:
      "A hillside contemporary duplex featuring dramatic cantilevered master terraces, suspended concrete decks, and panoramic valley views.",
    longDescription:
      "Commissioned by a private client in Abuja's scenic Guzape Hills, The Horizon Residence was designed by DIZTINCT TOUCH HOME DESIGN under Mayowa's design leadership. Designed around the ethos 'Remarkable design, long lasting', the home takes advantage of the natural terrain slope to create tiered living zones, private courtyards, and deep shaded terraces.",
    fullCaseStudy: {
      contextAndChallenge:
        "The sloped topography required a stepped foundation design that minimized extensive excavation while securing structural stability across rocky terrain. The client sought expansive city views without compromising on family privacy.",
      designConcept:
        "A composition of horizontal cantilevered balconies and vertical masonry towers. The master suite hovers outward toward the horizon, anchored by robust reinforced concrete columns.",
      materialityAndStructure:
        "Cast-in-place reinforced concrete columns and suspended slabs, textured masonry walls, powder-coated dark aluminum window mullions, and high-spec exterior waterproof coatings.",
      environmentalPerformance:
        "Orientation shields the living spaces from harsh northern dust winds, while prevailing southerly breezes are channeled through interior courtyards for natural cooling.",
    },
    techStack: [
      "2D Working Drawings",
      "3D Visualization",
      "AutoCAD",
      "Revit (BIM)",
      "Suspended Concrete Decking",
      "Cantilever Balcony",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-curved-modern-building-facade-42792-large.mp4",
    liveUrl: "https://example.com/monolith-tour",
    featured: true,
    featuredRank: 3,
    dateStr: "2024-09-20",
    architecture: {
      diagramUrl: "/projects/the-monolith/section.svg",
      description:
        "Section showing the stepped hillside foundation, suspended first-floor slab, and cantilevered viewing terrace.",
    },
    drawings: [
      {
        title: "Upper Terrace & Master Suite Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1400&q=80",
        caption: "Master bedroom suite with private cantilevered viewing deck.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
        caption: "Cantilevered upper terrace overlooking the Abuja cityscape.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
        caption: "Courtyard patio with ambient lighting and natural stone paving.",
        category: "interior",
      },
      {
        url: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
        caption: "Spacious contemporary living room with clean geometric detailing.",
        category: "interior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Foundation Stability on Slope",
        decision: "Stepped pad footings anchored into bedrock with reinforced retaining walls.",
        reason: "Ensures permanent structural durability across hillside gradients.",
        tradeoff: "Required rigorous site leveling and staged concrete pours.",
      },
    ],
    metrics: [
      {
        label: "Cantilever Projection",
        value: "3.2 meters",
        description: "Reinforced concrete cantilever extending over lower terrace.",
        changeBadge: "Engineered",
      },
      {
        label: "Gross Floor Area",
        value: "640 m²",
        description: "Multi-level family layout with private cinema and rooftop lounge.",
        changeBadge: "Executive",
      },
    ],
    futureImprovements: [
      "Solar rooftop array and dedicated battery backup inverter integration.",
    ],
  },
  {
    id: "aethelgard-tower",
    title: "The Milestone Commercial Plaza",
    slug: "aethelgard-tower",
    category: "Commercial",
    location: "Victoria Island, Lagos",
    yearCompleted: "2024",
    client: "Corporate Client",
    siteArea: "2,200 m²",
    gfa: "3,800 m²",
    budget: "Confidential",
    shortDescription:
      "A contemporary 4-storey commercial office and retail plaza featuring solar-control architectural louvers, double-height reception, and open floor plates.",
    longDescription:
      "Designed by DIZTINCT TOUCH HOME DESIGN, The Milestone Commercial Plaza provides contemporary Class-A commercial office and retail spaces in Victoria Island. Mayowa and the design team balanced modern corporate aesthetics with climate-responsive facade engineering to ensure long-term energy efficiency and low maintenance.",
    fullCaseStudy: {
      contextAndChallenge:
        "The bustling commercial corridor demanded high visual presence, maximum leasable floor space, and efficient on-site parking circulation.",
      designConcept:
        "A crisp glass and textured composite panel facade equipped with vertical architectural louvers that modulate intense tropical sunlight while maintaining outward visibility.",
      materialityAndStructure:
        "Reinforced concrete structural frame, suspended floor decking, high-performance low-E reflective glazing, and textured cladding.",
      environmentalPerformance:
        "Deep exterior louvers reduce solar thermal gain by 40%, cutting HVAC power demands while providing generous daylighting.",
    },
    techStack: [
      "2D Working Drawings",
      "3D Visualization",
      "Revit (BIM)",
      "AutoCAD",
      "Commercial Space Planning",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-office-building-with-glass-facade-42795-large.mp4",
    liveUrl: "https://example.com/aethelgard-model",
    featured: true,
    featuredRank: 4,
    dateStr: "2024-07-10",
    architecture: {
      diagramUrl: "/projects/aethelgard-tower/axonometric.svg",
      description:
        "Axonometric showing central core elevator circulation, column-free commercial floor plates, and exterior shading louvers.",
    },
    drawings: [
      {
        title: "Typical Commercial Floor Plan",
        type: "Plan",
        scale: "1:150",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1400&q=80",
        caption: "Flexible open-plan layout adaptable for multi-tenant retail or corporate headquarters.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85",
        caption: "Facade showing architectural louvers and curtain-wall glazing.",
        category: "exterior",
      },
      {
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85",
        caption: "Executive corporate reception lobby with natural light.",
        category: "interior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Solar Heat Reduction",
        decision: "Exterior aluminum shading louvers calibrated to sun path.",
        reason: "Drastically lowers air conditioning load and operational expenditure.",
        tradeoff: "Required structural facade outrigger brackets.",
      },
    ],
    metrics: [
      {
        label: "Leasable Floor Area",
        value: "3,800 m²",
        description: "Four floors of premium flexible commercial office space.",
        changeBadge: "High Yield",
      },
      {
        label: "Solar Gain Reduction",
        value: "-40%",
        description: "Achieved via exterior architectural privacy louvers.",
        changeBadge: "Efficient",
      },
    ],
    futureImprovements: [
      "Rooftop executive terrace lounge and meeting pavilion.",
    ],
  },
  {
    id: "foundry-reuse",
    title: "The Apex Mixed-Use Commercial Complex",
    slug: "foundry-04",
    category: "Commercial",
    location: "Ibadan Central, Oyo State",
    yearCompleted: "2023",
    client: "Commercial Development Group",
    siteArea: "3,400 m²",
    gfa: "2,600 m²",
    budget: "Confidential",
    shortDescription:
      "A contemporary commercial plaza integrating retail shopping suites, banking facilities, and executive offices with covered vehicular circulation.",
    longDescription:
      "Commissioned in central Ibadan, The Apex Commercial Complex was created by DIZTINCT TOUCH HOME DESIGN (led by Mayowa) to serve as a modern commercial landmark. The design features durable textured brick finishes, clear storefront glazing, and generous customer parking.",
    fullCaseStudy: {
      contextAndChallenge:
        "The urban commercial intersection required clear pedestrian and vehicular segregation, ample customer parking, and high-visibility tenant signage.",
      designConcept:
        "Clean horizontal canopy lines and rhythmic structural bays that maximize retail street frontage.",
      materialityAndStructure:
        "Reinforced concrete framing, suspended decking slabs, textured clinker brick accents, and powder-coated aluminum shopfronts.",
      environmentalPerformance:
        "Broad canopy overhangs shelter pedestrians from sun and rain while preventing storefront glare.",
    },
    techStack: [
      "2D Working Drawings",
      "3D Modeling & Visualization",
      "AutoCAD",
      "Revit",
      "Commercial Master Planning",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85",
    demoVideo: "https://assets.mixkit.co/videos/preview/mixkit-modern-museum-interior-with-abstract-art-42797-large.mp4",
    liveUrl: "https://example.com/foundry-virtual",
    featured: true,
    featuredRank: 5,
    dateStr: "2023-10-18",
    architecture: {
      diagramUrl: "/projects/foundry-04/axonometric.svg",
      description:
        "Circulation diagram displaying perimeter vehicle access, central pedestrian galleria, and multi-tenant layout.",
    },
    drawings: [
      {
        title: "Ground Floor Retail & Banking Plan",
        type: "Plan",
        scale: "1:200",
        url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1400&q=80",
        caption: "Ground floor retail spaces and central customer arcade.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1600&q=85",
        caption: "Street elevation with textured brickwork and canopy shelter.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Durable Public Facades",
        decision: "Textured brick accents combined with weather-resistant exterior stucco.",
        reason: "Resists urban weathering and eliminates frequent repainting cycles.",
        tradeoff: "Slightly higher initial material procurement cost.",
      },
    ],
    metrics: [
      {
        label: "Commercial Footprint",
        value: "2,600 m²",
        description: "Retail stores, executive office suites, and banking hall.",
        changeBadge: "Turnkey",
      },
    ],
    futureImprovements: [
      "Phase II solar carport installation.",
    ],
  },
  {
    id: "terracielo-masterplan",
    title: "The Emerald Terraces Residential Estate",
    slug: "terracielo-masterplan",
    category: "Residential",
    location: "Epe Corridor, Lagos",
    yearCompleted: "2023",
    client: "Real Estate Development Partner",
    siteArea: "12,000 m²",
    gfa: "6,400 m²",
    budget: "Confidential",
    shortDescription:
      "A masterplanned community of contemporary 4-bedroom terrace duplexes with central landscaped courtyard, perimeter security, and sustainable drainage.",
    longDescription:
      "The Emerald Terraces is a masterplanned gated residential community designed by DIZTINCT TOUCH HOME DESIGN, led by Mayowa. Guided by our ethos 'Remarkable design, long lasting', the masterplan balances density with generous communal green spaces, paved private access, and harmonious contemporary building envelopes.",
    fullCaseStudy: {
      contextAndChallenge:
        "The project required creating a cohesive community of multi-unit family residences while providing each homeowner with private vehicular parking and a secluded rear garden terrace.",
      designConcept:
        "Modular contemporary duplex blocks arranged around a central green boulevard, with private carports and cantilevered upper balconies.",
      materialityAndStructure:
        "Reinforced concrete column-and-beam frame, suspended concrete decking, contemporary brick accents, and paved interlocking driveways.",
      environmentalPerformance:
        "Porous paving and bioswale drainage channels prevent seasonal flooding and support natural ground aquifer recharge.",
    },
    techStack: [
      "2D Architectural Drawings",
      "3D Masterplan Modeling",
      "AutoCAD",
      "Revit (BIM)",
      "Site Drainage Planning",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    liveUrl: "https://example.com/terracielo-gis",
    featured: false,
    dateStr: "2023-06-15",
    architecture: {
      diagramUrl: "/diagrams/terracielo-masterplan.svg",
      description:
        "Masterplan layout showing road circulation, unit clustering, and central recreational park.",
    },
    drawings: [
      {
        title: "Masterplan Circulation & Layout",
        type: "Plan",
        scale: "1:500",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
        caption: "Gated estate layout showing 24 luxury terrace duplexes.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
        caption: "Terrace duplex units with clean lines and contemporary balconies.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Stormwater Management",
        decision: "Interconnected underground drainage culverts with surface retention basins.",
        reason: "Guarantees dry driveways during heavy seasonal tropical downpours.",
        tradeoff: "Required precise civil grading coordination.",
      },
    ],
    metrics: [
      {
        label: "Residential Units",
        value: "24 Duplexes",
        description: "Contemporary 4-bedroom luxury terrace residences.",
        changeBadge: "Masterplanned",
      },
    ],
    futureImprovements: [
      "Community sports pavilion and solar streetlight expansion.",
    ],
  },
  {
    id: "hyperborea-station",
    title: "The Minimalist Courtyard Residence",
    slug: "hyperborea-station",
    category: "Residential",
    location: "Bodija, Ibadan",
    yearCompleted: "2023",
    client: "Private Client",
    siteArea: "900 m²",
    gfa: "340 m²",
    budget: "Confidential",
    shortDescription:
      "A contemporary executive 4-bedroom bungalow centered around a private open-air courtyard with cross-ventilation and warm perimeter lighting.",
    longDescription:
      "Designed by DIZTINCT TOUCH HOME DESIGN under Mayowa's creative direction, this contemporary executive bungalow demonstrates how single-level living can achieve architectural distinction. Centered around a private landscaped courtyard, the home balances seamless family gathering with tranquil private retreats.",
    fullCaseStudy: {
      contextAndChallenge:
        "The client desired a single-level home without stairs, maximizing accessibility while ensuring modern aesthetic lines, natural daylight in every room, and secure perimeter containment.",
      designConcept:
        "The rooms encircle a central open-air internal courtyard. Large sliding glass doors connect living areas directly to the courtyard, creating a calm private oasis.",
      materialityAndStructure:
        "Reinforced concrete strip foundation, hollow block masonry, textured facade rendering, parapet roofing concealing long-span aluminum sheets, and warm LED architectural perimeter lighting.",
      environmentalPerformance:
        "The courtyard functions as a natural cooling lung, continuously drawing ambient breezes across the bedrooms and main lounge.",
    },
    techStack: [
      "2D Working Drawings",
      "3D Visualization",
      "AutoCAD",
      "Courtyard Design",
      "Parapet Roofing",
      "Construction Oversight",
    ],
    coverImage: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=85",
    liveUrl: "https://example.com/hyperborea-3d",
    featured: false,
    dateStr: "2023-03-20",
    architecture: {
      diagramUrl: "/diagrams/hyperborea-axonometric.svg",
      description:
        "Courtyard circulation showing inward-facing rooms and cross-ventilation corridors.",
    },
    drawings: [
      {
        title: "Executive Bungalow Courtyard Plan",
        type: "Plan",
        scale: "1:100",
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1400&q=80",
        caption: "4 en-suite bedrooms, open living/dining, and central landscaped courtyard.",
      },
    ],
    gallery: [
      {
        url: "https://images.unsplash.com/photo-1517824806704-9040b037703b?auto=format&fit=crop&w=1600&q=85",
        caption: "Exterior facade featuring warm evening lighting and clean parapet lines.",
        category: "exterior",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Parapet Concealed Roofing",
        decision: "High-grade structural parapet walls concealing deep-profile aluminum roofing sheets.",
        reason: "Delivers a sleek modern geometric profile while ensuring complete leak-free rain shedding.",
        tradeoff: "Requires oversized internal box gutters with dual overflow spouts.",
      },
    ],
    metrics: [
      {
        label: "Floor Area",
        value: "340 m²",
        description: "4 en-suite bedrooms, private study, and central courtyard.",
        changeBadge: "Single-Level",
      },
      {
        label: "Cross-Ventilation",
        value: "100%",
        description: "All bedrooms enjoy dual-aspect natural airflow.",
        changeBadge: "Cool Living",
      },
    ],
    futureImprovements: [
      "Courtyard reflection pool and vertical herb garden installation.",
    ],
  },
];
