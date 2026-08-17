// Chemistry knowledge — keyed by "chemistry:<chapterId>"

import type { ChapterKnowledge } from "./index";

export const CHEMISTRY_KNOWLEDGE: Record<string, ChapterKnowledge> = {
  "chemistry:chemistry-c1": {
    summary:
      "Some Basic Concepts of Chemistry builds the mole concept, stoichiometry and concentration terms — the arithmetic engine of the whole paper.",
    keyPoints: [
      "1 mole = 6.022 × 10²³ particles; molar mass in g/mol equals molecular mass in amu.",
      "n = given mass/molar mass = volume at STP/22.4 L = NA × molecules.",
      "Limiting reagent: the reactant that runs out first determines product amount.",
      "Percentage composition: % element = (mass of element/molar mass) × 100; empirical → molecular formula via n = molar mass/empirical mass.",
      "Laws: conservation of mass, constant proportions, multiple proportions (Dalton), Gay-Lussac's volumes.",
    ],
    formulas: [
      { name: "Moles", formula: "n = m/M = V/22.4 (STP)" },
      { name: "Molarity", formula: "M = moles of solute / litres of solution" },
      { name: "Molality", formula: "m = moles of solute / kg of solvent" },
    ],
    glossary: [
      { term: "Mole", def: "Amount containing Avogadro's number of entities.", hindi: "मोल" },
      { term: "Limiting reagent", def: "Reactant fully consumed, deciding the product yield.", hindi: "सीमांत अभिकर्मक" },
      { term: "Molarity", def: "Moles of solute per litre of solution.", hindi: "मोलरता" },
    ],
    mistakes: [
      "Using litre of solvent instead of solution for molarity.",
      "Forgetting to balance the equation before stoichiometry — ratios come from coefficients.",
    ],
    pyqs: [
      {
        q: "The number of moles in 11 g of CO₂ (M = 44) is:",
        options: ["0.25", "0.5", "1", "2"],
        answer: 0,
        explanation: "n = 11/44 = 0.25 mol.",
      },
      {
        q: "Molarity of a solution with 4 g NaOH (M = 40) in 500 mL is:",
        options: ["0.2 M", "0.1 M", "0.4 M", "0.5 M"],
        answer: 0,
        explanation: "n = 0.1 mol; M = 0.1/0.5 = 0.2 M.",
      },
    ],
    tip: "STP shortcut: 22.4 L per mole of gas saves a full step in gas stoichiometry.",
  },
  "chemistry:chemistry-c2": {
    summary:
      "Structure of Atom covers atomic models, quantum numbers, orbitals and electronic configuration.",
    keyPoints: [
      "Bohr model works for hydrogen-like species; de Broglie λ = h/mv and Heisenberg's uncertainty principle apply to all matter.",
      "Quantum numbers: n (shell), l (subshell, 0 to n−1), ml (−l…+l), ms (±1/2) — each electron has a unique set.",
      "Orbital capacities: s = 2, p = 6, d = 10, f = 14 electrons.",
      "Aufbau (fill lowest energy first: 1s<2s<2p<3s<3p<4s<3d…), Pauli (no two electrons identical), Hund (fill orbitals singly first).",
      "Stability: half-filled and fully filled subshells are extra stable (Cr, Cu exceptions).",
    ],
    formulas: [
      { name: "Energy of H-like level", formula: "Eₙ = −13.6 Z²/n² eV" },
      { name: "de Broglie wavelength", formula: "λ = h/mv" },
      { name: "Max electrons in shell", formula: "2n²" },
    ],
    glossary: [
      { term: "Quantum number", def: "Set of four numbers uniquely identifying an electron's state.", hindi: "क्वांटम संख्या" },
      { term: "Orbital", def: "Region with high probability of finding an electron.", hindi: "कक्षक" },
      { term: "Aufbau principle", def: "Electrons fill orbitals in increasing energy order.", hindi: "आफबाऊ सिद्धांत" },
    ],
    mistakes: [
      "Writing 3d before 4s in configuration order — energy fills 4s first but we write 3d first.",
      "Forgetting Hund's rule for nitrogen's three 2p electrons.",
    ],
    pyqs: [
      {
        q: "The maximum number of electrons in an f-subshell is:",
        options: ["14", "10", "6", "2"],
        answer: 0,
        explanation: "f orbitals: 7 orbitals × 2 electrons = 14.",
      },
      {
        q: "The electronic configuration of Cr (Z = 24) is:",
        options: ["[Ar] 3d⁵ 4s¹", "[Ar] 3d⁴ 4s²", "[Ar] 3d⁶", "[Ar] 3d⁵ 4s²"],
        answer: 0,
        explanation: "Half-filled 3d⁵ 4s¹ is more stable than 3d⁴ 4s².",
      },
    ],
    tip: "Exceptions (Cr, Cu, Mo, Ag, Au) appear in NEET repeatedly — memorise the short list.",
  },
  "chemistry:chemistry-c3": {
    summary:
      "Classification of Elements and Periodicity explains the periodic table and trends in atomic size, ionisation enthalpy, electron gain enthalpy and electronegativity.",
    keyPoints: [
      "Modern periodic law: properties are a periodic function of atomic number; blocks s, p, d, f.",
      "Atomic radius decreases across a period (more nuclear charge) and increases down a group.",
      "Ionisation enthalpy increases across, decreases down; second IE > first IE always.",
      "Electron gain enthalpy: halogens most negative; noble gases positive.",
      "Electronegativity (Pauling) increases across, decreases down; F is the most electronegative.",
    ],
    formulas: [
      { name: "Trend rule", formula: "Size/IE/EN: ↓ across period (nuclear charge), ↑ down group (shells)" },
    ],
    glossary: [
      { term: "Ionisation enthalpy", def: "Energy to remove the most loosely bound electron.", hindi: "आयनन एन्थैल्पी" },
      { term: "Electronegativity", def: "Tendency of an atom to attract shared electrons.", hindi: "विद्युत ऋणात्मकता" },
    ],
    mistakes: [
      "Saying IE increases down a group — it decreases because size grows.",
      "Forgetting noble gases have positive electron gain enthalpy (energy must be supplied).",
    ],
    pyqs: [
      {
        q: "Which element has the highest electronegativity?",
        options: ["Fluorine", "Chlorine", "Oxygen", "Nitrogen"],
        answer: 0,
        explanation: "F is the most electronegative element (4.0 on Pauling scale).",
      },
      {
        q: "Atomic size across a period:",
        options: ["decreases", "increases", "stays constant", "first increases then decreases"],
        answer: 0,
        explanation: "Increasing nuclear charge pulls electrons closer.",
      },
    ],
    tip: "Anomalies worth remembering: O vs N electron gain enthalpy, and IE₂ of Mg vs Al patterns.",
  },
  "chemistry:chemistry-c4": {
    summary:
      "Chemical Bonding and Molecular Structure covers ionic and covalent bonds, VSEPR, hybridisation, MOT and hydrogen bonding.",
    keyPoints: [
      "Ionic bond: complete transfer (NaCl); covalent: sharing (H₂, Cl₂); bond polarity from electronegativity difference.",
      "Octet rule exceptions: BeCl₂, BF₃ (incomplete), PCl₅, SF₆ (expanded).",
      "VSEPR: lone pairs repel more than bond pairs; shapes — linear (2), trigonal planar (3), tetrahedral (4), bent, pyramidal.",
      "Hybridisation: sp (linear), sp² (trigonal planar), sp³ (tetrahedral); determines geometry.",
      "MOT: bonding MO lower energy than antibonding; bond order = (Nb − Na)/2; O₂ is paramagnetic with BO = 2.",
    ],
    formulas: [
      { name: "Bond order (MOT)", formula: "BO = (Nb − Na)/2" },
    ],
    glossary: [
      { term: "Hybridisation", def: "Mixing of atomic orbitals to form equivalent hybrid orbitals.", hindi: "संकरण" },
      { term: "VSEPR theory", def: "Electron pairs arrange to minimise repulsion, fixing shape.", hindi: "VSEPR सिद्धांत" },
      { term: "Hydrogen bond", def: "Attraction between H and electronegative atoms (F, O, N).", hindi: "हाइड्रोजन बंध" },
    ],
    mistakes: [
      "Counting bond pairs for geometry but ignoring lone pairs — lone pairs reshape the molecule.",
      "Saying all bonds in a molecule are equally strong — bond order varies (e.g. benzene).",
    ],
    pyqs: [
      {
        q: "The shape of NH₃ is:",
        options: ["pyramidal", "planar", "linear", "tetrahedral"],
        answer: 0,
        explanation: "One lone pair on N distorts tetrahedral to pyramidal.",
      },
      {
        q: "The bond order of O₂ molecule is:",
        options: ["2", "1", "2.5", "3"],
        answer: 0,
        explanation: "O₂: (10 − 6)/2 = 2, with unpaired electrons (paramagnetic).",
      },
    ],
    tip: "Hybridisation ↔ geometry ↔ bond angle tables are the single best revision sheet in this chapter.",
  },
  "chemistry:chemistry-c5": {
    summary:
      "Thermodynamics applies energy accounting to chemistry — enthalpy, Hess's law, spontaneity and Gibbs energy.",
    keyPoints: [
      "First law: ΔU = q + w (chemistry sign convention: w positive when work done ON the system).",
      "Enthalpy H = U + PV; ΔH = ΔU + Δn_g RT; exothermic ΔH < 0.",
      "Hess's law: ΔH of a reaction is path-independent — add steps' enthalpies.",
      "Standard enthalpies: formation, combustion, neutralisation (−57 kJ/mol), bond enthalpy.",
      "Spontaneity: ΔG = ΔH − TΔS < 0; ΔG = −nFE and ΔG = −RT lnK.",
    ],
    formulas: [
      { name: "Enthalpy relation", formula: "ΔH = ΔU + Δn_g RT" },
      { name: "Gibbs energy", formula: "ΔG = ΔH − TΔS" },
      { name: "Equilibrium link", formula: "ΔG° = −RT lnK" },
    ],
    glossary: [
      { term: "Enthalpy", def: "Heat content at constant pressure.", hindi: "एन्थैल्पी" },
      { term: "Entropy", def: "Degree of disorder of a system.", hindi: "एन्ट्रॉपी" },
      { term: "Spontaneous process", def: "Process that occurs without external driving force.", hindi: "स्वतः प्रवर्तित प्रक्रम" },
    ],
    mistakes: [
      "Mixing the physics (ΔQ = ΔU + ΔW) and chemistry (ΔU = q + w) sign conventions.",
      "Forgetting Δn_g counts only gaseous species in ΔH = ΔU + Δn_g RT.",
    ],
    pyqs: [
      {
        q: "For a spontaneous reaction at all temperatures:",
        options: ["ΔH < 0, ΔS > 0", "ΔH > 0, ΔS < 0", "ΔH < 0, ΔS < 0", "ΔH > 0, ΔS > 0"],
        answer: 0,
        explanation: "ΔG = ΔH − TΔS is negative at every T only when ΔH < 0 and ΔS > 0.",
      },
      {
        q: "The enthalpy of neutralisation of a strong acid by a strong base is about:",
        options: ["−57 kJ/mol", "−13.6 kJ/mol", "+57 kJ/mol", "−285 kJ/mol"],
        answer: 0,
        explanation: "H⁺ + OH⁻ → H₂O releases ≈ 57 kJ/mol.",
      },
    ],
    tip: "ΔG sign questions are decided by the ΔH/ΔS temperature table — draw it once, use it everywhere.",
  },
  "chemistry:chemistry-c6": {
    summary:
      "Equilibrium covers chemical equilibrium (Kp, Kc, Le Chatelier) and ionic equilibrium (pH, buffers, solubility product).",
    keyPoints: [
      "Law of mass action: Kc = [products]/[reactants] at equilibrium; Kp = Kc(RT)^Δn.",
      "Le Chatelier: a change in concentration, pressure or temperature shifts equilibrium to oppose it; catalysts don't shift it.",
      "pH = −log[H⁺]; Kw = 10⁻¹⁴ at 25 °C; strong vs weak acids.",
      "Buffers resist pH change: Henderson-Hasselbalch pH = pKa + log([salt]/[acid]).",
      "Solubility product Ksp: for AgCl, Ksp = [Ag⁺][Cl⁻]; precipitation when ionic product > Ksp.",
    ],
    formulas: [
      { name: "Kp/Kc relation", formula: "Kp = Kc(RT)^Δn" },
      { name: "pH", formula: "pH = −log[H⁺], pH + pOH = 14" },
      { name: "Buffer (acidic)", formula: "pH = pKa + log([salt]/[acid])" },
    ],
    glossary: [
      { term: "Equilibrium constant", def: "Ratio of product to reactant concentrations at equilibrium.", hindi: "साम्य स्थिरांक" },
      { term: "Buffer", def: "Solution resisting pH change on adding acid/base.", hindi: "बफर" },
      { term: "Solubility product", def: "Ksp — product of ion concentrations in a saturated solution.", hindi: "विलेयता गुणनफल" },
    ],
    mistakes: [
      "Ignoring Δn in Kp = Kc(RT)^Δn (Δn counts only gases).",
      "Using [H⁺] = √(Ka·C) for strong acids — it applies to weak acids.",
    ],
    pyqs: [
      {
        q: "pH of 0.01 M HCl is:",
        options: ["2", "1", "12", "0.01"],
        answer: 0,
        explanation: "Strong acid: [H⁺] = 0.01 M, pH = 2.",
      },
      {
        q: "Kp = Kc for a reaction when:",
        options: ["Δn = 0", "Δn = 1", "Δn = 2", "Δn = −1"],
        answer: 0,
        explanation: "Kp = Kc(RT)^0 = Kc when the gas mole change is zero.",
      },
    ],
    tip: "Buffer questions are formula-substitution — identify acid/salt pairs first.",
  },
  "chemistry:chemistry-c7": {
    summary:
      "Redox Reactions deals with oxidation numbers, balancing redox equations and electrochemical applications.",
    keyPoints: [
      "Oxidation number rules: elemental form 0; O usually −2 (peroxides −1); H +1 (hydrides −1); sum = charge of species.",
      "Oxidising agents gain electrons (get reduced); reducing agents lose electrons.",
      "Balancing in acidic medium: add H₂O for O, H⁺ for H, electrons for charge; in basic medium add OH⁻.",
      "Redox disproportionation: same species both oxidised and reduced (e.g. H₂O₂, Cl₂ in base).",
      "Electrochemistry link: oxidation at anode, reduction at cathode.",
    ],
    formulas: [
      { name: "Oxidation number", formula: "Σ(ON × atoms) = charge of species" },
    ],
    glossary: [
      { term: "Redox reaction", def: "Reaction with simultaneous oxidation and reduction.", hindi: "रेडॉक्स अभिक्रिया" },
      { term: "Oxidising agent", def: "Species that oxidises others while itself getting reduced.", hindi: "ऑक्सीकारक" },
    ],
    mistakes: [
      "Assigning O = −2 in peroxides (H₂O₂ → −1 each).",
      "Losing electrons in balancing — charge must balance along with atoms.",
    ],
    pyqs: [
      {
        q: "The oxidation number of Mn in KMnO₄ is:",
        options: ["+7", "+5", "+2", "+6"],
        answer: 0,
        explanation: "+1 + x + 4(−2) = 0 ⇒ x = +7.",
      },
      {
        q: "In the reaction 2H₂S + SO₂ → 3S + 2H₂O, sulphur is:",
        options: ["both oxidised and reduced", "only oxidised", "only reduced", "unchanged"],
        answer: 0,
        explanation: "H₂S's S(−2) → S(0) oxidised; SO₂'s S(+4) → S(0) reduced — disproportionation.",
      },
    ],
    tip: "Practise oxidation numbers of Cr, Mn, N in common species — the most repeated MCQs.",
  },
  "chemistry:chemistry-c8": {
    summary:
      "Organic Chemistry Basics covers nomenclature, isomerism, electronic effects, reaction intermediates and purification.",
    keyPoints: [
      "IUPAC: longest chain, lowest locants, alphabetical prefixes, functional group priority.",
      "Inductive effect (σ, through bonds), resonance (π, delocalisation), hyperconjugation (σ→π, needs α-H).",
      "Stability order: carbocations 3° > 2° > 1° > methyl; free radicals and carbanions follow the reverse logic.",
      "Isomerism: structural (chain, position, functional, metamerism, tautomerism) and stereoisomerism (geometrical, optical).",
      "Purification: crystallisation, distillation, chromatography; detection via Lassaigne's test.",
    ],
    formulas: [
      { name: "Carbocation stability", formula: "3° > 2° > 1° > CH₃⁺" },
    ],
    glossary: [
      { term: "Resonance", def: "Delocalisation of π electrons across a molecule.", hindi: "अनुनाद" },
      { term: "Inductive effect", def: "Permanent electron shift along σ bonds due to electronegativity.", hindi: "प्रेरण प्रभाव" },
      { term: "Hyperconjugation", def: "σ(C–H) electrons delocalising into an adjacent p-orbital/π system.", hindi: "अतिसंयुग्मन" },
    ],
    mistakes: [
      "Numbering the chain to give the functional group the lowest locant BEFORE branches.",
      "Confusing resonance (needs π) with inductive (σ) effects in acidity questions.",
    ],
    pyqs: [
      {
        q: "The most stable carbocation is:",
        options: ["tertiary", "secondary", "primary", "methyl"],
        answer: 0,
        explanation: "More alkyl groups stabilise the positive charge by hyperconjugation + inductive effect.",
      },
      {
        q: "Which effect requires an α-hydrogen?",
        options: ["Hyperconjugation", "Inductive effect", "Resonance", "Electromeric effect"],
        answer: 0,
        explanation: "Hyperconjugation involves σ(C–H) electrons from an α-C–H bond.",
      },
    ],
    tip: "Acidity/basicity questions almost always reduce to: stabilise the conjugate base.",
  },
  "chemistry:chemistry-c9": {
    summary:
      "Hydrocarbons covers alkanes, alkenes, alkynes, benzene and aromaticity.",
    keyPoints: [
      "Alkanes: free-radical halogenation, cracking, Wurtz, Kolbe; reactivity F₂ > Cl₂ > Br₂ > I₂.",
      "Alkenes: electrophilic addition (Markovnikov), ozonolysis, hydrogenation; cis/trans isomerism.",
      "Alkynes: acidic H (form acetylides), addition of 2 equivalents, Sandmeyer-like coupling.",
      "Benzene: aromatic (Hückel 4n+2 π electrons, planar, conjugated); electrophilic substitution (nitration, halogenation, Friedel-Crafts).",
      "Directing effects: −NO₂, −CN meta-directing deactivators; −CH₃, −OH ortho/para directors.",
    ],
    formulas: [
      { name: "Hückel rule", formula: "Aromatic if (4n+2) π electrons in a planar ring" },
    ],
    glossary: [
      { term: "Markovnikov's rule", def: "H adds to the carbon with more H; carbocation forms at the more substituted carbon.", hindi: "मार्कोवनिकोव नियम" },
      { term: "Aromaticity", def: "Special stability from cyclic, planar, conjugated 4n+2 π electron systems.", hindi: "ऐरोमैटिकता" },
    ],
    mistakes: [
      "Adding Br₂ to an alkene and expecting substitution — alkenes do addition.",
      "Calling cyclooctatetraene aromatic — it's non-planar, so 4n rule applies but it's antiaromatic/non-aromatic.",
    ],
    pyqs: [
      {
        q: "Propene reacts with HBr mainly to give:",
        options: ["2-bromopropane", "1-bromopropane", "1,2-dibromopropane", "propanol"],
        answer: 0,
        explanation: "Markovnikov addition puts Br on the more substituted carbon (2°).",
      },
      {
        q: "Benzene undergoes mainly:",
        options: ["electrophilic substitution", "addition", "free radical substitution", "elimination"],
        answer: 0,
        explanation: "Aromatic stability favours substitution over addition.",
      },
    ],
    tip: "Markovnikov + carbocation stability together answer half the alkene PYQs.",
  },
  "chemistry:chemistry-c10": {
    summary:
      "Solutions covers concentration, Raoult's law, colligative properties, osmosis and abnormal molar masses.",
    keyPoints: [
      "Raoult's law: P = P°x; ideal solutions obey it at all concentrations (ΔH_mix = 0, ΔV = 0).",
      "Colligative properties depend on particle NUMBER: ΔTf, ΔTb, osmotic pressure π = CRT.",
      "Relative lowering of vapour pressure = mole fraction of solute.",
      "Elevation of boiling point ΔTb = Kb·m; depression of freezing point ΔTf = Kf·m.",
      "van't Hoff factor i: dissociation i > 1, association i < 1; abnormal molar mass = normal/i.",
    ],
    formulas: [
      { name: "Raoult's law", formula: "P₁ = x₁P°₁" },
      { name: "Boiling point elevation", formula: "ΔTb = Kb·m" },
      { name: "Osmotic pressure", formula: "π = iCRT" },
      { name: "van't Hoff factor", formula: "i = observed colligative / expected" },
    ],
    glossary: [
      { term: "Colligative property", def: "Depends only on the number of solute particles.", hindi: "अनुसंपार्श्विक गुण" },
      { term: "Osmosis", def: "Solvent flow through a semipermeable membrane toward higher solute concentration.", hindi: "परासरण" },
    ],
    mistakes: [
      "Using grams instead of moles in molality — m is per kg solvent.",
      "Forgetting i for electrolytes: NaCl gives i ≈ 2, CaCl₂ i ≈ 3.",
    ],
    pyqs: [
      {
        q: "Which colligative property is best for molar mass of polymers?",
        options: ["Osmotic pressure", "Boiling point elevation", "Freezing point depression", "Vapour pressure lowering"],
        answer: 0,
        explanation: "Osmotic pressure is measurable even at very low concentrations (large molecules).",
      },
      {
        q: "For 0.1 M NaCl solution at 25 °C (i = 2), the osmotic pressure is:",
        options: ["2 × 0.1 × RT", "0.1 × RT", "0.2 × 0.1 × RT", "RT"],
        answer: 0,
        explanation: "π = iCRT = 2 × 0.1 × RT.",
      },
    ],
    tip: "Spot i quickly: non-electrolytes i = 1; count ions for salts.",
  },
  "chemistry:chemistry-c11": {
    summary:
      "Electrochemistry covers conductance, electrolysis, electrode potentials, the Nernst equation, batteries and corrosion.",
    keyPoints: [
      "Conductivity κ depends on ions; molar conductivity Λm = κ/C increases with dilution for weak electrolytes.",
      "Electrolysis: Faraday's laws; m = ZIt = (M/nF)·It.",
      "Standard electrode potential: more negative E° = stronger reductant at anode; cell EMF = E°cathode − E°anode.",
      "Nernst equation: E = E° − (0.059/n)log Q (at 25 °C).",
      "Batteries: dry cell (Zn anode, MnO₂ cathode), lead storage (rechargeable), fuel cells; corrosion = oxidation of metals.",
    ],
    formulas: [
      { name: "Nernst equation", formula: "E = E° − (0.059/n) log Q" },
      { name: "Faraday's law", formula: "m = (M·I·t)/(nF)" },
      { name: "Cell EMF", formula: "E°cell = E°cathode − E°anode" },
    ],
    glossary: [
      { term: "Electrolysis", def: "Decomposition using electric current.", hindi: "विद्युत अपघटन" },
      { term: "Electrode potential", def: "Tendency of an electrode to lose/gain electrons.", hindi: "इलेक्ट्रोड विभव" },
    ],
    mistakes: [
      "Computing E°cell with the wrong sign — always reduce at cathode, oxidise at anode.",
      "Forgetting n = electrons exchanged per formula unit in Faraday calculations.",
    ],
    pyqs: [
      {
        q: "The EMF of a cell is given by:",
        options: ["E°cathode − E°anode", "E°anode − E°cathode", "E°cathode + E°anode", "E°anode × E°cathode"],
        answer: 0,
        explanation: "Reduction potential of cathode minus reduction potential of anode.",
      },
      {
        q: "To deposit 1 mole of silver (n = 1) needs:",
        options: ["1 Faraday", "2 Faraday", "0.5 Faraday", "96500 J"],
        answer: 0,
        explanation: "m = M·It/(nF); 1 mole requires 1F = 96500 C.",
      },
    ],
    tip: "Nernst: a 10× change in Q changes E by 0.059/n V — remember the 0.059 shortcut.",
  },
  "chemistry:chemistry-c12": {
    summary:
      "Chemical Kinetics studies reaction rates, order, integrated rate laws, half-life, the Arrhenius equation and catalysis.",
    keyPoints: [
      "Rate = change in concentration/time; instantaneous rate from the tangent slope.",
      "Order (experimental) vs molecularity (theoretical, for elementary steps only).",
      "Zero order: [A] falls linearly, t₁/₂ = [A]₀/2k; first order: ln[A] = −kt + ln[A]₀, t₁/₂ = 0.693/k.",
      "Second order: 1/[A] = kt + 1/[A]₀; t₁/₂ = 1/(k[A]₀).",
      "Arrhenius: k = Ae^(−Ea/RT); a catalyst lowers Ea, speeding the reaction without changing ΔH.",
    ],
    formulas: [
      { name: "First-order half-life", formula: "t₁/₂ = 0.693/k" },
      { name: "Arrhenius equation", formula: "k = Ae^(−Ea/RT)" },
      { name: "Zero-order half-life", formula: "t₁/₂ = [A]₀/2k" },
    ],
    glossary: [
      { term: "Activation energy", def: "Minimum energy reactants need to form products.", hindi: "सक्रियण ऊर्जा" },
      { term: "Catalyst", def: "Substance that speeds a reaction by lowering Ea, unchanged at the end.", hindi: "उत्प्रेरक" },
    ],
    mistakes: [
      "Reading order from the balanced equation — order comes from experiments.",
      "Using t₁/₂ = 0.693/k for zero-order reactions.",
    ],
    pyqs: [
      {
        q: "The half-life of a first-order reaction with k = 0.0693 min⁻¹ is:",
        options: ["10 min", "6.93 min", "0.693 min", "100 min"],
        answer: 0,
        explanation: "t₁/₂ = 0.693/0.0693 = 10 min.",
      },
      {
        q: "A catalyst works by:",
        options: ["lowering activation energy", "increasing activation energy", "changing ΔH", "changing equilibrium constant"],
        answer: 0,
        explanation: "Catalysts provide an alternative path with lower Ea.",
      },
    ],
    tip: "t₁/₂ of first-order reactions is concentration-independent — a favourite assertion.",
  },
  "chemistry:chemistry-c13": {
    summary:
      "The d- and f-Block Elements covers transition metals, their properties, lanthanoids and actinoids.",
    keyPoints: [
      "d-block: partially filled d subshell; typical properties — variable oxidation states, coloured ions, catalytic activity, complex formation.",
      "Trends: atomic size decreases slowly, then rises at the end; ionisation enthalpy rises steadily.",
      "Mn shows the maximum oxidation states (+2 to +7); Cu⁺, Zn²⁺, Sc³⁺ are colourless (d⁰/d¹⁰).",
      "K₂Cr₂O₇ (orange) and KMnO₄ (purple) are powerful oxidising agents in acidic medium.",
      "f-block: lanthanoids (4f, similar chemistry, lanthanoid contraction) and actinoids (5f, radioactive).",
    ],
    formulas: [
      { name: "Colour rule", formula: "Coloured ions need unpaired d-electrons (d¹–d⁹)" },
    ],
    glossary: [
      { term: "Transition element", def: "Element with partially filled d orbital in its ion/common state.", hindi: "संक्रमण तत्व" },
      { term: "Lanthanoid contraction", def: "Steady size decrease across lanthanoids due to poor 4f shielding.", hindi: "लैंथेनॉइड संकुचन" },
    ],
    mistakes: [
      "Including Zn, Cd, Hg as transition metals in colour questions — they are d¹⁰ and colourless.",
      "Saying all d-block ions are coloured — d⁰ and d¹⁰ are not.",
    ],
    pyqs: [
      {
        q: "Which ion is colourless in aqueous solution?",
        options: ["Zn²⁺", "Cu²⁺", "Fe³⁺", "Mn²⁺"],
        answer: 0,
        explanation: "Zn²⁺ is d¹⁰ — no d–d transitions, so colourless.",
      },
      {
        q: "KMnO₄ acts as an oxidising agent in acidic medium, changing Mn from +7 to:",
        options: ["+2", "+4", "+6", "+7"],
        answer: 0,
        explanation: "In acid, MnO₄⁻ reduces to Mn²⁺.",
      },
    ],
    tip: "For colour/paramagnetism, count unpaired d-electrons — that single skill answers many MCQs.",
  },
  "chemistry:chemistry-c14": {
    summary:
      "Coordination Compounds covers Werner's theory, nomenclature, isomerism, VBT, CFT and applications.",
    keyPoints: [
      "Coordination entity: central metal + ligands; coordination number = number of donor atoms attached.",
      "Werner's theory: primary valency (ionisable) + secondary valency (fixed, directional).",
      "Nomenclature: ligands alphabetically, 'ate' for anionic complexes, oxidation state in Roman numerals.",
      "Isomerism: ionisation, hydrate, linkage, geometrical (cis/trans), optical (d/l).",
      "CFT: ligand field splits d-orbitals; strong field (CN⁻, CO) → low spin; weak field (H₂O, F⁻) → high spin.",
    ],
    formulas: [
      { name: "Crystal field stabilisation", formula: "Δ₀ > pairing energy ⇒ low spin; Δ₀ < pairing energy ⇒ high spin" },
    ],
    glossary: [
      { term: "Ligand", def: "Ion/molecule donating electron pairs to the central metal.", hindi: "लिगैंड" },
      { term: "Coordination number", def: "Number of ligand donor atoms bonded to the metal.", hindi: "उपसहसंयोजन संख्या" },
      { term: "Chelate", def: "Ring formed when a multidentate ligand binds a metal.", hindi: "कीलेट" },
    ],
    mistakes: [
      "Writing the oxidation state of a complex without summing ligand charges correctly.",
      "Forgetting that NH₃ is neutral in charge sums (Co³⁺ in [Co(NH₃)₆]³⁺).",
    ],
    pyqs: [
      {
        q: "In [Co(NH₃)₆]Cl₃, the oxidation state of Co is:",
        options: ["+3", "+2", "+1", "+6"],
        answer: 0,
        explanation: "x + 0 − 3 = 0 ⇒ x = +3.",
      },
      {
        q: "Which ligand is bidentate?",
        options: ["Ethylenediamine (en)", "H₂O", "NH₃", "Cl⁻"],
        answer: 0,
        explanation: "en has two donor N atoms, forming chelate rings.",
      },
    ],
    tip: "Learn the spectrochemical series order — it decides low vs high spin in most CFT questions.",
  },
  "chemistry:chemistry-c15": {
    summary:
      "Haloalkanes and Haloarenes covers preparation and reactions — SN1/SN2, elimination, Grignard reagents and haloarene chemistry.",
    keyPoints: [
      "SN2: one step, backside attack, inversion, favoured by primary halides + strong nucleophile.",
      "SN1: two steps via carbocation, racemisation, favoured by tertiary halides + polar protic solvent.",
      "Elimination (E1/E2) competes with substitution — strong bulky base favours elimination.",
      "Grignard reagents RMgX form alcohols with carbonyls, hydrocarbons with water.",
      "Haloarenes: less reactive in substitution (resonance + no backside attack); nucleophilic substitution needs drastic conditions.",
    ],
    formulas: [
      { name: "Reactivity (SN2)", formula: "CH₃X > 1° > 2° > 3°" },
      { name: "Reactivity (SN1)", formula: "3° > 2° > 1° > CH₃X" },
    ],
    glossary: [
      { term: "SN1 reaction", def: "Unimolecular nucleophilic substitution via carbocation.", hindi: "SN1 अभिक्रिया" },
      { term: "Grignard reagent", def: "RMgX — organometallic with nucleophilic carbon.", hindi: "ग्रिग्नार्ड अभिकर्मक" },
    ],
    mistakes: [
      "Using SN2 order for tertiary halides — they prefer SN1 (steric hindrance).",
      "Adding water to Grignard and expecting an alcohol — you get the hydrocarbon RH.",
    ],
    pyqs: [
      {
        q: "Which halide reacts fastest by SN2?",
        options: ["CH₃Br", "(CH₃)₃CBr", "(CH₃)₂CHBr", "C₆H₅Br"],
        answer: 0,
        explanation: "SN2 needs a backside attack — least hindered methyl is fastest.",
      },
      {
        q: "Tertiary butyl halide mainly undergoes:",
        options: ["SN1", "SN2", "neither", "free radical substitution"],
        answer: 0,
        explanation: "Stable tertiary carbocation makes SN1 dominant.",
      },
    ],
    tip: "Decide SN1 vs SN2 in three steps: substrate (1°/2°/3°), nucleophile strength, solvent polarity.",
  },
  "chemistry:chemistry-c16": {
    summary:
      "Alcohols, Phenols and Ethers covers their preparation, reactions, acidity and distinction tests.",
    keyPoints: [
      "Alcohols: from alkenes (hydration), carbonyls (reduction, Grignard), haloalkanes (hydrolysis).",
      "Reactions: esterification, oxidation (1°→aldehyde→acid, 2°→ketone), dehydration to alkenes.",
      "Phenols are more acidic than alcohols (phenoxide resonance); electron-withdrawing groups increase acidity.",
      "Ethers: Williamson synthesis (alkoxide + alkyl halide); cleavage by HI.",
      "Distinction tests: Lucas (3° immediate), Iodoform (CH₃CH(OH)– group), FeCl₃ (phenols → violet).",
    ],
    formulas: [
      { name: "Lucas test", formula: "3° alcohol: immediate turbidity; 2°: few minutes; 1°: no reaction at room temp" },
    ],
    glossary: [
      { term: "Phenoxide ion", def: "Conjugate base of phenol, stabilised by resonance.", hindi: "फीनॉक्साइड आयन" },
      { term: "Williamson synthesis", def: "Ether formation from alkoxide and alkyl halide.", hindi: "विलियमसन संश्लेषण" },
    ],
    mistakes: [
      "Saying alcohol is more acidic than phenol — it is the reverse.",
      "Using Lucas reagent on phenols — Lucas is for alcohols only.",
    ],
    pyqs: [
      {
        q: "Which is most acidic?",
        options: ["Phenol", "Ethanol", "Methanol", "Water"],
        answer: 0,
        explanation: "Phenoxide resonance makes phenol more acidic than alcohols.",
      },
      {
        q: "An alcohol giving an immediate turbidity with Lucas reagent is:",
        options: ["tertiary", "primary", "secondary", "methyl"],
        answer: 0,
        explanation: "3° alcohols form stable carbocations instantly.",
      },
    ],
    tip: "Acidity of phenols follows substituent effects: NO₂ raises acidity, CH₃ lowers it.",
  },
  "chemistry:chemistry-c17": {
    summary:
      "Aldehydes, Ketones and Carboxylic Acids covers carbonyl preparation, nucleophilic addition, oxidations, named reactions and acid chemistry.",
    keyPoints: [
      "Carbonyl carbon is electrophilic; nucleophiles add — HCN, NaHSO₃, alcohols (acetals), Grignard.",
      "Aldehydes are more reactive than ketones (less steric + electronic hindrance).",
      "Oxidation: aldehydes → acids (Tollen's silver mirror, Fehling's); ketones resist mild oxidants.",
      "Named reactions: Aldol (α-H + base), Cannizzaro (no α-H + conc. base), Clemmensen/Wolff-Kishner (C=O → CH₂).",
      "Carboxylic acids: acidic (resonance-stabilised carboxylate), esterification, decarboxylation, Hell-Volhard-Zelinsky.",
    ],
    formulas: [
      { name: "Aldol reaction", formula: "2 aldehydes/ketones with α-H + dil. base → β-hydroxy carbonyl" },
    ],
    glossary: [
      { term: "Nucleophilic addition", def: "Addition to C=O where the nucleophile attacks the carbonyl carbon.", hindi: "नाभिकस्नेही योग" },
      { term: "Cannizzaro reaction", def: "Aldehyde without α-H disproportionates in conc. base to alcohol + acid.", hindi: "कैनिज़ारो अभिक्रिया" },
    ],
    mistakes: [
      "Applying Aldol to aldehydes without α-H (use Cannizzaro there).",
      "Saying ketones give Tollen's test — only aldehydes (and α-hydroxy ketones) do.",
    ],
    pyqs: [
      {
        q: "Which gives a silver mirror with Tollen's reagent?",
        options: ["Acetaldehyde", "Acetone", "Acetophenone", "Ethyl acetate"],
        answer: 0,
        explanation: "Aldehydes are oxidised by Tollen's reagent; ketones are not.",
      },
      {
        q: "Formaldehyde (no α-H) with conc. NaOH gives:",
        options: ["methanol + formic acid", "aldol", "acetic acid", "ethane"],
        answer: 0,
        explanation: "Cannizzaro disproportionation: CH₃OH + HCOONa.",
      },
    ],
    tip: "When you see 'no α-hydrogen + concentrated base', think Cannizzaro instantly.",
  },
  "chemistry:chemistry-c18": {
    summary:
      "Amines covers their classification, preparation, basicity and diazonium chemistry.",
    keyPoints: [
      "Amines: 1°, 2°, 3° by number of alkyl/aryl groups on N; RNH₂ are weak bases (lone pair on N).",
      "Preparation: Gabriel phthalimide (1° only), Hofmann bromamide degradation (amide → 1° amine), reduction of nitriles.",
      "Basicity in gas phase: 3° > 2° > 1° > NH₃; in water: 2° > 1° > 3° > NH₃ (solvation effects).",
      "Aniline is weaker than aliphatic amines (resonance delocalises the lone pair).",
      "Diazonium salts (ArN₂⁺) from aniline + NaNO₂/HCl at 0–5 °C: Sandmeyer, Gatterman, coupling, azo dyes.",
    ],
    formulas: [
      { name: "Hofmann degradation", formula: "RCONH₂ + Br₂ + 4NaOH → RNH₂ + Na₂CO₃ + 2NaBr + 2H₂O" },
    ],
    glossary: [
      { term: "Diazonium salt", def: "ArN₂⁺X⁻, versatile intermediate made at low temperature.", hindi: "डाइएज़ोनियम लवण" },
      { term: "Gabriel synthesis", def: "Clean route to primary amines via phthalimide.", hindi: "गैब्रीएल संश्लेषण" },
    ],
    mistakes: [
      "Saying 3° amines are most basic in water — solvation flips the order.",
      "Forgetting diazotisation needs 0–5 °C (above that, phenol forms).",
    ],
    pyqs: [
      {
        q: "In aqueous solution, the most basic amine is:",
        options: ["2° amine", "1° amine", "3° amine", "NH₃"],
        answer: 0,
        explanation: "Alkyl donation + better solvation of 2° ammonium ions win over 3° steric/less solvation.",
      },
      {
        q: "Diazonium salts are formed at:",
        options: ["0–5 °C", "room temperature", "100 °C", "reflux"],
        answer: 0,
        explanation: "Low temperature prevents phenol formation from the diazonium salt.",
      },
    ],
    tip: "Aniline + NaNO₂ + HCl cold = diazonium salt — the launch pad for a dozen reactions.",
  },
  "chemistry:chemistry-c19": {
    summary:
      "Biomolecules covers carbohydrates, proteins, enzymes, vitamins, nucleic acids and lipids.",
    keyPoints: [
      "Carbohydrates: monosaccharides (glucose, fructose), disaccharides (sucrose, maltose, lactose), polysaccharides (starch, cellulose, glycogen).",
      "Glucose: C₆H₁₂O₆, open chain (CHO) + cyclic (pyranose); reducing sugar (gives Tollen's/Fehling's).",
      "Proteins: amino acids joined by peptide bonds; structure levels primary → quaternary; denaturation unfolds them.",
      "Enzymes are protein catalysts with active sites; vitamins are essential organic micronutrients (B, C water-soluble; A, D, E, K fat-soluble).",
      "Nucleic acids: DNA (double helix, deoxyribose, A-T/G-C) and RNA (single, ribose, U instead of T).",
    ],
    formulas: [
      { name: "Reducing sugar test", formula: "Glucose/fructose/maltose/lactose reduce Tollen's & Fehling's; sucrose does not" },
    ],
    glossary: [
      { term: "Peptide bond", def: "Amide link between amino acids (−CO–NH−).", hindi: "पेप्टाइड बंध" },
      { term: "Denaturation", def: "Loss of a protein's native structure and function.", hindi: "विकृतीकरण" },
    ],
    mistakes: [
      "Calling sucrose a reducing sugar — it is non-reducing (both anomeric carbons linked).",
      "Saying DNA has uracil — that's RNA; DNA has thymine.",
    ],
    pyqs: [
      {
        q: "Which sugar is non-reducing?",
        options: ["Sucrose", "Glucose", "Maltose", "Lactose"],
        answer: 0,
        explanation: "In sucrose both anomeric carbons are involved in the glycosidic bond.",
      },
      {
        q: "The monomer of proteins is:",
        options: ["amino acid", "glucose", "nucleotide", "fatty acid"],
        answer: 0,
        explanation: "Proteins are polymers of α-amino acids joined by peptide bonds.",
      },
    ],
    tip: "For carbohydrate MCQs, check reducing/non-reducing and the glycosidic linkage — that's 80% of it.",
  },
};
