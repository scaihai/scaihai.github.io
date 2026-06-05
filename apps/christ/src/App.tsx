import React, { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  Scroll,
  Calculator,
  DoorClosed,
  Users,
  MessageSquare,
  HelpCircle,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight,
  Maximize2,
  Minimize2,
  FileText,
  Compass,
  Sparkles,
  RefreshCw,
  Coins,
  Shield,
  Fingerprint,
  TrendingUp,
  BrainCircuit,
  Lock,
  ChevronDown,
  ChevronUp,
  Send,
  User,
  Cpu,
  BookMarked,
  Layers,
  Scale,
  ExternalLink,
  Flame,
  Binary,
  GitCompare,
  Milestone
} from "lucide-react";
import { propheciesData, tombTheoriesData, eyewitnessesData, pillarsData } from "./data";
import { ChatMessage, Prophecy, TombTheory, Eyewitness, ForensicPillar } from "./types";

export default function App() {
  // Landing Welcome / Motivation View (Default: true)
  const [showLanding, setShowLanding] = useState<boolean>(true);

  // Navigation State
  const [activeTab, setActiveTab] = useState<"prophecies" | "tomb" | "pillars" | "eyewitnesses">("prophecies");

  // Pillars Screen States
  const [selectedPillarId, setSelectedPillarId] = useState<string>("bibliographical");

  // Prophecy Screen States
  const [selectedProphecy, setSelectedProphecy] = useState<string | null>("bethlehem-birth");
  const [prophecyFilter, setProphecyFilter] = useState<"all" | "birth" | "betrayal" | "death">("all");

  // Stoner Probability Sandbox States
  const [selectedSandboxIds, setSelectedSandboxIds] = useState<string[]>([
    "bethlehem-birth",
    "entering-jerusalem",
    "thirty-silver-pieces",
    "crucifixion-pierced"
  ]);
  const [texasCoinCount, setTexasCoinCount] = useState<number>(2); // 2 feet deep default

  // Tomb Theory Screen States
  const [selectedTheory, setSelectedTheory] = useState<string>("resurrection");
  const [activeTombHotspot, setActiveTombHotspot] = useState<string | null>("stone");

  // Eyewitness States
  const [selectedWitness, setSelectedWitness] = useState<string>("peter");
  const [witnessBeforeAfter, setWitnessBeforeAfter] = useState<"before" | "after">("before");

  // Filter prophecies
  const filteredProphecies = propheciesData.filter(p => {
    if (prophecyFilter === "all") return true;
    if (prophecyFilter === "birth") return p.id.includes("birth") || p.id.includes("messenger");
    if (prophecyFilter === "betrayal") return p.id.includes("betrayal") || p.id.includes("silver") || p.id.includes("money");
    if (prophecyFilter === "death") return p.id.includes("pierced") || p.id.includes("silent") || p.id.includes("tomb");
    return true;
  });

  // Calculate Stoner Probability Dynamically based on selected sandbox items
  const calculateCompoundProbability = () => {
    let probabilityPower = 0;
    let baseValueMultiplier = 1;

    selectedSandboxIds.forEach(id => {
      const prop = propheciesData.find(p => p.id === id);
      if (prop) {
        if (id === "bethlehem-birth") {
          baseValueMultiplier *= 2.8;
          probabilityPower += 5;
        } else if (id === "virgin-birth") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 3;
        } else if (id === "preceding-messenger") {
          baseValueMultiplier *= 8.0;
          probabilityPower += 3;
        } else if (id === "entering-jerusalem") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 2;
        } else if (id === "thirty-silver-pieces") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 3;
        } else if (id === "money-to-potter") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 5;
        } else if (id === "crucifixion-pierced") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 4;
        } else if (id === "silent-accusers") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 3;
        } else if (id === "rich-man-tomb") {
          baseValueMultiplier *= 1.0;
          probabilityPower += 3;
        }
      }
    });

    while (baseValueMultiplier >= 10) {
      baseValueMultiplier /= 10;
      probabilityPower += 1;
    }

    return {
      multiplier: baseValueMultiplier.toFixed(1),
      power: probabilityPower,
      count: selectedSandboxIds.length
    };
  };

  const currentProb = calculateCompoundProbability();

  // Get analogical scale phrase based on selected prophecy counts
  const getProbabilityAnalogy = (count: number) => {
    if (count === 0) return "No prophecies selected. Probability is 1 in 1 (Absolute Certainty).";
    if (count === 1) return "Finding 1 marked ticket in a single theater roll (1 in 100,000+).";
    if (count === 2) return "Finding 1 marked coin in a library filled to the waist with silver dollars.";
    if (count === 3) return "Finding 1 marked coin inside a colossal sports arena packed to the ceiling with silver coins.";
    if (count === 4) return "Finding 1 painted marble in a collection spanning the entire city block of Manhattan stacked 10 feet high.";
    if (count === 5) return "Finding 1 specific coin in a pile covering the entire country of Monaco 3 feet deep.";
    if (count === 6) return "Finding 1 red coin in a silver stack covering the state of Rhode Island 5 feet deep.";
    if (count === 7) return "Covering the whole state of Texas with silver dollars to a depth of roughly 6 inches, marking 1, blindfolding an investigator, and having them pick the marked coin on the first attempt.";
    if (count === 8) return "The famous Peter Stoner Benchmark: Covering the entire state of Texas 2 feet deep in silver dollars, marking exactly one, and having a blindfolded traveler select that exact coin on their very first choice.";
    return "The Cosmic United States Benchmark: Covering the entire continental United States 3 feet deep in silver coins. Mathematical odds so minute that they represent a statistical absolute verification of non-random intelligence.";
  };

  const toggleSandboxProphecy = (id: string) => {
    if (selectedSandboxIds.includes(id)) {
      setSelectedSandboxIds(selectedSandboxIds.filter(x => x !== id));
    } else {
      setSelectedSandboxIds([...selectedSandboxIds, id]);
    }
  };

  const applyPresetSandbox = (type: "stoner-8" | "all" | "minimal") => {
    if (type === "stoner-8") {
      setSelectedSandboxIds([
        "bethlehem-birth",
        "preceding-messenger",
        "entering-jerusalem",
        "thirty-silver-pieces",
        "money-to-potter",
        "crucifixion-pierced",
        "silent-accusers",
        "rich-man-tomb"
      ]);
    } else if (type === "all") {
      setSelectedSandboxIds(propheciesData.map(p => p.id));
    } else {
      setSelectedSandboxIds(["bethlehem-birth", "crucifixion-pierced"]);
    }
  };

  return (
    <div className="bg-[#FAF9F5] text-stone-800 min-h-screen font-sans flex flex-col selection:bg-amber-200 selection:text-amber-900" id="main-container">
      
      {/* Editorial Header */}
      <header className="border-b border-stone-200 bg-white/95 backdrop-blur-md sticky top-0 z-40 px-6 py-4 shadow-sm" id="app-header">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="p-3 bg-[#FAF6EE] border border-[#E6DFD3] rounded-2xl shadow-sm text-amber-800 flex items-center justify-center shrink-0">
              <Compass className="w-6 h-6 text-[#9A7D46]" />
            </div>
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start gap-2">
                <span className="font-serif text-2xl font-bold tracking-tight text-stone-900">
                  Historical Christianity Investigator
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest font-semibold bg-[#FAF4E5] text-amber-800 px-2 py-0.5 rounded-full border border-amber-200 shrink-0 self-center">
                  Academic Edition
                </span>
              </div>
              <p className="text-xs text-stone-500 mt-1 max-w-xl">
                An evidence-based, interactive critical exploration mapping Old Testament prophetic codices, Roman tomb logistics, and the psychology of early martyrdom.
              </p>
            </div>
          </div>

          {/* Premium Tab Navigation and Motivation Toggle */}
          {!showLanding ? (
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => setShowLanding(true)}
                className="px-3 py-2 text-xs font-semibold text-amber-800 hover:text-amber-950 bg-[#FAF4E5] hover:bg-[#F2ECD9] border border-amber-250/50 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 shadow-3xs outline-none leading-none"
                title="Return to Personal Motivation and the 5 Categories"
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <span>Origins Preface</span>
              </button>

              <nav className="flex flex-wrap justify-center items-center gap-1.5 bg-stone-100 p-1.5 rounded-xl border border-stone-200/80" id="main-nav">
                <button
                  id="tab-prophecies"
                  onClick={() => setActiveTab("prophecies")}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "prophecies"
                      ? "bg-white text-stone-900 border border-stone-205 shadow-sm font-bold"
                      : "text-stone-500 hover:text-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <Scroll className="w-4 h-4 text-amber-700" />
                  <span>Prophecies</span>
                </button>
                <button
                  id="tab-tomb"
                  onClick={() => setActiveTab("tomb")}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "tomb"
                      ? "bg-white text-stone-900 border border-stone-205 shadow-sm font-bold"
                      : "text-stone-500 hover:text-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <DoorClosed className="w-4 h-4 text-amber-700" />
                  <span>Tomb Logistics</span>
                </button>
                <button
                  id="tab-pillars"
                  onClick={() => setActiveTab("pillars")}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "pillars"
                      ? "bg-white text-stone-900 border border-stone-205 shadow-sm font-bold"
                      : "text-stone-500 hover:text-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <Milestone className="w-4 h-4 text-amber-705" />
                  <span>The Four Pillars</span>
                </button>
                <button
                  id="tab-eyewitnesses"
                  onClick={() => setActiveTab("eyewitnesses")}
                  className={`px-4 py-2.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-2 cursor-pointer ${
                    activeTab === "eyewitnesses"
                      ? "bg-white text-stone-900 border border-stone-205 shadow-sm font-bold"
                      : "text-stone-500 hover:text-stone-850 hover:bg-stone-50"
                  }`}
                >
                  <Users className="w-4 h-4 text-[#9A7D46]" />
                  <span>Eyewitnesses</span>
                </button>
              </nav>
            </div>
          ) : (
            <button
              onClick={() => {
                setShowLanding(false);
                setActiveTab("prophecies");
              }}
              className="px-4 py-2.5 text-xs font-bold font-mono tracking-widest text-white bg-[#826532] hover:bg-[#6e5328] border border-[#826532] hover:border-[#6e5328] rounded-xl transition-all flex items-center gap-2 cursor-pointer shadow-sm group outline-none uppercase"
              title="Skip directly to historical data evidence"
            >
              <Scroll className="w-4 h-4 text-amber-100 group-hover:text-white shrink-0 animate-pulse" />
              <span>Go to Evidence Portal</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
            </button>
          )}

        </div>
      </header>

      {/* Elegant Introductory Briefing Banner */}
      {!showLanding && (
        <div className="bg-gradient-to-r from-[#FAF5EC] via-white to-[#FAF5EC] border-b border-stone-200 py-3.5 px-6" id="briefing-alert">
          <div className="max-w-7xl mx-auto flex items-start gap-3">
            <BookMarked className="w-5 h-5 text-[#9A7D46] shrink-0 mt-0.5" />
            <div className="text-xs text-stone-600 leading-relaxed">
              <span className="font-semibold text-[#826532] tracking-wider uppercase text-[10px] bg-[#F2ECD9] px-2 py-0.5 rounded border border-[#DFD4BC] mr-2 inline-block">
                Axiomatic Framework
              </span>
              This application structures historical data according to standard academic methods, secular manuscript timelines, and cold mathematical probability theory. It is formatted to invite seekers, academics, and thinkers to verify early Christian claims objectively in a clean, restful, distraction-free environment.
            </div>
          </div>
        </div>
      )}

      {/* Main Workspace Frame */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 lg:p-8 flex flex-col gap-8" id="workspace">

        {showLanding ? (
          <div className="max-w-4xl w-full mx-auto flex flex-col gap-8 justify-center my-4" id="motivation-landing-container">
            
            {/* Title & Author Info */}
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <span className="text-[10px] uppercase tracking-widest font-mono font-extrabold text-amber-800 bg-[#FAF4E5] border border-amber-200 px-3.5 py-1 rounded-full shadow-3xs inline-block">
                Historical Christianity Investigator
              </span>
              <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-tight">
                The Foundations of Personal Inquiry
              </h1>
              <p className="text-sm font-serif italic text-stone-500 max-w-lg mx-auto">
                "How does one examine Christian claims?" — An analytical investigation into historical and objective evidence.
              </p>
              
              <div className="pt-2 flex flex-col sm:flex-row justify-center items-center gap-4 text-[10px] sm:text-xs">
                <div className="flex items-center gap-2 font-mono tracking-widest text-[#9A7D46] uppercase font-bold select-none">
                  <span>PREPARED BY DEVELOPER:</span>
                  <span className="bg-amber-100/60 px-2.5 py-0.5 rounded border border-amber-200/50 font-sans tracking-normal text-stone-800 lowercase first-letter:uppercase">Destiny Gogo-fyneface</span>
                </div>
                
                <span className="hidden sm:inline text-stone-300">|</span>
                
                <button
                  onClick={() => {
                    setShowLanding(false);
                    setActiveTab("prophecies");
                  }}
                  className="font-mono tracking-normal text-amber-900 hover:text-amber-950 bg-amber-50 hover:bg-[#F2ECD9] px-3 py-1 rounded-lg border border-amber-250 font-extrabold cursor-pointer transition-all flex items-center gap-1 hover:shadow-3xs"
                >
                  <span>Skip preface to interactive workspace</span>
                  <ArrowRight className="w-3 h-3 text-amber-800" />
                </button>
              </div>
            </div>

            {/* Immersive Reading Folio */}
            <div className="bg-white border border-stone-200 rounded-3xl p-6 md:p-10 shadow-sm relative overflow-hidden">
              <div className="relative space-y-6 text-sm text-stone-650 leading-relaxed max-w-4xl mx-auto">
                
                {/* Backstory Paragraph */}
                <div className="space-y-4 font-serif text-[15px] text-stone-750">
                  <h2 className="font-serif text-lg font-bold text-stone-900 border-b border-stone-100 pb-3 flex items-center gap-2 font-black">
                    <Compass className="w-5 h-5 text-amber-700 shrink-0" />
                    <span>The Genesis of Critical Search</span>
                  </h2>
                  <p>
                    Over a decade ago, I wrote a Facebook post stating that a person's religion is often heavily influenced by where they are born, which led me to ask a fundamental question regarding how we can examine our paths of belief. Over the years, I have discovered that I am not alone in this line of reasoning.
                  </p>
                  <p>
                    Having been born into a Christian home within a predominantly Christian region, I naturally adopted the faith. However, possessing an analytical mind and a drive to question the status quo, I decided to investigate the historical claims for myself to understand if they could be objectively verified.
                  </p>
                </div>

                {/* Categorization Schema header */}
                <div className="pt-4 border-t border-stone-100">
                  <h3 className="font-serif text-base font-bold text-stone-900 mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-700" />
                    <span>Five Primary Categories of Belief</span>
                  </h3>
                  <p className="text-xs text-stone-500 font-sans leading-relaxed">
                    A close examination of why individuals hold and cultivate their faith reveals five distinct, primary categories of adherence:
                  </p>
                </div>

                {/* Vertical Timeline/Grid of Five Reasons */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pt-2">
                  
                  {/* Category 1 */}
                  <div className="bg-stone-50/60 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between hover:bg-stone-50 transition-all shadow-3xs">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#826532] uppercase bg-[#FAF4E5] px-2 py-0.5 rounded border border-amber-200/70 inline-block mb-3 select-none">
                        Category 1
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-900 mb-1.5 leading-none">Internal Conviction</h4>
                      <p className="text-[11px] md:text-xs text-stone-605 leading-relaxed font-sans">
                        Christians who hear the gospel, believe it, and dedicate their lives to Christ through deep internal conviction.
                      </p>
                    </div>
                    <div className="border-t border-stone-100/80 mt-4 pt-2.5 text-[9px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Subjective Internalization
                    </div>
                  </div>

                  {/* Category 2 */}
                  <div className="bg-stone-50/60 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between hover:bg-stone-50 transition-all shadow-3xs">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#826532] uppercase bg-[#FAF4E5] px-2 py-0.5 rounded border border-amber-200/70 inline-block mb-3 select-none">
                        Category 2
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-900 mb-1.5 leading-none">Supernatural Experience</h4>
                      <p className="text-[11px] md:text-xs text-stone-605 leading-relaxed font-sans">
                        Christians whose faith is anchored in undeniable personal experiences of God manifesting supernaturally in their lives.
                      </p>
                    </div>
                    <div className="border-t border-stone-100/80 mt-4 pt-2.5 text-[9px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Empirical Personal Faith
                    </div>
                  </div>

                  {/* Category 3 */}
                  <div className="bg-stone-50/60 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between hover:bg-stone-50 transition-all shadow-3xs">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#826532] uppercase bg-[#FAF4E5] px-2 py-0.5 rounded border border-amber-200/70 inline-block mb-3 select-none">
                        Category 3
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-900 mb-1.5 leading-none">Verifiable Historical Evidence</h4>
                      <p className="text-[11px] md:text-xs text-stone-605 leading-relaxed font-sans">
                        Christians who believe based on the weight of verifiable historical evidence.
                      </p>
                    </div>
                    <div className="border-t border-stone-100/80 mt-4 pt-2.5 text-[9px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Objective Forensic Base
                    </div>
                  </div>

                  {/* Category 4 */}
                  <div className="bg-stone-50/60 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between hover:bg-stone-50 transition-all shadow-3xs">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#826532] uppercase bg-[#FAF4E5] px-2 py-0.5 rounded border border-amber-200/70 inline-block mb-3 select-none">
                        Category 4
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-900 mb-1.5 leading-none">Philosophical Reasoning</h4>
                      <p className="text-[11px] md:text-xs text-stone-605 leading-relaxed font-sans">
                        Christians who arrive at faith through philosophical reasoning, logic, and the scientific observation of a finely tuned universe.
                      </p>
                    </div>
                    <div className="border-t border-stone-100/80 mt-4 pt-2.5 text-[9px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Rational Formulation
                    </div>
                  </div>

                  {/* Category 5 */}
                  <div className="bg-stone-50/60 p-5 rounded-2xl border border-stone-200 flex flex-col justify-between hover:bg-[#FAF9F6] transition-all shadow-3xs">
                    <div>
                      <span className="text-[10px] font-mono font-bold tracking-widest text-[#826532] uppercase bg-[#FAF4E5] px-2 py-0.5 rounded border border-amber-200/70 inline-block mb-3 select-none">
                        Category 5
                      </span>
                      <h4 className="text-xs font-serif font-bold text-stone-900 mb-1.5 leading-none">Cultural Morality & Ties</h4>
                      <p className="text-[11px] md:text-xs text-stone-605 leading-relaxed font-sans">
                        Christians who stay in the faith primarily for cultural tradition, familial ties, or the pragmatic moral framework it provides.
                      </p>
                    </div>
                    <div className="border-t border-stone-100/80 mt-4 pt-2.5 text-[9px] font-mono text-stone-400 uppercase tracking-wider font-semibold">
                      Pragmatic Social Tie
                    </div>
                  </div>

                </div>

                {/* Central High-Impact Unmissable Call to Action */}
                <div className="text-center py-10 px-8 bg-gradient-to-b from-[#FAF8F5] to-[#F1ECE3] rounded-3xl border border-[#DFD4BC] shadow-sm max-w-2xl mx-auto mt-8 space-y-4" id="central-explore-cta">
                  <div className="inline-flex py-1 px-3 bg-[#FAF4E5] border border-amber-300 rounded-full items-center gap-1.5 text-amber-900 text-[10px] font-mono tracking-widest uppercase font-bold select-none anim-pulse">
                    <Milestone className="w-3.5 h-3.5 text-[#9A7D46]" />
                    <span>OBJECTIVE INVESTIGATION PORTAL</span>
                  </div>
                  <h3 className="font-serif text-xl md:text-2xl font-bold text-stone-900 tracking-tight">
                    Begin the Objective Historical Inquiry
                  </h3>
                  <p className="text-xs md:text-sm text-stone-650 max-w-md mx-auto leading-relaxed">
                    Verify early Christian claims using reliable historical methods, ancient manuscript comparisons, physical archaeological discoveries, and forensic medicine.
                  </p>
                  <div className="pt-3">
                    <button
                      id="primary-explore-btn"
                      onClick={() => {
                        setShowLanding(false);
                        setActiveTab("prophecies"); // standard entry tab
                      }}
                      className="inline-flex items-center gap-3 py-4 px-12 bg-[#826532] hover:bg-[#6e5328] text-white font-serif text-sm font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all cursor-pointer border border-[#826532] outline-none group"
                    >
                      <span>Explore the Historical Evidence</span>
                      <ArrowRight className="w-4.5 h-4.5 group-hover:translate-x-1.5 transition-transform" />
                    </button>
                  </div>
                </div>

                {/* Signature Blockquote */}
                <div className="bg-[#FAF9F5] border-l-4 border-[#9A7D46] p-6 rounded-r-2xl mt-8">
                  <p className="font-serif italic text-[14px] md:text-[15px] text-stone-800 leading-relaxed">
                    "I find that my own inquiry intersects with the first four categories. While internal convictions and spiritual experiences are deeply personal and subjective, the historical and philosophical dimensions provide a framework that can be independently and objectively investigated. This platform does not claim that Christianity is the sole true religion, but rather invites seekers and thinkers to examine early Christian claims under standard historical and academic evidence."
                  </p>
                  <div className="text-right mt-3 text-xs font-mono tracking-widest text-[#9A7D46] uppercase font-bold select-none">
                    — Destiny Gogo-fyneface
                  </div>
                </div>

              </div>
            </div>

            {/* Micro attribution footer line */}
            <div className="text-center text-[11px] text-stone-450 font-mono">
              Designed for critical thinkers & scholastic investigators • Academic Log AD 2026
            </div>

          </div>
        ) : (
          <>
            {/* =========================================================================
                TAB 1: PROPHETIC CHRONOLOGY & PROBABILITY SANDBOX
                ========================================================================= */}
            {activeTab === "prophecies" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="prophecies-section">
            
            {/* Left: Interactive Chronological Dossier */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-[#F6F4EE] text-amber-800 rounded-lg border border-[#E6DFD3]">
                      <Scroll className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-stone-900">Hebrew Prophetic Codices</h2>
                      <p className="text-xs text-stone-500">Predicted centuries before the first Roman legions set foot in Judea</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 font-bold uppercase tracking-widest hidden sm:inline">
                    Parchment Registry
                  </span>
                </div>
                
                <p className="text-sm text-stone-650 leading-relaxed mb-5">
                  Select key predictive prophecies penned between 1000 BC and 400 BC. Use categories to filter the textual evidence verified by the Dead Sea Scrolls at Qumran.
                </p>

                {/* Filters */}
                <div className="flex flex-wrap gap-1.5 mb-5 border-b border-stone-100 pb-4">
                  {(["all", "birth", "betrayal", "death"] as const).map(cat => (
                    <button
                      key={cat}
                      onClick={() => setProphecyFilter(cat)}
                      className={`text-xs font-medium capitalize px-3.5 py-1.5 rounded-lg transition-all cursor-pointer ${
                        prophecyFilter === cat
                          ? "bg-amber-100/60 text-[#7C5D29] border border-amber-200 font-semibold"
                          : "bg-stone-50 text-stone-500 hover:text-stone-800 hover:bg-stone-150 border border-stone-200"
                      }`}
                    >
                      {cat} Predictions
                    </button>
                  ))}
                </div>

                {/* Grid of Interactive Scroll Capsules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[360px] overflow-y-auto pr-1">
                  {filteredProphecies.map(prop => {
                    const isSelected = selectedProphecy === prop.id;
                    const isIndexed = selectedSandboxIds.includes(prop.id);
                    return (
                      <div
                        id={`prop-card-${prop.id}`}
                        key={prop.id}
                        onClick={() => setSelectedProphecy(prop.id)}
                        className={`p-4 rounded-xl border transition-all text-left cursor-pointer flex flex-col justify-between gap-3 group relative ${
                          isSelected
                            ? "bg-[#FAF8F2] border-amber-600/40 shadow-sm"
                            : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/55"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-mono font-bold tracking-wider text-[#A5824C] block mb-1">
                              {prop.scriptureRef}
                            </span>
                            <h3 className={`text-sm font-serif font-bold transition-colors ${isSelected ? "text-stone-900" : "text-stone-800 group-hover:text-stone-900"}`}>
                              {prop.title}
                            </h3>
                          </div>
                          {isIndexed && (
                            <span className="text-[9px] font-mono font-bold bg-[#E6F4EA] text-[#137333] px-2 py-0.5 rounded-full border border-[#CEEAD6]">
                              Selected
                            </span>
                          )}
                        </div>
                        <div className="flex items-center justify-between mt-1 pt-2 border-t border-stone-100 text-[11px]">
                          <span className="text-stone-500 italic">Antiquity Confirmed</span>
                          <span className="text-amber-800 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                            Investigate <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Selected Prophecy In-Depth Micro-Dossier */}
              {selectedProphecy && (() => {
                const prop = propheciesData.find(p => p.id === selectedProphecy);
                if (!prop) return null;
                return (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm relative" id="prophecy-detail-card">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#F6F4EE] border border-[#E6DFD3] text-amber-[#8c6c39] rounded-lg">
                          <Scroll className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                          <h3 className="font-serif text-base font-bold text-stone-900">{prop.title}</h3>
                          <p className="text-xs text-stone-500 font-mono">BCE Prediction vs CE Fulfillment</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleSandboxProphecy(prop.id)}
                        className={`text-xs font-medium px-3.5 py-2 rounded-lg border transition-all cursor-pointer flex items-center justify-center gap-2 ${
                          selectedSandboxIds.includes(prop.id)
                            ? "bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100"
                            : "bg-amber-50 text-amber-850 border-amber-200 hover:bg-amber-100/60"
                        }`}
                      >
                        <Calculator className="w-4 h-4 shrink-0" />
                        <span>{selectedSandboxIds.includes(prop.id) ? "Omit from Calculator" : "Add to Calculator"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      {/* Prophetic Prediction Scripture */}
                      <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200/80 relative">
                        <span className="absolute -top-2 left-4 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-stone-700 text-white rounded">
                          Ancient Scripture Prediction ({prop.scriptureRef})
                        </span>
                        <blockquote className="text-stone-800 italic leading-relaxed pt-2 text-[13px] font-serif">
                          "{prop.scriptureText}"
                        </blockquote>
                        <div className="mt-4 text-[11px] text-[#856837] bg-white border border-amber-250/50 p-2 rounded flex items-start gap-1.5 leading-normal">
                          <BookOpen className="w-3.5 h-3.5 mt-0.5 text-amber-600" />
                          <span><strong>Context:</strong> {prop.context}</span>
                        </div>
                      </div>

                      {/* Fulfillment Record */}
                      <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200/80 relative">
                        <span className="absolute -top-2 left-4 px-2.5 py-0.5 text-[9px] font-mono font-bold uppercase bg-stone-700 text-white rounded">
                          Historical Record ({prop.fulfillmentRef})
                        </span>
                        <blockquote className="text-stone-850 italic leading-relaxed pt-2 text-[13px] font-serif">
                          "{prop.fulfillmentText}"
                        </blockquote>
                        <div className="mt-4 text-[11px] text-green-800 bg-white border border-green-200 p-2 rounded flex items-start gap-1.5 leading-normal">
                          <CheckCircle className="w-3.5 h-3.5 mt-0.5 text-green-600" />
                          <span>Verified within decades of Jesus's ministry across multiple independent source traditions.</span>
                        </div>
                      </div>
                    </div>

                    {/* Archaeological Validation Sub-Section */}
                    <div className="mt-5 bg-[#FAF4E5] border border-[#EBE4D5] p-4 rounded-xl flex items-start gap-3.5">
                      <div className="p-2 bg-white font-mono font-bold text-amber-80 *9A7D46 text-xs rounded-lg border border-[#E1D9C6] flex items-center justify-center shrink-0">
                        <FileText className="w-5 h-5 text-amber-700" />
                      </div>
                      <div className="text-xs">
                        <h4 className="font-serif font-bold text-stone-900 text-sm mb-1 uppercase tracking-wide flex items-center gap-1.5">
                          Dead Sea Scrolls Integrity Lock
                        </h4>
                        <p className="text-stone-600 leading-relaxed text-[12px]">{prop.qumranEvidence}</p>
                      </div>
                    </div>

                    {/* Mathematical Badge */}
                    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs bg-stone-50 p-3 rounded-xl border border-stone-200 text-stone-500">
                      <span className="flex items-center gap-2 font-medium">
                        <Coins className="w-4 h-4 text-amber-600" />
                        <span>Calculated Stoner probability baseline for single human compliance:</span>
                      </span>
                      <strong className="text-[#84632C] font-mono bg-[#FFFCE8] px-3 py-1 rounded-lg border border-amber-200 text-xs text-right">
                        {prop.stonerLabel} ({prop.stonerProbability === 100 ? "1 in 100" : `1 in ${prop.stonerProbability.toLocaleString()}`})
                      </strong>
                    </div>

                  </div>
                );
              })()}

            </div>

            {/* Right: Peter Stoner statistical Sandbox & Texas Map analogy */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[480px]">
                
                <div>
                  <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
                    <div className="flex items-center gap-2.5">
                      <Calculator className="w-5 h-5 text-[#8F6B30]" />
                      <h2 className="font-serif text-lg font-bold text-stone-900">Compound Probability Desk</h2>
                    </div>
                    <span className="text-[10px] uppercase font-mono bg-stone-50 border border-stone-200 px-2.5 py-1 rounded-lg text-brown-800 text-amber-800 select-none">
                      P. Stoner Matrix
                    </span>
                  </div>
                  
                  <p className="text-xs text-stone-600 leading-relaxed mb-4">
                    In 1944, statistical mathematician Peter Stoner analyzed individual variables. Mark predictions to see how joint probability multiplies exponentially.
                  </p>

                  {/* Preset Buttons */}
                  <div className="flex items-center gap-2 flex-wrap mb-4">
                    <span className="text-[10px] font-mono text-stone-400 font-bold uppercase">Presets:</span>
                    <button
                      onClick={() => applyPresetSandbox("stoner-8")}
                      className="text-xs font-semibold bg-[#FAF4E5] border border-amber-200 hover:bg-amber-100 text-amber-800 px-3 py-1 rounded-lg cursor-pointer transition-colors"
                    >
                      Stoner's Famous 8 (1 in 10¹⁷)
                    </button>
                    <button
                      onClick={() => applyPresetSandbox("all")}
                      className="text-xs font-semibold bg-[#FAF4E5] border border-amber-200 hover:bg-amber-100 text-amber-800 px-3 py-1 rounded-lg cursor-pointer transition-colors"
                    >
                      All 9 Codices (1 in 10²⁰)
                    </button>
                    <button
                      onClick={() => applyPresetSandbox("minimal")}
                      className="text-xs font-mono bg-stone-100 border border-stone-200 hover:bg-stone-200 text-stone-500 px-2.5 py-1 rounded-lg cursor-pointer transition-colors"
                    >
                      Reset
                    </button>
                  </div>

                  {/* Compact checkboxes list */}
                  <div className="bg-stone-50 p-4 rounded-xl border border-stone-200/80 space-y-2 mb-6 max-h-[190px] overflow-y-auto">
                    {propheciesData.map(p => {
                      const isChecked = selectedSandboxIds.includes(p.id);
                      return (
                        <label
                          key={p.id}
                          className="flex items-center justify-between text-xs cursor-pointer select-none py-1.5 hover:bg-stone-200/40 px-2 rounded-lg transition-colors"
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={() => toggleSandboxProphecy(p.id)}
                              className="accent-amber-600 rounded bg-white border-stone-300 focus:ring-0 cursor-pointer h-4 w-4"
                            />
                            <span className={isChecked ? "text-stone-800 font-medium" : "text-stone-450 text-stone-550"}>{p.title}</span>
                          </div>
                          <span className="font-mono text-[10px] font-bold text-amber-800/80 bg-[#FAF7F0] border border-amber-100 px-2 py-0.2 rounded">{p.stonerLabel}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Mathematical Counter Box */}
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-amber-600/20 shadow-inner">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-stone-400 uppercase tracking-wider mb-2">
                    <span>Index Value ({currentProb.count} selected)</span>
                    <span className="text-amber-800 font-bold">Compound Likelihood</span>
                  </div>
                  
                  <div className="flex items-baseline gap-2.5 mb-4">
                    <span className="text-sm font-semibold text-stone-500 font-serif">1 in</span>
                    <span className="text-4xl font-extrabold font-mono tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-amber-800 to-amber-950">
                      {currentProb.count === 0 ? "1.0" : `${currentProb.multiplier} × 10`}
                      {currentProb.count > 0 && <sup className="text-2xl font-bold">{currentProb.power}</sup>}
                    </span>
                  </div>

                  {/* Dynamic Visual Analogy Card */}
                  <div className="bg-[#F6F4EE]/60 border border-[#E1DDCF] p-4 rounded-xl">
                    <div className="flex items-start gap-2.5">
                      <Coins className="w-5 h-5 text-amber-700 shrink-0 mt-0.5 animate-bounce" />
                      <div>
                        <h4 className="text-xs uppercase font-mono font-bold text-[#826127]">Texas Coin Experiment Analogy</h4>
                        <p className="text-[12px] text-stone-650 leading-relaxed mt-1">
                          {getProbabilityAnalogy(currentProb.count)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* interactive sliders for Stoner's texas simulation depth */}
                  {selectedSandboxIds.length >= 7 && (
                    <div className="mt-4 pt-4 border-t border-stone-200">
                      <div className="flex justify-between text-xs font-medium text-stone-605 mb-1.5">
                        <span className="text-stone-600">Simulated Texas Silver Dollar Depth:</span>
                        <span className="text-amber-800 font-bold font-mono">{texasCoinCount} feet deep</span>
                      </div>
                      <input
                        type="range"
                        min="1"
                        max="5"
                        value={texasCoinCount}
                        onChange={(e) => setTexasCoinCount(Number(e.target.value))}
                        className="w-full accent-amber-600 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="text-[10px] text-stone-400 italic block mt-1.5">
                        *Standard Peter Stoner benchmark simulation is 2 feet deep of silver dollars across the entire state of Texas.
                      </span>
                    </div>
                  )}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 2: FORENSIC TOMB LOGISTICS LAB
            ========================================================================= */}
        {activeTab === "tomb" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="tomb-section">
            
            {/* Left: Interactive Empty Tomb Map/Schematic and Interactive Hotspots */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm relative min-h-[425px] flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-4">
                    <div className="p-2 bg-[#F6F4EE] border border-[#E6DFD3] text-amber-[#8c6c39] rounded-lg">
                      <DoorClosed className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-stone-900">The Tomb Architectural Map & Hotspots</h2>
                      <p className="text-xs text-stone-500">Logistical forensic features surrounding the Empty Tomb site</p>
                    </div>
                  </div>
                  <p className="text-sm text-stone-600 leading-relaxed mb-5">
                    A secular security setup makes theft highly complex. Click the highlighted active coordinate labels directly on the drawing below to inspect legal and physical variables.
                  </p>
                </div>

                {/* Hand-drawn / Technical Minimalist Elegant CSS Tomb Schematic Drawing */}
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 h-64 relative flex items-center justify-center overflow-hidden">
                  
                  {/* Subtle architectural grid details */}
                  <div className="absolute inset-0 bg-[radial-gradient(#e0dcce_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

                  {/* Cave outer mountain frame */}
                  <div className="w-64 h-48 border-2 border-stone-300 border-b-0 rounded-t-full absolute bottom-0 flex items-end justify-center">
                    {/* Inner burial chamber chambers */}
                    <div className="w-full bg-[#FAF9F5] h-32 rounded-t-full relative border-t-2 border-dashed border-stone-250">
                      
                      {/* Tomb interior shelf (burial slab) */}
                      <div className="w-24 h-10 bg-[#FAF5E6] rounded border border-amber-200/80 absolute bottom-6 left-6 flex items-center justify-center shadow-xs">
                        <span className="text-[9px] font-mono uppercase text-amber-800 tracking-wider font-bold">Burial Slab</span>
                      </div>

                    </div>
                  </div>

                  {/* Hotspot coordinate A: Guard Cohort */}
                  <button
                    onClick={() => setActiveTombHotspot("guards")}
                    className={`absolute bottom-3 left-4 z-10 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTombHotspot === "guards"
                        ? "bg-amber-800 text-white border-amber-900 shadow"
                        : "bg-white hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300 shadow-xs"
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>① Roman Legion</span>
                  </button>

                  {/* Hotspot coordinate B: Massive Rolling Stone */}
                  <button
                    onClick={() => setActiveTombHotspot("stone")}
                    className={`absolute bottom-24 right-5 z-10 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTombHotspot === "stone"
                        ? "bg-amber-800 text-white border-amber-900 shadow"
                        : "bg-white hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300 shadow-xs"
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>② 2-Ton Rolling Stone</span>
                  </button>

                  {/* Hotspot coordinate C: Imperial Rome Seal */}
                  <button
                    onClick={() => setActiveTombHotspot("seal")}
                    className={`absolute bottom-24 left-24 z-10 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTombHotspot === "seal"
                        ? "bg-amber-800 text-white border-amber-900 shadow"
                        : "bg-white hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300 shadow-xs"
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>③ Imperial Seal</span>
                  </button>

                  {/* Hotspot coordinate D: Intact Linen Shroud */}
                  <button
                    onClick={() => setActiveTombHotspot("clothes")}
                    className={`absolute bottom-8 left-36 z-10 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all cursor-pointer flex items-center gap-1.5 ${
                      activeTombHotspot === "clothes"
                        ? "bg-amber-800 text-white border-amber-900 shadow"
                        : "bg-white hover:bg-stone-100 text-stone-700 border-stone-200 hover:border-stone-300 shadow-xs"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>④ Linen Shroud</span>
                  </button>

                </div>

                {/* Selected Hotspot Data Card */}
                <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/80 mt-5 min-h-[140px]">
                  {activeTombHotspot === "guards" && (
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-amber-700" />
                        <span>The Guard Sentry Cohort (Roman Koustodia)</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Pontius Pilate authorized the Jewish Sanhedrin to deploy a Roman <strong className="text-stone-850">Koustodia</strong> cohort. A standard unit comprised 4 to 16 heavily armed Roman legionnaires trained for secure perimeter blocks. Under strict Roman military law (the *lex militaris*), sleeping or failing on sentry duty resulted in immediate execution, often by stoning or branding.
                      </p>
                    </div>
                  )}

                  {activeTombHotspot === "stone" && (
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                        <Binary className="w-4 h-4 text-amber-700" />
                        <span>2-Ton Disc Rolling Stone</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        First-century rolling stones for wealthy family tombs in Judea were massive, circular disks weighing roughly <strong className="text-stone-850">1.5 to 2.0 metric tons (3,000 - 4,000 lbs)</strong>. They rolled down a decline into a carved groove directly in front of the keyway. Moving it uphill required multiple strong adults, making a silent, quiet, unprovoked midnight extraction physically impossible.
                      </p>
                    </div>
                  )}

                  {activeTombHotspot === "seal" && (
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                        <Lock className="w-4 h-4 text-amber-700" />
                        <span>Imperial Signet Stamp & Ropes</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        Ropes were stretched tight across the heavy stone face and anchored directly to the rock framework on either side with wet clay. Centurions stamped this clay with the high <strong className="text-stone-850">imperial signet ring</strong> of Pontius Pilate. Breaking this seal was considered a state-level treasonous act against the Emperor, punishable by public trial and inverted crucifixion.
                      </p>
                    </div>
                  )}

                  {activeTombHotspot === "clothes" && (
                    <div>
                      <h4 className="font-serif text-sm font-bold text-stone-900 mb-1.5 flex items-center gap-2">
                        <Layers className="w-4 h-4 text-amber-700" />
                        <span>Left-Behind Empty Grave Linens</span>
                      </h4>
                      <p className="text-xs text-stone-600 leading-relaxed">
                        The earliest documents report that when the tomb was inspected, the linen shroud remained intact, while the facial napkin was separately rolled and laid aside. If grave robbers or disciples had stolen the body, they would have fled quickly without unwrapping a body—a lengthy, disturbing, and nonsensical logistical delay.
                      </p>
                    </div>
                  )}
                </div>

              </div>

            </div>

            {/* Right: Comparative Analysis of the 4 Theories */}
            <div className="lg:col-span-6 flex flex-col gap-6">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between min-h-[580px]">
                
                <div>
                  <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-4">
                    <div className="p-2 bg-[#F6F4EE] border border-[#E6DFD3] text-amber-[#8c6c39] rounded-lg">
                      <GitCompare className="w-5 h-5 text-amber-700" />
                    </div>
                    <div>
                      <h2 className="font-serif text-lg font-bold text-stone-900">Alternative Historical Theories</h2>
                      <p className="text-xs text-stone-500">How competing hypotheses stand up to rigorous criteria</p>
                    </div>
                  </div>

                  <p className="text-xs text-stone-650 leading-relaxed mb-4">
                    Historians evaluate explainers against facts: (1) The Empty Tomb, (2) Sudden Conversion of hostile Enemy Witnesses, (3) Direct Martyrdom. Select a hypothesis to inspect indices.
                  </p>

                  {/* Comparative Matrix Selectors */}
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    {tombTheoriesData.map(th => {
                      const isSel = selectedTheory === th.id;
                      return (
                        <button
                          key={th.id}
                          onClick={() => setSelectedTheory(th.id)}
                          className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                            isSel
                              ? "bg-[#FAF8F2] border-amber-600/40 shadow-xs"
                              : "bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50"
                          }`}
                        >
                          <div className="text-xs font-serif font-bold text-stone-900 truncate flex items-center gap-1.5">
                            {th.id === "resurrection" ? (
                              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
                            ) : (
                              <FileText className="w-3.5 h-3.5 text-stone-450" />
                            )}
                            {th.name.replace("The ", "").replace(" Theory", "")}
                          </div>
                          <span className="text-[10px] text-stone-500 block truncate mt-0.5">{th.tagline}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected Theory Detail Viewer */}
                  {selectedTheory && (() => {
                    const th = tombTheoriesData.find(t => t.id === selectedTheory);
                    if (!th) return null;
                    return (
                      <div className="space-y-4" id="theory-dossier-panel">
                        
                        {/* Description Box */}
                        <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200/80">
                          <h3 className="text-[10px] font-mono font-bold uppercase text-[#9A7D46] tracking-wider mb-1">
                            {th.name} Overview:
                          </h3>
                          <p className="text-xs text-stone-605 text-stone-700 leading-relaxed mt-1">
                            {th.description}
                          </p>
                        </div>

                        {/* Interactive Radar-like Score sliders */}
                        <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200/80 space-y-3.5">
                          <h4 className="text-[10px] font-mono font-gray-500 uppercase tracking-wider font-bold">
                            Scholarly Explanatory Plausibility Indexes:
                          </h4>
                          
                          {/* Coherence */}
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-stone-600 font-medium">Logical Coherence:</span>
                              <strong className="text-stone-900 font-mono font-bold">{th.scores.logicalCoherence} / 10</strong>
                            </div>
                            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${th.scores.logicalCoherence * 10}%` }}
                                className="bg-gradient-to-r from-amber-600 to-amber-850 h-full transition-all duration-500"
                              />
                            </div>
                          </div>

                          {/* Adherence */}
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-stone-600 font-medium">Adherence to Core Historical Facts:</span>
                              <strong className="text-stone-900 font-mono font-bold">{th.scores.textualAdherence} / 10</strong>
                            </div>
                            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${th.scores.textualAdherence * 10}%` }}
                                className="bg-gradient-to-r from-amber-600 to-amber-850 h-full transition-all duration-500"
                              />
                            </div>
                          </div>

                          {/* Military */}
                          <div>
                            <div className="flex justify-between text-xs mb-1.5">
                              <span className="text-stone-600 font-medium">Physical/Logistical Feasibility:</span>
                              <strong className="text-stone-900 font-mono font-bold">{th.scores.militaryFeasibility} / 10</strong>
                            </div>
                            <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                              <div
                                style={{ width: `${th.scores.militaryFeasibility * 10}%` }}
                                className="bg-gradient-to-r from-amber-600 to-amber-850 h-full transition-all duration-500"
                              />
                            </div>
                          </div>

                        </div>

                        {/* Comparative Arguments List */}
                        <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200/80">
                          <h4 className="text-[10px] font-mono text-stone-500 uppercase font-bold tracking-wider mb-2">
                            Key Skeptical Logistical Assumptions:
                          </h4>
                          <ul className="space-y-2">
                            {th.keyPoints.map((kp, idx) => (
                              <li key={idx} className="text-xs text-stone-650 flex items-start gap-2 leading-relaxed">
                                <span className="text-amber-800 font-bold font-mono shrink-0 select-none">#{idx + 1}</span>
                                <span className="text-stone-600">{kp}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Critical Scholarly Refutations */}
                        <div className="bg-rose-50/60 border border-rose-100 p-4 rounded-xl border-l-4 border-l-rose-500/80">
                          <h4 className="text-[10px] font-mono text-rose-800 uppercase tracking-wider font-bold mb-1.5 flex items-center gap-1.5">
                            <AlertTriangle className="w-4 h-4 text-rose-500" />
                            <span>Scholarly Refutations:</span>
                          </h4>
                          <div className="space-y-2">
                            {th.refutations.map((ref, idx) => (
                              <p key={idx} className="text-xs text-stone-700 leading-relaxed italic font-serif">
                                "{ref}"
                              </p>
                            ))}
                          </div>
                        </div>

                      </div>
                    );
                  })()}

                </div>

              </div>

            </div>

          </div>
        )}

        {/* =========================================================================
            TAB: THE FOUR PILLARS OF HISTORICAL EVIDENCE (NEW CONVERSATION CORROBORATION)
            ========================================================================= */}
        {activeTab === "pillars" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="pillars-section">
            
            {/* Left Rail: The Four Converging Tracks */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-4">
                  <div className="p-2.5 bg-[#F6F4EE] border border-[#E6DFD3] text-amber-800 rounded-lg shrink-0">
                    <Layers className="w-5 h-5 text-[#9A7D46]" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-stone-900">Converging Tracks</h2>
                    <p className="text-xs text-stone-500">Four overlooked lines of independent historical proof</p>
                  </div>
                </div>

                <p className="text-xs text-stone-600 leading-relaxed mb-5">
                  When investigating ancient claims, legal scholars and historians look for <strong className="text-stone-800">converging lines of evidence</strong>—when multiple, entirely separate fields of study all point squarely to the exact same conclusion.
                </p>

                {/* Vertical Interactive Menu */}
                <div className="space-y-2.5">
                  {pillarsData.map(p => {
                    const isSelected = selectedPillarId === p.id;
                    return (
                      <button
                        key={p.id}
                        id={`pillar-btn-${p.id}`}
                        onClick={() => setSelectedPillarId(p.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 group ${
                          isSelected
                            ? "bg-[#FAF8F2] border-amber-600/50 shadow-xs"
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        <div className="min-w-0">
                          <span className="text-[9px] uppercase tracking-wider font-mono font-bold text-amber-700 block mb-1">
                            {p.subtitle}
                          </span>
                          <h3 className="text-xs font-serif font-bold text-stone-900 truncate">
                            {p.title}
                          </h3>
                        </div>
                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-amber-800 translate-x-1" : "text-stone-400 group-hover:translate-x-0.5"}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Scholarly Consensus Mini-box */}
                <div className="bg-[#FAF9F5] p-4 rounded-xl border border-stone-200/80 mt-5">
                  <h4 className="text-[10px] font-mono text-amber-850 uppercase tracking-widest font-bold mb-1.5 flex items-center gap-1.5">
                    <Scale className="w-3.5 h-3.5 text-amber-750" />
                    <span>The Legal-Historical Standard</span>
                  </h4>
                  <p className="text-[11px] text-stone-500 leading-relaxed">
                    Under standard legal standards of evidence, independent confirmations that are mutually supportive generate a cumulative probability so steep that they establish a fact 'beyond reasonable doubt.'
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel: Beautiful Editorial Manuscript Folio */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {(() => {
                const p = pillarsData.find(item => item.id === selectedPillarId);
                if (!p) return null;
                return (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 md:p-8 shadow-sm relative flex flex-col justify-between min-h-[580px]" id="pillar-folio">
                    
                    <div>
                      {/* Folio Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-stone-100 pb-5 mb-6 gap-3">
                        <div>
                          <span className="text-[11px] uppercase tracking-widest font-mono font-extrabold text-amber-800 bg-[#FAF4E5] border border-amber-200 px-2.5 py-0.5 rounded-full">
                            Pillar {pillarsData.indexOf(p) + 1}
                          </span>
                          <h2 className="font-serif text-2xl font-bold text-stone-900 mt-2">{p.title}</h2>
                          <p className="text-xs text-stone-500 mt-0.5">{p.tagline}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-[10px] font-mono text-stone-300 font-bold uppercase tracking-widest block">
                            Forensic Log
                          </span>
                          <span className="text-[11px] text-stone-500 font-medium">Converging Evidence</span>
                        </div>
                      </div>

                      {/* Main Narrative Block */}
                      <div className="prose prose-stone max-w-none mb-6">
                        <p className="text-sm text-stone-650 leading-relaxed font-serif text-stone-800 italic">
                          "{p.narrative}"
                        </p>
                      </div>

                      {/* Pillar-Specific Interactive Content */}
                      {p.id === "bibliographical" && p.comparisons && (
                        <div className="bg-stone-50 p-5 rounded-2xl border border-stone-200/80 mb-6 space-y-6">
                          <h4 className="text-xs font-mono text-[#8C6C39] font-bold uppercase tracking-wide">
                            Ancient Manuscript Preservations Compare:
                          </h4>

                          <div className="space-y-4">
                            {p.comparisons.map((c, idx) => {
                              const isNT = c.subject.includes("New Testament");
                              
                              // Calculate widths for visual bar charts
                              const maxManuscripts = 5800;
                              const manuscriptWidth = Math.min(100, Math.max(2, (c.manuscripts / maxManuscripts) * 100));
                              
                              const maxTimeGap = 1000;
                              // Time gap is smaller the better, so reverse it
                              const gapWidth = Math.min(100, Math.max(3, ((maxTimeGap - c.timeGapYears) / maxTimeGap) * 100));

                              return (
                                <div key={idx} className="bg-white p-4 rounded-xl border border-stone-200 shadow-3xs">
                                  <div className="flex justify-between items-center mb-2">
                                    <span className={`text-xs font-serif font-bold ${isNT ? "text-amber-900" : "text-stone-700"}`}>
                                      {c.subject} {isNT && "🌟"}
                                    </span>
                                    <span className="text-[11px] font-mono font-semibold text-stone-400">
                                      {c.manuscriptsLabel} / {c.timeGapLabel} Gap
                                    </span>
                                  </div>

                                  <div className="space-y-2">
                                    {/* Manuscript count bar */}
                                    <div>
                                      <div className="flex justify-between text-[10px] text-stone-500 mb-0.5">
                                        <span>Surviving Manuscript Copies (Higher is More Stable)</span>
                                        <span className="font-mono font-bold text-stone-700">{c.manuscripts === 5800 ? "5,800+ Greek" : c.manuscripts}</span>
                                      </div>
                                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                                        <div
                                          style={{ width: `${manuscriptWidth}%` }}
                                          className={`h-full rounded-full ${isNT ? "bg-amber-600" : "bg-stone-400"}`}
                                        />
                                      </div>
                                    </div>

                                    {/* Time gap bar */}
                                    <div>
                                      <div className="flex justify-between text-[10px] text-stone-500 mb-0.5">
                                        <span>Time Gap from Original writing (Shorter is More Reliable)</span>
                                        <span className="font-mono font-bold text-stone-700">{c.timeGapLabel}</span>
                                      </div>
                                      <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                                        <div
                                          style={{ width: `${gapWidth}%` }}
                                          className={`h-full rounded-full ${isNT ? "bg-emerald-600" : "bg-[#f43f5e]"}`}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="bg-[#FAF4E5] border border-amber-100 p-3.5 rounded-xl text-[11px] text-[#7C5D29] leading-relaxed">
                            <strong>Scholarly Takeaway:</strong> Caesar wrote of crossing the Rubicon, and Homer penned epic conflicts. No academic doubts their historical basis, yet the New Testament's bibliographical backing outclasses them by thousands of manuscripts and slashes the time-gap by 95%!
                          </div>
                        </div>
                      )}

                      {p.id === "archaeological" && p.discoveries && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          {p.discoveries.map((d, idx) => (
                            <div key={idx} className="bg-stone-50 hover:bg-[#FAF9F5] p-4 rounded-xl border border-stone-200 transition-all hover:border-amber-600/30 flex flex-col justify-between group shadow-3xs">
                              <div>
                                <div className="flex items-center justify-between gap-1 mb-2">
                                  <span className="text-[9px] font-mono tracking-wider text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-100 uppercase">
                                    {d.year}
                                  </span>
                                  <span className="text-[9px] font-mono text-stone-400 truncate">{d.location}</span>
                                </div>
                                <h4 className="text-xs font-serif font-bold text-stone-900 group-hover:text-amber-900 transition-colors mb-1.5">
                                  {d.name}
                                </h4>
                                <p className="text-[11px] text-stone-600 leading-relaxed">
                                  {d.details}
                                </p>
                              </div>
                              <div className="mt-3 pt-2.5 border-t border-stone-200/50 text-[10px] text-stone-400 italic">
                                Excavation Verified
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {p.id === "medical" && p.medicalAnatomy && (
                        <div className="space-y-4 mb-6">
                          <h4 className="text-xs font-mono text-red-800 font-bold uppercase tracking-wide flex items-center gap-1.5 font-semibold">
                            <Flame className="w-3.5 h-3.5" />
                            <span>Clinical Diagnostics Report:</span>
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {p.medicalAnatomy.map((m, idx) => (
                              <div key={idx} className="bg-rose-50/20 p-4 rounded-xl border border-rose-100 flex flex-col justify-between space-y-3">
                                <div>
                                  <h5 className="text-xs font-serif font-extrabold text-[#7f1d1d]">{m.symptom}</h5>
                                  <p className="text-[11px] text-stone-700 leading-relaxed mt-1">
                                    <strong>Clinical Diagnostics:</strong> <span className="text-[#1c1917]">{m.clinicalEffect}</span>
                                  </p>
                                </div>
                                <div className="bg-white p-2.5 rounded border border-rose-100 text-[10px] text-[#A66C44] leading-relaxed italic">
                                  <strong>Scripture Record:</strong> "{m.evidenceText}"
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {p.id === "sociological" && p.sociologicalTakeaways && (
                        <div className="bg-[#FAF9F6] p-5 rounded-xl border border-stone-200/85 mb-6 space-y-4">
                          <h4 className="text-xs font-mono text-amber-900 font-bold uppercase tracking-wide flex items-center gap-1.5">
                            <Scale className="w-4 h-4 text-amber-700" />
                            <span>Sociological Timelines in Jerusalem:</span>
                          </h4>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                            {p.sociologicalTakeaways.map((t, idx) => (
                              <div key={idx} className="bg-white p-3.5 rounded-xl border border-stone-200 flex items-start gap-2.5">
                                <span className="p-1.5 bg-amber-50 text-amber-800 font-mono text-[10px] font-bold rounded-lg shrink-0 border border-amber-100">
                                  0{idx + 1}
                                </span>
                                <p className="text-[11px] text-stone-605 leading-relaxed pt-0.5">
                                  {t}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* General Evidence Points Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                        {p.evidencePoints.map((ep, idx) => (
                          <div key={idx} className="bg-stone-50 border border-stone-200/80 p-5 rounded-xl">
                            <h4 className="font-serif font-bold text-stone-900 text-xs mb-1.5 flex items-center gap-1.5">
                              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span>{ep.label}</span>
                            </h4>
                            <p className="text-[11px] text-stone-600 leading-relaxed font-sans">
                              {ep.details}
                            </p>
                          </div>
                        ))}
                      </div>

                    </div>

                    {/* Forensic Conclusion Takeaway block */}
                    <div className="mt-8 p-4 bg-stone-50 rounded-xl border border-stone-200/60 text-[11px] text-stone-500 leading-relaxed flex items-center gap-3">
                      <HelpCircle className="w-4 h-4 text-stone-400 shrink-0" />
                      <span>This data points to a highly reliable, historically consistent, medical and geographical record that stands robust under the highest guidelines of historical evaluation.</span>
                    </div>

                  </div>
                );
              })()}
            </div>

          </div>
        )}

        {/* =========================================================================
            TAB 3: TESTIMONY (PSYCHOLOGICAL TRANSFORMATION OF WITNESSES)
            ========================================================================= */}
        {activeTab === "eyewitnesses" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8" id="eyewitness-section">
            
            {/* Left: Interactive Transformation Dossier Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              
              <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-center gap-3 border-b border-stone-100 pb-4 mb-4">
                  <div className="p-2 bg-[#F6F4EE] border border-[#E6DFD3] text-amber-[#8c6c39] rounded-lg">
                    <Flame className="w-5 h-5 text-amber-700 animate-pulse" />
                  </div>
                  <div>
                    <h2 className="font-serif text-lg font-bold text-stone-900">Hostile Witnesses & Martyrdom</h2>
                    <p className="text-xs text-stone-500">Evaluating eyewitness credentials and behavioral transforms</p>
                  </div>
                </div>
                
                <p className="text-xs text-stone-600 leading-relaxed mb-5">
                  Modern forensic methodology values testimonies from <strong className="text-stone-850">hostile</strong> witnesses and skeptical relatives far above eager believers. Select a witness to inspect their career transformation.
                </p>

                {/* Vertical menu of witnesses */}
                <div className="space-y-2">
                  {eyewitnessesData.map(witness => {
                    const isSelected = selectedWitness === witness.id;
                    return (
                      <button
                        key={witness.id}
                        onClick={() => setSelectedWitness(witness.id)}
                        className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-[#FAF8F2] border-amber-600/40 shadow-xs"
                            : "bg-white border-stone-200 hover:border-stone-300 text-stone-700 hover:bg-stone-50"
                        }`}
                      >
                        <div>
                          <h3 className="text-xs font-serif font-bold text-stone-900">
                            {witness.name}
                          </h3>
                          <span className="text-[10px] text-stone-500 font-mono block mt-1">
                            {witness.subtitle}
                          </span>
                        </div>
                        <ArrowRight className={`w-4 h-4 shrink-0 transition-transform ${isSelected ? "text-amber-800 translate-x-1" : "text-stone-400"}`} />
                      </button>
                    );
                  })}
                </div>

                {/* Embarrassment Criterion Box */}
                <div className="bg-[#FAF9F5] p-5 rounded-xl border border-stone-200/80 mt-5">
                  <h4 className="text-[10px] font-mono text-amber-800/80 uppercase tracking-widest font-bold mb-2 flex items-center gap-1.5">
                    <Scale className="w-4 h-4 text-amber-750" />
                    <span>Criterion of Embarrassment</span>
                  </h4>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    In ancient historiography, records containing embarrassing self-disclosures (e.g., Peter denying his master to servant girls, or the physical empty tomb encountered first by women, whose testimony carried no weight in Jewish courts) are considered highly credible. Fabricated myths historically showcase leaders as spotless, brave hero icons.
                  </p>
                </div>

              </div>

            </div>

            {/* Right: Interactive Witness Visual Card Detail with Before/After Slides */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              
              {selectedWitness && (() => {
                const wit = eyewitnessesData.find(w => w.id === selectedWitness);
                if (!wit) return null;
                return (
                  <div className="bg-white border border-stone-200 rounded-2xl p-6 shadow-sm relative flex flex-col justify-between min-h-[500px]" id="witness-dossier-card">
                    
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4 mb-4">
                        <div className="flex items-center gap-3">
                          <span className="p-2.5 bg-stone-150 text-amber-800 rounded-xl border border-stone-200 shadow-sm">
                            <Users className="w-5 h-5" />
                          </span>
                          <div>
                            <h3 className="font-serif text-lg font-bold text-stone-900">{wit.name}</h3>
                            <p className="text-xs text-stone-500">{wit.subtitle}</p>
                          </div>
                        </div>

                        {/* Interactive Before & After Tabs */}
                        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-xl border border-stone-200" id="before-after-toggle">
                          <button
                            onClick={() => setWitnessBeforeAfter("before")}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                              witnessBeforeAfter === "before"
                                ? "bg-white text-stone-900 shadow-xs border border-stone-200 font-bold"
                                : "text-stone-500 hover:text-stone-800"
                            }`}
                          >
                            Before Witnessing
                          </button>
                          <button
                            onClick={() => setWitnessBeforeAfter("after")}
                            className={`px-3 py-1.5 text-xs font-semibold rounded-lg cursor-pointer transition-all ${
                              witnessBeforeAfter === "after"
                                ? "bg-white text-stone-900 shadow-xs border border-stone-200 font-bold"
                                : "text-stone-500 hover:text-stone-800"
                            }`}
                          >
                            Post-Encounter Witness
                          </button>
                        </div>
                      </div>

                      {/* Interactive Psychological Card Face */}
                      <div className="bg-[#FAF9F5] p-5 rounded-2xl border border-stone-200/80 relative min-h-[180px] flex flex-col justify-between">
                        
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <span className={`text-[10px] font-mono font-bold uppercase tracking-widest border rounded-full px-3 py-1 ${
                              witnessBeforeAfter === "before"
                                ? "bg-rose-50 text-rose-700 border-rose-200"
                                : "bg-emerald-50 text-emerald-800 border-emerald-250"
                            }`}>
                              {witnessBeforeAfter === "before" ? "Prior Framework & Skeptic Behavior" : "Empirical Claims Transformation"}
                            </span>
                          </div>

                          <p className="text-sm md:text-base text-stone-850 leading-relaxed italic font-serif">
                            {witnessBeforeAfter === "before" ? wit.preConversion : wit.encounter}
                          </p>
                        </div>

                        {witnessBeforeAfter === "after" && (
                          <div className="mt-4 pt-3 border-t border-stone-200/70 text-xs text-stone-500">
                            <strong>Psychological Index:</strong> {wit.uniqueness}
                          </div>
                        )}
                      </div>

                      {/* Unified Post-Encounter Mission & Historical Martyrdom details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                        
                        <div className="bg-[#FAF8F2] p-5 rounded-2xl border border-stone-200/80 shadow-xs">
                          <h4 className="text-[10px] font-mono font-bold text-stone-450 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Milestone className="w-4 h-4 text-amber-705" />
                            <span>Preaching Vector:</span>
                          </h4>
                          <p className="text-xs text-stone-605 leading-relaxed">
                            {wit.postEncounter}
                          </p>
                        </div>

                        <div className="bg-[#FAF8F2] p-5 rounded-xl border border-rose-200/50 border-l-4 border-l-rose-500 shadow-xs">
                          <h4 className="text-[10px] font-mono font-bold text-rose-800 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
                            <Flame className="w-4 h-4 text-rose-600" />
                            <span>Consummate Price Paid (Martyrdom):</span>
                          </h4>
                          <p className="text-xs text-stone-650 leading-relaxed font-semibold">
                            {wit.martyrdom}
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Historical legal takeaway */}
                    <div className="mt-5 p-5 bg-stone-50 rounded-2xl border border-stone-200 text-xs text-stone-600 flex items-start gap-3.5 leading-relaxed">
                      <Scale className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                      <div>
                        <strong>The Physical Martyrdom Metric:</strong> While thousands of religious adherents die for faiths received on blind authority, these specific founders died directly for claims of <strong className="text-stone-850 italic">personal firsthand empirical interaction</strong>. If they had stolen the body, they knew it was an absolute hoax. No reasonable mind submits to public flaying, stoning, and standard execution for a conspiracy they personally staged.
                      </div>
                    </div>

                  </div>
                );
              })()}

            </div>

          </div>
        )}

          </>
        )}

      </main>

      {/* Elegant Academic Footer */}
      <footer className="border-t border-stone-200 bg-white py-8 px-6 shrink-0 mt-12 shadow-inner" id="app-footer">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-stone-400 shrink-0" />
            <span>Oxford, Rome, & Qumran Archaeological Consensus Framework. Data coordinates indexed AD 2026.</span>
          </div>
          <div className="flex items-center gap-5">
            <a href="https://wikipedia.org/wiki/Dead_Sea_Scrolls" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 transition-colors flex items-center gap-1 font-medium underline decoration-stone-200">
              <span>Qumran Antiquity Scrolls</span> <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <span className="text-stone-300">•</span>
            <a href="https://wikipedia.org/wiki/Historicity_of_Jesus" target="_blank" rel="noopener noreferrer" className="hover:text-stone-800 transition-colors flex items-center gap-1 font-medium underline decoration-stone-200">
              <span>Secular Corroborations</span> <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}

interface GraduationCapProps {
  className?: string;
}
function GraduationCap({ className }: GraduationCapProps) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
      <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
    </svg>
  );
}
