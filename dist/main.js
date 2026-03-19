(() => {
  var __defProp = Object.defineProperty;
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };

  // src/0-config.js
  var TIMING = Object.freeze({
    UI: {
      START_UI_REVEAL: 1500,
      BLACKOUT_TIMER: 200,
      BLACKOUT_WAIT_TO_REVEAL: 50
    },
    VIDEO: {
      VID_END_TIMER: 1500
    }
  });
  var ASSETS = Object.freeze({
    "view-1": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678707c7b74a524f9f4_Data-View-1.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066780bffd055268006d5_Data-View-1-MP.webp"
    },
    "view-2": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066788514192dd118f92e_Data-View-2.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678f95e3f4b347c21a6_Data-View-2-MP.webp"
    },
    "view-3": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678663d4800cc5f9935_Data-View-3.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066785c709890f1f02679_Data-View-3-MP.webp"
    }
  });
  var VIEW_START_END = Object.freeze({
    "view-1": {
      startTime: 0,
      endTime: 0
    },
    "view-2": {
      startTime: 1.48,
      endTime: 2.69
    },
    "view-3": {
      startTime: 4.44,
      endTime: 5.65
    }
  });

  // src/0-global.js
  var global_exports = {};
  __export(global_exports, {
    _state: () => _state,
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
    getWebflowBreakpoint: () => getWebflowBreakpoint,
    mainWrapper: () => mainWrapper,
    navBtn: () => navBtn,
    navMenu: () => navMenu,
    playRange: () => playRange,
    query: () => query,
    queryAll: () => queryAll,
    resetAllSectionVids: () => resetAllSectionVids,
    setActiveCtrlBtnWrapper: () => setActiveCtrlBtnWrapper,
    setActiveSection: () => setActiveSection,
    setActiveVid: () => setActiveVid,
    setEndTime: () => setEndTime,
    setStartTime: () => setStartTime,
    setWebflowBreakpoint: () => setWebflowBreakpoint,
    toggleBtnHoverClass: () => toggleBtnHoverClass,
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
  var _state = {
    activeSection: null,
    activeSectionName: null,
    activeVid: null,
    webflowBreakpoint: null,
    startTime: 0,
    endTime: 0,
    pauseFlag: false
  };
  var query = function(selector, context = document) {
    const el = context.querySelector(selector);
    if (!el) {
      throw new Error(
        `CRITICAL UI ERROR: "${selector}" is missing from the DOM.`
      );
    }
    return el;
  };
  var queryAll = function(selector, context = document) {
    const elements = context.querySelectorAll(selector);
    if (elements.length === 0) {
      throw new Error(
        `CRITICAL UI ERROR: No elements matching "${selector}" found.`
      );
    }
    return elements;
  };
  var getVidType = function(video) {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.add("active");
    setTimeout(function() {
      blackout.classList.remove("active");
    }, TIMING.UI.BLACKOUT_TIMER);
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
    _state.activeSectionName = sectionName;
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.dataset.section === sectionName
    );
    const target = matches[index];
    if (target) {
      target.classList.add("active");
      _state.activeSection = target;
    }
  };
  var deactivateAllSections = function() {
    allSections.forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var getActiveVid = function() {
    return _state.activeVid;
  };
  var setActiveVid = function() {
    allVidCodes.forEach((el) => {
      if (el.offsetParent !== null) {
        _state.activeVid = el.querySelector(".vid");
      }
    });
  };
  var getWebflowBreakpoint = function() {
    return _state.webflowBreakpoint;
  };
  var setWebflowBreakpoint = function() {
    const width = window.innerWidth;
    if (width < 480) _state.webflowBreakpoint = "mobilePortrait";
    if (width >= 480) _state.webflowBreakpoint = "mobileLandscape";
    if (width >= 768) _state.webflowBreakpoint = "tablet";
    if (width >= 992) _state.webflowBreakpoint = "desktop";
  };
  var setStartTime = function(newValue) {
    _state.startTime = newValue;
  };
  var setEndTime = function(newValue) {
    _state.endTime = newValue;
  };
  var clearSectionVidSrc = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.src = "";
      el.load();
    });
  };
  var resetAllSectionVids = function() {
    _state.activeSection.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
  };
  var playRange = function(videoCurrentTime) {
    if (!_state.activeVid) return;
    const vidCode = _state.activeVid.parentElement;
    const targetStart = videoCurrentTime || _state.startTime;
    if (_state.activeVid._currentMonitor) {
      _state.activeVid.removeEventListener(
        "timeupdate",
        _state.activeVid._currentMonitor
      );
    }
    if (vidCode) vidCode.style.opacity = "0";
    _state.activeVid.removeEventListener(
      "timeupdate",
      _state.activeVid._currentMonitor
    );
    const monitorTime = () => {
      if (_state.activeVid.currentTime >= _state.endTime - 0.15) {
        _state.activeVid.removeEventListener("timeupdate", monitorTime);
        _state.activeVid.pause();
        _state.activeVid.currentTime = _state.endTime;
        _state.activeVid.dispatchEvent(new Event("ended"));
      }
    };
    _state.activeVid._currentMonitor = monitorTime;
    const source = _state.activeVid.querySelector("source");
    const dataSrc = source ? source.getAttribute("data-src") : null;
    if (dataSrc && _state.activeVid.src !== dataSrc) {
      _state.activeVid.pause();
      _state.activeVid.src = dataSrc;
      _state.activeVid.load();
    }
    const startPlaybackSequence = async () => {
      try {
        _state.activeVid.currentTime = targetStart;
        const pollForFrame = () => {
          if (_state.activeVid.currentTime > targetStart) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                if (vidCode) vidCode.style.opacity = "1";
                if (typeof blackout !== "undefined")
                  blackout.classList.remove("active");
              });
            });
          } else if (!_state.activeVid.paused) {
            requestAnimationFrame(pollForFrame);
          }
        };
        _state.activeVid.addEventListener("timeupdate", monitorTime);
        await _state.activeVid.play();
        pollForFrame();
      } catch (e) {
        console.warn("Playback failed:", e);
        if (vidCode) vidCode.style.opacity = "1";
      }
    };
    if (_state.activeVid.readyState >= 3) {
      startPlaybackSequence();
    } else {
      _state.activeVid.addEventListener("canplay", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    _state.pauseFlag = false;
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "none";
  };
  var enablePause = function() {
    _state.activeSection.querySelector(".pause-wrap").style.pointerEvents = "auto";
  };
  var togglePause = function() {
    if (_state.pauseFlag) {
      _state.pauseFlag = false;
      _state.activeVid.play();
    } else {
      _state.pauseFlag = true;
      _state.activeVid.pause();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    _state.activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
  };
  var setActiveCtrlBtnWrapper = function(btnWrapperIndex) {
    deactivateAllCtrlBtnWrappers();
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el, index) {
      if (index === btnWrapperIndex) {
        el.classList.add("active");
      }
    });
  };
  var deactivateAllCtrlBtnWrappers = function() {
    _state.activeSection.querySelectorAll(".section-wrap-btns").forEach(function(el) {
      el.classList.remove("active");
    });
  };
  var toggleBtnHoverClass = function(btn) {
    if (_state.activeVid && _state.webflowBreakpoint === "desktop")
      btn.classList.toggle("hovered");
  };
  var activateCurrentBtn = function(btn) {
    deactivateCurrentBtns();
    btn.classList.add("current");
  };
  var deactivateCurrentBtns = function(section) {
    if (!section) section = _state.activeSection;
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
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.navMenu = this.global.query(".nav_menu", this.container);
      this.navBtn = this.global.query(".nav_button", this.container);
      this.allNavLinks = this.global.queryAll(".nav_menu_link", this.container);
      this.allNavLinksWithDropdown = [
        ...this.global.queryAll('[data-nav-section="sequence"]', this.container)
      ];
      this.allNavDropdowns = [
        ...this.global.queryAll(".nav_menu_dropdown", this.container)
      ];
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-nav-dropdown", this.openNavDropdown],
        ["close-nav-dropdown", this.closeNavDropdown],
        ["toggle-nav-dropdown", this.toggleNavDropdown]
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
      if ("navMenuOpen" in this.navMenu.dataset) this.navBtn.click();
      this.navMenu.querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    openNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.add("active");
    };
    closeNavDropdown = function(trigger) {
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.remove("active");
    };
    toggleNavDropdown = function(trigger) {
      this.global.activateCurrentNavLink(trigger);
      trigger.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = Navbar;

  // src/1-features.js
  var Features = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.featuresBlackout = this.global.query(".blackout", this.container);
      this.featuresAllText = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.featuresIntroVidDiv = this.global.query(
        ".vid-wrap.intro",
        this.container
      );
      this.featuresVidDiv = this.global.query(
        ".vid-wrap.features",
        this.container
      );
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.featuresCtrlBtns = this.global.query(
        ".section-wrap-btns",
        this.container
      );
      this.activeFeature = null;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-features", this.initSection],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked, isIntro2) => {
      this.global.blackout.classList.remove("active");
      this.featuresBlackout.classList.remove("active");
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
      if (isIntro2) return;
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
    hideAllText = () => {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro").classList.add("active");
    };
    showFeatureText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === this.activeFeature).classList.add("active");
    };
    showFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.add("active");
    };
    hideFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv.classList.remove("active");
    };
    showFeaturesVidDiv = () => {
      this.featuresVidDiv.classList.add("active");
    };
    hideFeaturesVidDiv = () => {
      this.featuresVidDiv.classList.remove("active");
    };
    playFeaturesIntro = () => {
      this.featuresBlackout.classList.remove("active");
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
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearFeaturesTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.hideFeaturesIntroVidDiv();
      this.showFeaturesVidDiv();
      this.activeFeature = clickedCtrlBtn.dataset.feature;
      this.featuresEndisCancelled = false;
      this.hideAllText();
      this.showFeatureText();
      this.global.setActiveVid();
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.add("active");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            this.global.resetAllSectionVids();
            this.global.deactivateCurrentBtns();
            this.global.enableNavLinksAndNavBtn();
            this.global.enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, TIMING.UI.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VIDEO.VID_END_TIMER);
      }
    };
    clearFeaturesTimers = () => {
      this.featuresEndisCancelled = true;
      clearTimeout(this.featuresTimer);
      this.featuresTimer = null;
    };
  };
  var features_default = Features;

  // src/2-data.js
  var HOME_VIEW = "view-1";
  var Data = class {
    constructor(globalController, container) {
      this.global = globalController;
      this.container = container;
      this.introText = this.global.query(".section-wrap-txt", this.container);
      this.viewOptsBtn = this.global.query(".opts-menu-btn", this.container);
      this.viewOptsMenu = this.global.query(".opts-dropdown", this.container);
      this.allViewOptBtns = [
        ...this.global.queryAll(".opts-menu-link", this.container)
      ];
      this.dimmer = this.global.query(".dimmer", this.container);
      this.txtImgBtn = this.global.query(".txt-img-btn", this.container);
      this.activeDataWrapper = this.global.query(
        ".section-wrap-comp-data",
        this.container
      );
      this.allDataWrappers = [
        ...this.global.queryAll(".section-wrap-comp-data", this.container)
      ];
      this.allData = [...this.global.queryAll(".comp-data-wrap", this.container)];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.activeViewBtn = null;
      this.activeView = "view-1";
      this.lastActiveView = { view: "view-1", startTime: 0, endTime: 0 };
      this.viewVidFlag = false;
      this.viewChainFlag = false;
      this.txtOrImg = "image";
      this.activeDataSheet = null;
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.startTime = 0;
      this.endTime = 0;
      this.activeCtrlBtn = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
        ["play-view-vid", this.setAndPlayViewVid],
        ["back-to-view", this.backToViewFromComp],
        ["open-view-opts-menu", this.showViewOptsMenu],
        ["close-view-opts-menu", this.hideViewOptsMenu],
        ["toggle-img-txt", this.showCompImageOrText],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
      this.assetsMap = /* @__PURE__ */ new Map([
        ["view-1", ASSETS["view-1"].desktop],
        ["view-1-mp", ASSETS["view-1"].mobile],
        ["view-2", ASSETS["view-2"].desktop],
        ["view-2-mp", ASSETS["view-2"].mobile],
        ["view-3", ASSETS["view-3"].desktop],
        ["view-3-mp", ASSETS["view-3"].mobile]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
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
    showViewOptsMenu = () => {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOptsMenu = () => {
      this.viewOptsMenu.classList.remove("active");
    };
    showCompImageOrText = () => {
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
    hideAllData = () => {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = () => {
      this.activeDataWrapper.classList.add("active");
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap").forEach((el) => {
        if (el.dataset.comp === this.activeCtrlBtn.dataset.comp)
          this.activeDataSheet = el;
      });
      this.activeDataSheet.classList.add("active");
    };
    hideBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.remove("active");
    };
    showBackBtn = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach(function(el) {
        el.classList.remove("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
      this.activeCtrlBtnWrapper.querySelector(".ctrl-btn-back").classList.add("active");
    };
    resetAllDataSheets = () => {
      this.allData.forEach(function(el) {
        el.parentElement.classList.add("active");
        el.querySelector(".comp-data-body-wrap").scroll(0, 0);
        el.parentElement.classList.remove("active");
      });
    };
    setLastActiveView = (newValue) => {
      if (!newValue) {
        this.lastActiveView.view = this.activeView;
      } else {
        this.lastActiveView.view = newValue;
      }
    };
    setActiveView = () => {
      this.activeView = this.activeViewBtn.dataset.view;
    };
    viewBackToStart = () => {
      this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
      this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
    };
    setViewVidStartAndEnd = () => {
      this.viewVidFlag = true;
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView === HOME_VIEW) {
        this.viewBackToStart();
        return;
      }
      if (this.lastActiveView.view !== HOME_VIEW && this.activeView !== HOME_VIEW) {
        this.viewChainFlag = true;
        this.viewBackToStart();
        return;
      }
      this.startTime = this.activeViewBtn.dataset.startTime;
      this.endTime = this.activeViewBtn.dataset.endTime;
    };
    setDataVidStartAndEnd = () => {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = this.activeCtrlBtn.dataset.startTime;
      this.endTime = this.activeCtrlBtn.dataset.endTime;
    };
    setDataVidPoster = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      let mapKey = this.activeView;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVid.setAttribute("poster", asset);
    };
    setDataVidBackgroundImg = () => {
      const activeVid = this.global.getActiveVid();
      if (!activeVid) return;
      const activeVidWrap = activeVid.closest(".vid-wrap");
      let mapKey = this.lastActiveView.view;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVidWrap.style.backgroundImage = `url("${asset}")`;
    };
    deactivateAllDataWrappers = () => {
      this.allDataWrappers.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = (clickedViewOptsBtn) => {
      if (clickedViewOptsBtn.dataset.view === this.activeView) return;
      this.viewOptsMenu.classList.remove("active");
      this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
      this.activeDataWrapper = this.allDataWrappers.find(
        (el) => el.dataset.view === clickedViewOptsBtn.dataset.view
      );
      this.activeViewBtn = clickedViewOptsBtn;
      this.global.setActiveVid();
      this.setDataVidBackgroundImg();
      this.setActiveView();
      this.setActiveCtrlBtnWrapper();
      this.setViewVidStartAndEnd();
      this.playDataVid();
    };
    setAndPlayCtrlBtnVid = (clickedCtrlBtn) => {
      this.global.setActiveVid();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.hideActiveCtrlBtnWrapper();
      this.activeCtrlBtn = clickedCtrlBtn;
      this.setDataVidStartAndEnd(this.activeCtrlBtn);
      this.playDataVid();
    };
    playDataVid = () => {
      this.introText.classList.remove("active");
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.global.setStartTime(this.startTime);
      this.global.setEndTime(this.endTime);
      this.global.playRange();
    };
    vidEnd = () => {
      if (this.viewVidFlag && !this.viewChainFlag) {
        this.setLastActiveView();
        this.setDataVidBackgroundImg();
        this.setDataVidPoster();
        this.showActiveCtrlBtnWrapper();
        this.introText.classList.add("active");
        this.global.enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView(HOME_VIEW);
        this.setDataVidBackgroundImg();
        this.setViewVidStartAndEnd();
        this.playDataVid();
      } else {
        this.dimmer.classList.add("active");
        this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
        this.showData();
        this.showBackBtn();
        const activeVidWrap = this.global.getActiveVid().closest(".vid-wrap");
        if (activeVidWrap) {
          activeVidWrap.style.backgroundImage = "none";
          activeVidWrap.style.backgroundColor = "black";
        }
      }
    };
    backToViewFromComp = () => {
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
    hideActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.remove("active");
    };
    showActiveCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    showCtrlBtnWrapper = () => {
      this.activeCtrlBtnWrapper.querySelectorAll(".ctrl-btn").forEach((el) => {
        el.classList.add("active");
      });
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    setActiveCtrlBtnWrapper = () => {
      this.global.deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.view === this.activeView
      );
    };
    deactivateAllCtrlBtnWrappers = () => {
      this.allCtrlBtnWrappers.forEach((el) => {
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
      this.pauseWrapper = this.global.query(".pause-wrap", this.container);
      this.allTxtWrappers = [
        ...this.global.queryAll(".txt-wrap", this.container)
      ];
      this.allIntroTxt = [
        ...this.global.queryAll(".intro-txt-wrap", this.container)
      ];
      this.allActionHeadings = [
        ...this.global.queryAll(".action-heading", this.container)
      ];
      this.allVidWrappers = [
        ...this.global.queryAll(".vid-wrap", this.container)
      ];
      this.allCtrlBtnWrappers = [
        ...this.global.queryAll(".section-wrap-btns", this.container)
      ];
      this.isDropdown = false;
      this.activeSequence = null;
      this.activeSectionTxt = null;
      this.activeVidWrapper = null;
      this.activeCtrlBtnWrapper = null;
      this.sequenceTimer = null;
      this.sequenceEndIsCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection],
        ["open-sequence-index", this.setActiveSequenceDropdown],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid],
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked) => {
      this.global.flashBlackout();
      this.activeSequence = clicked.dataset.sequence;
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.setAndShowActiveTxtWrapper();
      this.setAndShowActiveVidWrapper();
      this.setAndShowActiveCtrlBtnWrapper();
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.add("active");
      if (!this.isDropdown) {
        this.global.activateCurrentNavLink(clicked);
      } else {
        this.global.activateCurrentNavLink(
          clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
        );
        window.dispatchEvent(
          new CustomEvent("dropdownOptClicked", { detail: clicked })
        );
        this.isDropdown = false;
      }
    };
    handleEvent = (trigger, eventAction) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(trigger);
      } else {
        console.warn(`No action found for: ${eventAction}`);
      }
    };
    setActiveSequenceDropdown = (clicked) => {
      if ("isDropdownIcon" in clicked.dataset) {
        window.dispatchEvent(
          new CustomEvent("dropdownIconClicked", { detail: clicked })
        );
      } else {
        this.isDropdown = true;
        this.initSection(clicked);
      }
    };
    setAndShowActiveTxtWrapper = () => {
      this.allTxtWrappers.forEach((el) => el.classList.remove("active"));
      this.activeTxtWrapper = this.allTxtWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeTxtWrapper.classList.add("active");
    };
    setAndShowActiveVidWrapper = () => {
      this.allVidWrappers.forEach((el) => el.classList.remove("active"));
      this.activeVidWrapper = this.allVidWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeVidWrapper.classList.add("active");
    };
    setAndShowActiveCtrlBtnWrapper = () => {
      this.allCtrlBtnWrappers.forEach((el) => el.classList.remove("active"));
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers.find(
        (el) => el.dataset.sequence === this.activeSequence
      );
      this.activeCtrlBtnWrapper.classList.add("active");
    };
    hideAllIntroText = () => {
      this.allIntroTxt.forEach((el) => {
        el.classList.remove("active");
      });
    };
    hideAllActionHeadings = () => {
      this.allActionHeadings.forEach((el) => {
        el.classList.remove("active");
      });
    };
    playCtrlBtnVid = (clickedCtrlBtn) => {
      this.clearSequenceTimers();
      this.global.disablePause();
      this.global.enablePause();
      this.pauseWrapper.classList.remove("active");
      this.activeTxtWrapper.querySelector(".intro-txt-wrap").classList.remove("active");
      this.activeTxtWrapper.querySelector(".action-heading").classList.add("active");
      this.sequenceEndIsCancelled = false;
      this.global.setActiveVid();
      this.global.setStartTime(clickedCtrlBtn.dataset.startTime);
      this.global.setEndTime(clickedCtrlBtn.dataset.endTime);
      this.global.activateCurrentBtn(clickedCtrlBtn);
      this.global.blackout.classList.add("active");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.sequenceEndIsCancelled === false) {
        this.pauseWrapper.classList.remove("active");
        this.global.disablePause(this.pauseWrapper);
      }
    };
    clearSequenceTimers = () => {
      this.sequenceEndIsCancelled = true;
      clearTimeout(this.sequenceTimer);
      this.sequenceTimer = null;
    };
  };
  var sequence_default = Sequence;

  // src/main.js
  console.log("TEST-2");
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var navContainer = query(".nav_component", document);
  var featuresContainer = query(".section.features", document);
  var dataContainer = query(".section.data", document);
  var sequenceContainer = query(".section.sequence", document);
  var navbar = new navbar_default(global_exports, navContainer);
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
    const activeSection = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    if ("isDropdownIcon" in clicked.dataset) {
      targetModule.handleEvent(clicked, action);
      return;
    }
    blackout.classList.add("active");
    setActiveSection(activeSection);
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
  window.addEventListener("dropdownIconClicked", function(e) {
    const clicked = e.detail;
    if (!clicked) return;
    navbar.toggleNavDropdown(clicked);
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
    const activeSection = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(clicked, action);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(hovered, action);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection];
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
    setWebflowBreakpoint();
    blackout.classList.add("active");
    navContainer.classList.remove("active");
    navbar.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.remove("active");
    features.playFeaturesIntro();
    setTimeout(() => {
      navContainer.classList.add("active");
      features.initSection(null, isIntro = true);
    }, TIMING.UI.START_UI_REVEAL);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NzA3YzdiNzRhNTI0ZjlmNF9EYXRhLVZpZXctMS53ZWJwXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIixcclxuICB9LFxyXG4gIFwidmlldy0yXCI6IHtcclxuICAgIGRlc2t0b3A6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg4NTE0MTkyZGQxMThmOTJlX0RhdGEtVmlldy0yLndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiLFxyXG4gIH0sXHJcbiAgXCJ2aWV3LTNcIjoge1xyXG4gICAgZGVza3RvcDpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODY2M2Q0ODAwY2M1Zjk5MzVfRGF0YS1WaWV3LTMud2VicFwiLFxyXG4gICAgbW9iaWxlOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCIsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBWSUVXX1NUQVJUX0VORCA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFwidmlldy0xXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMCxcclxuICAgIGVuZFRpbWU6IDAsXHJcbiAgfSxcclxuICBcInZpZXctMlwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDEuNDgsXHJcbiAgICBlbmRUaW1lOiAyLjY5LFxyXG4gIH0sXHJcbiAgXCJ2aWV3LTNcIjoge1xyXG4gICAgc3RhcnRUaW1lOiA0LjQ0LFxyXG4gICAgZW5kVGltZTogNS42NSxcclxuICB9LFxyXG59KTtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbE5hdk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuZXhwb3J0IGNvbnN0IG5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuZXhwb3J0IGNvbnN0IF9zdGF0ZSA9IHtcclxuICBhY3RpdmVTZWN0aW9uOiBudWxsLFxyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lOiBudWxsLFxyXG4gIGFjdGl2ZVZpZDogbnVsbCxcclxuICB3ZWJmbG93QnJlYWtwb2ludDogbnVsbCxcclxuICBzdGFydFRpbWU6IDAsXHJcbiAgZW5kVGltZTogMCxcclxuICBwYXVzZUZsYWc6IGZhbHNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9UaGUgJ1N0cmljdCcgU2VsZWN0b3JcclxuZXhwb3J0IGNvbnN0IHF1ZXJ5ID0gZnVuY3Rpb24gKHNlbGVjdG9yLCBjb250ZXh0ID0gZG9jdW1lbnQpIHtcclxuICBjb25zdCBlbCA9IGNvbnRleHQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgaWYgKCFlbCkge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKFxyXG4gICAgICBgQ1JJVElDQUwgVUkgRVJST1I6IFwiJHtzZWxlY3Rvcn1cIiBpcyBtaXNzaW5nIGZyb20gdGhlIERPTS5gLFxyXG4gICAgKTtcclxuICB9XHJcbiAgcmV0dXJuIGVsO1xyXG59O1xyXG4vL1RoZSAnU3RyaWN0JyBNdWx0LVNlbGVjdG9yXHJcbmV4cG9ydCBjb25zdCBxdWVyeUFsbCA9IGZ1bmN0aW9uIChzZWxlY3RvciwgY29udGV4dCA9IGRvY3VtZW50KSB7XHJcbiAgY29uc3QgZWxlbWVudHMgPSBjb250ZXh0LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xyXG4gIGlmIChlbGVtZW50cy5sZW5ndGggPT09IDApIHtcclxuICAgIHRocm93IG5ldyBFcnJvcihcclxuICAgICAgYENSSVRJQ0FMIFVJIEVSUk9SOiBObyBlbGVtZW50cyBtYXRjaGluZyBcIiR7c2VsZWN0b3J9XCIgZm91bmQuYCxcclxuICAgICk7XHJcbiAgfVxyXG4gIHJldHVybiBlbGVtZW50cztcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldFZpZFR5cGUgPSBmdW5jdGlvbiAodmlkZW8pIHtcclxuICByZXR1cm4gdmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1RJTUVSKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIG5hdk1lbnUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gIG5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsTmF2TWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbk5hbWUsIGluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVTZWN0aW9uID0gdGFyZ2V0O1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxTZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxTZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLmFjdGl2ZVZpZDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLndlYmZsb3dCcmVha3BvaW50O1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0V2ViZmxvd0JyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBpZiAod2lkdGggPCA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlUG9ydHJhaXRcIjtcclxuICBpZiAod2lkdGggPj0gNDgwKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcIm1vYmlsZUxhbmRzY2FwZVwiO1xyXG4gIGlmICh3aWR0aCA+PSA3NjgpIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwidGFibGV0XCI7XHJcbiAgaWYgKHdpZHRoID49IDk5MikgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJkZXNrdG9wXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRTdGFydFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRFbmRUaW1lID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgX3N0YXRlLmVuZFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuc3JjID0gXCJcIjtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlc2V0QWxsU2VjdGlvblZpZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIGVsLnBhdXNlKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwbGF5UmFuZ2UgPSBmdW5jdGlvbiAodmlkZW9DdXJyZW50VGltZSkge1xyXG4gIGlmICghX3N0YXRlLmFjdGl2ZVZpZCkgcmV0dXJuO1xyXG4gIGNvbnN0IHZpZENvZGUgPSBfc3RhdGUuYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IF9zdGF0ZS5zdGFydFRpbWU7XHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcCBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICApO1xyXG4gIGNvbnN0IG1vbml0b3JUaW1lID0gKCkgPT4ge1xyXG4gICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gX3N0YXRlLmVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSBfc3RhdGUuZW5kVGltZTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gX3N0YXRlLmFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIF9zdGF0ZS5hY3RpdmVWaWQuc3JjICE9PSBkYXRhU3JjKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmxvYWQoKTtcclxuICB9XHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IHRhcmdldFN0YXJ0O1xyXG5cclxuICAgICAgLy8gMi4gVEhFIEZBSUwtU0FGRSBSRVZFQUxcclxuICAgICAgLy8gV2UgcG9sbCBmb3IgcGh5c2ljYWwgcGxheWhlYWQgbW92ZW1lbnQuIE9uY2UgaXQgbW92ZXMsXHJcbiAgICAgIC8vIHRoZSBcImJsYWNrIGJ1ZmZlclwiIGlzIGd1YXJhbnRlZWQgdG8gYmUgZ29uZS5cclxuICAgICAgY29uc3QgcG9sbEZvckZyYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFfc3RhdGUuYWN0aXZlVmlkLnBhdXNlZCkge1xyXG4gICAgICAgICAgLy8gSWYgc3RpbGwgYXQgdGFyZ2V0U3RhcnQgYnV0IHBsYXlpbmcsIGNoZWNrIGFnYWluIG5leHQgZnJhbWVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwb2xsRm9yRnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIGF3YWl0IF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gICAgICBwb2xsRm9yRnJhbWUoKTsgLy8gU3RhcnQgY2hlY2tpbmcgZm9yIHRoZSBmaXJzdCByZWFsIGZyYW1lXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIlBsYXliYWNrIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgIC8vIEZhbGxiYWNrOiBzaG93IHZpZGVvIGFueXdheSBpZiBwbGF5KCkgZmFpbHMgKGUuZy4gYXV0cGxheSBibG9ja2VkKVxyXG4gICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICAvLyBXYWl0IGZvciBkYXRhIChyZWFkeVN0YXRlIDMgaXMgSEFWRV9GVVRVUkVfREFUQSlcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5yZWFkeVN0YXRlID49IDMpIHtcclxuICAgIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcFwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKF9zdGF0ZS5wYXVzZUZsYWcpIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUucGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGJ0bldyYXBwZXJJbmRleCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB0b2dnbGVCdG5Ib3ZlckNsYXNzID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkICYmIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9PT0gXCJkZXNrdG9wXCIpXHJcbiAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZShcImhvdmVyZWRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnRCdG4gPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICBpZiAoIXNlY3Rpb24pIHNlY3Rpb24gPSBfc3RhdGUuYWN0aXZlU2VjdGlvbjtcclxuICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChidG4sIGJ0bkNsYXNzLCBhbGxCdG5zV3JhcHBlcikge1xyXG4gIGxldCBsb2NhbEluZGV4O1xyXG4gIGNvbnN0IGFsbEJ0bnMgPSBidG5cclxuICAgIC5jbG9zZXN0KGAuJHthbGxCdG5zV3JhcHBlcn1gKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2J0bkNsYXNzfWApO1xyXG4gIGFsbEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICBpZiAoZWwgPT09IGJ0bikgbG9jYWxJbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBsb2NhbEluZGV4O1xyXG59O1xyXG4iLCAiY2xhc3MgTmF2YmFyIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5uYXZNZW51ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIubmF2X21lbnVcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5uYXZCdG4gPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5uYXZfYnV0dG9uXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3MgPSB0aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5uYXZfbWVudV9saW5rXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24gPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKCdbZGF0YS1uYXYtc2VjdGlvbj1cInNlcXVlbmNlXCJdJywgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsTmF2RHJvcGRvd25zID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi5uYXZfbWVudV9kcm9wZG93blwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLW5hdi1kcm9wZG93blwiLCB0aGlzLm9wZW5OYXZEcm9wZG93bl0sXHJcbiAgICAgIFtcImNsb3NlLW5hdi1kcm9wZG93blwiLCB0aGlzLmNsb3NlTmF2RHJvcGRvd25dLFxyXG4gICAgICBbXCJ0b2dnbGUtbmF2LWRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlTmF2RHJvcGRvd25dLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaGFuZGxlRXZlbnQgPSBmdW5jdGlvbiAodHJpZ2dlciwgZXZlbnRBY3Rpb24pIHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xvc2VOYXZNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgY2xvc2VNb2JpbGVOYXZNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKFwibmF2TWVudU9wZW5cIiBpbiB0aGlzLm5hdk1lbnUuZGF0YXNldCkgdGhpcy5uYXZCdG4uY2xpY2soKTtcclxuICAgIHRoaXMubmF2TWVudS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBvcGVuTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayh0cmlnZ2VyKTtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgTmF2YmFyO1xyXG4iLCAiaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuXHJcbmNsYXNzIEZlYXR1cmVzIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0ID0gdGhpcy5nbG9iYWwucXVlcnkoXCIuYmxhY2tvdXRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnR4dC13cmFwXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIudmlkLXdyYXAuaW50cm9cIixcclxuICAgICAgdGhpcy5jb250YWluZXIsXHJcbiAgICApO1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdiA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFxyXG4gICAgICBcIi52aWQtd3JhcC5mZWF0dXJlc1wiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnBhdXNlLXdyYXBcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zID0gdGhpcy5nbG9iYWwucXVlcnkoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1idG5zXCIsXHJcbiAgICAgIHRoaXMuY29udGFpbmVyLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlRmVhdHVyZSA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbl0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZF0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkXSxcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gKGNsaWNrZWQsIGlzSW50cm8pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGlmIChjbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGlzSW50cm8pIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVGZWF0dXJlKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc0ludHJvVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzVmlkRGl2ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcGxheUZlYXR1cmVzSW50cm8gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICAvLyBMb2dpYzogRmluZCB0aGUgb25lIHRoYXQgaXNuJ3QgaGlkZGVuIChkaXNwbGF5OiBub25lKVxyXG4gICAgY29uc3QgYWxsSW50cm9zID1cclxuICAgICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc1ZpZERpdigpO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5mZWF0dXJlO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gKCkgPT4ge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBUSU1JTkcuVUkuQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwpO1xyXG4gICAgICB9LCBUSU1JTkcuVklERU8uVklEX0VORF9USU1FUik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHsgQVNTRVRTLCBWSUVXX1NUQVJUX0VORCB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmNvbnN0IEhPTUVfVklFVyA9IFwidmlldy0xXCI7XHJcbmNsYXNzIERhdGEge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmludHJvVGV4dCA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24td3JhcC10eHRcIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLm9wdHMtbWVudS1idG5cIiwgdGhpcy5jb250YWluZXIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmdsb2JhbC5xdWVyeShcIi5vcHRzLWRyb3Bkb3duXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWxsVmlld09wdEJ0bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLm9wdHMtbWVudS1saW5rXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmRpbW1lciA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLmRpbW1lclwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuZ2xvYmFsLnF1ZXJ5KFwiLnR4dC1pbWctYnRuXCIsIHRoaXMuY29udGFpbmVyKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIgPSB0aGlzLmdsb2JhbC5xdWVyeShcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLFxyXG4gICAgICB0aGlzLmNvbnRhaW5lcixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxEYXRhID0gWy4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmNvbXAtZGF0YS13cmFwXCIsIHRoaXMuY29udGFpbmVyKV07XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSBcInZpZXctMVwiO1xyXG4gICAgdGhpcy5sYXN0QWN0aXZlVmlldyA9IHsgdmlldzogXCJ2aWV3LTFcIiwgc3RhcnRUaW1lOiAwLCBlbmRUaW1lOiAwIH07XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbMF07XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IDA7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSAwO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMuc2V0QW5kUGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWRdLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXBdLFxyXG4gICAgICBbXCJvcGVuLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuc2hvd1ZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICAgIHRoaXMuYXNzZXRzTWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcInZpZXctMVwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMS1tcFwiLCBBU1NFVFNbXCJ2aWV3LTFcIl0ubW9iaWxlXSxcclxuICAgICAgW1widmlldy0yXCIsIEFTU0VUU1tcInZpZXctMlwiXS5kZXNrdG9wXSxcclxuICAgICAgW1widmlldy0yLW1wXCIsIEFTU0VUU1tcInZpZXctMlwiXS5tb2JpbGVdLFxyXG4gICAgICBbXCJ2aWV3LTNcIiwgQVNTRVRTW1widmlldy0zXCJdLmRlc2t0b3BdLFxyXG4gICAgICBbXCJ2aWV3LTMtbXBcIiwgQVNTRVRTW1widmlldy0zXCJdLm1vYmlsZV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0SW1nQnRuLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2hvd1ZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlVmlld09wdHNNZW51ID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDb21wSW1hZ2VPclRleHQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy50eHRPckltZyA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcInRleHRcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnR4dE9ySW1nO1xyXG4gIH07XHJcbiAgaGlkZUFsbERhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIilcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgfTtcclxuICBzaG93RGF0YSA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBpZiAoZWwuZGF0YXNldC5jb21wID09PSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5jb21wKVxyXG4gICAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gZWw7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlQmFja0J0biA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHJlc2V0QWxsRGF0YVNoZWV0cyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1kYXRhLWJvZHktd3JhcFwiKS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0TGFzdEFjdGl2ZVZpZXcgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQudmlldztcclxuICB9O1xyXG4gIHZpZXdCYWNrVG9TdGFydCA9ICgpID0+IHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXRWaWV3VmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ID09PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gSE9NRV9WSUVXICYmXHJcbiAgICAgIHRoaXMuYWN0aXZlVmlldyAhPT0gSE9NRV9WSUVXXHJcbiAgICApIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgYXNzZXQpO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCBhY3RpdmVWaWRXcmFwID0gYWN0aXZlVmlkLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICBsZXQgbWFwS2V5ID0gdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3O1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSBtYXBLZXkgKz0gXCItbXBcIjtcclxuICAgIGNvbnN0IGFzc2V0ID0gdGhpcy5hc3NldHNNYXAuZ2V0KG1hcEtleSk7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2Fzc2V0fVwiKWA7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheVZpZXdWaWQgPSAoY2xpY2tlZFZpZXdPcHRzQnRuKSA9PiB7XHJcbiAgICAvL3JldHVybiBpZiBjbGlja2VkIHZpZXcgc2FtZSBhcyBjdXJyZW50IHZpZXdcclxuICAgIGlmIChjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3ID09PSB0aGlzLmFjdGl2ZVZpZXcpIHJldHVybjtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC52aWV3ID09PSBjbGlja2VkVmlld09wdHNCdG4uZGF0YXNldC52aWV3LFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IGNsaWNrZWRWaWV3T3B0c0J0bjtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIHBvc3RlclxyXG4gICAgdGhpcy5zZXRBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgLy9wbGF5IHZpZFxyXG4gICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG4gPSBjbGlja2VkQ3RybEJ0bjtcclxuICAgIC8vcGxheVxyXG4gICAgdGhpcy5zZXREYXRhVmlkU3RhcnRBbmRFbmQodGhpcy5hY3RpdmVDdHJsQnRuKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTsgLy9yZW1vdmVzIGJsYWNrb3V0IGluIGdsb2JhbC5wbGF5UmFuZ2VcclxuICB9O1xyXG4gIHBsYXlEYXRhVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZSh0aGlzLnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKHRoaXMuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnZpZXdWaWRGbGFnICYmICF0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoSE9NRV9WSUVXKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgICB0aGlzLnBsYXlEYXRhVmlkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcbiAgICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgICAgY29uc3QgYWN0aXZlVmlkV3JhcCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBcIik7XHJcbiAgICAgIGlmIChhY3RpdmVWaWRXcmFwKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBcIm5vbmVcIjtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwiYmxhY2tcIjtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgYmFja1RvVmlld0Zyb21Db21wID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG5cclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gIH07XHJcbiAgaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0FjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0N0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC52aWV3ID09PSB0aGlzLmFjdGl2ZVZpZXcsXHJcbiAgICApO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7XHJcbiIsICJjbGFzcyBTZXF1ZW5jZSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5nbG9iYWwucXVlcnkoXCIucGF1c2Utd3JhcFwiLCB0aGlzLmNvbnRhaW5lcik7XHJcbiAgICB0aGlzLmFsbFR4dFdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi50eHQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxJbnRyb1R4dCA9IFtcclxuICAgICAgLi4udGhpcy5nbG9iYWwucXVlcnlBbGwoXCIuaW50cm8tdHh0LXdyYXBcIiwgdGhpcy5jb250YWluZXIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLmFjdGlvbi1oZWFkaW5nXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmdsb2JhbC5xdWVyeUFsbChcIi52aWQtd3JhcFwiLCB0aGlzLmNvbnRhaW5lciksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuZ2xvYmFsLnF1ZXJ5QWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIsIHRoaXMuY29udGFpbmVyKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmlzRHJvcGRvd24gPSBmYWxzZTtcclxuICAgIHRoaXMuYWN0aXZlU2VxdWVuY2UgPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVTZWN0aW9uVHh0ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlkV3JhcHBlciA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID0gbnVsbDtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZS1pbmRleFwiLCB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlRHJvcGRvd25dLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWRdLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZF0sXHJcbiAgICAgIFtcImJ0bi1ob3ZlcmVkXCIsIHRoaXMuZ2xvYmFsLnRvZ2dsZUJ0bkhvdmVyQ2xhc3MuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IChjbGlja2VkKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLmFjdGl2ZVNlcXVlbmNlID0gY2xpY2tlZC5kYXRhc2V0LnNlcXVlbmNlO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5oaWRlQWxsSW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmhpZGVBbGxBY3Rpb25IZWFkaW5ncygpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVHh0V3JhcHBlcigpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlVmlkV3JhcHBlcigpO1xyXG4gICAgdGhpcy5zZXRBbmRTaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlVHh0V3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5pbnRyby10eHQtd3JhcFwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmICghdGhpcy5pc0Ryb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICAgIGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIikucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9saW5rXCIpLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuaXNEcm9wZG93biA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VEcm9wZG93biA9IChjbGlja2VkKSA9PiB7XHJcbiAgICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bkljb25DbGlja2VkXCIsIHsgZGV0YWlsOiBjbGlja2VkIH0pLFxyXG4gICAgICApO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5pc0Ryb3Bkb3duID0gdHJ1ZTtcclxuICAgICAgdGhpcy5pbml0U2VjdGlvbihjbGlja2VkKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVUeHRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxUeHRXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIgPSB0aGlzLmFsbFR4dFdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVR4dFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVWaWRXcmFwcGVyID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKChlbCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKSk7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIgPSB0aGlzLmFsbFZpZFdyYXBwZXJzLmZpbmQoXHJcbiAgICAgIChlbCkgPT4gZWwuZGF0YXNldC5zZXF1ZW5jZSA9PT0gdGhpcy5hY3RpdmVTZXF1ZW5jZSxcclxuICAgICk7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZFdyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNldEFuZFNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goKGVsKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VxdWVuY2UgPT09IHRoaXMuYWN0aXZlU2VxdWVuY2UsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuYWxsSW50cm9UeHQuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUFsbEFjdGlvbkhlYWRpbmdzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IChjbGlja2VkQ3RybEJ0bikgPT4ge1xyXG4gICAgdGhpcy5jbGVhclNlcXVlbmNlVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmludHJvLXR4dC13cmFwXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVUeHRXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLmFjdGlvbi1oZWFkaW5nXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gKCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UodGhpcy5wYXVzZVdyYXBwZXIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJTZXF1ZW5jZVRpbWVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXF1ZW5jZVRpbWVyKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTZXF1ZW5jZTtcclxuIiwgImNvbnNvbGUubG9nKFwiVEVTVC0yXCIpO1xyXG5pbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBnbG9iYWwgZnJvbSBcIi4vMC1nbG9iYWxcIjtcclxuaW1wb3J0IE5hdmJhckNsYXNzIGZyb20gXCIuLzAtbmF2YmFyXCI7XHJcbmltcG9ydCBGZWF0dXJlc0NsYXNzIGZyb20gXCIuLzEtZmVhdHVyZXNcIjtcclxuaW1wb3J0IERhdGFDbGFzcyBmcm9tIFwiLi8yLWRhdGFcIjtcclxuaW1wb3J0IFNlcXVlbmNlQ2xhc3MgZnJvbSBcIi4vMy1zZXF1ZW5jZVwiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdCBjYWxsIChmdW5jdGlvbiBhdCBib3R0b20pLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGluaXQoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5jb25zdCBuYXZDb250YWluZXIgPSBnbG9iYWwucXVlcnkoXCIubmF2X2NvbXBvbmVudFwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IGZlYXR1cmVzQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZmVhdHVyZXNcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBkYXRhQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uZGF0YVwiLCBkb2N1bWVudCk7XHJcbmNvbnN0IHNlcXVlbmNlQ29udGFpbmVyID0gZ2xvYmFsLnF1ZXJ5KFwiLnNlY3Rpb24uc2VxdWVuY2VcIiwgZG9jdW1lbnQpO1xyXG5jb25zdCBuYXZiYXIgPSBuZXcgTmF2YmFyQ2xhc3MoZ2xvYmFsLCBuYXZDb250YWluZXIpO1xyXG5jb25zdCBmZWF0dXJlcyA9IG5ldyBGZWF0dXJlc0NsYXNzKGdsb2JhbCwgZmVhdHVyZXNDb250YWluZXIpO1xyXG5jb25zdCBkYXRhID0gbmV3IERhdGFDbGFzcyhnbG9iYWwsIGRhdGFDb250YWluZXIpO1xyXG5jb25zdCBzZXF1ZW5jZSA9IG5ldyBTZXF1ZW5jZUNsYXNzKGdsb2JhbCwgc2VxdWVuY2VDb250YWluZXIpO1xyXG5jb25zdCBTRUNUSU9OUyA9IHtcclxuICBuYXZiYXI6IG5hdmJhcixcclxuICBmZWF0dXJlczogZmVhdHVyZXMsXHJcbiAgZGF0YTogZGF0YSxcclxuICBzZXF1ZW5jZTogc2VxdWVuY2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU5BVi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuICBpZiAoXCJpc0Ryb3Bkb3duSWNvblwiIGluIGNsaWNrZWQuZGF0YXNldCkge1xyXG4gICAgLy8gUG9seW1vcnBoaWMgY2FsbCBvbmx5IC0ganVzdCB0b2dnbGluZyBkcm9wZG93blxyXG4gICAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbiAgICByZXR1cm47XHJcbiAgfVxyXG4gIC8vZG9udCBmbGFzaCBpZiBvbmx5IGNsaWNraW5nIGRyb3Bkb3duXHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgLy8yLiBTdGF0ZSB1cGRhdGVcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihhY3RpdmVTZWN0aW9uKTtcclxuICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgbmF2YmFyLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vL0N1c3RvbSBldmVudDogbmF2IGRyb3Bkb3duIGljb24gY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duSWNvbkNsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLnRvZ2dsZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IG5hdiBkcm9wZG93biBvcHQgY2xpY2tlZFxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImRyb3Bkb3duT3B0Q2xpY2tlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLmRldGFpbDtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBuYXZiYXIuY2xvc2VOYXZEcm9wZG93bihjbGlja2VkKTtcclxuICBuYXZiYXIuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1NQUlOIEJPRFkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW92ZXJBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW91dC1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIC8vIElmIHRoZSBtb3VzZSBtb3ZlZCB0byBhIGNoaWxkIG9mIHRoZSBzYW1lIGJ1dHRvbiwgZG9uJ3QgdHJpZ2dlciB0aGUgXCJFeGl0XCJcclxuICBpZiAoaG92ZXJlZC5jb250YWlucyhlLnJlbGF0ZWRUYXJnZXQpKSByZXR1cm47XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBudWxsO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tVklEUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vdmlkIGVuZGVkXHJcbmdsb2JhbC5hbGxWaWRzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICBjb25zdCBlbmRlZFZpZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIudmlkXCIpO1xyXG4gICAgaWYgKCFlbmRlZFZpZCkgcmV0dXJuO1xyXG4gICAgY29uc3QgdmlkU2VjdGlvbiA9IGVuZGVkVmlkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1t2aWRTZWN0aW9uXTtcclxuICAgIHRhcmdldE1vZHVsZS52aWRFbmQoKTtcclxuICB9KTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXRcclxuY29uc3QgaW5pdCA9IGZ1bmN0aW9uICgpIHtcclxuICBzZXR1cExhenlMb2FkaW5nKCk7XHJcbiAgZ2xvYmFsLnNldFdlYmZsb3dCcmVha3BvaW50KCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgbmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcImZlYXR1cmVzXCIpO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBmZWF0dXJlcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBuYXZDb250YWluZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGZlYXR1cmVzLmluaXRTZWN0aW9uKG51bGwsIChpc0ludHJvID0gdHJ1ZSkpO1xyXG4gIH0sIFRJTUlORy5VSS5TVEFSVF9VSV9SRVZFQUwpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbn07XHJcbmNvbnN0IHNldHVwTGF6eUxvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYWxsTGF6eVZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XHJcbiAgICByb290OiBudWxsLFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHhcIixcclxuICAgIHRocmVzaG9sZDogMC4xLFxyXG4gIH07XHJcbiAgY29uc3QgdmlkZW9PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCB2aWRlbyA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgY29uc3Qgc291cmNlcyA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XHJcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIC8vIC0tLSBMT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBVc2UgZGF0YS1zcmMgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2Uga2VlcCBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSB8fCBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGRhdGFTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IGRhdGFTcmM7XHJcbiAgICAgICAgICAgIC8vIEtlZXAgZGF0YS1zcmMgYXR0cmlidXRlIHNvIHdlIGNhbiBmaW5kIHRoZSBVUkwgYWdhaW4gbGF0ZXJcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGRhdGFTcmMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAtLS0gVU5MT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIC8vIENsZWFycyB0aGUgaW50ZXJuYWwgbG9ncyBmb3IgdXNlciBpbnRlcmFjdGlvbnMgYW5kIHJlc291cmNlIGxvYWRzXHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyUmVzb3VyY2VUaW1pbmdzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgICAgIFJlc2V0U2VjdGlvbih2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikpO1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIE1vdmUgc3JjIGJhY2sgdG8gZGF0YS1zcmMgYW5kIGVtcHR5IHRoZSBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgY3VycmVudFNyYyk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBcIlwiOyAvLyBUaGlzIHN0b3BzIHRoZSB2aWRlbyBmcm9tIGJ1ZmZlcmluZ1xyXG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlQXR0cmlidXRlKFwic3JjXCIpOyAvLyBGdWxseSBjbGVhciBhdHRyaWJ1dGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgYnJvd3NlciB0byBkdW1wIHRoZSB2aWRlbyBkYXRhIGZyb20gbWVtb3J5XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBvYnNlcnZlck9wdGlvbnMpO1xyXG4gIGFsbExhenlWaWRzLmZvckVhY2goKHZpZCkgPT4gdmlkZW9PYnNlcnZlci5vYnNlcnZlKHZpZCkpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL1JFU0VUIFZJRFMgQUZURVIgVU5MT0FESU5HLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgY29uc3QgUmVzZXRTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICAgIGlmICghc2VjdGlvbikgcmV0dXJuOyAvL2hlbHBzIHByZXZlbnQgY3Jhc2hlc1xyXG4gICAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgIGVsLnBhdXNlKCk7XHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoc2VjdGlvbik7XHJcbiAgfTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBTyxNQUFNLFNBQVMsT0FBTyxPQUFPO0FB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
