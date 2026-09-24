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
    status: "in-progress",
    currentStage: "First Floor Level (Ongoing)",
    buildingType: "Contemporary Residential Duplex",
    bedroomCount: "5 En-suite Bedrooms",
    projectCode: "DT-ARM-01",
    isPublished: true,
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
    ],
    gallery: [
      {
        url: "/projects/armity-duplex/cover.jpg",
        caption: "Approved 3D architectural visualization: Contemporary duplex design featuring double-height glazed atrium tower, cantilevered upper balcony, and ambient lighting.",
        category: "exterior",
      },
      {
        url: "/projects/armity-duplex/foundation-trench-masonry.jpg",
        caption: "Substructure setting-out: Foundation trench blockwork up to DPC level with column starter cages and integrated plumbing conduits.",
        category: "construction",
      },
      {
        url: "/projects/armity-duplex/dpm-membrane-installation.jpg",
        caption: "Substructure moisture barrier: Laying heavy-duty DPM (Damp Proof Membrane) across compacted hardcore before slab casting.",
        category: "construction",
      },
      {
        url: "/projects/armity-duplex/cast-foundation-slab.jpg",
        caption: "Cast German floor milestone: Successfully completed reinforced concrete ground slab with vertical column reinforcement.",
        category: "construction",
      },
      {
        url: "/projects/armity-duplex/perimeter-level-inspection.jpg",
        caption: "Precision setting-out: On-site verification of perimeter foundation wall levels using precision spirit level rules.",
        category: "construction",
      },
      {
        url: "/projects/armity-duplex/site-blueprint-supervision.jpg",
        caption: "Architectural oversight: Design lead Mayowa reviewing 2D working drawings and structural schedules on site with masons.",
        category: "construction",
      },
      {
        url: "/projects/armity-duplex/ground-floor-wall-masonry.jpg",
        caption: "Superstructure progression: Ground-floor perimeter wall masonry and double-height atrium window apertures.",
        category: "construction",
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
    id: "contemporary-duplex",
    title: "The Horizon Contemporary Duplex",
    slug: "contemporary-duplex",
    category: "Residential",
    location: "Ibadan, Oyo State, Nigeria",
    yearCompleted: "2024 (Completed)",
    client: "Private Commission",
    siteArea: "600 m²",
    gfa: "420 m²",
    budget: "Confidential",
    shortDescription:
      "A completed two-storey contemporary duplex featuring double-height atrium living, helical marble staircase, cantilevered wood-clad upper volumes, and stamped concrete compound.",
    longDescription:
      "Designed and delivered by DIZTINCT TOUCH HOME DESIGN under our core ethos of 'Remarkable design, long lasting', this contemporary residential duplex demonstrates our seamless transition from 3D architectural visualization to meticulous site execution. From structural column reinforcement and double-height lintel casting to the finished helical marble staircase and custom wood-textured parapet facade, every tectonic element reflects architectural precision and long-lasting durability.",
    fullCaseStudy: {
      contextAndChallenge:
        "Situated on an elevated site overlooking Ibadan, the architectural program called for an imposing two-storey residence balancing security, expansive family entertainment zones, and private bedroom sanctuaries. The site topography required careful retaining and setting out to ensure seamless drainage and stamped concrete vehicular circulation.",
      designConcept:
        "The exterior form is characterized by modern rectilinear geometry, accented by deep horizontal eaves, wood-textured cornice fascias, and contrasting textured stone tile masonry. The dramatic entrance porch is flanked by an architectural pillar and upper viewing balcony, while the perimeter wall integrates decorative inserts and razor security wire.",
      materialityAndStructure:
        "Engineered with cast-in-place reinforced concrete columns, beams, and suspended first-floor slab. High-performance blue tinted solar glass reduces tropical heat gain, while the double-height atrium features a bespoke helical reinforced concrete staircase clad in polished marble with brushed stainless steel railings.",
      environmentalPerformance:
        "Deep overhangs shield window openings from direct solar glare, while the double-height central atrium acts as a thermal chimney, drawing warm air up and inducing cross-ventilation through high-level clerestory vents.",
    },
    techStack: [
      "2D Architectural Drawings",
      "3D Visualization",
      "Reinforced Concrete Frame",
      "Helical Staircase",
      "Stamped Concrete",
      "Textured Cladding",
      "AutoCAD",
      "Revit (BIM)",
    ],
    coverImage: "/projects/duplex/cover.jpg",
    featured: true,
    featuredRank: 2,
    dateStr: "2024-11-15",
    status: "completed",
    currentStage: "Completed & Handed Over",
    buildingType: "Contemporary Residential Duplex",
    bedroomCount: "5 En-suite Bedrooms",
    projectCode: "DT-DPX-02",
    isPublished: true,
    gallery: [
      {
        url: "/projects/duplex/cover.jpg",
        caption: "Completed front facade elevation: Two-storey contemporary duplex featuring wood-textured cornice, blue tinted solar windows, stone accent cladding, and perimeter security gate.",
        category: "exterior",
      },
      {
        url: "/projects/duplex/3d-concept-visualization.jpg",
        caption: "Approved 3D architectural concept visualization: DIZTINCT TOUCH HOME DESIGN original 3D render showing proposed cantilevered volumes and landscape integration.",
        category: "exterior",
      },
      {
        url: "/projects/duplex/completed-street-elevation.jpg",
        caption: "Completed street elevation: Perimeter boundary wall with decorative inserts, razor security wire, and upper floor cantilever volume.",
        category: "exterior",
      },
      {
        url: "/projects/duplex/completed-entrance-porch.jpg",
        caption: "Entrance porch detailing: Polished granite floor, feature column, stone masonry accent wall, upper balcony, and stamped concrete forecourt.",
        category: "exterior",
      },
      {
        url: "/projects/duplex/completed-atrium-living-room.jpg",
        caption: "Double-height atrium living room: Sweeping helical marble staircase with stainless steel balustrade, polished floor tiles, modern halo chandelier, and bar counter.",
        category: "interior",
      },
      {
        url: "/projects/duplex/completed-compound-driveway.jpg",
        caption: "Compound and side driveway: Stamped concrete paving, exterior perimeter lighting, and clean drainage fall.",
        category: "exterior",
      },
      {
        url: "/projects/duplex/ground-floor-deck-formwork.jpg",
        caption: "Substructure to decking milestone: Completed ground-floor blockwork, concrete columns, and bamboo formwork propping for first floor suspended slab.",
        category: "construction",
      },
      {
        url: "/projects/duplex/first-floor-cantilever-masonry.jpg",
        caption: "Superstructure progression: Cast first floor cantilever slab with masons setting out upper floor perimeter walls.",
        category: "construction",
      },
      {
        url: "/projects/duplex/structural-rebar-supervision.jpg",
        caption: "Quality control oversight: Design lead Mayowa supervising ironworkers during column reinforcement rebar and stirrups tie-in.",
        category: "construction",
      },
      {
        url: "/projects/duplex/staircase-reinforcement-formwork.jpg",
        caption: "Internal staircase engineering: Structural rebar reinforcement and timber carpentry for the curved central staircase prior to casting.",
        category: "construction",
      },
      {
        url: "/projects/duplex/atrium-lintel-casting.jpg",
        caption: "Double-height atrium execution: Scaffolding erected in the stairwell void for beam reinforcement and upper lintel casting.",
        category: "construction",
      },
      {
        url: "/projects/duplex/roof-timber-truss-framing.jpg",
        caption: "Rooftop carpentry: Hardwood timber roof truss network installation across upper level with panoramic city view.",
        category: "construction",
      },
    ],
    engineeringDecisions: [
      {
        topic: "Helical Staircase Reinforcement",
        decision: "Cast-in-place curved reinforced concrete flight with continuous steel cage",
        reason: "Provided structural rigidity for the double-height open atrium without requiring intrusive under-stair support columns, maximizing free floor area.",
      },
      {
        topic: "Solar Glazing Performance",
        decision: "Blue-tinted UV-reflective architectural safety glass",
        reason: "Mitigates tropical solar heat gain while preserving external visibility and elevating contemporary exterior aesthetic.",
      },
      {
        topic: "Compound Hardscaping & Drainage",
        decision: "Monolithic stamped concrete with sealed polyurethane topcoat",
        reason: "Delivers durable, weed-resistant, all-weather vehicular paving with precise falls directing stormwater away from building foundations.",
      },
    ],
    metrics: [
      {
        label: "Design-to-Build Accuracy",
        value: "100%",
        description: "Full realization of approved 3D architectural concept into finished physical structure.",
      },
      {
        label: "Atrium Ceiling Height",
        value: "6.2 m",
        description: "Double-height living room volume inducing passive stack ventilation.",
      },
      {
        label: "Gross Internal Area",
        value: "420 m²",
        description: "Optimized spatial efficiency across ground floor living and first floor suites.",
      },
    ],
    futureImprovements: [
      "Completed & handed over to client.",
    ],
  },
];
