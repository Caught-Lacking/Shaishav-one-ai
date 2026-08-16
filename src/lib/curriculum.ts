// ============================================================================
// Shaishav One AI — NCERT curriculum data (Class 11 & 12) for NEET & JEE
// Covers every NCERT chapter + core topics with mapped PYQ counts.
// ============================================================================

export type StreamId = "neet" | "jee";
export type ClassLevel = 11 | 12;

export interface Topic {
  id: string;
  name: string;
  /** Number of NEET/JEE PYQs mapped to this topic in the Shaishav bank. */
  pyq: number;
}

export interface Chapter {
  id: string;
  name: string;
  class: ClassLevel;
  topics: Topic[];
}

export interface SubjectPalette {
  /** tailwind chip classes */
  chip: string;
  /** solid accent bg */
  solid: string;
  /** text accent */
  text: string;
  /** soft gradient */
  gradient: string;
  /** hex for inline accents */
  hex: string;
}

export interface SubjectDef {
  id: string;
  name: string;
  short: string;
  icon: string; // lucide icon name (not imported here)
  palette: SubjectPalette;
  chapters: Chapter[];
}

export interface StreamDef {
  id: StreamId;
  name: string;
  short: string;
  tagline: string;
  description: string;
  exam: string;
  subjects: string[]; // subject ids in display order
  palette: {
    gradient: string;
    solid: string;
    text: string;
    chip: string;
    soft: string;
    hex: string;
  };
}

type RawChapter = [name: string, cls: ClassLevel, topics: [string, number][]];

function buildSubject(
  id: string,
  name: string,
  short: string,
  icon: string,
  palette: SubjectPalette,
  rawChapters: RawChapter[],
): SubjectDef {
  return {
    id,
    name,
    short,
    icon,
    palette,
    chapters: rawChapters.map(([name, cls, topics], ci) => ({
      id: `${id}-c${ci + 1}`,
      name,
      class: cls,
      topics: topics.map(([tname, pyq], ti) => ({
        id: `${id}-c${ci + 1}-t${ti + 1}`,
        name: tname,
        pyq,
      })),
    })),
  };
}

// ---------------------------------------------------------------------------
// Subjects
// ---------------------------------------------------------------------------

