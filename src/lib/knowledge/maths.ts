// Mathematics knowledge — keyed by "maths:<chapterId>"

import type { ChapterKnowledge } from "./index";

export const MATHS_KNOWLEDGE: Record<string, ChapterKnowledge> = {
  "maths:maths-c1": {
    summary:
      "Sets introduces the language of collections — representation, operations, Venn diagrams and laws of sets.",
    keyPoints: [
      "A set is a well-defined collection; represented in roster (list) or set-builder form.",
      "n(A ∪ B) = n(A) + n(B) − n(A ∩ B); for three sets add the triple intersection back.",
      "De Morgan's laws: (A ∪ B)' = A' ∩ B'; (A ∩ B)' = A' ∪ B'.",
      "Power set P(A) has 2ⁿ subsets for a set of n elements.",
      "Disjoint sets have n(A ∩ B) = 0; subset relation A ⊆ B means every element of A is in B.",
    ],
    formulas: [
      { name: "Union cardinality", formula: "n(A∪B) = n(A) + n(B) − n(A∩B)" },
      { name: "Power set size", formula: "|P(A)| = 2ⁿ" },
    ],
    glossary: [
      { term: "Subset", def: "A ⊆ B: all elements of A belong to B.", hindi: "उपसमुच्चय" },
      { term: "Universal set", def: "Set containing all elements under discussion, U.", hindi: "सार्वत्रिक समुच्चय" },
    ],
    mistakes: [
      "Forgetting that the empty set is a subset of every set.",
      "Adding intersection twice in three-set union problems.",
    ],
    pyqs: [
      {
        q: "If n(A) = 5, the number of subsets of A is:",
        options: ["32", "25", "10", "5"],
        answer: 0,
        explanation: "2⁵ = 32 subsets.",
      },
      {
        q: "(A ∪ B)' equals:",
        options: ["A' ∩ B'", "A' ∪ B'", "A ∩ B", "A ∪ B"],
        answer: 0,
        explanation: "De Morgan's law: complement of a union is the intersection of complements.",
      },
    ],
    tip: "Venn diagrams: start shading from the innermost bracket in set-identity questions.",
  },
  "maths:maths-c2": {
    summary:
      "Relations and Functions (Class 11) defines relations, types of functions, domain, range and graphs.",
    keyPoints: [
      "Relation R ⊆ A × B; domain = first set elements, range = second set elements that appear.",
      "A function assigns exactly ONE output per input; vertical line test on graphs.",
      "Types: one-one (injective), onto (surjective), bijective (both); check via horizontal line test.",
      "Domain rules: denominators ≠ 0; radicands of even roots ≥ 0; log arguments > 0.",
      "Common graphs: x² (parabola), 1/x (hyperbola), |x| (V-shape), √x (half parabola).",
    ],
    glossary: [
      { term: "Domain", def: "Set of all valid inputs of a function.", hindi: "प्रांत" },
      { term: "Range", def: "Set of all outputs a function produces.", hindi: "परिसर" },
      { term: "Bijective", def: "Both one-one and onto — has an inverse.", hindi: "एकैक आच्छादक" },
    ],
    mistakes: [
      "Saying a relation is a function when one input maps to two outputs.",
      "Forgetting x = 0 exclusion for f(x) = 1/x when finding domains.",
    ],
    pyqs: [
      {
        q: "The domain of f(x) = √(x − 2) is:",
        options: ["[2, ∞)", "(2, ∞)", "(−∞, 2]", "R"],
        answer: 0,
        explanation: "x − 2 ≥ 0 ⇒ x ≥ 2.",
      },
      {
        q: "A function that is both one-one and onto is called:",
        options: ["bijective", "injective only", "surjective only", "constant"],
        answer: 0,
        explanation: "Bijective = injective + surjective.",
      },
    ],
    tip: "Domain problems: list the three killers — division by zero, even roots, logarithms.",
  },
  "maths:maths-c3": {
    summary:
      "Trigonometric Functions covers angles, identities, compound angles, transformation formulae and equations.",
    keyPoints: [
      "Radian measure: π radians = 180°; arc length s = rθ.",
      "Fundamental identities: sin²θ + cos²θ = 1; 1 + tan²θ = sec²θ; 1 + cot²θ = cosec²θ.",
      "Compound: sin(A±B), cos(A±B), tan(A±B); double angles; half angles.",
      "Transformation: 2sinA cosB = sin(A+B) + sin(A−B) etc.",
      "General solutions: sinθ = 0 ⇒ θ = nπ; cosθ = 0 ⇒ θ = (2n+1)π/2; tanθ = 0 ⇒ θ = nπ.",
    ],
    formulas: [
      { name: "sin(A+B)", formula: "sinA cosB + cosA sinB" },
      { name: "cos(A+B)", formula: "cosA cosB − sinA sinB" },
      { name: "sin2θ", formula: "2 sinθ cosθ" },
      { name: "Product to sum", formula: "2 sinA cosB = sin(A+B) + sin(A−B)" },
    ],
    glossary: [
      { term: "Radian", def: "Angle subtended by an arc equal to the radius.", hindi: "रेडियन" },
      { term: "General solution", def: "Formula describing all solutions of a trig equation.", hindi: "व्यापक हल" },
    ],
    mistakes: [
      "Mixing up the sign in cos(A+B) — cosA cosB MINUS sinA sinB.",
      "Forgetting to add the period when writing general solutions.",
    ],
    pyqs: [
      {
        q: "sin75° equals:",
        options: ["(√3+1)/(2√2)", "(√3−1)/(2√2)", "√3/2", "1/2"],
        answer: 0,
        explanation: "sin(45°+30°) = sin45 cos30 + cos45 sin30 = (√3+1)/(2√2).",
      },
      {
        q: "The general solution of sinθ = 0 is:",
        options: ["θ = nπ", "θ = (2n+1)π/2", "θ = nπ/2", "θ = 2nπ"],
        answer: 0,
        explanation: "Sine vanishes at all multiples of π.",
      },
    ],
    tip: "Memorise the standard angle table (0°, 30°, 45°, 60°, 90°) — most trig MCQs reduce to it.",
  },
  "maths:maths-c4": {
    summary:
      "Complex Numbers and Quadratic Equations covers complex algebra, modulus-argument form, De Moivre's theorem and quadratic roots.",
    keyPoints: [
      "i² = −1; z = a + bi; conjugate z̄ = a − bi; z·z̄ = |z|².",
      "Modulus |z| = √(a² + b²); argument arg(z) = tan⁻¹(b/a) with the correct quadrant.",
      "Polar form: z = r(cosθ + i sinθ); De Moivre: (cosθ + i sinθ)ⁿ = cos nθ + i sin nθ.",
      "Quadratic ax² + bx + c = 0: roots = [−b ± √(b² − 4ac)]/2a; complex roots occur in conjugate pairs.",
      "Nature of roots via discriminant D = b² − 4ac: D > 0 real distinct, D = 0 equal, D < 0 complex.",
    ],
    formulas: [
      { name: "Modulus", formula: "|z| = √(a² + b²)" },
      { name: "Quadratic roots", formula: "x = (−b ± √(b² − 4ac)) / 2a" },
      { name: "De Moivre", formula: "(cosθ + i sinθ)ⁿ = cos(nθ) + i sin(nθ)" },
    ],
    glossary: [
      { term: "Conjugate", def: "a − bi for z = a + bi; product gives |z|².", hindi: "संयुग्मी" },
      { term: "Argument", def: "Angle the complex vector makes with the positive real axis.", hindi: "कोणांक" },
    ],
    mistakes: [
      "Placing the argument in the wrong quadrant — check the signs of a and b.",
      "Writing −1 as i² incorrectly in simplifications — i² = −1, i³ = −i, i⁴ = 1.",
    ],
    pyqs: [
      {
        q: "If z = 3 + 4i, then |z| is:",
        options: ["5", "7", "25", "1"],
        answer: 0,
        explanation: "|z| = √(9 + 16) = 5.",
      },
      {
        q: "The roots of x² + 1 = 0 are:",
        options: ["±i", "±1", "0 and 1", "±√2"],
        answer: 0,
        explanation: "x² = −1 ⇒ x = ±i.",
      },
    ],
    tip: "For quadratics with complex roots, the sum is −b/a and product c/a — Vieta works for complex too.",
  },
  "maths:maths-c5": {
    summary:
      "Linear Inequalities solves single and two-variable inequalities, including graphical regions.",
    keyPoints: [
      "Multiplying/dividing by a NEGATIVE number flips the inequality sign.",
      "Solution sets are intervals; strict vs non-strict matters at endpoints.",
      "Two-variable inequality ax + by ≤ c defines a half-plane; test a point (0,0) to choose the region.",
      "Systems of inequalities: feasible region = intersection of half-planes.",
      "Integer solutions: list values satisfying the inequality within the domain.",
    ],
    glossary: [
      { term: "Half-plane", def: "Region of the plane satisfying a linear inequality.", hindi: "अर्ध-तल" },
      { term: "Feasible region", def: "Common region satisfying all constraints.", hindi: "सुसंगत क्षेत्र" },
    ],
    mistakes: [
      "Forgetting to flip the sign when dividing by a negative.",
      "Shading the wrong half-plane — always test a sample point.",
    ],
    pyqs: [
      {
        q: "Solving −2x < 6 gives:",
        options: ["x > −3", "x < −3", "x > 3", "x < 3"],
        answer: 0,
        explanation: "Divide by −2 and flip: x > −3.",
      },
      {
        q: "The region x + y ≤ 4 lies:",
        options: ["below the line x + y = 4", "above the line", "on the line only", "right of the y-axis"],
        answer: 0,
        explanation: "Test (0,0): 0 ≤ 4 true, and the origin lies below the line.",
      },
    ],
    tip: "The sign-flip on negatives is the single most common error — underline the divisor.",
  },
  "maths:maths-c6": {
    summary:
      "Permutations and Combinations counts arrangements and selections — factorials, nPr, nCr and applications.",
    keyPoints: [
      "Fundamental principle: if task 1 has m ways and task 2 has n ways, together m × n ways.",
      "Permutations: nPr = n!/(n−r)! — order matters.",
      "Combinations: nCr = n!/(r!(n−r)!) — order does not matter.",
      "Circular arrangements of n distinct objects: (n−1)!; with clockwise/anticlockwise same: (n−1)!/2.",
      "Identical objects: arrangements = n!/(p!q!…) when p, q objects repeat.",
    ],
    formulas: [
      { name: "Permutation", formula: "nPr = n! / (n−r)!" },
      { name: "Combination", formula: "nCr = n! / (r!(n−r)!)" },
      { name: "Circular arrangement", formula: "(n−1)!" },
    ],
    glossary: [
      { term: "Permutation", def: "Ordered arrangement of objects.", hindi: "क्रमचय" },
      { term: "Combination", def: "Selection of objects ignoring order.", hindi: "संचय" },
    ],
    mistakes: [
      "Using permutations when order doesn't matter (committee problems → combinations).",
      "Double counting identical arrangements in circular problems.",
    ],
    pyqs: [
      {
        q: "The number of ways to arrange 5 books on a shelf is:",
        options: ["120", "25", "60", "10"],
        answer: 0,
        explanation: "5! = 120.",
      },
      {
        q: "The number of ways to choose 2 students from 10 is:",
        options: ["45", "90", "20", "100"],
        answer: 0,
        explanation: "10C2 = 10!/(2!8!) = 45.",
      },
    ],
    tip: "Ask one question first: does order matter? Permutation if yes, combination if no.",
  },
  "maths:maths-c7": {
    summary:
      "Binomial Theorem expands (a + b)ⁿ with binomial coefficients and finds specific terms.",
    keyPoints: [
      "(a + b)ⁿ = Σ nCr a^(n−r) b^r; there are n+1 terms.",
      "General term: T(r+1) = nCr a^(n−r) b^r.",
      "Middle term: one if n even (r = n/2), two if n odd.",
      "Coefficient relations: nCr = nC(n−r); sum of all coefficients = 2ⁿ; alternating sum = 0.",
      "Applications: approximations, divisibility problems, greatest term.",
    ],
    formulas: [
      { name: "General term", formula: "T(r+1) = nCr a^(n−r) b^r" },
      { name: "Coefficient sum", formula: "Σ nCr = 2ⁿ" },
      { name: "Symmetry", formula: "nCr = nC(n−r)" },
    ],
    glossary: [
      { term: "Binomial coefficient", def: "nCr — the number attached to each term.", hindi: "द्विपद गुणांक" },
      { term: "General term", def: "Formula for the (r+1)-th term of the expansion.", hindi: "व्यापक पद" },
    ],
    mistakes: [
      "Forgetting the (−1)^r sign when expanding (a − b)ⁿ.",
      "Starting the index at r = 1 for the general term — T(r+1) uses r = 0, 1, …",
    ],
    pyqs: [
      {
        q: "The coefficient of x in (1 + x)¹⁰ is:",
        options: ["10", "1", "45", "120"],
        answer: 0,
        explanation: "T₂ = 10C1 x ⇒ coefficient 10.",
      },
      {
        q: "The sum of all binomial coefficients in (1 + x)ⁿ is:",
        options: ["2ⁿ", "n", "n²", "3ⁿ"],
        answer: 0,
        explanation: "Put x = 1: (1 + 1)ⁿ = 2ⁿ.",
      },
    ],
    tip: "Independent-of-x terms: set the power of x in the general term to zero and solve for r.",
  },
  "maths:maths-c8": {
    summary:
      "Sequences and Series covers AP, GP, harmonic progressions, AM-GM-HM and special sums.",
    keyPoints: [
      "AP: a, a+d, …; nth term aₙ = a + (n−1)d; sum Sₙ = n/2 [2a + (n−1)d].",
      "GP: a, ar, …; aₙ = ar^(n−1); sum = a(1−rⁿ)/(1−r); infinite sum = a/(1−r) for |r| < 1.",
      "AM of two numbers = (a+b)/2; GM = √(ab); HM = 2ab/(a+b); AM ≥ GM ≥ HM.",
      "Special sums: Σk = n(n+1)/2; Σk² = n(n+1)(2n+1)/6; Σk³ = [n(n+1)/2]².",
      "Geometric mean between a and b: insert terms to form a GP.",
    ],
    formulas: [
      { name: "AP nth term", formula: "aₙ = a + (n−1)d" },
      { name: "GP infinite sum", formula: "S∞ = a/(1−r), |r| < 1" },
      { name: "Sum of squares", formula: "Σk² = n(n+1)(2n+1)/6" },
    ],
    glossary: [
      { term: "Arithmetic progression", def: "Sequence with constant difference between terms.", hindi: "समांतर श्रेढ़ी" },
      { term: "Geometric progression", def: "Sequence with constant ratio between terms.", hindi: "गुणोत्तर श्रेढ़ी" },
    ],
    mistakes: [
      "Applying the infinite GP sum when |r| ≥ 1 — it diverges.",
      "Using n/2[2a+(n−1)d] but counting the number of terms wrongly.",
    ],
    pyqs: [
      {
        q: "The sum 1 + 2 + 3 + … + 100 equals:",
        options: ["5050", "5000", "10100", "505"],
        answer: 0,
        explanation: "n(n+1)/2 = 100 × 101/2 = 5050.",
      },
      {
        q: "For two positive numbers, the correct order is:",
        options: ["AM ≥ GM ≥ HM", "AM ≤ GM ≤ HM", "GM ≥ AM ≥ HM", "HM ≥ AM ≥ GM"],
        answer: 0,
        explanation: "AM ≥ GM ≥ HM with equality when numbers are equal.",
      },
    ],
    tip: "Inserting 'n' means between two numbers: common difference d = (b−a)/(n+1).",
  },
  "maths:maths-c9": {
    summary:
      "Straight Lines covers slope, equations of lines, angle between lines and distance formulas.",
    keyPoints: [
      "Slope m = tanθ = (y₂−y₁)/(x₂−x₁); parallel lines have equal slopes, perpendicular m₁m₂ = −1.",
      "Forms: point-slope, slope-intercept y = mx + c, two-point, intercept x/a + y/b = 1, general Ax + By + C = 0.",
      "Angle between lines: tanθ = |(m₁−m₂)/(1+m₁m₂)|.",
      "Distance of a point from a line: d = |Ax₁ + By₁ + C|/√(A² + B²).",
      "Section formula: point dividing AB in m:n = (mx₂ + nx₁)/(m+n), (my₂ + ny₁)/(m+n).",
    ],
    formulas: [
      { name: "Slope", formula: "m = (y₂ − y₁)/(x₂ − x₁)" },
      { name: "Point-line distance", formula: "d = |Ax₁ + By₁ + C| / √(A² + B²)" },
      { name: "Angle between lines", formula: "tanθ = |(m₁ − m₂)/(1 + m₁m₂)|" },
    ],
    glossary: [
      { term: "Slope", def: "Tangent of the inclination angle of a line.", hindi: "ढाल" },
      { term: "Intercept form", def: "x/a + y/b = 1 where a, b are axis intercepts.", hindi: "अंत:खंड रूप" },
    ],
    mistakes: [
      "Writing m₁m₂ = 1 for perpendicular lines — it's −1.",
      "Forgetting the absolute value in the distance formula.",
    ],
    pyqs: [
      {
        q: "The slope of the line 3x + 2y = 6 is:",
        options: ["−3/2", "3/2", "2/3", "−2/3"],
        answer: 0,
        explanation: "y = −(3/2)x + 3 ⇒ m = −3/2.",
      },
      {
        q: "Two lines are perpendicular if:",
        options: ["m₁m₂ = −1", "m₁ = m₂", "m₁ + m₂ = 0", "m₁m₂ = 1"],
        answer: 0,
        explanation: "Product of slopes of perpendicular lines is −1.",
      },
    ],
    tip: "Distance-from-point questions: convert the line to general form FIRST.",
  },
  "maths:maths-c10": {
    summary:
      "Conic Sections covers circles, parabolas, ellipses and hyperbolas with their standard equations.",
    keyPoints: [
      "Circle: (x−h)² + (y−k)² = r²; centre (h,k), radius r.",
      "Parabola y² = 4ax: focus (a,0), directrix x = −a, latus rectum 4a.",
      "Ellipse x²/a² + y²/b² = 1: foci (±ae,0), e = √(1 − b²/a²), latus rectum 2b²/a.",
      "Hyperbola x²/a² − y²/b² = 1: e = √(1 + b²/a²), asymptotes y = ±(b/a)x.",
      "Conic from eccentricity: e = 0 circle, e = 1 parabola, e < 1 ellipse, e > 1 hyperbola.",
    ],
    formulas: [
      { name: "Parabola LR", formula: "Latus rectum = 4a" },
      { name: "Ellipse eccentricity", formula: "e = √(1 − b²/a²)" },
      { name: "Hyperbola eccentricity", formula: "e = √(1 + b²/a²)" },
    ],
    glossary: [
      { term: "Focus", def: "Fixed point defining a conic with the directrix.", hindi: "नाभि" },
      { term: "Directrix", def: "Fixed line paired with the focus to define a conic.", hindi: "नियता" },
      { term: "Latus rectum", def: "Chord through the focus perpendicular to the axis.", hindi: "नाभिलंब" },
    ],
    mistakes: [
      "Using the parabola formula y² = 4ax when the axis is vertical (use x² = 4ay).",
      "Swapping the ellipse/hyperbola eccentricity signs (1−b²/a² vs 1+b²/a²).",
    ],
    pyqs: [
      {
        q: "The latus rectum of y² = 12x is:",
        options: ["12", "6", "3", "24"],
        answer: 0,
        explanation: "4a = 12 from 4a = 12 ⇒ a = 3, LR = 12.",
      },
      {
        q: "For a conic with e = 1, the conic is a:",
        options: ["parabola", "circle", "ellipse", "hyperbola"],
        answer: 0,
        explanation: "Eccentricity exactly 1 defines the parabola.",
      },
    ],
    tip: "Identify the conic from the equation's squared terms: same sign = circle/ellipse, opposite = hyperbola.",
  },
  "maths:maths-c11": {
    summary:
      "Introduction to Three Dimensional Geometry extends coordinates, distance and section formulas into space.",
    keyPoints: [
      "Point in space: (x, y, z); coordinate planes xy, yz, zx.",
      "Distance between P(x₁,y₁,z₁) and Q(x₂,y₂,z₂): √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²].",
      "Section formula in 3D mirrors the 2D formula applied to each coordinate.",
      "Distance from origin: √(x² + y² + z²).",
    ],
    formulas: [
      { name: "3D distance", formula: "d = √[(x₂−x₁)² + (y₂−y₁)² + (z₂−z₁)²]" },
    ],
    glossary: [
      { term: "Coordinate plane", def: "Plane formed by two axes (xy, yz, zx).", hindi: "निर्देशांक तल" },
    ],
    mistakes: [
      "Dropping one squared term in the 3D distance formula.",
      "Forgetting the section formula applies per-coordinate.",
    ],
    pyqs: [
      {
        q: "The distance between (1, 2, 2) and (2, 3, 4) is:",
        options: ["√6", "√5", "3", "2"],
        answer: 0,
        explanation: "√[(1)² + (1)² + (2)²] = √6.",
      },
    ],
    tip: "3D formulas are 2D formulas with one more coordinate — spot the pattern, don't memorise fresh.",
  },
  "maths:maths-c12": {
    summary:
      "Limits and Derivatives introduces the limit concept, standard limits and differentiation from first principles.",
    keyPoints: [
      "Limit: value a function approaches as x → a; exists when left and right limits are equal.",
      "Standard limits: lim sinx/x = 1 (x→0); lim (1 + 1/n)ⁿ = e; lim (aˣ−1)/x = ln a.",
      "Derivative from first principles: f'(x) = lim [f(x+h) − f(x)]/h.",
      "Algebra of derivatives: (u±v)' = u'±v'; (uv)' = u'v + uv'; (u/v)' = (u'v − uv')/v².",
      "Derivatives of standard functions: xⁿ, sinx, cosx, eˣ, ln x, aˣ.",
    ],
    formulas: [
      { name: "Standard limit", formula: "lim_{x→0} sinx/x = 1" },
      { name: "First principle", formula: "f'(x) = lim_{h→0} [f(x+h) − f(x)]/h" },
      { name: "Product rule", formula: "(uv)' = u'v + uv'" },
    ],
    glossary: [
      { term: "Limit", def: "Value a function tends to as the input approaches a point.", hindi: "सीमा" },
      { term: "Derivative", def: "Instantaneous rate of change; slope of the tangent.", hindi: "अवकलज" },
    ],
    mistakes: [
      "Using lim sinx/x = 1 when x → ∞ — it applies at x → 0.",
      "Applying the quotient rule sign wrongly — numerator is u'v MINUS uv'.",
    ],
    pyqs: [
      {
        q: "lim_{x→0} sin(3x)/x equals:",
        options: ["3", "1", "0", "∞"],
        answer: 0,
        explanation: "= 3 × lim sin(3x)/(3x) = 3 × 1 = 3.",
      },
      {
        q: "The derivative of x³ is:",
        options: ["3x²", "x²", "3x", "x⁴/4"],
        answer: 0,
        explanation: "d/dx xⁿ = nxⁿ⁻¹ ⇒ 3x².",
      },
    ],
    tip: "For 0/0 limits, factorise and cancel BEFORE substituting — or use L'Hôpital if allowed.",
  },
  "maths:maths-c13": {
    summary:
      "Statistics covers dispersion measures — range, mean deviation, variance and standard deviation.",
    keyPoints: [
      "Range = max − min; simplest but ignores distribution shape.",
      "Mean deviation about the mean/median uses absolute deviations.",
      "Variance σ² = Σ(xᵢ − x̄)²/n; standard deviation σ = √variance.",
      "For frequency data, weigh by frequencies: σ² = Σf(xᵢ−x̄)²/Σf.",
      "Coefficient of variation = (σ/x̄) × 100 — compares variability across datasets.",
    ],
    formulas: [
      { name: "Variance", formula: "σ² = Σ(xᵢ − x̄)² / n" },
      { name: "CV", formula: "CV = (σ/x̄) × 100" },
    ],
    glossary: [
      { term: "Mean deviation", def: "Average of absolute deviations from a central value.", hindi: "माध्य विचलन" },
      { term: "Standard deviation", def: "Root mean square deviation from the mean.", hindi: "मानक विचलन" },
    ],
    mistakes: [
      "Forgetting to square deviations before averaging in variance.",
      "Using n vs n−1 (sample) inconsistently — NCERT uses n for the population formula.",
    ],
    pyqs: [
      {
        q: "If all observations are identical, the standard deviation is:",
        options: ["0", "1", "x̄", "undefined"],
        answer: 0,
        explanation: "No spread means σ = 0.",
      },
      {
        q: "Adding a constant c to every observation:",
        options: ["doesn't change σ", "adds c to σ", "multiplies σ by c", "squares σ"],
        answer: 0,
        explanation: "Spread is shift-invariant; only scaling changes σ.",
      },
    ],
    tip: "Remember: σ is unaffected by adding constants, but scales by multiplication.",
  },
  "maths:maths-c14": {
    summary:
      "Probability (Class 11) introduces sample spaces, events and the axiomatic definition of probability.",
    keyPoints: [
      "P(A) = favourable outcomes / total outcomes (equally likely).",
      "Sample space: set of all outcomes; events are subsets.",
      "Addition rule: P(A∪B) = P(A) + P(B) − P(A∩B); mutually exclusive ⇒ P(A∩B) = 0.",
      "Complement: P(A') = 1 − P(A).",
      "Independent events: P(A∩B) = P(A)·P(B).",
    ],
    formulas: [
      { name: "Addition rule", formula: "P(A∪B) = P(A) + P(B) − P(A∩B)" },
      { name: "Independence", formula: "P(A∩B) = P(A)·P(B)" },
    ],
    glossary: [
      { term: "Sample space", def: "Set of all possible outcomes.", hindi: "प्रतिदर्श समष्टि" },
      { term: "Mutually exclusive", def: "Events that cannot occur together.", hindi: "परस्पर अपवर्जी" },
    ],
    mistakes: [
      "Treating dependent events as independent in the multiplication rule.",
      "Forgetting to subtract the intersection in the addition rule.",
    ],
    pyqs: [
      {
        q: "The probability of getting an even number on a single die roll is:",
        options: ["1/2", "1/3", "1/6", "2/3"],
        answer: 0,
        explanation: "3 favourable (2,4,6) out of 6 ⇒ 1/2.",
      },
      {
        q: "If P(A) = 0.4 and P(B) = 0.5 with A, B independent, P(A∩B) is:",
        options: ["0.2", "0.9", "0.45", "0.1"],
        answer: 0,
        explanation: "0.4 × 0.5 = 0.2.",
      },
    ],
    tip: "List the sample space explicitly for small problems — it prevents double counting.",
  },
  "maths:maths-c15": {
    summary:
      "Relations and Functions (Class 12) deepens relations, functions, invertibility and binary operations.",
    keyPoints: [
      "Relation types: reflexive, symmetric, transitive — equivalence relations have all three.",
      "Function types: one-one/onto; composition (f∘g)(x) = f(g(x)).",
      "Invertible ⇔ bijective; f⁻¹(f(x)) = x.",
      "Binary operation on a set: closed mapping; identity and inverse elements.",
    ],
    glossary: [
      { term: "Equivalence relation", def: "Reflexive + symmetric + transitive.", hindi: "तुल्यता संबंध" },
      { term: "Composition", def: "Applying one function after another.", hindi: "संयोजन" },
    ],
    mistakes: [
      "Calling a relation an equivalence relation when one property is missing.",
      "Composing in the wrong order — f∘g applies g first.",
    ],
    pyqs: [
      {
        q: "A relation that is reflexive, symmetric and transitive is called:",
        options: ["equivalence", "partial order", "function", "mapping"],
        answer: 0,
        explanation: "All three properties define an equivalence relation.",
      },
      {
        q: "A function is invertible if it is:",
        options: ["bijective", "injective only", "surjective only", "constant"],
        answer: 0,
        explanation: "Only bijective functions have inverses.",
      },
    ],
    tip: "Check the three properties in order — one failure kills 'equivalence'.",
  },
  "maths:maths-c16": {
    summary:
      "Inverse Trigonometric Functions defines principal branches, properties and identities.",
    keyPoints: [
      "Inverse functions exist on restricted principal ranges: sin⁻¹ ∈ [−π/2, π/2], cos⁻¹ ∈ [0, π], tan⁻¹ ∈ (−π/2, π/2).",
      "sin⁻¹(sin x) = x only inside the principal range.",
      "Key identities: sin⁻¹x + cos⁻¹x = π/2; tan⁻¹x + cot⁻¹x = π/2; sec⁻¹x + cosec⁻¹x = π/2.",
      "tan⁻¹x ± tan⁻¹y = tan⁻¹[(x ± y)/(1 ∓ xy)] with range checks.",
      "Useful: sin⁻¹x = tan⁻¹[x/√(1−x²)]; converting between inverse forms.",
    ],
    formulas: [
      { name: "Complement identity", formula: "sin⁻¹x + cos⁻¹x = π/2" },
      { name: "Tangent sum", formula: "tan⁻¹x + tan⁻¹y = tan⁻¹[(x+y)/(1−xy)]" },
    ],
    glossary: [
      { term: "Principal value", def: "Value of the inverse function within its principal branch.", hindi: "मुख्य मान" },
    ],
    mistakes: [
      "Saying sin⁻¹(sin 2π/3) = 2π/3 — the principal value is π/3.",
      "Using the tan⁻¹ sum formula without checking xy < 1 / > 1 cases.",
    ],
    pyqs: [
      {
        q: "sin⁻¹x + cos⁻¹x equals:",
        options: ["π/2", "π", "0", "π/4"],
        answer: 0,
        explanation: "The complementary identity holds for all x in [−1,1].",
      },
      {
        q: "The principal value of sin⁻¹(1/2) is:",
        options: ["π/6", "5π/6", "π/3", "2π/3"],
        answer: 0,
        explanation: "Principal branch [−π/2, π/2] gives π/6.",
      },
    ],
    tip: "Always convert inverse values back into the principal range before answering.",
  },
  "maths:maths-c17": {
    summary:
      "Matrices covers matrix types, operations, transpose, symmetric matrices and elementary operations.",
    keyPoints: [
      "Matrix: rectangular array; order m × n; entries aᵢⱼ.",
      "Addition/subtraction: same order; scalar multiplication multiplies every entry.",
      "Multiplication: (m×n)·(n×p) = m×p; row × column; NOT commutative in general.",
      "Transpose: swap rows/columns; (AB)ᵀ = BᵀAᵀ; symmetric if A = Aᵀ, skew if A = −Aᵀ.",
      "Elementary row operations: swap rows, scale a row, add a multiple of one row to another.",
    ],
    formulas: [
      { name: "Transpose product", formula: "(AB)ᵀ = BᵀAᵀ" },
      { name: "Symmetric condition", formula: "A = Aᵀ" },
    ],
    glossary: [
      { term: "Order of a matrix", def: "Rows × columns of the matrix.", hindi: "कोटि" },
      { term: "Skew-symmetric", def: "Matrix with Aᵀ = −A; diagonal entries zero.", hindi: "विषम-सममित" },
    ],
    mistakes: [
      "Multiplying matrices of incompatible orders (columns of A ≠ rows of B).",
      "Assuming AB = BA — matrix multiplication is not commutative.",
    ],
    pyqs: [
      {
        q: "If A is 2×3 and B is 3×4, then AB has order:",
        options: ["2×4", "3×3", "4×2", "3×4"],
        answer: 0,
        explanation: "Inner dimensions (3) match; result is outer 2×4.",
      },
      {
        q: "For a skew-symmetric matrix, the diagonal entries are:",
        options: ["zero", "one", "equal to off-diagonal", "arbitrary"],
        answer: 0,
        explanation: "aᵢᵢ = −aᵢᵢ ⇒ each diagonal entry is 0.",
      },
    ],
    tip: "Check dimension compatibility before any multiplication — the fastest way to lose marks otherwise.",
  },
  "maths:maths-c18": {
    summary:
      "Determinants covers determinant properties, minors, cofactors, adjoints, inverses and Cramer's rule.",
    keyPoints: [
      "|A| for 2×2: ad − bc; for 3×3 expand along any row/column with sign pattern.",
      "Properties: |AB| = |A||B|; |Aᵀ| = |A|; swapping rows flips sign; identical rows ⇒ 0.",
      "Minor Mᵢⱼ: determinant after deleting row i, column j; cofactor Cᵢⱼ = (−1)^(i+j) Mᵢⱼ.",
      "Inverse: A⁻¹ = adj(A)/|A|, exists when |A| ≠ 0 (non-singular).",
      "Cramer's rule solves systems: x = Dₓ/D etc.; area of triangle via determinant.",
    ],
    formulas: [
      { name: "2×2 determinant", formula: "|A| = ad − bc" },
      { name: "Inverse", formula: "A⁻¹ = adj(A) / |A|" },
      { name: "Triangle area", formula: "Area = ½ |x₁(y₂−y₃) + x₂(y₃−y₁) + x₃(y₁−y₂)|" },
    ],
    glossary: [
      { term: "Cofactor", def: "Signed minor (−1)^(i+j)Mᵢⱼ.", hindi: "सहखंड" },
      { term: "Adjoint", def: "Transpose of the cofactor matrix.", hindi: "सहखंडज" },
      { term: "Singular matrix", def: "Matrix with |A| = 0 — no inverse.", hindi: "व्युत्क्रमणीय नहीं" },
    ],
    mistakes: [
      "Forgetting the (−1)^(i+j) sign in cofactors.",
      "Dividing by |A| = 0 when inverting a singular matrix.",
    ],
    pyqs: [
      {
        q: "A matrix is singular when:",
        options: ["|A| = 0", "|A| = 1", "A = Aᵀ", "A is symmetric"],
        answer: 0,
        explanation: "Zero determinant means no inverse exists.",
      },
      {
        q: "|AB| equals:",
        options: ["|A||B|", "|A|+|B|", "|A|−|B|", "|BA| only if square"],
        answer: 0,
        explanation: "Determinants multiply: |AB| = |A|·|B|.",
      },
    ],
    tip: "Row/column operations that create zeros make 3×3 expansion far faster — use them.",
  },
  "maths:maths-c19": {
    summary:
      "Continuity and Differentiability covers continuity, differentiability, the chain rule and logarithmic differentiation.",
    keyPoints: [
      "Continuity at a: lim_{x→a} f(x) = f(a); polynomials continuous everywhere.",
      "Differentiable ⇒ continuous; the converse is false (e.g. |x| at 0).",
      "Chain rule: dy/dx = dy/du · du/dx.",
      "Implicit differentiation: differentiate both sides w.r.t. x, solving for dy/dx.",
      "Logarithmic differentiation: ln both sides for products/powers (x^x, a^f(x)).",
    ],
    formulas: [
      { name: "Chain rule", formula: "dy/dx = dy/du · du/dx" },
      { name: "x^x derivative", formula: "d/dx xˣ = xˣ(1 + ln x)" },
    ],
    glossary: [
      { term: "Continuity", def: "No breaks — limit equals function value.", hindi: "सांतत्य" },
      { term: "Differentiability", def: "Derivative exists — smooth, unique tangent.", hindi: "अवकलनीयता" },
    ],
    mistakes: [
      "Saying continuous functions are always differentiable (|x| breaks it).",
      "Forgetting the inner derivative in the chain rule.",
    ],
    pyqs: [
      {
        q: "f(x) = |x| at x = 0 is:",
        options: ["continuous but not differentiable", "differentiable", "neither", "discontinuous"],
        answer: 0,
        explanation: "The two-sided limit exists but the tangent isn't unique.",
      },
      {
        q: "d/dx (sin 2x) equals:",
        options: ["2 cos 2x", "cos 2x", "2 sin 2x", "−2 cos 2x"],
        answer: 0,
        explanation: "Chain rule: cos 2x × 2 = 2 cos 2x.",
      },
    ],
    tip: "Continuity questions: compute the left and right limits, then compare to f(a).",
  },
  "maths:maths-c20": {
    summary:
      "Application of Derivatives applies calculus to rates, tangents, monotonicity and maxima-minima.",
    keyPoints: [
      "dy/dx = rate of change; 'rate of change of x w.r.t. time' uses the chain rule.",
      "Tangent slope at x₀ = f'(x₀); normal slope = −1/f'(x₀).",
      "f increasing where f'(x) > 0; decreasing where f'(x) < 0.",
      "Maxima/minima: critical points f'(x) = 0; second derivative test: f'' < 0 max, f'' > 0 min.",
      "Word problems: write the quantity to optimise, one variable, then differentiate.",
    ],
    formulas: [
      { name: "Tangent slope", formula: "m = f'(x₀)" },
      { name: "Normal slope", formula: "m = −1/f'(x₀)" },
      { name: "Second derivative test", formula: "f''(x₀) < 0 ⇒ max; > 0 ⇒ min" },
    ],
    glossary: [
      { term: "Critical point", def: "Where f'(x) = 0 or doesn't exist.", hindi: "क्रांतिक बिंदु" },
      { term: "Monotonic", def: "Consistently increasing or decreasing on an interval.", hindi: "एकदिष्ट" },
    ],
    mistakes: [
      "Forgetting to verify maxima vs minima with the second derivative.",
      "Answering 'derivative = 0' without checking endpoint values in closed-interval problems.",
    ],
    pyqs: [
      {
        q: "The maximum of f(x) = −x² + 4x occurs at:",
        options: ["x = 2", "x = 0", "x = 4", "x = −2"],
        answer: 0,
        explanation: "f'(x) = −2x + 4 = 0 ⇒ x = 2; f'' = −2 < 0 confirms max.",
      },
      {
        q: "A function is increasing where:",
        options: ["f'(x) > 0", "f'(x) < 0", "f'(x) = 0", "f''(x) > 0"],
        answer: 0,
        explanation: "Positive derivative means rising function.",
      },
    ],
    tip: "Optimisation: endpoints and critical points both candidates — always compare.",
  },
  "maths:maths-c21": {
    summary:
      "Integrals covers integration techniques — substitution, parts, partial fractions and definite integrals.",
    keyPoints: [
      "Integration reverses differentiation; + C constant for indefinite integrals.",
      "Substitution: choose u = inner function, du = u' dx.",
      "By parts: ∫u dv = uv − ∫v du — choose u via ILATE (Inverse, Log, Algebra, Trig, Exp).",
      "Partial fractions decompose rational functions before integrating.",
      "Definite integrals: Newton-Leibniz; properties ∫₀ᵃ f = ∫₀ᵃ f(a−x); odd functions integrate to 0 on symmetric limits.",
    ],
    formulas: [
      { name: "Integration by parts", formula: "∫u dv = uv − ∫v du" },
      { name: "Power rule", formula: "∫xⁿ dx = xⁿ⁺¹/(n+1) + C" },
      { name: "Symmetry property", formula: "∫₋ₐᵃ f(x) dx = 0 for odd f" },
    ],
    glossary: [
      { term: "Indefinite integral", def: "Family of antiderivatives, +C.", hindi: "अनिश्चित समाकल" },
      { term: "Definite integral", def: "Integral with limits, giving an area value.", hindi: "निश्चित समाकल" },
    ],
    mistakes: [
      "Choosing u poorly in by-parts — ILATE order prevents it.",
      "Forgetting the +C on indefinite integrals.",
    ],
    pyqs: [
      {
        q: "∫x³ dx equals:",
        options: ["x⁴/4 + C", "3x² + C", "x² + C", "4x³ + C"],
        answer: 0,
        explanation: "Power rule: x⁴/4 + C.",
      },
      {
        q: "∫₀¹ x dx equals:",
        options: ["1/2", "1", "0", "2"],
        answer: 0,
        explanation: "[x²/2]₀¹ = 1/2.",
      },
    ],
    tip: "In by-parts, ILATE decides u — Inverse/Log first, Exponential last.",
  },
  "maths:maths-c22": {
    summary:
      "Application of Integrals uses integration to find areas under and between curves.",
    keyPoints: [
      "Area under y = f(x) from a to b: ∫ₐᵇ f(x) dx (above the x-axis).",
      "Area between curves: ∫ (upper − lower) dx over the intersection interval.",
      "Find intersection points by solving f(x) = g(x).",
      "Symmetry can halve the work (e.g. area of a circle via quadrant).",
    ],
    formulas: [
      { name: "Area under curve", formula: "A = ∫ₐᵇ f(x) dx" },
      { name: "Area between curves", formula: "A = ∫ₐᵇ [f(x) − g(x)] dx, f ≥ g" },
    ],
    glossary: [
      { term: "Definite integral as area", def: "Signed area between curve and axis.", hindi: "क्षेत्रफल" },
    ],
    mistakes: [
      "Ignoring which curve is on top — integrate (upper − lower).",
      "Using intersection limits when the region is bounded by axes too.",
    ],
    pyqs: [
      {
        q: "The area enclosed by y = x² and the x-axis from x = 0 to 1 is:",
        options: ["1/3", "1/2", "1", "2/3"],
        answer: 0,
        explanation: "∫₀¹ x² dx = 1/3.",
      },
    ],
    tip: "Sketch the region first — 'upper minus lower' is only valid after knowing the layout.",
  },
  "maths:maths-c23": {
    summary:
      "Differential Equations covers order, degree, and solution methods — variable separable, homogeneous, linear.",
    keyPoints: [
      "Order: highest derivative; degree: power of the highest derivative (after clearing radicals).",
      "Variable separable: dy/dx = f(x)g(y) → separate and integrate.",
      "Homogeneous: dy/dx = f(y/x); substitute y = vx.",
      "Linear first order: dy/dx + P(x)y = Q(x); integrating factor e^∫P dx.",
      "Solutions: general (with constants) vs particular (with initial conditions).",
    ],
    formulas: [
      { name: "Integrating factor", formula: "IF = e^{∫P dx}" },
      { name: "Linear DE solution", formula: "y·IF = ∫ Q·IF dx + C" },
    ],
    glossary: [
      { term: "Order of a DE", def: "Highest derivative order present.", hindi: "कोटि" },
      { term: "Integrating factor", def: "Multiplier making a linear DE exact.", hindi: "समाकलन गुणक" },
    ],
    mistakes: [
      "Mixing order and degree — degree is the power, not the number of derivatives.",
      "Forgetting the constant when integrating (it defines the general solution).",
    ],
    pyqs: [
      {
        q: "The order of (y'')² + y' = 0 is:",
        options: ["2", "1", "4", "0"],
        answer: 0,
        explanation: "Order = highest derivative = 2 (degree is 2, the power).",
      },
      {
        q: "dy/dx = x is solved as:",
        options: ["y = x²/2 + C", "y = x + C", "y = 2x + C", "y = x² + C"],
        answer: 0,
        explanation: "Integrate both sides: y = x²/2 + C.",
      },
    ],
    tip: "Read 'order' vs 'degree' carefully — they are usually different numbers.",
  },
  "maths:maths-c24": {
    summary:
      "Vector Algebra covers vector operations, dot and cross products and scalar triple products.",
    keyPoints: [
      "Vector: magnitude + direction; unit vector â = a/|a|.",
      "Dot product a·b = |a||b|cosθ = a₁b₁ + a₂b₂ + a₃b₃; zero ⇒ perpendicular.",
      "Cross product a×b = |a||b|sinθ n̂; magnitude = parallelogram area.",
      "Projection of a on b = (a·b)/|b|.",
      "Scalar triple product [a b c] = a·(b×c); zero ⇒ coplanar vectors.",
    ],
    formulas: [
      { name: "Dot product", formula: "a·b = |a||b| cosθ" },
      { name: "Cross product", formula: "|a×b| = |a||b| sinθ" },
      { name: "Projection", formula: "proj_b(a) = (a·b)/|b|" },
    ],
    glossary: [
      { term: "Unit vector", def: "Vector of magnitude 1 along a direction.", hindi: "इकाई सदिश" },
      { term: "Coplanar", def: "Vectors lying in one plane ([a b c] = 0).", hindi: "समतलीय" },
    ],
    mistakes: [
      "Using the dot product formula where the cross product is needed.",
      "Forgetting a×b is perpendicular to both a and b (right-hand rule).",
    ],
    pyqs: [
      {
        q: "a·b = 0 means the vectors are:",
        options: ["perpendicular", "parallel", "equal", "opposite"],
        answer: 0,
        explanation: "cosθ = 0 ⇒ θ = 90°.",
      },
      {
        q: "|a×b| equals:",
        options: ["area of the parallelogram", "length of a", "length of b", "a·b"],
        answer: 0,
        explanation: "Cross-product magnitude is the parallelogram area.",
      },
    ],
    tip: "Dot gives a scalar (cos), cross gives a vector (sin) — remember by the cosine/sine.",
  },
  "maths:maths-c25": {
    summary:
      "Three Dimensional Geometry covers direction cosines, lines, planes, angles and distances in space.",
    keyPoints: [
      "Direction cosines l, m, n satisfy l² + m² + n² = 1; direction ratios are proportional to them.",
      "Line equations: vector r = a + λb or Cartesian (x−x₁)/l = (y−y₁)/m = (z−z₁)/n.",
      "Angle between lines: cosθ = |l₁l₂ + m₁m₂ + n₁n₂|; parallel when ratios proportional.",
      "Plane: ax + by + cz + d = 0 with normal (a,b,c); intercept form x/a + y/b + z/c = 1.",
      "Distance of point to plane: |ax₁+by₁+cz₁+d|/√(a²+b²+c²); angle between planes via normals.",
    ],
    formulas: [
      { name: "Direction cosine rule", formula: "l² + m² + n² = 1" },
      { name: "Point-plane distance", formula: "d = |ax₁ + by₁ + cz₁ + d| / √(a² + b² + c²)" },
      { name: "Line equation", formula: "(x−x₁)/l = (y−y₁)/m = (z−z₁)/n" },
    ],
    glossary: [
      { term: "Direction cosines", def: "Cosines of angles a line makes with the axes.", hindi: "दिक्-कोसाइन" },
      { term: "Normal", def: "Vector perpendicular to a plane.", hindi: "अभिलंब" },
    ],
    mistakes: [
      "Using direction ratios as if they were direction cosines without normalising.",
      "Forgetting the absolute value in distance-to-plane questions.",
    ],
    pyqs: [
      {
        q: "The distance of (1, 2, 2) from the plane x + y + z = 0 is:",
        options: ["5/√3", "√3/5", "5", "3/√5"],
        answer: 0,
        explanation: "|1+2+2|/√3 = 5/√3.",
      },
      {
        q: "For direction cosines, l² + m² + n² equals:",
        options: ["1", "0", "3", "√3"],
        answer: 0,
        explanation: "Unit normalisation forces the sum of squares to 1.",
      },
    ],
    tip: "Angles between lines and planes: use the direction/normal vectors, then cosθ formula.",
  },
  "maths:maths-c26": {
    summary:
      "Linear Programming optimises a linear objective under linear constraints on the feasible region.",
    keyPoints: [
      "Objective function: maximise/minimise Z = ax + by; constraints are linear inequalities.",
      "Feasible region: intersection of all half-planes; optimum occurs at a corner point.",
      "Corner point method: evaluate Z at every vertex; choose the best.",
      "Unbounded regions: check whether the optimum is truly attained (test a larger value).",
      "Integer programming: examine integer points near the optimum corner.",
    ],
    formulas: [
      { name: "Corner point method", formula: "Optimum of a linear function on a polygon occurs at a vertex" },
    ],
    glossary: [
      { term: "Feasible region", def: "Region satisfying all constraints.", hindi: "सुसंगत क्षेत्र" },
      { term: "Objective function", def: "Linear function to optimise.", hindi: "उद्देश्य फलन" },
    ],
    mistakes: [
      "Picking an interior point instead of a corner — the optimum is at a vertex.",
      "Mis-shading the feasible region from one wrong inequality.",
    ],
    pyqs: [
      {
        q: "In an LPP, the maximum of Z occurs at:",
        options: ["a corner point", "the origin always", "any interior point", "the y-axis only"],
        answer: 0,
        explanation: "The fundamental theorem of LP: optimum at a vertex.",
      },
    ],
    tip: "Sketch constraints, shade the feasible region, list the corners, test each — mechanical and safe.",
  },
  "maths:maths-c27": {
    summary:
      "Probability (Class 12) covers conditional probability, Bayes' theorem, random variables and binomial distributions.",
    keyPoints: [
      "Conditional probability: P(A|B) = P(A∩B)/P(B).",
      "Bayes' theorem: reverse conditional probabilities with prior weights.",
      "Random variable X: maps outcomes to numbers; expectation E(X) = Σx P(x).",
      "Variance Var(X) = E(X²) − [E(X)]².",
      "Binomial: n trials, success p; P(X=r) = nCr p^r q^(n−r); mean np, variance npq.",
    ],
    formulas: [
      { name: "Conditional probability", formula: "P(A|B) = P(A∩B)/P(B)" },
      { name: "Binomial", formula: "P(X=r) = nCr p^r q^(n−r)" },
      { name: "Binomial mean/var", formula: "μ = np, σ² = npq" },
    ],
    glossary: [
      { term: "Conditional probability", def: "Probability of A given B has occurred.", hindi: "प्रतिबंधी प्रायिकता" },
      { term: "Random variable", def: "Numerical outcome of a random experiment.", hindi: "यादृच्छिक चर" },
    ],
    mistakes: [
      "Using P(A∩B) = P(A)P(B) for dependent events — only valid when independent.",
      "Confusing binomial with geometric distributions in word problems.",
    ],
    pyqs: [
      {
        q: "For a binomial with n = 10, p = 0.5, the mean is:",
        options: ["5", "2.5", "10", "0.5"],
        answer: 0,
        explanation: "np = 10 × 0.5 = 5.",
      },
      {
        q: "E(X²) − [E(X)]² gives:",
        options: ["variance", "mean", "standard deviation", "covariance"],
        answer: 0,
        explanation: "That's the computational form of variance.",
      },
    ],
    tip: "Bayes: list the 'prior' probabilities and their conditional branches, then apply the formula.",
  },
};
