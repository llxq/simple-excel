import type { Plugin } from "vite"

export const optimizeDeclarationFile = (): Plugin => {
  return {
    name: "rollup-plugin-optimize-declaration-file",
  }
}