const physics = buildSubject(
  "physics",
  "Physics",
  "Phy",
  "Atom",
  {
    chip: "bg-indigo-100 text-indigo-700",
    solid: "bg-indigo-500",
    text: "text-indigo-600",
    gradient: "from-indigo-500 to-violet-500",
    hex: "#6366f1",
  },
  [
    ["Units and Measurements", 11, [
      ["Units & the SI system", 3],
      ["Dimensions & dimensional analysis", 4],
      ["Errors in measurement", 2],
      ["Significant figures", 2],
      ["Vernier callipers & screw gauge", 1],
    ]],
    ["Motion in a Straight Line", 11, [
      ["Position, distance & displacement", 3],
      ["Speed, velocity & acceleration", 4],
      ["Kinematic equations", 6],
      ["Graphs of motion", 4],
      ["Relative motion", 2],
    ]],
    ["Motion in a Plane", 11, [
      ["Vectors & scalars", 3],
      ["Vector addition & subtraction", 4],
      ["Projectile motion", 6],
      ["Uniform circular motion", 4],
      ["Relative velocity in 2-D", 2],
    ]],
    ["Laws of Motion", 11, [
      ["Newton's laws of motion", 6],
      ["Momentum & impulse", 3],
      ["Friction", 5],
      ["Dynamics of circular motion", 3],
      ["Rocket propulsion & constrained motion", 2],
    ]],
    ["Work, Energy and Power", 11, [
      ["Work done by a force", 3],
      ["Kinetic & potential energy", 4],
      ["Work-energy theorem", 4],
      ["Conservation of mechanical energy", 5],
      ["Power & collisions", 4],
    ]],
    ["System of Particles and Rotational Motion", 11, [
      ["Centre of mass", 4],
      ["Torque & angular momentum", 5],
      ["Moment of inertia & radius of gyration", 5],
      ["Rotational kinematics & dynamics", 4],
      ["Rolling motion", 3],
    ]],
    ["Gravitation", 11, [
      ["Universal law of gravitation", 4],
      ["Acceleration due to gravity & its variation", 4],
      ["Gravitational potential & energy", 3],
      ["Satellites & escape velocity", 5],
      ["Kepler's laws", 3],
    ]],
    ["Mechanical Properties of Solids", 11, [
      ["Stress & strain", 3],
      ["Hooke's law & stress-strain curve", 3],
      ["Young's modulus", 3],
      ["Shear & bulk modulus", 2],
      ["Elastic potential energy", 1],
    ]],
    ["Mechanical Properties of Fluids", 11, [
      ["Pressure & Pascal's law", 3],
      ["Buoyancy & Archimedes' principle", 3],
      ["Viscosity & Stokes' law", 3],
      ["Bernoulli's theorem & applications", 4],
      ["Surface tension", 2],
    ]],
    ["Thermal Properties of Matter", 11, [
      ["Temperature & heat", 2],
      ["Thermal expansion", 3],
      ["Calorimetry & phase change", 3],
      ["Heat transfer (conduction, convection, radiation)", 4],
      ["Newton's law of cooling", 2],
    ]],
    ["Thermodynamics", 11, [
      ["First law of thermodynamics", 4],
      ["Second law & entropy", 2],
      ["Isothermal & adiabatic processes", 4],
      ["Cyclic processes & PV diagrams", 3],
      ["Heat engines & Carnot cycle", 3],
    ]],
    ["Kinetic Theory", 11, [
      ["Ideal gas equation", 3],
      ["Kinetic interpretation of temperature", 3],
      ["Degrees of freedom & equipartition", 2],
      ["Mean free path", 1],
      ["Maxwell distribution", 1],
    ]],
    ["Oscillations", 11, [
      ["Simple harmonic motion", 5],
      ["Energy in SHM", 3],
      ["Simple pendulum", 3],
      ["Spring-mass systems", 3],
      ["Damped & forced oscillations, resonance", 2],
    ]],
    ["Waves", 11, [
      ["Wave equation & parameters", 3],
      ["Superposition of waves", 3],
      ["Standing waves on strings", 4],
      ["Beats", 2],
      ["Doppler effect", 3],
    ]],
    ["Electric Charges and Fields", 12, [
      ["Charge & Coulomb's law", 5],
      ["Electric field & superposition", 6],
      ["Field lines & flux", 3],
      ["Electric dipole", 4],
      ["Gauss's law & applications", 6],
    ]],
    ["Electrostatic Potential and Capacitance", 12, [
      ["Potential & potential energy", 5],
      ["Equipotential surfaces", 2],
      ["Capacitors & capacitance", 5],
      ["Dielectrics & polarisation", 3],
      ["Energy stored & combinations", 4],
    ]],
    ["Current Electricity", 12, [
      ["Ohm's law & drift velocity", 4],
      ["Resistivity & conductivity", 3],
      ["Series & parallel combinations", 5],
      ["Kirchhoff's laws", 5],
      ["Wheatstone bridge & metrebridge", 4],
    ]],
    ["Moving Charges and Magnetism", 12, [
      ["Lorentz force & motion in magnetic field", 5],
      ["Biot-Savart law", 4],
      ["Ampere's circuital law & solenoid", 4],
      ["Force between parallel currents", 3],
      ["Galvanometer & cyclotron", 4],
    ]],
    ["Magnetism and Matter", 12, [
      ["Bar magnet & magnetic dipoles", 3],
      ["Magnetic field lines & torques", 2],
      ["Earth's magnetism", 2],
      ["Para, dia & ferromagnetism", 3],
    ]],
    ["Electromagnetic Induction", 12, [
      ["Faraday's law & Lenz's law", 5],
      ["Motional EMF", 4],
      ["Self & mutual inductance", 4],
      ["Eddy currents", 2],
      ["AC generator", 2],
    ]],
    ["Alternating Current", 12, [
      ["AC basics & RMS values", 4],
      ["LCR series circuits", 5],
      ["Resonance & Q factor", 4],
      ["Power in AC circuits", 3],
      ["Transformers", 3],
    ]],
    ["Electromagnetic Waves", 12, [
      ["EM wave properties", 3],
      ["Electromagnetic spectrum", 3],
      ["Applications of EM waves", 1],
    ]],
    ["Ray Optics and Optical Instruments", 12, [
      ["Reflection & spherical mirrors", 4],
      ["Refraction & lenses", 5],
      ["Total internal reflection", 3],
      ["Prism & dispersion", 4],
      ["Optical instruments", 3],
    ]],
    ["Wave Optics", 12, [
      ["Huygens principle", 3],
      ["Interference & YDSE", 6],
      ["Diffraction", 3],
      ["Polarisation", 3],
      ["Coherent sources", 2],
    ]],
    ["Dual Nature of Radiation and Matter", 12, [
      ["Photoelectric effect", 6],
      ["de Broglie wavelength", 4],
      ["Matter waves & Davisson-Germer", 2],
    ]],
    ["Atoms", 12, [
      ["Rutherford's model", 2],
      ["Bohr model & energy levels", 6],
      ["Hydrogen spectrum", 4],
      ["Line spectra & series", 3],
    ]],
    ["Nuclei", 12, [
      ["Nuclear composition & size", 3],
      ["Radioactivity & decay laws", 5],
      ["Nuclear fission & fusion", 3],
      ["Mass-energy equivalence", 3],
    ]],
    ["Semiconductor Electronics", 12, [
      ["p-n junction diode", 4],
      ["Rectifiers & filters", 3],
      ["Transistors & amplifiers", 4],
      ["Logic gates", 3],
      ["Optoelectronic devices (LED, photodiode, solar cell)", 2],
    ]],
  ],
);

