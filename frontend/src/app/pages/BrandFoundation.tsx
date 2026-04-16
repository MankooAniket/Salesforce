import { useNavigate } from "react-router-dom";
import { useBuilder } from "../context/BuilderContext";
import { motion } from "motion/react";
import { ArrowRight, Check, Store } from "lucide-react";
import { useState } from "react";
import { mapBrandToTokens } from "../builder/tokenMapper";
import { mapTokensToComponents } from "../builder/componentMapper";
import { buildPreview } from "../builder/previewAssembler";

const typographyOptions = [
  { id: "elegant", label: "Elegant & Refined", preview: "The Brew House", fontClass: "font-serif italic", desc: "Serif fonts, classic feel" },
  { id: "modern", label: "Clean & Modern", preview: "The Brew House", fontClass: "font-sans tracking-wide", desc: "Sans-serif, contemporary" },
  { id: "friendly", label: "Warm & Friendly", preview: "The Brew House", fontClass: "font-sans", desc: "Rounded, approachable" },
  { id: "bold", label: "Bold & Strong", preview: "THE BREW HOUSE", fontClass: "font-sans tracking-widest uppercase", desc: "Impactful, confident" },
];

const colorPalettes = [
  { id: "warm", label: "Warm & Cozy", colors: ["#8B4513", "#D4A574", "#F5E6D3", "#2C1810", "#E8D5C4"], desc: "Earthy, inviting" },
  { id: "minimal", label: "Clean & Minimal", colors: ["#1A1A1A", "#666666", "#FFFFFF", "#F5F5F5", "#E0E0E0"], desc: "Sophisticated, timeless" },
  { id: "nature", label: "Fresh & Natural", colors: ["#2D5016", "#7CB342", "#F1F8E9", "#33691E", "#DCEDC8"], desc: "Organic, vibrant" },
  { id: "luxury", label: "Rich & Premium", colors: ["#1A1A2E", "#C9A96E", "#F4EDE4", "#0F0F1A", "#E8D5B8"], desc: "Luxurious, exclusive" },
  { id: "playful", label: "Bright & Playful", colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#2C3E50", "#F7F7F7"], desc: "Fun, energetic" },
  { id: "ocean", label: "Cool & Calm", colors: ["#1B4965", "#5FA8D3", "#BEE9E8", "#CAE9FF", "#62B6CB"], desc: "Serene, trustworthy" },
];

const layoutStyles = [
  { id: "editorial", label: "Editorial", desc: "Magazine-style with large imagery and bold headlines", preview: (
    <div className="space-y-1.5">
      <div className="h-12 bg-white/20 rounded" />
      <div className="grid grid-cols-2 gap-1.5">
        <div className="h-6 bg-white/10 rounded" />
        <div className="h-6 bg-white/10 rounded" />
      </div>
      <div className="h-3 bg-white/5 rounded w-3/4" />
    </div>
  )},
  { id: "minimal", label: "Minimal", desc: "Clean whitespace, centered content, breathing room", preview: (
    <div className="space-y-2 flex flex-col items-center">
      <div className="h-2 bg-white/10 rounded w-1/2" />
      <div className="h-8 bg-white/20 rounded w-3/4" />
      <div className="h-2 bg-white/5 rounded w-2/3" />
      <div className="h-4 bg-white/15 rounded w-1/3 mt-2" />
    </div>
  )},
  { id: "grid", label: "Grid Gallery", desc: "Structured grid showcasing products or services", preview: (
    <div className="space-y-1.5">
      <div className="h-4 bg-white/15 rounded" />
      <div className="grid grid-cols-3 gap-1">
        {[...Array(6)].map((_, i) => <div key={i} className="h-5 bg-white/10 rounded" />)}
      </div>
    </div>
  )},
  { id: "storytelling", label: "Storytelling", desc: "Full-width sections that guide visitors through your story", preview: (
    <div className="space-y-1">
      <div className="h-10 bg-white/20 rounded" />
      <div className="h-6 bg-white/10 rounded" />
      <div className="h-8 bg-white/15 rounded" />
    </div>
  )},
];

export function BrandFoundation() {
  const navigate = useNavigate();
  const { choices, setChoices, setBuilder } = useBuilder();
  const [businessName, setBusinessName] = useState(choices.businessName);
  const [businessType, setBusinessType] = useState(choices.businessType);

  const canProceed = choices.typography && choices.colorPalette && choices.layoutStyle && businessName;

  const handleNext = () => {
    const updatedChoices = {
      ...choices,
      businessName,
      businessType,
    };

    setChoices(updatedChoices);

    const tokens = mapBrandToTokens({
      tone: updatedChoices.typography || "minimal",
      industry: updatedChoices.businessType,
    });

    const components = mapTokensToComponents();

    const preview = buildPreview(tokens, components);

    setBuilder({
      brandInput: updatedChoices,
      tokens,
      components,
      preview,
    });

    console.log("Builder Output:", {
      tokens,
      components,
      preview,
    });

    navigate("/build/moodboard");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="mb-10">
        <h1 className="text-white text-3xl mb-2">Let's define your brand</h1>
        <p className="text-slate-400 text-lg">Pick what feels right for your business. No wrong answers.</p>
      </div>

      {/* Business info */}
      <section className="mb-12">
        <h2 className="text-white text-xl mb-4 flex items-center gap-2">
          <Store className="w-5 h-5 text-purple-400" />
          Your Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Business Name</label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50"
              placeholder="e.g., The Brew House"
            />
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">Type of Business</label>
            <input
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-purple-500/50"
              placeholder="e.g., Coffee Shop, Bakery, Boutique"
            />
          </div>
        </div>
      </section>

      {/* Typography */}
      <section className="mb-12">
        <h2 className="text-white text-xl mb-2">How should your name feel?</h2>
        <p className="text-slate-500 text-sm mb-4">Pick the style that matches your vibe</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {typographyOptions.map((opt) => (
            <motion.button
              key={opt.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setChoices((c) => ({ ...c, typography: opt.id }))}
              className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                choices.typography === opt.id
                  ? "bg-purple-600/15 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {choices.typography === opt.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className={`text-white text-2xl mb-2 ${opt.fontClass}`}>
                {businessName || opt.preview}
              </div>
              <div className="text-slate-300 text-sm">{opt.label}</div>
              <div className="text-slate-500 text-xs mt-0.5">{opt.desc}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Colors */}
      <section className="mb-12">
        <h2 className="text-white text-xl mb-2">What colors represent you?</h2>
        <p className="text-slate-500 text-sm mb-4">These become your website's color system</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {colorPalettes.map((pal) => (
            <motion.button
              key={pal.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setChoices((c) => ({ ...c, colorPalette: pal.id }))}
              className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                choices.colorPalette === pal.id
                  ? "bg-purple-600/15 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {choices.colorPalette === pal.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="flex gap-1.5 mb-3">
                {pal.colors.map((c, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-lg shadow-inner"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
              <div className="text-slate-200 text-sm">{pal.label}</div>
              <div className="text-slate-500 text-xs">{pal.desc}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Layout */}
      <section className="mb-12">
        <h2 className="text-white text-xl mb-2">How should your site be structured?</h2>
        <p className="text-slate-500 text-sm mb-4">Choose a layout direction</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {layoutStyles.map((lay) => (
            <motion.button
              key={lay.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setChoices((c) => ({ ...c, layoutStyle: lay.id }))}
              className={`relative text-left p-5 rounded-2xl border transition-all cursor-pointer ${
                choices.layoutStyle === lay.id
                  ? "bg-purple-600/15 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-white/5 border-white/10 hover:border-white/20"
              }`}
            >
              {choices.layoutStyle === lay.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className="bg-white/5 rounded-xl p-3 mb-3">{lay.preview}</div>
              <div className="text-slate-200 text-sm">{lay.label}</div>
              <div className="text-slate-500 text-xs">{lay.desc}</div>
            </motion.button>
          ))}
        </div>
      </section>

      {/* Next button */}
      <div className="flex justify-end pb-10">
        <motion.button
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          onClick={handleNext}
          disabled={!canProceed}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg transition-all cursor-pointer ${
            canProceed
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
        >
          Next: Moodboard
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
