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
    "view-a": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678707c7b74a524f9f4_Data-View-1.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066780bffd055268006d5_Data-View-1-MP.webp"
    },
    "view-b": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066788514192dd118f92e_Data-View-2.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678f95e3f4b347c21a6_Data-View-2-MP.webp"
    },
    "view-c": {
      desktop: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b06678663d4800cc5f9935_Data-View-3.webp",
      mobile: "https://cdn.prod.website-files.com/69b060726c9c10d0cebbf5f3/69b066785c709890f1f02679_Data-View-3-MP.webp"
    }
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
  var _state = {
    activeSection: null,
    activeSectionName: null,
    activeVid: null,
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
  function setActiveVid() {
    allVidCodes.forEach((el) => {
      if (el.offsetParent !== null) {
        _state.activeVid = el.querySelector(".vid");
      }
    });
  }
  function setStartTime(newValue) {
    _state.startTime = newValue;
  }
  function setEndTime(newValue) {
    _state.endTime = newValue;
  }
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
          }, TIMING.UI.BLACKOUT_WAIT_TO_REVEAL);
        }, TIMING.VIDEO.VID_END_TIMER);
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
      const activeVid = this.global.getActiveVid();
      if (!activeVid || activeVid.closest(".section").classList[1] !== "data")
        return;
      if (activeVid.parentElement.classList.contains("mp")) {
        if (newValue === "view-a") {
          activeVid.setAttribute("poster", ASSETS["view-a"].mobile);
        }
        if (newValue === "view-b") {
          activeVid.setAttribute("poster", ASSETS["view-b"].mobile);
        }
        if (newValue === "view-c") {
          activeVid.setAttribute("poster", ASSETS["view-c"].mobile);
        }
      } else {
        if (newValue === "view-a") {
          activeVid.setAttribute("poster", ASSETS["view-a"].desktop);
        }
        if (newValue === "view-b") {
          activeVid.setAttribute("poster", ASSETS["view-b"].desktop);
        }
        if (newValue === "view-c") {
          activeVid.setAttribute("poster", ASSETS["view-c"].desktop);
        }
      }
    };
    setDataVidBackgroundImg = function() {
      const activeVid = this.global.getActiveVid();
      const activeVidWrap = activeVid.closest(".vid-wrapper");
      if (activeVid.parentElement.classList.contains("mp")) {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-a"].mobile}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-b"].mobile}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-c"].mobile}")`;
        }
      } else {
        if (this.lastActiveView.view === "view-a") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-a"].desktop}")`;
        }
        if (this.lastActiveView.view === "view-b") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-b"].desktop}")`;
        }
        if (this.lastActiveView.view === "view-c") {
          activeVidWrap.style.backgroundImage = `url("${ASSETS["view-c"].desktop}")`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFRJTUlORyA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFVJOiB7XHJcbiAgICBTVEFSVF9VSV9SRVZFQUw6IDE1MDAsXHJcbiAgICBCTEFDS09VVF9USU1FUjogMjAwLFxyXG4gICAgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUw6IDUwLFxyXG4gIH0sXHJcbiAgVklERU86IHtcclxuICAgIFZJRF9FTkRfVElNRVI6IDE1MDAsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBBU1NFVFMgPSBPYmplY3QuZnJlZXplKHtcclxuICBcInZpZXctYVwiOiB7XHJcbiAgICBkZXNrdG9wOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NzA3YzdiNzRhNTI0ZjlmNF9EYXRhLVZpZXctMS53ZWJwXCIsXHJcbiAgICBtb2JpbGU6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIixcclxuICB9LFxyXG4gIFwidmlldy1iXCI6IHtcclxuICAgIGRlc2t0b3A6XHJcbiAgICAgIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg4NTE0MTkyZGQxMThmOTJlX0RhdGEtVmlldy0yLndlYnBcIixcclxuICAgIG1vYmlsZTpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiLFxyXG4gIH0sXHJcbiAgXCJ2aWV3LWNcIjoge1xyXG4gICAgZGVza3RvcDpcclxuICAgICAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODY2M2Q0ODAwY2M1Zjk5MzVfRGF0YS1WaWV3LTMud2VicFwiLFxyXG4gICAgbW9iaWxlOlxyXG4gICAgICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCIsXHJcbiAgfSxcclxufSk7XHJcbmV4cG9ydCBjb25zdCBWSUVXX1NUQVJUX0VORCA9IE9iamVjdC5mcmVlemUoe1xyXG4gIFwidmlldy1hXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMCxcclxuICAgIGVuZFRpbWU6IDAsXHJcbiAgfSxcclxuICBcInZpZXctYlwiOiB7XHJcbiAgICBzdGFydFRpbWU6IDEuNDgsXHJcbiAgICBlbmRUaW1lOiAyLjY5LFxyXG4gIH0sXHJcbiAgXCJ2aWV3LWNcIjoge1xyXG4gICAgc3RhcnRUaW1lOiA0LjQ0LFxyXG4gICAgZW5kVGltZTogNS42NSxcclxuICB9LFxyXG59KTtcclxuIiwgImltcG9ydCB7IFRJTUlORyB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmV4cG9ydCBjb25zdCBuYXZNZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbE5hdk1lbnVMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuZXhwb3J0IGNvbnN0IG5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuZXhwb3J0IGNvbnN0IF9zdGF0ZSA9IHtcclxuICBhY3RpdmVTZWN0aW9uOiBudWxsLFxyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lOiBudWxsLFxyXG4gIGFjdGl2ZVZpZDogbnVsbCxcclxuICBzdGFydFRpbWU6IDAsXHJcbiAgZW5kVGltZTogMCxcclxuICBwYXVzZUZsYWc6IGZhbHNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IGdldFZpZFR5cGUgPSAodmlkZW8pID0+IHtcclxuICByZXR1cm4gdmlkZW8uY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1RJTUVSKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gIG5hdk1lbnUuc3R5bGUucG9pbnRlckV2ZW50cyA9IFwiYXV0b1wiO1xyXG4gIG5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYWxsTmF2TWVudUxpbmtzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHNldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbk5hbWUsIGluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zKCk7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIF9zdGF0ZS5hY3RpdmVTZWN0aW9uID0gdGFyZ2V0O1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVBbGxTZWN0aW9ucyA9IGZ1bmN0aW9uICgpIHtcclxuICBhbGxTZWN0aW9ucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gX3N0YXRlLmFjdGl2ZVZpZDtcclxufTtcclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVZpZCgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWRcIik7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldFN0YXJ0VGltZShuZXdWYWx1ZSkge1xyXG4gIF9zdGF0ZS5zdGFydFRpbWUgPSBuZXdWYWx1ZTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0RW5kVGltZShuZXdWYWx1ZSkge1xyXG4gIF9zdGF0ZS5lbmRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuc3JjID0gXCJcIjtcclxuICAgIGVsLmxvYWQoKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IHJlc2V0QWxsU2VjdGlvblZpZHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgIGVsLnBhdXNlKCk7XHJcbiAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBwbGF5UmFuZ2UgPSBmdW5jdGlvbiAodmlkZW9DdXJyZW50VGltZSkge1xyXG4gIGNvbnN0IHZpZENvZGUgPSBfc3RhdGUuYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IF9zdGF0ZS5zdGFydFRpbWU7XHJcbiAgLy8gQ0xFQU5VUDogS2lsbCBhbnkgcHJldmlvdXMgbW9uaXRvciBiZWZvcmUgc3RhcnRpbmcgYSBuZXcgb25lXHJcbiAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXHJcbiAgICAgIFwidGltZXVwZGF0ZVwiLFxyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICAgICk7XHJcbiAgfVxyXG4gIC8vIDEuIEhJRERFTiBTVEFURTogSW5zdGFudCBoaWRlIHRvIHJldmVhbCB2aWQtd3JhcHBlciBiYWNrZ3JvdW5kIGltYWdlXHJcbiAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgX3N0YXRlLmFjdGl2ZVZpZC5yZW1vdmVFdmVudExpc3RlbmVyKFxyXG4gICAgXCJ0aW1ldXBkYXRlXCIsXHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLl9jdXJyZW50TW9uaXRvcixcclxuICApO1xyXG4gIGNvbnN0IG1vbml0b3JUaW1lID0gKCkgPT4ge1xyXG4gICAgaWYgKF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gX3N0YXRlLmVuZFRpbWUgLSAwLjE1KSB7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInRpbWV1cGRhdGVcIiwgbW9uaXRvclRpbWUpO1xyXG4gICAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIF9zdGF0ZS5hY3RpdmVWaWQuY3VycmVudFRpbWUgPSBfc3RhdGUuZW5kVGltZTtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIF9zdGF0ZS5hY3RpdmVWaWQuX2N1cnJlbnRNb25pdG9yID0gbW9uaXRvclRpbWU7XHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gX3N0YXRlLmFjdGl2ZVZpZC5xdWVyeVNlbGVjdG9yKFwic291cmNlXCIpO1xyXG4gIGNvbnN0IGRhdGFTcmMgPSBzb3VyY2UgPyBzb3VyY2UuZ2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIikgOiBudWxsO1xyXG4gIGlmIChkYXRhU3JjICYmIF9zdGF0ZS5hY3RpdmVWaWQuc3JjICE9PSBkYXRhU3JjKSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLnNyYyA9IGRhdGFTcmM7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmxvYWQoKTtcclxuICB9XHJcbiAgY29uc3Qgc3RhcnRQbGF5YmFja1NlcXVlbmNlID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IHRhcmdldFN0YXJ0O1xyXG5cclxuICAgICAgLy8gMi4gVEhFIEZBSUwtU0FGRSBSRVZFQUxcclxuICAgICAgLy8gV2UgcG9sbCBmb3IgcGh5c2ljYWwgcGxheWhlYWQgbW92ZW1lbnQuIE9uY2UgaXQgbW92ZXMsXHJcbiAgICAgIC8vIHRoZSBcImJsYWNrIGJ1ZmZlclwiIGlzIGd1YXJhbnRlZWQgdG8gYmUgZ29uZS5cclxuICAgICAgY29uc3QgcG9sbEZvckZyYW1lID0gKCkgPT4ge1xyXG4gICAgICAgIGlmIChfc3RhdGUuYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFfc3RhdGUuYWN0aXZlVmlkLnBhdXNlZCkge1xyXG4gICAgICAgICAgLy8gSWYgc3RpbGwgYXQgdGFyZ2V0U3RhcnQgYnV0IHBsYXlpbmcsIGNoZWNrIGFnYWluIG5leHQgZnJhbWVcclxuICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShwb2xsRm9yRnJhbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgfTtcclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgX3N0YXRlLmFjdGl2ZVZpZC5hZGRFdmVudExpc3RlbmVyKFwidGltZXVwZGF0ZVwiLCBtb25pdG9yVGltZSk7XHJcbiAgICAgIGF3YWl0IF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gICAgICBwb2xsRm9yRnJhbWUoKTsgLy8gU3RhcnQgY2hlY2tpbmcgZm9yIHRoZSBmaXJzdCByZWFsIGZyYW1lXHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihcIlBsYXliYWNrIGZhaWxlZDpcIiwgZSk7XHJcbiAgICAgIC8vIEZhbGxiYWNrOiBzaG93IHZpZGVvIGFueXdheSBpZiBwbGF5KCkgZmFpbHMgKGUuZy4gYXV0cGxheSBibG9ja2VkKVxyXG4gICAgICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIxXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICAvLyBXYWl0IGZvciBkYXRhIChyZWFkeVN0YXRlIDMgaXMgSEFWRV9GVVRVUkVfREFUQSlcclxuICBpZiAoX3N0YXRlLmFjdGl2ZVZpZC5yZWFkeVN0YXRlID49IDMpIHtcclxuICAgIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUuYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIikuc3R5bGUucG9pbnRlckV2ZW50cyA9XHJcbiAgICBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3IoXCIucGF1c2Utd3JhcHBlclwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgdG9nZ2xlUGF1c2UgPSBmdW5jdGlvbiAoKSB7XHJcbiAgaWYgKF9zdGF0ZS5wYXVzZUZsYWcpIHtcclxuICAgIF9zdGF0ZS5wYXVzZUZsYWcgPSBmYWxzZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGxheSgpO1xyXG4gIH0gZWxzZSB7XHJcbiAgICBfc3RhdGUucGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIF9zdGF0ZS5hY3RpdmVWaWQucGF1c2UoKTtcclxuICB9XHJcbn07XHJcbmV4cG9ydCBjb25zdCBlbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvbi5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPVxyXG4gICAgXCJhdXRvXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgX3N0YXRlLmFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIF9zdGF0ZS5hY3RpdmVTZWN0aW9uXHJcbiAgICAucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgICBpZiAoaW5kZXggPT09IGJ0bldyYXBwZXJJbmRleCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICBfc3RhdGUuYWN0aXZlU2VjdGlvblxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIilcclxuICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnRCdG4gPSBmdW5jdGlvbiAoYnRuKSB7XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgYnRuLmNsYXNzTGlzdC5hZGQoXCJjdXJyZW50XCIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICBpZiAoIXNlY3Rpb24pIHNlY3Rpb24gPSBfc3RhdGUuYWN0aXZlU2VjdGlvbjtcclxuICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIikuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0TG9jYWxJbmRleCA9IGZ1bmN0aW9uIChidG4sIGJ0bkNsYXNzLCBhbGxCdG5zV3JhcHBlcikge1xyXG4gIGxldCBsb2NhbEluZGV4O1xyXG4gIGNvbnN0IGFsbEJ0bnMgPSBidG5cclxuICAgIC5jbG9zZXN0KGAuJHthbGxCdG5zV3JhcHBlcn1gKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke2J0bkNsYXNzfWApO1xyXG4gIGFsbEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICBpZiAoZWwgPT09IGJ0bikgbG9jYWxJbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIHJldHVybiBsb2NhbEluZGV4O1xyXG59O1xyXG4iLCAiY2xhc3MgTmF2YmFyIHtcclxuICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyOyAvL1RoZSByb290IGZvciB0aGlzIG1vZHVsZVxyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5uYXZNZW51ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKTtcclxuICAgIHRoaXMubmF2QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG4gICAgdGhpcy5hbGxOYXZMaW5rcyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuICAgIHRoaXMuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24gPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9kcm9wZG93blwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tbmF2LWRyb3Bkb3duXCIsIHRoaXMub3Blbk5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS1uYXYtZHJvcGRvd25cIiwgdGhpcy5jbG9zZU5hdkRyb3Bkb3duLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJ0b2dnbGUtbmF2LWRyb3Bkb3duXCIsIHRoaXMudG9nZ2xlTmF2RHJvcGRvd24uYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBoYW5kbGVFdmVudCA9IGZ1bmN0aW9uICh0cmlnZ2VyLCBldmVudEFjdGlvbikge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbG9zZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbG9zZU1vYmlsZU5hdk1lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5uYXZCdG4pLmRpc3BsYXkgIT09IFwibm9uZVwiKVxyXG4gICAgICB0aGlzLm5hdkJ0bi5jbGljaygpO1xyXG4gIH07XHJcbiAgZGlzYWJsZU5hdkxpbmtzQW5kTmF2QnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5uYXZNZW51LnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLm5hdk1lbnUpLmRpc3BsYXkgIT09IFwibm9uZVwiKSB7XHJcbiAgICAgIHRoaXMuY2xvc2VNb2JpbGVOYXZNZW51KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLm5hdkJ0bi5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbiAgfTtcclxuICBvcGVuTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBjbG9zZU5hdkRyb3Bkb3duID0gZnVuY3Rpb24gKHRyaWdnZXIpIHtcclxuICAgIHRyaWdnZXJcclxuICAgICAgLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2RHJvcGRvd24gPSBmdW5jdGlvbiAodHJpZ2dlcikge1xyXG4gICAgdHJpZ2dlclxyXG4gICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBOYXZiYXI7XHJcbiIsICJpbXBvcnQgeyBUSU1JTkcgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dC13cmFwcGVyXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIuaW50cm9cIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5mZWF0dXJlc1wiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYnRuSW5kZXggPSAwO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLWZlYXR1cmVzXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWQuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IGZ1bmN0aW9uIChjbGlja2VkLCBpbmRleCwgaW50cm9GbGFnKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICBpZiAoY2xpY2tlZCkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGlmIChpbnRyb0ZsYWcpIHJldHVybjtcclxuICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKHRyaWdnZXIsIGV2ZW50QWN0aW9uKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbih0cmlnZ2VyKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGhpZGVBbGxUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0ludHJvVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0XHJcbiAgICAgIC5maW5kKChlbCkgPT4gZWwuZGF0YXNldC50ZXh0Q29udGVudCA9PT0gXCJpbnRyb1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0W3RoaXMuYnRuSW5kZXggKyAxXS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc0ludHJvVmlkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNWaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNWaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBwbGF5RmVhdHVyZXNJbnRybyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNWaWREaXYoKTtcclxuICAgIC8vIExvZ2ljOiBGaW5kIHRoZSBvbmUgdGhhdCBpc24ndCBoaWRkZW4gKGRpc3BsYXk6IG5vbmUpXHJcbiAgICBjb25zdCBhbGxJbnRyb3MgPVxyXG4gICAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZS1pbnRyb1wiKTtcclxuICAgIGFsbEludHJvcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAvLyBvZmZzZXRQYXJlbnQgaXMgbnVsbCBpZiB0aGUgZWxlbWVudCBpcyBkaXNwbGF5OiBub25lXHJcbiAgICAgIGlmIChlbC5vZmZzZXRQYXJlbnQgIT09IG51bGwpIHtcclxuICAgICAgICBjb25zdCB2aWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZC1pbnRyb1wiKTtcclxuICAgICAgICBpZiAodmlkKSB7XHJcbiAgICAgICAgICB2aWQuY3VycmVudFRpbWUgPSAwO1xyXG4gICAgICAgICAgdmlkLnBsYXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuY2xlYXJGZWF0dXJlc1RpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICB0aGlzLmJ0bkluZGV4ID0gdGhpcy5nbG9iYWwuZ2V0TG9jYWxJbmRleChcclxuICAgICAgY2xpY2tlZEN0cmxCdG4sXHJcbiAgICAgIFwiY3RybC1idG5cIixcclxuICAgICAgXCJzZWN0aW9uLXdyYXAtYnRuc1wiLFxyXG4gICAgKTtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZVRleHQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLnJlc2V0QWxsU2VjdGlvblZpZHMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgICAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgICAgICAgfSwgVElNSU5HLlVJLkJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMKTtcclxuICAgICAgfSwgVElNSU5HLlZJREVPLlZJRF9FTkRfVElNRVIpO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgQ3VzdG9tRXZlbnQoXCJmZWF0dXJlc1ZpZEVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVDdXJyZW50QnRucyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgY2xlYXJGZWF0dXJlc1RpbWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5mZWF0dXJlc1RpbWVyKTtcclxuICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBGZWF0dXJlcztcclxuIiwgImltcG9ydCB7IEFTU0VUUywgVklFV19TVEFSVF9FTkQgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuaW50cm9UZXh0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtdHh0XCIpO1xyXG5cclxuICAgIHRoaXMudmlld1ZpZERpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIudmlld1wiKTtcclxuICAgIHRoaXMuYWxsVmlld1ZpZERpdnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLXZpZXdcIik7XHJcbiAgICB0aGlzLmNvbXBWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmNvbXBcIik7XHJcbiAgICB0aGlzLmFsbERhdGFWaWREaXZzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lO1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZztcclxuXHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRzLW1lbnVfYnRuXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtZHJvcGRvd25cIik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdHMtbWVudV9saW5rXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IFwidmlldy1hXCI7XHJcbiAgICB0aGlzLmxhc3RBY3RpdmVWaWV3ID0geyB2aWV3OiBcInZpZXctYVwiLCBzdGFydFRpbWU6IDAsIGVuZFRpbWU6IDAgfTtcclxuICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kaW1tZXJcIik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmN0cmxCdG5XcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuY3RybEJ0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1kYXRhXCIsIHRoaXMuaW5pdFNlY3Rpb24uYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5zZXRBbmRQbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS12aWV3LXZpZFwiLCB0aGlzLnNldEFuZFBsYXlWaWV3VmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJiYWNrLXRvLXZpZXdcIiwgdGhpcy5iYWNrVG9WaWV3RnJvbUNvbXAuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcIm9wZW4tdmlldy1vcHRzLW1lbnVcIiwgdGhpcy5zaG93Vmlld09wdHNNZW51LmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJjbG9zZS12aWV3LW9wdHMtbWVudVwiLCB0aGlzLmhpZGVWaWV3T3B0c01lbnUuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInRvZ2dsZS1pbWctdHh0XCIsIHRoaXMuc2hvd0NvbXBJbWFnZU9yVGV4dC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9GVU5DVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIGluaXRTZWN0aW9uID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKGNsaWNrZWQpO1xyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9ICh0cmlnZ2VyLCBldmVudEFjdGlvbikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24odHJpZ2dlcik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3QnRuSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXggPSBpbmRleDtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKSxcclxuICAgIClbdGhpcy5jdHJsQnRuSW5kZXhdO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSBmdW5jdGlvbiAodGV4dENvbnRlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHRleHRDb250ZW50O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgIT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgdGhpcy5hbGxWaWV3T3B0QnRucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGlmIChlbC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleChlbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9XHJcbiAgICAgIHRoaXMuYWxsVmlld09wdEJ0bnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hbGxWaWV3T3B0QnRuc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF0uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gY2xpY2tlZC5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IGNsaWNrZWQuZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkgbmV3VmFsdWUgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkIHx8IGFjdGl2ZVZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdICE9PSBcImRhdGFcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIC8vIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18xX01QKTtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIEFTU0VUU1tcInZpZXctYVwiXS5tb2JpbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWJcIikge1xyXG4gICAgICAgIC8vIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18yX01QKTtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIEFTU0VUU1tcInZpZXctYlwiXS5tb2JpbGUpO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIC8vIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18zX01QKTtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIEFTU0VUU1tcInZpZXctY1wiXS5tb2JpbGUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICAvLyBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIElNQUdFUy5EQVRBX1ZJRVdfMSk7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBBU1NFVFNbXCJ2aWV3LWFcIl0uZGVza3RvcCk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgLy8gYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBJTUFHRVMuREFUQV9WSUVXXzIpO1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgQVNTRVRTW1widmlldy1iXCJdLmRlc2t0b3ApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIC8vIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgSU1BR0VTLkRBVEFfVklFV18zKTtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIEFTU0VUU1tcInZpZXctY1wiXS5kZXNrdG9wKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkge1xyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgICAgLy8gYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzFfTVB9XCIpYDtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0FTU0VUU1tcInZpZXctYVwiXS5tb2JpbGV9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgLy8gYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzJfTVB9XCIpYDtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0FTU0VUU1tcInZpZXctYlwiXS5tb2JpbGV9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgLy8gYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzNfTVB9XCIpYDtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0FTU0VUU1tcInZpZXctY1wiXS5tb2JpbGV9XCIpYDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIC8vIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7SU1BR0VTLkRBVEFfVklFV18xfVwiKWA7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtBU1NFVFNbXCJ2aWV3LWFcIl0uZGVza3RvcH1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICAvLyBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0lNQUdFUy5EQVRBX1ZJRVdfMn1cIilgO1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7QVNTRVRTW1widmlldy1iXCJdLmRlc2t0b3B9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgLy8gYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtJTUFHRVMuREFUQV9WSUVXXzN9XCIpYDtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0FTU0VUU1tcInZpZXctY1wiXS5kZXNrdG9wfVwiKWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IGZ1bmN0aW9uIChjbGlja2VkVmlld09wdHNCdG4pIHtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIGNsaWNrZWRWaWV3T3B0c0J0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpOyAvL2ZvciBEYXRhLnNldEFjdGl2ZVZpZXdCdG5JbmRleFxyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3QnRuSW5kZXgoKTtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzW3RoaXMuYWN0aXZlVmlld0J0bkluZGV4XTtcclxuICAgIHRoaXMuc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3KGNsaWNrZWRWaWV3T3B0c0J0bi50ZXh0Q29udGVudCk7IC8vZm9yIHRoZSBwb3N0ZXJcclxuXHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG5cclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmN0cmxCdG5JbmRleCA9IHRoaXMuZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbiAgICAgIGNsaWNrZWRDdHJsQnRuLFxyXG4gICAgICBcImN0cmwtYnRuXCIsXHJcbiAgICAgIFwic2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICk7XHJcblxyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZChjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7IC8vcmVtb3ZlcyBibGFja291dCBpbiBnbG9iYWwucGxheVJhbmdlXHJcbiAgfTtcclxuICBwbGF5RGF0YVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUodGhpcy5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZSh0aGlzLmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3VmlkRmxhZyAmJiAhdGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTtcclxuICAgICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRQb3N0ZXIoKTsgLy9kb25lIGhlcmUgc28gcG9zdGVyIGRvZXNuJ3QgYXBwZWFyIGVhcmxpZXJcclxuICAgICAgdGhpcy5zaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KFwidmlldy1hXCIpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnNob3dEYXRhKHRoaXMuY3RybEJ0bkluZGV4KTtcclxuICAgICAgdGhpcy5zaG93QmFja0J0bigpO1xyXG5cclxuICAgICAgLy9zZXQgYmNrZ3JuZCBpbWcgdG8gYmxhY2sgdG8gcHJldmVudCBmbGFzaCBvZiBpbWFnZSB3aGVuIGNoYW5naW5nIG5hdlxyXG4gICAgICB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwcGVyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICAgXCJub25lXCI7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgICBcImJsYWNrXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICBiYWNrVG9WaWV3RnJvbUNvbXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgfTtcclxuICBoaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID1cclxuICAgICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7XHJcbiIsICJjbGFzcyBTZXF1ZW5jZSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuYWxsSW50cm9UZXh0ID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmludHJvLXRleHQtd3JhcFwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGlvbi1oZWFkaW5nXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZVwiLCB0aGlzLmluaXRTZWN0aW9uLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJvcGVuLXNlcXVlbmNlLWluZGV4XCIsIHRoaXMuYWN0aXZhdGVTZWN0aW9uSW5kZXguYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBsYXktY3RybC12aWRcIiwgdGhpcy5wbGF5Q3RybEJ0blZpZC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGF1c2UtY3RybC12aWRcIiwgdGhpcy5wYXVzZUN0cmxWaWQuYmluZCh0aGlzKV0sXHJcbiAgICBdKTtcclxuICB9XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICBpZiAoIXRoaXMuZHJvcGRvd25DbGlja2VkKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudE5hdkxpbmsoY2xpY2tlZCk7XHJcbiAgICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICAgIGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIikucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9saW5rXCIpLFxyXG4gICAgICApO1xyXG4gICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChcclxuICAgICAgICBuZXcgQ3VzdG9tRXZlbnQoXCJkcm9wZG93bk9wdENsaWNrZWRcIiwgeyBkZXRhaWw6IGNsaWNrZWQgfSksXHJcbiAgICAgICk7XHJcbiAgICAgIHRoaXMuZHJvcGRvd25DbGlja2VkID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuaGlkZUFsbEFjdGlvbkhlYWRpbmdzKCk7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlVmlkV3JhcCh0aGlzLnNlcXVlbmNlSW5kZXgpO1xyXG4gIH07XHJcbiAgYWN0aXZhdGVTZWN0aW9uSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZCkge1xyXG4gICAgdGhpcy5kcm9wZG93bkNsaWNrZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gdGhpcy5nbG9iYWwuZ2V0TG9jYWxJbmRleChcclxuICAgICAgY2xpY2tlZCxcclxuICAgICAgXCJuYXZfbWVudV9saW5rLWRyb3Bkb3duXCIsXHJcbiAgICAgIFwibmF2X21lbnVfZHJvcGRvd25cIixcclxuICAgICk7XHJcbiAgICB0aGlzLmluaXRTZWN0aW9uKGNsaWNrZWQpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAodHJpZ2dlciwgZXZlbnRBY3Rpb24pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKHRyaWdnZXIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0U2VxdWVuY2VJbmRleCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgaWYgKCF2YWx1ZSkgdGhpcy5zZXF1ZW5jZUluZGV4ID0gMDtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IHZhbHVlO1xyXG4gIH07XHJcbiAgaGlkZUFsbEludHJvVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0LmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxBY3Rpb25IZWFkaW5ncyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlU2VxdWVuY2VWaWRXcmFwID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gZnVuY3Rpb24gKGNsaWNrZWRDdHJsQnRuKSB7XHJcbiAgICB0aGlzLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzW3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKHRoaXMucGF1c2VXcmFwcGVyKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGNsZWFyU2VxdWVuY2VUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuc2VxdWVuY2VUaW1lcik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgU2VxdWVuY2U7XHJcbiIsICJjb25zb2xlLmxvZyhcIkJSQU5DSDogbmV3TW9kdWxlcy02XCIpO1xyXG5cclxuaW1wb3J0IHsgVElNSU5HIH0gZnJvbSBcIi4vMC1jb25maWdcIjtcclxuaW1wb3J0ICogYXMgZ2xvYmFsIGZyb20gXCIuLzAtZ2xvYmFsXCI7XHJcbmltcG9ydCBOYXZiYXJDbGFzcyBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfY29tcG9uZW50XCIpO1xyXG5jb25zdCBmZWF0dXJlc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5mZWF0dXJlc1wiKTtcclxuY29uc3QgZGF0YUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5kYXRhXCIpO1xyXG5jb25zdCBzZXF1ZW5jZUNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VjdGlvbi5zZXF1ZW5jZVwiKTtcclxuY29uc3QgbmF2YmFyID0gbmV3IE5hdmJhckNsYXNzKG5hdkNvbnRhaW5lcik7XHJcbmNvbnN0IGZlYXR1cmVzID0gbmV3IEZlYXR1cmVzQ2xhc3MoZ2xvYmFsLCBmZWF0dXJlc0NvbnRhaW5lcik7XHJcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YUNsYXNzKGdsb2JhbCwgZGF0YUNvbnRhaW5lcik7XHJcbmNvbnN0IHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBzZXF1ZW5jZUNvbnRhaW5lcik7XHJcbmNvbnN0IFNFQ1RJT05TID0ge1xyXG4gIG5hdmJhcjogbmF2YmFyLFxyXG4gIGZlYXR1cmVzOiBmZWF0dXJlcyxcclxuICBkYXRhOiBkYXRhLFxyXG4gIHNlcXVlbmNlOiBzZXF1ZW5jZSxcclxufTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tTkFWLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5uYXZTZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICAvLzEuIEdlbmVyaWMgY2xlYW51cFxyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oYWN0aXZlU2VjdGlvbik7XHJcbiAgLy8zLiBQb2x5bW9ycGhpYyBjYWxsXHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGNsaWNrZWQsIGFjdGlvbik7XHJcbn0pO1xyXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICBuYXZiYXIuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIG5hdmJhci5oYW5kbGVFdmVudChob3ZlcmVkLCBhY3Rpb24pO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IGZlYXR1cmVzIHZpZCBlbmRcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJmZWF0dXJlc1ZpZEVuZGVkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgbmF2YmFyLmRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG59KTtcclxuLy9DdXN0b20gZXZlbnQ6IHNlcXVlbmNlIGRyb3Bkb3duIG9wdCBjbGlja2VkXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwiZHJvcGRvd25PcHRDbGlja2VkXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUuZGV0YWlsO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIG5hdmJhci5jbG9zZU5hdkRyb3Bkb3duKGNsaWNrZWQpO1xyXG4gIG5hdmJhci5jbG9zZU1vYmlsZU5hdk1lbnUoKTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU1BSU4gQk9EWS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1jbGljay1hY3Rpb25dXCIpO1xyXG4gIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBjbGlja2VkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChjbGlja2VkLCBhY3Rpb24pO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3Zlci1hY3Rpb25dXCIpO1xyXG4gIGlmICghaG92ZXJlZCkgcmV0dXJuO1xyXG4gIGlmICh0aGlzLmN1cnJlbnRIb3ZlciA9PT0gaG92ZXJlZCkgcmV0dXJuOyAvLyBFeGl0IGlmIHdlIGFyZSBhbHJlYWR5IGhvdmVyaW5nIGl0XHJcbiAgdGhpcy5jdXJyZW50SG92ZXIgPSBob3ZlcmVkO1xyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoaG92ZXJlZCwgYWN0aW9uKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGhvdmVyZWQsIGFjdGlvbik7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1WSURTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy92aWQgZW5kZWRcclxuZ2xvYmFsLmFsbFZpZHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IGVuZGVkVmlkID0gZS50YXJnZXQuY2xvc2VzdChcIi52aWRcIik7XHJcbiAgICBpZiAoIWVuZGVkVmlkKSByZXR1cm47XHJcbiAgICBjb25zdCB2aWRTZWN0aW9uID0gZW5kZWRWaWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICAgIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW3ZpZFNlY3Rpb25dO1xyXG4gICAgdGFyZ2V0TW9kdWxlLnZpZEVuZCgpO1xyXG4gIH0pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdFxyXG5jb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHNldHVwTGF6eUxvYWRpbmcoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBuYXZDb250YWluZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBuYXZiYXIuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKFwiZmVhdHVyZXNcIik7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gIGZlYXR1cmVzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIG5hdkNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgZmVhdHVyZXMuaW5pdFNlY3Rpb24obnVsbCwgbnVsbCwgdHJ1ZSk7XHJcbiAgfSwgVElNSU5HLlVJLlNUQVJUX1VJX1JFVkVBTCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxufTtcclxuY29uc3Qgc2V0dXBMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbGxMYXp5VmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG4gIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgIHJvb3Q6IG51bGwsXHJcbiAgICByb290TWFyZ2luOiBcIjBweFwiLFxyXG4gICAgdGhyZXNob2xkOiAwLjEsXHJcbiAgfTtcclxuICBjb25zdCB2aWRlb09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gdmlkZW8ucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKTtcclxuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgLy8gLS0tIExPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIFVzZSBkYXRhLXNyYyBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBrZWVwIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBkYXRhU3JjID0gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoZGF0YVNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gZGF0YVNyYztcclxuICAgICAgICAgICAgLy8gS2VlcCBkYXRhLXNyYyBhdHRyaWJ1dGUgc28gd2UgY2FuIGZpbmQgdGhlIFVSTCBhZ2FpbiBsYXRlclxyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgZGF0YVNyYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIC0tLSBVTkxPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBpbnRlcm5hbCBsb2dzIGZvciB1c2VyIGludGVyYWN0aW9ucyBhbmQgcmVzb3VyY2UgbG9hZHNcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKCk7XHJcbiAgICAgICAgUmVzZXRTZWN0aW9uKHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gTW92ZSBzcmMgYmFjayB0byBkYXRhLXNyYyBhbmQgZW1wdHkgdGhlIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3JjID0gc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBjdXJyZW50U3JjKTtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IFwiXCI7IC8vIFRoaXMgc3RvcHMgdGhlIHZpZGVvIGZyb20gYnVmZmVyaW5nXHJcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7IC8vIEZ1bGx5IGNsZWFyIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSBicm93c2VyIHRvIGR1bXAgdGhlIHZpZGVvIGRhdGEgZnJvbSBtZW1vcnlcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIG9ic2VydmVyT3B0aW9ucyk7XHJcbiAgYWxsTGF6eVZpZHMuZm9yRWFjaCgodmlkKSA9PiB2aWRlb09ic2VydmVyLm9ic2VydmUodmlkKSk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vUkVTRVQgVklEUyBBRlRFUiBVTkxPQURJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBjb25zdCBSZXNldFNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gICAgaWYgKCFzZWN0aW9uKSByZXR1cm47IC8vaGVscHMgcHJldmVudCBjcmFzaGVzXHJcbiAgICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgZWwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucyhzZWN0aW9uKTtcclxuICB9O1xyXG59O1xyXG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7OztBQUFPLE1BQU0sU0FBUyxPQUFPLE9BQU87QUFBQSxJQUNsQyxJQUFJO0FBQUEsTUFDRixpQkFBaUI7QUFBQSxNQUNqQixnQkFBZ0I7QUFBQSxNQUNoQix5QkFBeUI7QUFBQSxJQUMzQjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsZUFBZTtBQUFBLElBQ2pCO0FBQUEsRUFDRixDQUFDO0FBQ00sTUFBTSxTQUFTLE9BQU8sT0FBTztBQUFBLElBQ2xDLFVBQVU7QUFBQSxNQUNSLFNBQ0U7QUFBQSxNQUNGLFFBQ0U7QUFBQSxJQUNKO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixTQUNFO0FBQUEsTUFDRixRQUNFO0FBQUEsSUFDSjtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsU0FDRTtBQUFBLE1BQ0YsUUFDRTtBQUFBLElBQ0o7QUFBQSxFQUNGLENBQUM7QUFDTSxNQUFNLGlCQUFpQixPQUFPLE9BQU87QUFBQSxJQUMxQyxVQUFVO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FB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
