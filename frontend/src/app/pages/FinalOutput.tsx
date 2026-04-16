import { useBuilder } from "../context/BuilderContext";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { ArrowLeft, Check, Download, ExternalLink, Loader2, MapPin, Clock, Phone, Star, Coffee, Cake, Heart, Instagram, Facebook, Mail } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const heroImages: Record<number, string> = {
  0: "https://images.unsplash.com/photo-1631869404868-2ae8de2e7264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yJTIwd2FybXxlbnwxfHx8fDE3NzU2NTg0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  1: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2FmZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzU3NDc2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  2: "https://images.unsplash.com/photo-1744776411223-71fb5794617a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbHV4dXJ5JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NzY0Nnww&ixlib=rb-4.1.0&q=80&w=1080",
};

const themes: Record<number, { bg: string; text: string; accent: string; accentText: string; muted: string; card: string; hero: string }> = {
  0: { bg: "#F5E6D3", text: "#2C1810", accent: "#8B4513", accentText: "#F5E6D3", muted: "#D4A574", card: "#FFFFFF", hero: "Handcrafted with love, served with warmth" },
  1: { bg: "#FFFFFF", text: "#1A1A1A", accent: "#1A1A1A", accentText: "#FFFFFF", muted: "#666666", card: "#F5F5F5", hero: "Crafted coffee. Clean experience." },
  2: { bg: "#F4EDE4", text: "#1A1A2E", accent: "#C9A96E", accentText: "#1A1A2E", muted: "#8A7A6A", card: "#FFFFFF", hero: "An elevated coffee experience" },
};

const menuItems = [
  { name: "Signature Latte", price: "$5.50", desc: "Our house blend with silky steamed milk", icon: Coffee },
  { name: "Artisan Pastry", price: "$4.00", desc: "Freshly baked daily by local bakers", icon: Cake },
  { name: "Pour Over", price: "$4.50", desc: "Single origin, brewed to perfection", icon: Coffee },
  { name: "Matcha Bowl", price: "$6.00", desc: "Ceremonial grade matcha, oat milk", icon: Heart },
];

const reviews = [
  { name: "Sarah M.", text: "Best coffee in town! The atmosphere is so welcoming.", rating: 5 },
  { name: "James K.", text: "My go-to spot for morning meetings. Love the pastries too.", rating: 5 },
  { name: "Priya L.", text: "Finally a cafe that gets it right. Beautiful space, amazing brews.", rating: 5 },
];

