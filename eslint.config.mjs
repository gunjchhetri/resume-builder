import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define TypeScript ESLint rules configuration
const typeScriptRules = {
  files: ["**/*.ts", "**/*.tsx"],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      project: "./tsconfig.json", // Path to your tsconfig.json file
      tsconfigRootDir: __dirname,
    },
  },
  rules: {
    // Type safety rules
    "@typescript-eslint/explicit-function-return-type": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-unsafe-assignment": "error",
    "@typescript-eslint/no-unsafe-call": "error",
    "@typescript-eslint/no-unsafe-member-access": "error",
    "@typescript-eslint/no-unsafe-return": "error",
  },
};

// Line limit configurations
const tsxLineLimit = {
  files: ["**/*.tsx"],
  rules: {
    "max-lines": ["error", { max: 65 }],
  },
};

const tsLineLimit = {
  files: ["**/*.ts"],
  rules: {
    "max-lines": ["error", { max: 100 }],
  },
};

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  typeScriptRules,
  tsxLineLimit,
  tsLineLimit,
];

export default eslintConfig;
