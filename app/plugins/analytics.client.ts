// Google Analytics initialization plugin for Nuxt 4
// This plugin runs only on the client side and initializes GA when the app starts

import { defineNuxtPlugin } from "nuxt/app";
import { initGA } from "../../utils/analytics";

export default defineNuxtPlugin(() => {
  console.log("🚀 PLUGIN ANALYTICS LOADED!!!");
  debugger;

  // Initialize Google Analytics on client side
  // Wait for the page to be fully loaded
  const initializeGA = () => {
    console.log("📊 Initializing GA...");
    initGA();
  };

  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    // DOM is ready
    initializeGA();
  } else {
    // Wait for DOM to be ready
    document.addEventListener("DOMContentLoaded", initializeGA);
  }
});
