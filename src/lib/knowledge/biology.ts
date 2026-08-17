// Biology knowledge — keyed by "biology:<chapterId>"

import type { ChapterKnowledge } from "./index";

export const BIOLOGY_KNOWLEDGE: Record<string, ChapterKnowledge> = {
  "biology:biology-c1": {
    summary:
      "The Living World introduces biodiversity, taxonomy, nomenclature and taxonomic aids — the vocabulary chapter of biology.",
    keyPoints: [
      "Living things: growth, reproduction, metabolism (defining feature), cellular organisation, consciousness.",
      "Binomial nomenclature (Linnaeus): Genus + species, italicised, genus capitalised.",
      "Taxonomic hierarchy: Species < Genus < Family < Order < Class < Phylum < Kingdom < Domain.",
      "Taxonomic aids: herbarium, botanical/museums, zoological parks, keys, manuals, monographs.",
      "Systematics = classification + evolutionary relationships.",
    ],
    glossary: [
      { term: "Taxonomy", def: "Science of identification, naming and classification of organisms.", hindi: "वर्गिकी" },
      { term: "Species", def: "Basic unit of classification; interbreeding natural populations.", hindi: "जाति" },
    ],
    mistakes: [
      "Writing the binomial without italics or with both words capitalised.",
      "Confusing 'growth' as a defining feature — non-living things (crystals) also grow.",
    ],
    pyqs: [
      {
        q: "The most basic unit of classification is:",
        options: ["Species", "Genus", "Family", "Order"],
        answer: 0,
        explanation: "Species is the lowest and basic unit in the hierarchy.",
      },
      {
        q: "Binomial nomenclature was given by:",
        options: ["Linnaeus", "Darwin", "Mendel", "Haeckel"],
        answer: 0,
        explanation: "Carolus Linnaeus introduced the binomial system.",
      },
    ],
    tip: "Metabolism is the defining feature of life — NCERT says it explicitly.",
  },
  "biology:biology-c2": {
    summary:
      "Biological Classification compares the five kingdoms — Monera, Protista, Fungi, Plantae, Animalia — plus viruses and lichens.",
    keyPoints: [
      "R.H. Whittaker's five kingdoms: Monera, Protista, Fungi, Plantae, Animalia.",
      "Monera: prokaryotes, no membrane-bound organelles; eubacteria, archaebacteria (extremophiles), cyanobacteria (BGA fix nitrogen).",
      "Protista: unicellular eukaryotes — diatoms (silica shells), slime moulds, protozoans.",
      "Fungi: saprophytes/parasites, chitin cell walls; zygomycetes, ascomycetes, basidiomycetes, deuteromycetes.",
      "Viruses are obligate parasites (no cell), viroids are naked RNA, lichens = algae + fungi (symbiosis, pollution indicators).",
    ],
    glossary: [
      { term: "Archaebacteria", def: "Ancient prokaryotes thriving in extreme habitats (halophiles, thermoacidophiles).", hindi: "आर्कीबैक्टीरिया" },
      { term: "Lichens", def: "Symbiotic association of algae and fungi; sensitive pollution indicators.", hindi: "लाइकेन" },
    ],
    mistakes: [
      "Putting cyanobacteria in Protista — they are Monera (prokaryotes).",
      "Calling viruses living — they are inert outside a host cell.",
    ],
    pyqs: [
      {
        q: "Which kingdom includes organisms with chitin cell walls?",
        options: ["Fungi", "Monera", "Protista", "Plantae"],
        answer: 0,
        explanation: "Fungal cell walls contain chitin.",
      },
      {
        q: "Lichens indicate:",
        options: ["air pollution levels", "soil fertility", "water purity", "temperature"],
        answer: 0,
        explanation: "Lichens die with SO₂ pollution — sensitive bioindicators.",
      },
    ],
    tip: "Match organisms to kingdoms via three clues: cell type, cell wall, nutrition.",
  },
  "biology:biology-c3": {
    summary:
      "Plant Kingdom covers algae, bryophytes, pteridophytes, gymnosperms and angiosperms with their life cycles.",
    keyPoints: [
      "Algae: chlorophyll-bearing, thallus body; green (chlorophyceae), brown (phaeophyceae), red (rhodophyceae).",
      "Bryophytes: amphibians of the plant world; liverworts and mosses; gametophyte dominant, need water for fertilisation.",
      "Pteridophytes: first vascular plants; sporophyte dominant; horsetails, ferns.",
      "Gymnosperms: naked seeds, no fruit; cycas, pines; heterosporous.",
      "Angiosperms: covered seeds, flowers, double fertilisation; haplo-diplontic life cycle.",
    ],
    glossary: [
      { term: "Gametophyte", def: "Haploid, gamete-producing phase of a plant life cycle.", hindi: "युग्मकोद्भिद्" },
      { term: "Heterospory", def: "Production of two kinds of spores — micro and mega.", hindi: "विषमबीजाणुता" },
    ],
    mistakes: [
      "Saying bryophytes have vascular tissue — they lack true xylem/phloem.",
      "Calling pteridophytes gametophyte-dominant — sporophyte dominates.",
    ],
    pyqs: [
      {
        q: "Which group is called the amphibians of the plant kingdom?",
        options: ["Bryophytes", "Algae", "Pteridophytes", "Gymnosperms"],
        answer: 0,
        explanation: "Bryophytes live on land but need water for reproduction.",
      },
      {
        q: "Gymnosperms differ from angiosperms in having:",
        options: ["naked seeds", "flowers", "double fertilisation", "fruits"],
        answer: 0,
        explanation: "Gymnosperm seeds are not enclosed in fruits.",
      },
    ],
    tip: "For life-cycle questions: bryophytes = gametophyte dominant; pteridophytes onward = sporophyte dominant.",
  },
  "biology:biology-c4": {
    summary:
      "Animal Kingdom classifies animals from Porifera to Chordata with their diagnostic features.",
    keyPoints: [
      "Basis of classification: symmetry, germ layers, coelom, segmentation, notochord.",
      "Porifera: sponges, cellular level, water canal system (Sycon, Euspongia).",
      "Cnidaria: diploblastic, cnidoblasts, radial symmetry (Hydra, jellyfish, corals).",
      "Platyhelminthes: flatworms, triploblastic, acoelomate (Planaria, liver fluke, tapeworm).",
      "Chordata: notochord, dorsal hollow nerve cord, pharyngeal gill slits — vertebrates are one subphylum.",
    ],
    glossary: [
      { term: "Coelom", def: "Body cavity lined by mesoderm.", hindi: "प्रगुहा" },
      { term: "Notochord", def: "Rod-like skeletal structure present at some stage in chordates.", hindi: "नोटोकॉर्ड" },
    ],
    mistakes: [
      "Calling cnidarians triploblastic — they are diploblastic.",
      "Putting starfish in Mollusca — echinoderms have water vascular systems.",
    ],
    pyqs: [
      {
        q: "Which phylum has a water canal system?",
        options: ["Porifera", "Cnidaria", "Echinodermata", "Annelida"],
        answer: 0,
        explanation: "Sponges filter feed through a water canal system.",
      },
      {
        q: "The presence of a notochord defines:",
        options: ["Chordata", "Echinodermata", "Annelida", "Arthropoda"],
        answer: 0,
        explanation: "Notochord is the diagnostic feature of chordates.",
      },
    ],
    tip: "Learn one 'standard example' per phylum — NEET asks feature↔example matches.",
  },
  "biology:biology-c5": {
    summary:
      "Morphology of Flowering Plants covers root, stem, leaf, inflorescence, flower, fruit, seed and key families.",
    keyPoints: [
      "Roots: tap (dicots) vs fibrous (monocots); modifications — storage (carrot), prop (banyan), pneumatophores (mangroves).",
      "Stem: node, internode, axillary bud; modifications — rhizome (ginger), tuber (potato), bulb (onion).",
      "Leaf: lamina, petiole; venation parallel (monocots) vs reticulate (dicots); phyllotaxy.",
      "Flower: calyx, corolla, androecium, gynoecium; placentation types.",
      "Families: Fabaceae (pea), Solanaceae (potato, tomato), Liliaceae (lily) — floral formula & diagram.",
    ],
    glossary: [
      { term: "Inflorescence", def: "Arrangement of flowers on the floral axis (racemose vs cymose).", hindi: "पुष्पक्रम" },
      { term: "Placentation", def: "Arrangement of ovules in the ovary.", hindi: "बीजांडासन" },
    ],
    mistakes: [
      "Calling potato a root — it is a modified underground stem (tuber) with eyes (buds).",
      "Matching pea to Solanaceae — pea is Fabaceae.",
    ],
    pyqs: [
      {
        q: "The eye of a potato is:",
        options: ["an axillary bud", "a root", "a leaf", "a flower"],
        answer: 0,
        explanation: "Potato tuber is a stem; its eyes are axillary buds.",
      },
      {
        q: "Reticulate venation is typical of:",
        options: ["dicots", "monocots", "bryophytes", "gymnosperms only"],
        answer: 0,
        explanation: "Dicot leaves show reticulate venation.",
      },
    ],
    tip: "Modification questions: find the 'eyes/nodes' to identify stems vs roots.",
  },
  "biology:biology-c6": {
    summary:
      "Anatomy of Flowering Plants examines tissues, tissue systems and the internal structure of stems, roots and leaves.",
    keyPoints: [
      "Meristems: apical, intercalary, lateral (cambium) — sites of growth.",
      "Simple tissues: parenchyma, collenchyma, sclerenchyma; complex: xylem & phloem.",
      "Vascular bundle types: radial, conjoint, open (dicots, with cambium), closed (monocots).",
      "Monocot vs dicot: scattered vs ring vascular bundles; polyarch vs diarch roots.",
      "Secondary growth: vascular + cork cambium produce wood and bark (dicots & gymnosperms).",
    ],
    glossary: [
      { term: "Meristem", def: "Tissue with continuously dividing cells.", hindi: "विभज्योतक" },
      { term: "Secondary growth", def: "Increase in girth by lateral meristems.", hindi: "द्वितीयक वृद्धि" },
    ],
    mistakes: [
      "Saying monocots show secondary growth — normally they do not (no cambium).",
      "Calling xylem a simple tissue — it is complex (tracheids, vessels, fibres, parenchyma).",
    ],
    pyqs: [
      {
        q: "Closed vascular bundles are found in:",
        options: ["monocots", "dicots", "gymnosperms", "ferns"],
        answer: 0,
        explanation: "Monocot bundles lack cambium, so they are closed.",
      },
      {
        q: "Secondary growth occurs due to:",
        options: ["lateral meristems", "apical meristems", "intercalary meristems", "only xylem"],
        answer: 0,
        explanation: "Vascular and cork cambium (lateral meristems) add girth.",
      },
    ],
    tip: "Draw the dicot T.S. once — bundle ring + open bundles is the NEET favourite.",
  },
  "biology:biology-c7": {
    summary:
      "Structural Organisation in Animals covers tissues plus the anatomy of earthworm, cockroach and frog.",
    keyPoints: [
      "Animal tissues: epithelial, connective, muscular, neural.",
      "Earthworm: hermaphrodite; clitellum (segments 14–16); nephridia excrete; typhlosole increases absorption.",
      "Cockroach: 13 segments, open circulatory system with haemolymph, malpighian tubules excrete; dioecious.",
      "Frog: skin respiration, three-chambered heart, ureotelic; external fertilisation in water.",
      "Epithelial types: squamous, cuboidal, columnar, ciliated, glandular, transitional.",
    ],
    glossary: [
      { term: "Clitellum", def: "Glandular band of earthworm forming cocoons.", hindi: "क्लाइटेलम" },
      { term: "Malpighian tubules", def: "Excretory organs of cockroach.", hindi: "मैल्पीघी नलिकाएँ" },
    ],
    mistakes: [
      "Saying cockroach has a closed circulatory system — it is open.",
      "Calling frogs ureotelic AND uricotelic — they excrete urea (ureotelic).",
    ],
    pyqs: [
      {
        q: "Excretory organs of cockroach are:",
        options: ["malpighian tubules", "nephridia", "flame cells", "kidneys"],
        answer: 0,
        explanation: "Malpighian tubules remove nitrogenous waste in insects.",
      },
      {
        q: "Earthworm is:",
        options: ["hermaphrodite", "unisexual", "asexual", "parthenogenetic"],
        answer: 0,
        explanation: "Both male and female organs occur in the same worm.",
      },
    ],
    tip: "Earthworm/cockroach/frog — keep a one-line 'excretion, circulation, reproduction' table.",
  },
  "biology:biology-c8": {
    summary:
      "Cell: The Unit of Life details the cell theory, membrane, organelles, nucleus and prokaryotic vs eukaryotic cells.",
    keyPoints: [
      "Cell theory: Schleiden & Schwann; all cells from pre-existing cells (Virchow).",
      "Fluid mosaic model: phospholipid bilayer + proteins; selectively permeable.",
      "Endomembrane system: ER, Golgi, lysosomes, vacuoles (nucleus, mitochondria, chloroplasts excluded).",
      "Mitochondria (powerhouse, cristae, matrix) and chloroplasts (thylakoids, grana) are semi-autonomous.",
      "Prokaryotes lack membrane-bound organelles and a true nucleus; ribosomes 70S vs eukaryotic 80S.",
    ],
    glossary: [
      { term: "Endomembrane system", def: "Interconnected membrane organelles — ER, Golgi, lysosomes, vacuoles.", hindi: "अंत:झिल्ली तंत्र" },
      { term: "Semi-autonomous organelle", def: "Organelle with its own DNA & ribosomes (mitochondria, plastids).", hindi: "अर्ध-स्वायत्त अंगक" },
    ],
    mistakes: [
      "Including mitochondria in the endomembrane system — they are excluded.",
      "Giving 80S ribosomes to bacteria — prokaryotes have 70S.",
    ],
    pyqs: [
      {
        q: "Which organelle is NOT part of the endomembrane system?",
        options: ["Mitochondria", "Golgi apparatus", "ER", "Lysosomes"],
        answer: 0,
        explanation: "Mitochondria function independently of the endomembrane system.",
      },
      {
        q: "Ribosomes of prokaryotes are:",
        options: ["70S", "80S", "60S", "40S"],
        answer: 0,
        explanation: "Prokaryotic ribosomes are 70S (50S + 30S).",
      },
    ],
    tip: "If a question lists organelles and asks for the odd one, check the endomembrane list first.",
  },
  "biology:biology-c9": {
    summary:
      "Biomolecules separates micromolecules from macromolecules — proteins, carbohydrates, lipids, nucleic acids and metabolic pools.",
    keyPoints: [
      "Micromolecules (amino acids, sugars, nucleotides, lipids) vs macromolecules (proteins, polysaccharides, nucleic acids).",
      "Proteins: polymers of amino acids; 20 standard types; peptide bonds.",
      "Enzymes: protein catalysts; active site; substrate-specific; enzyme activity affected by pH, temperature, inhibitors.",
      "Carbohydrates: monosaccharides (glucose C₆H₁₂O₆), disaccharides (sucrose, maltose, lactose), polysaccharides (starch, cellulose, glycogen).",
      "Metabolism: anabolism (build) + catabolism (break) — a living state's defining chemistry.",
    ],
    glossary: [
      { term: "Metabolic pool", def: "Collection of micromolecules inside cells used for synthesis.", hindi: "चयापचय पूल" },
      { term: "Active site", def: "Region of an enzyme where the substrate binds.", hindi: "सक्रिय स्थल" },
    ],
    mistakes: [
      "Classifying lipids as macromolecules — they are micromolecules (not polymers).",
      "Saying cellulose is digestible by humans — we lack cellulase.",
    ],
    pyqs: [
      {
        q: "Which is a macromolecule?",
        options: ["Protein", "Glucose", "Amino acid", "ATP"],
        answer: 0,
        explanation: "Proteins are polymers; the others are micromolecules.",
      },
      {
        q: "Enzymes are basically:",
        options: ["proteins", "lipids", "carbohydrates", "nucleic acids"],
        answer: 0,
        explanation: "Most enzymes are globular proteins.",
      },
    ],
    tip: "The polymer test: if it's built from repeating monomers, it's a macromolecule (lipids are the exception).",
  },
  "biology:biology-c10": {
    summary:
      "Cell Cycle and Cell Division covers interphase, mitosis and meiosis.",
    keyPoints: [
      "Interphase: G1 (growth), S (DNA replication — 2C→4C), G2 (preparation); M phase is short.",
      "Mitosis: one division, 2 identical daughter cells, somatic; prophase, metaphase, anaphase, telophase.",
      "Metaphase: chromosomes align at the equator; anaphase: sister chromatids separate.",
      "Meiosis: two divisions, 4 haploid cells, genetic variation via crossing over (pachytene) and independent assortment.",
      "Meiosis I: homologous chromosomes separate (reduction); Meiosis II: sister chromatids separate (equational).",
    ],
    glossary: [
      { term: "Crossing over", def: "Exchange of segments between homologous chromosomes in pachytene.", hindi: "पारगमन" },
      { term: "Chiasmata", def: "Visible points of crossing over between chromatids.", hindi: "काइज़्मेटा" },
    ],
    mistakes: [
      "Saying DNA replicates during M phase — it happens in S phase.",
      "Calling meiosis II a reductional division — only meiosis I is.",
    ],
    pyqs: [
      {
        q: "DNA replication occurs in which phase?",
        options: ["S phase", "G1", "G2", "M phase"],
        answer: 0,
        explanation: "Synthesis phase doubles the DNA content.",
      },
      {
        q: "Crossing over occurs during:",
        options: ["pachytene", "leptotene", "diplotene", "metaphase I"],
        answer: 0,
        explanation: "Recombination happens at pachytene of prophase I.",
      },
    ],
    tip: "Match each phase to ONE key event — that mapping answers most cell-cycle MCQs.",
  },
  "biology:biology-c11": {
    summary:
      "Photosynthesis in Higher Plants covers pigments, light reactions, the Calvin cycle, C4 and CAM pathways.",
    keyPoints: [
      "Chlorophyll a (blue-green, reaction centre) and b (yellow-green, accessory); carotenoids protect and harvest light.",
      "Light reaction: PSII (water splitting, O₂ release, ATP) and PSI (NADPH); occurs in thylakoids.",
      "Calvin cycle (C3): CO₂ fixation by RuBisCO → 3-PGA → G3P; needs ATP + NADPH from light reactions.",
      "C4 plants (maize, sugarcane): PEP carboxylase fixes CO₂ in mesophyll → C4 acid → Calvin cycle in bundle sheath (Kranz anatomy).",
      "Photorespiration: RuBisCO fixes O₂ instead of CO₂ — wasteful, absent in C4 (no net loss).",
    ],
    glossary: [
      { term: "Kranz anatomy", def: "Bundle sheath cells surrounding vascular bundles in C4 plants.", hindi: "क्रांज संरचना" },
      { term: "Photorespiration", def: "Oxygen fixation by RuBisCO wasting energy.", hindi: "प्रकाशश्वसन" },
    ],
    mistakes: [
      "Saying O₂ is released from CO₂ — it comes from water photolysis.",
      "Calling RuBisCO a C4 enzyme — it works in the Calvin cycle.",
    ],
    pyqs: [
      {
        q: "Oxygen released in photosynthesis comes from:",
        options: ["water", "CO₂", "glucose", "chlorophyll"],
        answer: 0,
        explanation: "Water photolysis at PSII releases O₂.",
      },
      {
        q: "Kranz anatomy is found in:",
        options: ["C4 plants", "C3 plants", "CAM plants only", "algae"],
        answer: 0,
        explanation: "Bundle sheath chloroplasts define C4 (Kranz) anatomy.",
      },
    ],
    tip: "Remember the triad: PSII → water + ATP; PSI → NADPH; Calvin → sugar.",
  },
  "biology:biology-c12": {
    summary:
      "Respiration in Plants traces glycolysis, the Krebs cycle, the electron transport chain and fermentation.",
    keyPoints: [
      "Glycolysis (cytoplasm): glucose → 2 pyruvate, 2 ATP, 2 NADH; no O₂ needed.",
      "Krebs cycle (mitochondrial matrix): acetyl-CoA → CO₂, NADH, FADH₂, 1 ATP per turn.",
      "ETC (inner mitochondrial membrane): NADH→3 ATP, FADH₂→2 ATP; ATP synthase makes ATP.",
      "Net aerobic: 1 glucose → ~36–38 ATP; fermentation (yeast) gives ethanol + CO₂; (muscles) lactic acid.",
      "Respiratory quotient RQ = CO₂ released/O₂ consumed; carbohydrates ≈ 1, fats < 1, organic acids > 1.",
    ],
    glossary: [
      { term: "Glycolysis", def: "Cytosolic splitting of glucose into two pyruvate molecules.", hindi: "ग्लाइकोलिसिस" },
      { term: "Respiratory quotient", def: "Ratio of CO₂ produced to O₂ consumed.", hindi: "श्वसन गुणांक" },
    ],
    mistakes: [
      "Placing glycolysis in mitochondria — it happens in the cytoplasm.",
      "Saying fermentation yields ATP per glucose equal to aerobic respiration — it's only 2.",
    ],
    pyqs: [
      {
        q: "The site of the Krebs cycle is:",
        options: ["mitochondrial matrix", "cytoplasm", "chloroplast", "nucleus"],
        answer: 0,
        explanation: "Krebs cycle runs in the matrix; ETC is on the inner membrane.",
      },
      {
        q: "RQ of carbohydrates is approximately:",
        options: ["1", "0.7", "0.9", "1.5"],
        answer: 0,
        explanation: "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O ⇒ RQ = 6/6 = 1.",
      },
    ],
    tip: "Track the location: glycolysis = cytoplasm, Krebs = matrix, ETC = inner membrane.",
  },
  "biology:biology-c13": {
    summary:
      "Plant Growth and Development covers growth phases, plant hormones, photoperiodism and vernalisation.",
    keyPoints: [
      "Growth phases: meristematic, elongation, maturation; arithmetic vs geometric growth curves.",
      "Auxin: cell elongation, apical dominance, phototropism; IAA, IBA, NAA.",
      "Gibberellins: stem elongation, bolting, seed germination; Cytokinins: cell division, delay senescence.",
      "ABA: stress hormone — stomatal closure, dormancy, abscission; Ethylene: ripening, senescence.",
      "Photoperiodism: response to day length — SDP (rice), LDP (wheat); Vernalisation: cold treatment for flowering.",
    ],
    glossary: [
      { term: "Apical dominance", def: "Suppression of lateral buds by the apex (auxin effect).", hindi: "शीर्ष प्रभुत्व" },
      { term: "Photoperiodism", def: "Flowering response to relative day/night length.", hindi: "प्रकाशकालिता" },
    ],
    mistakes: [
      "Matching ABA to growth promotion — it is a stress/growth inhibitor.",
      "Saying ethylene promotes leaf growth — it promotes ripening and abscission.",
    ],
    pyqs: [
      {
        q: "Stomatal closure during drought is caused by:",
        options: ["ABA", "auxin", "GA", "cytokinin"],
        answer: 0,
        explanation: "ABA closes stomata to conserve water.",
      },
      {
        q: "Bolt in cabbage (internode elongation) is induced by:",
        options: ["gibberellins", "auxins", "cytokinins", "ethylene"],
        answer: 0,
        explanation: "GA causes rapid stem elongation (bolting).",
      },
    ],
    tip: "One hormone ↔ one headline effect — ABA=dormancy/stress, GA=elongation, Ethylene=ripening.",
  },
  "biology:biology-c14": {
    summary:
      "Breathing and Exchange of Gases covers respiratory organs, the breathing mechanism, gas transport and its regulation.",
    keyPoints: [
      "Human respiration: nostrils → pharynx → larynx → trachea → bronchi → bronchioles → alveoli.",
      "Breathing: inspiration (diaphragm & external intercostals contract) and expiration (passive, elastic recoil).",
      "Intrapulmonary pressure −1 to −3 mm Hg relative to atmosphere drives air in; intrapleural pressure is always negative.",
      "O₂ transport: 97% with haemoglobin (oxyhaemoglobin), 3% dissolved; CO₂: 70% as bicarbonate, 20–25% carbamino, 7% dissolved.",
      "Regulation: respiratory rhythm centre (medulla), pneumotaxic centre (limits inspiration), chemoreceptors sense CO₂/H⁺.",
    ],
    glossary: [
      { term: "Tidal volume", def: "Air per normal breath (~500 mL).", hindi: "ज्वारीय आयतन" },
      { term: "Vital capacity", def: "TV + IRV + ERV — maximum air after deepest breath.", hindi: "महत्वपूर्ण क्षमता" },
    ],
    mistakes: [
      "Saying CO₂ binds to haemoglobin as carbamino — it does, but most travels as bicarbonate.",
      "Calling expiration an active process — normal expiration is passive.",
    ],
    pyqs: [
      {
        q: "Maximum CO₂ is transported in blood as:",
        options: ["bicarbonate", "carbamino compounds", "dissolved gas", "oxyhaemoglobin"],
        answer: 0,
        explanation: "About 70% travels as bicarbonate ions.",
      },
      {
        q: "The respiratory rhythm centre is located in the:",
        options: ["medulla oblongata", "cerebellum", "cerebrum", "pons only"],
        answer: 0,
        explanation: "The medulla's respiratory rhythm centre paces breathing.",
      },
    ],
    tip: "Lung volume sums: VC = TV + IRV + ERV — know the four standard volumes.",
  },
  "biology:biology-c15": {
    summary:
      "Body Fluids and Circulation covers blood, blood groups, lymph, the heart, cardiac cycle and ECG.",
    keyPoints: [
      "Plasma: 55%, water + proteins (albumin, globulins, fibrinogen); formed elements: RBC, WBC, platelets.",
      "ABO system: A, B, AB, O with antibodies; Rh: Rh⁺/Rh⁻ — erythroblastosis fetalis risk in Rh⁻ mother + Rh⁺ baby.",
      "Heart: SA node (pacemaker) → AV node → bundle of His → Purkinje fibres.",
      "Cardiac cycle: atrial systole, ventricular systole, joint diastole; heart rate ~72/min.",
      "ECG: P wave (atrial depolarisation), QRS (ventricular depolarisation), T wave (ventricular repolarisation).",
    ],
    glossary: [
      { term: "Pacemaker", def: "SA node initiating the heartbeat.", hindi: "पेसमेकर" },
      { term: "Systole/Diastole", def: "Contraction / relaxation phases of the heart chambers.", hindi: "प्रकुंचन/प्रसारण" },
    ],
    mistakes: [
      "Giving blood group O both A and B antigens — O has neither, but both antibodies.",
      "Saying the QRS complex is atrial depolarisation — it's ventricular.",
    ],
    pyqs: [
      {
        q: "The natural pacemaker of the heart is:",
        options: ["SA node", "AV node", "Purkinje fibres", "Bundle of His"],
        answer: 0,
        explanation: "SA node sets the cardiac rhythm.",
      },
      {
        q: "A person with blood group AB has:",
        options: ["no antibodies", "anti-A only", "anti-B only", "anti-A and anti-B"],
        answer: 0,
        explanation: "AB blood has both antigens, so no antibodies.",
      },
    ],
    tip: "ABO tables are free marks — memorise antigens vs antibodies per group.",
  },
  "biology:biology-c16": {
    summary:
      "Excretory Products and their Elimination covers the kidney, nephron, urine formation and osmoregulation.",
    keyPoints: [
      "Human excretory system: kidneys, ureters, urinary bladder, urethra; nephron = functional unit.",
      "Nephron: Bowman's capsule, PCT, loop of Henle (descending/ascending), DCT, collecting duct.",
      "Urine formation: glomerular filtration (~180 L/day), reabsorption, tubular secretion.",
      "Countercurrent mechanism: loop of Henle + vasa recta concentrate urine.",
      "Regulation: ADH (water reabsorption), aldosterone (Na⁺ reabsorption, K⁺ excretion), ANF (opposes RAAS).",
    ],
    glossary: [
      { term: "Glomerular filtration", def: "Blood plasma filtered into Bowman's capsule at high pressure.", hindi: "ग्लोमेरुलर निस्यंदन" },
      { term: "Countercurrent mechanism", def: "Opposing flow in loop of Henle and vasa recta that concentrates urine.", hindi: "प्रतिधारा तंत्र" },
    ],
    mistakes: [
      "Saying ADH decreases water reabsorption — it increases it.",
      "Calling the descending limb impermeable to water — it is permeable to water, impermeable to salts.",
    ],
    pyqs: [
      {
        q: "ADH increases:",
        options: ["water reabsorption", "salt excretion", "blood pressure always", "urine volume"],
        answer: 0,
        explanation: "ADH makes collecting ducts reabsorb more water, concentrating urine.",
      },
      {
        q: "The countercurrent mechanism involves:",
        options: ["loop of Henle and vasa recta", "only PCT", "only glomerulus", "ureters"],
        answer: 0,
        explanation: "Opposing flows of filtrate and blood build the medullary gradient.",
      },
    ],
    tip: "One-line nephron map: filtration in Bowman's, bulk reabsorption in PCT, concentration in the loop.",
  },
  "biology:biology-c17": {
    summary:
      "Locomotion and Movement covers muscle types, the sliding filament theory, the skeleton and joints.",
    keyPoints: [
      "Muscle types: skeletal (striated, voluntary), smooth (unstriated, involuntary), cardiac (striated, involuntary).",
      "Sarcomere: Z-line to Z-line; actin (thin) and myosin (thick) filaments.",
      "Sliding filament: myosin heads pull actin; requires ATP and Ca²⁺; rigor mortis = no ATP after death.",
      "Skeleton: 206 bones; axial (skull, vertebral column, ribs) + appendicular (limbs, girdles).",
      "Joints: fibrous, cartilaginous, synovial (ball & socket, hinge, pivot).",
    ],
    glossary: [
      { term: "Sarcomere", def: "Functional unit of a myofibril between two Z-lines.", hindi: "सार्कोमियर" },
      { term: "Rigor mortis", def: "Muscle stiffening after death due to ATP absence.", hindi: "मृत्यु कठोरता" },
    ],
    mistakes: [
      "Calling cardiac muscle voluntary — it is involuntary.",
      "Saying troponin is absent in smooth muscle regulation — smooth muscle uses calmodulin instead.",
    ],
    pyqs: [
      {
        q: "The functional unit of muscle contraction is:",
        options: ["sarcomere", "myofibril", "muscle fibre", "sarcolemma"],
        answer: 0,
        explanation: "Sarcomeres between Z-lines shorten during contraction.",
      },
      {
        q: "Which muscle is voluntary and striated?",
        options: ["skeletal", "smooth", "cardiac", "visceral"],
        answer: 0,
        explanation: "Skeletal muscle is striated and under voluntary control.",
      },
    ],
    tip: "Contraction needs both ATP and Ca²⁺ — 'no ATP' explains rigor mortis questions.",
  },
  "biology:biology-c18": {
    summary:
      "Neural Control and Coordination covers neurons, nerve impulses, synapses, the nervous system and sense organs.",
    keyPoints: [
      "Neuron: dendrites, cell body, axon; myelin sheath speeds conduction (saltatory).",
      "Resting potential: −70 mV (Na⁺-K⁺ pump, K⁺ leak); action potential: Na⁺ in (depolarise), K⁺ out (repolarise).",
      "Synapse: chemical transmission via neurotransmitters (acetylcholine); summation and inhibition.",
      "CNS: brain (cerebrum, cerebellum, medulla) + spinal cord; PNS: cranial and spinal nerves; ANS: sympathetic (fight/flight) + parasympathetic.",
      "Reflex arc: receptor → sensory neuron → spinal cord → motor neuron → effector.",
    ],
    glossary: [
      { term: "Action potential", def: "Rapid depolarisation-repolarisation wave along the axon.", hindi: "क्रिया विभव" },
      { term: "Synapse", def: "Junction where a neuron signals another cell via neurotransmitters.", hindi: "सिनैप्स" },
    ],
    mistakes: [
      "Saying the resting membrane is positive inside — it's negative (−70 mV).",
      "Calling the sympathetic system 'rest and digest' — that's parasympathetic.",
    ],
    pyqs: [
      {
        q: "The resting membrane potential of a neuron is about:",
        options: ["−70 mV", "+70 mV", "0 mV", "+35 mV"],
        answer: 0,
        explanation: "K⁺ leak and Na⁺-K⁺ pump maintain ≈ −70 mV.",
      },
      {
        q: "Which system prepares the body for emergencies?",
        options: ["sympathetic", "parasympathetic", "somatic", "enteric"],
        answer: 0,
        explanation: "Sympathetic activation = fight-or-flight response.",
      },
    ],
    tip: "Depolarisation = Na⁺ in; repolarisation = K⁺ out — the two-ion story.",
  },
  "biology:biology-c19": {
    summary:
      "Chemical Coordination and Integration covers endocrine glands, hormones and their disorders.",
    keyPoints: [
      "Hypothalamus: releasing/inhibiting hormones controlling the pituitary.",
      "Pituitary: growth hormone, TSH, ACTH, FSH, LH, prolactin, oxytocin, ADH (posterior).",
      "Thyroid (T₃, T₄): metabolism; hypothyroidism → goitre/cretinism; hyper → Graves' disease.",
      "Adrenal: cortex (cortisol, aldosterone) + medulla (adrenaline — fight or flight).",
      "Pancreas: insulin (lowers glucose) and glucagon (raises it); diabetes mellitus from insulin deficiency.",
    ],
    glossary: [
      { term: "Hormone", def: "Chemical messenger transported by blood to target organs.", hindi: "हार्मोन" },
      { term: "Feedback regulation", def: "Hormone levels self-adjust (e.g. thyroid–TSH loop).", hindi: "पुनर्भरण विनियमन" },
    ],
    mistakes: [
      "Saying insulin increases blood glucose — glucagon does that.",
      "Putting oxytocin and ADH in the anterior pituitary — they come from the posterior lobe.",
    ],
    pyqs: [
      {
        q: "Insulin is secreted by:",
        options: ["beta cells of islets", "alpha cells", "thyroid", "adrenal medulla"],
        answer: 0,
        explanation: "β-cells make insulin; α-cells make glucagon.",
      },
      {
        q: "Graves' disease is due to:",
        options: ["thyroid overactivity", "thyroid underactivity", "insulin excess", "cortisol deficiency"],
        answer: 0,
        explanation: "Excess thyroid hormone causes Graves' disease.",
      },
    ],
    tip: "Build a hormone↔gland↔effect↔disorder table — it's the entire exam for this chapter.",
  },
  "biology:biology-c20": {
    summary:
      "Sexual Reproduction in Flowering Plants covers gametophytes, pollination, double fertilisation and seed development.",
    keyPoints: [
      "Microsporogenesis: pollen mother cells → microspores → pollen grains (male gametophyte).",
      "Megasporogenesis: one functional megaspore → embryo sac (8-nucleate, 7-celled).",
      "Pollination: self vs cross; agents — wind (anemophily), insects (entomophily), birds, water.",
      "Double fertilisation: one sperm + egg → zygote; second sperm + polar nuclei → endosperm (3n).",
      "Post-fertilisation: ovule → seed, ovary → fruit; apomixis (asexual seeds) and polyembryony.",
    ],
    glossary: [
      { term: "Double fertilisation", def: "Both sperm fuse — one with egg, one with polar nuclei.", hindi: "द्वि-निषेचन" },
      { term: "Endosperm", def: "Triploid nutritive tissue feeding the embryo.", hindi: "भ्रूणपोष" },
    ],
    mistakes: [
      "Saying the embryo sac is diploid — the mature embryo sac is haploid.",
      "Calling endosperm diploid — it is triploid (3n) in angiosperms.",
    ],
    pyqs: [
      {
        q: "Endosperm of angiosperms is:",
        options: ["triploid", "diploid", "haploid", "tetraploid"],
        answer: 0,
        explanation: "Fusion of one sperm with two polar nuclei gives 3n endosperm.",
      },
      {
        q: "Pollination by insects is called:",
        options: ["entomophily", "anemophily", "hydrophily", "ornithophily"],
        answer: 0,
        explanation: "Insect pollination = entomophily.",
      },
    ],
    tip: "Double fertilisation: 1 zygote (2n) + 1 endosperm (3n) — always recheck ploidy.",
  },
  "biology:biology-c21": {
    summary:
      "Human Reproduction covers the reproductive systems, gametogenesis, the menstrual cycle, fertilisation and pregnancy.",
    keyPoints: [
      "Male system: testes (spermatogenesis), epididymis, vas deferens, seminal vesicles, prostate.",
      "Female system: ovaries, oviducts (fallopian tubes), uterus, cervix, vagina; mammary glands.",
      "Spermatogenesis: in seminiferous tubules, 64 days; primary spermatocyte (2n) → 4 spermatids (n).",
      "Oogenesis: begins in foetal life; arrests at prophase I; completed at fertilisation.",
      "Menstrual cycle: menstrual → follicular → ovulation (day 14) → luteal; LH surge triggers ovulation; corpus luteum secretes progesterone.",
    ],
    glossary: [
      { term: "Gametogenesis", def: "Formation of gametes (spermatogenesis/oogenesis).", hindi: "युग्मकजनन" },
      { term: "Corpus luteum", def: "Progesterone-secreting structure from the ruptured follicle.", hindi: "पीत पिंड" },
    ],
    mistakes: [
      "Saying oogenesis is completed before birth — it arrests and finishes later.",
      "Calling the LH surge a follicular-phase event — it triggers ovulation at mid-cycle.",
    ],
    pyqs: [
      {
        q: "Ovulation occurs around which day of a 28-day cycle?",
        options: ["14", "7", "21", "28"],
        answer: 0,
        explanation: "LH surge around day 14 releases the secondary oocyte.",
      },
      {
        q: "Spermatogenesis occurs in:",
        options: ["seminiferous tubules", "epididymis", "prostate", "vas deferens"],
        answer: 0,
        explanation: "Seminiferous tubules of the testes make sperm.",
      },
    ],
    tip: "Draw the menstrual cycle as a line with four phases and one hormone per phase.",
  },
  "biology:biology-c22": {
    summary:
      "Reproductive Health covers population control, contraception, MTP, STDs and assisted reproductive technologies.",
    keyPoints: [
      "Population explosion: need for family planning; reproductive health = total well-being of reproductive systems.",
      "Contraception: natural (rhythm, withdrawal), barrier (condoms, diaphragm), IUDs (Cu-T), hormonal pills, surgical (vasectomy, tubectomy).",
      "MTP: safe, legal termination of pregnancy; done to avoid unwanted births and foetal risks.",
      "STDs: syphilis, gonorrhoea, AIDS, genital herpes — preventable by barrier methods.",
      "ART: IVF-ET, ZIFT, GIFT, ICSI, AI, surrogacy — for infertility treatment.",
    ],
    glossary: [
      { term: "IUD", def: "Intrauterine device (e.g. Cu-T) preventing implantation/pregnancy.", hindi: "अंतर्गर्भाशयी युक्ति" },
      { term: "IVF", def: "Fertilisation of egg and sperm outside the body, embryo transferred to uterus.", hindi: "टेस्ट-ट्यूब शिशु विधि" },
    ],
    mistakes: [
      "Saying MTP is done for sex selection — it's for safe termination, not sex determination.",
      "Calling all STDs curable — viral ones (AIDS, herpes) are not fully curable.",
    ],
    pyqs: [
      {
        q: "Cu-T is an example of:",
        options: ["IUD", "barrier", "hormonal pill", "surgical method"],
        answer: 0,
        explanation: "Copper-T is an intrauterine device.",
      },
      {
        q: "A permanent contraceptive method is:",
        options: ["vasectomy", "condoms", "Cu-T", "oral pills"],
        answer: 0,
        explanation: "Vasectomy (male) and tubectomy (female) are surgical and permanent.",
      },
    ],
    tip: "Match each contraceptive to its category — natural/barrier/IUD/hormonal/surgical.",
  },
  "biology:biology-c23": {
    summary:
      "Principles of Inheritance and Variation covers Mendel's laws, crosses, gene interactions, linkage, sex determination and mutations.",
    keyPoints: [
      "Mendel's laws: dominance, segregation, independent assortment (dihybrid 9:3:3:1).",
      "Monohybrid: 3:1 phenotypic, 1:2:1 genotypic; test cross reveals genotype.",
      "Incomplete dominance (4 o'clock: 1:2:1), codominance (ABO), multiple alleles.",
      "Linkage: genes on the same chromosome inherit together; crossing over breaks linkage.",
      "Sex determination: humans XY (male heterogametic); chromosomal disorders — Down (trisomy 21), Turner (XO), Klinefelter (XXY).",
    ],
    formulas: [
      { name: "Dihybrid ratio", formula: "9 : 3 : 3 : 1 (independent assortment)" },
      { name: "Monohybrid ratio", formula: "3 : 1 (F₂ phenotype)" },
    ],
    glossary: [
      { term: "Allele", def: "Alternative form of a gene at the same locus.", hindi: "युग्म विकल्पी" },
      { term: "Linkage", def: "Tendency of genes on one chromosome to inherit together.", hindi: "जीन संबंधन" },
    ],
    mistakes: [
      "Using 9:3:3:1 for monohybrid crosses — that's the dihybrid F₂.",
      "Calling Turner syndrome XXY — Turner is XO; Klinefelter is XXY.",
    ],
    pyqs: [
      {
        q: "The F₂ phenotypic ratio of a monohybrid cross is:",
        options: ["3:1", "9:3:3:1", "1:2:1", "1:1"],
        answer: 0,
        explanation: "Dominant:recessive = 3:1 in monohybrid F₂.",
      },
      {
        q: "Klinefelter's syndrome has the genotype:",
        options: ["XXY", "XO", "XXX", "XYY"],
        answer: 0,
        explanation: "XXY males with small testes and gynaecomastia.",
      },
    ],
    tip: "Memorise the five classic ratios: 3:1, 1:2:1, 9:3:3:1, 1:1, 1:1:1:1 — match the cross.",
  },
  "biology:biology-c24": {
    summary:
      "Molecular Basis of Inheritance covers DNA structure, replication, transcription, translation, the genetic code and the lac operon.",
    keyPoints: [
      "DNA: double helix, antiparallel, A=T & G≡C (Chargaff), Watson & Crick; packaging with histones → nucleosomes.",
      "Replication: semi-conservative (Meselson-Stahl); DNA polymerase adds 5'→3'; leading/lagging strands.",
      "Transcription: DNA → RNA by RNA polymerase; in eukaryotes hnRNA processed (splicing) to mRNA.",
      "Genetic code: triplet, degenerate, universal, non-overlapping; AUG start, UAA/UAG/UGA stop.",
      "Lac operon: inducer (lactose) removes repressor → structural genes express; regulation of gene expression.",
    ],
    glossary: [
      { term: "Nucleosome", def: "DNA wrapped around histone octamer — packaging unit.", hindi: "न्यूक्लियोसोम" },
      { term: "Genetic code", def: "Triplet codons mapping mRNA to amino acids.", hindi: "आनुवंशिक कूट" },
    ],
    mistakes: [
      "Saying DNA polymerase builds 3'→5' — synthesis is always 5'→3'.",
      "Calling the code overlapping — it is non-overlapping and comma-less.",
    ],
    pyqs: [
      {
        q: "DNA replication is:",
        options: ["semi-conservative", "conservative", "dispersive", "random"],
        answer: 0,
        explanation: "Meselson & Stahl proved semi-conservative replication.",
      },
      {
        q: "The start codon is:",
        options: ["AUG", "UAA", "UAG", "UGA"],
        answer: 0,
        explanation: "AUG codes for methionine and starts translation.",
      },
    ],
    tip: "The four code facts — triplet, degenerate, universal, non-overlapping — are guaranteed NEET lines.",
  },
  "biology:biology-c25": {
    summary:
      "Evolution covers the origin of life, evidence, natural selection, speciation and the Hardy-Weinberg principle.",
    keyPoints: [
      "Origin of life: Oparin-Haldane + Miller-Urey experiment synthesised amino acids from inorganic gases.",
      "Evidence: fossils, homologous organs (common ancestor), analogous organs (convergent), embryological.",
      "Natural selection: Darwin; peppered moth (industrial melanism), antibiotic resistance.",
      "Speciation: reproductive isolation + genetic drift + natural selection; adaptive radiation (Darwin's finches).",
      "Hardy-Weinberg: p² + 2pq + q² = 1; allele frequencies stable without mutation, selection, drift, migration.",
    ],
    formulas: [
      { name: "Hardy-Weinberg", formula: "p² + 2pq + q² = 1, p + q = 1" },
    ],
    glossary: [
      { term: "Homologous organs", def: "Same origin, different functions (forelimbs of vertebrates).", hindi: "समजात अंग" },
      { term: "Adaptive radiation", def: "One ancestral form diversifying into many ecological niches.", hindi: "अनुकूली विकिरण" },
    ],
    mistakes: [
      "Calling homologous organs evidence of convergent evolution — they show divergent evolution.",
      "Saying mutation rates alone drive Hardy-Weinberg equilibrium — mutation breaks equilibrium.",
    ],
    pyqs: [
      {
        q: "Hardy-Weinberg equilibrium is disturbed by:",
        options: ["natural selection", "random mating", "large population", "no migration"],
        answer: 0,
        explanation: "Selection changes allele frequencies; the equilibrium assumes none.",
      },
      {
        q: "Industrial melanism in moths is an example of:",
        options: ["natural selection", "genetic drift", "mutation", "migration"],
        answer: 0,
        explanation: "Dark moths survived sooty trees — selection acting on variation.",
      },
    ],
    tip: "HH equation: if p = 0.7, then q = 0.3 and heterozygotes = 2pq = 0.42 — practice this once.",
  },
  "biology:biology-c26": {
    summary:
      "Human Health and Disease covers pathogens, immunity, AIDS, cancer and drug abuse.",
    keyPoints: [
      "Infectious diseases: typhoid (Salmonella), pneumonia (Streptococcus), malaria (Plasmodium via Anopheles), dengue (Aedes).",
      "Immunity: innate (non-specific) + acquired (specific); humoral (antibodies) vs cell-mediated (T-cells).",
      "Vaccines: passive (ready antibodies) vs active (antigen exposure); memory cells give long immunity.",
      "AIDS: HIV attacks helper T-cells; transmitted by blood, sex, mother to child — not by touch/sharing utensils.",
      "Cancer: uncontrolled cell division; oncogenes; treatments — surgery, radiation, chemo, immunotherapy.",
    ],
    glossary: [
      { term: "Antibody", def: "Protein (immunoglobulin) binding specific antigens.", hindi: "प्रतिरक्षी" },
      { term: "Vaccination", def: "Exposure to weakened antigen building active immunity.", hindi: "टीकाकरण" },
    ],
    mistakes: [
      "Saying HIV spreads by mosquito bites — it does not.",
      "Calling innate immunity specific — it is non-specific (skin, phagocytes, inflammation).",
    ],
    pyqs: [
      {
        q: "Malaria is caused by:",
        options: ["Plasmodium", "Salmonella", "Streptococcus", "Wuchereria"],
        answer: 0,
        explanation: "Plasmodium, transmitted by Anopheles mosquito, causes malaria.",
      },
      {
        q: "HIV primarily destroys:",
        options: ["helper T-cells", "red blood cells", "platelets", "neurons"],
        answer: 0,
        explanation: "HIV targets CD4⁺ helper T-cells, collapsing immunity.",
      },
    ],
    tip: "Disease↔pathogen↔vector tables are the highest-yield revision in this chapter.",
  },
  "biology:biology-c27": {
    summary:
      "Microbes in Human Welfare shows how microbes make household products, industrial goods, biogas and agriculture helpers.",
    keyPoints: [
      "Household: curd (Lactobacillus), dough fermentation (yeast), cheese, idli/dosa batter.",
      "Industrial: antibiotics (Penicillium), organic acids (Aspergillus → citric acid), enzymes (lipase, protease in detergents).",
      "Ethanol by Saccharomyces cerevisiae; beverages from fermentation.",
      "Sewage treatment: primary (physical) + secondary (biological, BOD drop); biogas (methanogens) from sludge.",
      "Biocontrol (Trichoderma, Baculovirus) and biofertilisers (Rhizobium, Azotobacter, mycorrhiza, BGA).",
    ],
    glossary: [
      { term: "BOD", def: "Oxygen needed to decompose organic matter — lower BOD = cleaner water.", hindi: "BOD" },
      { term: "Biofertiliser", def: "Living organisms enriching soil nutrients (Rhizobium, BGA).", hindi: "जैव उर्वरक" },
    ],
    mistakes: [
      "Saying biogas is produced in the primary clarifier — methanogens act in anaerobic sludge digesters.",
      "Calling antibiotics produced by bacteria only — Penicillium is a fungus.",
    ],
    pyqs: [
      {
        q: "Curd is formed by:",
        options: ["Lactobacillus", "Saccharomyces", "Rhizobium", "Penicillium"],
        answer: 0,
        explanation: "Lactobacillus ferments milk into curd.",
      },
      {
        q: "Biogas mainly contains:",
        options: ["methane", "CO₂", "hydrogen", "oxygen"],
        answer: 0,
        explanation: "Methanogens produce methane-rich biogas.",
      },
    ],
    tip: "One microbe ↔ one product: Lactobacillus-curd, Penicillium-penicillin, Saccharomyces-ethanol.",
  },
  "biology:biology-c28": {
    summary:
      "Biotechnology: Principles and Processes covers the tools — restriction enzymes, cloning vectors, PCR, gel electrophoresis.",
    keyPoints: [
      "Genetic engineering: cut (restriction enzymes), join (ligase), insert (vector), amplify (PCR/cloning).",
      "Restriction enzymes: cut at palindromic sequences; EcoRI leaves sticky ends.",
      "Cloning vectors: origin of replication, selectable markers (ampicillin resistance), MCS; pBR322, pUC19.",
      "PCR: denaturation (94 °C) → annealing (primers) → extension (Taq polymerase) — amplifies DNA in vitro.",
      "Gel electrophoresis: DNA moves to anode through agarose; ethidium bromide stains it; Southern blotting detects it.",
    ],
    glossary: [
      { term: "Restriction enzyme", def: "Molecular scissors cutting DNA at specific palindromic sites.", hindi: "प्रतिबंध एंजाइम" },
      { term: "Vector", def: "DNA carrier (plasmid) ferrying the gene of interest.", hindi: "वाहक" },
      { term: "PCR", def: "Polymerase chain reaction amplifying a DNA segment.", hindi: "PCR" },
    ],
    mistakes: [
      "Saying ligase cuts DNA — ligase joins; restriction enzymes cut.",
      "Giving sticky ends to blunt-cut enzymes like SmaI — SmaI makes blunt ends.",
    ],
    pyqs: [
      {
        q: "Restriction enzymes cut DNA at:",
        options: ["palindromic sequences", "random sites", "telomeres", "centromeres"],
        answer: 0,
        explanation: "Recognition sites are palindromic, e.g. GAATTC for EcoRI.",
      },
      {
        q: "Taq polymerase is used in PCR because it:",
        options: ["is thermostable", "works at low temperature", "is a ligase", "unwinds DNA"],
        answer: 0,
        explanation: "Taq survives the 94 °C denaturation step.",
      },
    ],
    tip: "Remember the toolbox order: cut with restriction enzyme, insert with ligase, multiply with PCR.",
  },
  "biology:biology-c29": {
    summary:
      "Biotechnology and its Applications covers GM crops, Bt cotton, recombinant insulin, gene therapy and ethical issues.",
    keyPoints: [
      "GM crops: inserted genes for pest resistance, increased nutrition; golden rice (pro-vitamin A).",
      "Bt cotton: cry genes from Bacillus thuringiensis produce Bt toxin killing bollworms.",
      "RNAi: silences parasite genes (nematode-resistant tobacco).",
      "Recombinant insulin (Humulin): E. coli with human insulin genes — first biotech medicine.",
      "Gene therapy: correct defective genes (adenosine deaminase deficiency); ethics — patents, GM safety, biopiracy.",
    ],
    glossary: [
      { term: "Bt toxin", def: "Insecticidal protein from Bacillus thuringiensis, harmless to humans.", hindi: "Bt विष" },
      { term: "RNA interference", def: "Silencing gene expression with complementary RNA.", hindi: "RNA हस्तक्षेप" },
      { term: "Gene therapy", def: "Correcting defective genes to treat disease.", hindi: "जीन चिकित्सा" },
    ],
    mistakes: [
      "Saying Bt toxin is produced by the plant's own genes — it's the bacterial cry gene inserted.",
      "Calling golden rice protein-rich — it is provitamin-A enriched.",
    ],
    pyqs: [
      {
        q: "Bt cotton is resistant to:",
        options: ["insect pests", "fungi", "viruses", "herbicides only"],
        answer: 0,
        explanation: "Bt toxin kills bollworms and other chewing pests.",
      },
      {
        q: "The first clinical gene therapy treated:",
        options: ["adenosine deaminase deficiency", "diabetes", "cancer", "thalassemia"],
        answer: 0,
        explanation: "ADA deficiency was the first gene-therapy target (1990).",
      },
    ],
    tip: "For application MCQs, link the product to its purpose: Bt→pest, insulin→diabetes, RNAi→nematode.",
  },
  "biology:biology-c30": {
    summary:
      "Organisms and Populations covers habitat, niche, population attributes, growth models and species interactions.",
    keyPoints: [
      "Habitat: where a species lives; niche: its role/function (including resource use).",
      "Population attributes: density, natality, mortality, age structure, sex ratio, dispersal.",
      "Growth models: exponential (J-shaped, r) and logistic (S-shaped, with K carrying capacity).",
      "Interactions: predation, competition (Gause's exclusion), parasitism, commensalism, mutualism, amensalism.",
      "Adaptations: physiological (desert), behavioural (migration), morphological (camouflage).",
    ],
    formulas: [
      { name: "Exponential growth", formula: "dN/dt = rN" },
      { name: "Logistic growth", formula: "dN/dt = rN(K − N)/K" },
    ],
    glossary: [
      { term: "Niche", def: "Functional role of a species in its ecosystem.", hindi: "पारिस्थितिक निकेत" },
      { term: "Carrying capacity", def: "Maximum population an environment can sustain (K).", hindi: "धारण क्षमता" },
    ],
    mistakes: [
      "Confusing habitat with niche — habitat is the address, niche is the profession.",
      "Saying predation always harms the prey population — predators often remove the weak, aiding regulation.",
    ],
    pyqs: [
      {
        q: "Logistic growth levels off at:",
        options: ["carrying capacity K", "zero", "r", "infinity"],
        answer: 0,
        explanation: "The (K−N)/K term slows growth as N approaches K.",
      },
      {
        q: "Barnacles on a whale's skin is an example of:",
        options: ["commensalism", "parasitism", "mutualism", "competition"],
        answer: 0,
        explanation: "Barnacles benefit, the whale is unaffected — commensalism.",
      },
    ],
    tip: "Interaction pairs: +/0 commensalism, +/− parasitism, +/+ mutualism, −/− competition.",
  },
  "biology:biology-c31": {
    summary:
      "Ecosystem covers components, productivity, decomposition, energy flow, nutrient cycling and succession.",
    keyPoints: [
      "Components: abiotic + biotic (producers, consumers, decomposers); detritus food chain vs grazing food chain.",
      "Productivity: GPP (total fixed) − R = NPP; productivity limited by light, water, nutrients.",
      "Decomposition: detritivores + decomposers; humus; slowed by anaerobic/cold conditions.",
      "Energy flow: 10% law (Lindeman) — only ~10% transfers between trophic levels.",
      "Nutrient cycling: carbon, nitrogen, phosphorus cycles; succession: hydrarch → xerarch to climax.",
    ],
    formulas: [
      { name: "Net primary productivity", formula: "NPP = GPP − R" },
      { name: "10% law", formula: "Energy to next level ≈ 10% of previous" },
    ],
    glossary: [
      { term: "Trophic level", def: "Feeding position in a food chain (producer, primary consumer…).", hindi: "पोषी स्तर" },
      { term: "Biomagnification", def: "Concentration of toxins rising up the food chain.", hindi: "जैव आवर्धन" },
    ],
    mistakes: [
      "Saying energy is recycled — matter cycles; energy flows one-way.",
      "Putting decomposers in a trophic level of the food chain — they are outside it, cycling nutrients.",
    ],
    pyqs: [
      {
        q: "Only about what percentage of energy transfers between trophic levels?",
        options: ["10%", "50%", "90%", "1%"],
        answer: 0,
        explanation: "Lindeman's 10% law governs ecological pyramids.",
      },
      {
        q: "GPP minus respiration equals:",
        options: ["NPP", "biomass", "detritus", "secondary production"],
        answer: 0,
        explanation: "NPP = GPP − R is what plants actually store.",
      },
    ],
    tip: "Pyramid of energy is always upright; numbers and biomass pyramids can be inverted.",
  },
  "biology:biology-c32": {
    summary:
      "Biodiversity and Conservation covers biodiversity patterns, losses, hotspots and conservation strategies.",
    keyPoints: [
      "Biodiversity: genetic, species, ecological diversity; tropical regions hold maximum.",
      "Patterns: species richness increases towards the tropics; latitudinal gradient.",
      "Losses: habitat loss (biggest cause), over-exploitation, invasive species, pollution, climate change.",
      "Hotspots: 34 globally; India — Eastern Himalayas, Indo-Burma, Western Ghats & Sri Lanka.",
      "Conservation: in-situ (national parks, sanctuaries, biosphere reserves) and ex-situ (zoos, botanical gardens, seed banks).",
    ],
    glossary: [
      { term: "Biodiversity hotspot", def: "High endemic species + high threat region.", hindi: "जैव विविधता हॉटस्पॉट" },
      { term: "Endemism", def: "Species found only in one region.", hindi: "स्थानिकता" },
    ],
    mistakes: [
      "Saying in-situ means zoos — in-situ conserves in natural habitats; zoos are ex-situ.",
      "Calling Western Ghats the only Indian hotspot — India has four regions in three hotspots.",
    ],
    pyqs: [
      {
        q: "The greatest threat to biodiversity is:",
        options: ["habitat loss", "pollution", "climate change", "hunting"],
        answer: 0,
        explanation: "Habitat destruction fragments populations fastest.",
      },
      {
        q: "Biosphere reserves are an example of:",
        options: ["in-situ conservation", "ex-situ conservation", "both equally", "captive breeding"],
        answer: 0,
        explanation: "Protected natural areas conserve species in their habitats.",
      },
    ],
    tip: "Match conservation type to location: parks/sanctuaries = in-situ; zoos/banks = ex-situ.",
  },
  "biology:biology-c33": {
    summary:
      "Environmental Issues covers pollution, waste, climate change and deforestation with their control measures.",
    keyPoints: [
      "Air pollution: particulate matter, SO₂ (acid rain), smog; control via electrostatic precipitators, scrubbers.",
      "Water pollution: BOD and COD measure organic load; algal blooms; biomagnification of DDT.",
      "Solid waste: landfills, incineration, recycling; e-waste contains heavy metals needing special handling.",
      "Global warming: greenhouse gases (CO₂, CH₄, N₂O, CFCs); sea-level rise, climate change.",
      "Deforestation: soil erosion, biodiversity loss; measures — afforestation, Chipko movement, joint forest management.",
    ],
    glossary: [
      { term: "BOD", def: "Biochemical oxygen demand — higher BOD means more pollution.", hindi: "BOD" },
      { term: "Biomagnification", def: "Toxin concentration rising through the food chain.", hindi: "जैव आवर्धन" },
      { term: "Acid rain", def: "Rain acidified by SO₂ and NOₓ.", hindi: "अम्ल वर्षा" },
    ],
    mistakes: [
      "Saying high BOD means clean water — high BOD signals heavy organic pollution.",
      "Calling CO₂ the only greenhouse gas — methane and CFCs are stronger per molecule.",
    ],
    pyqs: [
      {
        q: "Acid rain is mainly caused by:",
        options: ["SO₂ and NOₓ", "CO₂ only", "CH₄", "O₃"],
        answer: 0,
        explanation: "Oxides of sulphur and nitrogen acidify rain.",
      },
      {
        q: "Electrostatic precipitators control:",
        options: ["particulate air pollution", "water pollution", "noise", "radiation"],
        answer: 0,
        explanation: "They charge and collect particulate matter from flue gases.",
      },
    ],
    tip: "Pair each pollutant with its effect: SO₂→acid rain, CFC→ozone hole, DDT→biomagnification.",
  },
};
