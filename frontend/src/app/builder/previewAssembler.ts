import { DesignTokens } from "./tokenMapper";
import { ComponentType } from "./componentMapper";

export function buildPreview(
  tokens: DesignTokens,
  components: ComponentType[]
) {
  return {
    theme: tokens,
    layout: components,
  };
}