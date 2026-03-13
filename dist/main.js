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
    getCtrlBtnIndex: () => getCtrlBtnIndex,
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
  var activeSection;
  var activeSectionName;
  var activeVid;
  var startTime;
  var endTime;
  var pauseFlag;
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
  var getCtrlBtnIndex = function(btn) {
    let localIndex;
    const allBtns = btn.closest(".section-wrap-btns").querySelectorAll(".ctrl-btn");
    allBtns.forEach(function(el, index) {
      if (el === btn) localIndex = index;
    });
    return localIndex;
  };

  // src/0-navbar.js
  var Navbar = class {
    //.......................................................................
    //DEFINITIONS............................................................
    navComponent = document.querySelector(".nav_component");
    navMenu = document.querySelector(".nav_menu");
    navBtn = document.querySelector(".nav_button");
    allNavLinks = document.querySelectorAll(".nav_menu_link");
    allNavLinksWithDropdown = [
      ...document.querySelectorAll('[data-nav-section="sequence"]')
    ];
    allNavDropdowns = [...document.querySelectorAll(".nav_menu_dropdown")];
    dropdownIndex;
    //.......................................................................
    //FUNCTIONS..............................................................
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
    toggleNav = function(clicked) {
      const dropdown = clicked ? clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown") : this.navMenu.querySelector(".nav_menu_dropdown");
      if (dropdown) dropdown.classList.toggle("active");
    };
  };
  var navbar_default = new Navbar();

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
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //EVENT MAP..............................................................
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clickedNavLink, introFlag) {
      this.global.blackout.classList.add("off");
      this.featuresBlackout.classList.add("off");
      if (clickedNavLink) {
        this.global.activateCurrentNavLink(clickedNavLink);
        this.global.flashBlackout();
      }
      this.global.enableSectionCtrlBtnEvents();
      this.hideAllText();
      this.showIntroText();
      this.featuresCtrlBtns.classList.add("active");
      if (introFlag) return;
      this.playFeaturesIntro();
    };
    handleEvent = (eventAction, clickedBtn) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(clickedBtn);
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
      this.btnIndex = this.global.getCtrlBtnIndex(clickedCtrlBtn);
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
    initSection = function() {
      this.global.flashBlackout();
      this.dimmer.classList.remove("active");
      this.txtOrImg = "image";
      this.txtImgBtn.textContent = "image";
      this.hideBackBtn();
      this.hideAllData();
      this.resetAllDataSheets();
      this.introText.classList.add("active");
      this.showCtrlBtnWrapper();
      this.global.clearSectionVidSrc();
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
    };
    handleEvent = (eventAction, clickedBtn) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(clickedBtn);
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
      this.ctrlBtnIndex = this.global.getCtrlBtnIndex(clickedCtrlBtn);
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
      this.eventMap = /* @__PURE__ */ new Map([
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clickedNavLink, index) {
      this.sequenceIndex = index ?? 0;
      this.global.flashBlackout();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.allIntroText[this.sequenceIndex].classList.add("active");
      this.setActiveSequenceVidWrap();
    };
    handleEvent = (eventAction, clickedBtn) => {
      const action = this.eventMap.get(eventAction);
      if (action) {
        action(clickedBtn);
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
  console.log("BRANCH: newModules-2");
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  var featuresContainer = document.querySelector(".section.features");
  var dataContainer = document.querySelector(".section.data");
  var sequenceContainer = document.querySelector(".section.sequence");
  var features = new features_default(global_exports, featuresContainer);
  var data = new data_default(global_exports, dataContainer);
  var sequence = new sequence_default(global_exports, sequenceContainer);
  var SECTIONS = {
    features,
    data,
    sequence
  };
  navbar_default.navMenu.addEventListener("click", function(e) {
    const clicked = e.target.closest(".nav_menu_link");
    if (!clicked) return;
    const clickedSectionName = clicked.dataset.navSection;
    const targetModule = SECTIONS[clickedSectionName];
    if (clickedSectionName === getActiveSectionName()) return;
    clearAllTimers();
    blackout.classList.remove("off");
    features.pauseWrapper.classList.remove("active");
    sequence.pauseWrapper.classList.remove("active");
    setActiveSection(clickedSectionName);
    targetModule.initSection(clicked);
  });
  navbar_default.navMenu.addEventListener("click", function(e) {
    const clicked = e.target.closest(".dropdown-icon");
    if (!clicked) return;
    navbar_default.toggleNav(clicked);
  });
  navbar_default.navBtn.addEventListener("click", function() {
    navbar_default.closeNavMenu();
  });
  navbar_default.allNavLinksWithDropdown.forEach(function(el) {
    el.addEventListener("mouseenter", function() {
      el.parentElement.querySelector(".nav_menu_dropdown").classList.add("active");
    });
  });
  navbar_default.allNavLinksWithDropdown.forEach(function(el) {
    el.addEventListener("mouseleave", function() {
      el.parentElement.querySelector(".nav_menu_dropdown").classList.remove("active");
    });
  });
  navbar_default.allNavDropdowns.forEach(function(el) {
    el.addEventListener("mouseenter", function() {
      el.classList.add("active");
    });
  });
  navbar_default.allNavDropdowns.forEach(function(el) {
    el.addEventListener("mouseleave", function() {
      el.classList.remove("active");
    });
  });
  navbar_default.allNavDropdowns.forEach(function(el) {
    el.addEventListener("click", function(e) {
      const clicked = e.target.closest(".nav_menu_link-dropdown");
      if (!clicked) return;
      clearAllTimers();
      deactivateCurrentBtns();
      navbar_default.closeNavMenu();
      if (window.getComputedStyle(navbar_default.navBtn).display !== "none") {
        navbar_default.navBtn.click();
      }
      navbar_default.getDropdownIndex(clicked);
      setActiveSection("sequence");
      sequence.initSection(null, navbar_default.dropdownIndex);
      flashBlackout();
      disablePause();
      clearSectionVidSrc();
      activateCurrentNavLink(
        clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
      );
      enableSectionCtrlBtnEvents();
    });
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection2 = clicked.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = clicked.dataset.clickAction;
    targetModule.handleEvent(action, clicked);
  });
  mainWrapper.addEventListener("mouseover", function(e) {
    const hovered = e.target.closest("[data-mouseover-action]");
    if (!hovered) return;
    if (this.currentHover === hovered) return;
    this.currentHover = hovered;
    const activeSection2 = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = hovered.dataset.mouseoverAction;
    targetModule.handleEvent(action, hovered);
  });
  mainWrapper.addEventListener("mouseout", function(e) {
    const hovered = e.target.closest("[data-mouseout-action]");
    if (!hovered) return;
    if (hovered.contains(e.relatedTarget)) return;
    this.currentHover = null;
    const activeSection2 = hovered.closest(".section").dataset.section;
    const targetModule = SECTIONS[activeSection2];
    const action = hovered.dataset.mouseoutAction;
    targetModule.handleEvent(action, hovered);
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
    navbar_default.navComponent.classList.remove("active");
    navbar_default.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    blackout.classList.add("off");
    features.playFeaturesIntro();
    setTimeout(() => {
      navbar_default.navComponent.classList.add("active");
      features.initSection(null, true);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFNUQVJUX1VJX1JFVkVBTCA9IDE1MDA7XHJcbmV4cG9ydCBjb25zdCBPS19CVE5fUkVWRUFMID0gMTUwMDtcclxuZXhwb3J0IGNvbnN0IEJMQUNLT1VUX1RJTUVSID0gMjAwO1xyXG5leHBvcnQgY29uc3QgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwgPSA1MDtcclxuZXhwb3J0IGNvbnN0IFZJRF9FTkRfVElNRVIgPSAxNTAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX1NUQVJUX1RJTUUgPSAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX0VORF9USU1FID0gNy43NjtcclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMSA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODcwN2M3Yjc0YTUyNGY5ZjRfRGF0YS1WaWV3LTEud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzFfTVAgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18yID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4ODUxNDE5MmRkMTE4ZjkyZV9EYXRhLVZpZXctMi53ZWJwXCI7XHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMl9NUCA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzMgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg2NjNkNDgwMGNjNWY5OTM1X0RhdGEtVmlldy0zLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18zX01QID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSB7XHJcbiAgXCJ2aWV3LWFcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgZW5kVGltZTogMCxcclxuICB9LFxyXG4gIFwidmlldy1iXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMS40OCxcclxuICAgIGVuZFRpbWU6IDIuNjksXHJcbiAgfSxcclxuICBcInZpZXctY1wiOiB7XHJcbiAgICBzdGFydFRpbWU6IDQuNDQsXHJcbiAgICBlbmRUaW1lOiA1LjY1LFxyXG4gIH0sXHJcbn07XHJcbiIsICJpbXBvcnQgeyBCTEFDS09VVF9USU1FUiB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmxldCBhY3RpdmVTZWN0aW9uO1xyXG5sZXQgYWN0aXZlU2VjdGlvbk5hbWU7XHJcbmxldCBhY3RpdmVWaWQ7XHJcbmxldCBzdGFydFRpbWU7XHJcbmxldCBlbmRUaW1lO1xyXG5sZXQgcGF1c2VGbGFnO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgfSwgQkxBQ0tPVVRfVElNRVIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlTmF2TGlua3NBbmROYXZCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICBpZiAoXHJcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpKS5kaXNwbGF5ID09PVxyXG4gICAgXCJibG9ja1wiXHJcbiAgKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIikuY2xpY2soKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGFjdGl2ZVNlY3Rpb247XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVTZWN0aW9uTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gYWN0aXZlU2VjdGlvbk5hbWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0VmlkVHlwZSA9IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gIHJldHVybiB2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVmlkKCkge1xyXG4gIHJldHVybiBhY3RpdmVWaWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVZpZCgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBhY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhcnRUaW1lKG5ld1ZhbHVlKSB7XHJcbiAgc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZFRpbWUobmV3VmFsdWUpIHtcclxuICBlbmRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGxheVJhbmdlID0gZnVuY3Rpb24gKHZpZGVvQ3VycmVudFRpbWUpIHtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLkNIRUNLRURcclxuICBjb25zdCB2aWRDb2RlID0gYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IHN0YXJ0VGltZTtcclxuXHJcbiAgLy8gMS4gSElEREVOIFNUQVRFOiBJbnN0YW50IGhpZGUgdG8gcmV2ZWFsIHZpZC13cmFwcGVyIGJhY2tncm91bmQgaW1hZ2VcclxuICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblxyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpO1xyXG5cclxuICBjb25zdCBtb25pdG9yVGltZSA9ICgpID0+IHtcclxuICAgIGlmIChhY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gZW5kVGltZSAtIDAuMTUpIHtcclxuICAgICAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIGFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IGVuZFRpbWU7XHJcbiAgICAgIGFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IgPSBtb25pdG9yVGltZTtcclxuXHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gYWN0aXZlVmlkLnF1ZXJ5U2VsZWN0b3IoXCJzb3VyY2VcIik7XHJcbiAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZSA/IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSA6IG51bGw7XHJcbiAgaWYgKGRhdGFTcmMgJiYgYWN0aXZlVmlkLnNyYyAhPT0gZGF0YVNyYykge1xyXG4gICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBhY3RpdmVWaWQuc3JjID0gZGF0YVNyYztcclxuICAgIGFjdGl2ZVZpZC5sb2FkKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGFydFBsYXliYWNrU2VxdWVuY2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhY3RpdmVWaWQuY3VycmVudFRpbWUgPSB0YXJnZXRTdGFydDtcclxuXHJcbiAgICAgIC8vIDIuIFRIRSBGQUlMLVNBRkUgUkVWRUFMXHJcbiAgICAgIC8vIFdlIHBvbGwgZm9yIHBoeXNpY2FsIHBsYXloZWFkIG1vdmVtZW50LiBPbmNlIGl0IG1vdmVzLFxyXG4gICAgICAvLyB0aGUgXCJibGFjayBidWZmZXJcIiBpcyBndWFyYW50ZWVkIHRvIGJlIGdvbmUuXHJcbiAgICAgIGNvbnN0IHBvbGxGb3JGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFhY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgYWN0aXZlVmlkLnBsYXkoKTtcclxuICAgICAgcG9sbEZvckZyYW1lKCk7IC8vIFN0YXJ0IGNoZWNraW5nIGZvciB0aGUgZmlyc3QgcmVhbCBmcmFtZVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJQbGF5YmFjayBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAvLyBGYWxsYmFjazogc2hvdyB2aWRlbyBhbnl3YXkgaWYgcGxheSgpIGZhaWxzIChlLmcuIGF1dHBsYXkgYmxvY2tlZClcclxuICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChhY3RpdmVWaWQucmVhZHlTdGF0ZSA+PSAzKSB7XHJcbiAgICBzdGFydFBsYXliYWNrU2VxdWVuY2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIGlmIChwYXVzZUZsYWcpIHtcclxuICAgIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgYWN0aXZlVmlkLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIGFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBidG4uY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb247XHJcbiAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEN0cmxCdG5JbmRleCA9IGZ1bmN0aW9uIChidG4pIHtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLkNIRUNLRURcclxuICBsZXQgbG9jYWxJbmRleDtcclxuICBjb25zdCBhbGxCdG5zID0gYnRuXHJcbiAgICAuY2xvc2VzdChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKVxyXG4gICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIik7XHJcbiAgYWxsQnRucy5mb3JFYWNoKGZ1bmN0aW9uIChlbCwgaW5kZXgpIHtcclxuICAgIGlmIChlbCA9PT0gYnRuKSBsb2NhbEluZGV4ID0gaW5kZXg7XHJcbiAgfSk7XHJcbiAgcmV0dXJuIGxvY2FsSW5kZXg7XHJcbn07XHJcbiIsICJjbGFzcyBOYXZiYXIge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgbmF2Q29tcG9uZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfY29tcG9uZW50XCIpO1xyXG4gIG5hdk1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpO1xyXG4gIG5hdkJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKTtcclxuICBhbGxOYXZMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfbGlua1wiKTtcclxuICBhbGxOYXZMaW5rc1dpdGhEcm9wZG93biA9IFtcclxuICAgIC4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLW5hdi1zZWN0aW9uPVwic2VxdWVuY2VcIl0nKSxcclxuICBdO1xyXG4gIGFsbE5hdkRyb3Bkb3ducyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXTtcclxuICBkcm9wZG93bkluZGV4O1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgZ2V0RHJvcGRvd25JbmRleCA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICBjb25zdCBkcm9wZG93bk1lbnUgPSBjbGlja2VkLmNsb3Nlc3QoXCIubmF2X21lbnVfZHJvcGRvd25cIik7XHJcbiAgICBjb25zdCBhcnJheU9mRHJvcGRvd25PcHRzID0gW1xyXG4gICAgICAuLi5kcm9wZG93bk1lbnUucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rLWRyb3Bkb3duXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZHJvcGRvd25JbmRleCA9IGFycmF5T2ZEcm9wZG93bk9wdHMuaW5kZXhPZihjbGlja2VkKTtcclxuICB9O1xyXG4gIGNsb3NlTmF2TWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHRvZ2dsZU5hdiA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICBjb25zdCBkcm9wZG93biA9IGNsaWNrZWRcclxuICAgICAgPyBjbGlja2VkXHJcbiAgICAgICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuICAgICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIDogdGhpcy5uYXZNZW51LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIik7XHJcblxyXG4gICAgaWYgKGRyb3Bkb3duKSBkcm9wZG93bi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgbmV3IE5hdmJhcigpO1xyXG4iLCAiaW1wb3J0IHsgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwsIFZJRF9FTkRfVElNRVIgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRmVhdHVyZXMge1xyXG4gIGNvbnN0cnVjdG9yKGdsb2JhbENvbnRyb2xsZXIsIGNvbnRhaW5lcikge1xyXG4gICAgdGhpcy5nbG9iYWwgPSBnbG9iYWxDb250cm9sbGVyO1xyXG4gICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7IC8vVGhlIHJvb3QgZm9yIHRoaXMgbW9kdWxlXHJcbiAgICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICAvL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmJsYWNrb3V0XCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGV4dC13cmFwcGVyXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdiA9XHJcbiAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIuaW50cm9cIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzVmlkRGl2ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5mZWF0dXJlc1wiKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYnRuSW5kZXggPSAwO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICAgIHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9IGZhbHNlO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWQuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0VWRU5UIE1BUC4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBpbml0U2VjdGlvbiA9IGZ1bmN0aW9uIChjbGlja2VkTmF2TGluaywgaW50cm9GbGFnKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICBpZiAoY2xpY2tlZE5hdkxpbmspIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkTmF2TGluayk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIH1cclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuZmVhdHVyZXNDdHJsQnRucy5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgaWYgKGludHJvRmxhZykgcmV0dXJuO1xyXG4gICAgdGhpcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAoZXZlbnRBY3Rpb24sIGNsaWNrZWRCdG4pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKGNsaWNrZWRCdG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgaGlkZUFsbFRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzaG93SW50cm9UZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRcclxuICAgICAgLmZpbmQoKGVsKSA9PiBlbC5kYXRhc2V0LnRleHRDb250ZW50ID09PSBcImludHJvXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVUZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0FsbFRleHRbdGhpcy5idG5JbmRleCArIDFdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZXNJbnRyb1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzSW50cm9WaWREaXYgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzSW50cm9WaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVGZWF0dXJlc1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHBsYXlGZWF0dXJlc0ludHJvID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0JsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc1ZpZERpdigpO1xyXG4gICAgLy8gTG9naWM6IEZpbmQgdGhlIG9uZSB0aGF0IGlzbid0IGhpZGRlbiAoZGlzcGxheTogbm9uZSlcclxuICAgIGNvbnN0IGFsbEludHJvcyA9XHJcbiAgICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLWludHJvXCIpO1xyXG4gICAgYWxsSW50cm9zLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIC8vIG9mZnNldFBhcmVudCBpcyBudWxsIGlmIHRoZSBlbGVtZW50IGlzIGRpc3BsYXk6IG5vbmVcclxuICAgICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICAgIGNvbnN0IHZpZCA9IGVsLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLWludHJvXCIpO1xyXG4gICAgICAgIGlmICh2aWQpIHtcclxuICAgICAgICAgIHZpZC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICB2aWQucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IGZ1bmN0aW9uIChjbGlja2VkQ3RybEJ0bikge1xyXG4gICAgdGhpcy5jbGVhckZlYXR1cmVzVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlRmVhdHVyZXNJbnRyb1ZpZERpdigpO1xyXG4gICAgdGhpcy5zaG93RmVhdHVyZXNWaWREaXYoKTtcclxuICAgIHRoaXMuYnRuSW5kZXggPSB0aGlzLmdsb2JhbC5nZXRDdHJsQnRuSW5kZXgoY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxUZXh0KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlVGV4dCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50QnRuKGNsaWNrZWRDdHJsQnRuKTtcclxuICAgIHRoaXMuZ2xvYmFsLmJsYWNrb3V0LmNsYXNzTGlzdC5yZW1vdmUoXCJvZmZcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5wbGF5UmFuZ2UoKTtcclxuICB9O1xyXG4gIHBhdXNlQ3RybFZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLnRvZ2dsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMuZmVhdHVyZXNFbmRpc0NhbmNlbGxlZCA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzKCk7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgICAgICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwucmVzZXRBbGxTZWN0aW9uVmlkcygpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgICAgIHRoaXMucGxheUZlYXR1cmVzSW50cm8oKTtcclxuICAgICAgICB9LCBCTEFDS09VVF9XQUlUX1RPX1JFVkVBTCk7XHJcbiAgICAgIH0sIFZJRF9FTkRfVElNRVIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUN1cnJlbnRCdG5zID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJjdXJyZW50XCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBjbGVhckZlYXR1cmVzVGltZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLmZlYXR1cmVzVGltZXIpO1xyXG4gICAgdGhpcy5mZWF0dXJlc1RpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IEZlYXR1cmVzO1xyXG4iLCAiaW1wb3J0IHtcclxuICBEQVRBX1ZJRVdfMSxcclxuICBEQVRBX1ZJRVdfMV9NUCxcclxuICBEQVRBX1ZJRVdfMixcclxuICBEQVRBX1ZJRVdfMl9NUCxcclxuICBEQVRBX1ZJRVdfMyxcclxuICBEQVRBX1ZJRVdfM19NUCxcclxuICBWSUVXX1NUQVJUX0VORCxcclxufSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5cclxuY2xhc3MgRGF0YSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuaW50cm9UZXh0ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtdHh0XCIpO1xyXG5cclxuICAgIHRoaXMudmlld1ZpZERpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIudmlld1wiKTtcclxuICAgIHRoaXMuYWxsVmlld1ZpZERpdnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlLXZpZXdcIik7XHJcbiAgICB0aGlzLmNvbXBWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmNvbXBcIik7XHJcbiAgICB0aGlzLmFsbERhdGFWaWREaXZzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lO1xyXG4gICAgdGhpcy52aWV3VmlkRmxhZztcclxuXHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5vcHRzLW1lbnVfYnRuXCIpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtZHJvcGRvd25cIik7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLm9wdHMtbWVudV9saW5rXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IFwidmlldy1hXCI7XHJcbiAgICB0aGlzLmxhc3RBY3RpdmVWaWV3ID0geyB2aWV3OiBcInZpZXctYVwiLCBzdGFydFRpbWU6IDAsIGVuZFRpbWU6IDAgfTtcclxuICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG5cclxuICAgIHRoaXMuZGltbWVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5kaW1tZXJcIik7XHJcbiAgICB0aGlzLnR4dEltZ0J0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgIFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycyA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtY29tcC1kYXRhXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsRGF0YSA9IFsuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0ID0gbnVsbDtcclxuXHJcbiAgICB0aGlzLmN0cmxCdG5XcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKTtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPSB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1swXTtcclxuICAgIHRoaXMuY3RybEJ0bkluZGV4ID0gbnVsbDtcclxuICAgIHRoaXMuZXZlbnRNYXAgPSBuZXcgTWFwKFtcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnNldEFuZFBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWQuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcImJhY2stdG8tdmlld1wiLCB0aGlzLmJhY2tUb1ZpZXdGcm9tQ29tcC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wib3Blbi12aWV3LW9wdHMtbWVudVwiLCB0aGlzLnNob3dWaWV3T3B0c01lbnUuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudS5iaW5kKHRoaXMpXSxcclxuICAgICAgW1widG9nZ2xlLWltZy10eHRcIiwgdGhpcy5zaG93Q29tcEltYWdlT3JUZXh0LmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0SW1nQnRuLnRleHRDb250ZW50ID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNob3dDdHJsQnRuV3JhcHBlcigpO1xyXG5cclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuY2xlYXJTZWN0aW9uVmlkU3JjKCk7IC8vcmV2ZWFsIHBvc3RlclxyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gIH07XHJcbiAgaGFuZGxlRXZlbnQgPSAoZXZlbnRBY3Rpb24sIGNsaWNrZWRCdG4pID0+IHtcclxuICAgIGNvbnN0IGFjdGlvbiA9IHRoaXMuZXZlbnRNYXAuZ2V0KGV2ZW50QWN0aW9uKTtcclxuICAgIGlmIChhY3Rpb24pIHtcclxuICAgICAgYWN0aW9uKGNsaWNrZWRCdG4pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc29sZS53YXJuKGBObyBhY3Rpb24gZm91bmQgZm9yOiAke2V2ZW50QWN0aW9ufWApO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgc2hvd1ZpZXdPcHRzTWVudSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlVmlld09wdHNNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDb21wSW1hZ2VPclRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy50eHRPckltZyA9PT0gXCJpbWFnZVwiKSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcInRleHRcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB9XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPVxyXG4gICAgICB0aGlzLnR4dE9ySW1nO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlVmlld0J0bkluZGV4ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxWaWV3T3B0QnRucy5mb3JFYWNoKChlbCwgaW5kZXgpID0+IHtcclxuICAgICAgaWYgKGVsLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgIHRoaXMuYWN0aXZlVmlld0J0bkluZGV4ID0gaW5kZXg7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfTtcclxuICBoaWRlQWxsRGF0YSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZGVhY3RpdmF0ZUFsbERhdGFXcmFwcGVycygpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICB9O1xyXG4gIHNob3dEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBBcnJheS5mcm9tKFxyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIiksXHJcbiAgICApW3RoaXMuY3RybEJ0bkluZGV4XTtcclxuICAgIHRoaXMuYWN0aXZlRGF0YVNoZWV0LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlQmFja0J0biA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dCYWNrQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi5jdHJsLWJ0blwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIuY3RybC1idG4tYmFja1wiKVxyXG4gICAgICAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHJlc2V0QWxsRGF0YVNoZWV0cyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsRGF0YS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIGVsLnF1ZXJ5U2VsZWN0b3IoXCIuY29tcC1kYXRhLWJvZHktd3JhcFwiKS5zY3JvbGwoMCwgMCk7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0TGFzdEFjdGl2ZVZpZXcgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3ID0gZnVuY3Rpb24gKHRleHRDb250ZW50KSB7XHJcbiAgICB0aGlzLmFjdGl2ZVZpZXcgPSB0ZXh0Q29udGVudDtcclxuICB9O1xyXG4gIHZpZXdCYWNrVG9TdGFydCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gVklFV19TVEFSVF9FTkRbdGhpcy5sYXN0QWN0aXZlVmlldy52aWV3XS5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLmVuZFRpbWU7XHJcbiAgfTtcclxuICBzZXRWaWV3VmlkU3RhcnRBbmRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gdHJ1ZTtcclxuICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgIT09IFwidmlldy1hXCIgJiYgdGhpcy5hY3RpdmVWaWV3ID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgIHRoaXMudmlld0JhY2tUb1N0YXJ0KCk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgIT09IFwidmlldy1hXCIgJiYgdGhpcy5hY3RpdmVWaWV3ICE9PSBcInZpZXctYVwiKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IHRydWU7XHJcbiAgICAgIHRoaXMudmlld0JhY2tUb1N0YXJ0KCk7XHJcbiAgICAgIHRoaXMuYWxsVmlld09wdEJ0bnMuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgICBpZiAoZWwudGV4dENvbnRlbnQgPT09IHRoaXMuYWN0aXZlVmlldykge1xyXG4gICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRBY3RpdmVWaWV3QnRuSW5kZXgoZWwpO1xyXG4gICAgICB9KTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgdGhpcy5zdGFydFRpbWUgPVxyXG4gICAgICB0aGlzLmFsbFZpZXdPcHRCdG5zW3RoaXMuYWN0aXZlVmlld0J0bkluZGV4XS5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IHRoaXMuYWxsVmlld09wdEJ0bnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdLmRhdGFzZXQuZW5kVGltZTtcclxuICB9O1xyXG4gIHNldERhdGFWaWRTdGFydEFuZEVuZCA9IGZ1bmN0aW9uIChjbGlja2VkKSB7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnID0gZmFsc2U7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9IGNsaWNrZWQuZGF0YXNldC5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWUgPSBjbGlja2VkLmRhdGFzZXQuZW5kVGltZTtcclxuICB9O1xyXG4gIHNldERhdGFWaWRQb3N0ZXIgPSBmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgIGlmICghbmV3VmFsdWUpIG5ld1ZhbHVlID0gdGhpcy5hY3RpdmVWaWV3O1xyXG4gICAgY29uc3QgYWN0aXZlVmlkID0gdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCk7XHJcbiAgICBpZiAoIWFjdGl2ZVZpZCB8fCBhY3RpdmVWaWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmNsYXNzTGlzdFsxXSAhPT0gXCJkYXRhXCIpXHJcbiAgICAgIHJldHVybjtcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18xX01QKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18yX01QKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18zX01QKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBEQVRBX1ZJRVdfMSk7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBEQVRBX1ZJRVdfMik7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKG5ld1ZhbHVlID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkLnNldEF0dHJpYnV0ZShcInBvc3RlclwiLCBEQVRBX1ZJRVdfMyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIHNldERhdGFWaWRCYWNrZ3JvdW5kSW1nID0gZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgYWN0aXZlVmlkID0gdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCk7XHJcbiAgICBjb25zdCBhY3RpdmVWaWRXcmFwID0gYWN0aXZlVmlkLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIik7XHJcbiAgICBpZiAoYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmNvbnRhaW5zKFwibXBcIikpIHtcclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzFfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfMl9NUH1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18zX01QfVwiKWA7XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18xfVwiKWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWJcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzJ9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctY1wiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfM31cIilgO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxEYXRhV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheVZpZXdWaWQgPSBmdW5jdGlvbiAoY2xpY2tlZFZpZXdPcHRzQnRuKSB7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIGNsaWNrZWRWaWV3T3B0c0J0bi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpOyAvL2ZvciBEYXRhLnNldEFjdGl2ZVZpZXdCdG5JbmRleFxyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3QnRuSW5kZXgoKTtcclxuICAgIHRoaXMudmlld09wdHNNZW51LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzQnRuLnRleHRDb250ZW50ID0gY2xpY2tlZFZpZXdPcHRzQnRuLnRleHRDb250ZW50O1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlciA9IHRoaXMuYWxsRGF0YVdyYXBwZXJzW3RoaXMuYWN0aXZlVmlld0J0bkluZGV4XTtcclxuICAgIHRoaXMuc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWxcclxuICAgICAgLmdldEFjdGl2ZVNlY3Rpb24oKVxyXG4gICAgICAucXVlcnlTZWxlY3RvckFsbChcIi52aWQtY29kZVwiKVxyXG4gICAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9KTsgLy9zbyBnbG9iYWwuc2V0QWN0aXZlVmlkIGNhbiBwaWNrIGR0IG9yIG1wIGZyb20gYWN0aXZlc1xyXG4gICAgdGhpcy5zZXRMYXN0QWN0aXZlVmlldygpOyAvL2ZvciB0aGUgYmNrZ3JuZCBpbWdcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuc2V0QWN0aXZlVmlldyhjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQpOyAvL2ZvciB0aGUgcG9zdGVyXHJcblxyXG4gICAgLy9wbGF5IHZpZFxyXG4gICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICB9O1xyXG4gIHNldEFuZFBsYXlDdHJsQnRuVmlkID0gZnVuY3Rpb24gKGNsaWNrZWRDdHJsQnRuKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIHRoZSBiY2tncm5kIGltZyB0byBjaGFuZ2UgdG8gY29tcCB2aWQgc3RhcnRzXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgdGhpcy5jdHJsQnRuSW5kZXggPSB0aGlzLmdsb2JhbC5nZXRDdHJsQnRuSW5kZXgoY2xpY2tlZEN0cmxCdG4pO1xyXG5cclxuICAgIC8vcGxheVxyXG4gICAgdGhpcy5zZXREYXRhVmlkU3RhcnRBbmRFbmQoY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpOyAvL3JlbW92ZXMgYmxhY2tvdXQgaW4gZ2xvYmFsLnBsYXlSYW5nZVxyXG4gIH07XHJcbiAgcGxheURhdGFWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKHRoaXMuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUodGhpcy5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgdmlkRW5kID0gZnVuY3Rpb24gKCkge1xyXG4gICAgaWYgKHRoaXMudmlld1ZpZEZsYWcgJiYgIXRoaXMudmlld0NoYWluRmxhZykge1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRQb3N0ZXIoKTsgLy9kb25lIGhlcmUgc28gcG9zdGVyIGRvZXNuJ3QgYXBwZWFyIGVhcmxpZXJcclxuICAgICAgdGhpcy5zaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIoKTtcclxuICAgICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZW5hYmxlTmF2TGlua3NBbmROYXZCdG4oKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMudmlld0NoYWluRmxhZyA9IGZhbHNlO1xyXG4gICAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KFwidmlldy1hXCIpO1xyXG4gICAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICAgIHRoaXMuc2V0Vmlld1ZpZFN0YXJ0QW5kRW5kKCk7XHJcbiAgICAgIHRoaXMucGxheURhdGFWaWQoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXJcclxuICAgICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLnNob3dEYXRhKHRoaXMuY3RybEJ0bkluZGV4KTtcclxuICAgICAgdGhpcy5zaG93QmFja0J0bigpO1xyXG5cclxuICAgICAgLy9zZXQgYmNrZ3JuZCBpbWcgdG8gYmxhY2sgdG8gcHJldmVudCBmbGFzaCBvZiBpbWFnZSB3aGVuIGNoYW5naW5nIG5hdlxyXG4gICAgICB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKS5jbG9zZXN0KFwiLnZpZC13cmFwcGVyXCIpLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9XHJcbiAgICAgICAgXCJub25lXCI7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIikuc3R5bGUuYmFja2dyb3VuZENvbG9yID1cclxuICAgICAgICBcImJsYWNrXCI7XHJcbiAgICB9XHJcbiAgfTtcclxuICBiYWNrVG9WaWV3RnJvbUNvbXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICAvL3NldHRpbmcgVUkgYW5kIGxvZ2ljLi4uXHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLnF1ZXJ5U2VsZWN0b3IoXCIudHh0LWltZy1idG5cIikudGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKVxyXG4gICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMucmVzZXRBbGxEYXRhU2hlZXRzKCk7XHJcbiAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuaGlkZUJhY2tCdG4oKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgfTtcclxuICBoaWRlQWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93Q3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyID1cclxuICAgICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdO1xyXG4gIH07XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IERhdGE7XHJcbiIsICJjbGFzcyBTZXF1ZW5jZSB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuYWxsSW50cm9UZXh0ID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmludHJvLXRleHQtd3JhcFwiKSxcclxuICAgIF07XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLmFjdGlvbi1oZWFkaW5nXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpO1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVycyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLnNlcXVlbmNlVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWQuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSBmdW5jdGlvbiAoY2xpY2tlZE5hdkxpbmssIGluZGV4KSB7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSBpbmRleCA/PyAwO1xyXG4gICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgdGhpcy5oaWRlQWxsSW50cm9UZXh0KCk7XHJcbiAgICB0aGlzLmhpZGVBbGxBY3Rpb25IZWFkaW5ncygpO1xyXG4gICAgdGhpcy5hbGxJbnRyb1RleHRbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVTZXF1ZW5jZVZpZFdyYXAoKTtcclxuICB9O1xyXG4gIGhhbmRsZUV2ZW50ID0gKGV2ZW50QWN0aW9uLCBjbGlja2VkQnRuKSA9PiB7XHJcbiAgICBjb25zdCBhY3Rpb24gPSB0aGlzLmV2ZW50TWFwLmdldChldmVudEFjdGlvbik7XHJcbiAgICBpZiAoYWN0aW9uKSB7XHJcbiAgICAgIGFjdGlvbihjbGlja2VkQnRuKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnNvbGUud2FybihgTm8gYWN0aW9uIGZvdW5kIGZvcjogJHtldmVudEFjdGlvbn1gKTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldFNlcXVlbmNlSW5kZXggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgIGlmICghdmFsdWUpIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLnNlcXVlbmNlSW5kZXggPSB2YWx1ZTtcclxuICB9O1xyXG4gIGhpZGVBbGxJbnRyb1RleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dC5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBoaWRlQWxsQWN0aW9uSGVhZGluZ3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbEFjdGlvbkhlYWRpbmdzLmZvckVhY2goKGVsKSA9PiB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNldEFjdGl2ZVNlcXVlbmNlVmlkV3JhcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gICAgdGhpcy5hbGxWaWRXcmFwcGVyc1t0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBwbGF5Q3RybEJ0blZpZCA9IGZ1bmN0aW9uIChjbGlja2VkQ3RybEJ0bikge1xyXG4gICAgdGhpcy5jbGVhclNlcXVlbmNlVGltZXJzKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmVuYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hbGxJbnRyb1RleHRbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5nc1t0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0U3RhcnRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuc3RhcnRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEVuZFRpbWUoY2xpY2tlZEN0cmxCdG4uZGF0YXNldC5lbmRUaW1lKTtcclxuICAgIHRoaXMuZ2xvYmFsLmFjdGl2YXRlQ3VycmVudEJ0bihjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLmdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICBwYXVzZUN0cmxWaWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmdsb2JhbC50b2dnbGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHZpZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPT09IGZhbHNlKSB7XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSh0aGlzLnBhdXNlV3JhcHBlcik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBjbGVhclNlcXVlbmNlVGltZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gdHJ1ZTtcclxuICAgIGNsZWFyVGltZW91dCh0aGlzLnNlcXVlbmNlVGltZXIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZVRpbWVyID0gbnVsbDtcclxuICB9O1xyXG59XHJcbmV4cG9ydCBkZWZhdWx0IFNlcXVlbmNlO1xyXG4iLCAiY29uc29sZS5sb2coXCJCUkFOQ0g6IG5ld01vZHVsZXMtMlwiKTtcclxuXHJcbmltcG9ydCB7IFNUQVJUX1VJX1JFVkVBTCB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbmltcG9ydCAqIGFzIGdsb2JhbCBmcm9tIFwiLi8wLWdsb2JhbFwiO1xyXG5pbXBvcnQgTmF2YmFyIGZyb20gXCIuLzAtbmF2YmFyXCI7XHJcbmltcG9ydCBGZWF0dXJlc0NsYXNzIGZyb20gXCIuLzEtZmVhdHVyZXNcIjtcclxuaW1wb3J0IERhdGFDbGFzcyBmcm9tIFwiLi8yLWRhdGFcIjtcclxuaW1wb3J0IFNlcXVlbmNlQ2xhc3MgZnJvbSBcIi4vMy1zZXF1ZW5jZVwiO1xyXG5cclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL2luaXQgY2FsbCAoZnVuY3Rpb24gYXQgYm90dG9tKS4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICBpbml0KCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuY29uc3QgZmVhdHVyZXNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24uZmVhdHVyZXNcIik7XHJcbmNvbnN0IGRhdGFDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24uZGF0YVwiKTtcclxuY29uc3Qgc2VxdWVuY2VDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24uc2VxdWVuY2VcIik7XHJcblxyXG4vLyBNYWluLmpzXHJcbi8vIGNvbnN0IGFsbFNlcXVlbmNlQ29udGFpbmVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi5zZXF1ZW5jZVwiKTtcclxuXHJcbmNvbnN0IGZlYXR1cmVzID0gbmV3IEZlYXR1cmVzQ2xhc3MoZ2xvYmFsLCBmZWF0dXJlc0NvbnRhaW5lcik7XHJcbmNvbnN0IGRhdGEgPSBuZXcgRGF0YUNsYXNzKGdsb2JhbCwgZGF0YUNvbnRhaW5lcik7XHJcbmNvbnN0IHNlcXVlbmNlID0gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBzZXF1ZW5jZUNvbnRhaW5lcik7XHJcbi8vIGNvbnN0IHNlcXVlbmNlSW5zdGFuY2VzID0gQXJyYXkuZnJvbShhbGxTZXF1ZW5jZUNvbnRhaW5lcnMpLm1hcCgoZWwpID0+IHtcclxuLy8gICByZXR1cm4gbmV3IFNlcXVlbmNlQ2xhc3MoZ2xvYmFsLCBlbCk7XHJcbi8vIH0pO1xyXG5jb25zdCBTRUNUSU9OUyA9IHtcclxuICBmZWF0dXJlczogZmVhdHVyZXMsXHJcbiAgZGF0YTogZGF0YSxcclxuICBzZXF1ZW5jZTogc2VxdWVuY2UsXHJcbn07XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLU5BVi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL25hdl9tZW51X2xpbmtcclxuTmF2YmFyLm5hdk1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIubmF2X21lbnVfbGlua1wiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBjbGlja2VkU2VjdGlvbk5hbWUgPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1tjbGlja2VkU2VjdGlvbk5hbWVdO1xyXG4gIGlmIChjbGlja2VkU2VjdGlvbk5hbWUgPT09IGdsb2JhbC5nZXRBY3RpdmVTZWN0aW9uTmFtZSgpKSByZXR1cm47XHJcbiAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuICBjbGVhckFsbFRpbWVycygpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIGZlYXR1cmVzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIHNlcXVlbmNlLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIC8vMi4gU3RhdGUgdXBkYXRlXHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oY2xpY2tlZFNlY3Rpb25OYW1lKTtcclxuICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuICB0YXJnZXRNb2R1bGUuaW5pdFNlY3Rpb24oY2xpY2tlZCk7XHJcbn0pO1xyXG5cclxuTmF2YmFyLm5hdk1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIuZHJvcGRvd24taWNvblwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBOYXZiYXIudG9nZ2xlTmF2KGNsaWNrZWQpO1xyXG59KTtcclxuTmF2YmFyLm5hdkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKCkge1xyXG4gIE5hdmJhci5jbG9zZU5hdk1lbnUoKTtcclxufSk7XHJcbk5hdmJhci5hbGxOYXZMaW5rc1dpdGhEcm9wZG93bi5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGVsLnBhcmVudEVsZW1lbnRcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbn0pO1xyXG5OYXZiYXIuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBlbC5wYXJlbnRFbGVtZW50XHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59KTtcclxuTmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfSk7XHJcbn0pO1xyXG5OYXZiYXIuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufSk7XHJcbk5hdmJhci5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICAgIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstZHJvcGRvd25cIik7XHJcbiAgICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICAgIGNsZWFyQWxsVGltZXJzKCk7XHJcbiAgICBnbG9iYWwuZGVhY3RpdmF0ZUN1cnJlbnRCdG5zKCk7XHJcbiAgICBOYXZiYXIuY2xvc2VOYXZNZW51KCk7XHJcbiAgICBpZiAod2luZG93LmdldENvbXB1dGVkU3R5bGUoTmF2YmFyLm5hdkJ0bikuZGlzcGxheSAhPT0gXCJub25lXCIpIHtcclxuICAgICAgTmF2YmFyLm5hdkJ0bi5jbGljaygpO1xyXG4gICAgfVxyXG4gICAgTmF2YmFyLmdldERyb3Bkb3duSW5kZXgoY2xpY2tlZCk7XHJcbiAgICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcInNlcXVlbmNlXCIpO1xyXG4gICAgc2VxdWVuY2UuaW5pdFNlY3Rpb24obnVsbCwgTmF2YmFyLmRyb3Bkb3duSW5kZXgpO1xyXG4gICAgZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIGdsb2JhbC5kaXNhYmxlUGF1c2UoKTtcclxuICAgIGdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTtcclxuICAgIGdsb2JhbC5hY3RpdmF0ZUN1cnJlbnROYXZMaW5rKFxyXG4gICAgICBjbGlja2VkLmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay13cmFwXCIpLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfbGlua1wiKSxcclxuICAgICk7XHJcbiAgICBnbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICB9KTtcclxufSk7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9FVkVOVCBERUxFR0FUSU9OLUJUTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG4gIGNvbnN0IHRhcmdldE1vZHVsZSA9IFNFQ1RJT05TW2FjdGl2ZVNlY3Rpb25dO1xyXG4gIGNvbnN0IGFjdGlvbiA9IGNsaWNrZWQuZGF0YXNldC5jbGlja0FjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoYWN0aW9uLCBjbGlja2VkKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsIGZ1bmN0aW9uIChlKSB7XHJcbiAgY29uc3QgaG92ZXJlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1tb3VzZW92ZXItYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICBpZiAodGhpcy5jdXJyZW50SG92ZXIgPT09IGhvdmVyZWQpIHJldHVybjsgLy8gRXhpdCBpZiB3ZSBhcmUgYWxyZWFkeSBob3ZlcmluZyBpdFxyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gaG92ZXJlZDtcclxuXHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdmVyQWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChhY3Rpb24sIGhvdmVyZWQpO1xyXG59KTtcclxuZ2xvYmFsLm1haW5XcmFwcGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdXQtYWN0aW9uXVwiKTtcclxuICBpZiAoIWhvdmVyZWQpIHJldHVybjtcclxuICAvLyBJZiB0aGUgbW91c2UgbW92ZWQgdG8gYSBjaGlsZCBvZiB0aGUgc2FtZSBidXR0b24sIGRvbid0IHRyaWdnZXIgdGhlIFwiRXhpdFwiXHJcbiAgaWYgKGhvdmVyZWQuY29udGFpbnMoZS5yZWxhdGVkVGFyZ2V0KSkgcmV0dXJuO1xyXG4gIHRoaXMuY3VycmVudEhvdmVyID0gbnVsbDtcclxuXHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGhvdmVyZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBob3ZlcmVkLmRhdGFzZXQubW91c2VvdXRBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGFjdGlvbiwgaG92ZXJlZCk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1WSURTLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9lbmRlZFxyXG5nbG9iYWwuYWxsVmlkcy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJlbmRlZFwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCB2aWRUeXBlID0gZ2xvYmFsLmdldFZpZFR5cGUoZWwpO1xyXG4gICAgc3dpdGNoICh2aWRUeXBlKSB7XHJcbiAgICAgIGNhc2UgXCJmZWF0dXJlc1wiOlxyXG4gICAgICAgIGZlYXR1cmVzLnZpZEVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlIFwiZGF0YVwiOlxyXG4gICAgICAgIGRhdGEudmlkRW5kKGVsLmNsb3Nlc3QoXCIudmlkXCIpKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInNlcXVlbmNlXCI6XHJcbiAgICAgICAgc2VxdWVuY2UudmlkRW5kKCk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICB9XHJcbiAgfSk7XHJcbn0pO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0XHJcbmNvbnN0IGluaXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgc2V0dXBMYXp5TG9hZGluZygpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gIE5hdmJhci5uYXZDb21wb25lbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICBOYXZiYXIuYWxsTmF2RHJvcGRvd25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKFwiZmVhdHVyZXNcIik7XHJcbiAgZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG4gIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gIGZlYXR1cmVzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgIE5hdmJhci5uYXZDb21wb25lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGZlYXR1cmVzLmluaXRTZWN0aW9uKG51bGwsIHRydWUpO1xyXG4gIH0sIFNUQVJUX1VJX1JFVkVBTCk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxufTtcclxuY29uc3Qgc2V0dXBMYXp5TG9hZGluZyA9IGZ1bmN0aW9uICgpIHtcclxuICBjb25zdCBhbGxMYXp5VmlkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpO1xyXG4gIGNvbnN0IG9ic2VydmVyT3B0aW9ucyA9IHtcclxuICAgIHJvb3Q6IG51bGwsXHJcbiAgICByb290TWFyZ2luOiBcIjBweFwiLFxyXG4gICAgdGhyZXNob2xkOiAwLjEsXHJcbiAgfTtcclxuICBjb25zdCB2aWRlb09ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKChlbnRyaWVzKSA9PiB7XHJcbiAgICBlbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIGNvbnN0IHZpZGVvID0gZW50cnkudGFyZ2V0O1xyXG4gICAgICBjb25zdCBzb3VyY2VzID0gdmlkZW8ucXVlcnlTZWxlY3RvckFsbChcInNvdXJjZVwiKTtcclxuICAgICAgaWYgKGVudHJ5LmlzSW50ZXJzZWN0aW5nKSB7XHJcbiAgICAgICAgLy8gLS0tIExPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIFVzZSBkYXRhLXNyYyBpZiBhdmFpbGFibGUsIG90aGVyd2lzZSBrZWVwIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBkYXRhU3JjID0gc291cmNlLmdldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIpIHx8IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoZGF0YVNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc3JjID0gZGF0YVNyYztcclxuICAgICAgICAgICAgLy8gS2VlcCBkYXRhLXNyYyBhdHRyaWJ1dGUgc28gd2UgY2FuIGZpbmQgdGhlIFVSTCBhZ2FpbiBsYXRlclxyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgZGF0YVNyYyk7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIC0tLSBVTkxPQUQgTE9HSUMgLS0tXHJcbiAgICAgICAgLy8gQ2xlYXJzIHRoZSBpbnRlcm5hbCBsb2dzIGZvciB1c2VyIGludGVyYWN0aW9ucyBhbmQgcmVzb3VyY2UgbG9hZHNcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1lYXN1cmVzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJSZXNvdXJjZVRpbWluZ3MoKTtcclxuICAgICAgICBwZXJmb3JtYW5jZS5jbGVhck1hcmtzKCk7XHJcbiAgICAgICAgUmVzZXRTZWN0aW9uKHZpZGVvLmNsb3Nlc3QoXCIuc2VjdGlvblwiKSk7XHJcbiAgICAgICAgdmlkZW8ucGF1c2UoKTtcclxuICAgICAgICBzb3VyY2VzLmZvckVhY2goKHNvdXJjZSkgPT4ge1xyXG4gICAgICAgICAgLy8gTW92ZSBzcmMgYmFjayB0byBkYXRhLXNyYyBhbmQgZW1wdHkgdGhlIGN1cnJlbnQgc3JjXHJcbiAgICAgICAgICBjb25zdCBjdXJyZW50U3JjID0gc291cmNlLnNyYztcclxuICAgICAgICAgIGlmIChjdXJyZW50U3JjKSB7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiLCBjdXJyZW50U3JjKTtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IFwiXCI7IC8vIFRoaXMgc3RvcHMgdGhlIHZpZGVvIGZyb20gYnVmZmVyaW5nXHJcbiAgICAgICAgICAgIHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoXCJzcmNcIik7IC8vIEZ1bGx5IGNsZWFyIGF0dHJpYnV0ZVxyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIEZvcmNlIHRoZSBicm93c2VyIHRvIGR1bXAgdGhlIHZpZGVvIGRhdGEgZnJvbSBtZW1vcnlcclxuICAgICAgICB2aWRlby5sb2FkKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sIG9ic2VydmVyT3B0aW9ucyk7XHJcbiAgYWxsTGF6eVZpZHMuZm9yRWFjaCgodmlkKSA9PiB2aWRlb09ic2VydmVyLm9ic2VydmUodmlkKSk7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vUkVTRVQgVklEUyBBRlRFUiBVTkxPQURJTkcuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBjb25zdCBSZXNldFNlY3Rpb24gPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gICAgaWYgKCFzZWN0aW9uKSByZXR1cm47IC8vaGVscHMgcHJldmVudCBjcmFzaGVzXHJcbiAgICBzZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgZWwucGF1c2UoKTtcclxuICAgIH0pO1xyXG4gICAgZ2xvYmFsLmRlYWN0aXZhdGVDdXJyZW50QnRucyhzZWN0aW9uKTtcclxuICB9O1xyXG59O1xyXG4vL2ZlYXR1cmVzIGFuZCBzZXF1ZW5jZSB0aW1lcnNcclxuY29uc3QgY2xlYXJBbGxUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZmVhdHVyZXMuY2xlYXJGZWF0dXJlc1RpbWVycygpO1xyXG4gIHNlcXVlbmNlLmNsZWFyU2VxdWVuY2VUaW1lcnMoKTtcclxufTtcclxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7QUFBTyxNQUFNLGtCQUFrQjtBQUV4QixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLDBCQUEwQjtBQUNoQyxNQUFNLGdCQUFnQjtBQUl0QixNQUFNLGNBQ1g7QUFDSyxNQUFNLGlCQUNYO0FBQ0ssTUFBTSxjQUNYO0FBQ0ssTUFBTSxpQkFDWDtBQUNLLE1BQU0sY0FDWDtBQUNLLE1BQU0saUJBQ1g7QUFFSyxNQUFNLGlCQUFpQjtBQUFBLElBQzVCLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQSxVQUFVO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1g7QUFBQSxFQUNG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
