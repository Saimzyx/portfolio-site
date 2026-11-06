import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  globalIgnores([".next/**", ".reference/**", ".npm-cache/**", "next-env.d.ts", "playwright-report/**", "test-results/**", "css/**", "js/**"]),
]);
