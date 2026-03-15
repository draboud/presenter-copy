(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var TIMING = Object.freeze({
    START_UI_REVEAL: 1500,
    BLACKOUT_TIMER: 200,
    BLACKOUT_WAIT_TO_REVEAL: 50,
    VID_END_TIMER: 1500
  });
  var IMAGES = Object.freeze({
    DATA_VIEW_1: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678707c7b74a524f9f4_Data-View-1.webp",
    DATA_VIEW_1_MP: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066780bffd055268006d5_Data-View-1-MP.webp",
    DATA_VIEW_2: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066788514192dd118f92e_Data-View-2.webp",
    DATA_VIEW_2_MP: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678f95e3f4b347c21a6_Data-View-2-MP.webp",
    DATA_VIEW_3: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678663d4800cc5f9935_Data-View-3.webp",
    DATA_VIEW_3_MP: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066785c709890f1f02679_Data-View-3-MP.webp"
  });
  var VIEW_START_END = Object.freeze({
    "view-a": {
      startTime: 0,
      endTime: 0
    },
    "view-b": {
      startTime: 1.48,
      endTime: 2.69
    },
    "view-c": {
      startTime: 4.44,
      endTime: 5.65
    }
  });

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    activateCurrentBtn: () => activateCurrentBtn,
    activateCurrentNavLink: () => activateCurrentNavLink,
    allNavMenuLinks: () => allNavMenuLinks,
    allSections: () => allSections,
    allVidCodes: () => allVidCodes,
    allVids: () => allVids,
    blackout: () => blackout,
    clearSectionVidSrc: () => clearSectionVidSrc,
    deactivateAllCtrlBtnWrappers: () => deactivateAllCtrlBtnWrappers,
    deactivateAllSections: () => deactivateAllSections,
    deactivateCurrentBtns: () => deactivateCurrentBtns,
    deactivateCurrentNavLinks: () => deactivateCurrentNavLinks,
    disablePause: () => disablePause,
    disableSectionCtrlBtnEvents: () => disableSectionCtrlBtnEvents,
    enableNavLinksAndNavBtn: () => enableNavLinksAndNavBtn,
    enablePause: () => enablePause,
    enableSectionCtrlBtnEvents: () => enableSectionCtrlBtnEvents,
    flashBlackout: () => flashBlackout,
    getActiveVid: () => getActiveVid,
    getLocalIndex: () => getLocalIndex,
    getVidType: () => getVidType,
    mainWrapper: () => mainWrapper,
    navBtn: () => navBtn,
    navMenu: () => navMenu,
    playRange: () => playRange,
    resetAllSectionVids: () => resetAllSectionVids,
    setActiveCtrlBtnWrapper: () => setActiveCtrlBtnWrapper,
    setActiveSection: () => setActiveSection,
    setActiveVid: () => setActiveVid,
    setEndTime: () => setEndTime,
    setStartTime: () => setStartTime,
    togglePause: () => togglePause
  });
  var mainWrapper = document.querySelector(".main-wrapper");
  var blackout = document.querySelector(".blackout");
  var allSections = [...document.querySelectorAll(".section")];
  var allVidCodes = document.querySelectorAll(".vid-code");
  var allVids = document.querySelectorAll(".vid");
  var navMenu = document.querySelector(".nav_menu");
  var allNavMenuLinks = document.querySelectorAll(".nav_menu_link");
  var navBtn = document.querySelector(".nav_button");
  var activeSection = null;
  var activeSectionName = null;
  var activeVid = null;
  var startTime = 0;
  var endTime = 0;
  var pauseFlag = false;
  var getVidType = function(video) {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.remove("off");
    setTimeout(function() {
      blackout.classList.add("off");
    }, TIMING.BLACKOUT_TIMER);
  };
  var enableNavLinksAndNavBtn = function() {
    navMenu.style.pointerEvents = "auto";
    navBtn.style.pointerEvents = "auto";
  };
  var activateCurrentNavLink = function(clicked) {
    deactivateCurrentNavLinks();
    clicked.classList.add("current");
  };
  var deactivateCurrentNavLinks = function() {
    allNavMenuLinks.forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var setActiveSection = function(sectionName, index) {
    deactivateAllSections();
    activeSectionName = sectionName;
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.dataset.section === sectionName
    );
    const target = matches[index];
    if (target) {
      target.classList.add("active");
      activeSection = target;
    }
  };
  var deactivateAllSections = function() {
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
  };
  function getActiveVid() {
    return activeVid;
  }
  function setActiveVid() {
    allVidCodes.forEach((el) => {
      if (el.offsetParent !== null) {
        activeVid = el.querySelector(".vid");
      }
    });
  }
  function setStartTime(newValue) {
    startTime = newValue;
  }
  function setEndTime(newValue) {
    endTime = newValue;
  }
  var clearSectionVidSrc = function() {
    activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.src = "";
      el.load();
    });
  };
  var resetAllSectionVids = function() {
    activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
  };
  var playRange = function(videoCurrentTime) {
    const vidCode = activeVid.parentElement;
    const targetStart = videoCurrentTime || startTime;
    if (activeVid._currentMonitor) {
      activeVid.removeEventListener("timeupdate", activeVid._currentMonitor);
    }
    if (vidCode) vidCode.style.opacity = "0";
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
        const pollForFrame = () => {
          if (activeVid.currentTime > targetStart) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (vidCode) vidCode.style.opacity = "1";
                if (typeof blackout !== "undefined")
                  blackout.classList.add("off");
              });
            });
          } else if (!activeVid.paused) {
            requestAnimationFrame(pollForFrame);
          }
        };
        activeVid.addEventListener("timeupdate", monitorTime);
        await activeVid.play();
        pollForFrame();
      } catch (e) {
        console.warn("Playback failed:", e);
        if (vidCode) vidCode.style.opacity = "1";
      }
    };
    if (activeVid.readyState >= 3) {
      startPlaybackSequence();
    } else {
      activeVid.addEventListener("canplay", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    pauseFlag = false;
    activeSection.querySelector(".pause-wrapper").style.pointerEvents = "none";
  };
  var enablePause = function() {
    activeSection.querySelector(".pause-wrapper").style.pointerEvents = "auto";
  };
  var togglePause = function() {
    if (pauseFlag) {
      pauseFlag = false;
      activeVid.play();
    } else {
      pauseFlag = true;
      activeVid.pause();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
  };
  var setActiveCtrlBtnWrapper = function(btnWrapperIndex) {
    deactivateAllCtrlBtnWrappers();
    activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
  };
  var deactivateAllCtrlBtnWrappers = function() {
    activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var activateCurrentBtn = function(btn) {
    deactivateCurrentBtns();
    btn.classList.add("current");
  };
  var deactivateCurrentBtns = function(section) {
    if (!section) section = activeSection;
    section.querySelectorAll(".ctrl-btn").forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var getLocalIndex = function(btn, btnClass, allBtnsWrapper) {
    let localIndex;
    const allBtns = btn.closest(`.${allBtnsWrapper}`).querySelectorAll(`.${btnClass}`);
    allBtns.forEach(function(el, index) {
      if (el === btn) localIndex = index;
    });
    return localIndex;
  };

  // src/0-navbar.js
  var Navbar = class {
    constructor(container) {
      this.container = container;
      this.navMenu = this.container.querySelector(".nav_menu");
      this.navBtn = this.container.querySelector(".nav_button");
      this.allNavLinks = this.container.querySelectorAll(".nav_menu_link");
      this.allNavLinksWithDropdown = [
        ...this.container.querySelectorAll('[data-nav-section="sequence"]')
      ];
      this.allNavDropdowns = [
        ...this.container.querySelectorAll(".nav_menu_dropdown")
      ];
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-nav-dropdown", this.openNavDropdown.bind(this)],
        ["close-nav-dropdown", this.closeNavDropdown.bind(this)],
        ["toggle-nav-dropdown", this.toggleNavDropdown.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    handleEvent = function(trigger, eventAction) {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    closeMobileNavMenu = function() {
      if (window.getComputedStyle(this.navBtn).display !== "none")
        this.navBtn.click();
    };
    disableNavLinksAndNavBtn = function() {
      this.navMenu.style.pointerEvents = "none";
      if (window.getComputedStyle(this.navMenu).display !== "none") {
        this.closeMobileNavMenu();
      }
      this.navBtn.style.pointerEvents = "none";
    };
    openNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.add("active");
    };
    closeNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    toggleNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = Navbar;

  // src/1-features.js
  var Features = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.featuresBlackout = this.container.querySelector(".blackout");
      this.featuresAllText = [
        ...this.container.querySelectorAll(".text-wrapper")
      ];
      this.featuresIntroVidDiv = this.container.querySelector(".vid-wrapper.intro");
      this.featuresVidDiv = this.container.querySelector(".vid-wrapper.features");
      this.pauseWrapper = this.container.querySelector(".pause-wrapper");
      this.featuresCtrlBtns = this.container.querySelector(".section-wrap-btns");
      this.btnIndex = 0;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-features", this.initSection.bind(this)],
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clicked, index, introFlag) {
      this.global.blackout.classList.add("off");
      this.featuresBlackout.classList.add("off");
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      if (clicked) {
        this.global.activateCurrentNavLink(clicked);
        this.global.flashBlackout();
      }
      this.global.enableSectionCtrlBtnEvents();
      this.hideAllText();
      this.showIntroText();
      this.featuresCtrlBtns.classList.add("active");
      if (introFlag) return;
      this.playFeaturesIntro();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    hideAllText = function() {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = function() {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro").classList.add("active");
    };
    showFeatureText = function() {
      this.featuresAllText[this.btnIndex + 1].classList.add("active");
    };
    showFeaturesIntroVidDiv = function() {
      this.featuresIntroVidDiv.classList.add("active");
    };
    hideFeaturesIntroVidDiv = function() {
      this.featuresIntroVidDiv.classList.remove("active");
    };
    showFeaturesVidDiv = function() {
      this.featuresVidDiv.classList.add("active");
    };
    hideFeaturesVidDiv = function() {
      this.featuresVidDiv.classList.remove("active");
    };
    playFeaturesIntro = function() {
      this.featuresBlackout.classList.add("off");
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      const allIntros = this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro");
      allIntros.forEach((el) => {
        if (el.offsetParent !== null) {
          const vid = el.querySelector(".vid-intro");
          if (vid) {
            vid.currentTime = 0;
            vid.play();
          }
        }
      });
    };
    playCtrlBtnVid = function(clickedCtrlBtn) {
      this.clearFeaturesTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.hideFeaturesIntroVidDiv();
      this.showFeaturesVidDiv();
      this.btnIndex = this.global.getLocalIndex(
        clickedCtrlBtn,
        "ctrl-btn",
        "section-wrap-btns"
      );
      this.featuresEndisCancelled = false;
      this.hideAllText();
      this.showFeatureText();
      this.global.setActiveVid();
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.remove("off");
      this.global.playRange();
    };
    pauseCtrlVid = function() {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = function() {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.remove("off");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            this.global.resetAllSectionVids();
            this.global.deactivateCurrentBtns();
            this.global.enableNavLinksAndNavBtn();
            this.global.enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, TIMING.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VID_END_TIMER);
        window.dispatchEvent(new CustomEvent("featuresVidEnded"));
      }
    };
    deactivateCurrentBtns = function() {
      this.featuresCtrlBtns.forEach(function(el) {
        el.classList.remove("current");
      });
    };
    clearFeaturesTimers = function() {
      this.featuresEndisCancelled = true;
      clearTimeout(this.featuresTimer);
      this.featuresTimer = null;
    };
  };
  var features_default = Features;

  // src/2-data.js
  var Data = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.introText = this.container.querySelector(".section-wrap-txt");
      this.viewVidDiv = this.container.querySelector(".vid-wrapper.view");
      this.allViewVidDivs = this.container.querySelectorAll(".vid-code-view");
      this.compVidDiv = this.container.querySelector(".vid-wrapper.comp");
      this.allDataVidDivs = this.container.querySelectorAll(".vid-code");
      this.startTime;
      this.endTime;
      this.viewVidFlag;
      this.viewOptsBtn = this.container.querySelector(".opts-menu_btn");
      this.viewOptsMenu = this.container.querySelector(".opts-dropdown");
      this.allViewOptBtns = [
        ...this.container.querySelectorAll(".opts-menu_link")
      ];
      this.activeViewBtnIndex = null;
      this.activeView = "view-a";
      this.lastActiveView = { view: "view-a", startTime: 0, endTime: 0 };
      this.viewChainFlag = false;
      this.dimmer = this.container.querySelector(".dimmer");
      this.txtImgBtn = this.container.querySelector(".txt-img-btn");
      this.txtOrImg = "image";
      this.activeDataWrapper = this.container.querySelector(
        ".section-wrap-comp-data"
      );
      this.allDataWrappers = [
        ...this.container.querySelectorAll(".section-wrap-comp-data")
      ];
      this.allData = [...this.container.querySelectorAll(".comp-data-wrap")];
      this.activeDataSheet = null;
      this.ctrlBtnWrapper = this.container.querySelector(".section-wrap-btns");
      this.allCtrlBtnWrappers = [
        ...this.container.querySelectorAll(".section-wrap-btns")
      ];
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.ctrlBtnIndex = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection.bind(this)],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid.bind(this)],
        ["play-view-vid", this.setAndPlayViewVid.bind(this)],
        ["back-to-view", this.backToViewFromComp.bind(this)],
        ["open-view-opts-menu", this.showViewOptsMenu.bind(this)],
        ["close-view-opts-menu", this.hideViewOptsMenu.bind(this)],
        ["toggle-img-txt", this.showCompImageOrText.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clicked) {
      this.global.flashBlackout();
      this.dimmer.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideBackBtn();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText.classList.add("active");
      this.showCtrlBtnWrapper();
      this.global.activateCurrentNavLink(clicked);
      this.global.clearSectionVidSrc();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    showViewOptsMenu = function() {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOptsMenu = function() {
      this.viewOptsMenu.classList.remove("active");
    };
    showCompImageOrText = function() {
      if (this.txtOrImg === "image") {
        this.txtOrImg = "text";
        this.dimmer.classList.remove("active");
        this.activeDataSheet.classList.remove("active");
      } else {
        this.txtOrImg = "image";
        this.dimmer.classList.add("active");
        this.activeDataSheet.classList.add("active");
      }
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = this.txtOrImg;
    };
    setActiveViewBtnIndex = function() {
      this.allViewOptBtns.forEach((el, index) => {
        if (el.classList.contains("active")) {
          this.activeViewBtnIndex = index;
          el.classList.remove("active");
        }
      });
    };
    hideAllData = function() {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = function() {
      this.activeDataWrapper.classList.add("active");
      this.activeDataSheet = Array.from(
        this.activeDataWrapper.querySelectorAll(".comp-data-wrap")
      )[this.ctrlBtnIndex];
      this.activeDataSheet.classList.add("active");
    };
    hideBackBtn = function() {
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.remove("active");
    };
    showBackBtn = function() {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.remove("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.add("active");
    };
    resetAllDataSheets = function() {
      this.allData.forEach(function(el) {
        el.parentElement.classList.add("active");
        el.querySelector(".comp-data-body-wrap").scroll(0, 0);
        el.parentElement.classList.remove("active");
      });
    };
    setLastActiveView = function(newValue) {
      if (!newValue) {
        this.lastActiveView.view = this.activeView;
      } else {
        this.lastActiveView.view = newValue;
      }
    };
    setActiveView = function(textContent) {
      this.activeView = textContent;
    };
    viewBackToStart = function() {
      this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
      this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
    };
    setViewVidStartAndEnd = function() {
      this.viewVidFlag = true;
      if (this.lastActiveView.view !== "view-a" && this.activeView === "view-a") {
        this.viewBackToStart();
        return;
      }
      if (this.lastActiveView.view !== "view-a" && this.activeView !== "view-a") {
        this.viewChainFlag = true;
        this.viewBackToStart();
        this.allViewOptBtns.forEach((el) => {
          if (el.textContent === this.activeView) {
            el.classList.add("active");
          }
          this.setActiveViewBtnIndex(el);
        });
        return;
      }
      this.startTime = this.allViewOptBtns[this.activeViewBtnIndex].dataset.startTime;
      this.endTime = this.allViewOptBtns[this.activeViewBtnIndex].dataset.endTime;
    };
    setDataVidStartAndEnd = function(clicked) {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = clicked.dataset.startTime;
      this.endTime = clicked.dataset.endTime;
    };
    setDataVidPoster = function(newValue) {
      if (!newValue) newValue = this.activeView;
      const activeVid2 = this.global.getActiveVid();
      if (!activeVid2 || activeVid2.closest(".section").classList[1] !== "data")
        return;
      if (activeVid2.parentElement.classList.contains("mp")) {
        if (newValue === "view-a") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_1_MP);
        }
        if (newValue === "view-b") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_2_MP);
        }
        if (newValue === "view-c") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_3_MP);
        }
      } else {
        if (newValue === "view-a") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_1);
        }
        if (newValue === "view-b") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_2);
        }
        if (newValue === "view-c") {
          activeVid2.setAttribute("poster", IMAGES.DATA_VIEW_3);
        }
      }
    };
    setDataVidBackgroundImg = function() {
      const activeVid2 = this.global.getActiveVid();
      const activeVidWrap = activeVid2.closest(".vid-wrapper");
      if (activeVid2.parentElement.classList.contains("mp")) {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_1_MP}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_2_MP}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_3_MP}")`;
        }
      } else {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_1}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_2}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${IMAGES.DATA_VIEW_3}")`;
        }
      }
    };
    deactivateAllDataWrappers = function() {
      this.allDataWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = function(clickedViewOptsBtn) {
      clickedViewOptsBtn.classList.add("active");
      this.setActiveViewBtnIndex();
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers[this.activeViewBtnIndex];
      this.setActiveCtrlBtnWrapper();
      this.global.setActiveVid();
      this.setDataVidBackgroundImg();
      this.setActiveView(clickedViewOptsBtn.textContent);
      this.setViewVidStartAndEnd();
      this.playDataVid();
    };
    setAndPlayCtrlBtnVid = function(clickedCtrlBtn) {
      this.global.setActiveVid();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.hideActiveCtrlBtnWrapper();
      this.ctrlBtnIndex = this.global.getLocalIndex(
        clickedCtrlBtn,
        "ctrl-btn",
        "section-wrap-btns"
      );
      this.setDataVidStartAndEnd(clickedCtrlBtn);
      this.playDataVid();
    };
    playDataVid = function() {
      this.introText.classList.remove("active");
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.global.setStartTime(this.startTime);
      this.global.setEndTime(this.endTime);
      this.global.playRange();
    };
    vidEnd = function() {
      if (this.viewVidFlag && !this.viewChainFlag) {
        this.setLastActiveView();
        this.setDataVidBackgroundImg();
        this.setDataVidPoster();
        this.showActiveCtrlBtnWrapper();
        this.introText.classList.add("active");
        this.global.enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView("view-a");
        this.setDataVidBackgroundImg();
        this.setViewVidStartAndEnd();
        this.playDataVid();
      } else {
        this.dimmer.classList.add("active");
        this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
        this.showData(this.ctrlBtnIndex);
        this.showBackBtn();
        this.global.getActiveVid().closest(".vid-wrapper").style.backgroundImage = "none";
        this.global.getActiveVid().closest(".vid-wrapper").style.backgroundColor = "black";
      }
    };
    backToViewFromComp = function() {
      this.global.flashBlackout();
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
      this.txtOrImg = "image";
      this.activeDataWrapper.querySelector(".txt-img-btn").classList.remove("active");
      this.hideAllData();
      this.resetAllDataSheets();
      this.dimmer.classList.remove("active");
      this.introText.classList.add("active");
      this.hideBackBtn();
      this.showCtrlBtnWrapper();
      this.setDataVidBackgroundImg();
      this.global.clearSectionVidSrc();
    };
    hideActiveCtrlBtnWrapper = function() {
      this.activeCtrlBtnWrapper.classList.remove("active");
    };
    showActiveCtrlBtnWrapper = function() {
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    showCtrlBtnWrapper = function() {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.add("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    setActiveCtrlBtnWrapper = function() {
      this.global.deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[this.activeViewBtnIndex];
    };
    deactivateAllCtrlBtnWrappers = function() {
      this.allCtrlBtnWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
    };
  };
  var data_default = Data;

  // src/3-sequence.js
  var Sequence = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.allIntroText = [
        ...this.container.querySelectorAll(".intro-text-wrap")
      ];
      this.allActionHeadings = [
        ...this.container.querySelectorAll(".action-heading")
      ];
      this.pauseWrapper = this.container.querySelector(".pause-wrapper");
      this.allVidWrappers = this.container.querySelectorAll(".vid-wrapper");
      this.sequenceTimer = null;
      this.sequenceEndIsCancelled = false;
      this.sequenceIndex = 0;
      this.dropdownClicked = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection.bind(this)],
        ["open-sequence-index", this.activateSectionIndex.bind(this)],
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clicked) {
      if (!this.dropdownClicked) {
        this.global.activateCurrentNavLink(clicked);
        this.sequenceIndex = 0;
      } else {
        this.global.activateCurrentNavLink(
          clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
        );
        window.dispatchEvent(
          new CustomEvent("dropdownOptClicked", { detail: clicked })
        );
        this.dropdownClicked = false;
      }
      this.global.flashBlackout();
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.allIntroText[this.sequenceIndex].classList.add("active");
      this.setActiveSequenceVidWrap(this.sequenceIndex);
    };
    activateSectionIndex = function(clicked) {
      this.dropdownClicked = true;
      this.sequenceIndex = this.global.getLocalIndex(
        clicked,
        "nav_menu_link-dropdown",
        "nav_menu_dropdown"
      );
      this.initSection(clicked);
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    setSequenceIndex = function(value) {
      if (!value) this.sequenceIndex = 0;
      this.sequenceIndex = value;
    };
    hideAllIntroText = function() {
      this.allIntroText.forEach((el) => {
        el.classList.remove("active");
      });
    };
    hideAllActionHeadings = function() {
      this.allActionHeadings.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setActiveSequenceVidWrap = function() {
      this.allVidWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
      this.allVidWrappers[this.sequenceIndex].classList.add("active");
    };
    playCtrlBtnVid = function(clickedCtrlBtn) {
      this.clearSequenceTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.allIntroText[this.sequenceIndex].classList.remove("active");
      this.allActionHeadings[this.sequenceIndex].classList.add("active");
      this.sequenceEndIsCancelled = false;
      this.global.setActiveVid();
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.remove("off");
      this.global.playRange();
    };
    pauseCtrlVid = function() {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = function() {
      if (this.sequenceEndIsCancelled === false) {
        this.pauseWrapper.classList.remove("active");
        this.global.disablePause(this.pauseWrapper);
      }
    };
    clearSequenceTimers = function() {
      this.sequenceEndIsCancelled = true;
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    };
  };
  var sequence_default = Sequence;

  // src/main.js
  console.log("BRANCH: newModules-5");
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var navContainer = document.querySelector(".nav_component");
  var featuresContainer = document.querySelector(".section.features");
  var dataContainer = document.querySelector(".section.data");
  var sequenceContainer = document.querySelector(".section.sequence");
  var navbar = new navbar_default(navContainer);
  var features = new features_default(global_exports, featuresContainer);
  var data = new data_default(global_exports, dataContainer);
  var sequence = new sequence_default(global_exports, sequenceContainer);
  var SECTIONS = {
    navbar,
    features,
    data,
    sequence
  };
  navContainer.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection2 = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection2];
    const action = clicked.dataset.clickAction;
    blackout.classList.remove("off");
    setActiveSection(activeSection2);
    targetModule.handleEvent(clicked, action);
  });
  navContainer.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const action = hovered.dataset.mouseoverAction;
    navbar.handleEvent(hovered, action);
  });
  navContainer.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const action = hovered.dataset.mouseoutAction;
    navbar.handleEvent(hovered, action);
  });
  window.addEventListener("featuresVidEnded", function(e) {
    navbar.disableNavLinksAndNavBtn();
  });
  window.addEventListener("dropdownOptClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.closeNavDropdown(clicked);
    navbar.closeMobileNavMenu();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection2 = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(clicked, action);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection2 = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(hovered, action);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection2 = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = hovered.dataset.mouseoutAction;
    targetModule.handleEvent(hovered, action);
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function(e) {
      const endedVid = e.target.closest(".vid");
      if (!endedVid) return;
      const vidSection = endedVid.closest(".section").dataset.section;
      const targetModule = SECTIONS[vidSection];
      targetModule.vidEnd();
    });
  });
  var init = function() {
    setupLazyLoading();
    blackout.classList.remove("off");
    navContainer.classList.remove("active");
    navbar.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.add("off");
    features.playFeaturesIntro();
    setTimeout(() => {
      navContainer.classList.add("active");
      features.initSection(null, null, true);
    }, TIMING.START_UI_REVEAL);
  };
  var setupLazyLoading = function() {
    const allLazyVids = document.querySelectorAll(".vid");
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1
    };
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        const sources = video.querySelectorAll("source");
        if (entry.isIntersecting) {
          sources.forEach((source) => {
            const dataSrc = source.getAttribute("data-src") || source.src;
            if (dataSrc) {
              source.src = dataSrc;
              source.setAttribute("data-src", dataSrc);
            }
          });
          video.load();
        } else {
          performance.clearMeasures();
          performance.clearResourceTimings();
          performance.clearMarks();
          ResetSection(video.closest(".section"));
          video.pause();
          sources.forEach((source) => {
            const currentSrc = source.src;
            if (currentSrc) {
              source.setAttribute("data-src", currentSrc);
              source.src = "";
              source.removeAttribute("src");
            }
          });
          video.load();
        }
      });
    }, observerOptions);
    allLazyVids.forEach((vid) => videoObserver.observe(vid));
    const ResetSection = function(section) {
      if (!section) return;
      section.querySelectorAll(".vid").forEach(function(el) {
        el.currentTime = 0;
        el.pause();
      });
      deactivateCurrentBtns(section);
    };
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFNUQVJUX1VJX1JFVkVBTDogMTUwMCxcclxuICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gIEJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMOiA1MCxcclxuICBWSURfRU5EX1RJTUVSOiAxNTAwLFxyXG59KTtcclxuZXhwb3J0IGNvbnN0IElNQUdFUyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIERBVEFfVklFV18xOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODcwN2M3Yjc0YTUyNGY5ZjRfRGF0YS1WaWV3LTEud2VicFwiLFxyXG4gIERBVEFfVklFV18xX01QOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODBiZmZkMDU1MjY4MDA2ZDVfRGF0YS1WaWV3LTEtTVAud2VicFwiLFxyXG4gIERBVEFfVklFV18yOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODg1MTQxOTJkZDExOGY5MmVfRGF0YS1WaWV3LTIud2VicFwiLFxyXG4gIERBVEFfVklFV18yX01QOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiLFxyXG4gIERBVEFfVklFV18zOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODY2M2Q0ODAwY2M1Zjk5MzVfRGF0YS1WaWV3LTMud2VicFwiLFxyXG4gIERBVEFfVklFV18zX01QOlxyXG4gICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODVjNzA5ODkwZjFmMDI2NzlfRGF0YS1WaWV3LTMtTVAud2VicFwiLFxyXG59KTtcclxuZXhwb3J0IGNvbnN0IFZJRVdfU1RBUlRfRU5EID0gT2JqZWN0LmZyZWV6ZSh7XHJcbiAgXCJ2aWV3LWFcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgZW5kVGltZTogMCxcclxuICB9LFxyXG4gIFwidmlldy1iXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMS40OCxcclxuICAgIGVuZFRpbWU6IDIuNjksXHJcbiAgfSxcclxuICBcInZpZXctY1wiOiB7XHJcbiAgICBzdGFydFRpbWU6IDQuNDQsXHJcbiAgICBlbmRUaW1lOiA1LjY1LFxyXG4gIH0sXHJcbn0pO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmV4cG9ydCBjb25zdCBtYWluV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi13cmFwcGVyXCIpO1xyXG5leHBvcnQgY29uc3QgYmxhY2tvdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsU2VjdGlvbnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uXCIpXTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZENvZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuZXhwb3J0IGNvbnN0IG5hdk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpO1xyXG5leHBvcnQgY29uc3QgYWxsTmF2TWVudUxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpO1xyXG5leHBvcnQgY29uc3QgbmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG5sZXQgYWN0aXZlU2VjdGlvbiA9IG51bGw7XHJcbmxldCBhY3RpdmVTZWN0aW9uTmFtZSA9IG51bGw7XHJcbmxldCBhY3RpdmVWaWQgPSBudWxsO1xyXG5sZXQgc3RhcnRUaW1lID0gMDtcclxubGV0IGVuZFRpbWUgPSAwO1xyXG5sZXQgcGF1c2VGbGFnID0gZmFsc2U7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9HTE9CQUwgRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5cclxuZXhwb3J0IGNvbnN0IGdldFZpZFR5cGUgPSBmdW5jdGlvbiAodmlkZW8pIHtcclxuICByZXR1cm4gdmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXTtcclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBmbGFzaEJsYWNrb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gIH0sIFRJTUlORy5CTEFDS09VVF9USU1FUik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVOYXZMaW5rc0FuZE5hdkJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBuYXZNZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxuICBuYXZCdG4uc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50TmF2TGluayA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcygpO1xyXG4gIGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbE5hdk1lbnVMaW5rcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVmlkKCkge1xyXG4gIHJldHVybiBhY3RpdmVWaWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVZpZCgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBhY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhcnRUaW1lKG5ld1ZhbHVlKSB7XHJcbiAgc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZFRpbWUobmV3VmFsdWUpIHtcclxuICBlbmRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGxheVJhbmdlID0gZnVuY3Rpb24gKHZpZGVvQ3VycmVudFRpbWUpIHtcclxuICBjb25zdCB2aWRDb2RlID0gYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IHN0YXJ0VGltZTtcclxuXHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpIHtcclxuICAgIGFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBhY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKTtcclxuICB9XHJcblxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcHBlciBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG5cclxuICAvLyBDbGVhciBhbnkgZXhpc3RpbmcgdGltZXVwZGF0ZSBtb25pdG9yc1xyXG4gIGFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBhY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKTtcclxuXHJcbiAgY29uc3QgbW9uaXRvclRpbWUgPSAoKSA9PiB7XHJcbiAgICBpZiAoYWN0aXZlVmlkLmN1cnJlbnRUaW1lID49IGVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIGFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIGFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gICAgICBhY3RpdmVWaWQuY3VycmVudFRpbWUgPSBlbmRUaW1lO1xyXG4gICAgICBhY3RpdmVWaWQuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoXCJlbmRlZFwiKSk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBhY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcblxyXG4gIC8vIFNvdXJjZSBoYW5kbGluZ1xyXG4gIGNvbnN0IHNvdXJjZSA9IGFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIGFjdGl2ZVZpZC5zcmMgIT09IGRhdGFTcmMpIHtcclxuICAgIGFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gICAgYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBhY3RpdmVWaWQubG9hZCgpO1xyXG4gIH1cclxuXHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYWN0aXZlVmlkLmN1cnJlbnRUaW1lID0gdGFyZ2V0U3RhcnQ7XHJcblxyXG4gICAgICAvLyAyLiBUSEUgRkFJTC1TQUZFIFJFVkVBTFxyXG4gICAgICAvLyBXZSBwb2xsIGZvciBwaHlzaWNhbCBwbGF5aGVhZCBtb3ZlbWVudC4gT25jZSBpdCBtb3ZlcyxcclxuICAgICAgLy8gdGhlIFwiYmxhY2sgYnVmZmVyXCIgaXMgZ3VhcmFudGVlZCB0byBiZSBnb25lLlxyXG4gICAgICBjb25zdCBwb2xsRm9yRnJhbWUgPSAoKSA9PiB7XHJcbiAgICAgICAgaWYgKGFjdGl2ZVZpZC5jdXJyZW50VGltZSA+IHRhcmdldFN0YXJ0KSB7XHJcbiAgICAgICAgICAvLyBEb3VibGUgUkFGIGlzIHRoZSBmaW5hbCBndWFyZCBmb3IgdGhlIEdQVSBwYWludCBjeWNsZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKCgpID0+IHtcclxuICAgICAgICAgICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBibGFja291dCAhPT0gXCJ1bmRlZmluZWRcIilcclxuICAgICAgICAgICAgICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICghYWN0aXZlVmlkLnBhdXNlZCkge1xyXG4gICAgICAgICAgLy8gSWYgc3RpbGwgYXQgdGFyZ2V0U3RhcnQgYnV0IHBsYXlpbmcsIGNoZWNrIGFnYWluIG5leHQgZnJhbWVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwb2xsRm9yRnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuXHJcbiAgICAgIC8vIDMuIFNUQVJUXHJcbiAgICAgIGFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIGF3YWl0IGFjdGl2ZVZpZC5wbGF5KCk7XHJcbiAgICAgIHBvbGxGb3JGcmFtZSgpOyAvLyBTdGFydCBjaGVja2luZyBmb3IgdGhlIGZpcnN0IHJlYWwgZnJhbWVcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS53YXJuKFwiUGxheWJhY2sgZmFpbGVkOlwiLCBlKTtcclxuICAgICAgLy8gRmFsbGJhY2s6IHNob3cgdmlkZW8gYW55d2F5IGlmIHBsYXkoKSBmYWlscyAoZS5nLiBhdXRwbGF5IGJsb2NrZWQpXHJcbiAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgIH1cclxuICB9O1xyXG5cclxuICAvLyBXYWl0IGZvciBkYXRhIChyZWFkeVN0YXRlIDMgaXMgSEFWRV9GVVRVUkVfREFUQSlcclxuICBpZiAoYWN0aXZlVmlkLnJlYWR5U3RhdGUgPj0gMykge1xyXG4gICAgc3RhcnRQbGF5YmFja1NlcXVlbmNlKCk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwiY2FucGxheVwiLCBzdGFydFBsYXliYWNrU2VxdWVuY2UsIHtcclxuICAgICAgb25jZTogdHJ1ZSxcclxuICAgIH0pO1xyXG4gIH1cclxufTtcclxuXHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgcGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKHBhdXNlRmxhZykge1xyXG4gICAgcGF1c2VGbGFnID0gZmFsc2U7XHJcbiAgICBhY3RpdmVWaWQucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBwYXVzZUZsYWcgPSB0cnVlO1xyXG4gICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uIChidG5XcmFwcGVySW5kZXgpIHtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgICAgaWYgKGluZGV4ID09PSBidG5XcmFwcGVySW5kZXgpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50QnRuID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gIGJ0bi5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50QnRucyA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcbiAgaWYgKCFzZWN0aW9uKSBzZWN0aW9uID0gYWN0aXZlU2VjdGlvbjtcclxuICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChidG4sIGJ0bkNsYXNzLCBhbGxCdG5zV3JhcHBlcikge1xyXG4gIGxldCBsb2NhbEluZGV4O1xyXG4gIGNvbnN0IGFsbEJ0bnMgPSBidG5cclxuICAgIC5jbG9zZXN0KGAuJHthbGxCdG5zV3JhcHBlcn1gKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2J0bkNsYXNzfWApO1xyXG4gIGFsbEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICBpZiAoZWwgPT09IGJ0bikgbG9jYWxJbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBsb2NhbEluZGV4O1xyXG59O1xyXG4iLCAiY2xhc3MgTmF2YmFyIHtcclxuICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5uYXZNZW51ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuICAgIHRoaXMubmF2QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24gPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9kcm9wZG93blwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS1uYXYtZHJvcGRvd25cIiwgdGhpcy5jbG9zZU5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJ0b2dnbGUtbmF2LWRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlTmF2RHJvcGRvd24uYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5uYXZCdG4pLmRpc3BsYXkgIT09IFwibm9uZVwiKVxyXG4gICAgICB0aGlzLm5hdkJ0bi5jbGljaygpO1xyXG4gIH07XHJcbiAgZGlzYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5uYXZNZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5hdk1lbnUpLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgfTtcclxuICBvcGVuTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dC13cmFwcGVyXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIuaW50cm9cIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5mZWF0dXJlc1wiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYnRuSW5kZXggPSAwO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLWZlYXR1cmVzXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWQuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IGZ1bmN0aW9uIChjbGlja2VkLCBpbmRleCwgaW50cm9GbGFnKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICBpZiAoY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmIChpbnRyb0ZsYWcpIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0W3RoaXMuYnRuSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc0ludHJvVmlkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNWaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNWaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBwbGF5RmVhdHVyZXNJbnRybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNWaWREaXYoKTtcclxuICAgIC8vIExvZ2ljOiBGaW5kIHRoZSBvbmUgdGhhdCBpc24ndCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpXHJcbiAgICBjb25zdCBhbGxJbnRyb3MgPVxyXG4gICAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZS1pbnRyb1wiKTtcclxuICAgIGFsbEludHJvcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAvLyBvZmZzZXRQYXJlbnQgaXMgbnVsbCBpZiB0aGUgZWxlbWVudCBpcyBkaXNwbGF5OiBub25lXHJcbiAgICAgIGlmIChlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCB2aWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZC1pbnRyb1wiKTtcclxuICAgICAgICBpZiAodmlkKSB7XHJcbiAgICAgICAgICB2aWQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgdmlkLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlc1RpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICB0aGlzLmJ0bkluZGV4ID0gdGhpcy5nbG9iYWwuZ2V0TG9jYWxJbmRleChcclxuICAgICAgY2xpY2tlZEN0cmxCdG4sXHJcbiAgICAgIFwiY3RybC1idG5cIixcclxuICAgICAgXCJzZWN0aW9uLXdyYXAtYnRuc1wiLFxyXG4gICAgKTtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZVRleHQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLnJlc2V0QWxsU2VjdGlvblZpZHMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgICAgICAgfSwgVElNSU5HLkJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMKTtcclxuICAgICAgfSwgVElNSU5HLlZJRF9FTkRfVElNRVIpO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJmZWF0dXJlc1ZpZEVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50QnRucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgY2xlYXJGZWF0dXJlc1RpbWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZWF0dXJlc1RpbWVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlcztcclxuIiwgImltcG9ydCB7IElNQUdFUywgVklFV19TVEFSVF9FTkQgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuaW50cm9UZXh0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtdHh0XCIpO1xyXG5cclxuICAgIHRoaXMudmlld1ZpZERpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIudmlld1wiKTtcclxuICAgIHRoaXMuYWxsVmlld1ZpZERpdnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLXZpZXdcIik7XHJcbiAgICB0aGlzLmNvbXBWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmNvbXBcIik7XHJcbiAgICB0aGlzLmFsbERhdGFWaWREaXZzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lO1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZztcclxuXHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRzLW1lbnVfYnRuXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtZHJvcGRvd25cIik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdHMtbWVudV9saW5rXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IFwidmlldy1hXCI7XHJcbiAgICB0aGlzLmxhc3RBY3RpdmVWaWV3ID0geyB2aWV3OiBcInZpZXctYVwiLCBzdGFydFRpbWU6IDAsIGVuZFRpbWU6IDAgfTtcclxuICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kaW1tZXJcIik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmN0cmxCdG5XcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuY3RybEJ0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5zZXRBbmRQbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS12aWV3LXZpZFwiLCB0aGlzLnNldEFuZFBsYXlWaWV3VmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXAuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcIm9wZW4tdmlldy1vcHRzLW1lbnVcIiwgdGhpcy5zaG93Vmlld09wdHNNZW51LmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS12aWV3LW9wdHMtbWVudVwiLCB0aGlzLmhpZGVWaWV3T3B0c01lbnUuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3QnRuSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXggPSBpbmRleDtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKSxcclxuICAgIClbdGhpcy5jdHJsQnRuSW5kZXhdO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSBmdW5jdGlvbiAodGV4dENvbnRlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHRleHRDb250ZW50O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgIT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgdGhpcy5hbGxWaWV3T3B0QnRucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGlmIChlbC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleChlbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9XHJcbiAgICAgIHRoaXMuYWxsVmlld09wdEJ0bnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hbGxWaWV3T3B0QnRuc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF0uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gY2xpY2tlZC5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IGNsaWNrZWQuZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkgbmV3VmFsdWUgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkIHx8IGFjdGl2ZVZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdICE9PSBcImRhdGFcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18xX01QKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIElNQUdFUy5EQVRBX1ZJRVdfMl9NUCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBJTUFHRVMuREFUQV9WSUVXXzNfTVApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIElNQUdFUy5EQVRBX1ZJRVdfMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBJTUFHRVMuREFUQV9WSUVXXzIpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkge1xyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzFfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzJfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzNfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7SU1BR0VTLkRBVEFfVklFV18xfVwiKWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWJcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7SU1BR0VTLkRBVEFfVklFV18yfVwiKWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7SU1BR0VTLkRBVEFfVklFV18zfVwiKWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IGZ1bmN0aW9uIChjbGlja2VkVmlld09wdHNCdG4pIHtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIGNsaWNrZWRWaWV3T3B0c0J0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpOyAvL2ZvciBEYXRhLnNldEFjdGl2ZVZpZXdCdG5JbmRleFxyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3QnRuSW5kZXgoKTtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzW3RoaXMuYWN0aXZlVmlld0J0bkluZGV4XTtcclxuICAgIHRoaXMuc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3KGNsaWNrZWRWaWV3T3B0c0J0bi50ZXh0Q29udGVudCk7IC8vZm9yIHRoZSBwb3N0ZXJcclxuXHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG5cclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmN0cmxCdG5JbmRleCA9IHRoaXMuZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbiAgICAgIGNsaWNrZWRDdHJsQnRuLFxyXG4gICAgICBcImN0cmwtYnRuXCIsXHJcbiAgICAgIFwic2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICk7XHJcblxyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZChjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7IC8vcmVtb3ZlcyBibGFja291dCBpbiBnbG9iYWwucGxheVJhbmdlXHJcbiAgfTtcclxuICBwbGF5RGF0YVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUodGhpcy5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZSh0aGlzLmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3VmlkRmxhZyAmJiAhdGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRQb3N0ZXIoKTsgLy9kb25lIGhlcmUgc28gcG9zdGVyIGRvZXNuJ3QgYXBwZWFyIGVhcmxpZXJcclxuICAgICAgdGhpcy5zaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KFwidmlldy1hXCIpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnNob3dEYXRhKHRoaXMuY3RybEJ0bkluZGV4KTtcclxuICAgICAgdGhpcy5zaG93QmFja0J0bigpO1xyXG5cclxuICAgICAgLy9zZXQgYmNrZ3JuZCBpbWcgdG8gYmxhY2sgdG8gcHJldmVudCBmbGFzaCBvZiBpbWFnZSB3aGVuIGNoYW5naW5nIG5hdlxyXG4gICAgICB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwcGVyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICAgXCJub25lXCI7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgICBcImJsYWNrXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICBiYWNrVG9WaWV3RnJvbUNvbXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgfTtcclxuICBoaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID1cclxuICAgICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7XHJcbiIsICJjbGFzcyBTZXF1ZW5jZSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuYWxsSW50cm9UZXh0ID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmludHJvLXRleHQtd3JhcFwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGlvbi1oZWFkaW5nXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlLWluZGV4XCIsIHRoaXMuYWN0aXZhdGVTZWN0aW9uSW5kZXguYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWQuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICBpZiAoIXRoaXMuZHJvcGRvd25DbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICAgIGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIikucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9saW5rXCIpLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25DbGlja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuaGlkZUFsbEFjdGlvbkhlYWRpbmdzKCk7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlVmlkV3JhcCh0aGlzLnNlcXVlbmNlSW5kZXgpO1xyXG4gIH07XHJcbiAgYWN0aXZhdGVTZWN0aW9uSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gdGhpcy5nbG9iYWwuZ2V0TG9jYWxJbmRleChcclxuICAgICAgY2xpY2tlZCxcclxuICAgICAgXCJuYXZfbWVudV9saW5rLWRyb3Bkb3duXCIsXHJcbiAgICAgIFwibmF2X21lbnVfZHJvcGRvd25cIixcclxuICAgICk7XHJcbiAgICB0aGlzLmluaXRTZWN0aW9uKGNsaWNrZWQpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0U2VxdWVuY2VJbmRleCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgdGhpcy5zZXF1ZW5jZUluZGV4ID0gMDtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IHZhbHVlO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxBY3Rpb25IZWFkaW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VWaWRXcmFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gZnVuY3Rpb24gKGNsaWNrZWRDdHJsQnRuKSB7XHJcbiAgICB0aGlzLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyU2VxdWVuY2VUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VxdWVuY2VUaW1lcik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU2VxdWVuY2U7XHJcbiIsICJjb25zb2xlLmxvZyhcIkJSQU5DSDogbmV3TW9kdWxlcy01XCIpO1xyXG5cclxuaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmFsIGZyb20gXCIuLzAtZ2xvYmFsXCI7XHJcbmltcG9ydCBOYXZiYXJDbGFzcyBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfY29tcG9uZW50XCIpO1xyXG5jb25zdCBmZWF0dXJlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5mZWF0dXJlc1wiKTtcclxuY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5kYXRhXCIpO1xyXG5jb25zdCBzZXF1ZW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5zZXF1ZW5jZVwiKTtcclxuY29uc3QgbmF2YmFyID0gbmV3IE5hdmJhckNsYXNzKG5hdkNvbnRhaW5lcik7XHJcbmNvbnN0IGZlYXR1cmVzID0gbmV3IEZlYXR1cmVzQ2xhc3MoZ2xvYmFsLCBmZWF0dXJlc0NvbnRhaW5lcik7XHJcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YUNsYXNzKGdsb2JhbCwgZGF0YUNvbnRhaW5lcik7XHJcbmNvbnN0IHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBzZXF1ZW5jZUNvbnRhaW5lcik7XHJcbmNvbnN0IFNFQ1RJT05TID0ge1xyXG4gIG5hdmJhcjogbmF2YmFyLFxyXG4gIGZlYXR1cmVzOiBmZWF0dXJlcyxcclxuICBkYXRhOiBkYXRhLFxyXG4gIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTkFWLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5uYXZTZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICAvLzEuIEdlbmVyaWMgY2xlYW51cFxyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oYWN0aXZlU2VjdGlvbik7XHJcbiAgLy8zLiBQb2x5bW9ycGhpYyBjYWxsXHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IGZlYXR1cmVzIHZpZCBlbmRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmZWF0dXJlc1ZpZEVuZGVkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgbmF2YmFyLmRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IHNlcXVlbmNlIGRyb3Bkb3duIG9wdCBjbGlja2VkXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcGRvd25PcHRDbGlja2VkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUuZGV0YWlsO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIG5hdmJhci5jbG9zZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG4gIG5hdmJhci5jbG9zZU1vYmlsZU5hdk1lbnUoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU1BSU4gQk9EWS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3Zlci1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIGlmICh0aGlzLmN1cnJlbnRIb3ZlciA9PT0gaG92ZXJlZCkgcmV0dXJuOyAvLyBFeGl0IGlmIHdlIGFyZSBhbHJlYWR5IGhvdmVyaW5nIGl0XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBob3ZlcmVkO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1WSURTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy92aWQgZW5kZWRcclxuZ2xvYmFsLmFsbFZpZHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IGVuZGVkVmlkID0gZS50YXJnZXQuY2xvc2VzdChcIi52aWRcIik7XHJcbiAgICBpZiAoIWVuZGVkVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCB2aWRTZWN0aW9uID0gZW5kZWRWaWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICAgIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW3ZpZFNlY3Rpb25dO1xyXG4gICAgdGFyZ2V0TW9kdWxlLnZpZEVuZCgpO1xyXG4gIH0pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdFxyXG5jb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHNldHVwTGF6eUxvYWRpbmcoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBuYXZDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBuYXZiYXIuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKFwiZmVhdHVyZXNcIik7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gIGZlYXR1cmVzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgZmVhdHVyZXMuaW5pdFNlY3Rpb24obnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgfSwgVElNSU5HLlNUQVJUX1VJX1JFVkVBTCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxufTtcclxuY29uc3Qgc2V0dXBMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbGxMYXp5VmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG4gIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgIHJvb3Q6IG51bGwsXHJcbiAgICByb290TWFyZ2luOiBcIjBweFwiLFxyXG4gICAgdGhyZXNob2xkOiAwLjEsXHJcbiAgfTtcclxuICBjb25zdCB2aWRlb09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gdmlkZW8ucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKTtcclxuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgLy8gLS0tIExPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIFVzZSBkYXRhLXNyYyBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBrZWVwIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBkYXRhU3JjID0gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoZGF0YVNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gZGF0YVNyYztcclxuICAgICAgICAgICAgLy8gS2VlcCBkYXRhLXNyYyBhdHRyaWJ1dGUgc28gd2UgY2FuIGZpbmQgdGhlIFVSTCBhZ2FpbiBsYXRlclxyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgZGF0YVNyYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIC0tLSBVTkxPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBpbnRlcm5hbCBsb2dzIGZvciB1c2VyIGludGVyYWN0aW9ucyBhbmQgcmVzb3VyY2UgbG9hZHNcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKCk7XHJcbiAgICAgICAgUmVzZXRTZWN0aW9uKHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gTW92ZSBzcmMgYmFjayB0byBkYXRhLXNyYyBhbmQgZW1wdHkgdGhlIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3JjID0gc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBjdXJyZW50U3JjKTtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IFwiXCI7IC8vIFRoaXMgc3RvcHMgdGhlIHZpZGVvIGZyb20gYnVmZmVyaW5nXHJcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7IC8vIEZ1bGx5IGNsZWFyIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSBicm93c2VyIHRvIGR1bXAgdGhlIHZpZGVvIGRhdGEgZnJvbSBtZW1vcnlcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIG9ic2VydmVyT3B0aW9ucyk7XHJcbiAgYWxsTGF6eVZpZHMuZm9yRWFjaCgodmlkKSA9PiB2aWRlb09ic2VydmVyLm9ic2VydmUodmlkKSk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vUkVTRVQgVklEUyBBRlRFUiBVTkxPQURJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBjb25zdCBSZXNldFNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gICAgaWYgKCFzZWN0aW9uKSByZXR1cm47IC8vaGVscHMgcHJldmVudCBjcmFzaGVzXHJcbiAgICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgZWwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucyhzZWN0aW9uKTtcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFPLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxJQUNsQyxpQkFBaUI7QUFBQSxJQUNqQixnQkFBZ0I7QUFBQSxJQUNoQix5QkFBeUI7QUFBQSxJQUN6QixlQUFlO0FBQUEsRUFDakIsQ0FBQztBQUNNLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxJQUNsQyxhQUNFO0FBQUEsSUFDRixnQkFDRTtBQUFBLElBQ0YsYUFDRTtBQUFBLElBQ0YsZ0JBQ0U7QUFBQSxJQUNGLGFBQ0U7QUFBQSxJQUNGLGdCQUNFO0FBQUEsRUFDSixDQUFDO0FB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LHVCQUFhLE1BQU0sUUFBUSxVQUFVLENBQUM7QUFDdEMsZ0JBQU0sTUFBTTtBQUNaLGtCQUFRLFFBQVEsQ0FBQyxXQUFXO0FBRTFCLGtCQUFNLGFBQWEsT0FBTztBQUMxQixnQkFBSSxZQUFZO0FBQ2QscUJBQU8sYUFBYSxZQUFZLFVBQVU7QUFDMUMscUJBQU8sTUFBTTtBQUNiLHFCQUFPLGdCQUFnQixLQUFLO0FBQUEsWUFDOUI7QUFBQSxVQUNGLENBQUM7QUFFRCxnQkFBTSxLQUFLO0FBQUEsUUFDYjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsR0FBRyxlQUFlO0FBQ2xCLGdCQUFZLFFBQVEsQ0FBQyxRQUFRLGNBQWMsUUFBUSxHQUFHLENBQUM7QUFHdkQsVUFBTSxlQUFlLFNBQVUsU0FBUztBQUN0QyxVQUFJLENBQUMsUUFBUztBQUNkLGNBQVEsaUJBQWlCLE1BQU0sRUFBRSxRQUFRLFNBQVUsSUFBSTtBQUNyRCxXQUFHLGNBQWM7QUFDakIsV0FBRyxNQUFNO0FBQUEsTUFDWCxDQUFDO0FBQ0QsTUFBTyxzQkFBc0IsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjsiLAogICJuYW1lcyI6IFsiYWN0aXZlVmlkIiwgImFjdGl2ZVNlY3Rpb24iXQp9Cg==
