import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "brand/favicon.svg",
        "brand/favicon-32.png",
        "brand/apple-touch-icon.png",
        "brand/og-image.png",
      ],
      manifest: {
        name: "SHU ANTA",
        short_name: "SHU ANTA",
        description:
          "Cosmétiques naturels, pensés au Cameroun — savons, soins corps et routines visage.",
        lang: "fr",
        dir: "ltr",
        start_url: "/",
        scope: "/",
        display: "standalone",
        orientation: "portrait-primary",
        background_color: "#eeece8",
        theme_color: "#2f3a26",
        categories: ["shopping", "lifestyle"],
        icons: [
          {
            src: "/brand/icon-192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/brand/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        navigateFallback: "/index.html",
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,jpg,woff2,webmanifest}"],
        runtimeCaching: [
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|svg|gif)$/i,
            handler: "CacheFirst",
            options: {
              cacheName: "shu-anta-images",
              expiration: {
                maxEntries: 80,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: false,
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
