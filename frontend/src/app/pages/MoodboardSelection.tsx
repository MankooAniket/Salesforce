import { useNavigate } from "react-router-dom";
import { useBuilder } from "../context/BuilderContext";
import { motion } from "motion/react";
import { ArrowRight, ArrowLeft, Check, Heart } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

const moodImages = [
  { id: "cozy-cafe", url: "https://images.unsplash.com/photo-1631869404868-2ae8de2e7264?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY29mZmVlJTIwc2hvcCUyMGludGVyaW9yJTIwd2FybXxlbnwxfHx8fDE3NzU2NTg0ODh8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Cozy & Warm", tag: "cozy" },
  { id: "modern-cafe", url: "https://images.unsplash.com/photo-1544457070-4cd773b4d71e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbW9kZXJuJTIwY2FmZSUyMGRlc2lnbnxlbnwxfHx8fDE3NzU3NDc2NDV8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Modern & Clean", tag: "minimal" },
  { id: "rustic", url: "https://images.unsplash.com/photo-1767471503553-357e56a6b3fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXN0aWMlMjBiYWtlcnklMjBzdG9yZWZyb250fGVufDF8fHx8MTc3NTc0NzY0NXww&ixlib=rb-4.1.0&q=80&w=1080", label: "Rustic & Artisan", tag: "rustic" },
  { id: "luxury", url: "https://images.unsplash.com/photo-1744776411223-71fb5794617a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVtaXVtJTIwbHV4dXJ5JTIwcmVzdGF1cmFudCUyMGludGVyaW9yfGVufDF8fHx8MTc3NTc0NzY0Nnww&ixlib=rb-4.1.0&q=80&w=1080", label: "Premium & Luxurious", tag: "luxury" },
  { id: "craft", url: "https://images.unsplash.com/photo-1633419946251-6d8b5dd33170?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpc2FuJTIwY3JhZnQlMjB3b3Jrc2hvcHxlbnwxfHx8fDE3NzU3MzM1Mjh8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Handcrafted", tag: "artisan" },
  { id: "botanical", url: "https://images.unsplash.com/photo-1730731863893-561bed213cb8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3RhbmljYWwlMjBwbGFudCUyMHNob3AlMjBhZXN0aGV0aWN8ZW58MXx8fHwxNzc1NzQ3NjQ2fDA&ixlib=rb-4.1.0&q=80&w=1080", label: "Natural & Green", tag: "nature" },
  { id: "vintage", url: "https://images.unsplash.com/photo-1761062083294-12c0fc95f2ef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwcmV0cm8lMjBkaW5lciUyMGFlc3RoZXRpY3xlbnwxfHx8fDE3NzU3NDc1ODN8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Vintage & Retro", tag: "vintage" },
  { id: "boutique", url: "https://images.unsplash.com/photo-1634316164679-dabb68a88a3c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHdoaXRlJTIwYm91dGlxdWUlMjBzdG9yZXxlbnwxfHx8fDE3NzU3NDc2NDd8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Chic & Boutique", tag: "chic" },
  { id: "industrial", url: "https://images.unsplash.com/photo-1767706508383-097054618007?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwbG9mdCUyMHNwYWNlJTIwZGVzaWdufGVufDF8fHx8MTc3NTc0NzY0OHww&ixlib=rb-4.1.0&q=80&w=1080", label: "Industrial & Raw", tag: "industrial" },
  { id: "vibrant", url: "https://images.unsplash.com/photo-1699210260087-347545f89de6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHZpYnJhbnQlMjBtYXJrZXQlMjBzdGFsbHxlbnwxfHx8fDE3NzU3NDc2NDh8MA&ixlib=rb-4.1.0&q=80&w=1080", label: "Vibrant & Colorful", tag: "vibrant" },
  { id: "zen", url: "https://images.unsplash.com/photo-1755685068178-4b57210ddcd4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx6ZW4lMjBqYXBhbmVzZSUyMHRlYSUyMGNlcmVtb255fGVufDF8fHx8MTc3NTc0NzY0OXww&ixlib=rb-4.1.0&q=80&w=1080", label: "Zen & Peaceful", tag: "zen" },
  { id: "food", url: "https://images.unsplash.com/photo-1764271701524-e43c70689067?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpdGVycmFuZWFuJTIwZm9vZCUyMHNwcmVhZCUyMHRhYmxlfGVufDF8fHx8MTc3NTY0ODgwNHww&ixlib=rb-4.1.0&q=80&w=1080", label: "Culinary & Fresh", tag: "culinary" },
  { id: "latte", url: "https://images.unsplash.com/photo-1655655555559-70610bfe5598?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsYXR0ZSUyMGFydCUyMGNvZmZlZSUyMGJhcmlzdGF8ZW58MXx8fHwxNzc1NjcwNzg0fDA&ixlib=rb-4.1.0&q=80&w=1080", label: "Coffee Culture", tag: "coffee" },
  { id: "wood", url: "https://images.unsplash.com/photo-1772983890865-8c826c7f6b80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjB0ZXh0dXJlJTIwbmF0dXJhbCUyMG1hdGVyaWFsfGVufDF8fHx8MTc3NTc0NzY1MHww&ixlib=rb-4.1.0&q=80&w=1080", label: "Natural Textures", tag: "texture" },
  { id: "marble", url: "https://images.unsplash.com/photo-1758055660837-6889c3cb3898?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXJibGUlMjBzdG9uZSUyMGx1eHVyeSUyMHN1cmZhY2V8ZW58MXx8fHwxNzc1NzQ3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080", label: "Marble & Stone", tag: "premium" },
  { id: "neon", url: "https://images.unsplash.com/photo-1620983626305-88db754c9a29?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZW9uJTIwbGlnaHRzJTIwdXJiYW4lMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzc1NzQ3NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080", label: "Urban & Bold", tag: "urban" },
];

