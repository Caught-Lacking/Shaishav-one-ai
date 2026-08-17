// Physics knowledge — keyed by "physics:<chapterId>"

import type { ChapterKnowledge } from "./index";

export const PHYSICS_KNOWLEDGE: Record<string, ChapterKnowledge> = {
  "physics:physics-c1": {
    summary:
      "Units & Measurements sets the language of physics — SI units, dimensions and error analysis. It is a small chapter with big marks in both NEET and JEE.",
    keyPoints: [
      "Seven base SI quantities: length (m), mass (kg), time (s), current (A), temperature (K), amount (mol), luminous intensity (cd).",
      "Dimensions of common quantities: force [MLT⁻²], work [ML²T⁻²], pressure [ML⁻¹T⁻²].",
      "Dimensional analysis checks equations and derives relations, but constants like k in F = kma can't be found by it.",
      "Accuracy vs precision: accuracy is closeness to true value; precision is consistency of measurements.",
      "Vernier calliper least count = 1 MSD − 1 VSD; screw gauge LC = pitch ÷ number of circular divisions.",
    ],
    formulas: [
      { name: "Dimensional formula", formula: "Derive from the defining relation, e.g. v = s/t → [LT⁻¹]" },
      { name: "Vernier least count", formula: "LC = 1 MSD − 1 VSD = 0.1 mm (standard calliper)" },
      { name: "Screw gauge least count", formula: "LC = pitch / (divisions on circular scale)" },
    ],
    glossary: [
      { term: "Dimension", def: "Powers to which base quantities are raised in a physical quantity.", hindi: "विमा" },
      { term: "Least count", def: "Smallest value a measuring instrument can read.", hindi: "अल्पतमांक" },
      { term: "Significant figures", def: "Digits that carry meaningful information about precision, including the last uncertain digit.", hindi: "सार्थक अंक" },
    ],
    mistakes: [
      "Forgetting that zero at the end of a number is significant only if it comes after the decimal (e.g. 4500 vs 4.500 × 10³).",
      "Applying dimensional analysis to find dimensionless constants — it cannot do that.",
    ],
    pyqs: [
      {
        q: "The dimensional formula of Planck's constant h is:",
        options: ["[ML²T⁻¹]", "[ML²T⁻²]", "[MLT⁻¹]", "[ML⁻¹T²]"],
        answer: 0,
        explanation: "E = hν gives h = E/ν = [ML²T⁻²]/[T⁻¹] = [ML²T⁻¹].",
      },
      {
        q: "A vernier calliper has 20 divisions on its vernier scale matching 19 main scale divisions, each of 1 mm. Its least count is:",
        options: ["0.05 mm", "0.1 mm", "0.01 mm", "0.5 mm"],
        answer: 0,
        explanation: "LC = 1 MSD − 1 VSD = 1 − 19/20 = 0.05 mm.",
      },
    ],
    tip: "Memorise 10–12 standard dimensional formulae — nearly every year one direct question appears.",
  },
  "physics:physics-c2": {
    summary:
      "Motion in a Straight Line builds kinematics on distance, displacement, velocity and acceleration, ending with the three equations of motion and their graphs.",
    keyPoints: [
      "Displacement is a vector (change in position); distance is the scalar path length.",
      "Average velocity = displacement/time; average speed = distance/time — equal only if motion is straight-line without reversal.",
      "Three equations of uniform acceleration: v = u + at, s = ut + ½at², v² = u² + 2as.",
      "Slope of position–time graph = velocity; slope of velocity–time graph = acceleration; area under v–t graph = displacement.",
      "In free fall, a = g ≈ 9.8 m/s² downward regardless of mass (ignoring air resistance).",
    ],
    formulas: [
      { name: "First equation", formula: "v = u + at" },
      { name: "Second equation", formula: "s = ut + ½at²" },
      { name: "Third equation", formula: "v² = u² + 2as" },
    ],
    glossary: [
      { term: "Acceleration", def: "Rate of change of velocity; SI unit m/s².", hindi: "त्वरण" },
      { term: "Free fall", def: "Motion under gravity alone, a = g.", hindi: "मुक्त पतन" },
    ],
    mistakes: [
      "Using distance in place of displacement in v = s/t when motion reverses direction.",
      "Forgetting the sign of g: take downward as negative consistently.",
    ],
    pyqs: [
      {
        q: "A body starts from rest and accelerates at 2 m/s². Its velocity after 5 s is:",
        options: ["10 m/s", "5 m/s", "25 m/s", "20 m/s"],
        answer: 0,
        explanation: "v = u + at = 0 + 2 × 5 = 10 m/s.",
      },
      {
        q: "A ball is thrown up with 20 m/s. The maximum height reached is (g = 10 m/s²):",
        options: ["20 m", "40 m", "10 m", "30 m"],
        answer: 0,
        explanation: "v² = u² − 2gh ⇒ 0 = 400 − 20h ⇒ h = 20 m.",
      },
    ],
    tip: "Draw the v–t graph for every kinematics problem — it often reveals the answer faster than algebra.",
  },
  "physics:physics-c3": {
    summary:
      "Motion in a Plane generalises kinematics to two dimensions: vectors, projectile motion and uniform circular motion.",
    keyPoints: [
      "Vectors add by triangle/parallelogram law; a vector multiplied by a scalar changes magnitude, not direction (sign flips if scalar is negative).",
      "Projectile: horizontal motion is uniform (u cosθ), vertical motion has constant g — the two are independent.",
      "Range R = u² sin2θ/g is maximum (Rmax = u²/g) at θ = 45°.",
      "Time of flight T = 2u sinθ/g; maximum height H = u² sin²θ/(2g).",
      "Uniform circular motion has constant speed but changing velocity; centripetal acceleration a = v²/r = ω²r directed to the centre.",
    ],
    formulas: [
      { name: "Range", formula: "R = u² sin2θ / g" },
      { name: "Max height", formula: "H = u² sin²θ / (2g)" },
      { name: "Time of flight", formula: "T = 2u sinθ / g" },
      { name: "Centripetal acceleration", formula: "a = v²/r = ω²r" },
    ],
    glossary: [
      { term: "Projectile", def: "Body projected in air following a parabolic path under gravity.", hindi: "प्रक्षेप्य" },
      { term: "Centripetal force", def: "Net inward force keeping a body in circular motion.", hindi: "अभिकेंद्र बल" },
    ],
    mistakes: [
      "Treating horizontal velocity as affected by gravity — it is constant (g has no horizontal component).",
      "Using θ = 45° as maximum range for all cases; it holds only for level ground.",
    ],
    pyqs: [
      {
        q: "A projectile's horizontal range is maximum when the angle of projection is:",
        options: ["45°", "30°", "60°", "90°"],
        answer: 0,
        explanation: "R ∝ sin2θ, and sin2θ peaks at 2θ = 90°, i.e. θ = 45°.",
      },
      {
        q: "For a particle in uniform circular motion, which quantity is constant?",
        options: ["Speed", "Velocity", "Acceleration", "Momentum"],
        answer: 0,
        explanation: "Direction changes continuously, so velocity, acceleration and momentum change; only speed stays constant.",
      },
    ],
    tip: "In projectile PYQs, resolve into x and y components first and write the two independent motions.",
  },
  "physics:physics-c4": {
    summary:
      "Laws of Motion covers Newton's three laws, momentum, friction and the dynamics needed to connect force with acceleration.",
    keyPoints: [
      "First law: bodies keep their state unless a net external force acts (defines inertia and inertial frames).",
      "Second law: F = dp/dt = ma (for constant mass).",
      "Third law: action and reaction are equal, opposite and act on different bodies — they never cancel.",
      "Impulse = F·Δt = change in momentum; area under F–t graph equals impulse.",
      "Friction: f = μN (kinetic), fs ≤ μsN (static); friction opposes relative motion, always parallel to the contact surface.",
    ],
    formulas: [
      { name: "Newton's second law", formula: "F = ma" },
      { name: "Impulse", formula: "J = FΔt = Δp" },
      { name: "Friction (kinetic)", formula: "f = μN" },
    ],
    glossary: [
      { term: "Inertia", def: "Tendency of a body to resist change in its state of motion.", hindi: "जड़त्व" },
      { term: "Impulse", def: "Force × time of action; equals change in momentum.", hindi: "आवेग" },
      { term: "Friction", def: "Force opposing relative motion between surfaces in contact.", hindi: "घर्षण" },
    ],
    mistakes: [
      "Cancelling action–reaction pairs as if they act on the same body.",
      "Forgetting that static friction is self-adjusting up to μsN — it is not always μsN.",
    ],
    pyqs: [
      {
        q: "A 2 kg mass accelerates at 3 m/s² under a net force of:",
        options: ["6 N", "1.5 N", "5 N", "9 N"],
        answer: 0,
        explanation: "F = ma = 2 × 3 = 6 N.",
      },
      {
        q: "A ball of mass 0.1 kg moving at 10 m/s stops in 0.01 s on a wall. The impulse on the ball is:",
        options: ["1 N·s", "0.1 N·s", "10 N·s", "0.01 N·s"],
        answer: 0,
        explanation: "J = Δp = 0 − (0.1 × 10) magnitude = 1 N·s (negative in direction of motion).",
      },
    ],
    tip: "Always draw a free-body diagram and write F = ma along each axis before substituting.",
  },
  "physics:physics-c5": {
    summary:
      "Work, Energy and Power connects force to energy — the work-energy theorem, conservation of mechanical energy, power and collisions.",
    keyPoints: [
      "Work W = F·s = Fs cosθ; work is zero when force ⊥ displacement (e.g. centripetal force, tension in a pendulum string at an instant).",
      "Work-energy theorem: net work = change in kinetic energy.",
      "Mechanical energy is conserved when only conservative forces act (gravity, spring).",
      "Power P = W/t = F·v; units: 1 hp = 746 W.",
      "Elastic collision: KE conserved; perfectly inelastic: bodies stick, max KE loss.",
    ],
    formulas: [
      { name: "Work", formula: "W = Fs cosθ" },
      { name: "Kinetic energy", formula: "KE = ½mv²" },
      { name: "Gravitational PE", formula: "PE = mgh" },
      { name: "Power", formula: "P = W/t = F·v" },
    ],
    glossary: [
      { term: "Conservative force", def: "Work done is path-independent; energy can be stored as PE (gravity, spring).", hindi: "संरक्षी बल" },
      { term: "Collision", def: "Interaction where bodies exchange momentum; elastic if KE is conserved.", hindi: "संघट्ट" },
    ],
    mistakes: [
      "Counting the sign of work wrongly: work done by friction is negative.",
      "Applying conservation of mechanical energy when friction or other non-conservative forces act.",
    ],
    pyqs: [
      {
        q: "A force of 10 N acts at 60° to displacement of 5 m. Work done is:",
        options: ["25 J", "50 J", "43.3 J", "12.5 J"],
        answer: 0,
        explanation: "W = 10 × 5 × cos60° = 50 × 0.5 = 25 J.",
      },
      {
        q: "A 2 kg body falls freely from 5 m. Its speed just before ground (g = 10 m/s²) is:",
        options: ["10 m/s", "5 m/s", "20 m/s", "7 m/s"],
        answer: 0,
        explanation: "mgh = ½mv² ⇒ v = √(2gh) = √100 = 10 m/s.",
      },
    ],
    tip: "In collisions, momentum is ALWAYS conserved — energy conservation applies only in elastic cases.",
  },
  "physics:physics-c6": {
    summary:
      "Rotational Motion introduces the centre of mass, torque, angular momentum and moment of inertia — rotation's version of linear dynamics.",
    keyPoints: [
      "Centre of mass of a system follows Newton's laws as if total mass were concentrated there.",
      "Torque τ = r × F = Iα; angular momentum L = r × p = Iω.",
      "Angular momentum is conserved when net external torque is zero (e.g. a spinning skater pulling arms in).",
      "Moment of inertia depends on mass distribution about the axis: I = Σmr², I = MK² (K = radius of gyration).",
      "Rolling without slipping: v = ωR; KE_total = ½mv²(1 + K²/R²).",
    ],
    formulas: [
      { name: "Torque", formula: "τ = Iα = rF sinθ" },
      { name: "Angular momentum", formula: "L = Iω" },
      { name: "Rod about centre", formula: "I = ML²/12; about end: I = ML²/3" },
      { name: "Disc/cylinder", formula: "I = ½MR²" },
    ],
    glossary: [
      { term: "Moment of inertia", def: "Rotational inertia; resistance to angular acceleration.", hindi: "जड़त्व आघूर्ण" },
      { term: "Torque", def: "Turning effect of a force; τ = r × F.", hindi: "बल आघूर्ण" },
    ],
    mistakes: [
      "Using the same I for different axes — always quote the axis with the value (e.g. rod about centre vs end).",
      "Applying conservation of angular momentum when a net external torque (like friction) acts.",
    ],
    pyqs: [
      {
        q: "A solid sphere rolls without slipping. The fraction of its KE that is rotational is:",
        options: ["2/7", "2/5", "1/2", "5/7"],
        answer: 0,
        explanation: "I = (2/5)MR², K²/R² = 2/5; rotational fraction = (2/5)/(1 + 2/5) = 2/7.",
      },
      {
        q: "Angular momentum of a system is conserved when:",
        options: ["net external torque is zero", "net external force is zero", "mechanical energy is zero", "moment of inertia is constant"],
        answer: 0,
        explanation: "τ_ext = dL/dt; if τ_ext = 0, L stays constant.",
      },
    ],
    tip: "Learn the standard I values (rod, ring, disc, sphere) — JEE/NEET assume you know them instantly.",
  },
  "physics:physics-c7": {
    summary:
      "Gravitation covers the universal law, g and its variation, gravitational potential, satellites, escape velocity and Kepler's laws.",
    keyPoints: [
      "F = Gm₁m₂/r² — universal, always attractive, independent of the medium between bodies.",
      "g decreases with height and depth: g' = g(1 − 2h/R) for h << R; g' = g(1 − d/R) at depth d; g is zero at Earth's centre.",
      "g is maximum at poles and minimum at the equator (rotation effect).",
      "Escape velocity ve = √(2gR) ≈ 11.2 km/s — independent of the mass of the body.",
      "Orbital velocity v = √(gR) for low orbits; geostationary satellites orbit at ~35,800 km above the equator.",
    ],
    formulas: [
      { name: "Gravitational force", formula: "F = Gm₁m₂/r²" },
      { name: "Escape velocity", formula: "ve = √(2GM/R) = √(2gR)" },
      { name: "Orbital velocity", formula: "v = √(GM/r)" },
      { name: "Gravitational PE", formula: "U = −GMm/r" },
    ],
    glossary: [
      { term: "Escape velocity", def: "Minimum speed to leave a body's gravitational pull without further propulsion.", hindi: "पलायन वेग" },
      { term: "Geostationary satellite", def: "Satellite over the equator with T = 24 h, appearing stationary.", hindi: "भूस्थैतिक उपग्रह" },
    ],
    mistakes: [
      "Taking g as constant in problems about height/depth variation — use the correction formulas.",
      "Confusing gravitational potential (−GM/r) with potential energy (−GMm/r).",
    ],
    pyqs: [
      {
        q: "The escape velocity from Earth's surface is about:",
        options: ["11.2 km/s", "7.9 km/s", "8.6 km/s", "9.8 km/s"],
        answer: 0,
        explanation: "ve = √(2gR) ≈ 11.2 km/s; 7.9 km/s is the low-orbit velocity.",
      },
      {
        q: "At the centre of the Earth, the acceleration due to gravity is:",
        options: ["zero", "g", "g/2", "2g"],
        answer: 0,
        explanation: "g' = g(1 − d/R); at d = R, g' = 0.",
      },
    ],
    tip: "Kepler's third law T² ∝ r³ is the basis of many satellite PYQs — spot the cube/square pattern.",
  },
  "physics:physics-c8": {
    summary:
      "Mechanical Properties of Solids covers stress, strain, Hooke's law and the elastic moduli (Young's, shear, bulk).",
    keyPoints: [
      "Stress = restoring force/area (N/m²); strain is dimensionless (fractional change).",
      "Hooke's law: within elastic limit, stress ∝ strain.",
      "Young's modulus Y = FL/(AΔL); describes stretching.",
      "Shear modulus G = shear stress/shear strain; bulk modulus B = −ΔP/(ΔV/V); compressibility = 1/B.",
      "Stress–strain curve: proportionality limit → elastic limit → yield point → breaking point; ductile vs brittle materials.",
    ],
    formulas: [
      { name: "Young's modulus", formula: "Y = FL / (AΔL)" },
      { name: "Bulk modulus", formula: "B = −VΔP / ΔV" },
      { name: "Elastic energy density", formula: "u = ½ × stress × strain = ½Y(strain)²" },
    ],
    glossary: [
      { term: "Stress", def: "Restoring force per unit area.", hindi: "प्रतिबल" },
      { term: "Strain", def: "Fractional deformation of a body.", hindi: "विकृति" },
      { term: "Elastic limit", def: "Maximum stress for which the body returns to its original shape.", hindi: "प्रत्यास्थ सीमा" },
    ],
    mistakes: [
      "Using force instead of force/area in modulus formulas.",
      "Forgetting that strain is unitless — answers are often pure ratios.",
    ],
    pyqs: [
      {
        q: "A wire of length 2 m and area 1 mm² stretches 1 mm under a 200 N load. Young's modulus is:",
        options: ["4 × 10¹¹ N/m²", "2 × 10¹¹ N/m²", "1 × 10¹¹ N/m²", "4 × 10¹⁰ N/m²"],
        answer: 0,
        explanation: "Y = FL/(AΔL) = 200 × 2 / (10⁻⁶ × 10⁻³) = 4 × 10¹¹ N/m².",
      },
      {
        q: "The ability of a material to be drawn into wires is called:",
        options: ["Ductility", "Malleability", "Elasticity", "Plasticity"],
        answer: 0,
        explanation: "Ductility is the ability to be drawn into thin wires; malleability is beating into sheets.",
      },
    ],
    tip: "Watch unit conversions (mm² → m², cm → m) — they are the favourite trap in these numericals.",
  },
  "physics:physics-c9": {
    summary:
      "Mechanical Properties of Fluids covers pressure, Pascal's law, buoyancy, viscosity, Bernoulli's theorem and surface tension.",
    keyPoints: [
      "Pascal's law: pressure applied to an enclosed fluid transmits equally in all directions (hydraulic lift).",
      "Archimedes' principle: buoyant force = weight of displaced fluid.",
      "Viscous force F = ηA(dv/dx); Stokes' law for a sphere F = 6πηrv; terminal velocity vₜ = 2r²(ρ−σ)g/(9η).",
      "Bernoulli: P + ½ρv² + ρgh = constant (ideal, streamline flow) — explains aerofoil lift and venturi.",
      "Surface tension γ = F/L (N/m); capillary rise h = 2γcosθ/(ρgr).",
    ],
    formulas: [
      { name: "Pressure", formula: "P = P₀ + ρgh" },
      { name: "Stokes' law", formula: "F = 6πηrv" },
      { name: "Terminal velocity", formula: "vₜ = 2r²(ρ − σ)g / 9η" },
      { name: "Bernoulli", formula: "P + ½ρv² + ρgh = constant" },
    ],
    glossary: [
      { term: "Buoyancy", def: "Upward force on a body immersed in a fluid, equal to the displaced fluid's weight.", hindi: "उत्प्लावन" },
      { term: "Viscosity", def: "Internal friction of a fluid opposing relative motion between layers.", hindi: "श्यानता" },
      { term: "Surface tension", def: "Force per unit length acting along a liquid surface.", hindi: "पृष्ठ तनाव" },
    ],
    mistakes: [
      "Using Bernoulli for turbulent or viscous flows — it assumes ideal, streamline flow.",
      "Forgetting that buoyancy depends on the fluid's density, not the body's.",
    ],
    pyqs: [
      {
        q: "A sphere falls through a viscous liquid. Its terminal velocity is proportional to:",
        options: ["r²", "r", "1/r", "r³"],
        answer: 0,
        explanation: "vₜ = 2r²(ρ−σ)g/(9η) ∝ r².",
      },
      {
        q: "Aeroplane wings experience lift mainly because of:",
        options: ["Bernoulli's principle", "Pascal's law", "Archimedes' principle", "Stokes' law"],
        answer: 0,
        explanation: "Faster air above the wing lowers pressure, creating net upward force (Bernoulli).",
      },
    ],
    tip: "The ½ρv² term appears constantly — remember Bernoulli's three terms: pressure + dynamic + potential.",
  },
  "physics:physics-c10": {
    summary:
      "Thermal Properties of Matter spans temperature, thermal expansion, calorimetry, heat transfer and Newton's law of cooling.",
    keyPoints: [
      "Linear expansion ΔL = L₀αΔT; area and volume expansion use 2α and 3α.",
      "Calorimetry: heat gained = heat lost; Q = mcΔT; latent heat Q = mL during phase change.",
      "Conduction Q/t = kAΔT/d; convection is fluid motion; radiation needs no medium (Stefan: P ∝ T⁴).",
      "Newton's law of cooling: rate of cooling ∝ temperature difference with surroundings.",
      "Water's anomalous expansion: maximum density at 4 °C.",
    ],
    formulas: [
      { name: "Linear expansion", formula: "ΔL = L₀ α ΔT" },
      { name: "Heat transfer (conduction)", formula: "Q/t = kAΔT/d" },
      { name: "Stefan-Boltzmann", formula: "P = σeAT⁴" },
    ],
    glossary: [
      { term: "Calorimetry", def: "Measurement of heat transfer using a calorimeter.", hindi: "कैलोरीमिति" },
      { term: "Latent heat", def: "Heat absorbed/released during a phase change at constant temperature.", hindi: "गुप्त ऊष्मा" },
    ],
    mistakes: [
      "Adding mcΔT during a phase change — use mL there.",
      "Treating blackbody emissivity e as 1 for every surface.",
    ],
    pyqs: [
      {
        q: "Heat required to melt 100 g of ice at 0 °C (L = 80 cal/g) is:",
        options: ["8000 cal", "800 cal", "80 cal", "1000 cal"],
        answer: 0,
        explanation: "Q = mL = 100 × 80 = 8000 cal.",
      },
      {
        q: "A copper rod conducts heat by:",
        options: ["Conduction", "Convection", "Radiation", "Advection"],
        answer: 0,
        explanation: "Solids transfer heat mainly by conduction (free electrons + lattice vibration).",
      },
    ],
    tip: "For calorimetry mixtures, write 'heat lost = heat gained' before touching numbers.",
  },
  "physics:physics-c11": {
    summary:
      "Thermodynamics is about heat, work and internal energy — the first law, processes, heat engines and the second law.",
    keyPoints: [
      "First law: ΔQ = ΔU + ΔW (heat added = internal energy change + work done by gas).",
      "Isothermal (T constant): ΔU = 0, Q = W; adiabatic (Q = 0): ΔU = −W; isochoric (V constant): W = 0.",
      "Work done by gas = area under P–V curve; cyclic process: ΔU = 0, net work = net heat.",
      "Second law: heat cannot flow spontaneously from cold to hot; efficiency of any engine < 100%.",
      "Carnot efficiency η = 1 − T₂/T₁ (absolute temperatures).",
    ],
    formulas: [
      { name: "First law", formula: "ΔQ = ΔU + ΔW" },
      { name: "Work in isothermal process", formula: "W = nRT ln(V₂/V₁)" },
      { name: "Carnot efficiency", formula: "η = 1 − T₂/T₁" },
    ],
    glossary: [
      { term: "Adiabatic process", def: "No heat exchange with surroundings (Q = 0).", hindi: "रुद्धोष्म प्रक्रम" },
      { term: "Isothermal process", def: "Constant temperature process.", hindi: "समतापी प्रक्रम" },
      { term: "Entropy", def: "Measure of disorder; isolated systems tend to increase it.", hindi: "एन्ट्रॉपी" },
    ],
    mistakes: [
      "Sign convention slips: work done BY the gas is positive in ΔQ = ΔU + ΔW (chemistry uses the opposite).",
      "Forgetting T must be in kelvin in Carnot efficiency.",
    ],
    pyqs: [
      {
        q: "In an isothermal expansion of an ideal gas:",
        options: ["ΔU = 0", "Q = 0", "ΔW = 0", "ΔT > 0"],
        answer: 0,
        explanation: "Internal energy of an ideal gas depends only on T, which is constant.",
      },
      {
        q: "A Carnot engine works between 400 K and 300 K. Its efficiency is:",
        options: ["25%", "75%", "33%", "50%"],
        answer: 0,
        explanation: "η = 1 − 300/400 = 0.25 = 25%.",
      },
    ],
    tip: "Draw the P–V diagram for process questions; the area under the curve IS the work.",
  },
  "physics:physics-c12": {
    summary:
      "Kinetic Theory explains gas behaviour statistically — the ideal gas equation, kinetic interpretation of temperature and equipartition.",
    keyPoints: [
      "Ideal gas: PV = nRT = NkT with k = R/NA = 1.38 × 10⁻²³ J/K.",
      "Pressure P = (1/3)ρv̄²; average KE per molecule = (3/2)kT — temperature is a measure of mean KE.",
      "RMS speed v_rms = √(3RT/M) — independent of pressure at fixed T.",
      "Equipartition: each quadratic degree of freedom contributes ½kT of energy.",
      "Mean free path λ = 1/(√2 πd²n) — decreases with density, increases with T at constant P.",
    ],
    formulas: [
      { name: "Ideal gas", formula: "PV = nRT = NkT" },
      { name: "RMS speed", formula: "v_rms = √(3RT/M)" },
      { name: "Mean KE of molecule", formula: "⟨KE⟩ = (3/2)kT" },
    ],
    glossary: [
      { term: "Degrees of freedom", def: "Independent ways a molecule can store energy (translation, rotation, vibration).", hindi: "स्वातंत्र्य कोटि" },
      { term: "Mean free path", def: "Average distance a molecule travels between collisions.", hindi: "माध्य मुक्त पथ" },
    ],
    mistakes: [
      "Using molar mass in g instead of kg in v_rms = √(3RT/M).",
      "Confusing rms speed with average or most probable speed.",
    ],
    pyqs: [
      {
        q: "The average kinetic energy of a gas molecule at temperature T is:",
        options: ["(3/2)kT", "(1/2)kT", "(3/2)RT", "kT"],
        answer: 0,
        explanation: "Kinetic interpretation of temperature gives ⟨KE⟩ = (3/2)kT per molecule.",
      },
      {
        q: "The rms speed of gas molecules is doubled when temperature (absolute) is:",
        options: ["quadrupled", "doubled", "halved", "tripled"],
        answer: 0,
        explanation: "v_rms ∝ √T, so T must quadruple to double the speed.",
      },
    ],
    tip: "v_rms ∝ √(T/M) is the single most-repeated ratio in this chapter.",
  },
  "physics:physics-c13": {
    summary:
      "Oscillations covers simple harmonic motion (SHM), its energy, pendulums, spring-mass systems and resonance.",
    keyPoints: [
      "SHM: F = −kx, a = −ω²x; displacement x = A sin(ωt + φ).",
      "In SHM, velocity leads displacement by 90°; acceleration is opposite to displacement.",
      "Total energy E = ½kA² is constant; KE and PE trade off sinusoidally at twice the frequency.",
      "Simple pendulum T = 2π√(L/g) (small angles); spring T = 2π√(m/k).",
      "Resonance: amplitude peaks when driving frequency equals natural frequency.",
    ],
    formulas: [
      { name: "SHM equation", formula: "x = A sin(ωt + φ)" },
      { name: "Pendulum period", formula: "T = 2π√(L/g)" },
      { name: "Spring period", formula: "T = 2π√(m/k)" },
      { name: "Total energy", formula: "E = ½kA² = ½mω²A²" },
    ],
    glossary: [
      { term: "Amplitude", def: "Maximum displacement from the mean position.", hindi: "आयाम" },
      { term: "Phase", def: "Argument of the sine function describing the state of oscillation.", hindi: "कला" },
      { term: "Resonance", def: "Large-amplitude response when driving frequency matches natural frequency.", hindi: "अनुनाद" },
    ],
    mistakes: [
      "Using T = 2π√(L/g) for large amplitudes — it is valid only for small oscillations.",
      "Forgetting that in SHM both KE and PE oscillate at 2× the SHM frequency.",
    ],
    pyqs: [
      {
        q: "A simple pendulum of length 1 m on Earth (g = π² m/s²) has a period of:",
        options: ["2 s", "1 s", "4 s", "π s"],
        answer: 0,
        explanation: "T = 2π√(1/π²) = 2 s.",
      },
      {
        q: "In SHM, the acceleration is maximum when:",
        options: ["displacement is maximum", "velocity is maximum", "KE is maximum", "phase is 90°"],
        answer: 0,
        explanation: "a = −ω²x, so a is maximum at extreme displacement.",
      },
    ],
    tip: "Remember the lead/lag relations: v leads x by 90°, a leads v by 90°.",
  },
  "physics:physics-c14": {
    summary:
      "Waves covers the wave equation, superposition, standing waves on strings, beats and the Doppler effect.",
    keyPoints: [
      "Wave speed on a string v = √(T/μ); sound speed v = √(B/ρ) in fluids.",
      "Standing waves on a string fixed at both ends: λₙ = 2L/n, frequencies fₙ = nv/(2L) (harmonics).",
      "Open organ pipe: all harmonics; closed pipe: only odd harmonics, f₁ = v/(4L).",
      "Beats: two close frequencies produce amplitude beats at f = |f₁ − f₂|.",
      "Doppler effect: apparent frequency changes when source/observer move; use sign conventions carefully.",
    ],
    formulas: [
      { name: "String wave speed", formula: "v = √(T/μ)" },
      { name: "String harmonics", formula: "fₙ = nv/(2L)" },
      { name: "Closed pipe fundamental", formula: "f₁ = v/(4L)" },
      { name: "Beat frequency", formula: "f = |f₁ − f₂|" },
    ],
    glossary: [
      { term: "Wavelength", def: "Distance between successive identical points of a wave.", hindi: "तरंगदैर्ध्य" },
      { term: "Doppler effect", def: "Change in observed frequency due to relative motion of source and observer.", hindi: "डॉपलर प्रभाव" },
    ],
    mistakes: [
      "Using fₙ = nv/(2L) for closed pipes — those allow only odd harmonics (fₙ = (2n−1)v/(4L)).",
      "Getting the Doppler sign wrong; define the direction from observer to source.",
    ],
    pyqs: [
      {
        q: "Two tuning forks of 512 Hz and 516 Hz sound together. The beat frequency is:",
        options: ["4 Hz", "514 Hz", "2 Hz", "8 Hz"],
        answer: 0,
        explanation: "Beats = |516 − 512| = 4 Hz.",
      },
      {
        q: "A string fixed at both ends vibrates in its fundamental mode. If its length is L, the fundamental wavelength is:",
        options: ["2L", "L", "L/2", "4L"],
        answer: 0,
        explanation: "λ₁ = 2L for a string with nodes at both ends.",
      },
    ],
    tip: "For standing waves, first identify boundary conditions (fixed/free) — that decides which harmonics exist.",
  },
  "physics:physics-c15": {
    summary:
      "Electric Charges and Fields introduces Coulomb's law, electric fields, dipoles, flux and Gauss's law.",
    keyPoints: [
      "Coulomb's law F = kq₁q₂/r² with k = 1/(4πε₀) ≈ 9 × 10⁹ N·m²/C²; like charges repel.",
      "Charge is quantised (e = 1.6 × 10⁻¹⁹ C) and conserved.",
      "Electric field E = F/q = kQ/r²; field lines never cross, start at + and end at −.",
      "Dipole: field on axis E = 2kp/r³, on equatorial line E = kp/r³ (p = q·2a).",
      "Gauss's law: Φ = ∮E·dA = q_enc/ε₀ — use it for spheres, cylinders, sheets (E = σ/(2ε₀)).",
    ],
    formulas: [
      { name: "Coulomb's law", formula: "F = kq₁q₂/r²" },
      { name: "Point charge field", formula: "E = kQ/r²" },
      { name: "Dipole axial field", formula: "E = 2kp/r³" },
      { name: "Gauss's law", formula: "Φ = q_enc/ε₀" },
    ],
    glossary: [
      { term: "Electric dipole", def: "Pair of equal and opposite charges separated by a small distance.", hindi: "विद्युत द्विध्रुव" },
      { term: "Electric flux", def: "Scalar measure of field lines crossing a surface; Φ = E·A.", hindi: "विद्युत फ्लक्स" },
    ],
    mistakes: [
      "Forgetting r is the centre-to-centre distance between charges.",
      "Using 1/r³ for a point charge instead of 1/r² (1/r³ appears for dipoles).",
    ],
    pyqs: [
      {
        q: "The force between two charges is F when they are distance r apart. If distance becomes 2r, force becomes:",
        options: ["F/4", "F/2", "2F", "4F"],
        answer: 0,
        explanation: "F ∝ 1/r², so doubling r quarters the force.",
      },
      {
        q: "The SI unit of electric flux is:",
        options: ["N·m²/C", "N/C", "V/m", "C/m²"],
        answer: 0,
        explanation: "Φ = E·A ⇒ (N/C)(m²) = N·m²/C.",
      },
    ],
    tip: "Gauss's law questions are about choosing the right Gaussian surface — symmetry is everything.",
  },
  "physics:physics-c16": {
    summary:
      "Electrostatic Potential and Capacitance covers potential, equipotential surfaces, capacitors, dielectrics and stored energy.",
    keyPoints: [
      "Potential V = kQ/r; potential energy U = qV; work to move charge = qΔV.",
      "Equipotential surfaces: no work to move along them; field is perpendicular to them.",
      "Capacitance C = Q/V; parallel plate C = ε₀A/d; with dielectric C = κε₀A/d.",
      "Series: 1/C = Σ1/Cᵢ (same Q); parallel: C = ΣCᵢ (same V).",
      "Energy stored U = ½CV² = Q²/(2C); a dielectric increases capacitance and energy for fixed V.",
    ],
    formulas: [
      { name: "Potential of point charge", formula: "V = kQ/r" },
      { name: "Parallel plate capacitor", formula: "C = ε₀A/d" },
      { name: "Energy stored", formula: "U = ½CV²" },
    ],
    glossary: [
      { term: "Capacitance", def: "Charge stored per unit potential difference.", hindi: "धारिता" },
      { term: "Dielectric", def: "Insulator that increases capacitance by polarisation.", hindi: "परावैद्युत" },
    ],
    mistakes: [
      "In series, adding capacitances directly (use reciprocals); in parallel, using reciprocals.",
      "Forgetting that V is the same across parallel branches and Q the same in series.",
    ],
    pyqs: [
      {
        q: "Two capacitors of 2 μF and 3 μF are connected in series. The equivalent capacitance is:",
        options: ["1.2 μF", "5 μF", "6 μF", "0.8 μF"],
        answer: 0,
        explanation: "1/C = 1/2 + 1/3 = 5/6 ⇒ C = 1.2 μF.",
      },
      {
        q: "Energy stored in a capacitor is ½CV². If V doubles, energy becomes:",
        options: ["4×", "2×", "½×", "unchanged"],
        answer: 0,
        explanation: "U ∝ V², so doubling V quadruples the energy.",
      },
    ],
    tip: "With a battery connected (fixed V), inserting a dielectric increases stored energy; disconnected (fixed Q), it decreases.",
  },
  "physics:physics-c17": {
    summary:
      "Current Electricity covers Ohm's law, drift velocity, resistivity, combinations of resistors, Kirchhoff's laws and bridges.",
    keyPoints: [
      "I = neAv_d; drift velocity v_d = eEτ/m.",
      "Ohm's law V = IR is not universal (diodes, electrolytes violate it); resistance depends on geometry R = ρL/A.",
      "Resistivity depends on material and temperature: ρ = ρ₀(1 + αΔT).",
      "Series: R = ΣRᵢ; parallel: 1/R = Σ1/Rᵢ (equivalent is smaller than the smallest).",
      "Kirchhoff: junction rule (ΣI = 0) + loop rule (ΣV = 0); Wheatstone bridge balances when P/Q = R/S.",
    ],
    formulas: [
      { name: "Ohm's law", formula: "V = IR" },
      { name: "Resistance", formula: "R = ρL/A" },
      { name: "Drift velocity", formula: "v_d = I/(neA)" },
      { name: "Bridge balance", formula: "P/Q = R/S" },
    ],
    glossary: [
      { term: "Drift velocity", def: "Small average velocity of electrons opposite to the field.", hindi: "अपवाह वेग" },
      { term: "Resistivity", def: "Material property; R = ρL/A.", hindi: "प्रतिरोधकता" },
    ],
    mistakes: [
      "Adding series resistors in parallel formula and vice versa.",
      "Sign errors in loop rule — fix a traversal direction and keep it consistent.",
    ],
    pyqs: [
      {
        q: "Three resistors of 2 Ω, 3 Ω and 6 Ω in parallel have equivalent resistance:",
        options: ["1 Ω", "11 Ω", "0.5 Ω", "2.4 Ω"],
        answer: 0,
        explanation: "1/R = 1/2 + 1/3 + 1/6 = 1 ⇒ R = 1 Ω.",
      },
      {
        q: "Wheatstone bridge is balanced when:",
        options: ["P/Q = R/S", "P/R = Q/S", "P = Q = R = S", "P + Q = R + S"],
        answer: 0,
        explanation: "Balance condition: P/Q = R/S (no current through galvanometer).",
      },
    ],
    tip: "Redraw complex circuits into clear series/parallel blocks before applying formulas.",
  },
  "physics:physics-c18": {
    summary:
      "Moving Charges and Magnetism covers the Lorentz force, motion in fields, Biot-Savart law, Ampere's law, solenoids and the cyclotron.",
    keyPoints: [
      "Lorentz force F = q(E + v × B); magnetic force does no work (it only changes direction).",
      "Charged particle in a uniform B: circular motion with r = mv/(qB), T = 2πm/(qB) — T is speed-independent.",
      "Biot-Savart: B = (μ₀/4π)(Idl×r̂/r²); long straight wire B = μ₀I/(2πr).",
      "Ampere's law ∮B·dl = μ₀I_enc; solenoid B = μ₀nI; toroid B = μ₀nI.",
      "Parallel currents attract if in the same direction, repel if opposite.",
    ],
    formulas: [
      { name: "Circular radius", formula: "r = mv/(qB)" },
      { name: "Straight wire field", formula: "B = μ₀I/(2πr)" },
      { name: "Solenoid field", formula: "B = μ₀nI" },
    ],
    glossary: [
      { term: "Lorentz force", def: "Total force on a moving charge: electric + magnetic.", hindi: "लॉरेंज बल" },
      { term: "Cyclotron", def: "Device accelerating charged particles in a spiral using B and alternating E.", hindi: "साइक्लोट्रॉन" },
    ],
    mistakes: [
      "Using F = qvB for particles at rest — magnetic force needs v ≠ 0 and v not parallel to B.",
      "Direction errors with v × B — use the right-hand rule consistently.",
    ],
    pyqs: [
      {
        q: "The time period of a charged particle in a uniform magnetic field is:",
        options: ["independent of speed", "proportional to speed", "proportional to v²", "inversely proportional to charge"],
        answer: 0,
        explanation: "T = 2πm/(qB) has no v — higher speed means a larger circle in the same time.",
      },
      {
        q: "Two parallel wires carry currents in the same direction. They:",
        options: ["attract each other", "repel each other", "experience no force", "rotate about each other"],
        answer: 0,
        explanation: "Same-direction parallel currents attract.",
      },
    ],
    tip: "T = 2πm/(qB) being speed-independent is a classic assertion question.",
  },
  "physics:physics-c19": {
    summary:
      "Magnetism and Matter deals with bar magnets, Earth's magnetism and the three classes of magnetic materials.",
    keyPoints: [
      "A bar magnet is a dipole: field lines go from N to S outside, S to N inside.",
      "Magnetic moment m = q_m × 2l; torque on a magnet in a field τ = m × B.",
      "Earth's field: declination, dip (inclination) and horizontal component; tanδ = Bv/BH.",
      "Ferromagnets (Fe, Co, Ni): strong attraction, retain magnetisation, Curie temperature destroys it.",
      "Diamagnets (Bi, Cu): weakly repelled, μr slightly < 1; paramagnets (Al, Na): weakly attracted, μr slightly > 1.",
    ],
    formulas: [
      { name: "Torque on magnet", formula: "τ = mB sinθ" },
      { name: "Dip angle", formula: "tanδ = Bv/BH" },
    ],
    glossary: [
      { term: "Diamagnetic", def: "Material weakly repelled by a magnet; paired electrons, no net moment.", hindi: "प्रतिचुंबकीय" },
      { term: "Curie temperature", def: "Temperature above which a ferromagnet becomes paramagnetic.", hindi: "क्यूरी ताप" },
    ],
    mistakes: [
      "Thinking all metals are ferromagnetic — only Fe, Co, Ni and a few alloys are.",
      "Confusing magnetic moment direction with field direction for a solenoid/bar magnet.",
    ],
    pyqs: [
      {
        q: "The material that shows the strongest magnetism is:",
        options: ["Ferromagnetic", "Paramagnetic", "Diamagnetic", "Non-magnetic"],
        answer: 0,
        explanation: "Ferromagnets have aligned domains giving strong net magnetisation.",
      },
      {
        q: "Above the Curie temperature, a ferromagnet behaves as:",
        options: ["a paramagnet", "a diamagnet", "a permanent magnet", "a superconductor"],
        answer: 0,
        explanation: "Thermal agitation destroys domain alignment, leaving paramagnetic behaviour.",
      },
    ],
    tip: "Remember the order of susceptibility: χ_ferro >> χ_para > 0 > χ_dia.",
  },
  "physics:physics-c20": {
    summary:
      "Electromagnetic Induction covers Faraday's and Lenz's laws, motional EMF, inductance and eddy currents.",
    keyPoints: [
      "Faraday's law: EMF = −dΦ/dt; the minus sign is Lenz's law (opposes the change producing it).",
      "Motional EMF in a rod: ε = Bvl (with v ⊥ B ⊥ l).",
      "Flux Φ = BA cosθ; changing B, A or θ all induce EMF.",
      "Self inductance ε = −L dI/dt; mutual inductance couples two coils.",
      "Eddy currents: induced currents in bulk conductors causing heating and damping (used in brakes, induction furnaces).",
    ],
    formulas: [
      { name: "Faraday's law", formula: "ε = −dΦ/dt" },
      { name: "Motional EMF", formula: "ε = Bvl" },
      { name: "Self inductance EMF", formula: "ε = −L dI/dt" },
      { name: "Inductor energy", formula: "U = ½LI²" },
    ],
    glossary: [
      { term: "Magnetic flux", def: "Φ = BA cosθ — field lines threading a loop.", hindi: "चुंबकीय फ्लक्स" },
      { term: "Eddy currents", def: "Circulating currents induced in bulk conductors by changing flux.", hindi: "भंवर धाराएँ" },
    ],
    mistakes: [
      "Ignoring Lenz's law direction in diagram questions — energy conservation demands opposition.",
      "Using ε = Bvl when B is parallel to the plane of motion (θ matters).",
    ],
    pyqs: [
      {
        q: "A rod of length 0.5 m moves at 4 m/s perpendicular to a 0.2 T field. The motional EMF is:",
        options: ["0.4 V", "0.2 V", "0.8 V", "2 V"],
        answer: 0,
        explanation: "ε = Bvl = 0.2 × 4 × 0.5 = 0.4 V.",
      },
      {
        q: "Lenz's law follows directly from:",
        options: ["conservation of energy", "conservation of charge", "Coulomb's law", "Ampere's law"],
        answer: 0,
        explanation: "Opposing the change conserves energy — the induced current's field fights the cause.",
      },
    ],
    tip: "For flux questions, first ask: is B, A or cosθ changing? That tells you the source of EMF.",
  },
  "physics:physics-c21": {
    summary:
      "Alternating Current covers RMS values, LCR circuits, resonance, power and transformers.",
    keyPoints: [
      "RMS values: V_rms = V₀/√2, I_rms = I₀/√2 (sinusoidal); house supply 220 V is the RMS value.",
      "Pure R: current in phase; pure L: current lags by 90°; pure C: current leads by 90°.",
      "LCR series impedance Z = √(R² + (X_L − X_C)²); resonance at ω₀ = 1/√(LC) where Z = R (minimum).",
      "Power P = V_rms I_rms cosφ; cosφ = R/Z; Q factor = ω₀L/R.",
      "Transformer: Vs/Vp = Ns/Np; step-up increases voltage, decreases current (ideal, no losses).",
    ],
    formulas: [
      { name: "RMS voltage", formula: "V_rms = V₀/√2" },
      { name: "Resonant frequency", formula: "ω₀ = 1/√(LC)" },
      { name: "Impedance", formula: "Z = √(R² + (X_L − X_C)²)" },
      { name: "Average power", formula: "P = V_rms I_rms cosφ" },
    ],
    glossary: [
      { term: "Resonance", def: "X_L = X_C, current maximum and in phase with voltage.", hindi: "अनुनाद" },
      { term: "Transformer", def: "Device changing AC voltage using mutual induction.", hindi: "ट्रांसफॉर्मर" },
    ],
    mistakes: [
      "Using V₀ where V_rms is needed (or vice versa) in power formulas.",
      "Thinking a transformer works on DC — it needs changing flux.",
    ],
    pyqs: [
      {
        q: "The peak value of 220 V AC mains is:",
        options: ["311 V", "220 V", "155 V", "440 V"],
        answer: 0,
        explanation: "V₀ = V_rms × √2 = 220 × 1.414 ≈ 311 V.",
      },
      {
        q: "In a series LCR circuit at resonance, the impedance is:",
        options: ["minimum", "maximum", "infinite", "zero"],
        answer: 0,
        explanation: "X_L = X_C cancels, leaving Z = R — the minimum value.",
      },
    ],
    tip: "At resonance remember: Z = R, current maximum, and power factor = 1.",
  },
  "physics:physics-c22": {
    summary:
      "Electromagnetic Waves covers how changing fields create waves, their properties and the spectrum.",
    keyPoints: [
      "Maxwell: changing electric field generates magnetic field and vice versa — waves propagate at c = 1/√(μ₀ε₀).",
      "EM waves are transverse; E ⊥ B ⊥ direction of propagation; E and B in phase.",
      "Energy is equally shared between E and B fields; momentum p = U/c.",
      "Spectrum (increasing frequency): radio < microwave < IR < visible < UV < X-ray < gamma.",
      "Applications: microwaves (radar, cooking), X-rays (bone imaging), γ-rays (cancer therapy, sterilisation).",
    ],
    formulas: [
      { name: "Speed of light", formula: "c = 1/√(μ₀ε₀) ≈ 3 × 10⁸ m/s" },
      { name: "Wave relation", formula: "c = νλ" },
      { name: "Energy density", formula: "u = ε₀E² = B²/μ₀" },
    ],
    glossary: [
      { term: "Electromagnetic spectrum", def: "Full range of EM radiation ordered by frequency/wavelength.", hindi: "विद्युतचुंबकीय स्पेक्ट्रम" },
      { term: "Transverse wave", def: "Oscillations perpendicular to the direction of travel.", hindi: "अनुप्रस्थ तरंग" },
    ],
    mistakes: [
      "Saying E and B are perpendicular to each other AND in phase — they are both true.",
      "Getting the spectrum order backwards — wavelength and frequency are inversely related.",
    ],
    pyqs: [
      {
        q: "Electromagnetic waves are produced by:",
        options: ["accelerated charges", "static charges", "uniform currents", "magnetic monopoles"],
        answer: 0,
        explanation: "Only accelerating charges radiate EM waves.",
      },
      {
        q: "Which has the longest wavelength?",
        options: ["Radio waves", "X-rays", "Gamma rays", "UV rays"],
        answer: 0,
        explanation: "Radio waves have the lowest frequency and longest wavelength.",
      },
    ],
    tip: "Learn the spectrum as a ladder: R-M-I-V-U-X-G with a use for each band.",
  },
  "physics:physics-c23": {
    summary:
      "Ray Optics covers reflection by mirrors, refraction by lenses and prisms, total internal reflection and optical instruments.",
    keyPoints: [
      "Mirror formula 1/v + 1/u = 1/f with sign convention; f = R/2.",
      "Lens formula 1/v − 1/u = 1/f; lens maker's formula with refractive index and radii.",
      "Refractive index n = c/v = sin i/sin r (Snell's law).",
      "Total internal reflection needs n₂ < n₁ and i > ic = sin⁻¹(n₂/n₁); used in optical fibres, mirage.",
      "Prism: δ = i + e − A; minimum deviation when i = e; μ = sin((A+δm)/2)/sin(A/2).",
      "Compound microscope and telescope magnifications — tube length relations.",
    ],
    formulas: [
      { name: "Mirror formula", formula: "1/v + 1/u = 1/f" },
      { name: "Lens formula", formula: "1/v − 1/u = 1/f" },
      { name: "Critical angle", formula: "sin ic = n₂/n₁" },
      { name: "Prism deviation", formula: "δ = i + e − A" },
    ],
    glossary: [
      { term: "Total internal reflection", def: "Complete reflection when light travels from denser to rarer medium past the critical angle.", hindi: "पूर्ण आंतरिक परावर्तन" },
      { term: "Focal length", def: "Distance from the pole/optical centre to the principal focus.", hindi: "फोकस दूरी" },
    ],
    mistakes: [
      "Applying mirror formula to lenses without switching signs (mirror: v,u same side; lens: opposite).",
      "Forgetting that a convex lens has positive f and a concave mirror negative f per convention.",
    ],
    pyqs: [
      {
        q: "A convex lens of focal length 20 cm forms an image at 30 cm. The object distance is:",
        options: ["60 cm", "12 cm", "40 cm", "50 cm"],
        answer: 0,
        explanation: "1/30 − 1/u = 1/20 ⇒ 1/u = 1/30 − 1/20 = −1/60 ⇒ u = −60 cm.",
      },
      {
        q: "Optical fibres work on the principle of:",
        options: ["total internal reflection", "refraction", "dispersion", "diffraction"],
        answer: 0,
        explanation: "Light is trapped inside the fibre by repeated total internal reflection.",
      },
    ],
    tip: "Always write the sign convention explicitly before substituting in mirror/lens formulas.",
  },
  "physics:physics-c24": {
    summary:
      "Wave Optics treats light as waves — Huygens principle, interference, diffraction and polarisation.",
    keyPoints: [
      "Huygens principle: every point on a wavefront is a new source of secondary wavelets; explains reflection and refraction.",
      "Young's double slit: fringe width β = λD/d; bright fringes at path difference nλ, dark at (2n−1)λ/2.",
      "Coherent sources have constant phase difference — needed for sustained interference.",
      "Diffraction: single slit minima at a sinθ = nλ; central maximum is twice as wide.",
      "Polarisation proves light is transverse; intensity after polariser I = I₀cos²θ (Malus' law).",
    ],
    formulas: [
      { name: "Fringe width", formula: "β = λD/d" },
      { name: "Single slit minima", formula: "a sinθ = nλ" },
      { name: "Malus' law", formula: "I = I₀ cos²θ" },
    ],
    glossary: [
      { term: "Interference", def: "Superposition of coherent waves producing bright/dark fringes.", hindi: "व्यतिकरण" },
      { term: "Polarisation", def: "Restricting vibrations to one plane — only transverse waves polarise.", hindi: "ध्रुवण" },
    ],
    mistakes: [
      "Using the YDSE fringe formula for diffraction (and vice versa) — check the setup.",
      "Thinking polarisation works for longitudinal waves — it cannot.",
    ],
    pyqs: [
      {
        q: "In YDSE, the fringe width is 1 mm with light of 500 nm and slit separation 0.5 mm. The screen distance is:",
        options: ["1 m", "2 m", "0.5 m", "4 m"],
        answer: 0,
        explanation: "β = λD/d ⇒ D = βd/λ = 10⁻³ × 5×10⁻⁴ / 5×10⁻⁷ = 1 m.",
      },
      {
        q: "Which phenomenon proves that light is a transverse wave?",
        options: ["Polarisation", "Refraction", "Interference", "Diffraction"],
        answer: 0,
        explanation: "Only transverse waves can be polarised.",
      },
    ],
    tip: "Fringe width formula questions are free marks: β = λD/d, just watch the unit of λ (m, not nm).",
  },
  "physics:physics-c25": {
    summary:
      "Dual Nature of Radiation and Matter covers the photoelectric effect, Einstein's equation and de Broglie waves.",
    keyPoints: [
      "Photoelectric effect: emission of electrons when light hits a metal; instantaneous, threshold frequency dependent.",
      "Einstein: E = hν = φ + KE_max; KE_max = eV₀ (stopping potential).",
      "Increasing intensity increases photocurrent, NOT electron energy; increasing frequency increases KE.",
      "de Broglie wavelength λ = h/p = h/(mv); for electrons accelerated through V: λ = 12.27/√V Å.",
      "Davisson-Germer experiment confirmed electron waves.",
    ],
    formulas: [
      { name: "Photoelectric equation", formula: "hν = φ + ½mv_max²" },
      { name: "Stopping potential", formula: "eV₀ = KE_max" },
      { name: "de Broglie wavelength", formula: "λ = h/p" },
    ],
    glossary: [
      { term: "Work function", def: "Minimum energy needed to eject an electron from a metal surface.", hindi: "कार्य फलन" },
      { term: "Threshold frequency", def: "Minimum frequency for photoelectric emission.", hindi: "देहली आवृत्ति" },
    ],
    mistakes: [
      "Saying higher intensity means faster electrons — intensity changes the NUMBER, frequency changes the energy.",
      "Using λ = h/mv for photons — photons travel at c, so p = hν/c.",
    ],
    pyqs: [
      {
        q: "The stopping potential for photoelectrons depends on:",
        options: ["frequency of light", "intensity of light", "area of the metal", "duration of exposure"],
        answer: 0,
        explanation: "KE_max = eV₀ = hν − φ — only frequency (and the metal) matter.",
      },
      {
        q: "The de Broglie wavelength of a particle is:",
        options: ["inversely proportional to momentum", "proportional to momentum", "proportional to mass", "independent of speed"],
        answer: 0,
        explanation: "λ = h/p, so wavelength falls as momentum rises.",
      },
    ],
    tip: "Distinguish intensity effects (current) from frequency effects (energy) — a classic NEET/JEE trap.",
  },
  "physics:physics-c26": {
    summary:
      "Atoms traces atomic models from Rutherford to Bohr, energy levels and the hydrogen spectrum.",
    keyPoints: [
      "Rutherford: nucleus is tiny and positive, electrons orbit; most alpha particles pass straight through.",
      "Bohr: electrons in quantised orbits; angular momentum mvr = nh/2π; energy levels Eₙ = −13.6/n² eV.",
      "Radius rₙ = 0.529 n² Å; velocity vₙ = 2.18 × 10⁶/n m/s.",
      "Energy emitted on transition: hν = Eᵢ − Eₖ; Lyman (UV), Balmer (visible), Paschen (IR) series.",
      "Ionisation energy of hydrogen = 13.6 eV; excitation to n=∞ means ionisation.",
    ],
    formulas: [
      { name: "Energy levels", formula: "Eₙ = −13.6/n² eV" },
      { name: "Bohr radius", formula: "rₙ = 0.529 n² Å" },
      { name: "Transition energy", formula: "hν = Eᵢ − Eₖ" },
    ],
    glossary: [
      { term: "Quantum number", def: "Integer labelling allowed orbits (n = 1, 2, 3…).", hindi: "क्वांटम संख्या" },
      { term: "Ionisation energy", def: "Energy to remove the electron from the ground state.", hindi: "आयनन ऊर्जा" },
    ],
    mistakes: [
      "Using the Rydberg formula with wrong series limits (Lyman ends at n=1, Balmer at n=2).",
      "Forgetting that Eₙ is negative — emission energy is Eᵢ − Eₖ (positive).",
    ],
    pyqs: [
      {
        q: "The ionisation energy of the hydrogen atom in the ground state is:",
        options: ["13.6 eV", "3.4 eV", "10.2 eV", "27.2 eV"],
        answer: 0,
        explanation: "E₁ = −13.6 eV, so ionisation needs 13.6 eV.",
      },
      {
        q: "The Balmer series of hydrogen lies in the:",
        options: ["visible region", "UV region", "IR region", "X-ray region"],
        answer: 0,
        explanation: "Transitions to n = 2 fall in the visible range.",
      },
    ],
    tip: "Memorise E = −13.6/n² and r = 0.529n² Å — most Bohr questions reduce to these two.",
  },
  "physics:physics-c27": {
    summary:
      "Nuclei covers nuclear structure, radioactivity, decay laws, fission, fusion and mass-energy equivalence.",
    keyPoints: [
      "Nucleus: protons + neutrons; radius R = R₀A^(1/3) with R₀ ≈ 1.2 fm; density roughly constant.",
      "Mass-energy: E = mc²; 1 amu ≈ 931 MeV.",
      "Radioactive decay: N = N₀e^(−λt); half-life T₁/₂ = ln2/λ; mean life τ = 1/λ = T₁/₂/0.693.",
      "α decay reduces A by 4, Z by 2; β⁻ converts n → p + e⁻ + ν̄; γ is high-energy photon emission.",
      "Fission (heavy nucleus splits, e.g. U-235 + n) and fusion (light nuclei merge, e.g. sun's p-p chain) release binding energy.",
    ],
    formulas: [
      { name: "Decay law", formula: "N = N₀e^(−λt)" },
      { name: "Half-life", formula: "T₁/₂ = ln2/λ = 0.693/λ" },
      { name: "Nuclear radius", formula: "R = R₀A^(1/3)" },
      { name: "Mass-energy", formula: "E = mc²" },
    ],
    glossary: [
      { term: "Half-life", def: "Time for half the nuclei to decay.", hindi: "अर्धायु काल" },
      { term: "Binding energy", def: "Energy holding nucleons together; BE = Δm·c².", hindi: "बंधन ऊर्जा" },
    ],
    mistakes: [
      "Confusing half-life with mean life — mean life τ = 1.44 × T₁/₂.",
      "In α-decay, changing the mass number by 2 instead of 4.",
    ],
    pyqs: [
      {
        q: "The half-life of a radioactive substance is 10 days. After 30 days, the fraction remaining is:",
        options: ["1/8", "1/4", "1/3", "1/2"],
        answer: 0,
        explanation: "30 days = 3 half-lives ⇒ (1/2)³ = 1/8.",
      },
      {
        q: "The energy released in nuclear reactions comes from:",
        options: ["mass defect converted via E = mc²", "chemical bonds", "kinetic energy of electrons", "heat of the sun"],
        answer: 0,
        explanation: "Mass defect Δm releases energy E = Δm·c².",
      },
    ],
    tip: "Fraction remaining after n half-lives is always (1/2)ⁿ — the fastest route in most decay MCQs.",
  },
  "physics:physics-c28": {
    summary:
      "Semiconductor Electronics covers p-n junctions, rectifiers, transistors, amplifiers and logic gates.",
    keyPoints: [
      "p-n junction: depletion region with built-in potential; forward bias (p to +) conducts, reverse bias blocks.",
      "Diode VI characteristic: knee voltage ~0.7 V for Si, 0.3 V for Ge.",
      "Rectifiers: half-wave (1 diode) and full-wave (2 diodes, centre-tap or bridge) convert AC to DC.",
      "Transistor: npn/pnp, three terminals; CE amplifier gives current and voltage gain; α = β/(β+1).",
      "Logic gates: AND, OR, NOT, NAND, NOR, XOR — NAND and NOR are universal gates; truth tables are exam favourites.",
    ],
    formulas: [
      { name: "Transistor relation", formula: "I_E = I_B + I_C" },
      { name: "Gain relation", formula: "β = α/(1−α)" },
      { name: "Voltage gain (CE)", formula: "Av = β × R_L/R_in" },
    ],
    glossary: [
      { term: "Depletion region", def: "Charge-free zone at a p-n junction with built-in field.", hindi: "अवक्षय क्षेत्र" },
      { term: "Logic gate", def: "Digital circuit implementing a Boolean operation.", hindi: "लॉजिक गेट" },
    ],
    mistakes: [
      "Saying current flows in both directions in a diode — it conducts only forward-biased (beyond knee).",
      "Forgetting the truth table of NAND (AND then invert) in gate combination questions.",
    ],
    pyqs: [
      {
        q: "A p-n junction diode conducts when it is:",
        options: ["forward biased", "reverse biased", "unbiased", "always"],
        answer: 0,
        explanation: "Forward bias reduces the barrier and allows majority carrier flow.",
      },
      {
        q: "Which gate gives output 0 only when all inputs are 1?",
        options: ["NAND", "AND", "OR", "XOR"],
        answer: 0,
        explanation: "NAND = NOT(AND): output 0 only for 1,1 inputs.",
      },
    ],
    tip: "For gate networks, break them into single gates and build the truth table step by step.",
  },
};
