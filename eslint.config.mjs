import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Test/scratch files in root
    "test_db.js",
    "prisma/seed.js",
    "add_zips.js",
  ]),
  // Relaxed rules for AI SDK integration & third-party adapters
  // These files interface with external APIs that are inherently untyped.
  {
    files: [
      "src/lib/ai/**/*.ts",
      "src/lib/aiEngine.ts",
      "src/lib/email.ts",
      "src/lib/google-calendar.ts",
      "src/lib/gtag.ts",
      "src/lib/maps.ts",
      "src/lib/availability.ts",
      "src/lib/locationVerification.ts",
      "src/lib/sensitive-otp.ts",
      "src/lib/rbac.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
    },
  },
  {
    rules: {
      "react/no-unescaped-entities": "off",
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off",
    }
  },
]);

export default eslintConfig;
