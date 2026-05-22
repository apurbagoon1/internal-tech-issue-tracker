import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/localServer.ts"],
  format: ["esm"],
  target: "esnext",
  outDir: "dist",
  clean: true,
  bundle: true,
  splitting: false,
  sourcemap: true,
});