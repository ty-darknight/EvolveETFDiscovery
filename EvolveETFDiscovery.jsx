import React, { useMemo, useState, useEffect } from "react";

/**
 * Evolve ETF Discovery
 * ------------------------------------------------------------------
 * A consumer-facing, educational ETF discovery experience.
 *
 * IMPORTANT: The `FUNDS` dataset below is ILLUSTRATIVE PLACEHOLDER data.
 * Replace every field (ticker, objective, holdings, distribution, risk)
 * with official current Evolve fund data before any real use. The value
 * here is the matching engine + UX, not the fund facts.
 *
 * Nothing in this tool is personalized investment advice. Results are
 * educational and non-individualized.
 */

/* ---------- Brand tokens (from Evolve brand system) ---------- */
const C = {
  navy: "#102B46",
  navy2: "#1B4A72",
  blue: "#1E6FFF",
  blueDk: "#1758CC",
  blueTint: "#EAF1FF",
  light: "#F6F8FB",
  border: "#E6EAF0",
  text: "#263238",
  muted: "#6C7A89",
  white: "#FFFFFF",
  green: "#12B76A",
  greenTint: "#E7F8EF",
};

const font =
  "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";

const LOGO = "data:image/png;base64,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";

/* ---------- Illustrative fund data (REPLACE WITH OFFICIAL DATA) ---------- */
/* themes use the same vocabulary as the interests question.
   risk: 1 Conservative → 4 Aggressive
   growth / income: 0 none → 3 high
   type: "broad" | "thematic" | "income" | "fixed" | "crypto"           */
