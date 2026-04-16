import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { BuilderProvider } from "../context/BuilderContext";
import { motion } from "motion/react";
import { Check, Sparkles } from "lucide-react";

const steps = [
  { path: "/build", label: "Brand Foundation" },
  { path: "/build/moodboard", label: "Moodboard" },
  { path: "/build/directions", label: "AI Directions" },
  { path: "/build/final", label: "Your Website" },
];

export function AppLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentIndex = steps.findIndex((s) => s.path === location.pathname);

  return (
    <BuilderProvider>
      <div className="min-h-screen bg-slate-950 flex flex-col">
        {/* Top bar */}
        <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur-lg sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white">BrandForge</span>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-2">
              {steps.map((step, i) => (
                <button
                  key={step.path}
                  onClick={() => i <= currentIndex && navigate(step.path)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                    i === currentIndex
                      ? "bg-purple-600/20 text-purple-300 border border-purple-500/30"
                      : i < currentIndex
                      ? "text-purple-400/60 hover:text-purple-300"
                      : "text-slate-600"
                  }`}
                >
                  {i < currentIndex ? (
                    <Check className="w-3.5 h-3.5" />
                  ) : (
                    <span className="w-5 h-5 rounded-full border border-current flex items-center justify-center text-xs">
                      {i + 1}
                    </span>
                  )}
                  <span className="hidden md:inline">{step.label}</span>
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </div>
    </BuilderProvider>
  );
}
