console.log("BRANCH: newModules-3");

import { START_UI_REVEAL } from "./0-config";
import * as global from "./0-global";
import NavbarClass from "./0-navbar";
import FeaturesClass from "./1-features";
import DataClass from "./2-data";
import SequenceClass from "./3-sequence";
//.......................................................................
//init call (function at bottom).........................................
document.addEventListener("DOMContentLoaded", () => {
  init();
});
//.......................................................................
//DEFINITIONS............................................................
const navContainer = document.querySelector(".nav_component");
const featuresContainer = document.querySelector(".section.features");
const dataContainer = document.querySelector(".section.data");
const sequenceContainer = document.querySelector(".section.sequence");
const navbar = new NavbarClass(navContainer);
const features = new FeaturesClass(global, featuresContainer);
const data = new DataClass(global, dataContainer);
const sequence = new SequenceClass(global, sequenceContainer);
const SECTIONS = {
  navbar: navbar,
  features: features,
  data: data,
  sequence: sequence,
};
//.......................................................................
//EVENT DELEGATION-NAV...................................................
//nav_menu_link
navContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest("[data-click-action]");
  if (!clicked) return;
  const activeSection = clicked.dataset.navSection;
  const targetModule = SECTIONS[activeSection];
  const action = clicked.dataset.clickAction;
  //1. Generic cleanup
  clearAllTimers();
  global.blackout.classList.remove("off");
  //2. State update
  global.setActiveSection(activeSection);
  //3. Polymorphic call
  targetModule.handleEvent(clicked, action);
});
navContainer.addEventListener("mouseover", function (e) {
  const hovered = e.target.closest("[data-mouseover-action]");
  if (!hovered) return;
  if (this.currentHover === hovered) return; // Exit if we are already hovering it
  this.currentHover = hovered;
  const action = hovered.dataset.mouseoverAction;
  navbar.handleEvent(hovered, action);
});
navContainer.addEventListener("mouseout", function (e) {
  const hovered = e.target.closest("[data-mouseout-action]");
  if (!hovered) return;
  // If the mouse moved to a child of the same button, don't trigger the "Exit"
  if (hovered.contains(e.relatedTarget)) return;
  this.currentHover = null;
  const action = hovered.dataset.mouseoutAction;
  navbar.handleEvent(hovered, action);
});
//.......................................................................
//EVENT DELEGATION-MAIN BODY.............................................
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest("[data-click-action]");
  if (!clicked) return;
  const activeSection = clicked.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = clicked.dataset.clickAction;
  targetModule.handleEvent(clicked, action);
});
global.mainWrapper.addEventListener("mouseover", function (e) {
  const hovered = e.target.closest("[data-mouseover-action]");
  if (!hovered) return;
  if (this.currentHover === hovered) return; // Exit if we are already hovering it
  this.currentHover = hovered;
  const activeSection = hovered.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = hovered.dataset.mouseoverAction;
  targetModule.handleEvent(hovered, action);
});
global.mainWrapper.addEventListener("mouseout", function (e) {
  const hovered = e.target.closest("[data-mouseout-action]");
  if (!hovered) return;
  // If the mouse moved to a child of the same button, don't trigger the "Exit"
  if (hovered.contains(e.relatedTarget)) return;
  this.currentHover = null;
  const activeSection = hovered.closest(".section").dataset.section;
  const targetModule = SECTIONS[activeSection];
  const action = hovered.dataset.mouseoutAction;
  targetModule.handleEvent(hovered, action);
});
//.......................................................................
//EVENT DELEGATION-VIDS..................................................
//ended
global.allVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    const vidType = global.getVidType(el);
    switch (vidType) {
      case "features":
        features.vidEnd();
        break;
      case "data":
        data.vidEnd(el.closest(".vid"));
        break;
      case "sequence":
        sequence.vidEnd();
        break;
    }
  });
});
//.......................................................................
//FUNCTIONS..............................................................
//init
const init = function () {
  setupLazyLoading();
  global.blackout.classList.remove("off");
  navContainer.classList.remove("active");
  navbar.allNavDropdowns.forEach(function (el) {
    el.classList.remove("active");
  });
  global.setActiveSection("features");
  global.setActiveVid();
  global.blackout.classList.add("off");
  features.playFeaturesIntro();
  //.......................................................................
  //.......................................................................
  setTimeout(() => {
    navContainer.classList.add("active");
    features.initSection(null, null, true);
  }, START_UI_REVEAL);
  //.......................................................................
  //.......................................................................
};
const setupLazyLoading = function () {
  const allLazyVids = document.querySelectorAll(".vid");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      const sources = video.querySelectorAll("source");
      if (entry.isIntersecting) {
        // --- LOAD LOGIC ---
        sources.forEach((source) => {
          // Use data-src if available, otherwise keep current src
          const dataSrc = source.getAttribute("data-src") || source.src;
          if (dataSrc) {
            source.src = dataSrc;
            // Keep data-src attribute so we can find the URL again later
            source.setAttribute("data-src", dataSrc);
          }
        });
        video.load();
      } else {
        // --- UNLOAD LOGIC ---
        // Clears the internal logs for user interactions and resource loads
        performance.clearMeasures();
        performance.clearResourceTimings();
        performance.clearMarks();
        ResetSection(video.closest(".section"));
        video.pause();
        sources.forEach((source) => {
          // Move src back to data-src and empty the current src
          const currentSrc = source.src;
          if (currentSrc) {
            source.setAttribute("data-src", currentSrc);
            source.src = ""; // This stops the video from buffering
            source.removeAttribute("src"); // Fully clear attribute
          }
        });
        // Force the browser to dump the video data from memory
        video.load();
      }
    });
  }, observerOptions);
  allLazyVids.forEach((vid) => videoObserver.observe(vid));
  //.......................................................................
  //RESET VIDS AFTER UNLOADING.............................................
  const ResetSection = function (section) {
    if (!section) return; //helps prevent crashes
    section.querySelectorAll(".vid").forEach(function (el) {
      el.currentTime = 0;
      el.pause();
    });
    global.deactivateCurrentBtns(section);
  };
};
//features and sequence timers
const clearAllTimers = function () {
  features.clearFeaturesTimers();
  sequence.clearSequenceTimers();
};
