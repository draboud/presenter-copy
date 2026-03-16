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
  var getVidType = (video) => {
    return video.closest(".section").classList[1];
  };
  var flashBlackout = function() {
    blackout.classList.remove("off");
    setTimeout(function() {
      blackout.classList.add("off");
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
                  blackout.classList.add("off");
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
    _state.activeSection.querySelector(".pause-wrapper").style.pointerEvents = "none";
  };
  var enablePause = function() {
    _state.activeSection.querySelector(".pause-wrapper").style.pointerEvents = "auto";
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
      if ("navMenuOpen" in this.navMenu.dataset) this.navBtn?.click();
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
      this.activeFeature = null;
      this.featuresTimer = null;
      this.featuresEndisCancelled = false;
      this.eventMap = /* @__PURE__ */ new Map([
        ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)],
        ["open-features", this.initSection],
        ["play-ctrl-vid", this.playCtrlBtnVid],
        ["pause-ctrl-vid", this.pauseCtrlVid]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = (clicked, index, introFlag) => {
      this.global.blackout.classList.add("off");
      this.featuresBlackout?.classList.add("off");
      this.pauseWrapper?.classList.remove("active");
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
    hideAllText = () => {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showIntroText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === "intro")?.classList.add("active");
    };
    showFeatureText = () => {
      this.featuresAllText.find((el) => el.dataset.textContent === this.activeFeature)?.classList.add("active");
    };
    showFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv?.classList.add("active");
    };
    hideFeaturesIntroVidDiv = () => {
      this.featuresIntroVidDiv?.classList.remove("active");
    };
    showFeaturesVidDiv = () => {
      this.featuresVidDiv.classList.add("active");
    };
    hideFeaturesVidDiv = () => {
      this.featuresVidDiv.classList.remove("active");
    };
    playFeaturesIntro = () => {
      this.featuresBlackout?.classList.add("off");
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      const allIntros = this.featuresIntroVidDiv?.querySelectorAll(".vid-code-intro");
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
      this.pauseWrapper?.classList.remove("active");
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
      this.global.blackout.classList.remove("off");
      this.global.playRange();
    };
    pauseCtrlVid = () => {
      this.global.togglePause();
      this.pauseWrapper?.classList.toggle("active");
    };
    vidEnd = () => {
      if (this.featuresEndisCancelled === false) {
        this.global.disableSectionCtrlBtnEvents();
        this.global.disablePause();
        this.pauseWrapper?.classList.remove("active");
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout?.classList.remove("off");
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
      this.introText = this.container.querySelector(".section-wrap-txt");
      this.startTime;
      this.endTime;
      this.viewVidFlag;
      this.viewOptsBtn = this.container.querySelector(".opts-menu_btn");
      this.viewOptsMenu = this.container.querySelector(".opts-dropdown");
      this.allViewOptBtns = [
        ...this.container.querySelectorAll(".opts-menu_link")
      ];
      this.activeViewBtn = null;
      this.activeView = "view-1";
      this.lastActiveView = { view: "view-1", startTime: 0, endTime: 0 };
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
      this.allCtrlBtnWrappers = [
        ...this.container.querySelectorAll(".section-wrap-btns")
      ];
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
      this.activeCtrlBtn = null;
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-data", this.initSection],
        ["play-ctrl-vid", this.setAndPlayCtrlBtnVid],
        ["play-view-vid", this.setAndPlayViewVid],
        ["back-to-view", this.backToViewFromComp],
        ["open-view-opts-menu", this.showViewOptsMenu],
        ["close-view-opts-menu", this.hideViewOptsMenu],
        ["toggle-img-txt", this.showCompImageOrText]
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
      this.dimmer?.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideBackBtn();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText?.classList.add("active");
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
      this.viewOptsMenu?.classList.add("active");
    };
    hideViewOptsMenu = () => {
      this.viewOptsMenu?.classList.remove("active");
    };
    showCompImageOrText = () => {
      if (this.txtOrImg === "image") {
        this.txtOrImg = "text";
        this.dimmer?.classList.remove("active");
        this.activeDataSheet?.classList.remove("active");
      } else {
        this.txtOrImg = "image";
        this.dimmer?.classList.add("active");
        this.activeDataSheet?.classList.add("active");
      }
      this.activeDataWrapper.querySelector(".txt-img-btn").textContent = this.txtOrImg;
    };
    hideAllData = () => {
      this.deactivateAllDataWrappers();
      this.activeDataWrapper?.querySelectorAll(".comp-data-wrap").forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showData = () => {
      this.activeDataWrapper?.classList.add("active");
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
      this.allData?.forEach(function(el) {
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
      const activeVidWrap = activeVid.closest(".vid-wrapper");
      let mapKey = this.lastActiveView.view;
      if (activeVid.parentElement.classList.contains("mp")) mapKey += "-mp";
      const asset = this.assetsMap.get(mapKey);
      activeVidWrap.style.backgroundImage = `url("${asset}")`;
    };
    deactivateAllDataWrappers = () => {
      this.allDataWrappers?.forEach((el) => {
        el.classList.remove("active");
      });
    };
    setAndPlayViewVid = (clickedViewOptsBtn) => {
      if (clickedViewOptsBtn.dataset.view === this.activeView) return;
      this.viewOptsMenu?.classList.remove("active");
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
      this.introText?.classList.remove("active");
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
        this.introText?.classList.add("active");
        this.global.enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView(HOME_VIEW);
        this.setDataVidBackgroundImg();
        this.setViewVidStartAndEnd();
        this.playDataVid();
      } else {
        this.dimmer?.classList.add("active");
        this.activeDataWrapper?.querySelector(".txt-img-btn").classList.add("active");
        this.showData();
        this.showBackBtn();
        const activeVidWrap = this.global.getActiveVid()?.closest(".vid-wrapper");
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
      this.activeDataWrapper?.querySelector(".txt-img-btn").classList.remove("active");
      this.hideAllData();
      this.resetAllDataSheets();
      this.dimmer?.classList.remove("active");
      this.introText?.classList.add("active");
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
      this.allCtrlBtnWrappers?.forEach((el) => {
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
  console.log("BRANCH: newModules-6");
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
    const activeSection = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection];
    const action = clicked.dataset.clickAction;
    blackout.classList.remove("off");
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctMVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NzA3YzdiNzRhNTI0ZjlmNF9EYXRhLVZpZXctMS53ZWJwXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIixcclxuICB9LFxyXG4gIFwidmlldy0yXCI6IHtcclxuICAgIGRlc2t0b3A6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg4NTE0MTkyZGQxMThmOTJlX0RhdGEtVmlldy0yLndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiLFxyXG4gIH0sXHJcbiAgXCJ2aWV3LTNcIjoge1xyXG4gICAgZGVza3RvcDpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODY2M2Q0ODAwY2M1Zjk5MzVfRGF0YS1WaWV3LTMud2VicFwiLFxyXG4gICAgbW9iaWxlOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCIsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBWSUVXX1NUQVJUX0VORCA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFwidmlldy0xXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMCxcclxuICAgIGVuZFRpbWU6IDAsXHJcbiAgfSxcclxuICBcInZpZXctMlwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDEuNDgsXHJcbiAgICBlbmRUaW1lOiAyLjY5LFxyXG4gIH0sXHJcbiAgXCJ2aWV3LTNcIjoge1xyXG4gICAgc3RhcnRUaW1lOiA0LjQ0LFxyXG4gICAgZW5kVGltZTogNS42NSxcclxuICB9LFxyXG59KTtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbE5hdk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuZXhwb3J0IGNvbnN0IG5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuZXhwb3J0IGNvbnN0IF9zdGF0ZSA9IHtcclxuICBhY3RpdmVTZWN0aW9uOiBudWxsLFxyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lOiBudWxsLFxyXG4gIGFjdGl2ZVZpZDogbnVsbCxcclxuICB3ZWJmbG93QnJlYWtwb2ludDogbnVsbCxcclxuICBzdGFydFRpbWU6IDAsXHJcbiAgZW5kVGltZTogMCxcclxuICBwYXVzZUZsYWc6IGZhbHNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IGdldFZpZFR5cGUgPSAodmlkZW8pID0+IHtcclxuICByZXR1cm4gdmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1RJTUVSKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIG5hdk1lbnUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gIG5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsTmF2TWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbk5hbWUsIGluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVTZWN0aW9uID0gdGFyZ2V0O1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxTZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxTZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLmFjdGl2ZVZpZDtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRXZWJmbG93QnJlYWtwb2ludCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLndlYmZsb3dCcmVha3BvaW50O1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0V2ViZmxvd0JyZWFrcG9pbnQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3Qgd2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcclxuICBpZiAod2lkdGggPCA0ODApIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwibW9iaWxlUG9ydHJhaXRcIjtcclxuICBpZiAod2lkdGggPj0gNDgwKSBfc3RhdGUud2ViZmxvd0JyZWFrcG9pbnQgPSBcIm1vYmlsZUxhbmRzY2FwZVwiO1xyXG4gIGlmICh3aWR0aCA+PSA3NjgpIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9IFwidGFibGV0XCI7XHJcbiAgaWYgKHdpZHRoID49IDk5MikgX3N0YXRlLndlYmZsb3dCcmVha3BvaW50ID0gXCJkZXNrdG9wXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRTdGFydFRpbWUgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICBfc3RhdGUuc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRFbmRUaW1lID0gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgX3N0YXRlLmVuZFRpbWUgPSBuZXdWYWx1ZTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuc3JjID0gXCJcIjtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlc2V0QWxsU2VjdGlvblZpZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIGVsLnBhdXNlKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwbGF5UmFuZ2UgPSBmdW5jdGlvbiAodmlkZW9DdXJyZW50VGltZSkge1xyXG4gIGNvbnN0IHZpZENvZGUgPSBfc3RhdGUuYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IF9zdGF0ZS5zdGFydFRpbWU7XHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcHBlciBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICApO1xyXG4gIGNvbnN0IG1vbml0b3JUaW1lID0gKCkgPT4ge1xyXG4gICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gX3N0YXRlLmVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSBfc3RhdGUuZW5kVGltZTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gX3N0YXRlLmFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIF9zdGF0ZS5hY3RpdmVWaWQuc3JjICE9PSBkYXRhU3JjKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmxvYWQoKTtcclxuICB9XHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IHRhcmdldFN0YXJ0O1xyXG5cclxuICAgICAgLy8gMi4gVEhFIEZBSUwtU0FGRSBSRVZFQUxcclxuICAgICAgLy8gV2UgcG9sbCBmb3IgcGh5c2ljYWwgcGxheWhlYWQgbW92ZW1lbnQuIE9uY2UgaXQgbW92ZXMsXHJcbiAgICAgIC8vIHRoZSBcImJsYWNrIGJ1ZmZlclwiIGlzIGd1YXJhbnRlZWQgdG8gYmUgZ29uZS5cclxuICAgICAgY29uc3QgcG9sbEZvckZyYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFfc3RhdGUuYWN0aXZlVmlkLnBhdXNlZCkge1xyXG4gICAgICAgICAgLy8gSWYgc3RpbGwgYXQgdGFyZ2V0U3RhcnQgYnV0IHBsYXlpbmcsIGNoZWNrIGFnYWluIG5leHQgZnJhbWVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwb2xsRm9yRnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIGF3YWl0IF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gICAgICBwb2xsRm9yRnJhbWUoKTsgLy8gU3RhcnQgY2hlY2tpbmcgZm9yIHRoZSBmaXJzdCByZWFsIGZyYW1lXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIlBsYXliYWNrIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgIC8vIEZhbGxiYWNrOiBzaG93IHZpZGVvIGFueXdheSBpZiBwbGF5KCkgZmFpbHMgKGUuZy4gYXV0cGxheSBibG9ja2VkKVxyXG4gICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICAvLyBXYWl0IGZvciBkYXRhIChyZWFkeVN0YXRlIDMgaXMgSEFWRV9GVVRVUkVfREFUQSlcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5yZWFkeVN0YXRlID49IDMpIHtcclxuICAgIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcHBlclwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKF9zdGF0ZS5wYXVzZUZsYWcpIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUucGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGJ0bldyYXBwZXJJbmRleCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCB0b2dnbGVCdG5Ib3ZlckNsYXNzID0gZnVuY3Rpb24gKGJ0bikge1xyXG4gIGlmIChfc3RhdGUuYWN0aXZlVmlkICYmIF9zdGF0ZS53ZWJmbG93QnJlYWtwb2ludCA9PT0gXCJkZXNrdG9wXCIpXHJcbiAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZShcImhvdmVyZWRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnRCdG4gPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICBpZiAoIXNlY3Rpb24pIHNlY3Rpb24gPSBfc3RhdGUuYWN0aXZlU2VjdGlvbjtcclxuICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChidG4sIGJ0bkNsYXNzLCBhbGxCdG5zV3JhcHBlcikge1xyXG4gIGxldCBsb2NhbEluZGV4O1xyXG4gIGNvbnN0IGFsbEJ0bnMgPSBidG5cclxuICAgIC5jbG9zZXN0KGAuJHthbGxCdG5zV3JhcHBlcn1gKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2J0bkNsYXNzfWApO1xyXG4gIGFsbEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICBpZiAoZWwgPT09IGJ0bikgbG9jYWxJbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBsb2NhbEluZGV4O1xyXG59O1xyXG4iLCAiY2xhc3MgTmF2YmFyIHtcclxuICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5uYXZNZW51ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuICAgIHRoaXMubmF2QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24gPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9kcm9wZG93blwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS1uYXYtZHJvcGRvd25cIiwgdGhpcy5jbG9zZU5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJ0b2dnbGUtbmF2LWRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlTmF2RHJvcGRvd24uYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoXCJuYXZNZW51T3BlblwiIGluIHRoaXMubmF2TWVudS5kYXRhc2V0KSB0aGlzLm5hdkJ0bj8uY2xpY2soKTtcclxuICB9O1xyXG4gIG9wZW5OYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGNsb3NlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB0b2dnbGVOYXZEcm9wZG93biA9IGZ1bmN0aW9uICh0cmlnZ2VyKSB7XHJcbiAgICB0cmlnZ2VyXHJcbiAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IE5hdmJhcjtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBGZWF0dXJlcyB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYmxhY2tvdXRcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0LXdyYXBwZXJcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2ID1cclxuICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5pbnRyb1wiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmZlYXR1cmVzXCIpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVGZWF0dXJlID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wiYnRuLWhvdmVyZWRcIiwgdGhpcy5nbG9iYWwudG9nZ2xlQnRuSG92ZXJDbGFzcy5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wib3Blbi1mZWF0dXJlc1wiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWRdLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSAoY2xpY2tlZCwgaW5kZXgsIGludHJvRmxhZykgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dD8uY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICBpZiAoY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmIChpbnRyb0ZsYWcpIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICA/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZVRleHQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dFxyXG4gICAgICAuZmluZCgoZWwpID0+IGVsLmRhdGFzZXQudGV4dENvbnRlbnQgPT09IHRoaXMuYWN0aXZlRmVhdHVyZSlcclxuICAgICAgPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXY/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdj8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlGZWF0dXJlc0ludHJvID0gKCkgPT4ge1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0Py5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNWaWREaXYoKTtcclxuICAgIC8vIExvZ2ljOiBGaW5kIHRoZSBvbmUgdGhhdCBpc24ndCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpXHJcbiAgICBjb25zdCBhbGxJbnRyb3MgPVxyXG4gICAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXY/LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gKGNsaWNrZWRDdHJsQnRuKSA9PiB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNWaWREaXYoKTtcclxuICAgIHRoaXMuYWN0aXZlRmVhdHVyZSA9IGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZmVhdHVyZTtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZVRleHQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXI/LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSAoKSA9PiB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICAgIHRoaXMucGF1c2VXcmFwcGVyPy5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLnJlc2V0QWxsU2VjdGlvblZpZHMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgICAgICAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMKTtcclxuICAgICAgfSwgVElNSU5HLlZJREVPLlZJRF9FTkRfVElNRVIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJGZWF0dXJlc1RpbWVycyA9ICgpID0+IHtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZWF0dXJlc1RpbWVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlcztcclxuIiwgImltcG9ydCB7IEFTU0VUUywgVklFV19TVEFSVF9FTkQgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5jb25zdCBIT01FX1ZJRVcgPSBcInZpZXctMVwiO1xyXG5jbGFzcyBEYXRhIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5pbnRyb1RleHQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC10eHRcIik7XHJcbiAgICB0aGlzLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZTtcclxuICAgIHRoaXMudmlld1ZpZEZsYWc7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRzLW1lbnVfYnRuXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtZHJvcGRvd25cIik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdHMtbWVudV9saW5rXCIpLFxyXG4gICAgXTtcclxuICAgIC8vIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0biA9IG51bGw7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSBcInZpZXctMVwiO1xyXG4gICAgdGhpcy5sYXN0QWN0aXZlVmlldyA9IHsgdmlldzogXCJ2aWV3LTFcIiwgc3RhcnRUaW1lOiAwLCBlbmRUaW1lOiAwIH07XHJcbiAgICB0aGlzLnZpZXdDaGFpbkZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kaW1tZXJcIik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0biA9IG51bGw7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZGF0YVwiLCB0aGlzLmluaXRTZWN0aW9uXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnNldEFuZFBsYXlDdHJsQnRuVmlkXSxcclxuICAgICAgW1wicGxheS12aWV3LXZpZFwiLCB0aGlzLnNldEFuZFBsYXlWaWV3VmlkXSxcclxuICAgICAgW1wiYmFjay10by12aWV3XCIsIHRoaXMuYmFja1RvVmlld0Zyb21Db21wXSxcclxuICAgICAgW1wib3Blbi12aWV3LW9wdHMtbWVudVwiLCB0aGlzLnNob3dWaWV3T3B0c01lbnVdLFxyXG4gICAgICBbXCJjbG9zZS12aWV3LW9wdHMtbWVudVwiLCB0aGlzLmhpZGVWaWV3T3B0c01lbnVdLFxyXG4gICAgICBbXCJ0b2dnbGUtaW1nLXR4dFwiLCB0aGlzLnNob3dDb21wSW1hZ2VPclRleHRdLFxyXG4gICAgXSk7XHJcbiAgICB0aGlzLmFzc2V0c01hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJ2aWV3LTFcIiwgQVNTRVRTW1widmlldy0xXCJdLmRlc2t0b3BdLFxyXG4gICAgICBbXCJ2aWV3LTEtbXBcIiwgQVNTRVRTW1widmlldy0xXCJdLm1vYmlsZV0sXHJcbiAgICAgIFtcInZpZXctMlwiLCBBU1NFVFNbXCJ2aWV3LTJcIl0uZGVza3RvcF0sXHJcbiAgICAgIFtcInZpZXctMi1tcFwiLCBBU1NFVFNbXCJ2aWV3LTJcIl0ubW9iaWxlXSxcclxuICAgICAgW1widmlldy0zXCIsIEFTU0VUU1tcInZpZXctM1wiXS5kZXNrdG9wXSxcclxuICAgICAgW1widmlldy0zLW1wXCIsIEFTU0VUU1tcInZpZXctM1wiXS5tb2JpbGVdLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSAoY2xpY2tlZCkgPT4ge1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgLy9zZXR0aW5nIFVJIGFuZCBsb2dpYy4uLlxyXG4gICAgdGhpcy5kaW1tZXI/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQ/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2hvd1ZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51Py5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZVZpZXdPcHRzTWVudSA9ICgpID0+IHtcclxuICAgIHRoaXMudmlld09wdHNNZW51Py5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lcj8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQ/LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgICB0aGlzLmRpbW1lcj8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQ/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnR4dE9ySW1nO1xyXG4gIH07XHJcbiAgaGlkZUFsbERhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgPy5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyPy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGlmIChlbC5kYXRhc2V0LmNvbXAgPT09IHRoaXMuYWN0aXZlQ3RybEJ0bi5kYXRhc2V0LmNvbXApXHJcbiAgICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBlbDtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhPy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1kYXRhLWJvZHktd3JhcFwiKS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0TGFzdEFjdGl2ZVZpZXcgPSAobmV3VmFsdWUpID0+IHtcclxuICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3ID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gdGhpcy5hY3RpdmVWaWV3QnRuLmRhdGFzZXQudmlldztcclxuICB9O1xyXG4gIHZpZXdCYWNrVG9TdGFydCA9ICgpID0+IHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXRWaWV3VmlkU3RhcnRBbmRFbmQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gdHJ1ZTtcclxuICAgIGlmIChcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ICE9PSBIT01FX1ZJRVcgJiZcclxuICAgICAgdGhpcy5hY3RpdmVWaWV3ID09PSBIT01FX1ZJRVdcclxuICAgICkge1xyXG4gICAgICB0aGlzLnZpZXdCYWNrVG9TdGFydCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBpZiAoXHJcbiAgICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gSE9NRV9WSUVXICYmXHJcbiAgICAgIHRoaXMuYWN0aXZlVmlldyAhPT0gSE9NRV9WSUVXXHJcbiAgICApIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZVZpZXdCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gKCkgPT4ge1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZyA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmFjdGl2ZUN0cmxCdG4uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9ICgpID0+IHtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpO1xyXG4gICAgaWYgKCFhY3RpdmVWaWQpIHJldHVybjtcclxuICAgIGxldCBtYXBLZXkgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIG1hcEtleSArPSBcIi1tcFwiO1xyXG4gICAgY29uc3QgYXNzZXQgPSB0aGlzLmFzc2V0c01hcC5nZXQobWFwS2V5KTtcclxuICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgYXNzZXQpO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSAoKSA9PiB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCBhY3RpdmVWaWRXcmFwID0gYWN0aXZlVmlkLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIik7XHJcbiAgICBsZXQgbWFwS2V5ID0gdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3O1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSBtYXBLZXkgKz0gXCItbXBcIjtcclxuICAgIGNvbnN0IGFzc2V0ID0gdGhpcy5hc3NldHNNYXAuZ2V0KG1hcEtleSk7XHJcbiAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke2Fzc2V0fVwiKWA7XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzID0gKCkgPT4ge1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnM/LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlWaWV3VmlkID0gKGNsaWNrZWRWaWV3T3B0c0J0bikgPT4ge1xyXG4gICAgLy9yZXR1cm4gaWYgY2xpY2tlZCB2aWV3IHNhbWUgYXMgY3VycmVudCB2aWV3XHJcbiAgICBpZiAoY2xpY2tlZFZpZXdPcHRzQnRuLmRhdGFzZXQudmlldyA9PT0gdGhpcy5hY3RpdmVWaWV3KSByZXR1cm47XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudT8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4udGV4dENvbnRlbnQgPSBjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5hbGxEYXRhV3JhcHBlcnMuZmluZChcclxuICAgICAgKGVsKSA9PiBlbC5kYXRhc2V0LnZpZXcgPT09IGNsaWNrZWRWaWV3T3B0c0J0bi5kYXRhc2V0LnZpZXcsXHJcbiAgICApO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3QnRuID0gY2xpY2tlZFZpZXdPcHRzQnRuO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgcG9zdGVyXHJcbiAgICB0aGlzLnNldEFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSAoY2xpY2tlZEN0cmxCdG4pID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgYmNrZ3JuZCBpbWcgdG8gY2hhbmdlIHRvIGNvbXAgdmlkIHN0YXJ0c1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5oaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0biA9IGNsaWNrZWRDdHJsQnRuO1xyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZCh0aGlzLmFjdGl2ZUN0cmxCdG4pO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpOyAvL3JlbW92ZXMgYmxhY2tvdXQgaW4gZ2xvYmFsLnBsYXlSYW5nZVxyXG4gIH07XHJcbiAgcGxheURhdGFWaWQgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmludHJvVGV4dD8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZSh0aGlzLnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKHRoaXMuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9ICgpID0+IHtcclxuICAgIGlmICh0aGlzLnZpZXdWaWRGbGFnICYmICF0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dD8uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KEhPTUVfVklFVyk7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaW1tZXI/LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgICA/LnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIilcclxuICAgICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5zaG93RGF0YSgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcbiAgICAgIC8vc2V0IGJja2dybmQgaW1nIHRvIGJsYWNrIHRvIHByZXZlbnQgZmxhc2ggb2YgaW1hZ2Ugd2hlbiBjaGFuZ2luZyBuYXZcclxuICAgICAgY29uc3QgYWN0aXZlVmlkV3JhcCA9IHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpPy5jbG9zZXN0KFwiLnZpZC13cmFwcGVyXCIpO1xyXG4gICAgICBpZiAoYWN0aXZlVmlkV3JhcCkge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gXCJub25lXCI7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcImJsYWNrXCI7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGJhY2tUb1ZpZXdGcm9tQ29tcCA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgID8ucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lcj8uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaW50cm9UZXh0Py5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICB9O1xyXG4gIGhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKS5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9ICgpID0+IHtcclxuICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycy5maW5kKFxyXG4gICAgICAoZWwpID0+IGVsLmRhdGFzZXQudmlldyA9PT0gdGhpcy5hY3RpdmVWaWV3LFxyXG4gICAgKTtcclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMgPSAoKSA9PiB7XHJcbiAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVycz8uZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcclxuIiwgImNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5hbGxJbnRyb1RleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW50cm8tdGV4dC13cmFwXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xpY2tlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcIm9wZW4tc2VxdWVuY2UtaW5kZXhcIiwgdGhpcy5hY3RpdmF0ZVNlY3Rpb25JbmRleC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIGlmICghdGhpcy5kcm9wZG93bkNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gMDtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoXHJcbiAgICAgICAgY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2xpbmtcIiksXHJcbiAgICAgICk7XHJcbiAgICAgIHdpbmRvdy5kaXNwYXRjaEV2ZW50KFxyXG4gICAgICAgIG5ldyBDdXN0b21FdmVudChcImRyb3Bkb3duT3B0Q2xpY2tlZFwiLCB7IGRldGFpbDogY2xpY2tlZCB9KSxcclxuICAgICAgKTtcclxuICAgICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuaGlkZUFsbEludHJvVGV4dCgpO1xyXG4gICAgdGhpcy5oaWRlQWxsQWN0aW9uSGVhZGluZ3MoKTtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0W3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlU2VxdWVuY2VWaWRXcmFwKHRoaXMuc2VxdWVuY2VJbmRleCk7XHJcbiAgfTtcclxuICBhY3RpdmF0ZVNlY3Rpb25JbmRleCA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICB0aGlzLmRyb3Bkb3duQ2xpY2tlZCA9IHRydWU7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSB0aGlzLmdsb2JhbC5nZXRMb2NhbEluZGV4KFxyXG4gICAgICBjbGlja2VkLFxyXG4gICAgICBcIm5hdl9tZW51X2xpbmstZHJvcGRvd25cIixcclxuICAgICAgXCJuYXZfbWVudV9kcm9wZG93blwiLFxyXG4gICAgKTtcclxuICAgIHRoaXMuaW5pdFNlY3Rpb24oY2xpY2tlZCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRTZXF1ZW5jZUluZGV4ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB0aGlzLnNlcXVlbmNlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gdmFsdWU7XHJcbiAgfTtcclxuICBoaWRlQWxsSW50cm9UZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxJbnRyb1RleHQuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUFsbEFjdGlvbkhlYWRpbmdzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVTZXF1ZW5jZVZpZFdyYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnNbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZVRpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0W3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3NbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UodGhpcy5wYXVzZVdyYXBwZXIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJTZXF1ZW5jZVRpbWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXF1ZW5jZVRpbWVyKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTZXF1ZW5jZTtcclxuIiwgImNvbnNvbGUubG9nKFwiQlJBTkNIOiBuZXdNb2R1bGVzLTZcIik7XHJcblxyXG5pbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBnbG9iYWwgZnJvbSBcIi4vMC1nbG9iYWxcIjtcclxuaW1wb3J0IE5hdmJhckNsYXNzIGZyb20gXCIuLzAtbmF2YmFyXCI7XHJcbmltcG9ydCBGZWF0dXJlc0NsYXNzIGZyb20gXCIuLzEtZmVhdHVyZXNcIjtcclxuaW1wb3J0IERhdGFDbGFzcyBmcm9tIFwiLi8yLWRhdGFcIjtcclxuaW1wb3J0IFNlcXVlbmNlQ2xhc3MgZnJvbSBcIi4vMy1zZXF1ZW5jZVwiO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdCBjYWxsIChmdW5jdGlvbiBhdCBib3R0b20pLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gIGluaXQoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5jb25zdCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9jb21wb25lbnRcIik7XHJcbmNvbnN0IGZlYXR1cmVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLmZlYXR1cmVzXCIpO1xyXG5jb25zdCBkYXRhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLmRhdGFcIik7XHJcbmNvbnN0IHNlcXVlbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLnNlcXVlbmNlXCIpO1xyXG5jb25zdCBuYXZiYXIgPSBuZXcgTmF2YmFyQ2xhc3MobmF2Q29udGFpbmVyKTtcclxuY29uc3QgZmVhdHVyZXMgPSBuZXcgRmVhdHVyZXNDbGFzcyhnbG9iYWwsIGZlYXR1cmVzQ29udGFpbmVyKTtcclxuY29uc3QgZGF0YSA9IG5ldyBEYXRhQ2xhc3MoZ2xvYmFsLCBkYXRhQ29udGFpbmVyKTtcclxuY29uc3Qgc2VxdWVuY2UgPSBuZXcgU2VxdWVuY2VDbGFzcyhnbG9iYWwsIHNlcXVlbmNlQ29udGFpbmVyKTtcclxuY29uc3QgU0VDVElPTlMgPSB7XHJcbiAgbmF2YmFyOiBuYXZiYXIsXHJcbiAgZmVhdHVyZXM6IGZlYXR1cmVzLFxyXG4gIGRhdGE6IGRhdGEsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1OQVYuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0Lm5hdlNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIC8vMS4gR2VuZXJpYyBjbGVhbnVwXHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgLy8yLiBTdGF0ZSB1cGRhdGVcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihhY3RpdmVTZWN0aW9uKTtcclxuICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoY2xpY2tlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgbmF2YmFyLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vL0N1c3RvbSBldmVudDogc2VxdWVuY2UgZHJvcGRvd24gb3B0IGNsaWNrZWRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS5kZXRhaWw7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgbmF2YmFyLmNsb3NlTmF2RHJvcGRvd24oY2xpY2tlZCk7XHJcbiAgbmF2YmFyLmNsb3NlTW9iaWxlTmF2TWVudSgpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTUFJTiBCT0RZLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gaG92ZXJlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGhvdmVyZWQuZGF0YXNldC5tb3VzZW91dEFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLVZJRFMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL3ZpZCBlbmRlZFxyXG5nbG9iYWwuYWxsVmlkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgY29uc3QgZW5kZWRWaWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLnZpZFwiKTtcclxuICAgIGlmICghZW5kZWRWaWQpIHJldHVybjtcclxuICAgIGNvbnN0IHZpZFNlY3Rpb24gPSBlbmRlZFZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gICAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbdmlkU2VjdGlvbl07XHJcbiAgICB0YXJnZXRNb2R1bGUudmlkRW5kKCk7XHJcbiAgfSk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0XHJcbmNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc2V0dXBMYXp5TG9hZGluZygpO1xyXG4gIGdsb2JhbC5zZXRXZWJmbG93QnJlYWtwb2ludCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIG5hdmJhci5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oXCJmZWF0dXJlc1wiKTtcclxuICBnbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgZmVhdHVyZXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgbmF2Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBmZWF0dXJlcy5pbml0U2VjdGlvbihudWxsLCBudWxsLCB0cnVlKTtcclxuICB9LCBUSU1JTkcuVUkuU1RBUlRfVUlfUkVWRUFMKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG59O1xyXG5jb25zdCBzZXR1cExhenlMb2FkaW5nID0gZnVuY3Rpb24gKCkge1xyXG4gIGNvbnN0IGFsbExhenlWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbiAgY29uc3Qgb2JzZXJ2ZXJPcHRpb25zID0ge1xyXG4gICAgcm9vdDogbnVsbCxcclxuICAgIHJvb3RNYXJnaW46IFwiMHB4XCIsXHJcbiAgICB0aHJlc2hvbGQ6IDAuMSxcclxuICB9O1xyXG4gIGNvbnN0IHZpZGVvT2JzZXJ2ZXIgPSBuZXcgSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKGVudHJpZXMpID0+IHtcclxuICAgIGVudHJpZXMuZm9yRWFjaCgoZW50cnkpID0+IHtcclxuICAgICAgY29uc3QgdmlkZW8gPSBlbnRyeS50YXJnZXQ7XHJcbiAgICAgIGNvbnN0IHNvdXJjZXMgPSB2aWRlby5xdWVyeVNlbGVjdG9yQWxsKFwic291cmNlXCIpO1xyXG4gICAgICBpZiAoZW50cnkuaXNJbnRlcnNlY3RpbmcpIHtcclxuICAgICAgICAvLyAtLS0gTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gVXNlIGRhdGEtc3JjIGlmIGF2YWlsYWJsZSwgb3RoZXJ3aXNlIGtlZXAgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgfHwgc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChkYXRhU3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBkYXRhU3JjO1xyXG4gICAgICAgICAgICAvLyBLZWVwIGRhdGEtc3JjIGF0dHJpYnV0ZSBzbyB3ZSBjYW4gZmluZCB0aGUgVVJMIGFnYWluIGxhdGVyXHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBkYXRhU3JjKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gLS0tIFVOTE9BRCBMT0dJQyAtLS1cclxuICAgICAgICAvLyBDbGVhcnMgdGhlIGludGVybmFsIGxvZ3MgZm9yIHVzZXIgaW50ZXJhY3Rpb25zIGFuZCByZXNvdXJjZSBsb2Fkc1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWVhc3VyZXMoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhclJlc291cmNlVGltaW5ncygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyTWFya3MoKTtcclxuICAgICAgICBSZXNldFNlY3Rpb24odmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpKTtcclxuICAgICAgICB2aWRlby5wYXVzZSgpO1xyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBNb3ZlIHNyYyBiYWNrIHRvIGRhdGEtc3JjIGFuZCBlbXB0eSB0aGUgY3VycmVudCBzcmNcclxuICAgICAgICAgIGNvbnN0IGN1cnJlbnRTcmMgPSBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGN1cnJlbnRTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGN1cnJlbnRTcmMpO1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gXCJcIjsgLy8gVGhpcyBzdG9wcyB0aGUgdmlkZW8gZnJvbSBidWZmZXJpbmdcclxuICAgICAgICAgICAgc291cmNlLnJlbW92ZUF0dHJpYnV0ZShcInNyY1wiKTsgLy8gRnVsbHkgY2xlYXIgYXR0cmlidXRlXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gRm9yY2UgdGhlIGJyb3dzZXIgdG8gZHVtcCB0aGUgdmlkZW8gZGF0YSBmcm9tIG1lbW9yeVxyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSwgb2JzZXJ2ZXJPcHRpb25zKTtcclxuICBhbGxMYXp5Vmlkcy5mb3JFYWNoKCh2aWQpID0+IHZpZGVvT2JzZXJ2ZXIub2JzZXJ2ZSh2aWQpKTtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9SRVNFVCBWSURTIEFGVEVSIFVOTE9BRElORy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGNvbnN0IFJlc2V0U2VjdGlvbiA9IGZ1bmN0aW9uIChzZWN0aW9uKSB7XHJcbiAgICBpZiAoIXNlY3Rpb24pIHJldHVybjsgLy9oZWxwcyBwcmV2ZW50IGNyYXNoZXNcclxuICAgIHNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICBlbC5wYXVzZSgpO1xyXG4gICAgfSk7XHJcbiAgICBnbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKHNlY3Rpb24pO1xyXG4gIH07XHJcbn07XHJcbiJdLAogICJtYXBwaW5n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
