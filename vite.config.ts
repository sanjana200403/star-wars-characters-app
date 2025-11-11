import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { configDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    include: [
      "src/**/*.test.{js,ts,jsx,tsx}",
      "src/**/*.spec.{js,ts,jsx,tsx}",
    ],
    exclude: [...configDefaults.exclude, "e2e/*"],
  },
});
