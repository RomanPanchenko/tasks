import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import stylistic from "@stylistic/eslint-plugin";

export default [
  {
    files: ["**/*.ts", "**/*.js"],
    ignores: [".eslintrc.js"],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        sourceType: "module",
      },
    },

    plugins: {
      "@typescript-eslint": ts,
      "@stylistic": stylistic,
    },

    rules: {
      // TypeScript rules
      "@typescript-eslint/no-explicit-any": "off",
      "no-empty": ["error", { "allowEmptyCatch": true }],
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          "vars": "all", // Check all variables
          "args": "after-used", // Ignore non-used arguments except latest
          "ignoreRestSiblings": true, // Good with `{ ...rest }`
          "argsIgnorePattern": "^_", // Ignore arguments starting with `_`
          "varsIgnorePattern": "^_", // Ignore variables starting with `_`
          "caughtErrorsIgnorePattern": "^_",
          "destructuredArrayIgnorePattern": "^_",
        }
      ],

      // Stylistic rules
      "@stylistic/no-tabs": "error",
      "@stylistic/arrow-spacing": ["error", { before: true, after: true }],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/block-spacing": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "only-multiline"],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/key-spacing": ["error", { beforeColon: false, afterColon: true, mode: "strict" }],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/linebreak-style": ["error", "unix"],

      // General rules
      "quote-props": ["error", "as-needed"],
    },
  },
];