const chemistry = buildSubject(
  "chemistry",
  "Chemistry",
  "Chem",
  "FlaskConical",
  {
    chip: "bg-emerald-100 text-emerald-700",
    solid: "bg-emerald-500",
    text: "text-emerald-600",
    gradient: "from-emerald-500 to-teal-500",
    hex: "#10b981",
  },
  [
    ["Some Basic Concepts of Chemistry", 11, [
      ["Mole concept & molar mass", 6],
      ["Stoichiometry & limiting reagent", 5],
      ["Percentage composition & formulas", 3],
      ["Concentration terms", 3],
      ["Laws of chemical combination", 2],
    ]],
    ["Structure of Atom", 11, [
      ["Subatomic particles & atomic models", 3],
      ["Bohr model & spectra", 4],
      ["Quantum numbers", 4],
      ["Orbitals & Aufbau principle", 4],
      ["Electronic configuration & Hund's rule", 4],
    ]],
    ["Classification of Elements and Periodicity", 11, [
      ["Periodic table & blocks", 3],
      ["Periodic trends in size", 4],
      ["Ionisation enthalpy", 4],
      ["Electron gain enthalpy & electronegativity", 3],
      ["Anomalous properties", 2],
    ]],
    ["Chemical Bonding and Molecular Structure", 11, [
      ["Ionic & covalent bonding", 4],
      ["Lewis structures & octet rule", 4],
      ["VSEPR theory & shapes", 5],
      ["Hybridisation", 5],
      ["Molecular orbital theory", 4],
      ["Hydrogen bonding", 2],
    ]],
    ["Thermodynamics", 11, [
      ["System, surroundings & processes", 2],
      ["First law & internal energy", 4],
      ["Enthalpy & Hess's law", 4],
      ["Bond energies & lattice enthalpy", 3],
      ["Spontaneity & Gibbs energy", 3],
    ]],
    ["Equilibrium", 11, [
      ["Dynamic equilibrium & law of mass action", 3],
      ["Kp & Kc relations", 4],
      ["Le Chatelier's principle", 5],
      ["Ionic equilibrium & pH", 5],
      ["Buffer solutions & solubility product", 4],
    ]],
    ["Redox Reactions", 11, [
      ["Oxidation number", 4],
      ["Redox reactions & balancing", 5],
      ["Types of redox reactions", 2],
      ["Applications in electrochemistry", 2],
    ]],
    ["Organic Chemistry: Basic Principles and Techniques", 11, [
      ["IUPAC nomenclature", 5],
      ["Structural & stereoisomerism", 4],
      ["Inductive, resonance & hyperconjugation effects", 5],
      ["Reaction intermediates & mechanisms", 4],
      ["Purification & analysis of compounds", 3],
    ]],
    ["Hydrocarbons", 11, [
      ["Alkanes: preparation & properties", 4],
      ["Alkenes: addition reactions", 5],
      ["Alkynes", 3],
      ["Benzene & aromaticity", 4],
      ["Directive effects & Hückel rule", 3],
    ]],
    ["Solutions", 12, [
      ["Concentration terms", 4],
      ["Vapour pressure & Raoult's law", 4],
      ["Colligative properties", 5],
      ["Osmosis & osmotic pressure", 3],
      ["Abnormal molar masses & van't Hoff factor", 3],
    ]],
    ["Electrochemistry", 12, [
      ["Conductance & conductivity", 4],
      ["Electrolytic cells & electrolysis", 3],
      ["Electrode potentials & EMF", 5],
      ["Nernst equation", 4],
      ["Batteries, fuel cells & corrosion", 3],
    ]],
    ["Chemical Kinetics", 12, [
      ["Rate of reaction & factors", 4],
      ["Order & molecularity", 4],
      ["Integrated rate laws & half-life", 5],
      ["Arrhenius equation & activation energy", 4],
      ["Catalysis", 2],
    ]],
    ["The d- and f-Block Elements", 12, [
      ["d-block properties & trends", 4],
      ["Transition metal compounds", 3],
      ["f-block: lanthanoids & actinoids", 3],
      ["Applications of d & f block", 2],
    ]],
    ["Coordination Compounds", 12, [
      ["Werner's theory", 3],
      ["Nomenclature of coordination compounds", 4],
      ["Isomerism", 4],
      ["VBT & CFT", 5],
      ["Stability & applications", 3],
    ]],
    ["Haloalkanes and Haloarenes", 12, [
      ["Nomenclature & classification", 2],
      ["SN1 & SN2 mechanisms", 5],
      ["Elimination reactions", 3],
      ["Grignard reagents", 3],
      ["Haloarenes & environmental effects", 3],
    ]],
    ["Alcohols, Phenols and Ethers", 12, [
      ["Preparation of alcohols", 4],
      ["Reactions of alcohols", 4],
      ["Phenols: acidity & reactions", 5],
      ["Ethers: preparation & properties", 3],
      ["Distinction tests", 2],
    ]],
    ["Aldehydes, Ketones and Carboxylic Acids", 12, [
      ["Preparation of carbonyls", 4],
      ["Nucleophilic addition reactions", 5],
      ["Oxidation & reduction", 4],
      ["Aldol & Cannizzaro reactions", 4],
      ["Carboxylic acids: preparation & properties", 4],
    ]],
    ["Amines", 12, [
      ["Classification & nomenclature", 2],
      ["Preparation of amines", 4],
      ["Basicity of amines", 4],
      ["Diazonium salts", 3],
      ["Separation of amines", 2],
    ]],
    ["Biomolecules", 12, [
      ["Carbohydrates", 4],
      ["Proteins & amino acids", 4],
      ["Enzymes", 2],
      ["Vitamins & nucleic acids", 3],
      ["Lipids & hormones", 2],
    ]],
  ],
);