export function FinalOutput() {
  const { choices } = useBuilder();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showBanner, setShowBanner] = useState(true);

  const dir = choices.selectedDirection ?? 0;
  const theme = themes[dir];
  const heroImg = heroImages[dir];
  const name = choices.businessName || "The Brew House";

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}>
          <Loader2 className="w-10 h-10 text-purple-400" />
        </motion.div>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="text-white text-xl mt-6 mb-2">
          Building your website...
        </motion.p>
        <p className="text-slate-500">Applying your brand system to every section</p>
        <div className="mt-8 w-64">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2.8, ease: "easeInOut" }}
              className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Success banner */}
      {showBanner && (
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-green-500/10 border-b border-green-500/20 px-6 py-3"
        >
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-green-300 text-sm">
              <Check className="w-4 h-4" />
              Your website is ready! This is a live preview of your generated site.
            </div>
            <button onClick={() => setShowBanner(false)} className="text-green-500/50 hover:text-green-300 text-sm cursor-pointer">
              Dismiss
            </button>
          </div>
        </motion.div>
      )}

      {/* Action bar */}
      <div className="bg-slate-900/80 border-b border-white/10 px-6 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate("/build/directions")} className="inline-flex items-center gap-2 text-slate-400 hover:text-white text-sm cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Back to directions
          </button>
          <div className="flex gap-3">
            <button className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/10 cursor-pointer">
              <ExternalLink className="w-4 h-4" />
              Preview
            </button>
            <button className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl text-sm cursor-pointer">
              <Download className="w-4 h-4" />
              Export Website
            </button>
          </div>
        </div>
      </div>

      {/* === GENERATED WEBSITE === */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto mt-6 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
        style={{ backgroundColor: theme.bg }}
      >
        {/* Nav */}
        <nav className="flex items-center justify-between px-8 py-5" style={{ backgroundColor: theme.bg }}>
          <span className="text-xl" style={{ color: theme.text, fontFamily: dir === 2 ? "serif" : "inherit" }}>
            {name}
          </span>
          <div className="hidden md:flex items-center gap-8 text-sm" style={{ color: theme.muted }}>
            <span className="cursor-pointer hover:opacity-70">Menu</span>
            <span className="cursor-pointer hover:opacity-70">Our Story</span>
            <span className="cursor-pointer hover:opacity-70">Gallery</span>
            <span className="cursor-pointer hover:opacity-70">Contact</span>
            <span
              className="px-5 py-2 rounded-full text-sm cursor-pointer"
              style={{ backgroundColor: theme.accent, color: theme.accentText }}
            >
              Visit Us
            </span>
          </div>
        </nav>

        {/* Hero */}
        <div className="relative">
          <ImageWithFallback src={heroImg} alt="Hero" className="w-full h-[400px] object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="p-8 md:p-12 max-w-2xl">
              <h1 className="text-white text-3xl md:text-5xl mb-4" style={{ fontFamily: dir === 0 ? "serif" : dir === 2 ? "serif" : "inherit" }}>
                {theme.hero}
              </h1>
              <p className="text-white/70 mb-6 text-lg">
                Welcome to {name} — where every cup tells a story and every visit feels like home.
              </p>
              <div className="flex gap-3">
                <span className="px-6 py-3 rounded-full cursor-pointer" style={{ backgroundColor: theme.accent, color: theme.accentText }}>
                  See Our Menu
                </span>
                <span className="px-6 py-3 rounded-full cursor-pointer border border-white/30 text-white">
                  Our Story
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Section */}
        <div className="px-8 md:px-12 py-16">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: theme.accent }}>Our Menu</p>
            <h2 className="text-3xl" style={{ color: theme.text, fontFamily: dir !== 1 ? "serif" : "inherit" }}>
              Crafted with care
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item) => (
              <div key={item.name} className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: theme.card }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: theme.accent + "20" }}>
                  <item.icon className="w-5 h-5" style={{ color: theme.accent }} />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <span style={{ color: theme.text }}>{item.name}</span>
                    <span style={{ color: theme.accent }}>{item.price}</span>
                  </div>
                  <p className="text-sm" style={{ color: theme.muted }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="px-8 md:px-12 py-16" style={{ backgroundColor: dir === 1 ? "#F5F5F5" : dir === 2 ? "#1A1A2E" : "#2C1810" }}>
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: theme.accent }}>Reviews</p>
            <h2 className="text-3xl" style={{ color: dir >= 1 ? (dir === 2 ? "#F4EDE4" : theme.text) : "#F5E6D3", fontFamily: dir !== 1 ? "serif" : "inherit" }}>
              What our guests say
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reviews.map((r) => (
              <div key={r.name} className="p-6 rounded-xl" style={{ backgroundColor: theme.card }}>
                <div className="flex gap-0.5 mb-3">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" style={{ color: theme.accent }} />
                  ))}
                </div>
                <p className="mb-3 text-sm" style={{ color: theme.text }}>"{r.text}"</p>
                <p className="text-sm" style={{ color: theme.muted }}>— {r.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact / Location */}
        <div className="px-8 md:px-12 py-16">
          <div className="text-center mb-10">
            <p className="text-sm uppercase tracking-widest mb-2" style={{ color: theme.accent }}>Find Us</p>
            <h2 className="text-3xl" style={{ color: theme.text, fontFamily: dir !== 1 ? "serif" : "inherit" }}>
              Come say hello
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: theme.card }}>
              <MapPin className="w-6 h-6 mx-auto mb-3" style={{ color: theme.accent }} />
              <p className="text-sm" style={{ color: theme.text }}>123 Main Street</p>
              <p className="text-sm" style={{ color: theme.muted }}>Downtown District</p>
            </div>
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: theme.card }}>
              <Clock className="w-6 h-6 mx-auto mb-3" style={{ color: theme.accent }} />
              <p className="text-sm" style={{ color: theme.text }}>Mon–Fri: 7am – 7pm</p>
              <p className="text-sm" style={{ color: theme.muted }}>Sat–Sun: 8am – 5pm</p>
            </div>
            <div className="text-center p-6 rounded-xl" style={{ backgroundColor: theme.card }}>
              <Phone className="w-6 h-6 mx-auto mb-3" style={{ color: theme.accent }} />
              <p className="text-sm" style={{ color: theme.text }}>(555) 123-4567</p>
              <p className="text-sm" style={{ color: theme.muted }}>hello@brewhouse.com</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 md:px-12 py-8 border-t" style={{ borderColor: theme.muted + "30" }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-sm" style={{ color: theme.muted }}>
              &copy; 2026 {name}. All rights reserved.
            </span>
            <div className="flex items-center gap-4">
              <Instagram className="w-5 h-5 cursor-pointer hover:opacity-70" style={{ color: theme.muted }} />
              <Facebook className="w-5 h-5 cursor-pointer hover:opacity-70" style={{ color: theme.muted }} />
              <Mail className="w-5 h-5 cursor-pointer hover:opacity-70" style={{ color: theme.muted }} />
            </div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
