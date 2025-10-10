import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
  },
  {
    files: [
      "**/*.{js,jsx,ts,tsx}",
      "app.{js,ts}",
      "next.config.{js,ts}",
      "tailwind.config.{js,ts}",
      "eslint.config.{js,mjs}",
    ],
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-console": ["warn", { allow: ["error", "info"] }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never", propElementValues: "always" },
      ],
      "react-hooks/exhaustive-deps": "error",
      "simple-import-sort/exports": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            ["^react", "^@?\\w"], // Packages `react` related packages come first.
            ["^next", "^@?\\w"], // Packages `next` related packages come first.
            ["^(@|components)(/.*|$)"], // Internal packages.
            ["^\\u0000"], // Side effect imports.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"], // Parent imports. Put `..` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"], // Other relative imports. Put same-folder imports and `.` last.
            ["^.+\\.?(css)$"], // Style imports.
          ],
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { ignoreRestSiblings: true },
      ],
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
    },
  },
  // Disable ESLint rules that would conflict with Prettier
  eslintConfigPrettier,
];

export default eslintConfig;
