import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  server: {
    host: true, // accessible depuis le téléphone sur le réseau local
    port: 5173,
  },
  preview: {
    host: true,
    port: 4173,
  },
  plugins: [
    basicSsl(), // HTTPS requis pour que le service worker marche sur mobile
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "brand/favicon.svg",
        "brand/favicon-32.png",
        "brand/apple-touch-icon.png",
        "brand/og-image.png",
        "brand/icon-192.png",
        "brand/icon-512.png",
      ],
      manifest: {
        id: "/",
        name: "SHU ANTA",
        short_name: "SHU ANTA",
        description:
          "Cosmétiques naturels, pensés au Cameroun — savons, soins corps et routines visage.",
        lang: "fr",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        display_override: ["standalone", "browser"],
        orientation: "any",
        background_color: "#eeece8",
        theme_color: "#2f3a26",
        categories: ["shopping", "lifestyle"],
        icons: [
          {
            src: "brand/icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,jpeg,woff2,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === "image",
            handler: "CacheFirst",
            options: {
              cacheName: "shu-anta-images",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      // Activer le SW aussi en dev pour tester sur téléphone
      devOptions: {
        enabled: true,
        type: "module",
        navigateFallback: "index.html",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
