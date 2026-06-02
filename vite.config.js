import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// Injects <link rel="preload"> for the two LCP background images so
// the browser can start fetching them before React renders.
function preloadLcpImages() {
  const LCP_SOURCES = [
    path.resolve(__dirname, "src/assets/backgroundimg/bgimg1.webp"),
    path.resolve(__dirname, "src/assets/backgroundimg/bgimg5.webp"),
  ];

  let resolvedUrls = [];

  return {
    name: "preload-lcp-images",
    generateBundle(_, bundle) {
      resolvedUrls = [];
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type === "asset") {
          const src = chunk.originalFileNames?.[0] ?? "";
          const normalised = path.resolve(src.startsWith("/") ? src.slice(1) : src);
          if (LCP_SOURCES.some((p) => p === normalised || fileName.includes(path.basename(p, ".webp")))) {
            resolvedUrls.push("/" + fileName);
          }
        }
      }
    },
    transformIndexHtml(html) {
      if (!resolvedUrls.length) return html;
      const tags = resolvedUrls
        .map((url) => `  <link rel="preload" as="image" href="${url}" type="image/webp" fetchpriority="high">`)
        .join("\n");
      return html.replace("</head>", `${tags}\n</head>`);
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), preloadLcpImages()],
});
