/// <reference types="vitest" />
import { defineProject } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineProject({
  plugins: [react()],
  base: "/trafficLigth.github.io/",
  test: {
    environment: "jsdom",
    // "reporters" is not supported in a project config,
    // so it will show an error
    // reporters: ["json"],
    globals: true,
    setupFiles: "./vitest.setup.ts",
  },
});