// Variable heights for masonry feel
const heights = [240, 180, 260, 200, 220, 280, 190, 250, 210, 270, 200, 230, 260, 180, 240, 220];

export function MoodboardSelection() {
  const navigate = useNavigate();
  const { choices, setChoices } = useBuilder();

  const toggleImage = (id: string) => {
    setChoices((c) => ({
      ...c,
      moodImages: c.moodImages.includes(id)
        ? c.moodImages.filter((x) => x !== id)
        : [...c.moodImages, id],
    }));
  };

  const canProceed = choices.moodImages.length >= 3;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-white text-3xl mb-2">Pick what feels like your brand</h1>
        <p className="text-slate-400 text-lg">
          Select at least 3 images that match your vision. Don't overthink it — go with your gut.
        </p>
        {choices.moodImages.length > 0 && (
          <div className="mt-3 inline-flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-4 py-1.5">
            <Heart className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">{choices.moodImages.length} selected</span>
          </div>
        )}
      </div>

      {/* Masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
        {moodImages.map((img, i) => {
          const selected = choices.moodImages.includes(img.id);
          return (
            <motion.button
              key={img.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggleImage(img.id)}
              className={`relative w-full rounded-2xl overflow-hidden border-2 transition-all cursor-pointer break-inside-avoid block ${
                selected
                  ? "border-purple-500 shadow-lg shadow-purple-500/20"
                  : "border-transparent hover:border-white/20"
              }`}
            >
              <ImageWithFallback
                src={img.url}
                alt={img.label}
                className="w-full object-cover"
                style={{ height: heights[i] }}
              />
              {/* Overlay */}
              <div className={`absolute inset-0 transition-all ${
                selected ? "bg-purple-600/30" : "bg-black/0 hover:bg-black/20"
              }`} />
              {/* Check */}
              {selected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center shadow-lg"
                >
                  <Check className="w-4 h-4 text-white" />
                </motion.div>
              )}
              {/* Label */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent p-3 pt-8">
                <span className="text-white text-sm">{img.label}</span>
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-10 pb-10">
        <button
          onClick={() => navigate("/build")}
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <motion.button
          whileHover={canProceed ? { scale: 1.03 } : {}}
          whileTap={canProceed ? { scale: 0.97 } : {}}
          onClick={() => canProceed && navigate("/build/directions")}
          disabled={!canProceed}
          className={`inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-lg transition-all cursor-pointer ${
            canProceed
              ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/25"
              : "bg-white/5 text-slate-600 cursor-not-allowed"
          }`}
        >
          Next: See AI Designs
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