const biology = buildSubject(
  "biology",
  "Biology",
  "Bio",
  "Dna",
  {
    chip: "bg-rose-100 text-rose-700",
    solid: "bg-rose-500",
    text: "text-rose-600",
    gradient: "from-rose-500 to-pink-500",
    hex: "#f43f5e",
  },
  [
    ["The Living World", 11, [
      ["Diversity in the living world", 2],
      ["Taxonomy & systematics", 3],
      ["Nomenclature & identification", 3],
      ["Taxonomic aids", 2],
    ]],
    ["Biological Classification", 11, [
      ["Five kingdom classification", 4],
      ["Monera & Protista", 3],
      ["Fungi", 3],
      ["Viruses, viroids & lichens", 2],
      ["Archaea & extremophiles", 1],
    ]],
    ["Plant Kingdom", 11, [
      ["Algae & its classes", 4],
      ["Bryophytes", 3],
      ["Pteridophytes", 3],
      ["Gymnosperms", 3],
      ["Angiosperms & plant life cycles", 3],
    ]],
    ["Animal Kingdom", 11, [
      ["Basis of classification", 3],
      ["Porifera to Echinodermata", 4],
      ["Chordata & vertebrates", 4],
      ["Animal phyla features & examples", 4],
    ]],
    ["Morphology of Flowering Plants", 11, [
      ["Root, stem & leaf morphology", 4],
      ["Inflorescence & flower", 4],
      ["Fruit & seed", 3],
      ["Semi-technical descriptions", 2],
      ["Plant families (Fabaceae, Solanaceae, Liliaceae)", 4],
    ]],
    ["Anatomy of Flowering Plants", 11, [
      ["Meristematic & permanent tissues", 4],
      ["Tissue systems", 3],
      ["Monocot vs dicot anatomy", 4],
      ["Secondary growth", 3],
    ]],
    ["Structural Organisation in Animals", 11, [
      ["Animal tissues (epithelial, connective, muscular, neural)", 4],
      ["Earthworm", 3],
      ["Cockroach", 3],
      ["Frog morphology & anatomy", 3],
    ]],
    ["Cell: The Unit of Life", 11, [
      ["Cell theory & overview", 2],
      ["Cell membrane & transport", 4],
      ["Cell organelles", 5],
      ["Nucleus & chromosomes", 3],
      ["Prokaryotic vs eukaryotic cells", 2],
    ]],
    ["Biomolecules", 11, [
      ["Biomacromolecules", 4],
      ["Proteins & enzymes", 4],
      ["Carbohydrates & lipids", 4],
      ["Nucleic acids", 3],
      ["Metabolism & metabolic pathways", 2],
    ]],
    ["Cell Cycle and Cell Division", 11, [
      ["Cell cycle phases", 4],
      ["Mitosis", 4],
      ["Meiosis", 5],
      ["Significance of division", 2],
    ]],
    ["Photosynthesis in Higher Plants", 11, [
      ["Photosynthetic pigments & light reaction", 4],
      ["Calvin cycle (C3)", 4],
      ["C4 pathway & CAM", 4],
      ["Photorespiration", 3],
      ["Factors affecting photosynthesis", 3],
    ]],
    ["Respiration in Plants", 11, [
      ["Glycolysis", 4],
      ["Krebs cycle", 4],
      ["Electron transport & oxidative phosphorylation", 4],
      ["Aerobic vs anaerobic respiration", 3],
      ["Respiratory quotient", 2],
    ]],
    ["Plant Growth and Development", 11, [
      ["Growth phases & rates", 3],
      ["Plant hormones (auxin, GA, cytokinin, ABA, ethylene)", 5],
      ["Photoperiodism", 3],
      ["Vernalisation", 2],
    ]],
    ["Breathing and Exchange of Gases", 11, [
      ["Respiratory organs", 3],
      ["Mechanism of breathing", 4],
      ["Transport of gases", 4],
      ["Regulation of respiration", 2],
      ["Respiratory disorders", 2],
    ]],
    ["Body Fluids and Circulation", 11, [
      ["Blood & plasma", 4],
      ["Blood groups & coagulation", 3],
      ["Lymph & lymphatic system", 2],
      ["Heart & cardiac cycle", 5],
      ["ECG & circulatory disorders", 2],
    ]],
    ["Excretory Products and their Elimination", 11, [
      ["Excretory organs", 2],
      ["Nephron & urine formation", 5],
      ["Countercurrent mechanism", 3],
      ["Regulation of kidney function", 3],
      ["Disorders of excretory system", 2],
    ]],
    ["Locomotion and Movement", 11, [
      ["Types of movement & muscles", 3],
      ["Skeletal muscle contraction (sliding filament)", 5],
      ["Human skeleton", 3],
      ["Joints & disorders", 2],
    ]],
    ["Neural Control and Coordination", 11, [
      ["Neurons & nerve impulse", 5],
      ["Synaptic transmission", 4],
      ["Central & peripheral nervous system", 3],
      ["Reflex action & sense organs", 3],
    ]],
    ["Chemical Coordination and Integration", 11, [
      ["Endocrine glands & hormones", 5],
      ["Hormone mechanism of action", 3],
      ["Hypo & hypersecretion disorders", 3],
      ["Hormones of the heart, kidney & GI tract", 2],
    ]],
    ["Sexual Reproduction in Flowering Plants", 12, [
      ["Flower structure & gametophytes", 3],
      ["Pollination & agents", 4],
      ["Double fertilisation", 4],
      ["Embryo, endosperm & seed", 3],
      ["Apomixis & polyembryony", 2],
    ]],
    ["Human Reproduction", 12, [
      ["Male & female reproductive systems", 4],
      ["Gametogenesis", 4],
      ["Menstrual cycle", 4],
      ["Fertilisation & implantation", 3],
      ["Pregnancy, placenta & lactation", 3],
    ]],
    ["Reproductive Health", 12, [
      ["Population explosion & birth control", 4],
      ["Contraceptive methods", 4],
      ["Medical termination of pregnancy", 2],
      ["Sexually transmitted diseases", 2],
      ["Assisted reproductive technologies", 3],
    ]],
    ["Principles of Inheritance and Variation", 12, [
      ["Mendel's laws of inheritance", 5],
      ["Monohybrid & dihybrid crosses", 5],
      ["Gene interactions & linkage", 4],
      ["Sex determination", 3],
      ["Chromosomal disorders & mutations", 4],
    ]],
    ["Molecular Basis of Inheritance", 12, [
      ["DNA structure & packaging", 4],
      ["DNA replication", 4],
      ["Transcription & processing", 4],
      ["Genetic code & translation", 5],
      ["Regulation of gene expression (lac operon)", 4],
    ]],
    ["Evolution", 12, [
      ["Origin of life", 3],
      ["Evidences of evolution", 4],
      ["Natural selection & adaptive radiation", 4],
      ["Speciation & Hardy-Weinberg", 4],
      ["Human evolution", 2],
    ]],
    ["Human Health and Disease", 12, [
      ["Pathogens & infectious diseases", 4],
      ["Innate & acquired immunity", 5],
      ["AIDS & HIV", 3],
      ["Cancer", 3],
      ["Drugs & alcohol abuse", 3],
    ]],
    ["Microbes in Human Welfare", 12, [
      ["Microbes in household products", 3],
      ["Microbes in industrial production", 4],
      ["Sewage treatment & biogas", 3],
      ["Biocontrol agents", 2],
      ["Biofertilisers", 2],
    ]],
    ["Biotechnology: Principles and Processes", 12, [
      ["Principles of biotechnology", 3],
      ["Restriction enzymes & cloning vectors", 5],
      ["Gene transfer techniques", 3],
      ["PCR & gel electrophoresis", 3],
      ["Competent host & transformation", 3],
    ]],
    ["Biotechnology and its Applications", 12, [
      ["Genetically modified crops", 3],
      ["Bt cotton & pest resistance", 3],
      ["Recombinant insulin & gene therapy", 3],
      ["Molecular diagnostics", 2],
      ["Ethical issues & patents", 2],
    ]],
    ["Organisms and Populations", 12, [
      ["Habitat, niche & adaptations", 3],
      ["Population attributes", 3],
      ["Population growth models", 4],
      ["Species interactions (predation, competition, parasitism)", 4],
    ]],
    ["Ecosystem", 12, [
      ["Ecosystem components", 3],
      ["Productivity & decomposition", 4],
      ["Energy flow & food chains", 4],
      ["Nutrient cycling", 3],
      ["Ecological succession", 3],
    ]],
    ["Biodiversity and Conservation", 12, [
      ["Biodiversity patterns & importance", 3],
      ["Loss of biodiversity", 3],
      ["Biodiversity hotspots", 2],
      ["In-situ & ex-situ conservation", 3],
    ]],
    ["Environmental Issues", 12, [
      ["Air & water pollution", 4],
      ["Solid waste & e-waste", 2],
      ["Greenhouse effect & climate change", 3],
      ["Deforestation & its effects", 2],
    ]],
  ],
);

