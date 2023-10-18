export const dollarShortcuts = [
  // Greek letters
  { name: "alpha", value: "\u03B1", entity: "&alpha;" }, // α
  { name: "beta", value: "\u03B2", entity: "&beta;" }, // β
  { name: "gamma", value: "\u03B3", entity: "&gamma;" }, // γ
  { name: "delta", value: "\u03B4", entity: "&delta;" }, // δ
  { name: "epsilon", value: "\u03B5", entity: "&epsilon;" }, // ε
  { name: "zeta", value: "\u03B6", entity: "&zeta;" }, // ζ
  { name: "eta", value: "\u03B7", entity: "&eta;" }, // η
  { name: "theta", value: "\u03B8", entity: "&theta;" }, // θ
  { name: "iota", value: "\u03B9", entity: "&iota;" }, // ι
  { name: "kappa", value: "\u03BA", entity: "&kappa;" }, // κ
  { name: "lambda", value: "\u03BB", entity: "&lambda;" }, // λ
  { name: "mu", value: "\u03BC", entity: "&mu;" }, // μ
  { name: "nu", value: "\u03D3", entity: "&nu;" }, // ν
  { name: "xi", value: "\u03BE", entity: "&xi;" }, // ξ
  { name: "omicron", value: "\u03BF", entity: "&omicron;" }, // ο
  { name: "pi", value: "\u03C0", entity: "&pi;" }, // π
  { name: "rho", value: "\u03C1", entity: "&rho;" }, // ρ
  { name: "sigma", value: "\u03C3", entity: "&sigma;" }, // σ
  { name: "tau", value: "\u03C4", entity: "&tau;" }, // τ
  { name: "upsilon", value: "\u03C5", entity: "&upsilon;" }, // υ
  { name: "phi", value: "\u03C6", entity: "&phi;" }, // φ
  { name: "chi", value: "\u03C7", entity: "&chi;" }, // χ
  { name: "psi", value: "\u03C8", entity: "&psi;" }, // ψ
  { name: "omega", value: "\u03C9", entity: "&omega;" }, // ω

  // Greek letters (uppercase)
  { name: "Alpha", value: "\u0391", entity: "&Alpha;" }, // Α
  { name: "Beta", value: "\u0392", entity: "&Beta;" }, // Β
  { name: "Gamma", value: "\u0393", entity: "&Gamma;" }, // Γ
  { name: "Delta", value: "\u0394", entity: "&Delta;" }, // Δ
  { name: "Epsilon", value: "\u0395", entity: "&Epsilon;" }, // Ε
  { name: "Zeta", value: "\u0396", entity: "&Zeta;" }, // Ζ
  { name: "Eta", value: "\u0397", entity: "&Eta;" }, // Η
  { name: "Theta", value: "\u0398", entity: "&Theta;" }, // Θ
  { name: "Iota", value: "\u0399", entity: "&Iota;" }, // Ι
  { name: "Kappa", value: "\u039A", entity: "&Kappa;" }, // Κ
  { name: "Lambda", value: "\u039B", entity: "&Lambda;" }, // Λ
  { name: "Mu", value: "\u039C", entity: "&Mu;" }, // Μ
  { name: "Nu", value: "\u039D", entity: "&Nu;" }, // Ν
  { name: "Xi", value: "\u03A3", entity: "&Xi;" }, // Ξ
  { name: "Omicron", value: "\u039F", entity: "&Omicron;" }, // Ο
  { name: "Pi", value: "\u03A0", entity: "&Pi;" }, // Π
  { name: "Rho", value: "\u03A1", entity: "&Rho;" }, // Ρ
  { name: "Sigma", value: "\u03A3", entity: "&Sigma;" }, // Σ
  { name: "Tau", value: "\u03A4", entity: "&Tau;" }, // Τ
  { name: "Upsilon", value: "\u03A5", entity: "&Upsilon;" }, // Υ
  { name: "Phi", value: "\u03A6", entity: "&Phi;" }, // Φ
  { name: "Chi", value: "\u03A7", entity: "&Chi;" }, // Χ
  { name: "Psi", value: "\u03A8", entity: "&Psi;" }, // Ψ
  { name: "Omega", value: "\u03A9", entity: "&Omega;" }, // Ω

  // Math symbols
  { name: "e", value: "\u212F", entity: "&euler;" }, // euler's number
  { name: "infinity", value: "\u221E", entity: "&infin;" }, // ∞ (Infinity)
  { name: "degree", value: "\u00B0", entity: "&deg;" }, // ° (Degree)
  { name: "divide", value: "\u00F7", entity: "&divide;" }, // ÷ (Division)
  { name: "multiply", value: "\u00D7", entity: "&times;" }, // × (Multiplication)
  { name: "plus", value: "\u002B", entity: "&plus;" }, // + (Addition)
  { name: "minus", value: "\u2212", entity: "&minus;" }, // − (Subtraction)
  { name: "less", value: "\u003C", entity: "&lt;" }, // < (Less than)
  { name: "greater", value: "\u003E", entity: "&gt;" }, // > (Greater than)
  { name: "leq", value: "\u2264", entity: "&leq;" }, // ≤ (Less than or equal to)
  { name: "geq", value: "\u2265", entity: "&geq;" }, // ≥ (Greater than or equal to)

  { name: "integral", value: "\u222B", entity: "&int;" }, // ∫
  { name: "approx", value: "\u2248", entity: "&approx;" }, // ≈
  { name: "cong", value: "\u2245", entity: "&cong;" }, // ≅
  { name: "neq", value: "\u2260", entity: "&ne;" }, // ≠
  { name: "equiv", value: "\u2261", entity: "&equiv;" }, // ≡
  { name: "sim", value: "\u223C", entity: "&sim;" }, // ∼
  { name: "propto", value: "\u221D", entity: "&prop;" }, // ∝
  { name: "perp", value: "\u22A5", entity: "&perp;" }, // ⊥
  { name: "parallel", value: "\u2225", entity: "&parallel;" }, // ∥
  { name: "nparallel", value: "\u2226", entity: "&nparallel;" }, // ∦
  { name: "avg", value: "\u2300", entity: "&avg;" }, // ⌀
  { name: "average", value: "\u2300", entity: "&avg;" }, // ⌀

  // Fractions
  { name: "half", value: "\u00BD", entity: "&half;" }, // ½
  { name: "quarter", value: "\u00BC", entity: "&quarter;" }, // ¼
  { name: "threequarters", value: "\u00BE", entity: "&threequarters;" }, // ¾
  { name: "onethird", value: "\u2153", entity: "&onethird;" }, // ⅓
  { name: "twothirds", value: "\u2154", entity: "&twothirds;" }, // ⅔
  { name: "onefifth", value: "\u2155", entity: "&onefifth;" }, // ⅕
  { name: "twofifths", value: "\u2156", entity: "&twofifths;" }, // ⅖
  { name: "threefifths", value: "\u2157", entity: "&threefifths;" }, // ⅗
  { name: "fourfifths", value: "\u2158", entity: "&fourfifths;" }, // ⅘
  { name: "onesixth", value: "\u2159", entity: "&onesixth;" }, // ⅙
  { name: "fivesixths", value: "\u215A", entity: "&fivesixths;" }, // ⅚
  { name: "oneeighth", value: "\u215B", entity: "&oneeighth;" }, // ⅛
  { name: "threeeighths", value: "\u215C", entity: "&threeeighths;" }, // ⅜
  { name: "fiveeighths", value: "\u215D", entity: "&fiveeighths;" }, // ⅝
  { name: "seveneighths", value: "\u215E", entity: "&seveneighths;" }, // ⅞
  { name: "oneninth", value: "\u215F", entity: "&oneninth;" }, // ⅟
  { name: "onetenth", value: "\u00BC", entity: "&onetenth;" }, // ⅒

  // Arrows
  { name: "leftarrow", value: "\u2190", entity: "&leftarrow;" }, // ←
  { name: "rightarrow", value: "\u2192", entity: "&rightarrow;" }, // →
  { name: "uparrow", value: "\u2191", entity: "&uparrow;" }, // ↑
  { name: "downarrow", value: "\u2193", entity: "&downarrow;" }, // ↓
  { name: "nwarrow", value: "\u2196", entity: "&nwarrow;" }, // ↖
  { name: "nearrow", value: "\u2197", entity: "&nearrow;" }, // ↗
  { name: "swarrow", value: "\u2199", entity: "&swarrow;" }, // ↙
  { name: "searrow", value: "\u2198", entity: "&searrow;" }, // ↘
  { name: "updownarrow", value: "\u2195", entity: "&updownarrow;" }, // ↕
  { name: "leftrightarrow", value: "\u2194", entity: "&leftrightarrow;" }, // ↔
  { name: "updownarrow2", value: "\u21D5", entity: "&updownarrow2;" }, // ⇕
  { name: "leftrightarrow2", value: "\u21D4", entity: "&leftrightarrow2;" }, // ⇔
  { name: "updownarrow3", value: "\u21C5", entity: "&updownarrow3;" }, // ⇅
  { name: "leftrightarrow3", value: "\u21C4", entity: "&leftrightarrow3;" }, // ⇄
  { name: "updownarrow4", value: "\u21A5", entity: "&updownarrow4;" }, // ↥
  { name: "leftrightarrow4", value: "\u21A4", entity: "&leftrightarrow4;" }, // ↤
  { name: "updownarrow5", value: "\u21A8", entity: "&updownarrow5;" }, // ↨

  // Logic
  { name: "not", value: "\u00AC", entity: "&not;" }, // ¬
  { name: "and", value: "\u2227", entity: "&and;" }, // ∧
  { name: "or", value: "\u2228", entity: "&or;" }, // ∨
  { name: "xor", value: "\u22BB", entity: "&xor;" }, // ⊻
  { name: "nand", value: "\u22BC", entity: "&nand;" }, // ⊼
  { name: "nor", value: "\u22BD", entity: "&nor;" }, // ⊽
  { name: "implies", value: "\u21D2", entity: "&implies;" }, // ⇒
  { name: "iff", value: "\u21D4", entity: "&iff;" }, // ⇔
  { name: "forall", value: "\u2200", entity: "&forall;" }, // ∀
  { name: "exists", value: "\u2203", entity: "&exists;" }, // ∃
  { name: "exists2", value: "\u2204", entity: "&exists2;" }, // ∄
  { name: "in", value: "\u2208", entity: "&in;" }, // ∈
  { name: "notin", value: "\u2209", entity: "&notin;" }, // ∉
  { name: "subset", value: "\u2282", entity: "&subset;" }, // ⊂
  { name: "superset", value: "\u2283", entity: "&superset;" }, // ⊃
  { name: "subset2", value: "\u2284", entity: "&subset2;" }, // ⊄
  { name: "superset2", value: "\u2285", entity: "&superset2;" }, // ⊅
  { name: "union", value: "\u222A", entity: "&union;" }, // ∪
  { name: "intersection", value: "\u2229", entity: "&intersection;" }, // ∩
  { name: "union2", value: "\u222B", entity: "&union2;" }, // ∪
  { name: "intersection2", value: "\u222C", entity: "&intersection2;" }, // ∩
  { name: "emptyset", value: "\u2205", entity: "&emptyset;" }, // ∅

  // Other symbols
  { name: "checkmark", value: "\u2713", entity: "&checkmark;" }, // ✓
  { name: "crossmark", value: "\u2717", entity: "&crossmark;" }, // ✗
  { name: "questionmark", value: "\u2753", entity: "&questionmark;" }, // ❓
  { name: "exclamationmark", value: "\u2757", entity: "&exclamationmark;" }, // ❗
  { name: "heart", value: "\u2665", entity: "&hearts;" }, // ♥
  { name: "diamond", value: "\u2666", entity: "&diams;" }, // ♦
  { name: "spade", value: "\u2660", entity: "&spades;" }, // ♠
  { name: "club", value: "\u2663", entity: "&clubs;" }, // ♣
  { name: "smiley", value: "\u263A", entity: "&smiley;" }, // ☺
  { name: "frowny", value: "\u2639", entity: "&frowny;" }, // ☹
  { name: "sun", value: "\u2600", entity: "&sun;" }, // ☀
  { name: "cloud", value: "\u2601", entity: "&cloud;" }, // ☁
  { name: "umbrella", value: "\u2602", entity: "&umbrella;" }, // ☂
  { name: "snowman", value: "\u2603", entity: "&snowman;" }, // ☃
  { name: "comet", value: "\u2604", entity: "&comet;" }, // ☄
  { name: "star", value: "\u2605", entity: "&star;" }, // ★
  { name: "star2", value: "\u2606", entity: "&star2;" }, // ☆
  { name: "phone", value: "\u260E", entity: "&phone;" }, // ☎
  { name: "ballot", value: "\u2610", entity: "&ballot;" }, // ☐
  { name: "ballot2", value: "\u2611", entity: "&ballot2;" }, // ☑
  { name: "ballot3", value: "\u2612", entity: "&ballot3;" }, // ☒
  { name: "yinyang", value: "\u262F", entity: "&yinyang;" }, // ☯
  { name: "peace", value: "\u262E", entity: "&peace;" }, // ☮
  { name: "biohazard", value: "\u2623", entity: "&biohazard;" }, // ☣
  { name: "radioactive", value: "\u2622", entity: "&radioactive;" }, // ☢
  { name: "copyright", value: "\u00A9", entity: "&copy;" }, // ©
  { name: "copy", value: "\u00A9", entity: "&copy;" }, // ©
  { name: "registered", value: "\u00AE", entity: "&reg;" }, // ®
  { name: "reg", value: "\u00AE", entity: "&reg;" }, // ®
  { name: "trademark", value: "\u2122", entity: "&trade;" }, // ™
  { name: "trade", value: "\u2122", entity: "&trade;" }, // ™
  { name: "tm", value: "\u2122", entity: "&trade;" }, // ™
  { name: "section", value: "\u00A7", entity: "&sect;" }, // §
  { name: "paragraph", value: "\u00B6", entity: "&para;" }, // ¶
  { name: "pilcrow", value: "\u00B6", entity: "&para;" }, // ¶
  { name: "pound", value: "\u00A3", entity: "&pound;" }, // £
  { name: "yen", value: "\u00A5", entity: "&yen;" }, // ¥
  { name: "euro", value: "\u20AC", entity: "&euro;" }, // €
  { name: "cent", value: "\u00A2", entity: "&cent;" }, // ¢
  { name: "dollar", value: "\u0024", entity: "&dollar;" }, // $
  { name: "currency", value: "\u00A4", entity: "&curren;" }, // ¤
];

export default dollarShortcuts;
