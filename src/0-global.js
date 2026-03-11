import { BLACKOUT_TIMER } from "./0-config";
//.......................................................................
//DEFINITIONS............................................................
export const mainWrapper = document.querySelector(".main-wrapper");
export const blackout = document.querySelector(".blackout");
export const allSections = [...document.querySelectorAll(".section")];
export const allVids = document.querySelectorAll(".vid");
// let activeSection = document.querySelector(".section.features");
// let activeVid = document
//   .querySelector(".section.features")
//   .querySelector(".vid");
let activeSection;
let activeVid;
let startTime;
let endTime;
let pauseFlag;
//.......................................................................
//GLOBAL FUNCTIONS.......................................................
export const flashBlackout = function () {
  blackout.classList.remove("off");
  setTimeout(function () {
    blackout.classList.add("off");
  }, BLACKOUT_TIMER);
};
export const enableNavLinksAndNavBtn = function () {
  document.querySelector(".nav_menu").style.pointerEvents = "auto";
  document.querySelector(".nav_button").style.pointerEvents = "auto";
};
export const disableNavLinksAndNavBtn = function () {
  document.querySelector(".nav_menu").style.pointerEvents = "none";
  if (
    window.getComputedStyle(document.querySelector(".nav_menu")).display ===
    "block"
  ) {
    document.querySelector(".nav_button").click();
  }

  document.querySelector(".nav_button").style.pointerEvents = "none";
};
export const activateCurrentNavLink = function (clicked) {
  deactivateCurrentNavLinks();
  clicked.classList.add("current");
};
export const deactivateCurrentNavLinks = function () {
  document.querySelectorAll(".nav_menu_link").forEach(function (el) {
    el.classList.remove("current");
  });
};
export const getActiveSection = function () {
  return activeSection;
};
export const setActiveSection = function (sectionName, index) {
  deactivateAllSections();
  if (!index) index = 0;
  const matches = allSections.filter((el) =>
    el.classList.contains(sectionName),
  );
  const target = matches[index];
  if (target) {
    target.classList.add("active");
    activeSection = target;
  }
};
export const deactivateAllSections = function () {
  allSections.forEach(function (el) {
    el.classList.remove("active");
  });
};
export const getVidType = function (video) {
  return video.closest(".section").classList[1];
};
export function getActiveVid() {
  return activeVid;
}
export function setActiveVid(specificVid) {
  if (!specificVid) {
    activeSection.querySelectorAll(".vid-code").forEach(function (el) {
      if (window.getComputedStyle(el).opacity != 0) {
        activeVid = el.querySelector(".vid");
      }
    });
  } else {
    activeSection.querySelectorAll(`.${specificVid}`).forEach(function (el) {
      if (window.getComputedStyle(el).opacity != 0) {
        activeVid = el.querySelector(".vid");
      }
    });
  }
}
export function setStartTime(newValue) {
  startTime = newValue;
}
export function setEndTime(newValue) {
  endTime = newValue;
}
export const clearSectionVidSrc = function () {
  activeSection.querySelectorAll(".vid").forEach(function (el) {
    el.src = "";
    el.load();
  });
};
export const resetAllSectionVids = function () {
  activeSection.querySelectorAll(".vid").forEach(function (el) {
    el.currentTime = 0;
    el.pause();
  });
};
export const playRange = function (videoCurrentTime) {
  const targetStart = videoCurrentTime || startTime;
  activeVid.parentElement.style.opacity = "0";
  const source = activeVid.querySelector("source");
  const dataSrc = source ? source.getAttribute("data-src") : null;
  // REVISION: Set src directly on the video element for better event reliability
  if (dataSrc && activeVid.src !== dataSrc) {
    activeVid.pause();
    activeVid.src = dataSrc; // Setting src on video directly is more robust than <source>
    activeVid.load();
  }
  const monitorTime = () => {
    if (activeVid.currentTime >= endTime - 0.15) {
      activeVid.removeEventListener("timeupdate", monitorTime);
      activeVid.pause();
      activeVid.currentTime = endTime;
      activeVid.dispatchEvent(new Event("ended"));
    }
  };
  const startPlaybackSequence = async () => {
    // console.log("SUCCESS: entered startPlaybackSequence");
    try {
      activeVid.currentTime = targetStart;
      activeVid.addEventListener(
        "seeked",
        async () => {
          requestAnimationFrame(() => {
            requestAnimationFrame(async () => {
              activeVid.parentElement.style.opacity = "1";
              if (typeof blackout !== "undefined")
                blackout.classList.add("off");
              await activeVid.play();
              activeVid.addEventListener("timeupdate", monitorTime);
            });
          });
        },
        { once: true },
      );
    } catch (e) {
      console.error("Playback sequence failed", e);
    }
  };
  // REVISION: Listen for BOTH loadedmetadata and loadeddata (first frame ready)
  // and check readyState immediately.
  if (activeVid.readyState >= 1) {
    startPlaybackSequence();
  } else {
    // console.log("Waiting for metadata or data...");
    activeVid.addEventListener("loadedmetadata", startPlaybackSequence, {
      once: true,
    });
    // Backup: some browsers skip metadata and go straight to loadeddata
    activeVid.addEventListener("loadeddata", startPlaybackSequence, {
      once: true,
    });
  }
};

export const disablePause = function () {
  pauseFlag = false;
  if (activeSection.classList.contains("data")) return;
  document.querySelectorAll(".pause-wrapper").forEach(function (el) {
    el.classList.remove("active");
  });
  document.querySelectorAll(".pause-wrapper").forEach(function (el) {
    el.style.pointerEvents = "none";
  });
};
export const enablePause = function () {
  activeSection.querySelector(".pause-wrapper").style.pointerEvents = "auto";
};
export const pauseVid = function () {
  activeSection.querySelector(".pause-wrapper").classList.add("active");
  activeVid.pause();
};
export const unPauseVid = function () {
  activeSection.querySelector(".pause-wrapper").classList.remove("active");
  activeVid.play();
};
export const TogglePause = function () {
  if (pauseFlag) {
    pauseFlag = false;
    unPauseVid();
  } else {
    pauseFlag = true;
    pauseVid();
  }
};
export const enableSectionCtrlBtnEvents = function () {
  activeSection.querySelector(".section-wrap-btns").style.pointerEvents =
    "auto";
};
export const disableSectionCtrlBtnEvents = function () {
  activeSection.querySelector(".section-wrap-btns").style.pointerEvents =
    "none";
};
export const setActiveCtrlBtnWrapper = function (btnWrapperIndex) {
  deactivateAllCtrlBtnWrappers();
  activeSection
    .querySelectorAll(".section-wrap-btns")
    .forEach(function (el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
};
export const deactivateAllCtrlBtnWrappers = function () {
  activeSection.querySelectorAll(".section-wrap-btns").forEach(function (el) {
    el.classList.remove("active");
  });
};
export const activateCurrentBtn = function (btn) {
  deactivateCurrentBtns();
  btn.classList.add("current");
};
export const deactivateCurrentBtns = function (section) {
  if (!section) section = activeSection;
  section.querySelectorAll(".ctrl-btn").forEach(function (el) {
    el.classList.remove("current");
  });
};
export const getCtrlBtnIndex = function (btn) {
  let localIndex;
  const allBtns = btn
    .closest(".section-wrap-btns")
    .querySelectorAll(".ctrl-btn");
  allBtns.forEach(function (el, index) {
    if (el === btn) localIndex = index;
  });
  return localIndex;
};
