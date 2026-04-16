import { useNavigate } from "react-router-dom";
import { useBuilder } from "../context/BuilderContext";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Sparkles, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const directionData = [
  {
    name: "Warm & Inviting",
    description: "Feels like a cozy visit — warm tones, friendly layout, personal touch",
    vibe: "Approachable, personal, welcoming",
    heroImg: "https://images.unsplash.com/photo-1631869404868-2ae8de2e7264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yJTIwd2FybXxlbnwxfHx8fDE3NzU2NTg0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#8B4513", "#D4A574", "#F5E6D3", "#2C1810"],
    sections: ["Hero with story", "Our Menu", "Our Story", "Visit Us"],
  },
  {
    name: "Modern & Minimal",
    description: "Clean lines, breathing room — lets your brand speak clearly",
    vibe: "Sophisticated, clean, confident",
    heroImg: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2FmZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzU3NDc2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#1A1A1A", "#666666", "#FFFFFF", "#F5F5F5"],
    sections: ["Bold hero", "Featured Items", "About", "Location & Hours"],
  },
  {
    name: "Premium & Refined",
    description: "Elevated and polished — perfect for a premium experience",
    vibe: "Luxurious, exclusive, curated",
    heroImg: "https://images.unsplash.com/photo-1744776411223-71fb5794617a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbHV4dXJ5JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NzY0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    colors: ["#1A1A2E", "#C9A96E", "#F4EDE4", "#0F0F1A"],
    sections: ["Immersive hero", "Experience", "Gallery", "Reservations"],
  },
];

export function AIDirections() {
  const navigate = useNavigate();
  const { choices, setChoices } = useBuilder();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        >
          <Loader2 className="w-10 h-10 text-purple-400" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-white text-xl mb-2">AI is crafting your designs...</p>
          <p className="text-slate-500">Analyzing your brand choices and moodboard</p>
        </motion.div>
        <div className="mt-8 flex gap-3">
          {["Typography", "Colors", "Layout", "Mood"].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + i * 0.3 }}
              className="bg-purple-600/20 border border-purple-500/30 rounded-full px-3 py-1 text-purple-300 text-xs"
            >
              {item} ✓
            </motion.div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/30 rounded-full px-4 py-1.5 mb-4">
          <Sparkles className="w-4 h-4 text-green-400" />
          <span className="text-green-300 text-sm">3 directions generated from your inputs</span>
        </div>
        <h1 className="text-white text-3xl mb-2">Which direction feels right?</h1>
        <p className="text-slate-400 text-lg">Each design reflects your brand choices. Pick the one that resonates most.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {directionData.map((dir, i) => {
          const selected = choices.selectedDirection === i;
          return (
            <motion.button
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -4 }}
              onClick={() => setChoices((c) => ({ ...c, selectedDirection: i }))}
              className={`relative text-left rounded-2xl border overflow-hidden transition-all cursor-pointer ${
                selected
                  ? "border-purple-500 shadow-xl shadow-purple-500/20 ring-1 ring-purple-500/50"
                  : "border-white/10 hover:border-white/20"
              }`}
            >
              {selected && (
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-lg">
                  <Check className="w-4 h-4 text-white" />
                </div>
              )}

              {/* Preview */}
              <div className="relative">
                <ImageWithFallback
                  src={dir.heroImg}
                  alt={dir.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent" />
                <div className="absolute bottom-3 left-4">
                  <span className="text-white/90 text-xs bg-black/40 backdrop-blur-sm rounded-full px-3 py-1">
                    {dir.vibe}
                  </span>
                </div>
              </div>

              <div className="p-5 bg-slate-950/80">
                <h3 className="text-white text-lg mb-1">{dir.name}</h3>
                <p className="text-slate-400 text-sm mb-4">{dir.description}</p>

                {/* Colors */}
                <div className="flex gap-1.5 mb-4">
                  {dir.colors.map((c, ci) => (
                    <div key={ci} className="w-6 h-6 rounded-md" style={{ backgroundColor: c }} />
                  ))}
                </div>

                {/* Sections preview */}
                <div className="space-y-1.5">
                  {dir.sections.map((section, si) => (
                    <div key={si} className="flex items-center gap-2 text-slate-500 text-xs">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500/50" />
                      {section}
                    </div>
                  ))}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-10 pb-10">
        <button
          onClick={() => navigate("/build/moodboard")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          whileHover={choices.selectedDirection !== null ? { scale: 1.03 } : {}}
          whileTap={choices.selectedDirection !== null ? { scale: 0.97 } : {}}
          onClick={() => choices.selectedDirection !== null && navigate("/build/final")}
          disabled={choices.selectedDirection === null}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg transition-all cursor-pointer ${
            choices.selectedDirection !== null
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
        >
          Generate My Website
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
