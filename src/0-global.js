import { TIMING } from "./0-config";
//.......................................................................
//DEFINITIONS............................................................
export const mainWrapper = document.querySelector(".main-wrapper");
export const blackout = document.querySelector(".blackout");
export const allSections = [...document.querySelectorAll(".section")];
export const allVidCodes = document.querySelectorAll(".vid-code");
export const allVids = document.querySelectorAll(".vid");
export const navMenu = document.querySelector(".nav_menu");
export const allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
export const navBtn = document.querySelector(".nav_button");
let activeSection = null;
let activeSectionName = null;
let activeVid = null;
let startTime = 0;
let endTime = 0;
let pauseFlag = false;
//.......................................................................
//GLOBAL FUNCTIONS.......................................................

export const getVidType = function (video) {
  return video.closest(".section").classList[1];
};

export const flashBlackout = function () {
  blackout.classList.remove("off");
  setTimeout(function () {
    blackout.classList.add("off");
  }, TIMING.BLACKOUT_TIMER);
};
export const enableNavLinksAndNavBtn = function () {
  navMenu.style.pointerEvents = "auto";
  navBtn.style.pointerEvents = "auto";
};
export const activateCurrentNavLink = function (clicked) {
  deactivateCurrentNavLinks();
  clicked.classList.add("current");
};
export const deactivateCurrentNavLinks = function () {
  allNavMenuLinks.forEach(function (el) {
    el.classList.remove("current");
  });
};
export const setActiveSection = function (sectionName, index) {
  deactivateAllSections();
  activeSectionName = sectionName;
  if (!index) index = 0;
  const matches = allSections.filter(
    (el) => el.dataset.section === sectionName,
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
export function getActiveVid() {
  return activeVid;
}
export function setActiveVid() {
  allVidCodes.forEach((el) => {
    if (el.offsetParent !== null) {
      activeVid = el.querySelector(".vid");
    }
  });
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
  const vidCode = activeVid.parentElement;
  const targetStart = videoCurrentTime || startTime;

  // CLEANUP: Kill any previous monitor before starting a new one
  if (activeVid._currentMonitor) {
    activeVid.removeEventListener("timeupdate", activeVid._currentMonitor);
  }

  // 1. HIDDEN STATE: Instant hide to reveal vid-wrapper background image
  if (vidCode) vidCode.style.opacity = "0";

  // Clear any existing timeupdate monitors
  activeVid.removeEventListener("timeupdate", activeVid._currentMonitor);

  const monitorTime = () => {
    if (activeVid.currentTime >= endTime - 0.15) {
      activeVid.removeEventListener("timeupdate", monitorTime);
      activeVid.pause();
      activeVid.currentTime = endTime;
      activeVid.dispatchEvent(new Event("ended"));
    }
  };
  activeVid._currentMonitor = monitorTime;

  // Source handling
  const source = activeVid.querySelector("source");
  const dataSrc = source ? source.getAttribute("data-src") : null;
  if (dataSrc && activeVid.src !== dataSrc) {
    activeVid.pause();
    activeVid.src = dataSrc;
    activeVid.load();
  }

  const startPlaybackSequence = async () => {
    try {
      activeVid.currentTime = targetStart;

      // 2. THE FAIL-SAFE REVEAL
      // We poll for physical playhead movement. Once it moves,
      // the "black buffer" is guaranteed to be gone.
      const pollForFrame = () => {
        if (activeVid.currentTime > targetStart) {
          // Double RAF is the final guard for the GPU paint cycle
          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (vidCode) vidCode.style.opacity = "1";
              if (typeof blackout !== "undefined")
                blackout.classList.add("off");
            });
          });
        } else if (!activeVid.paused) {
          // If still at targetStart but playing, check again next frame
          requestAnimationFrame(pollForFrame);
        }
      };

      // 3. START
      activeVid.addEventListener("timeupdate", monitorTime);
      await activeVid.play();
      pollForFrame(); // Start checking for the first real frame
    } catch (e) {
      console.warn("Playback failed:", e);
      // Fallback: show video anyway if play() fails (e.g. autplay blocked)
      if (vidCode) vidCode.style.opacity = "1";
    }
  };

  // Wait for data (readyState 3 is HAVE_FUTURE_DATA)
  if (activeVid.readyState >= 3) {
    startPlaybackSequence();
  } else {
    activeVid.addEventListener("canplay", startPlaybackSequence, {
      once: true,
    });
  }
};

export const disablePause = function () {
  pauseFlag = false;
  activeSection.querySelector(".pause-wrapper").style.pointerEvents = "none";
};
export const enablePause = function () {
  activeSection.querySelector(".pause-wrapper").style.pointerEvents = "auto";
};
export const togglePause = function () {
  if (pauseFlag) {
    pauseFlag = false;
    activeVid.play();
  } else {
    pauseFlag = true;
    activeVid.pause();
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
export const getLocalIndex = function (btn, btnClass, allBtnsWrapper) {
  let localIndex;
  const allBtns = btn
    .closest(`.${allBtnsWrapper}`)
    .querySelectorAll(`.${btnClass}`);
  allBtns.forEach(function (el, index) {
    if (el === btn) localIndex = index;
  });
  return localIndex;
};
