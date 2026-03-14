(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var START_UI_REVEAL = 1500;
  var BLACKOUT_TIMER = 200;
  var BLACKOUT_WAIT_TO_REVEAL = 50;
  var VID_END_TIMER = 1500;
  var DATA_VIEW_1 = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678707c7b74a524f9f4_Data-View-1.webp";
  var DATA_VIEW_1_MP = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066780bffd055268006d5_Data-View-1-MP.webp";
  var DATA_VIEW_2 = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066788514192dd118f92e_Data-View-2.webp";
  var DATA_VIEW_2_MP = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678f95e3f4b347c21a6_Data-View-2-MP.webp";
  var DATA_VIEW_3 = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678663d4800cc5f9935_Data-View-3.webp";
  var DATA_VIEW_3_MP = "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066785c709890f1f02679_Data-View-3-MP.webp";
  var VIEW_START_END = {
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
  };

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    activateCurrentBtn: () => activateCurrentBtn,
    activateCurrentNavLink: () => activateCurrentNavLink,
    allSections: () => allSections,
    allVidCodes: () => allVidCodes,
    allVids: () => allVids,
    blackout: () => blackout,
    clearSectionVidSrc: () => clearSectionVidSrc,
    closeMobileNavMenu: () => closeMobileNavMenu,
    closeNavDropdown: () => closeNavDropdown,
    deactivateAllCtrlBtnWrappers: () => deactivateAllCtrlBtnWrappers,
    deactivateAllSections: () => deactivateAllSections,
    deactivateCurrentBtns: () => deactivateCurrentBtns,
    deactivateCurrentNavLinks: () => deactivateCurrentNavLinks,
    disableNavLinksAndNavBtn: () => disableNavLinksAndNavBtn,
    disablePause: () => disablePause,
    disableSectionCtrlBtnEvents: () => disableSectionCtrlBtnEvents,
    enableNavLinksAndNavBtn: () => enableNavLinksAndNavBtn,
    enablePause: () => enablePause,
    enableSectionCtrlBtnEvents: () => enableSectionCtrlBtnEvents,
    flashBlackout: () => flashBlackout,
    getActiveSection: () => getActiveSection,
    getActiveSectionName: () => getActiveSectionName,
    getActiveVid: () => getActiveVid,
    getLocalIndex: () => getLocalIndex,
    getVidType: () => getVidType,
    mainWrapper: () => mainWrapper,
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
  var activeSection = null;
  var activeSectionName = null;
  var activeVid = null;
  var startTime = 0;
  var endTime = 0;
  var pauseFlag = false;
  var flashBlackout = function() {
    blackout.classList.remove("off");
    setTimeout(function() {
      blackout.classList.add("off");
    }, BLACKOUT_TIMER);
  };
  var enableNavLinksAndNavBtn = function() {
    document.querySelector(".nav_menu").style.pointerEvents = "auto";
    document.querySelector(".nav_button").style.pointerEvents = "auto";
  };
  var disableNavLinksAndNavBtn = function() {
    document.querySelector(".nav_menu").style.pointerEvents = "none";
    if (window.getComputedStyle(document.querySelector(".nav_menu")).display === "block") {
      document.querySelector(".nav_button").click();
    }
    document.querySelector(".nav_button").style.pointerEvents = "none";
  };
  var activateCurrentNavLink = function(clicked) {
    deactivateCurrentNavLinks();
    clicked.classList.add("current");
  };
  var deactivateCurrentNavLinks = function() {
    document.querySelectorAll(".nav_menu_link").forEach(function(el) {
      el.classList.remove("current");
    });
  };
  var closeNavDropdown = function(navDropdown) {
    navDropdown.classList.remove("active");
  };
  var closeMobileNavMenu = function() {
    const mobileNavBtn = document.querySelector(".nav_button");
    if (window.getComputedStyle(mobileNavBtn).display !== "none")
      mobileNavBtn.click();
  };
  var getActiveSection = function() {
    return activeSection;
  };
  var getActiveSectionName = function() {
    return activeSectionName;
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
  var getVidType = function(video) {
    return video.closest(".section").dataset.section;
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
      this.dropdownIndex = 0;
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
    getDropdownIndex = function(clicked) {
      const dropdownMenu = clicked.closest(".nav_menu_dropdown");
      const arrayOfDropdownOpts = [
        ...dropdownMenu.querySelectorAll(".nav_menu_link-dropdown")
      ];
      this.dropdownIndex = arrayOfDropdownOpts.indexOf(clicked);
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
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
          }, BLACKOUT_WAIT_TO_REVEAL);
        }, VID_END_TIMER);
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
          activeVid2.setAttribute("poster", DATA_VIEW_1_MP);
        }
        if (newValue === "view-b") {
          activeVid2.setAttribute("poster", DATA_VIEW_2_MP);
        }
        if (newValue === "view-c") {
          activeVid2.setAttribute("poster", DATA_VIEW_3_MP);
        }
      } else {
        if (newValue === "view-a") {
          activeVid2.setAttribute("poster", DATA_VIEW_1);
        }
        if (newValue === "view-b") {
          activeVid2.setAttribute("poster", DATA_VIEW_2);
        }
        if (newValue === "view-c") {
          activeVid2.setAttribute("poster", DATA_VIEW_3);
        }
      }
    };
    setDataVidBackgroundImg = function() {
      const activeVid2 = this.global.getActiveVid();
      const activeVidWrap = activeVid2.closest(".vid-wrapper");
      if (activeVid2.parentElement.classList.contains("mp")) {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_1_MP}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_2_MP}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_3_MP}")`;
        }
      } else {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_1}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_2}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${DATA_VIEW_3}")`;
        }
      }
    };
    deactivateAllDataWrappers = function() {
      this.allDataWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = function(clickedViewOptsBtn) {
      this.global.disableNavLinksAndNavBtn();
      clickedViewOptsBtn.classList.add("active");
      this.setActiveViewBtnIndex();
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers[this.activeViewBtnIndex];
      this.setActiveCtrlBtnWrapper();
      this.global.setActiveVid();
      this.global.getActiveSection().querySelectorAll(".vid-code").forEach(function(el) {
        el.classList.add("active");
      });
      this.setLastActiveView();
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
        this.global.closeNavDropdown(clicked.closest(".nav_menu_dropdown"));
        this.global.closeMobileNavMenu();
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
  console.log("BRANCH: newModules-3");
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
    clearAllTimers();
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
    el.addEventListener("ended", function() {
      const vidType = getVidType(el);
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
    }, START_UI_REVEAL);
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
  var clearAllTimers = function() {
    features.clearFeaturesTimers();
    sequence.clearSequenceTimers();
  };
})();
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFNUQVJUX1VJX1JFVkVBTCA9IDE1MDA7XHJcbmV4cG9ydCBjb25zdCBPS19CVE5fUkVWRUFMID0gMTUwMDtcclxuZXhwb3J0IGNvbnN0IEJMQUNLT1VUX1RJTUVSID0gMjAwO1xyXG5leHBvcnQgY29uc3QgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwgPSA1MDtcclxuZXhwb3J0IGNvbnN0IFZJRF9FTkRfVElNRVIgPSAxNTAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX1NUQVJUX1RJTUUgPSAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX0VORF9USU1FID0gNy43NjtcclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMSA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODcwN2M3Yjc0YTUyNGY5ZjRfRGF0YS1WaWV3LTEud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzFfTVAgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18yID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4ODUxNDE5MmRkMTE4ZjkyZV9EYXRhLVZpZXctMi53ZWJwXCI7XHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMl9NUCA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzMgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg2NjNkNDgwMGNjNWY5OTM1X0RhdGEtVmlldy0zLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18zX01QID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSB7XHJcbiAgXCJ2aWV3LWFcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgZW5kVGltZTogMCxcclxuICB9LFxyXG4gIFwidmlldy1iXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMS40OCxcclxuICAgIGVuZFRpbWU6IDIuNjksXHJcbiAgfSxcclxuICBcInZpZXctY1wiOiB7XHJcbiAgICBzdGFydFRpbWU6IDQuNDQsXHJcbiAgICBlbmRUaW1lOiA1LjY1LFxyXG4gIH0sXHJcbn07XHJcbiIsICJpbXBvcnQgeyBCTEFDS09VVF9USU1FUiB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmxldCBhY3RpdmVTZWN0aW9uID0gbnVsbDtcclxubGV0IGFjdGl2ZVNlY3Rpb25OYW1lID0gbnVsbDtcclxubGV0IGFjdGl2ZVZpZCA9IG51bGw7XHJcbmxldCBzdGFydFRpbWUgPSAwO1xyXG5sZXQgZW5kVGltZSA9IDA7XHJcbmxldCBwYXVzZUZsYWcgPSBmYWxzZTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0dMT0JBTCBGVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmV4cG9ydCBjb25zdCBmbGFzaEJsYWNrb3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICBibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gIH0sIEJMQUNLT1VUX1RJTUVSKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlTmF2TGlua3NBbmROYXZCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgaWYgKFxyXG4gICAgd2luZG93LmdldENvbXB1dGVkU3R5bGUoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKSkuZGlzcGxheSA9PT1cclxuICAgIFwiYmxvY2tcIlxyXG4gICkge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpLmNsaWNrKCk7XHJcbiAgfVxyXG5cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIikuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgYWN0aXZhdGVDdXJyZW50TmF2TGluayA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnROYXZMaW5rcygpO1xyXG4gIGNsaWNrZWQuY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzID0gZnVuY3Rpb24gKCkge1xyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKG5hdkRyb3Bkb3duKSB7XHJcbiAgbmF2RHJvcGRvd24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGNsb3NlTW9iaWxlTmF2TWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBtb2JpbGVOYXZCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIik7XHJcbiAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG1vYmlsZU5hdkJ0bikuZGlzcGxheSAhPT0gXCJub25lXCIpXHJcbiAgICBtb2JpbGVOYXZCdG4uY2xpY2soKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGFjdGl2ZVNlY3Rpb247XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVTZWN0aW9uTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gYWN0aXZlU2VjdGlvbk5hbWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0VmlkVHlwZSA9IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gIHJldHVybiB2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVmlkKCkge1xyXG4gIHJldHVybiBhY3RpdmVWaWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVZpZCgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBhY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhcnRUaW1lKG5ld1ZhbHVlKSB7XHJcbiAgc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZFRpbWUobmV3VmFsdWUpIHtcclxuICBlbmRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGxheVJhbmdlID0gZnVuY3Rpb24gKHZpZGVvQ3VycmVudFRpbWUpIHtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLkNIRUNLRURcclxuICBjb25zdCB2aWRDb2RlID0gYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IHN0YXJ0VGltZTtcclxuXHJcbiAgLy8gMS4gSElEREVOIFNUQVRFOiBJbnN0YW50IGhpZGUgdG8gcmV2ZWFsIHZpZC13cmFwcGVyIGJhY2tncm91bmQgaW1hZ2VcclxuICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblxyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpO1xyXG5cclxuICBjb25zdCBtb25pdG9yVGltZSA9ICgpID0+IHtcclxuICAgIGlmIChhY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gZW5kVGltZSAtIDAuMTUpIHtcclxuICAgICAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIGFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IGVuZFRpbWU7XHJcbiAgICAgIGFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IgPSBtb25pdG9yVGltZTtcclxuXHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gYWN0aXZlVmlkLnF1ZXJ5U2VsZWN0b3IoXCJzb3VyY2VcIik7XHJcbiAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZSA/IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSA6IG51bGw7XHJcbiAgaWYgKGRhdGFTcmMgJiYgYWN0aXZlVmlkLnNyYyAhPT0gZGF0YVNyYykge1xyXG4gICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBhY3RpdmVWaWQuc3JjID0gZGF0YVNyYztcclxuICAgIGFjdGl2ZVZpZC5sb2FkKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGFydFBsYXliYWNrU2VxdWVuY2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhY3RpdmVWaWQuY3VycmVudFRpbWUgPSB0YXJnZXRTdGFydDtcclxuXHJcbiAgICAgIC8vIDIuIFRIRSBGQUlMLVNBRkUgUkVWRUFMXHJcbiAgICAgIC8vIFdlIHBvbGwgZm9yIHBoeXNpY2FsIHBsYXloZWFkIG1vdmVtZW50LiBPbmNlIGl0IG1vdmVzLFxyXG4gICAgICAvLyB0aGUgXCJibGFjayBidWZmZXJcIiBpcyBndWFyYW50ZWVkIHRvIGJlIGdvbmUuXHJcbiAgICAgIGNvbnN0IHBvbGxGb3JGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFhY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgYWN0aXZlVmlkLnBsYXkoKTtcclxuICAgICAgcG9sbEZvckZyYW1lKCk7IC8vIFN0YXJ0IGNoZWNraW5nIGZvciB0aGUgZmlyc3QgcmVhbCBmcmFtZVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJQbGF5YmFjayBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAvLyBGYWxsYmFjazogc2hvdyB2aWRlbyBhbnl3YXkgaWYgcGxheSgpIGZhaWxzIChlLmcuIGF1dHBsYXkgYmxvY2tlZClcclxuICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChhY3RpdmVWaWQucmVhZHlTdGF0ZSA+PSAzKSB7XHJcbiAgICBzdGFydFBsYXliYWNrU2VxdWVuY2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmIChwYXVzZUZsYWcpIHtcclxuICAgIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgYWN0aXZlVmlkLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIGFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBidG4uY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb247XHJcbiAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldExvY2FsSW5kZXggPSBmdW5jdGlvbiAoYnRuLCBidG5DbGFzcywgYWxsQnRuc1dyYXBwZXIpIHtcclxuICBsZXQgbG9jYWxJbmRleDtcclxuICBjb25zdCBhbGxCdG5zID0gYnRuXHJcbiAgICAuY2xvc2VzdChgLiR7YWxsQnRuc1dyYXBwZXJ9YClcclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtidG5DbGFzc31gKTtcclxuICBhbGxCdG5zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgaWYgKGVsID09PSBidG4pIGxvY2FsSW5kZXggPSBpbmRleDtcclxuICB9KTtcclxuICByZXR1cm4gbG9jYWxJbmRleDtcclxufTtcclxuIiwgImNsYXNzIE5hdmJhciB7XHJcbiAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMubmF2TWVudSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVcIik7XHJcbiAgICB0aGlzLm5hdkJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3MgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9tZW51X2xpbmtcIik7XHJcbiAgICB0aGlzLmFsbE5hdkxpbmtzV2l0aERyb3Bkb3duID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1uYXYtc2VjdGlvbj1cInNlcXVlbmNlXCJdJyksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfZHJvcGRvd25cIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5kcm9wZG93bkluZGV4ID0gMDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1uYXYtZHJvcGRvd25cIiwgdGhpcy5vcGVuTmF2RHJvcGRvd24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcImNsb3NlLW5hdi1kcm9wZG93blwiLCB0aGlzLmNsb3NlTmF2RHJvcGRvd24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInRvZ2dsZS1uYXYtZHJvcGRvd25cIiwgdGhpcy50b2dnbGVOYXZEcm9wZG93bi5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGhhbmRsZUV2ZW50ID0gZnVuY3Rpb24gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGdldERyb3Bkb3duSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gICAgY29uc3QgZHJvcGRvd25NZW51ID0gY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpO1xyXG4gICAgY29uc3QgYXJyYXlPZkRyb3Bkb3duT3B0cyA9IFtcclxuICAgICAgLi4uZHJvcGRvd25NZW51LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGluay1kcm9wZG93blwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmRyb3Bkb3duSW5kZXggPSBhcnJheU9mRHJvcGRvd25PcHRzLmluZGV4T2YoY2xpY2tlZCk7XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBvcGVuTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBCTEFDS09VVF9XQUlUX1RPX1JFVkVBTCwgVklEX0VORF9USU1FUiB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBGZWF0dXJlcyB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYmxhY2tvdXRcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0LXdyYXBwZXJcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2ID1cclxuICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5pbnRyb1wiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmZlYXR1cmVzXCIpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpO1xyXG4gICAgdGhpcy5idG5JbmRleCA9IDA7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbi5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQsIGluZGV4LCBpbnRyb0ZsYWcpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGlmIChjbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGludHJvRmxhZykgcmV0dXJuO1xyXG4gICAgdGhpcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGlkZUFsbFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzaG93SW50cm9UZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRcclxuICAgICAgLmZpbmQoKGVsKSA9PiBlbC5kYXRhc2V0LnRleHRDb250ZW50ID09PSBcImludHJvXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRbdGhpcy5idG5JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNJbnRyb1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzSW50cm9WaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlGZWF0dXJlc0ludHJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc1ZpZERpdigpO1xyXG4gICAgLy8gTG9naWM6IEZpbmQgdGhlIG9uZSB0aGF0IGlzbid0IGhpZGRlbiAoZGlzcGxheTogbm9uZSlcclxuICAgIGNvbnN0IGFsbEludHJvcyA9XHJcbiAgICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLWludHJvXCIpO1xyXG4gICAgYWxsSW50cm9zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIC8vIG9mZnNldFBhcmVudCBpcyBudWxsIGlmIHRoZSBlbGVtZW50IGlzIGRpc3BsYXk6IG5vbmVcclxuICAgICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLWludHJvXCIpO1xyXG4gICAgICAgIGlmICh2aWQpIHtcclxuICAgICAgICAgIHZpZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICB2aWQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IGZ1bmN0aW9uIChjbGlja2VkQ3RybEJ0bikge1xyXG4gICAgdGhpcy5jbGVhckZlYXR1cmVzVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNWaWREaXYoKTtcclxuICAgIHRoaXMuYnRuSW5kZXggPSB0aGlzLmdsb2JhbC5nZXRMb2NhbEluZGV4KFxyXG4gICAgICBjbGlja2VkQ3RybEJ0bixcclxuICAgICAgXCJjdHJsLWJ0blwiLFxyXG4gICAgICBcInNlY3Rpb24td3JhcC1idG5zXCIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBCTEFDS09VVF9XQUlUX1RPX1JFVkVBTCk7XHJcbiAgICAgIH0sIFZJRF9FTkRfVElNRVIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHtcclxuICBEQVRBX1ZJRVdfMSxcclxuICBEQVRBX1ZJRVdfMV9NUCxcclxuICBEQVRBX1ZJRVdfMixcclxuICBEQVRBX1ZJRVdfMl9NUCxcclxuICBEQVRBX1ZJRVdfMyxcclxuICBEQVRBX1ZJRVdfM19NUCxcclxuICBWSUVXX1NUQVJUX0VORCxcclxufSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuaW50cm9UZXh0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtdHh0XCIpO1xyXG5cclxuICAgIHRoaXMudmlld1ZpZERpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIudmlld1wiKTtcclxuICAgIHRoaXMuYWxsVmlld1ZpZERpdnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLXZpZXdcIik7XHJcbiAgICB0aGlzLmNvbXBWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmNvbXBcIik7XHJcbiAgICB0aGlzLmFsbERhdGFWaWREaXZzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lO1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZztcclxuXHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRzLW1lbnVfYnRuXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtZHJvcGRvd25cIik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdHMtbWVudV9saW5rXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IFwidmlldy1hXCI7XHJcbiAgICB0aGlzLmxhc3RBY3RpdmVWaWV3ID0geyB2aWV3OiBcInZpZXctYVwiLCBzdGFydFRpbWU6IDAsIGVuZFRpbWU6IDAgfTtcclxuICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kaW1tZXJcIik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmN0cmxCdG5XcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuY3RybEJ0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5zZXRBbmRQbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS12aWV3LXZpZFwiLCB0aGlzLnNldEFuZFBsYXlWaWV3VmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXAuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcIm9wZW4tdmlldy1vcHRzLW1lbnVcIiwgdGhpcy5zaG93Vmlld09wdHNNZW51LmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS12aWV3LW9wdHMtbWVudVwiLCB0aGlzLmhpZGVWaWV3T3B0c01lbnUuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3QnRuSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXggPSBpbmRleDtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKSxcclxuICAgIClbdGhpcy5jdHJsQnRuSW5kZXhdO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSBmdW5jdGlvbiAodGV4dENvbnRlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHRleHRDb250ZW50O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgIT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgdGhpcy5hbGxWaWV3T3B0QnRucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGlmIChlbC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleChlbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9XHJcbiAgICAgIHRoaXMuYWxsVmlld09wdEJ0bnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hbGxWaWV3T3B0QnRuc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF0uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gY2xpY2tlZC5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IGNsaWNrZWQuZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkgbmV3VmFsdWUgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkIHx8IGFjdGl2ZVZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdICE9PSBcImRhdGFcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzFfTVApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWJcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzJfTVApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzNfTVApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18xKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18yKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkge1xyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfMV9NUH1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18yX01QfVwiKWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzNfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzF9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfMn1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18zfVwiKWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IGZ1bmN0aW9uIChjbGlja2VkVmlld09wdHNCdG4pIHtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgY2xpY2tlZFZpZXdPcHRzQnRuLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7IC8vZm9yIERhdGEuc2V0QWN0aXZlVmlld0J0bkluZGV4XHJcbiAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleCgpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4udGV4dENvbnRlbnQgPSBjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5hbGxEYXRhV3JhcHBlcnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG5cclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbFxyXG4gICAgICAuZ2V0QWN0aXZlU2VjdGlvbigpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pOyAvL3NvIGdsb2JhbC5zZXRBY3RpdmVWaWQgY2FuIHBpY2sgZHQgb3IgbXAgZnJvbSBhY3RpdmVzXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIHRoZSBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3KGNsaWNrZWRWaWV3T3B0c0J0bi50ZXh0Q29udGVudCk7IC8vZm9yIHRoZSBwb3N0ZXJcclxuXHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG5cclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmN0cmxCdG5JbmRleCA9IHRoaXMuZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbiAgICAgIGNsaWNrZWRDdHJsQnRuLFxyXG4gICAgICBcImN0cmwtYnRuXCIsXHJcbiAgICAgIFwic2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICk7XHJcblxyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZChjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7IC8vcmVtb3ZlcyBibGFja291dCBpbiBnbG9iYWwucGxheVJhbmdlXHJcbiAgfTtcclxuICBwbGF5RGF0YVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUodGhpcy5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZSh0aGlzLmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3VmlkRmxhZyAmJiAhdGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoXCJ2aWV3LWFcIik7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuc2hvd0RhdGEodGhpcy5jdHJsQnRuSW5kZXgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcblxyXG4gICAgICAvL3NldCBiY2tncm5kIGltZyB0byBibGFjayB0byBwcmV2ZW50IGZsYXNoIG9mIGltYWdlIHdoZW4gY2hhbmdpbmcgbmF2XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cclxuICAgICAgICBcIm5vbmVcIjtcclxuICAgICAgdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCkuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxyXG4gICAgICAgIFwiYmxhY2tcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIGJhY2tUb1ZpZXdGcm9tQ29tcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICB9O1xyXG4gIGhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIilcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPVxyXG4gICAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF07XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcclxuIiwgImNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5hbGxJbnRyb1RleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW50cm8tdGV4dC13cmFwXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcIm9wZW4tc2VxdWVuY2UtaW5kZXhcIiwgdGhpcy5hY3RpdmF0ZVNlY3Rpb25JbmRleC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIGlmICghdGhpcy5kcm9wZG93bkNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoXHJcbiAgICAgICAgY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2xpbmtcIiksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmNsb3NlTmF2RHJvcGRvd24oY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpKTtcclxuICAgICAgdGhpcy5nbG9iYWwuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25DbGlja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuaGlkZUFsbEFjdGlvbkhlYWRpbmdzKCk7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlVmlkV3JhcCh0aGlzLnNlcXVlbmNlSW5kZXgpO1xyXG4gIH07XHJcbiAgYWN0aXZhdGVTZWN0aW9uSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gdGhpcy5nbG9iYWwuZ2V0TG9jYWxJbmRleChcclxuICAgICAgY2xpY2tlZCxcclxuICAgICAgXCJuYXZfbWVudV9saW5rLWRyb3Bkb3duXCIsXHJcbiAgICAgIFwibmF2X21lbnVfZHJvcGRvd25cIixcclxuICAgICk7XHJcbiAgICB0aGlzLmluaXRTZWN0aW9uKGNsaWNrZWQpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0U2VxdWVuY2VJbmRleCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgdGhpcy5zZXF1ZW5jZUluZGV4ID0gMDtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IHZhbHVlO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxBY3Rpb25IZWFkaW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VWaWRXcmFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gZnVuY3Rpb24gKGNsaWNrZWRDdHJsQnRuKSB7XHJcbiAgICB0aGlzLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyU2VxdWVuY2VUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VxdWVuY2VUaW1lcik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU2VxdWVuY2U7XHJcbiIsICJjb25zb2xlLmxvZyhcIkJSQU5DSDogbmV3TW9kdWxlcy0zXCIpO1xyXG5cclxuaW1wb3J0IHsgU1RBUlRfVUlfUkVWRUFMIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmFsIGZyb20gXCIuLzAtZ2xvYmFsXCI7XHJcbmltcG9ydCBOYXZiYXJDbGFzcyBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfY29tcG9uZW50XCIpO1xyXG5jb25zdCBmZWF0dXJlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5mZWF0dXJlc1wiKTtcclxuY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5kYXRhXCIpO1xyXG5jb25zdCBzZXF1ZW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5zZXF1ZW5jZVwiKTtcclxuY29uc3QgbmF2YmFyID0gbmV3IE5hdmJhckNsYXNzKG5hdkNvbnRhaW5lcik7XHJcbmNvbnN0IGZlYXR1cmVzID0gbmV3IEZlYXR1cmVzQ2xhc3MoZ2xvYmFsLCBmZWF0dXJlc0NvbnRhaW5lcik7XHJcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YUNsYXNzKGdsb2JhbCwgZGF0YUNvbnRhaW5lcik7XHJcbmNvbnN0IHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBzZXF1ZW5jZUNvbnRhaW5lcik7XHJcbmNvbnN0IFNFQ1RJT05TID0ge1xyXG4gIG5hdmJhcjogbmF2YmFyLFxyXG4gIGZlYXR1cmVzOiBmZWF0dXJlcyxcclxuICBkYXRhOiBkYXRhLFxyXG4gIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTkFWLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vbmF2X21lbnVfbGlua1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuICBjbGVhckFsbFRpbWVycygpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oYWN0aXZlU2VjdGlvbik7XHJcbiAgLy8zLiBQb2x5bW9ycGhpYyBjYWxsXHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTUFJTiBCT0RZLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW91dEFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLVZJRFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2VuZGVkXHJcbmdsb2JhbC5hbGxWaWRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNvbnN0IHZpZFR5cGUgPSBnbG9iYWwuZ2V0VmlkVHlwZShlbCk7XHJcbiAgICBzd2l0Y2ggKHZpZFR5cGUpIHtcclxuICAgICAgY2FzZSBcImZlYXR1cmVzXCI6XHJcbiAgICAgICAgZmVhdHVyZXMudmlkRW5kKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJkYXRhXCI6XHJcbiAgICAgICAgZGF0YS52aWRFbmQoZWwuY2xvc2VzdChcIi52aWRcIikpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwic2VxdWVuY2VcIjpcclxuICAgICAgICBzZXF1ZW5jZS52aWRFbmQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9KTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXRcclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBzZXR1cExhenlMb2FkaW5nKCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgbmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcImZlYXR1cmVzXCIpO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICBmZWF0dXJlcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGZlYXR1cmVzLmluaXRTZWN0aW9uKG51bGwsIG51bGwsIHRydWUpO1xyXG4gIH0sIFNUQVJUX1VJX1JFVkVBTCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxufTtcclxuY29uc3Qgc2V0dXBMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbGxMYXp5VmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG4gIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgIHJvb3Q6IG51bGwsXHJcbiAgICByb290TWFyZ2luOiBcIjBweFwiLFxyXG4gICAgdGhyZXNob2xkOiAwLjEsXHJcbiAgfTtcclxuICBjb25zdCB2aWRlb09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gdmlkZW8ucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKTtcclxuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgLy8gLS0tIExPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIFVzZSBkYXRhLXNyYyBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBrZWVwIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBkYXRhU3JjID0gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoZGF0YVNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gZGF0YVNyYztcclxuICAgICAgICAgICAgLy8gS2VlcCBkYXRhLXNyYyBhdHRyaWJ1dGUgc28gd2UgY2FuIGZpbmQgdGhlIFVSTCBhZ2FpbiBsYXRlclxyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgZGF0YVNyYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIC0tLSBVTkxPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBpbnRlcm5hbCBsb2dzIGZvciB1c2VyIGludGVyYWN0aW9ucyBhbmQgcmVzb3VyY2UgbG9hZHNcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKCk7XHJcbiAgICAgICAgUmVzZXRTZWN0aW9uKHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gTW92ZSBzcmMgYmFjayB0byBkYXRhLXNyYyBhbmQgZW1wdHkgdGhlIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3JjID0gc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBjdXJyZW50U3JjKTtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IFwiXCI7IC8vIFRoaXMgc3RvcHMgdGhlIHZpZGVvIGZyb20gYnVmZmVyaW5nXHJcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7IC8vIEZ1bGx5IGNsZWFyIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSBicm93c2VyIHRvIGR1bXAgdGhlIHZpZGVvIGRhdGEgZnJvbSBtZW1vcnlcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIG9ic2VydmVyT3B0aW9ucyk7XHJcbiAgYWxsTGF6eVZpZHMuZm9yRWFjaCgodmlkKSA9PiB2aWRlb09ic2VydmVyLm9ic2VydmUodmlkKSk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vUkVTRVQgVklEUyBBRlRFUiBVTkxPQURJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBjb25zdCBSZXNldFNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gICAgaWYgKCFzZWN0aW9uKSByZXR1cm47IC8vaGVscHMgcHJldmVudCBjcmFzaGVzXHJcbiAgICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgZWwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucyhzZWN0aW9uKTtcclxuICB9O1xyXG59O1xyXG4vL2ZlYXR1cmVzIGFuZCBzZXF1ZW5jZSB0aW1lcnNcclxuY29uc3QgY2xlYXJBbGxUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZmVhdHVyZXMuY2xlYXJGZWF0dXJlc1RpbWVycygpO1xyXG4gIHNlcXVlbmNlLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBTyxNQUFNLGtCQUFrQjtBQUV4QixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLDBCQUEwQjtBQUNoQyxNQUFNLGdCQUFnQjtBQUl0QixNQUFNLGNBQ1g7QUFDSyxNQUFNLGlCQUNYO0FBQ0ssTUFBTSxjQUNYO0FBQ0ssTUFBTSxpQkFDWDtBQUNLLE1BQU0sY0FDWDtBQUNLLE1BQU0saUJBQ1g7QUFFSyxNQUFNLGlCQUFpQjtBQUFBLElBQzVCLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNGOzs7QUNsQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtB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Q2IscUJBQU8sZ0JBQWdCLEtBQUs7QUFBQSxZQUM5QjtBQUFBLFVBQ0YsQ0FBQztBQUVELGdCQUFNLEtBQUs7QUFBQSxRQUNiO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxHQUFHLGVBQWU7QUFDbEIsZ0JBQVksUUFBUSxDQUFDLFFBQVEsY0FBYyxRQUFRLEdBQUcsQ0FBQztBQUd2RCxVQUFNLGVBQWUsU0FBVSxTQUFTO0FBQ3RDLFVBQUksQ0FBQyxRQUFTO0FBQ2QsY0FBUSxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsU0FBVSxJQUFJO0FBQ3JELFdBQUcsY0FBYztBQUNqQixXQUFHLE1BQU07QUFBQSxNQUNYLENBQUM7QUFDRCxNQUFPLHNCQUFzQixPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBRUEsTUFBTSxpQkFBaUIsV0FBWTtBQUNqQyxhQUFTLG9CQUFvQjtBQUM3QixhQUFTLG9CQUFvQjtBQUFBLEVBQy9COyIsCiAgIm5hbWVzIjogWyJhY3RpdmVWaWQiLCAiYWN0aXZlU2VjdGlvbiJdCn0K
