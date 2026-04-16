export type BrandInput = {
  tone: string;
  industry: string;
};

export type DesignTokens = {
  primaryColor: string;
  font: string;
};

export function mapBrandToTokens(input: BrandInput): DesignTokens {
  // TEMP logic (replace later with backend response)
  if (input.tone.includes("minimal")) {
    return {
      primaryColor: "#1A1A1A",
      font: "Inter",
    };
  }

  return {
    primaryColor: "#0070f3",
    font: "Arial",
  };
}