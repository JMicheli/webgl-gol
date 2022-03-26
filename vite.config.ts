import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
  if (command == "build" && mode =="github") {
    return {
      build: {
        lib: {
          entry: "src/webgl-gol.ts",
          name: "webgl-gol",
          formats: ["es"]
        },
        outDir: "dist",
        rollupOptions: {
        }
      }
    }
  } else {
    return {
      build: {
        lib: {
          entry: "src/webgl-gol.ts",
          formats: ["es"]
        },
        rollupOptions: {
          external: /^lit/
        }
      }
    };
  }
});