const maths = buildSubject(
  "maths",
  "Mathematics",
  "Math",
  "Sigma",
  {
    chip: "bg-amber-100 text-amber-700",
    solid: "bg-amber-500",
    text: "text-amber-600",
    gradient: "from-amber-500 to-orange-500",
    hex: "#f59e0b",
  },
  [
    ["Sets", 11, [
      ["Sets & their representation", 3],
      ["Subsets & power set", 3],
      ["Operations on sets", 4],
      ["Venn diagrams", 3],
      ["Complement & laws of sets", 2],
    ]],
    ["Relations and Functions", 11, [
      ["Relations & types", 3],
      ["Functions & their types", 4],
      ["Domain & range", 4],
      ["Graphs of functions", 3],
      ["Composition of functions", 2],
    ]],
    ["Trigonometric Functions", 11, [
      ["Angles & radian measure", 3],
      ["Trigonometric identities", 4],
      ["Compound & multiple angles", 4],
      ["Transformation formulae", 3],
      ["Trigonometric equations", 4],
    ]],
    ["Complex Numbers and Quadratic Equations", 11, [
      ["Complex numbers & algebra", 4],
      ["Modulus & argument", 4],
      ["Polar form & De Moivre", 3],
      ["Quadratic equations", 4],
      ["Nature of roots", 3],
    ]],
    ["Linear Inequalities", 11, [
      ["Inequalities & solution sets", 2],
      ["Graphical solutions", 3],
      ["Word problems", 2],
    ]],
    ["Permutations and Combinations", 11, [
      ["Factorials & fundamental principle", 3],
      ["Permutations", 4],
      ["Combinations", 4],
      ["Circular arrangements", 2],
      ["Application problems", 3],
    ]],
    ["Binomial Theorem", 11, [
      ["Binomial expansion", 4],
      ["General & middle terms", 3],
      ["Coefficient problems", 3],
      ["Applications", 2],
    ]],
    ["Sequences and Series", 11, [
      ["Arithmetic progression", 4],
      ["Geometric progression", 4],
      ["AM, GM & HM", 3],
      ["Special series", 3],
      ["Harmonic progression", 2],
    ]],
    ["Straight Lines", 11, [
      ["Slope & equations of lines", 4],
      ["Angle between lines", 3],
      ["Distance & section formulae", 4],
      ["Locus problems", 3],
    ]],
    ["Conic Sections", 11, [
      ["Circle", 4],
      ["Parabola", 4],
      ["Ellipse", 3],
      ["Hyperbola", 3],
      ["Tangents & normals", 3],
    ]],
    ["Introduction to Three Dimensional Geometry", 11, [
      ["Coordinates in space", 2],
      ["Distance formula", 2],
      ["Section formula", 2],
    ]],
    ["Limits and Derivatives", 11, [
      ["Concept of limits", 3],
      ["Standard limits", 4],
      ["Derivatives from first principles", 3],
      ["Algebra of derivatives", 3],
    ]],
    ["Statistics", 11, [
      ["Measures of dispersion", 2],
      ["Mean deviation", 2],
      ["Variance & standard deviation", 3],
      ["Analysis of frequency distributions", 2],
    ]],
    ["Probability", 11, [
      ["Events & sample space", 2],
      ["Axiomatic probability", 3],
      ["Conditional probability", 3],
      ["Independent events", 2],
    ]],
    ["Relations and Functions", 12, [
      ["Types of relations", 3],
      ["Types of functions", 3],
      ["Composition & invertible functions", 4],
      ["Binary operations", 2],
    ]],
    ["Inverse Trigonometric Functions", 12, [
      ["Principal value branches", 4],
      ["Properties of inverse functions", 4],
      ["Identities & simplifications", 3],
    ]],
    ["Matrices", 12, [
      ["Types of matrices", 3],
      ["Matrix operations", 4],
      ["Transpose & symmetric matrices", 3],
      ["Elementary operations", 3],
      ["Applications", 2],
    ]],
    ["Determinants", 12, [
      ["Properties of determinants", 4],
      ["Minors & cofactors", 3],
      ["Adjoint & inverse of matrices", 4],
      ["Applications: area & Cramer's rule", 4],
    ]],
    ["Continuity and Differentiability", 12, [
      ["Continuity of functions", 4],
      ["Differentiability", 4],
      ["Chain rule & implicit functions", 4],
      ["Logarithmic differentiation", 3],
      ["Second order derivatives", 2],
    ]],
    ["Application of Derivatives", 12, [
      ["Rate of change", 3],
      ["Tangents & normals", 4],
      ["Increasing & decreasing functions", 4],
      ["Maxima & minima", 5],
      ["Approximations", 2],
    ]],
    ["Integrals", 12, [
      ["Integration by substitution", 4],
      ["Integration by parts", 4],
      ["Partial fractions", 3],
      ["Definite integrals & properties", 5],
      ["Reduction & special integrals", 3],
    ]],
    ["Application of Integrals", 12, [
      ["Area under a curve", 4],
      ["Area between curves", 3],
    ]],
    ["Differential Equations", 12, [
      ["Order & degree", 2],
      ["Variable separable method", 4],
      ["Homogeneous equations", 3],
      ["Linear differential equations", 4],
      ["Applications", 2],
    ]],
    ["Vector Algebra", 12, [
      ["Vectors & basic operations", 3],
      ["Dot product", 4],
      ["Cross product", 4],
      ["Scalar triple product", 3],
    ]],
    ["Three Dimensional Geometry", 12, [
      ["Direction cosines & ratios", 3],
      ["Equations of lines", 4],
      ["Angle & distance between lines", 4],
      ["Planes & their equations", 4],
      ["Distance from a point", 2],
    ]],
    ["Linear Programming", 12, [
      ["LPP formulation", 2],
      ["Graphical method", 3],
      ["Feasible region & optimisation", 3],
    ]],
    ["Probability", 12, [
      ["Conditional probability", 4],
      ["Bayes' theorem", 4],
      ["Random variables & distributions", 4],
      ["Bernoulli trials & binomial distribution", 3],
    ]],
  ],
);