const FUNDS = [
  {
    ticker: "ARTI", name: "Evolve Artificial Intelligence Fund", type: "thematic",
    themes: ["Artificial Intelligence", "Technology", "U.S. Equities", "Global Markets"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Seeks long-term capital growth by investing in companies developing or applying artificial intelligence.",
    holdings: ["NVIDIA", "Microsoft", "Alphabet", "Meta", "Broadcom"],
    sectors: [["Technology", 68], ["Communication", 18], ["Consumer", 14]],
  },
  {
    ticker: "EDGE", name: "Evolve Innovation Index Fund", type: "thematic",
    themes: ["Technology", "Artificial Intelligence", "Global Markets", "U.S. Equities"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Provides exposure to disruptive innovation across AI, robotics, fintech, genomics and clean energy.",
    holdings: ["Tesla", "Palantir", "Shopify", "CrowdStrike", "Coinbase"],
    sectors: [["Technology", 55], ["Health Care", 20], ["Financials", 15], ["Other", 10]],
  },
  {
    ticker: "CYBR", name: "Evolve Cyber Security Index Fund", type: "thematic",
    themes: ["Technology", "U.S. Equities", "Global Markets"],
    risk: 3, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Tracks companies in the cyber-security industry across hardware, software and services.",
    holdings: ["Palo Alto", "Fortinet", "CrowdStrike", "Zscaler", "Cloudflare"],
    sectors: [["Technology", 88], ["Industrials", 12]],
  },
  {
    ticker: "HERO", name: "Evolve E-Gaming Index Fund", type: "thematic",
    themes: ["Technology", "Global Markets"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Provides exposure to the global e-gaming and esports industry.",
    holdings: ["Nintendo", "Roblox", "EA", "Take-Two", "Sea Ltd"],
    sectors: [["Communication", 60], ["Technology", 28], ["Consumer", 12]],
  },
  {
    ticker: "CARS", name: "Evolve Automobile Innovation Index Fund", type: "thematic",
    themes: ["Technology", "Global Markets"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Invests in companies driving innovation in electric and autonomous vehicles.",
    holdings: ["Tesla", "BYD", "NVIDIA", "Aptiv", "ON Semi"],
    sectors: [["Consumer Disc.", 45], ["Technology", 40], ["Industrials", 15]],
  },
  {
    ticker: "LIFE", name: "Evolve Global Healthcare Enhanced Yield Fund", type: "income",
    themes: ["Healthcare", "Global Markets", "Covered Call Strategies", "Dividend Investing"],
    risk: 2, growth: 1, income: 3, distribution: "Monthly",
    goals: ["income", "reduce", "diversify"],
    objective: "Combines a portfolio of global healthcare leaders with a covered-call strategy to enhance monthly income.",
    holdings: ["UnitedHealth", "Eli Lilly", "J&J", "Merck", "AbbVie"],
    sectors: [["Health Care", 100]],
  },
  {
    ticker: "CALL", name: "Evolve US Banks Enhanced Yield Fund", type: "income",
    themes: ["Financials", "U.S. Equities", "Covered Call Strategies", "Dividend Investing"],
    risk: 3, growth: 1, income: 3, distribution: "Monthly",
    goals: ["income", "diversify"],
    objective: "Holds large-cap U.S. banks with a covered-call overlay to generate enhanced monthly cash flow.",
    holdings: ["JPMorgan", "Bank of America", "Wells Fargo", "Morgan Stanley", "Goldman Sachs"],
    sectors: [["Financials", 100]],
  },
  {
    ticker: "BANK", name: "Evolve Canadian Banks Enhanced Yield Fund", type: "income",
    themes: ["Financials", "Canadian Equities", "Covered Call Strategies", "Dividend Investing"],
    risk: 2, growth: 1, income: 3, distribution: "Monthly",
    goals: ["income", "reduce"],
    objective: "Holds the major Canadian banks with a covered-call strategy for enhanced monthly income.",
    holdings: ["RBC", "TD", "Scotiabank", "BMO", "CIBC"],
    sectors: [["Financials", 100]],
  },
  {
    ticker: "ESPX", name: "Evolve S&P 500 Enhanced Yield Fund", type: "income",
    themes: ["U.S. Equities", "Covered Call Strategies", "Dividend Investing"],
    risk: 2, growth: 2, income: 3, distribution: "Monthly",
    goals: ["income", "wealth", "diversify"],
    objective: "Tracks the S&P 500 with a covered-call overlay to deliver monthly income plus market participation.",
    holdings: ["Apple", "Microsoft", "NVIDIA", "Amazon", "Alphabet"],
    sectors: [["Technology", 32], ["Financials", 14], ["Health Care", 12], ["Other", 42]],
  },
  {
    ticker: "TECH", name: "Evolve FANGMA Index Fund", type: "thematic",
    themes: ["Technology", "U.S. Equities", "Artificial Intelligence"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Equal-weight exposure to the six mega-cap U.S. technology leaders.",
    holdings: ["Apple", "Microsoft", "Alphabet", "Amazon", "Meta"],
    sectors: [["Technology", 66], ["Communication", 20], ["Consumer Disc.", 14]],
  },
  {
    ticker: "BOND", name: "Evolve Active Core Fixed Income Fund", type: "fixed",
    themes: ["Canadian Equities", "Global Markets"],
    risk: 1, growth: 0, income: 2, distribution: "Monthly",
    goals: ["preserve", "reduce", "income", "diversify"],
    objective: "Actively managed core fixed-income portfolio focused on capital preservation and steady income.",
    holdings: ["Gov't of Canada", "Provincial bonds", "Investment-grade corp.", "US Treasuries"],
    sectors: [["Government", 55], ["Corporate", 40], ["Cash", 5]],
  },
  {
    ticker: "EBIT", name: "Evolve Bitcoin ETF", type: "crypto",
    themes: ["Crypto Assets"],
    risk: 4, growth: 3, income: 0, distribution: "None",
    goals: ["wealth", "innovation"],
    objective: "Provides direct exposure to the price of bitcoin.",
    holdings: ["Bitcoin (spot)"],
    sectors: [["Digital Assets", 100]],
  },
];

const RISK_LABELS = ["Conservative", "Balanced", "Growth", "Aggressive"];

const GOAL_REASON = {
  wealth: "Supports long-term wealth building",
  income: "Designed to generate income",
  preserve: "Oriented toward capital preservation",
  diversify: "Adds diversification to a portfolio",
  innovation: "Focused on innovation",
  reduce: "Aims to reduce volatility",
};

/* ---------- Questions ---------- */
const GOALS = [
  { id: "wealth", label: "Build long-term wealth" },
  { id: "income", label: "Generate monthly income" },
  { id: "preserve", label: "Preserve capital" },
  { id: "diversify", label: "Diversify my portfolio" },
  { id: "innovation", label: "Invest in innovation" },
  { id: "reduce", label: "Reduce portfolio volatility" },
];

const INTERESTS = [
  "Artificial Intelligence", "Technology", "Healthcare", "Energy",
  "Financials", "Canadian Equities", "U.S. Equities", "Global Markets",
  "Crypto Assets", "Dividend Investing", "Covered Call Strategies", "ESG / Sustainability",
];

const HORIZONS = ["Less than 2 years", "2–5 years", "5–10 years", "10+ years"];

const INCOME_OPTS = [
  { id: "monthly", label: "Monthly income is important" },
  { id: "quarterly", label: "Quarterly is fine" },
  { id: "growth", label: "Growth is more important than income" },
  { id: "none", label: "No preference" },
];

const EXISTING = [
  "Broad market ETFs", "Individual stocks", "Mutual funds",
  "Bonds", "GICs", "Cash", "Crypto", "None",
];

const KNOWLEDGE = ["Beginner", "Some experience", "Experienced investor", "Financial advisor"];

/* ---------- Matching engine ---------- */
function scoreFund(f, a) {
  let score = 0;
  const reasons = [];

  const matched = (a.interests || []).filter((t) => f.themes.includes(t));
  if (matched.length) {
    score += Math.min(matched.length, 3) * 22;
    matched.slice(0, 2).forEach((t) => reasons.push(`Interested in ${t}`));
  }

  const gap = Math.abs((a.risk ?? 1) - (f.risk - 1));
  score += (3 - gap) * 12;
  if (gap === 0) reasons.push(`Matches your ${RISK_LABELS[a.risk ?? 1].toLowerCase()} risk comfort`);
  else if (gap === 1) reasons.push("Close to your risk comfort");

  if (a.goal && f.goals.includes(a.goal)) {
    score += 20;
    reasons.push(GOAL_REASON[a.goal]);
  }

  if (a.income === "monthly" && f.distribution === "Monthly" && f.income >= 2) {
    score += 24; reasons.push("Pays monthly income");
  } else if (a.income === "quarterly" && f.income >= 2) {
    score += 12; reasons.push("Provides regular income");
  } else if (a.income === "growth" && f.growth >= 2 && f.income <= 1) {
    score += 18; reasons.push("Prioritizes growth over income");
  }

  const hi = HORIZONS.indexOf(a.horizon);
  if (hi >= 0) {
    if (hi <= 1 && f.risk <= 2) score += 12;
    else if (hi >= 2 && f.growth >= 2) score += 12;
    else score += 4;
  }

  if ((a.existing || []).includes("Broad market ETFs") && f.type === "thematic") {
    score += 8; reasons.push("Complements broad-market holdings");
  }

  const pct = Math.max(45, Math.min(97, Math.round((score / 132) * 100)));
  // de-duplicate reasons, keep order
  const seen = new Set();
  const clean = reasons.filter((r) => (seen.has(r) ? false : (seen.add(r), true)));
  return { pct, reasons: clean.slice(0, 4), raw: score };
}

function rankFunds(a) {
  return FUNDS.map((f) => ({ fund: f, ...scoreFund(f, a) }))
    .sort((x, y) => y.raw - x.raw);
}

/* Illustrative allocation from top matches (educational only) */
function buildAllocation(ranked, a) {
  const top = ranked.slice(0, 6);
  const broad = top.find((r) => r.fund.type === "broad" || r.fund.ticker === "ESPX");
  const income = top.find((r) => r.fund.type === "income");
  const thematic = top.filter((r) => r.fund.type === "thematic").slice(0, 2);
  const fixed = top.find((r) => r.fund.type === "fixed");

  const rows = [];
  if (broad) rows.push({ label: broad.fund.ticker, name: "Core U.S. equity", pct: 35 });
  if (thematic[0]) rows.push({ label: thematic[0].fund.ticker, name: "Innovation / theme", pct: 25 });
  if (thematic[1]) rows.push({ label: thematic[1].fund.ticker, name: "Secondary theme", pct: 15 });
  if (income && a.income !== "growth") rows.push({ label: income.fund.ticker, name: "Income", pct: 15 });
  if (fixed && (a.risk ?? 1) <= 1) rows.push({ label: fixed.fund.ticker, name: "Fixed income", pct: 10 });

  // normalize to 100
  const total = rows.reduce((s, r) => s + r.pct, 0) || 1;
  rows.forEach((r) => (r.pct = Math.round((r.pct / total) * 100)));
  const diff = 100 - rows.reduce((s, r) => s + r.pct, 0);
  if (rows.length) rows[0].pct += diff;
  return rows;
}

function profileBars(a) {
  const risk = a.risk ?? 1;
  const themes = a.interests || [];
  const tech = themes.filter((t) =>
    ["Artificial Intelligence", "Technology"].includes(t)).length;
  const intl = themes.includes("Global Markets") || themes.includes("U.S. Equities");
  return [
    { label: "Growth", val: [30, 55, 78, 95][risk] },
    { label: "Technology", val: Math.min(95, 25 + tech * 35) },
    { label: "Income", val: a.income === "monthly" ? 85 : a.income === "quarterly" ? 60 : 25 },
    { label: "International", val: intl ? 70 : 35 },
  ];
}

function aiSummary(a, top) {
  const goal = GOALS.find((g) => g.id === a.goal)?.label.toLowerCase() || "your goals";
  const risk = RISK_LABELS[a.risk ?? 1].toLowerCase();
  const themes = (a.interests || []).slice(0, 2).join(" and ") || "a range of areas";
  const horizon = a.horizon ? a.horizon.toLowerCase() : "your chosen horizon";
  const inc =
    a.income === "monthly" ? " You also prioritized monthly income, so covered-call and enhanced-yield funds feature in your matches."
      : a.income === "growth" ? " You favored growth over income, which is reflected in the growth-oriented funds above." : "";
  return `Based on your answers, you're focused on ${goal} with an interest in ${themes}. You described a ${risk} comfort with market movement and a horizon of ${horizon}, which makes funds like ${top[0]?.fund.ticker} an educational fit to explore.${inc}`;
}

/* ---------- Small UI atoms ---------- */
function Ring({ pct, size = 64, stroke = 7 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const off = c - (pct / 100) * c;
  return (
    <svg width={size} height={size} style={{ display: "block" }} aria-hidden>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.border} strokeWidth={stroke} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none" stroke={C.blue} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={off} strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        style={{ transition: "stroke-dashoffset .9s cubic-bezier(.2,.8,.2,1)" }}
      />
      <text x="50%" y="50%" dominantBaseline="central" textAnchor="middle"
        style={{ font: `700 ${size * 0.26}px ${font}`, fill: C.navy }}>
        {pct}%
      </text>
    </svg>
  );
}

function Bar({ label, val, sub }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 6 }}>
        <span style={{ color: C.navy, fontWeight: 600 }}>{label}</span>
        <span style={{ color: C.muted }}>{sub ?? `${val}%`}</span>
      </div>
      <div style={{ height: 10, background: C.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{
          width: `${val}%`, height: "100%", borderRadius: 99,
          background: `linear-gradient(90deg, ${C.blue}, ${C.navy2})`,
          transition: "width 1s cubic-bezier(.2,.8,.2,1)",
        }} />
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" style={{ flexShrink: 0, marginTop: 2 }} aria-hidden>
      <circle cx="8" cy="8" r="8" fill={C.greenTint} />
      <path d="M4.5 8.2l2.2 2.2 4.8-4.8" fill="none" stroke={C.green} strokeWidth="1.8"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Selectable option ---------- */
function Option({ active, onClick, children, multi }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%", textAlign: "left", cursor: "pointer",
        border: `1.5px solid ${active ? C.blue : C.border}`,
        background: active ? C.blueTint : C.white,
        color: C.navy, fontWeight: 500, fontSize: 15.5,
        padding: "16px 18px", borderRadius: 14, marginBottom: 10,
        display: "flex", alignItems: "center", gap: 12,
        transition: "border-color .15s, background .15s",
      }}
    >
      <span style={{
        width: 20, height: 20, flexShrink: 0,
        borderRadius: multi ? 6 : 99,
        border: `2px solid ${active ? C.blue : C.border}`,
        background: active ? C.blue : C.white,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        {active && (
          <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
            <path d="M2.5 6.2l2.3 2.3 4.7-4.9" fill="none" stroke="#fff" strokeWidth="2"
              strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </span>
      {children}
    </button>
  );
}

/* ================================================================ */
export default function App() {
  const [step, setStep] = useState(0); // 0 welcome, 1..7 questions, 8 results
  const [a, setA] = useState({
    goal: null, interests: [], horizon: null, risk: 1,
    income: null, existing: [], knowledge: null,
  });
  const [tab, setTab] = useState("matches"); // results tabs
  const [openCard, setOpenCard] = useState(null);
  const [compare, setCompare] = useState([]);
  const [leadDone, setLeadDone] = useState(false);

  const TOTAL = 7;
  const ranked = useMemo(() => rankFunds(a), [a]);
  const alloc = useMemo(() => buildAllocation(ranked, a), [ranked, a]);

  useEffect(() => { window.scrollTo?.({ top: 0, behavior: "smooth" }); }, [step, tab]);

  const set = (k, v) => setA((p) => ({ ...p, [k]: v }));
  const toggle = (k, v) =>
    setA((p) => {
      const cur = p[k];
      return { ...p, [k]: cur.includes(v) ? cur.filter((x) => x !== v) : [...cur, v] };
    });

  const canNext = () => {
    switch (step) {
      case 1: return !!a.goal;
      case 2: return a.interests.length > 0;
      case 3: return !!a.horizon;
      case 4: return true;
      case 5: return !!a.income;
      case 6: return true; // optional
      case 7: return !!a.knowledge;
      default: return true;
    }
  };

  const toggleCompare = (t) =>
    setCompare((p) => (p.includes(t) ? p.filter((x) => x !== t) : p.length < 3 ? [...p, t] : p));

  /* ---------- shells ---------- */
  const Shell = ({ children }) => (
    <div style={{ minHeight: "100vh", background: C.light, fontFamily: font, color: C.text }}>
      <style>{`
        * { box-sizing: border-box; }
        button:focus-visible { outline: 3px solid ${C.blue}55; outline-offset: 2px; }
        input:focus-visible { outline: 3px solid ${C.blue}55; }
        input[type=range]{ -webkit-appearance:none; appearance:none; height:8px; border-radius:99px; }
        input[type=range]::-webkit-slider-thumb{ -webkit-appearance:none; width:26px; height:26px; border-radius:50%;
          background:${C.white}; border:4px solid ${C.blue}; cursor:pointer; box-shadow:0 3px 10px rgba(30,111,255,.35); margin-top:-9px;}
        input[type=range]::-moz-range-thumb{ width:26px; height:26px; border-radius:50%;
          background:${C.white}; border:4px solid ${C.blue}; cursor:pointer; box-shadow:0 3px 10px rgba(30,111,255,.35);}
        .cta:hover{ background:${C.blueDk} !important; }
        .ghost:hover{ background:${C.light} !important; }
        @media (prefers-reduced-motion: reduce){ *{ transition:none !important; } }
      `}</style>
      <div style={{ maxWidth: 620, margin: "0 auto", padding: "0 18px 90px" }}>{children}</div>
    </div>
  );

  const NavBar = () => (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "22px 2px 10px",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
        <img src={LOGO} alt="Evolve ETFs" style={{ height: 26, width: "auto", display: "block" }} />
        <span style={{ width: 1, height: 20, background: C.border }} />
        <span style={{ color: C.muted, fontSize: 13, fontWeight: 600 }}>ETF Discovery</span>
      </div>
      {step > 0 && step <= TOTAL && (
        <span style={{ color: C.muted, fontSize: 13, fontWeight: 600 }}>{step} / {TOTAL}</span>
      )}
    </div>
  );

  const Progress = () => (
    <div style={{ height: 6, background: C.border, borderRadius: 99, margin: "4px 2px 26px" }}>
      <div style={{
        width: `${(step / TOTAL) * 100}%`, height: "100%", borderRadius: 99,
        background: `linear-gradient(90deg, ${C.blue}, ${C.navy2})`,
        transition: "width .4s ease",
      }} />
    </div>
  );

  const QNav = () => (
    <div style={{ display: "flex", gap: 12, marginTop: 26 }}>
      {step > 1 && (
        <button className="ghost" onClick={() => setStep(step - 1)} style={{
          flex: "0 0 auto", padding: "15px 22px", borderRadius: 99,
          border: `1.5px solid ${C.border}`, background: C.white, color: C.navy,
          fontWeight: 600, cursor: "pointer", fontSize: 15,
        }}>Back</button>
      )}
      <button
        className="cta"
        disabled={!canNext()}
        onClick={() => setStep(step + 1)}
        style={{
          flex: 1, padding: "15px 22px", borderRadius: 99, border: "none",
          background: canNext() ? C.blue : C.border,
          color: canNext() ? "#fff" : C.muted,
          fontWeight: 700, fontSize: 15.5, cursor: canNext() ? "pointer" : "not-allowed",
        }}>
        {step === TOTAL ? "See my matches" : "Continue"}
      </button>
    </div>
  );

  const QHead = ({ eyebrow, title, sub }) => (
    <div style={{ marginBottom: 22 }}>
      <div style={{ color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 1, textTransform: "uppercase" }}>{eyebrow}</div>
      <h2 style={{ color: C.navy, fontSize: 26, fontWeight: 700, margin: "8px 0 0", letterSpacing: -0.5, lineHeight: 1.2 }}>{title}</h2>
      {sub && <p style={{ color: C.muted, marginTop: 8, fontSize: 15 }}>{sub}</p>}
    </div>
  );

  /* ---------- Welcome ---------- */
  if (step === 0) {
    return (
      <Shell>
        <NavBar />
        <div style={{
          background: `linear-gradient(135deg, ${C.navy}, ${C.navy2})`,
          borderRadius: 24, padding: "46px 30px 40px", color: "#fff", marginTop: 8,
          position: "relative", overflow: "hidden",
        }}>
          <div style={{
            position: "absolute", top: -60, right: -50, width: 200, height: 200,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(30,111,255,.5), transparent 70%)",
          }} />
          <div style={{
            display: "inline-block", padding: "6px 14px", borderRadius: 99,
            background: "rgba(255,255,255,.12)", fontSize: 12.5, fontWeight: 600, marginBottom: 20,
          }}>2–3 minute quiz · Educational</div>
          <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.15, letterSpacing: -0.8, margin: 0 }}>
            Discover ETFs that match your investment goals
          </h1>
          <p style={{ fontSize: 16.5, opacity: 0.9, marginTop: 16, lineHeight: 1.6, maxWidth: 440 }}>
            Answer a few questions to explore Evolve ETFs that align with your interests and objectives —
            with plain-language explanations of why each one fits.
          </p>
          <button className="cta" onClick={() => setStep(1)} style={{
            marginTop: 28, padding: "16px 34px", borderRadius: 99, border: "none",
            background: C.blue, color: "#fff", fontWeight: 700, fontSize: 16, cursor: "pointer",
          }}>Start quiz</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: 18 }}>
          {[["Guided", "questions"], ["Personalized", "shortlist"], ["Educational", "resources"]].map(([a2, b]) => (
            <div key={a2} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px 14px" }}>
              <div style={{ color: C.navy, fontWeight: 700, fontSize: 15 }}>{a2}</div>
              <div style={{ color: C.muted, fontSize: 13 }}>{b}</div>
            </div>
          ))}
        </div>

        <Disclaimer />
      </Shell>
    );
  }

  /* ---------- Results ---------- */
  if (step > TOTAL) {
    const top = ranked.slice(0, 5);
    const tabs = [["matches", "Matches"], ["portfolio", "Portfolio"], ["compare", "Compare"], ["learn", "Learn"], ["save", "Save"]];
    return (
      <Shell>
        <NavBar />
        <div style={{ marginTop: 6, marginBottom: 6 }}>
          <div style={{ color: C.blue, fontWeight: 700, fontSize: 12.5, letterSpacing: 1, textTransform: "uppercase" }}>Your results</div>
          <h2 style={{ color: C.navy, fontSize: 27, fontWeight: 700, margin: "6px 0 0", letterSpacing: -0.5 }}>Top matches for you</h2>
        </div>

        {/* AI-style summary */}
        <div style={{
          background: C.navy, color: "#fff", borderRadius: 18, padding: "20px 22px", margin: "16px 0 22px",
        }}>
          <div style={{ fontSize: 12.5, fontWeight: 700, opacity: .8, letterSpacing: .8, textTransform: "uppercase", marginBottom: 8 }}>Your summary</div>
          <p style={{ margin: 0, lineHeight: 1.6, fontSize: 15 }}>{aiSummary(a, top)}</p>
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 4, marginBottom: 20 }}>
          {tabs.map(([id, label]) => (
            <button key={id} onClick={() => setTab(id)} style={{
              flex: "0 0 auto", padding: "9px 16px", borderRadius: 99, cursor: "pointer",
              border: `1.5px solid ${tab === id ? C.navy : C.border}`,
              background: tab === id ? C.navy : C.white,
              color: tab === id ? "#fff" : C.navy, fontWeight: 600, fontSize: 14,
            }}>{label}</button>
          ))}
        </div>

        {tab === "matches" && (
          <div>
            {top.map((r, i) => {
              const f = r.fund;
              const open = openCard === f.ticker;
              return (
                <div key={f.ticker} style={{
                  background: C.white, border: `1px solid ${C.border}`, borderRadius: 18,
                  padding: 20, marginBottom: 14,
                  boxShadow: i === 0 ? "0 12px 30px rgba(16,43,70,.10)" : "none",
                }}>
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    <Ring pct={r.pct} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                        <span style={{ fontWeight: 800, color: C.navy, fontSize: 16 }}>{f.ticker}</span>
                        {i === 0 && <span style={{ background: C.blueTint, color: C.blue, fontSize: 11.5, fontWeight: 700, padding: "3px 9px", borderRadius: 99 }}>BEST MATCH</span>}
                      </div>
                      <div style={{ color: C.navy, fontSize: 15, fontWeight: 600, marginTop: 3, lineHeight: 1.3 }}>{f.name}</div>
                      <div style={{ display: "flex", gap: 14, marginTop: 8, flexWrap: "wrap", color: C.muted, fontSize: 12.5 }}>
                        <span>Risk · {RISK_LABELS[f.risk - 1]}</span>
                        <span>Distributions · {f.distribution}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                    {r.reasons.map((why) => (
                      <div key={why} style={{ display: "flex", gap: 8, alignItems: "flex-start", fontSize: 13.5, color: C.text }}>
                        <Check /> <span>{why}</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                    <button onClick={() => setOpenCard(open ? null : f.ticker)} className="ghost" style={{
                      flex: 1, padding: "11px", borderRadius: 12, border: `1.5px solid ${C.border}`,
                      background: C.white, color: C.navy, fontWeight: 600, cursor: "pointer", fontSize: 14,
                    }}>{open ? "Hide details" : "View details"}</button>
                    <button onClick={() => toggleCompare(f.ticker)} style={{
                      flex: 1, padding: "11px", borderRadius: 12, cursor: "pointer", fontSize: 14, fontWeight: 600,
                      border: `1.5px solid ${compare.includes(f.ticker) ? C.blue : C.border}`,
                      background: compare.includes(f.ticker) ? C.blueTint : C.white,
                      color: compare.includes(f.ticker) ? C.blue : C.navy,
                    }}>{compare.includes(f.ticker) ? "Added ✓" : "Compare"}</button>
                  </div>

                  {open && <DetailBody f={f} />}
                </div>
              );
            })}
            {compare.length > 0 && (
              <button onClick={() => setTab("compare")} className="cta" style={{
                width: "100%", marginTop: 6, padding: "15px", borderRadius: 99, border: "none",
                background: C.blue, color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 15,
              }}>Compare {compare.length} selected</button>
            )}
          </div>
        )}

        {tab === "portfolio" && (
          <div>
            <Panel title="Your profile at a glance">
              {profileBars(a).map((b) => <Bar key={b.label} label={b.label} val={b.val} />)}
            </Panel>
            <Panel title="Illustrative portfolio mix">
              <p style={{ color: C.muted, fontSize: 13.5, marginTop: -4, marginBottom: 16, lineHeight: 1.5 }}>
                An educational example of how different funds could play complementary roles — not a recommendation.
              </p>
              <div style={{ display: "flex", height: 20, borderRadius: 99, overflow: "hidden", marginBottom: 18 }}>
                {alloc.map((r, idx) => (
                  <div key={r.label} style={{
                    width: `${r.pct}%`,
                    background: [C.navy, C.blue, C.navy2, "#4C8DFF", "#8FB8FF"][idx % 5],
                  }} title={`${r.label} ${r.pct}%`} />
                ))}
              </div>
              {alloc.map((r, idx) => (
                <div key={r.label} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 12, height: 12, borderRadius: 3, background: [C.navy, C.blue, C.navy2, "#4C8DFF", "#8FB8FF"][idx % 5] }} />
                  <span style={{ fontWeight: 700, color: C.navy, width: 52 }}>{r.pct}%</span>
                  <span style={{ fontWeight: 600, color: C.navy }}>{r.label}</span>
                  <span style={{ color: C.muted, fontSize: 13 }}>· {r.name}</span>
                </div>
              ))}
            </Panel>
          </div>
        )}

        {tab === "compare" && (
          <Panel title="Side-by-side comparison">
            {compare.length === 0 ? (
              <Empty msg="Pick up to 3 funds from the Matches tab to compare them here." action={() => setTab("matches")} label="Go to matches" />
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13.5, minWidth: 360 }}>
                  <thead>
                    <tr>
                      <th style={thCell}>Feature</th>
                      {compare.map((t) => <th key={t} style={{ ...thCell, color: C.navy }}>{t}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ["Focus", (f) => f.themes[0]],
                      ["Risk", (f) => RISK_LABELS[f.risk - 1]],
                      ["Distributions", (f) => f.distribution],
                      ["Growth", (f) => ["Low", "Low", "Moderate", "High"][f.growth]],
                      ["Income", (f) => ["None", "Low", "Moderate", "High"][f.income]],
                    ].map(([label, fn]) => (
                      <tr key={label}>
                        <td style={{ ...tdCell, color: C.muted, fontWeight: 600 }}>{label}</td>
                        {compare.map((t) => {
                          const f = FUNDS.find((x) => x.ticker === t);
                          return <td key={t} style={tdCell}>{fn(f)}</td>;
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        )}

        {tab === "learn" && (
          <Panel title="Your learning path">
            <p style={{ color: C.muted, fontSize: 13.5, marginTop: -4, marginBottom: 16 }}>Based on the themes you chose.</p>
            {learningPath(a).map((item) => (
              <div key={item} style={{
                display: "flex", alignItems: "center", gap: 12, padding: "14px 4px",
                borderBottom: `1px solid ${C.border}`,
              }}>
                <span style={{
                  width: 32, height: 32, borderRadius: 9, flexShrink: 0, background: C.blueTint,
                  display: "flex", alignItems: "center", justifyContent: "center", color: C.blue, fontWeight: 800,
                }}>›</span>
                <span style={{ color: C.navy, fontWeight: 600, fontSize: 14.5 }}>{item}</span>
              </div>
            ))}
          </Panel>
        )}

        {tab === "save" && (
          <Panel title="Get a copy of your matches">
            {leadDone ? (
              <div style={{ textAlign: "center", padding: "16px 4px" }}>
                <div style={{ fontSize: 40 }}>✓</div>
                <h3 style={{ color: C.navy, margin: "6px 0" }}>You're all set</h3>
                <p style={{ color: C.muted, fontSize: 14, lineHeight: 1.5 }}>
                  Your personalized summary, fact sheets, and educational resources would be emailed to you.
                </p>
              </div>
            ) : <LeadForm onDone={() => setLeadDone(true)} />}
          </Panel>
        )}

        <button onClick={() => { setStep(0); setTab("matches"); setCompare([]); setOpenCard(null); setLeadDone(false); }}
          className="ghost" style={{
            width: "100%", marginTop: 18, padding: "14px", borderRadius: 99,
            border: `1.5px solid ${C.border}`, background: C.white, color: C.navy, fontWeight: 600, cursor: "pointer",
          }}>Retake quiz</button>

        <Disclaimer />
      </Shell>
    );
  }

  /* ---------- Question steps ---------- */
  return (
    <Shell>
      <NavBar />
      <Progress />

      {step === 1 && (
        <div>
          <QHead eyebrow="Goals" title="What are you hoping to achieve?" sub="Choose the one that fits best right now." />
          {GOALS.map((g) => (
            <Option key={g.id} active={a.goal === g.id} onClick={() => set("goal", g.id)}>{g.label}</Option>
          ))}
        </div>
      )}

      {step === 2 && (
        <div>
          <QHead eyebrow="Interests" title="Which themes interest you most?" sub="Pick as many as you like." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {INTERESTS.map((t) => (
              <button key={t} onClick={() => toggle("interests", t)} style={{
                cursor: "pointer", padding: "14px 12px", borderRadius: 13, fontSize: 14, fontWeight: 600, textAlign: "left",
                border: `1.5px solid ${a.interests.includes(t) ? C.blue : C.border}`,
                background: a.interests.includes(t) ? C.blueTint : C.white,
                color: a.interests.includes(t) ? C.blue : C.navy,
              }}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <QHead eyebrow="Time horizon" title="When will you likely need this money?" />
          {HORIZONS.map((h) => (
            <Option key={h} active={a.horizon === h} onClick={() => set("horizon", h)}>{h}</Option>
          ))}
        </div>
      )}

      {step === 4 && (
        <div>
          <QHead eyebrow="Risk comfort" title="How comfortable are you with market fluctuations?" />
          <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: "28px 22px" }}>
            <div style={{ textAlign: "center", marginBottom: 22 }}>
              <div style={{ fontSize: 24, fontWeight: 800, color: C.navy }}>{RISK_LABELS[a.risk]}</div>
              <div style={{ color: C.muted, fontSize: 13.5, marginTop: 4 }}>{[
                "Prioritizes stability over growth.",
                "A balance of growth and stability.",
                "Accepts more ups and downs for growth.",
                "Comfortable with large swings for maximum growth.",
              ][a.risk]}</div>
            </div>
            <input type="range" min="0" max="3" step="1" value={a.risk}
              onChange={(e) => set("risk", +e.target.value)}
              style={{ width: "100%", background: `linear-gradient(90deg, ${C.blue} ${(a.risk / 3) * 100}%, ${C.border} ${(a.risk / 3) * 100}%)` }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10, color: C.muted, fontSize: 12 }}>
              {RISK_LABELS.map((l) => <span key={l}>{l}</span>)}
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div>
          <QHead eyebrow="Income" title="Would you like regular cash flow from your investments?" />
          {INCOME_OPTS.map((o) => (
            <Option key={o.id} active={a.income === o.id} onClick={() => set("income", o.id)}>{o.label}</Option>
          ))}
        </div>
      )}

      {step === 6 && (
        <div>
          <QHead eyebrow="Existing investments · optional" title="What do you already own?" sub="This helps identify complementary funds rather than duplicating exposure." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {EXISTING.map((t) => (
              <button key={t} onClick={() => toggle("existing", t)} style={{
                cursor: "pointer", padding: "14px 12px", borderRadius: 13, fontSize: 14, fontWeight: 600, textAlign: "left",
                border: `1.5px solid ${a.existing.includes(t) ? C.blue : C.border}`,
                background: a.existing.includes(t) ? C.blueTint : C.white,
                color: a.existing.includes(t) ? C.blue : C.navy,
              }}>{t}</button>
            ))}
          </div>
        </div>
      )}

      {step === 7 && (
        <div>
          <QHead eyebrow="Experience" title="How would you describe your investing experience?" sub="We adjust how much we explain in your results." />
          {KNOWLEDGE.map((k) => (
            <Option key={k} active={a.knowledge === k} onClick={() => set("knowledge", k)}>{k}</Option>
          ))}
        </div>
      )}

      <QNav />
      <Disclaimer />
    </Shell>
  );
}

/* ---------- Result sub-components ---------- */
function Panel({ title, children }) {
  return (
    <div style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 18, padding: 22, marginBottom: 14 }}>
      <h3 style={{ color: C.navy, fontSize: 17, fontWeight: 700, margin: "0 0 16px" }}>{title}</h3>
      {children}
    </div>
  );
}

function DetailBody({ f }) {
  return (
    <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${C.border}` }}>
      <Field label="Objective" value={f.objective} />
      <Field label="Top holdings" value={f.holdings.join(" · ")} />
      <div style={{ marginTop: 12 }}>
        <div style={{ color: C.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: .6, marginBottom: 8 }}>Sector exposure</div>
        {f.sectors.map(([name, pct]) => <Bar key={name} label={name} val={pct} />)}
      </div>
      <div style={{ display: "flex", gap: 8, marginTop: 8, flexWrap: "wrap" }}>
        <Pill>Fact sheet</Pill><Pill>Performance</Pill><Pill>Articles</Pill>
      </div>
    </div>
  );
}

function Field({ label, value }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ color: C.muted, fontSize: 12, fontWeight: 700, textTransform: "uppercase", letterSpacing: .6, marginBottom: 4 }}>{label}</div>
      <div style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{value}</div>
    </div>
  );
}

function Pill({ children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 99,
      border: `1.5px solid ${C.border}`, color: C.blue, fontWeight: 600, fontSize: 13, cursor: "pointer", background: C.white,
    }}>{children} <span style={{ opacity: .6 }}>→</span></span>
  );
}

function Empty({ msg, action, label }) {
  return (
    <div style={{ textAlign: "center", padding: "10px 4px" }}>
      <p style={{ color: C.muted, fontSize: 14.5, lineHeight: 1.5, marginBottom: 16 }}>{msg}</p>
      <button onClick={action} style={{
        padding: "12px 22px", borderRadius: 99, border: "none", background: C.blue,
        color: "#fff", fontWeight: 700, cursor: "pointer",
      }}>{label}</button>
    </div>
  );
}

function LeadForm({ onDone }) {
  const [f, setF] = useState({ name: "", email: "", type: "Investor", province: "" });
  const valid = f.name.trim() && /\S+@\S+\.\S+/.test(f.email);
  const inp = {
    width: "100%", padding: "13px 15px", borderRadius: 12, border: `1.5px solid ${C.border}`,
    fontSize: 15, fontFamily: font, marginTop: 6, color: C.text,
  };
  const lbl = { color: C.navy, fontSize: 13, fontWeight: 600 };
  return (
    <div>
      <label style={lbl}>Name
        <input style={inp} value={f.name} onChange={(e) => setF({ ...f, name: e.target.value })} placeholder="Your name" />
      </label>
      <div style={{ height: 14 }} />
      <label style={lbl}>Email
        <input style={inp} value={f.email} type="email" onChange={(e) => setF({ ...f, email: e.target.value })} placeholder="you@example.com" />
      </label>
      <div style={{ height: 14 }} />
      <div style={lbl}>I am an</div>
      <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
        {["Investor", "Advisor"].map((t) => (
          <button key={t} onClick={() => setF({ ...f, type: t })} style={{
            flex: 1, padding: "12px", borderRadius: 12, cursor: "pointer", fontWeight: 600,
            border: `1.5px solid ${f.type === t ? C.blue : C.border}`,
            background: f.type === t ? C.blueTint : C.white, color: f.type === t ? C.blue : C.navy,
          }}>{t}</button>
        ))}
      </div>
      <div style={{ height: 14 }} />
      <label style={lbl}>Province <span style={{ color: C.muted, fontWeight: 400 }}>(optional)</span>
        <input style={inp} value={f.province} onChange={(e) => setF({ ...f, province: e.target.value })} placeholder="e.g. Ontario" />
      </label>
      <button disabled={!valid} onClick={onDone} style={{
        width: "100%", marginTop: 20, padding: "15px", borderRadius: 99, border: "none",
        background: valid ? C.blue : C.border, color: valid ? "#fff" : C.muted,
        fontWeight: 700, fontSize: 15, cursor: valid ? "pointer" : "not-allowed",
      }}>Email my ETF matches</button>
      <p style={{ color: C.muted, fontSize: 11.5, marginTop: 10, lineHeight: 1.5 }}>
        Demo only — no data is sent or stored. Connect this form to your CRM / marketing platform in production.
      </p>
    </div>
  );
}

function learningPath(a) {
  const t = a.interests || [];
  const base = ["Long-term investing principles", "Understanding sector concentration"];
  const out = [];
  if (t.includes("Artificial Intelligence") || t.includes("Technology"))
    out.push("What is an AI or thematic ETF?", "Benefits of thematic investing", "Technology market outlook");
  if (t.includes("Covered Call Strategies") || a.income === "monthly")
    out.push("Covered call strategies explained", "Monthly distributions: yield vs. total return");
  if (t.includes("Dividend Investing")) out.push("Building an income-focused portfolio");
  if (t.includes("Crypto Assets")) out.push("How crypto ETFs work");
  if (t.includes("ESG / Sustainability")) out.push("The basics of ESG investing");
  return [...new Set([...out, ...base])].slice(0, 6);
}

function Disclaimer() {
  return (
    <p style={{ color: C.muted, fontSize: 11, lineHeight: 1.6, marginTop: 26, textAlign: "center", padding: "0 6px" }}>
      For educational purposes only. Not investment, tax, or financial advice, and not a recommendation to buy or
      sell any fund. Fund data shown is <strong>illustrative placeholder data</strong> and must be replaced with
      official current Evolve fund information. Commissions, management fees and expenses may be associated with ETF
      investments. Please read the prospectus before investing.
    </p>
  );
}

const thCell = { textAlign: "left", padding: "10px 10px", borderBottom: `2px solid ${C.border}`, color: C.muted, fontWeight: 700, fontSize: 12.5 };
const tdCell = { padding: "12px 10px", borderBottom: `1px solid ${C.border}`, color: C.text };
