console.log("test-1");
import { START_UI_REVEAL } from "./0-config";
import * as global from "./0-global";
import Navbar from "./0-navbar";
import Features from "./1-features";
import Data from "./2-data";
import Sequence from "./3-sequence";
//.......................................................................
//DEFINITIONS............................................................
startBtn = document.querySelector(".start-btn-wrapper");
iosConfigWrap = document.querySelector(".ios-config-wrap");
configBtnWrap = document.querySelector(".config-btn-wrap");
stepsOKWrap = document.querySelector(".steps-ok-wrap");
btnOK = document.querySelector(".btn-ok");
//.......................................................................
//init call (function at bottom).........................................
document.addEventListener("DOMContentLoaded", () => {
  init();
});
//.......................................................................
//LAZY LOADING...........................................................
document.addEventListener("DOMContentLoaded", () => {
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
});
//.......................................................................
//RESET VIDS AFTER UNLOADING.............................................
const ResetSection = function (section) {
  section.querySelectorAll(".vid").forEach(function (el) {
    el.currentTime = 0;
    el.pause();
  });
  global.deactivateCurrentBtns(section);
};
//.......................................................................
//EVENT DELEGATION-NAV...................................................
//nav_menu_link
Navbar.navMenu.addEventListener("click", function (e) {
  const clicked = e.target.closest(".nav_menu_link");
  if (!clicked) return;
  const clickedSectionName = clicked.classList[1];
  lastActiveSectionName = global.allSections.find((el) =>
    el.classList.contains("active"),
  ).classList[1];
  if (clickedSectionName !== lastActiveSectionName) {
    clearAllTimers();
    global.blackout.classList.remove("off");
    Navbar.closeNavMenu();
    global.deactivateCurrentBtns();
    global.disablePause();
    global.setActiveSection(clickedSectionName);
    global
      .getActiveSection()
      .querySelectorAll(".vid-code")
      .forEach(function (el) {
        el.classList.add("active");
      });
    global.setActiveVid();
    global.activateCurrentNavLink(clicked);
    global.enableSectionCtrlBtnEvents();
  } else return;
  switch (clickedSectionName) {
    case "features":
      Features.featuresBlackout.classList.add("off");
      Features.hideAllText();
      Features.showIntroText();
      Features.playFeaturesIntro();
      break;
    case "data":
      global.flashBlackout();
      Data.setLastActiveView();
      Data.setActiveView();
      Data.setDataVidBackgroundImg();
      Data.showIntroText();
      Data.hideBackBtn();
      Data.showCtrlBtnWrapper();
      Data.resetAllDataSheets();
      Data.hideAllData();
      Data.txtOrImg = "image";
      Data.txtImgBtn.textContent = "image";
      Data.dimmer.classList.remove("active");
      Data.activeView = Data.viewOptsBtn.textContent;
      global.clearSectionVidSrc();
      break;
    case "sequence":
      // global.blackout.classList.add("off");
      global.flashBlackout();
      Sequence.setActiveSequenceSection();
      Sequence.showIntroText();
      break;
  }
});
Navbar.navMenu.addEventListener("click", function (e) {
  const clicked = e.target.closest(".dropdown-icon");
  if (!clicked) return;
  Navbar.toggleNav(clicked);
});
Navbar.navBtn.addEventListener("click", function () {
  Navbar.closeNavMenu();
});
Navbar.allNavLinksWithDropdown.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    el.parentElement
      .querySelector(".nav_menu_dropdown")
      .classList.add("active");
  });
});
Navbar.allNavLinksWithDropdown.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    el.parentElement
      .querySelector(".nav_menu_dropdown")
      .classList.remove("active");
  });
});
Navbar.allNavDropdowns.forEach(function (el) {
  el.addEventListener("mouseenter", function () {
    el.parentElement
      .querySelector(".nav_menu_dropdown")
      .classList.add("active");
  });
});
Navbar.allNavDropdowns.forEach(function (el) {
  el.addEventListener("mouseleave", function () {
    el.parentElement
      .querySelector(".nav_menu_dropdown")
      .classList.remove("active");
  });
});
Navbar.allNavDropdowns.forEach(function (el) {
  el.addEventListener("click", function (e) {
    const clicked = e.target.closest(".nav_menu_link-dropdown");
    if (!clicked) return;
    clearAllTimers();
    global.deactivateCurrentBtns();
    Navbar.closeNavMenu();
    if (window.getComputedStyle(Navbar.navBtn).display !== "none") {
      Navbar.navBtn.click();
    }
    Navbar.getDropdownIndex(clicked);
    global.setActiveSection("sequence", Navbar.dropdownIndex);
    Sequence.setActiveSequenceSection();
    global.flashBlackout();
    global.disablePause();
    global.clearSectionVidSrc();
    global.activateCurrentNavLink(
      clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link"),
    );
    global.enableSectionCtrlBtnEvents();
    Sequence.showIntroText();
  });
});
//.......................................................................
//EVENT DELEGATION-BTNS..................................................
//pause-wrapper
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest(".pause-wrapper");
  if (!clicked) return;
  global.TogglePause();
});
Data.viewOptsBtn.addEventListener("mouseenter", function () {
  Data.showViewOpts();
});
Data.viewOptsBtn.addEventListener("mouseleave", function () {
  Data.hideViewOpts();
});
Data.viewOptsMenu.addEventListener("mouseenter", function () {
  Data.showViewOpts();
});
Data.viewOptsMenu.addEventListener("mouseleave", function () {
  Data.hideViewOpts();
});
//txt-img-btn
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest(".txt-img-btn");
  if (!clicked) return;
  if (Data.txtOrImg === "image") {
    Data.txtOrImg = "text";
    Data.dimmer.classList.remove("active");
    Data.activeDataSheet.classList.remove("active");
  } else {
    Data.txtOrImg = "image";
    Data.dimmer.classList.add("active");
    Data.activeDataSheet.classList.add("active");
  }
  Data.activeDataWrapper.querySelector(".txt-img-btn").textContent =
    Data.txtOrImg;
});
//opt-menu_link
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest(".opts-menu_link");
  if (!clicked) return;
  if (clicked.textContent === Data.activeView) return;
  global
    .getActiveSection()
    .querySelectorAll(".vid-code")
    .forEach(function (el) {
      el.classList.add("active");
    });
  clicked.classList.add("active");
  Data.setViewOptsBtnText(clicked.textContent);
  Data.setActiveViewBtnIndex();
  Data.setActiveDataWrapper();
  Data.setLastActiveView(); //for the bckgrnd img
  Data.setDataVidBackgroundImg();
  Data.setActiveView(clicked.textContent); //for the poster
  global.setActiveVid();
  Data.setDataVidPoster();
  Data.setActiveCtrlBtnWrapper();
  Data.hideViewOpts();
  global.disableNavLinksAndNavBtn();
  Data.setViewVidStartAndEnd();
  Data.dataVidPlay();
});
//ctrl-btn
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest(".ctrl-btn");
  if (!clicked) return;
  global
    .getActiveSection()
    .querySelectorAll(".vid-code")
    .forEach(function (el) {
      el.classList.add("active");
    });
  const vidType = global.getVidType(clicked);
  global.disablePause();
  switch (vidType) {
    case "features":
      clearAllTimers();
      Features.hideFeaturesIntroVidDiv();
      Features.showFeaturesVidDiv();
      Features.btnIndex = global.getCtrlBtnIndex(clicked);
      Features.vidPlay(clicked);
      break;
    case "data":
      clearAllTimers();
      Data.hideActiveCtrlBtnWrapper();
      Data.ctrlBtnIndex = global.getCtrlBtnIndex(clicked);
      Data.setLastActiveView();
      global.setActiveVid();
      Data.setDataVidStartAndEnd(clicked);
      Data.setDataVidBackgroundImg();
      Data.setDataVidPoster();
      global.getActiveVid().parentElement.style.opacity = 0;
      Data.dataVidPlay();
      break;
    case "sequence":
      clearAllTimers();
      Sequence.setActiveSequenceSection();
      Sequence.hideIntroText();
      Sequence.vidPlay(clicked);
      break;
  }
});
//ctrl-btn-back
global.mainWrapper.addEventListener("click", function (e) {
  const clicked = e.target.closest(".ctrl-btn-back");
  if (!clicked) return;
  Data.activeDataWrapper
    .querySelector(".txt-img-btn")
    .classList.remove("active");
  Data.txtOrImg = "image";
  Data.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
  Data.dimmer.classList.remove("active");
  Data.resetAllDataSheets();
  Data.hideAllData();
  Data.showIntroText();
  Data.hideBackBtn();
  Data.showCtrlBtnWrapper();
  global.clearSectionVidSrc();
});
//.......................................................................
//EVENT DELEGATION-VIDS..................................................
//ended
global.allVids.forEach(function (el) {
  el.addEventListener("ended", function () {
    const vidType = global.getVidType(el);
    switch (vidType) {
      case "features":
        Features.vidEnd();
        break;
      case "data":
        Data.vidEnd(el.closest(".vid"));
        break;
      case "sequence":
        Sequence.vidEnd();
        break;
    }
  });
});
//.......................................................................
//FUNCTIONS..............................................................
//init
const init = function () {
  Navbar.navComponent.classList.remove("active");
  Navbar.allNavDropdowns.forEach(function (el) {
    el.classList.remove("active");
  });
  global.blackout.classList.remove("off");
  global.setActiveSection("features");
  global.setActiveVid();
  Features.featuresEndisCancelled = false;
  Features.hideAllText();
  Features.featuresCtrlBtns.classList.remove("active");
  Data.activeView = "view-a";
  Data.txtOrImg = "image";
  Data.lastActiveView = {
    view: "view-a",
    startTime: 0,
    endTime: 0,
  };
  Data.viewChainFlag = false;
  Data.activeCtrlBtnWrapper = Data.allCtrlBtnWrappers[0];
  Sequence.sequenceEndIsCanelled = false;
  //.......................................................................
  //.......................................................................
  setTimeout(() => {
    Navbar.navComponent.classList.add("active");
    Features.showIntroText();
    Features.featuresCtrlBtns.classList.add("active");
  }, START_UI_REVEAL);
  Features.playFeaturesIntro();
  //.......................................................................
  //.......................................................................
};
//features and sequence timers
const clearAllTimers = function () {
  Features.clearFeaturesTimers();
  Sequence.clearSequenceTimers();
};