// ---------------------------------------------------------------------------
// Streams
// ---------------------------------------------------------------------------

export const subjects: Record<string, SubjectDef> = {
  physics,
  chemistry,
  biology,
  maths,
};

export const streams: Record<StreamId, StreamDef> = {
  neet: {
    id: "neet",
    name: "NEET",
    short: "NEET",
    tagline: "Medical",
    exam: "National Eligibility cum Entrance Test",
    description:
      "Physics, Chemistry & Biology — every NCERT chapter mapped for MBBS, BDS, AYUSH and nursing seats.",
    subjects: ["physics", "chemistry", "biology"],
    palette: {
      gradient: "from-teal-500 to-emerald-500",
      solid: "bg-teal-600",
      text: "text-teal-600",
      chip: "bg-teal-100 text-teal-700",
      soft: "bg-teal-50",
      hex: "#0d9488",
    },
  },
  jee: {
    id: "jee",
    name: "JEE",
    short: "JEE",
    tagline: "Engineering",
    exam: "Joint Entrance Examination (Main & Advanced)",
    description:
      "Physics, Chemistry & Mathematics — every NCERT chapter mapped for B.Tech / B.E. and IIT-JEE Advanced.",
    subjects: ["physics", "chemistry", "maths"],
    palette: {
      gradient: "from-indigo-500 to-violet-500",
      solid: "bg-indigo-600",
      text: "text-indigo-600",
      chip: "bg-indigo-100 text-indigo-700",
      soft: "bg-indigo-50",
      hex: "#4f46e5",
    },
  },
};

