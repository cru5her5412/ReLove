import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        giveAwayItem: resolve(__dirname, "giveAwayItem/index.html"),
        browseItems: resolve(__dirname, "browseItems/index.html"),
      },
    },
  },
});
