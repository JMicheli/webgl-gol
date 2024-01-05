import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  if (command == "build" && mode == "jekyll") {
    return {
      build: {
        minify: "terser",
        terserOptions: {
          compress: {
            module: true,
            passes: 2
          },
          mangle: {
            toplevel: true
          }
        },
        lib: {
          entry: "src/webgl-gol.ts",
          name: "webgl-gol",
          formats: ["es"]
        },
        outDir: "dist",
        rollupOptions: {}
      }
    };
  } else {
    return {
      build: {
        lib: {
          entry: "src/webgl-gol.ts",
          formats: ["es"]
        },
        outDir: "dist",
        rollupOptions: {
          external: /^lit/
        }
      }
    };
  }
});
