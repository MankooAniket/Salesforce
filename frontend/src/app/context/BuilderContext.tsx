import React, { createContext, useContext, useState, ReactNode } from "react";

export interface BrandChoices {
  typography: string | null;
  colorPalette: string | null;
  layoutStyle: string | null;
  moodImages: string[];
  selectedDirection: number | null;
  businessName: string;
  businessType: string;
}

export interface BuilderState {
  brandInput: any;
  tokens: any;
  components: any;
  preview: any;
}

interface BuilderContextType {
  choices: BrandChoices;
  setChoices: React.Dispatch<React.SetStateAction<BrandChoices>>;

  builder: BuilderState;
  setBuilder: React.Dispatch<React.SetStateAction<BuilderState>>;
}

const BuilderContext = createContext<BuilderContextType | null>(null);

export function useBuilder() {
  const ctx = useContext(BuilderContext);
  if (!ctx) throw new Error("useBuilder must be used within BuilderProvider");
  return ctx;
}

export function BuilderProvider({ children }: { children: ReactNode }) {
  const [choices, setChoices] = useState<BrandChoices>({
    typography: null,
    colorPalette: null,
    layoutStyle: null,
    moodImages: [],
    selectedDirection: null,
    businessName: "The Brew House",
    businessType: "Coffee Shop",
  });

  const [builder, setBuilder] = useState<BuilderState>({
    brandInput: null,
    tokens: null,
    components: [],
    preview: null,
  });

  return (
    <BuilderContext.Provider
      value={{ choices, setChoices, builder, setBuilder }}
    >
      {children}
    </BuilderContext.Provider>
  );
}