// ---------------------------------------------------------------------------
// Lookup helpers
// ---------------------------------------------------------------------------

export function getStream(id: string | null | undefined): StreamDef {
  return streams[(id as StreamId) ?? "neet"] ?? streams.neet;
}

export function getStreamSubjects(streamId: StreamId): SubjectDef[] {
  return streams[streamId].subjects.map((s) => subjects[s]);
}

export function getSubject(subjectId: string): SubjectDef | undefined {
  return subjects[subjectId];
}

export function getChapter(
  subjectId: string,
  chapterId: string,
): Chapter | undefined {
  return subjects[subjectId]?.chapters.find((c) => c.id === chapterId);
}

export function getTopic(
  subjectId: string,
  chapterId: string,
  topicId: string,
): Topic | undefined {
  return getChapter(subjectId, chapterId)?.topics.find((t) => t.id === topicId);
}

export function countStreamChapters(streamId: StreamId): number {
  return getStreamSubjects(streamId).reduce(
    (acc, s) => acc + s.chapters.length,
    0,
  );
}

export function countStreamTopics(streamId: StreamId): number {
  return getStreamSubjects(streamId).reduce(
    (acc, s) => acc + s.chapters.reduce((a, c) => a + c.topics.length, 0),
    0,
  );
}

export function countStreamPyqs(streamId: StreamId): number {
  return getStreamSubjects(streamId).reduce(
    (acc, s) =>
      acc +
      s.chapters.reduce(
        (a, c) => a + c.topics.reduce((t, p) => t + p.pyq, 0),
        0,
      ),
    0,
  );
}

export function totalPyqs(): number {
  return countStreamPyqs("neet") + countStreamPyqs("jee");
}

export function subjectChaptersByClass(
  subject: SubjectDef,
): { cls: ClassLevel; chapters: Chapter[] }[] {
  return ([11, 12] as ClassLevel[]).map((cls) => ({
    cls,
    chapters: subject.chapters.filter((c) => c.class === cls),
  }));
}

export const STREAM_ORDER: StreamId[] = ["neet", "jee"];
