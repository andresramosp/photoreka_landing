// Google Analytics initialization plugin for Nuxt 4
// This plugin runs only on the client side and initializes GA when the app starts

import { defineNuxtPlugin } from "nuxt/app";
import { initGA } from "../app/utils/analytics";

export default defineNuxtPlugin(() => {
  // Initialize Google Analytics on client side
  // Wait for the page to be fully loaded
  if (document.readyState === "complete") {
    initGA();
  } else {
    window.addEventListener("load", () => {
      initGA();
    });
  }
});
