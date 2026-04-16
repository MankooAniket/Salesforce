import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, Palette, Image, Layout, Globe } from "lucide-react";

export function LandingPage() {
  const navigate = useNavigate();

  const steps = [
    { icon: Palette, title: "Brand Foundation", desc: "Pick your style visually" },
    { icon: Image, title: "Moodboard", desc: "Choose what feels right" },
    { icon: Layout, title: "AI Directions", desc: "Compare design options" },
    { icon: Globe, title: "Your Website", desc: "Ready to launch" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-3xl"
      >
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-2 mb-8">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <span className="text-purple-200 text-sm">AI-Powered Brand Builder</span>
        </div>

        <h1 className="text-white text-4xl md:text-6xl tracking-tight mb-6">
          Your brand.<br />
          <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Your website.
          </span><br />
          No design skills needed.
        </h1>

        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl mx-auto">
          Answer a few visual questions and our AI will create a professional website that truly represents your business.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => navigate("/build")}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-shadow cursor-pointer"
        >
          Start Building
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </motion.div>

      {/* Steps preview */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="relative z-10 mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl w-full"
      >
        {steps.map((step, i) => (
          <div
            key={step.title}
            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center mx-auto mb-3">
              <step.icon className="w-5 h-5 text-purple-300" />
            </div>
            <div className="text-white text-sm mb-1">{step.title}</div>
            <div className="text-slate-500 text-xs">{step.desc}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
