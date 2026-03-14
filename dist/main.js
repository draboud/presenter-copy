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
        ["open-features", this.initSection.bind(this)],
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //EVENT MAP..............................................................
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
    initSection = function(clicked, index) {
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
      this.eventMap = /* @__PURE__ */ new Map([
        ["open-sequence", this.initSection.bind(this)],
        ["open-sequence-index", this.activateSectionIndex.bind(this)],
        ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
        ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)]
      ]);
    }
    //.......................................................................
    //FUNCTIONS..............................................................
    initSection = function(clicked, index) {
      this.sequenceIndex = index ?? 0;
      this.global.flashBlackout();
      this.pauseWrapper.classList.remove("active");
      this.global.disablePause();
      this.hideAllIntroText();
      this.hideAllActionHeadings();
      this.allIntroText[this.sequenceIndex].classList.add("active");
      this.setActiveSequenceVidWrap(this.sequenceIndex);
      this.global.activateCurrentNavLink(
        clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
      );
    };
    activateSectionIndex = function(clickedBtn) {
      console.log(clickedBtn);
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
  navbar_default.navComponent.addEventListener("click", function(e) {
    const clicked = e.target.closest("[data-click-action]");
    if (!clicked) return;
    const activeSection2 = clicked.dataset.navSection;
    const targetModule = SECTIONS[activeSection2];
    const action = clicked.dataset.clickAction;
    if (activeSection2 === getActiveSectionName()) return;
    clearAllTimers();
    blackout.classList.remove("off");
    setActiveSection(activeSection2);
    console.log(action);
    targetModule.handleEvent(action, clicked);
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vc3JjLzAtY29uZmlnLmpzIiwgIi4uL3NyYy8wLWdsb2JhbC5qcyIsICIuLi9zcmMvMC1uYXZiYXIuanMiLCAiLi4vc3JjLzEtZmVhdHVyZXMuanMiLCAiLi4vc3JjLzItZGF0YS5qcyIsICIuLi9zcmMvMy1zZXF1ZW5jZS5qcyIsICIuLi9zcmMvbWFpbi5qcyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGNvbnN0IFNUQVJUX1VJX1JFVkVBTCA9IDE1MDA7XHJcbmV4cG9ydCBjb25zdCBPS19CVE5fUkVWRUFMID0gMTUwMDtcclxuZXhwb3J0IGNvbnN0IEJMQUNLT1VUX1RJTUVSID0gMjAwO1xyXG5leHBvcnQgY29uc3QgQkxBQ0tPVVRfV0FJVF9UT19SRVZFQUwgPSA1MDtcclxuZXhwb3J0IGNvbnN0IFZJRF9FTkRfVElNRVIgPSAxNTAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX1NUQVJUX1RJTUUgPSAwO1xyXG5leHBvcnQgY29uc3QgRkVBVFVSRVNfSU5UUk9fVklEX0VORF9USU1FID0gNy43NjtcclxuXHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMSA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3ODcwN2M3Yjc0YTUyNGY5ZjRfRGF0YS1WaWV3LTEud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzFfTVAgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2NzgwYmZmZDA1NTI2ODAwNmQ1X0RhdGEtVmlldy0xLU1QLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18yID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4ODUxNDE5MmRkMTE4ZjkyZV9EYXRhLVZpZXctMi53ZWJwXCI7XHJcbmV4cG9ydCBjb25zdCBEQVRBX1ZJRVdfMl9NUCA9XHJcbiAgXCJodHRwczovL2Nkbi5wcm9kLndlYnNpdGUtZmlsZXMuY29tLzY5YjA2MDcyNmM5YzEwZDBjZWJiZjVmMy82OWIwNjY3OGY5NWUzZjRiMzQ3YzIxYTZfRGF0YS1WaWV3LTItTVAud2VicFwiO1xyXG5leHBvcnQgY29uc3QgREFUQV9WSUVXXzMgPVxyXG4gIFwiaHR0cHM6Ly9jZG4ucHJvZC53ZWJzaXRlLWZpbGVzLmNvbS82OWIwNjA3MjZjOWMxMGQwY2ViYmY1ZjMvNjliMDY2Nzg2NjNkNDgwMGNjNWY5OTM1X0RhdGEtVmlldy0zLndlYnBcIjtcclxuZXhwb3J0IGNvbnN0IERBVEFfVklFV18zX01QID1cclxuICBcImh0dHBzOi8vY2RuLnByb2Qud2Vic2l0ZS1maWxlcy5jb20vNjliMDYwNzI2YzljMTBkMGNlYmJmNWYzLzY5YjA2Njc4NWM3MDk4OTBmMWYwMjY3OV9EYXRhLVZpZXctMy1NUC53ZWJwXCI7XHJcblxyXG5leHBvcnQgY29uc3QgVklFV19TVEFSVF9FTkQgPSB7XHJcbiAgXCJ2aWV3LWFcIjoge1xyXG4gICAgc3RhcnRUaW1lOiAwLFxyXG4gICAgZW5kVGltZTogMCxcclxuICB9LFxyXG4gIFwidmlldy1iXCI6IHtcclxuICAgIHN0YXJ0VGltZTogMS40OCxcclxuICAgIGVuZFRpbWU6IDIuNjksXHJcbiAgfSxcclxuICBcInZpZXctY1wiOiB7XHJcbiAgICBzdGFydFRpbWU6IDQuNDQsXHJcbiAgICBlbmRUaW1lOiA1LjY1LFxyXG4gIH0sXHJcbn07XHJcbiIsICJpbXBvcnQgeyBCTEFDS09VVF9USU1FUiB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5leHBvcnQgY29uc3QgbWFpbldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4td3JhcHBlclwiKTtcclxuZXhwb3J0IGNvbnN0IGJsYWNrb3V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5ibGFja291dFwiKTtcclxuZXhwb3J0IGNvbnN0IGFsbFNlY3Rpb25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvblwiKV07XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRDb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGVcIik7XHJcbmV4cG9ydCBjb25zdCBhbGxWaWRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi52aWRcIik7XHJcbmxldCBhY3RpdmVTZWN0aW9uO1xyXG5sZXQgYWN0aXZlU2VjdGlvbk5hbWU7XHJcbmxldCBhY3RpdmVWaWQ7XHJcbmxldCBzdGFydFRpbWU7XHJcbmxldCBlbmRUaW1lO1xyXG5sZXQgcGF1c2VGbGFnO1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vR0xPQkFMIEZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuZXhwb3J0IGNvbnN0IGZsYXNoQmxhY2tvdXQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgIGJsYWNrb3V0LmNsYXNzTGlzdC5hZGQoXCJvZmZcIik7XHJcbiAgfSwgQkxBQ0tPVVRfVElNRVIpO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZW5hYmxlTmF2TGlua3NBbmROYXZCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudVwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJhdXRvXCI7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0biA9IGZ1bmN0aW9uICgpIHtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxuICBpZiAoXHJcbiAgICB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51XCIpKS5kaXNwbGF5ID09PVxyXG4gICAgXCJibG9ja1wiXHJcbiAgKSB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9idXR0b25cIikuY2xpY2soKTtcclxuICB9XHJcblxyXG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X2J1dHRvblwiKS5zdHlsZS5wb2ludGVyRXZlbnRzID0gXCJub25lXCI7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBhY3RpdmF0ZUN1cnJlbnROYXZMaW5rID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudE5hdkxpbmtzKCk7XHJcbiAgY2xpY2tlZC5jbGFzc0xpc3QuYWRkKFwiY3VycmVudFwiKTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGRlYWN0aXZhdGVDdXJyZW50TmF2TGlua3MgPSBmdW5jdGlvbiAoKSB7XHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZVNlY3Rpb24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgcmV0dXJuIGFjdGl2ZVNlY3Rpb247XHJcbn07XHJcbmV4cG9ydCBjb25zdCBnZXRBY3RpdmVTZWN0aW9uTmFtZSA9IGZ1bmN0aW9uICgpIHtcclxuICByZXR1cm4gYWN0aXZlU2VjdGlvbk5hbWU7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBzZXRBY3RpdmVTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb25OYW1lLCBpbmRleCkge1xyXG4gIGRlYWN0aXZhdGVBbGxTZWN0aW9ucygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25OYW1lID0gc2VjdGlvbk5hbWU7XHJcbiAgaWYgKCFpbmRleCkgaW5kZXggPSAwO1xyXG4gIGNvbnN0IG1hdGNoZXMgPSBhbGxTZWN0aW9ucy5maWx0ZXIoXHJcbiAgICAoZWwpID0+IGVsLmRhdGFzZXQuc2VjdGlvbiA9PT0gc2VjdGlvbk5hbWUsXHJcbiAgKTtcclxuICBjb25zdCB0YXJnZXQgPSBtYXRjaGVzW2luZGV4XTtcclxuICBpZiAodGFyZ2V0KSB7XHJcbiAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIGFjdGl2ZVNlY3Rpb24gPSB0YXJnZXQ7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGVhY3RpdmF0ZUFsbFNlY3Rpb25zID0gZnVuY3Rpb24gKCkge1xyXG4gIGFsbFNlY3Rpb25zLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZ2V0VmlkVHlwZSA9IGZ1bmN0aW9uICh2aWRlbykge1xyXG4gIHJldHVybiB2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikuZGF0YXNldC5zZWN0aW9uO1xyXG59O1xyXG5leHBvcnQgZnVuY3Rpb24gZ2V0QWN0aXZlVmlkKCkge1xyXG4gIHJldHVybiBhY3RpdmVWaWQ7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEFjdGl2ZVZpZCgpIHtcclxuICBhbGxWaWRDb2Rlcy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgaWYgKGVsLm9mZnNldFBhcmVudCAhPT0gbnVsbCkge1xyXG4gICAgICBhY3RpdmVWaWQgPSBlbC5xdWVyeVNlbGVjdG9yKFwiLnZpZFwiKTtcclxuICAgIH1cclxuICB9KTtcclxufVxyXG5leHBvcnQgZnVuY3Rpb24gc2V0U3RhcnRUaW1lKG5ld1ZhbHVlKSB7XHJcbiAgc3RhcnRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHNldEVuZFRpbWUobmV3VmFsdWUpIHtcclxuICBlbmRUaW1lID0gbmV3VmFsdWU7XHJcbn1cclxuZXhwb3J0IGNvbnN0IGNsZWFyU2VjdGlvblZpZFNyYyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5zcmMgPSBcIlwiO1xyXG4gICAgZWwubG9hZCgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcmVzZXRBbGxTZWN0aW9uVmlkcyA9IGZ1bmN0aW9uICgpIHtcclxuICBhY3RpdmVTZWN0aW9uLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICBlbC5wYXVzZSgpO1xyXG4gIH0pO1xyXG59O1xyXG5leHBvcnQgY29uc3QgcGxheVJhbmdlID0gZnVuY3Rpb24gKHZpZGVvQ3VycmVudFRpbWUpIHtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLkNIRUNLRURcclxuICBjb25zdCB2aWRDb2RlID0gYWN0aXZlVmlkLnBhcmVudEVsZW1lbnQ7XHJcbiAgY29uc3QgdGFyZ2V0U3RhcnQgPSB2aWRlb0N1cnJlbnRUaW1lIHx8IHN0YXJ0VGltZTtcclxuXHJcbiAgLy8gMS4gSElEREVOIFNUQVRFOiBJbnN0YW50IGhpZGUgdG8gcmV2ZWFsIHZpZC13cmFwcGVyIGJhY2tncm91bmQgaW1hZ2VcclxuICBpZiAodmlkQ29kZSkgdmlkQ29kZS5zdHlsZS5vcGFjaXR5ID0gXCIwXCI7XHJcblxyXG4gIC8vIENsZWFyIGFueSBleGlzdGluZyB0aW1ldXBkYXRlIG1vbml0b3JzXHJcbiAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IpO1xyXG5cclxuICBjb25zdCBtb25pdG9yVGltZSA9ICgpID0+IHtcclxuICAgIGlmIChhY3RpdmVWaWQuY3VycmVudFRpbWUgPj0gZW5kVGltZSAtIDAuMTUpIHtcclxuICAgICAgYWN0aXZlVmlkLnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICAgIGFjdGl2ZVZpZC5jdXJyZW50VGltZSA9IGVuZFRpbWU7XHJcbiAgICAgIGFjdGl2ZVZpZC5kaXNwYXRjaEV2ZW50KG5ldyBFdmVudChcImVuZGVkXCIpKTtcclxuICAgIH1cclxuICB9O1xyXG4gIGFjdGl2ZVZpZC5fY3VycmVudE1vbml0b3IgPSBtb25pdG9yVGltZTtcclxuXHJcbiAgLy8gU291cmNlIGhhbmRsaW5nXHJcbiAgY29uc3Qgc291cmNlID0gYWN0aXZlVmlkLnF1ZXJ5U2VsZWN0b3IoXCJzb3VyY2VcIik7XHJcbiAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZSA/IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSA6IG51bGw7XHJcbiAgaWYgKGRhdGFTcmMgJiYgYWN0aXZlVmlkLnNyYyAhPT0gZGF0YVNyYykge1xyXG4gICAgYWN0aXZlVmlkLnBhdXNlKCk7XHJcbiAgICBhY3RpdmVWaWQuc3JjID0gZGF0YVNyYztcclxuICAgIGFjdGl2ZVZpZC5sb2FkKCk7XHJcbiAgfVxyXG5cclxuICBjb25zdCBzdGFydFBsYXliYWNrU2VxdWVuY2UgPSBhc3luYyAoKSA9PiB7XHJcbiAgICB0cnkge1xyXG4gICAgICBhY3RpdmVWaWQuY3VycmVudFRpbWUgPSB0YXJnZXRTdGFydDtcclxuXHJcbiAgICAgIC8vIDIuIFRIRSBGQUlMLVNBRkUgUkVWRUFMXHJcbiAgICAgIC8vIFdlIHBvbGwgZm9yIHBoeXNpY2FsIHBsYXloZWFkIG1vdmVtZW50LiBPbmNlIGl0IG1vdmVzLFxyXG4gICAgICAvLyB0aGUgXCJibGFjayBidWZmZXJcIiBpcyBndWFyYW50ZWVkIHRvIGJlIGdvbmUuXHJcbiAgICAgIGNvbnN0IHBvbGxGb3JGcmFtZSA9ICgpID0+IHtcclxuICAgICAgICBpZiAoYWN0aXZlVmlkLmN1cnJlbnRUaW1lID4gdGFyZ2V0U3RhcnQpIHtcclxuICAgICAgICAgIC8vIERvdWJsZSBSQUYgaXMgdGhlIGZpbmFsIGd1YXJkIGZvciB0aGUgR1BVIHBhaW50IGN5Y2xlXHJcbiAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xyXG4gICAgICAgICAgICAgIGlmICh2aWRDb2RlKSB2aWRDb2RlLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcclxuICAgICAgICAgICAgICBpZiAodHlwZW9mIGJsYWNrb3V0ICE9PSBcInVuZGVmaW5lZFwiKVxyXG4gICAgICAgICAgICAgICAgYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICB9KTtcclxuICAgICAgICB9IGVsc2UgaWYgKCFhY3RpdmVWaWQucGF1c2VkKSB7XHJcbiAgICAgICAgICAvLyBJZiBzdGlsbCBhdCB0YXJnZXRTdGFydCBidXQgcGxheWluZywgY2hlY2sgYWdhaW4gbmV4dCBmcmFtZVxyXG4gICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHBvbGxGb3JGcmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9O1xyXG5cclxuICAgICAgLy8gMy4gU1RBUlRcclxuICAgICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJ0aW1ldXBkYXRlXCIsIG1vbml0b3JUaW1lKTtcclxuICAgICAgYXdhaXQgYWN0aXZlVmlkLnBsYXkoKTtcclxuICAgICAgcG9sbEZvckZyYW1lKCk7IC8vIFN0YXJ0IGNoZWNraW5nIGZvciB0aGUgZmlyc3QgcmVhbCBmcmFtZVxyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLndhcm4oXCJQbGF5YmFjayBmYWlsZWQ6XCIsIGUpO1xyXG4gICAgICAvLyBGYWxsYmFjazogc2hvdyB2aWRlbyBhbnl3YXkgaWYgcGxheSgpIGZhaWxzIChlLmcuIGF1dHBsYXkgYmxvY2tlZClcclxuICAgICAgaWYgKHZpZENvZGUpIHZpZENvZGUuc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xyXG4gICAgfVxyXG4gIH07XHJcblxyXG4gIC8vIFdhaXQgZm9yIGRhdGEgKHJlYWR5U3RhdGUgMyBpcyBIQVZFX0ZVVFVSRV9EQVRBKVxyXG4gIGlmIChhY3RpdmVWaWQucmVhZHlTdGF0ZSA+PSAzKSB7XHJcbiAgICBzdGFydFBsYXliYWNrU2VxdWVuY2UoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgYWN0aXZlVmlkLmFkZEV2ZW50TGlzdGVuZXIoXCJjYW5wbGF5XCIsIHN0YXJ0UGxheWJhY2tTZXF1ZW5jZSwge1xyXG4gICAgICBvbmNlOiB0cnVlLFxyXG4gICAgfSk7XHJcbiAgfVxyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcIm5vbmVcIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5wYXVzZS13cmFwcGVyXCIpLnN0eWxlLnBvaW50ZXJFdmVudHMgPSBcImF1dG9cIjtcclxufTtcclxuZXhwb3J0IGNvbnN0IHRvZ2dsZVBhdXNlID0gZnVuY3Rpb24gKCkge1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uQ0hFQ0tFRFxyXG4gIGlmIChwYXVzZUZsYWcpIHtcclxuICAgIHBhdXNlRmxhZyA9IGZhbHNlO1xyXG4gICAgYWN0aXZlVmlkLnBsYXkoKTtcclxuICB9IGVsc2Uge1xyXG4gICAgcGF1c2VGbGFnID0gdHJ1ZTtcclxuICAgIGFjdGl2ZVZpZC5wYXVzZSgpO1xyXG4gIH1cclxufTtcclxuZXhwb3J0IGNvbnN0IGVuYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwiYXV0b1wiO1xyXG59O1xyXG5leHBvcnQgY29uc3QgZGlzYWJsZVNlY3Rpb25DdHJsQnRuRXZlbnRzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5zdHlsZS5wb2ludGVyRXZlbnRzID1cclxuICAgIFwibm9uZVwiO1xyXG59O1xyXG5leHBvcnQgY29uc3Qgc2V0QWN0aXZlQ3RybEJ0bldyYXBwZXIgPSBmdW5jdGlvbiAoYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgZGVhY3RpdmF0ZUFsbEN0cmxCdG5XcmFwcGVycygpO1xyXG4gIGFjdGl2ZVNlY3Rpb25cclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpXHJcbiAgICAuZm9yRWFjaChmdW5jdGlvbiAoZWwsIGluZGV4KSB7XHJcbiAgICAgIGlmIChpbmRleCA9PT0gYnRuV3JhcHBlckluZGV4KSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIGFjdGl2ZVNlY3Rpb24ucXVlcnlTZWxlY3RvckFsbChcIi5zZWN0aW9uLXdyYXAtYnRuc1wiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGFjdGl2YXRlQ3VycmVudEJ0biA9IGZ1bmN0aW9uIChidG4pIHtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICBidG4uY2xhc3NMaXN0LmFkZChcImN1cnJlbnRcIik7XHJcbn07XHJcbmV4cG9ydCBjb25zdCBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoc2VjdGlvbikge1xyXG4gIGlmICghc2VjdGlvbikgc2VjdGlvbiA9IGFjdGl2ZVNlY3Rpb247XHJcbiAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiY3VycmVudFwiKTtcclxuICB9KTtcclxufTtcclxuZXhwb3J0IGNvbnN0IGdldExvY2FsSW5kZXggPSBmdW5jdGlvbiAoYnRuLCBidG5DbGFzcywgYWxsQnRuc1dyYXBwZXIpIHtcclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLkNIRUNLRURcclxuICBsZXQgbG9jYWxJbmRleDtcclxuICBjb25zdCBhbGxCdG5zID0gYnRuXHJcbiAgICAuY2xvc2VzdChgLiR7YWxsQnRuc1dyYXBwZXJ9YClcclxuICAgIC5xdWVyeVNlbGVjdG9yQWxsKGAuJHtidG5DbGFzc31gKTtcclxuICBhbGxCdG5zLmZvckVhY2goZnVuY3Rpb24gKGVsLCBpbmRleCkge1xyXG4gICAgaWYgKGVsID09PSBidG4pIGxvY2FsSW5kZXggPSBpbmRleDtcclxuICB9KTtcclxuICByZXR1cm4gbG9jYWxJbmRleDtcclxufTtcclxuIiwgImNsYXNzIE5hdmJhciB7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBuYXZDb21wb25lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9jb21wb25lbnRcIik7XHJcbiAgbmF2TWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVcIik7XHJcbiAgbmF2QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZfYnV0dG9uXCIpO1xyXG4gIGFsbE5hdkxpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5uYXZfbWVudV9saW5rXCIpO1xyXG4gIGFsbE5hdkxpbmtzV2l0aERyb3Bkb3duID0gW1xyXG4gICAgLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtbmF2LXNlY3Rpb249XCJzZXF1ZW5jZVwiXScpLFxyXG4gIF07XHJcbiAgYWxsTmF2RHJvcGRvd25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubmF2X21lbnVfZHJvcGRvd25cIildO1xyXG4gIGRyb3Bkb3duSW5kZXg7XHJcbiAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vRlVOQ1RJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICBnZXREcm9wZG93bkluZGV4ID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIGNvbnN0IGRyb3Bkb3duTWVudSA9IGNsaWNrZWQuY2xvc2VzdChcIi5uYXZfbWVudV9kcm9wZG93blwiKTtcclxuICAgIGNvbnN0IGFycmF5T2ZEcm9wZG93bk9wdHMgPSBbXHJcbiAgICAgIC4uLmRyb3Bkb3duTWVudS5xdWVyeVNlbGVjdG9yQWxsKFwiLm5hdl9tZW51X2xpbmstZHJvcGRvd25cIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5kcm9wZG93bkluZGV4ID0gYXJyYXlPZkRyb3Bkb3duT3B0cy5pbmRleE9mKGNsaWNrZWQpO1xyXG4gIH07XHJcbiAgY2xvc2VOYXZNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgdG9nZ2xlTmF2ID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIGNvbnN0IGRyb3Bkb3duID0gY2xpY2tlZFxyXG4gICAgICA/IGNsaWNrZWRcclxuICAgICAgICAgIC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKVxyXG4gICAgICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfZHJvcGRvd25cIilcclxuICAgICAgOiB0aGlzLm5hdk1lbnUucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKTtcclxuXHJcbiAgICBpZiAoZHJvcGRvd24pIGRyb3Bkb3duLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBuZXcgTmF2YmFyKCk7XHJcbiIsICJpbXBvcnQgeyBCTEFDS09VVF9XQUlUX1RPX1JFVkVBTCwgVklEX0VORF9USU1FUiB9IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBGZWF0dXJlcyB7XHJcbiAgY29uc3RydWN0b3IoZ2xvYmFsQ29udHJvbGxlciwgY29udGFpbmVyKSB7XHJcbiAgICB0aGlzLmdsb2JhbCA9IGdsb2JhbENvbnRyb2xsZXI7XHJcbiAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjsgLy9UaGUgcm9vdCBmb3IgdGhpcyBtb2R1bGVcclxuICAgIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIC8vREVGSU5JVElPTlMuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIuYmxhY2tvdXRcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dCA9IFtcclxuICAgICAgLi4udGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi50ZXh0LXdyYXBwZXJcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2ID1cclxuICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci5pbnRyb1wiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNWaWREaXYgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnZpZC13cmFwcGVyLmZlYXR1cmVzXCIpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpO1xyXG4gICAgdGhpcy5idG5JbmRleCA9IDA7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gICAgdGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tZmVhdHVyZXNcIiwgdGhpcy5pbml0U2VjdGlvbi5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwYXVzZS1jdHJsLXZpZFwiLCB0aGlzLnBhdXNlQ3RybFZpZC5iaW5kKHRoaXMpXSxcclxuICAgIF0pO1xyXG4gIH1cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgLy9FVkVOVCBNQVAuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSBmdW5jdGlvbiAoY2xpY2tlZCwgaW5kZXgsIGludHJvRmxhZykge1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QuYWRkKFwib2ZmXCIpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgaWYgKGNsaWNrZWQpIHtcclxuICAgICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhjbGlja2VkKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgIHRoaXMuc2hvd0ludHJvVGV4dCgpO1xyXG4gICAgdGhpcy5mZWF0dXJlc0N0cmxCdG5zLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBpZiAoaW50cm9GbGFnKSByZXR1cm47XHJcbiAgICB0aGlzLnBsYXlGZWF0dXJlc0ludHJvKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9IChldmVudEFjdGlvbiwgY2xpY2tlZEJ0bikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24oY2xpY2tlZEJ0bik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBoaWRlQWxsVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNBbGxUZXh0LmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHNob3dJbnRyb1RleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dFxyXG4gICAgICAuZmluZCgoZWwpID0+IGVsLmRhdGFzZXQudGV4dENvbnRlbnQgPT09IFwiaW50cm9cIilcclxuICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzaG93RmVhdHVyZVRleHQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQWxsVGV4dFt0aGlzLmJ0bkluZGV4ICsgMV0uY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dGZWF0dXJlc0ludHJvVmlkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBoaWRlRmVhdHVyZXNJbnRyb1ZpZERpdiA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZmVhdHVyZXNJbnRyb1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0ZlYXR1cmVzVmlkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgaGlkZUZlYXR1cmVzVmlkRGl2ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5mZWF0dXJlc1ZpZERpdi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcGxheUZlYXR1cmVzSW50cm8gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVzSW50cm9WaWREaXYoKTtcclxuICAgIHRoaXMuaGlkZUZlYXR1cmVzVmlkRGl2KCk7XHJcbiAgICAvLyBMb2dpYzogRmluZCB0aGUgb25lIHRoYXQgaXNuJ3QgaGlkZGVuIChkaXNwbGF5OiBub25lKVxyXG4gICAgY29uc3QgYWxsSW50cm9zID1cclxuICAgICAgdGhpcy5mZWF0dXJlc0ludHJvVmlkRGl2LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtaW50cm9cIik7XHJcbiAgICBhbGxJbnRyb3MuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgLy8gb2Zmc2V0UGFyZW50IGlzIG51bGwgaWYgdGhlIGVsZW1lbnQgaXMgZGlzcGxheTogbm9uZVxyXG4gICAgICBpZiAoZWwub2Zmc2V0UGFyZW50ICE9PSBudWxsKSB7XHJcbiAgICAgICAgY29uc3QgdmlkID0gZWwucXVlcnlTZWxlY3RvcihcIi52aWQtaW50cm9cIik7XHJcbiAgICAgICAgaWYgKHZpZCkge1xyXG4gICAgICAgICAgdmlkLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgIHZpZC5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIHBsYXlDdHJsQnRuVmlkID0gZnVuY3Rpb24gKGNsaWNrZWRDdHJsQnRuKSB7XHJcbiAgICB0aGlzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5nbG9iYWwuZW5hYmxlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmhpZGVGZWF0dXJlc0ludHJvVmlkRGl2KCk7XHJcbiAgICB0aGlzLnNob3dGZWF0dXJlc1ZpZERpdigpO1xyXG4gICAgdGhpcy5idG5JbmRleCA9IHRoaXMuZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbiAgICAgIGNsaWNrZWRDdHJsQnRuLFxyXG4gICAgICBcImN0cmwtYnRuXCIsXHJcbiAgICAgIFwic2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICk7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbFRleHQoKTtcclxuICAgIHRoaXMuc2hvd0ZlYXR1cmVUZXh0KCk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5mZWF0dXJlc0VuZGlzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlU2VjdGlvbkN0cmxCdG5FdmVudHMoKTtcclxuICAgICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuZmVhdHVyZXNUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHRoaXMuZmVhdHVyZXNCbGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgdGhpcy5oaWRlQWxsVGV4dCgpO1xyXG4gICAgICAgICAgdGhpcy5zaG93SW50cm9UZXh0KCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5yZXNldEFsbFNlY3Rpb25WaWRzKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoKTtcclxuICAgICAgICAgIHRoaXMuZ2xvYmFsLmVuYWJsZU5hdkxpbmtzQW5kTmF2QnRuKCk7XHJcbiAgICAgICAgICB0aGlzLmdsb2JhbC5lbmFibGVTZWN0aW9uQ3RybEJ0bkV2ZW50cygpO1xyXG4gICAgICAgICAgdGhpcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gICAgICAgIH0sIEJMQUNLT1VUX1dBSVRfVE9fUkVWRUFMKTtcclxuICAgICAgfSwgVklEX0VORF9USU1FUik7XHJcbiAgICB9XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQ3VycmVudEJ0bnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzQ3RybEJ0bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImN1cnJlbnRcIik7XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGNsZWFyRmVhdHVyZXNUaW1lcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmZlYXR1cmVzRW5kaXNDYW5jZWxsZWQgPSB0cnVlO1xyXG4gICAgY2xlYXJUaW1lb3V0KHRoaXMuZmVhdHVyZXNUaW1lcik7XHJcbiAgICB0aGlzLmZlYXR1cmVzVGltZXIgPSBudWxsO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRmVhdHVyZXM7XHJcbiIsICJpbXBvcnQge1xyXG4gIERBVEFfVklFV18xLFxyXG4gIERBVEFfVklFV18xX01QLFxyXG4gIERBVEFfVklFV18yLFxyXG4gIERBVEFfVklFV18yX01QLFxyXG4gIERBVEFfVklFV18zLFxyXG4gIERBVEFfVklFV18zX01QLFxyXG4gIFZJRVdfU1RBUlRfRU5ELFxyXG59IGZyb20gXCIuLzAtY29uZmlnXCI7XHJcblxyXG5jbGFzcyBEYXRhIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5pbnRyb1RleHQgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC10eHRcIik7XHJcblxyXG4gICAgdGhpcy52aWV3VmlkRGl2ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi52aWQtd3JhcHBlci52aWV3XCIpO1xyXG4gICAgdGhpcy5hbGxWaWV3VmlkRGl2cyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIudmlkLWNvZGUtdmlld1wiKTtcclxuICAgIHRoaXMuY29tcFZpZERpdiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIudmlkLXdyYXBwZXIuY29tcFwiKTtcclxuICAgIHRoaXMuYWxsRGF0YVZpZERpdnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpO1xyXG4gICAgdGhpcy5zdGFydFRpbWU7XHJcbiAgICB0aGlzLmVuZFRpbWU7XHJcbiAgICB0aGlzLnZpZXdWaWRGbGFnO1xyXG5cclxuICAgIHRoaXMudmlld09wdHNCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLm9wdHMtbWVudV9idG5cIik7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCIub3B0cy1kcm9wZG93blwiKTtcclxuICAgIHRoaXMuYWxsVmlld09wdEJ0bnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIub3B0cy1tZW51X2xpbmtcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5hY3RpdmVWaWV3ID0gXCJ2aWV3LWFcIjtcclxuICAgIHRoaXMubGFzdEFjdGl2ZVZpZXcgPSB7IHZpZXc6IFwidmlldy1hXCIsIHN0YXJ0VGltZTogMCwgZW5kVGltZTogMCB9O1xyXG4gICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcblxyXG4gICAgdGhpcy5kaW1tZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLmRpbW1lclwiKTtcclxuICAgIHRoaXMudHh0SW1nQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKTtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihcclxuICAgICAgXCIuc2VjdGlvbi13cmFwLWNvbXAtZGF0YVwiLFxyXG4gICAgKTtcclxuICAgIHRoaXMuYWxsRGF0YVdyYXBwZXJzID0gW1xyXG4gICAgICAuLi50aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKFwiLnNlY3Rpb24td3JhcC1jb21wLWRhdGFcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hbGxEYXRhID0gWy4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcC1kYXRhLXdyYXBcIildO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuY3RybEJ0bldyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnNlY3Rpb24td3JhcC1idG5zXCIpO1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuc2VjdGlvbi13cmFwLWJ0bnNcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlciA9IHRoaXMuYWxsQ3RybEJ0bldyYXBwZXJzWzBdO1xyXG4gICAgdGhpcy5jdHJsQnRuSW5kZXggPSBudWxsO1xyXG4gICAgdGhpcy5ldmVudE1hcCA9IG5ldyBNYXAoW1xyXG4gICAgICBbXCJvcGVuLWRhdGFcIiwgdGhpcy5pbml0U2VjdGlvbi5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wicGxheS1jdHJsLXZpZFwiLCB0aGlzLnNldEFuZFBsYXlDdHJsQnRuVmlkLmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwbGF5LXZpZXctdmlkXCIsIHRoaXMuc2V0QW5kUGxheVZpZXdWaWQuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcImJhY2stdG8tdmlld1wiLCB0aGlzLmJhY2tUb1ZpZXdGcm9tQ29tcC5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wib3Blbi12aWV3LW9wdHMtbWVudVwiLCB0aGlzLnNob3dWaWV3T3B0c01lbnUuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcImNsb3NlLXZpZXctb3B0cy1tZW51XCIsIHRoaXMuaGlkZVZpZXdPcHRzTWVudS5iaW5kKHRoaXMpXSxcclxuICAgICAgW1widG9nZ2xlLWltZy10eHRcIiwgdGhpcy5zaG93Q29tcEltYWdlT3JUZXh0LmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSBmdW5jdGlvbiAoY2xpY2tlZCwgaW5kZXgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnR4dE9ySW1nID0gXCJpbWFnZVwiO1xyXG4gICAgdGhpcy50eHRJbWdCdG4udGV4dENvbnRlbnQgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmhpZGVCYWNrQnRuKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxEYXRhKCk7XHJcbiAgICB0aGlzLnJlc2V0QWxsRGF0YVNoZWV0cygpO1xyXG4gICAgdGhpcy5pbnRyb1RleHQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuc2hvd0N0cmxCdG5XcmFwcGVyKCk7XHJcblxyXG4gICAgLy9zZXR0aW5nIHZpZCBlbGVtZW50Li4uXHJcbiAgICB0aGlzLmdsb2JhbC5jbGVhclNlY3Rpb25WaWRTcmMoKTsgLy9yZXZlYWwgcG9zdGVyXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIGJja2dybmQgaW1nXHJcbiAgICB0aGlzLnNldERhdGFWaWRCYWNrZ3JvdW5kSW1nKCk7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9IChldmVudEFjdGlvbiwgY2xpY2tlZEJ0bikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24oY2xpY2tlZEJ0bik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzaG93Vmlld09wdHNNZW51ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVWaWV3T3B0c01lbnUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLnZpZXdPcHRzTWVudS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0NvbXBJbWFnZU9yVGV4dCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIGlmICh0aGlzLnR4dE9ySW1nID09PSBcImltYWdlXCIpIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwidGV4dFwiO1xyXG4gICAgICB0aGlzLmRpbW1lci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmFjdGl2ZURhdGFTaGVldC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy50eHRPckltZyA9IFwiaW1hZ2VcIjtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgIH1cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9XHJcbiAgICAgIHRoaXMudHh0T3JJbWc7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVWaWV3QnRuSW5kZXggPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZXdPcHRCdG5zLmZvckVhY2goKGVsLCBpbmRleCkgPT4ge1xyXG4gICAgICBpZiAoZWwuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXggPSBpbmRleDtcclxuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9O1xyXG4gIGhpZGVBbGxEYXRhID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5kZWFjdGl2YXRlQWxsRGF0YVdyYXBwZXJzKCk7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXAtZGF0YS13cmFwXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gIH07XHJcbiAgc2hvd0RhdGEgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFTaGVldCA9IEFycmF5LmZyb20oXHJcbiAgICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvckFsbChcIi5jb21wLWRhdGEtd3JhcFwiKSxcclxuICAgIClbdGhpcy5jdHJsQnRuSW5kZXhdO1xyXG4gICAgdGhpcy5hY3RpdmVEYXRhU2hlZXQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIGhpZGVCYWNrQnRuID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgc2hvd0JhY2tCdG4gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLmN0cmwtYnRuXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlci5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5hY3RpdmVDdHJsQnRuV3JhcHBlclxyXG4gICAgICAucXVlcnlTZWxlY3RvcihcIi5jdHJsLWJ0bi1iYWNrXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcmVzZXRBbGxEYXRhU2hlZXRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxEYXRhLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLnBhcmVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgZWwucXVlcnlTZWxlY3RvcihcIi5jb21wLWRhdGEtYm9keS13cmFwXCIpLnNjcm9sbCgwLCAwKTtcclxuICAgICAgZWwucGFyZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRMYXN0QWN0aXZlVmlldyA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICB9O1xyXG4gIHNldEFjdGl2ZVZpZXcgPSBmdW5jdGlvbiAodGV4dENvbnRlbnQpIHtcclxuICAgIHRoaXMuYWN0aXZlVmlldyA9IHRleHRDb250ZW50O1xyXG4gIH07XHJcbiAgdmlld0JhY2tUb1N0YXJ0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5zdGFydFRpbWUgPSBWSUVXX1NUQVJUX0VORFt0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXddLnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IFZJRVdfU1RBUlRfRU5EW3RoaXMubGFzdEFjdGl2ZVZpZXcudmlld10uZW5kVGltZTtcclxuICB9O1xyXG4gIHNldFZpZXdWaWRTdGFydEFuZEVuZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSB0cnVlO1xyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyAhPT0gXCJ2aWV3LWFcIiAmJiB0aGlzLmFjdGl2ZVZpZXcgIT09IFwidmlldy1hXCIpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gdHJ1ZTtcclxuICAgICAgdGhpcy52aWV3QmFja1RvU3RhcnQoKTtcclxuICAgICAgdGhpcy5hbGxWaWV3T3B0QnRucy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICAgIGlmIChlbC50ZXh0Q29udGVudCA9PT0gdGhpcy5hY3RpdmVWaWV3KSB7XHJcbiAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleChlbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnN0YXJ0VGltZSA9XHJcbiAgICAgIHRoaXMuYWxsVmlld09wdEJ0bnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdLmRhdGFzZXQuc3RhcnRUaW1lO1xyXG4gICAgdGhpcy5lbmRUaW1lID0gdGhpcy5hbGxWaWV3T3B0QnRuc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF0uZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFN0YXJ0QW5kRW5kID0gZnVuY3Rpb24gKGNsaWNrZWQpIHtcclxuICAgIHRoaXMudmlld1ZpZEZsYWcgPSBmYWxzZTtcclxuICAgIHRoaXMuaGlkZUFsbERhdGEoKTtcclxuICAgIHRoaXMuc3RhcnRUaW1lID0gY2xpY2tlZC5kYXRhc2V0LnN0YXJ0VGltZTtcclxuICAgIHRoaXMuZW5kVGltZSA9IGNsaWNrZWQuZGF0YXNldC5lbmRUaW1lO1xyXG4gIH07XHJcbiAgc2V0RGF0YVZpZFBvc3RlciA9IGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgaWYgKCFuZXdWYWx1ZSkgbmV3VmFsdWUgPSB0aGlzLmFjdGl2ZVZpZXc7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGlmICghYWN0aXZlVmlkIHx8IGFjdGl2ZVZpZC5jbG9zZXN0KFwiLnNlY3Rpb25cIikuY2xhc3NMaXN0WzFdICE9PSBcImRhdGFcIilcclxuICAgICAgcmV0dXJuO1xyXG4gICAgaWYgKGFjdGl2ZVZpZC5wYXJlbnRFbGVtZW50LmNsYXNzTGlzdC5jb250YWlucyhcIm1wXCIpKSB7XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzFfTVApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWJcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzJfTVApO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChuZXdWYWx1ZSA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZC5zZXRBdHRyaWJ1dGUoXCJwb3N0ZXJcIiwgREFUQV9WSUVXXzNfTVApO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1hXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18xKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18yKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAobmV3VmFsdWUgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWQuc2V0QXR0cmlidXRlKFwicG9zdGVyXCIsIERBVEFfVklFV18zKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH07XHJcbiAgc2V0RGF0YVZpZEJhY2tncm91bmRJbWcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBjb25zdCBhY3RpdmVWaWQgPSB0aGlzLmdsb2JhbC5nZXRBY3RpdmVWaWQoKTtcclxuICAgIGNvbnN0IGFjdGl2ZVZpZFdyYXAgPSBhY3RpdmVWaWQuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIGlmIChhY3RpdmVWaWQucGFyZW50RWxlbWVudC5jbGFzc0xpc3QuY29udGFpbnMoXCJtcFwiKSkge1xyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYVwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfMV9NUH1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1iXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18yX01QfVwiKWA7XHJcbiAgICAgIH1cclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWNcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzNfTVB9XCIpYDtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgaWYgKHRoaXMubGFzdEFjdGl2ZVZpZXcudmlldyA9PT0gXCJ2aWV3LWFcIikge1xyXG4gICAgICAgIGFjdGl2ZVZpZFdyYXAuc3R5bGUuYmFja2dyb3VuZEltYWdlID0gYHVybChcIiR7REFUQV9WSUVXXzF9XCIpYDtcclxuICAgICAgfVxyXG4gICAgICBpZiAodGhpcy5sYXN0QWN0aXZlVmlldy52aWV3ID09PSBcInZpZXctYlwiKSB7XHJcbiAgICAgICAgYWN0aXZlVmlkV3JhcC5zdHlsZS5iYWNrZ3JvdW5kSW1hZ2UgPSBgdXJsKFwiJHtEQVRBX1ZJRVdfMn1cIilgO1xyXG4gICAgICB9XHJcbiAgICAgIGlmICh0aGlzLmxhc3RBY3RpdmVWaWV3LnZpZXcgPT09IFwidmlldy1jXCIpIHtcclxuICAgICAgICBhY3RpdmVWaWRXcmFwLnN0eWxlLmJhY2tncm91bmRJbWFnZSA9IGB1cmwoXCIke0RBVEFfVklFV18zfVwiKWA7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9O1xyXG4gIGRlYWN0aXZhdGVBbGxEYXRhV3JhcHBlcnMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbERhdGFXcmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBbmRQbGF5Vmlld1ZpZCA9IGZ1bmN0aW9uIChjbGlja2VkVmlld09wdHNCdG4pIHtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuZ2xvYmFsLmRpc2FibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgY2xpY2tlZFZpZXdPcHRzQnRuLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7IC8vZm9yIERhdGEuc2V0QWN0aXZlVmlld0J0bkluZGV4XHJcbiAgICB0aGlzLnNldEFjdGl2ZVZpZXdCdG5JbmRleCgpO1xyXG4gICAgdGhpcy52aWV3T3B0c01lbnUuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMudmlld09wdHNCdG4udGV4dENvbnRlbnQgPSBjbGlja2VkVmlld09wdHNCdG4udGV4dENvbnRlbnQ7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyID0gdGhpcy5hbGxEYXRhV3JhcHBlcnNbdGhpcy5hY3RpdmVWaWV3QnRuSW5kZXhdO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG5cclxuICAgIC8vc2V0dGluZyB2aWQgZWxlbWVudC4uLlxyXG4gICAgdGhpcy5nbG9iYWwuc2V0QWN0aXZlVmlkKCk7XHJcbiAgICB0aGlzLmdsb2JhbFxyXG4gICAgICAuZ2V0QWN0aXZlU2VjdGlvbigpXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZC1jb2RlXCIpXHJcbiAgICAgIC5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIH0pOyAvL3NvIGdsb2JhbC5zZXRBY3RpdmVWaWQgY2FuIHBpY2sgZHQgb3IgbXAgZnJvbSBhY3RpdmVzXHJcbiAgICB0aGlzLnNldExhc3RBY3RpdmVWaWV3KCk7IC8vZm9yIHRoZSBiY2tncm5kIGltZ1xyXG4gICAgdGhpcy5zZXREYXRhVmlkQmFja2dyb3VuZEltZygpO1xyXG4gICAgdGhpcy5zZXRBY3RpdmVWaWV3KGNsaWNrZWRWaWV3T3B0c0J0bi50ZXh0Q29udGVudCk7IC8vZm9yIHRoZSBwb3N0ZXJcclxuXHJcbiAgICAvL3BsYXkgdmlkXHJcbiAgICB0aGlzLnNldFZpZXdWaWRTdGFydEFuZEVuZCgpO1xyXG4gICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gIH07XHJcbiAgc2V0QW5kUGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuZ2xvYmFsLnNldEFjdGl2ZVZpZCgpO1xyXG5cclxuICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoKTsgLy9mb3IgdGhlIGJja2dybmQgaW1nIHRvIGNoYW5nZSB0byBjb21wIHZpZCBzdGFydHNcclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuaGlkZUFjdGl2ZUN0cmxCdG5XcmFwcGVyKCk7XHJcbiAgICB0aGlzLmN0cmxCdG5JbmRleCA9IHRoaXMuZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbiAgICAgIGNsaWNrZWRDdHJsQnRuLFxyXG4gICAgICBcImN0cmwtYnRuXCIsXHJcbiAgICAgIFwic2VjdGlvbi13cmFwLWJ0bnNcIixcclxuICAgICk7XHJcblxyXG4gICAgLy9wbGF5XHJcbiAgICB0aGlzLnNldERhdGFWaWRTdGFydEFuZEVuZChjbGlja2VkQ3RybEJ0bik7XHJcbiAgICB0aGlzLnBsYXlEYXRhVmlkKCk7IC8vcmVtb3ZlcyBibGFja291dCBpbiBnbG9iYWwucGxheVJhbmdlXHJcbiAgfTtcclxuICBwbGF5RGF0YVZpZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuaW50cm9UZXh0LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRTdGFydFRpbWUodGhpcy5zdGFydFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwuc2V0RW5kVGltZSh0aGlzLmVuZFRpbWUpO1xyXG4gICAgdGhpcy5nbG9iYWwucGxheVJhbmdlKCk7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy52aWV3VmlkRmxhZyAmJiAhdGhpcy52aWV3Q2hhaW5GbGFnKSB7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZFBvc3RlcigpOyAvL2RvbmUgaGVyZSBzbyBwb3N0ZXIgZG9lc24ndCBhcHBlYXIgZWFybGllclxyXG4gICAgICB0aGlzLnNob3dBY3RpdmVDdHJsQnRuV3JhcHBlcigpO1xyXG4gICAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgICB0aGlzLmdsb2JhbC5lbmFibGVOYXZMaW5rc0FuZE5hdkJ0bigpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLnZpZXdDaGFpbkZsYWcpIHtcclxuICAgICAgdGhpcy52aWV3Q2hhaW5GbGFnID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuc2V0TGFzdEFjdGl2ZVZpZXcoXCJ2aWV3LWFcIik7XHJcbiAgICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgICAgdGhpcy5zZXRWaWV3VmlkU3RhcnRBbmRFbmQoKTtcclxuICAgICAgdGhpcy5wbGF5RGF0YVZpZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5kaW1tZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgdGhpcy5hY3RpdmVEYXRhV3JhcHBlclxyXG4gICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgICAgLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICAgIHRoaXMuc2hvd0RhdGEodGhpcy5jdHJsQnRuSW5kZXgpO1xyXG4gICAgICB0aGlzLnNob3dCYWNrQnRuKCk7XHJcblxyXG4gICAgICAvL3NldCBiY2tncm5kIGltZyB0byBibGFjayB0byBwcmV2ZW50IGZsYXNoIG9mIGltYWdlIHdoZW4gY2hhbmdpbmcgbmF2XHJcbiAgICAgIHRoaXMuZ2xvYmFsLmdldEFjdGl2ZVZpZCgpLmNsb3Nlc3QoXCIudmlkLXdyYXBwZXJcIikuc3R5bGUuYmFja2dyb3VuZEltYWdlID1cclxuICAgICAgICBcIm5vbmVcIjtcclxuICAgICAgdGhpcy5nbG9iYWwuZ2V0QWN0aXZlVmlkKCkuY2xvc2VzdChcIi52aWQtd3JhcHBlclwiKS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPVxyXG4gICAgICAgIFwiYmxhY2tcIjtcclxuICAgIH1cclxuICB9O1xyXG4gIGJhY2tUb1ZpZXdGcm9tQ29tcCA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmZsYXNoQmxhY2tvdXQoKTtcclxuICAgIC8vc2V0dGluZyBVSSBhbmQgbG9naWMuLi5cclxuICAgIHRoaXMuYWN0aXZlRGF0YVdyYXBwZXIucXVlcnlTZWxlY3RvcihcIi50eHQtaW1nLWJ0blwiKS50ZXh0Q29udGVudCA9IFwiaW1hZ2VcIjtcclxuICAgIHRoaXMudHh0T3JJbWcgPSBcImltYWdlXCI7XHJcbiAgICB0aGlzLmFjdGl2ZURhdGFXcmFwcGVyXHJcbiAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLnR4dC1pbWctYnRuXCIpXHJcbiAgICAgIC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQWxsRGF0YSgpO1xyXG4gICAgdGhpcy5yZXNldEFsbERhdGFTaGVldHMoKTtcclxuICAgIHRoaXMuZGltbWVyLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLmludHJvVGV4dC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5oaWRlQmFja0J0bigpO1xyXG4gICAgdGhpcy5zaG93Q3RybEJ0bldyYXBwZXIoKTtcclxuXHJcbiAgICAvL3NldHRpbmcgdmlkIGVsZW1lbnQuLi5cclxuICAgIHRoaXMuc2V0RGF0YVZpZEJhY2tncm91bmRJbWcoKTtcclxuICAgIHRoaXMuZ2xvYmFsLmNsZWFyU2VjdGlvblZpZFNyYygpOyAvL3JldmVhbCBwb3N0ZXJcclxuICB9O1xyXG4gIGhpZGVBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICB9O1xyXG4gIHNob3dDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXJcclxuICAgICAgLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY3RybC1idG5cIilcclxuICAgICAgLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcclxuICAgICAgfSk7XHJcbiAgICB0aGlzLmFjdGl2ZUN0cmxCdG5XcmFwcGVyLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVDdHJsQnRuV3JhcHBlciA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuZ2xvYmFsLmRlYWN0aXZhdGVBbGxDdHJsQnRuV3JhcHBlcnMoKTtcclxuICAgIHRoaXMuYWN0aXZlQ3RybEJ0bldyYXBwZXIgPVxyXG4gICAgICB0aGlzLmFsbEN0cmxCdG5XcmFwcGVyc1t0aGlzLmFjdGl2ZVZpZXdCdG5JbmRleF07XHJcbiAgfTtcclxuICBkZWFjdGl2YXRlQWxsQ3RybEJ0bldyYXBwZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxDdHJsQnRuV3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbn1cclxuZXhwb3J0IGRlZmF1bHQgRGF0YTtcclxuIiwgImNsYXNzIFNlcXVlbmNlIHtcclxuICBjb25zdHJ1Y3RvcihnbG9iYWxDb250cm9sbGVyLCBjb250YWluZXIpIHtcclxuICAgIHRoaXMuZ2xvYmFsID0gZ2xvYmFsQ29udHJvbGxlcjtcclxuICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgLy9ERUZJTklUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4gICAgdGhpcy5hbGxJbnRyb1RleHQgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuaW50cm8tdGV4dC13cmFwXCIpLFxyXG4gICAgXTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3MgPSBbXHJcbiAgICAgIC4uLnRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuYWN0aW9uLWhlYWRpbmdcIiksXHJcbiAgICBdO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKFwiLnBhdXNlLXdyYXBwZXJcIik7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbChcIi52aWQtd3JhcHBlclwiKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgICB0aGlzLnNlcXVlbmNlRW5kSXNDYW5jZWxsZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IDA7XHJcbiAgICB0aGlzLmV2ZW50TWFwID0gbmV3IE1hcChbXHJcbiAgICAgIFtcIm9wZW4tc2VxdWVuY2VcIiwgdGhpcy5pbml0U2VjdGlvbi5iaW5kKHRoaXMpXSxcclxuICAgICAgW1wib3Blbi1zZXF1ZW5jZS1pbmRleFwiLCB0aGlzLmFjdGl2YXRlU2VjdGlvbkluZGV4LmJpbmQodGhpcyldLFxyXG4gICAgICBbXCJwbGF5LWN0cmwtdmlkXCIsIHRoaXMucGxheUN0cmxCdG5WaWQuYmluZCh0aGlzKV0sXHJcbiAgICAgIFtcInBhdXNlLWN0cmwtdmlkXCIsIHRoaXMucGF1c2VDdHJsVmlkLmJpbmQodGhpcyldLFxyXG4gICAgXSk7XHJcbiAgfVxyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgaW5pdFNlY3Rpb24gPSBmdW5jdGlvbiAoY2xpY2tlZCwgaW5kZXgpIHtcclxuICAgIHRoaXMuc2VxdWVuY2VJbmRleCA9IGluZGV4ID8/IDA7XHJcbiAgICB0aGlzLmdsb2JhbC5mbGFzaEJsYWNrb3V0KCk7XHJcbiAgICB0aGlzLnBhdXNlV3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmhpZGVBbGxJbnRyb1RleHQoKTtcclxuICAgIHRoaXMuaGlkZUFsbEFjdGlvbkhlYWRpbmdzKCk7XHJcbiAgICB0aGlzLmFsbEludHJvVGV4dFt0aGlzLnNlcXVlbmNlSW5kZXhdLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICB0aGlzLnNldEFjdGl2ZVNlcXVlbmNlVmlkV3JhcCh0aGlzLnNlcXVlbmNlSW5kZXgpO1xyXG4gICAgdGhpcy5nbG9iYWwuYWN0aXZhdGVDdXJyZW50TmF2TGluayhcclxuICAgICAgY2xpY2tlZC5jbG9zZXN0KFwiLm5hdl9tZW51X2xpbmstd3JhcFwiKS5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2xpbmtcIiksXHJcbiAgICApO1xyXG4gIH07XHJcbiAgYWN0aXZhdGVTZWN0aW9uSW5kZXggPSBmdW5jdGlvbiAoY2xpY2tlZEJ0bikge1xyXG4gICAgY29uc29sZS5sb2coY2xpY2tlZEJ0bik7XHJcbiAgfTtcclxuICBoYW5kbGVFdmVudCA9IChldmVudEFjdGlvbiwgY2xpY2tlZEJ0bikgPT4ge1xyXG4gICAgY29uc3QgYWN0aW9uID0gdGhpcy5ldmVudE1hcC5nZXQoZXZlbnRBY3Rpb24pO1xyXG4gICAgaWYgKGFjdGlvbikge1xyXG4gICAgICBhY3Rpb24oY2xpY2tlZEJ0bik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zb2xlLndhcm4oYE5vIGFjdGlvbiBmb3VuZCBmb3I6ICR7ZXZlbnRBY3Rpb259YCk7XHJcbiAgICB9XHJcbiAgfTtcclxuICBzZXRTZXF1ZW5jZUluZGV4ID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICBpZiAoIXZhbHVlKSB0aGlzLnNlcXVlbmNlSW5kZXggPSAwO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUluZGV4ID0gdmFsdWU7XHJcbiAgfTtcclxuICBoaWRlQWxsSW50cm9UZXh0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxJbnRyb1RleHQuZm9yRWFjaCgoZWwpID0+IHtcclxuICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIH0pO1xyXG4gIH07XHJcbiAgaGlkZUFsbEFjdGlvbkhlYWRpbmdzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5hbGxBY3Rpb25IZWFkaW5ncy5mb3JFYWNoKChlbCkgPT4ge1xyXG4gICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgfTtcclxuICBzZXRBY3RpdmVTZXF1ZW5jZVZpZFdyYXAgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB0aGlzLmFsbFZpZFdyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbiAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgICB9KTtcclxuICAgIHRoaXMuYWxsVmlkV3JhcHBlcnNbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gIH07XHJcbiAgcGxheUN0cmxCdG5WaWQgPSBmdW5jdGlvbiAoY2xpY2tlZEN0cmxCdG4pIHtcclxuICAgIHRoaXMuY2xlYXJTZXF1ZW5jZVRpbWVycygpO1xyXG4gICAgdGhpcy5nbG9iYWwuZGlzYWJsZVBhdXNlKCk7XHJcbiAgICB0aGlzLmdsb2JhbC5lbmFibGVQYXVzZSgpO1xyXG4gICAgdGhpcy5wYXVzZVdyYXBwZXIuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWxsSW50cm9UZXh0W3RoaXMuc2VxdWVuY2VJbmRleF0uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICAgIHRoaXMuYWxsQWN0aW9uSGVhZGluZ3NbdGhpcy5zZXF1ZW5jZUluZGV4XS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4gICAgdGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICAgIHRoaXMuZ2xvYmFsLnNldFN0YXJ0VGltZShjbGlja2VkQ3RybEJ0bi5kYXRhc2V0LnN0YXJ0VGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5zZXRFbmRUaW1lKGNsaWNrZWRDdHJsQnRuLmRhdGFzZXQuZW5kVGltZSk7XHJcbiAgICB0aGlzLmdsb2JhbC5hY3RpdmF0ZUN1cnJlbnRCdG4oY2xpY2tlZEN0cmxCdG4pO1xyXG4gICAgdGhpcy5nbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAgIHRoaXMuZ2xvYmFsLnBsYXlSYW5nZSgpO1xyXG4gIH07XHJcbiAgcGF1c2VDdHJsVmlkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdGhpcy5nbG9iYWwudG9nZ2xlUGF1c2UoKTtcclxuICAgIHRoaXMucGF1c2VXcmFwcGVyLmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgfTtcclxuICB2aWRFbmQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAodGhpcy5zZXF1ZW5jZUVuZElzQ2FuY2VsbGVkID09PSBmYWxzZSkge1xyXG4gICAgICB0aGlzLmdsb2JhbC5kaXNhYmxlUGF1c2UodGhpcy5wYXVzZVdyYXBwZXIpO1xyXG4gICAgfVxyXG4gIH07XHJcbiAgY2xlYXJTZXF1ZW5jZVRpbWVycyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHRoaXMuc2VxdWVuY2VFbmRJc0NhbmNlbGxlZCA9IHRydWU7XHJcbiAgICBjbGVhclRpbWVvdXQodGhpcy5zZXF1ZW5jZVRpbWVyKTtcclxuICAgIHRoaXMuc2VxdWVuY2VUaW1lciA9IG51bGw7XHJcbiAgfTtcclxufVxyXG5leHBvcnQgZGVmYXVsdCBTZXF1ZW5jZTtcclxuIiwgImNvbnNvbGUubG9nKFwiQlJBTkNIOiBuZXdNb2R1bGVzLTJcIik7XHJcblxyXG5pbXBvcnQgeyBTVEFSVF9VSV9SRVZFQUwgfSBmcm9tIFwiLi8wLWNvbmZpZ1wiO1xyXG5pbXBvcnQgKiBhcyBnbG9iYWwgZnJvbSBcIi4vMC1nbG9iYWxcIjtcclxuaW1wb3J0IE5hdmJhciBmcm9tIFwiLi8wLW5hdmJhclwiO1xyXG5pbXBvcnQgRmVhdHVyZXNDbGFzcyBmcm9tIFwiLi8xLWZlYXR1cmVzXCI7XHJcbmltcG9ydCBEYXRhQ2xhc3MgZnJvbSBcIi4vMi1kYXRhXCI7XHJcbmltcG9ydCBTZXF1ZW5jZUNsYXNzIGZyb20gXCIuLzMtc2VxdWVuY2VcIjtcclxuXHJcbi8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9pbml0IGNhbGwgKGZ1bmN0aW9uIGF0IGJvdHRvbSkuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgaW5pdCgpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0RFRklOSVRJT05TLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmNvbnN0IGZlYXR1cmVzQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLmZlYXR1cmVzXCIpO1xyXG5jb25zdCBkYXRhQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLmRhdGFcIik7XHJcbmNvbnN0IHNlcXVlbmNlQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWN0aW9uLnNlcXVlbmNlXCIpO1xyXG5cclxuY29uc3QgZmVhdHVyZXMgPSBuZXcgRmVhdHVyZXNDbGFzcyhnbG9iYWwsIGZlYXR1cmVzQ29udGFpbmVyKTtcclxuY29uc3QgZGF0YSA9IG5ldyBEYXRhQ2xhc3MoZ2xvYmFsLCBkYXRhQ29udGFpbmVyKTtcclxuY29uc3Qgc2VxdWVuY2UgPSBuZXcgU2VxdWVuY2VDbGFzcyhnbG9iYWwsIHNlcXVlbmNlQ29udGFpbmVyKTtcclxuY29uc3QgU0VDVElPTlMgPSB7XHJcbiAgZmVhdHVyZXM6IGZlYXR1cmVzLFxyXG4gIGRhdGE6IGRhdGEsXHJcbiAgc2VxdWVuY2U6IHNlcXVlbmNlLFxyXG59O1xyXG4vLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vRVZFTlQgREVMRUdBVElPTi1OQVYuLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuLy9uYXZfbWVudV9saW5rXHJcblxyXG5OYXZiYXIubmF2Q29tcG9uZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtY2xpY2stYWN0aW9uXVwiKTtcclxuICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuICBjb25zdCBhY3RpdmVTZWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0Lm5hdlNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gY2xpY2tlZC5kYXRhc2V0LmNsaWNrQWN0aW9uO1xyXG4gIGlmIChhY3RpdmVTZWN0aW9uID09PSBnbG9iYWwuZ2V0QWN0aXZlU2VjdGlvbk5hbWUoKSkgcmV0dXJuO1xyXG4gIC8vMS4gR2VuZXJpYyBjbGVhbnVwXHJcbiAgY2xlYXJBbGxUaW1lcnMoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICAvLzIuIFN0YXRlIHVwZGF0ZVxyXG4gIGdsb2JhbC5zZXRBY3RpdmVTZWN0aW9uKGFjdGl2ZVNlY3Rpb24pO1xyXG4gIC8vMy4gUG9seW1vcnBoaWMgY2FsbFxyXG4gIGNvbnNvbGUubG9nKGFjdGlvbik7XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGFjdGlvbiwgY2xpY2tlZCk7XHJcbn0pO1xyXG5cclxuLy8gTmF2YmFyLm5hdk1lbnUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uIChlKSB7XHJcbi8vICAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIubmF2X21lbnVfbGlua1wiKTtcclxuLy8gICBpZiAoIWNsaWNrZWQpIHJldHVybjtcclxuLy8gICBjb25zdCBjbGlja2VkU2VjdGlvbk5hbWUgPSBjbGlja2VkLmRhdGFzZXQubmF2U2VjdGlvbjtcclxuLy8gICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1tjbGlja2VkU2VjdGlvbk5hbWVdO1xyXG4vLyAgIGlmIChjbGlja2VkU2VjdGlvbk5hbWUgPT09IGdsb2JhbC5nZXRBY3RpdmVTZWN0aW9uTmFtZSgpKSByZXR1cm47XHJcbi8vICAgLy8xLiBHZW5lcmljIGNsZWFudXBcclxuLy8gICBjbGVhckFsbFRpbWVycygpO1xyXG4vLyAgIGdsb2JhbC5ibGFja291dC5jbGFzc0xpc3QucmVtb3ZlKFwib2ZmXCIpO1xyXG4vLyAgIC8vMi4gU3RhdGUgdXBkYXRlXHJcbi8vICAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oY2xpY2tlZFNlY3Rpb25OYW1lKTtcclxuLy8gICAvLzMuIFBvbHltb3JwaGljIGNhbGxcclxuLy8gICB0YXJnZXRNb2R1bGUuaW5pdFNlY3Rpb24oY2xpY2tlZCk7XHJcbi8vIH0pO1xyXG5cclxuLy8gTmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4vLyAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4vLyAgICAgY29uc3QgY2xpY2tlZCA9IGUudGFyZ2V0LmNsb3Nlc3QoXCIubmF2X21lbnVfbGluay1kcm9wZG93blwiKTtcclxuLy8gICAgIGlmICghY2xpY2tlZCkgcmV0dXJuO1xyXG4vLyAgICAgY29uc3QgY2xpY2tlZFNlY3Rpb25OYW1lID0gY2xpY2tlZFxyXG4vLyAgICAgICAuY2xvc2VzdChcIi5uYXZfbWVudV9saW5rLXdyYXBcIilcclxuLy8gICAgICAgLnF1ZXJ5U2VsZWN0b3IoXCIubmF2X21lbnVfbGlua1wiKS5kYXRhc2V0Lm5hdlNlY3Rpb247XHJcbi8vICAgICBjb25zdCBkcm9wZG93bkluZGV4ID0gZ2xvYmFsLmdldExvY2FsSW5kZXgoXHJcbi8vICAgICAgIGNsaWNrZWQsXHJcbi8vICAgICAgIFwibmF2X21lbnVfbGluay1kcm9wZG93blwiLFxyXG4vLyAgICAgICBcIm5hdl9tZW51X2Ryb3Bkb3duXCIsXHJcbi8vICAgICApO1xyXG4vLyAgICAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbY2xpY2tlZFNlY3Rpb25OYW1lXTtcclxuLy8gICAgIC8vMS4gR2VuZXJpYyBjbGVhbnVwXHJcbi8vICAgICBnbG9iYWwuZmxhc2hCbGFja291dCgpO1xyXG4vLyAgICAgY2xlYXJBbGxUaW1lcnMoKTtcclxuLy8gICAgIE5hdmJhci5jbG9zZU5hdk1lbnUoKTtcclxuLy8gICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShOYXZiYXIubmF2QnRuKS5kaXNwbGF5ICE9PSBcIm5vbmVcIikge1xyXG4vLyAgICAgICBOYXZiYXIubmF2QnRuLmNsaWNrKCk7XHJcbi8vICAgICB9XHJcbi8vICAgICAvLzIuIFN0YXRlIHVwZGF0ZVxyXG4vLyAgICAgZ2xvYmFsLnNldEFjdGl2ZVNlY3Rpb24oY2xpY2tlZFNlY3Rpb25OYW1lKTtcclxuLy8gICAgIC8vMy4gUG9seW1vcnBoaWMgY2FsbFxyXG4vLyAgICAgdGFyZ2V0TW9kdWxlLmluaXRTZWN0aW9uKGNsaWNrZWQsIGRyb3Bkb3duSW5kZXgpO1xyXG4vLyAgIH0pO1xyXG4vLyB9KTtcclxuXHJcbi8vIE5hdmJhci5uYXZNZW51LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xyXG4vLyAgIGNvbnN0IGNsaWNrZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiLmRyb3Bkb3duLWljb25cIik7XHJcbi8vICAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbi8vICAgTmF2YmFyLnRvZ2dsZU5hdihjbGlja2VkKTtcclxuLy8gfSk7XHJcbi8vIE5hdmJhci5uYXZCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uICgpIHtcclxuLy8gICBOYXZiYXIuY2xvc2VOYXZNZW51KCk7XHJcbi8vIH0pO1xyXG4vLyBOYXZiYXIuYWxsTmF2TGlua3NXaXRoRHJvcGRvd24uZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuLy8gICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBlbC5wYXJlbnRFbGVtZW50XHJcbi8vICAgICAgIC5xdWVyeVNlbGVjdG9yKFwiLm5hdl9tZW51X2Ryb3Bkb3duXCIpXHJcbi8vICAgICAgIC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4vLyAgIH0pO1xyXG4vLyB9KTtcclxuLy8gTmF2YmFyLmFsbE5hdkxpbmtzV2l0aERyb3Bkb3duLmZvckVhY2goZnVuY3Rpb24gKGVsKSB7XHJcbi8vICAgZWwuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIiwgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgZWwucGFyZW50RWxlbWVudFxyXG4vLyAgICAgICAucXVlcnlTZWxlY3RvcihcIi5uYXZfbWVudV9kcm9wZG93blwiKVxyXG4vLyAgICAgICAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuLy8gICB9KTtcclxuLy8gfSk7XHJcbi8vIE5hdmJhci5hbGxOYXZEcm9wZG93bnMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuLy8gICBlbC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VlbnRlclwiLCBmdW5jdGlvbiAoKSB7XHJcbi8vICAgICBlbC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xyXG4vLyAgIH0pO1xyXG4vLyB9KTtcclxuLy8gTmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4vLyAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsIGZ1bmN0aW9uICgpIHtcclxuLy8gICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbi8vICAgfSk7XHJcbi8vIH0pO1xyXG5cclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tQlROUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBjbGlja2VkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLWNsaWNrLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFjbGlja2VkKSByZXR1cm47XHJcbiAgY29uc3QgYWN0aXZlU2VjdGlvbiA9IGNsaWNrZWQuY2xvc2VzdChcIi5zZWN0aW9uXCIpLmRhdGFzZXQuc2VjdGlvbjtcclxuICBjb25zdCB0YXJnZXRNb2R1bGUgPSBTRUNUSU9OU1thY3RpdmVTZWN0aW9uXTtcclxuICBjb25zdCBhY3Rpb24gPSBjbGlja2VkLmRhdGFzZXQuY2xpY2tBY3Rpb247XHJcbiAgdGFyZ2V0TW9kdWxlLmhhbmRsZUV2ZW50KGFjdGlvbiwgY2xpY2tlZCk7XHJcbn0pO1xyXG5nbG9iYWwubWFpbldyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBmdW5jdGlvbiAoZSkge1xyXG4gIGNvbnN0IGhvdmVyZWQgPSBlLnRhcmdldC5jbG9zZXN0KFwiW2RhdGEtbW91c2VvdmVyLWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgaWYgKHRoaXMuY3VycmVudEhvdmVyID09PSBob3ZlcmVkKSByZXR1cm47IC8vIEV4aXQgaWYgd2UgYXJlIGFscmVhZHkgaG92ZXJpbmcgaXRcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IGhvdmVyZWQ7XHJcblxyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3ZlckFjdGlvbjtcclxuICB0YXJnZXRNb2R1bGUuaGFuZGxlRXZlbnQoYWN0aW9uLCBob3ZlcmVkKTtcclxufSk7XHJcbmdsb2JhbC5tYWluV3JhcHBlci5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdXRcIiwgZnVuY3Rpb24gKGUpIHtcclxuICBjb25zdCBob3ZlcmVkID0gZS50YXJnZXQuY2xvc2VzdChcIltkYXRhLW1vdXNlb3V0LWFjdGlvbl1cIik7XHJcbiAgaWYgKCFob3ZlcmVkKSByZXR1cm47XHJcbiAgLy8gSWYgdGhlIG1vdXNlIG1vdmVkIHRvIGEgY2hpbGQgb2YgdGhlIHNhbWUgYnV0dG9uLCBkb24ndCB0cmlnZ2VyIHRoZSBcIkV4aXRcIlxyXG4gIGlmIChob3ZlcmVkLmNvbnRhaW5zKGUucmVsYXRlZFRhcmdldCkpIHJldHVybjtcclxuICB0aGlzLmN1cnJlbnRIb3ZlciA9IG51bGw7XHJcblxyXG4gIGNvbnN0IGFjdGl2ZVNlY3Rpb24gPSBob3ZlcmVkLmNsb3Nlc3QoXCIuc2VjdGlvblwiKS5kYXRhc2V0LnNlY3Rpb247XHJcbiAgY29uc3QgdGFyZ2V0TW9kdWxlID0gU0VDVElPTlNbYWN0aXZlU2VjdGlvbl07XHJcbiAgY29uc3QgYWN0aW9uID0gaG92ZXJlZC5kYXRhc2V0Lm1vdXNlb3V0QWN0aW9uO1xyXG4gIHRhcmdldE1vZHVsZS5oYW5kbGVFdmVudChhY3Rpb24sIGhvdmVyZWQpO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0VWRU5UIERFTEVHQVRJT04tVklEUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vZW5kZWRcclxuZ2xvYmFsLmFsbFZpZHMuZm9yRWFjaChmdW5jdGlvbiAoZWwpIHtcclxuICBlbC5hZGRFdmVudExpc3RlbmVyKFwiZW5kZWRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgY29uc3QgdmlkVHlwZSA9IGdsb2JhbC5nZXRWaWRUeXBlKGVsKTtcclxuICAgIHN3aXRjaCAodmlkVHlwZSkge1xyXG4gICAgICBjYXNlIFwiZmVhdHVyZXNcIjpcclxuICAgICAgICBmZWF0dXJlcy52aWRFbmQoKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcImRhdGFcIjpcclxuICAgICAgICBkYXRhLnZpZEVuZChlbC5jbG9zZXN0KFwiLnZpZFwiKSk7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJzZXF1ZW5jZVwiOlxyXG4gICAgICAgIHNlcXVlbmNlLnZpZEVuZCgpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgfVxyXG4gIH0pO1xyXG59KTtcclxuLy8uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLlxyXG4vL0ZVTkNUSU9OUy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbi8vaW5pdFxyXG5jb25zdCBpbml0ID0gZnVuY3Rpb24gKCkge1xyXG4gIHNldHVwTGF6eUxvYWRpbmcoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LnJlbW92ZShcIm9mZlwiKTtcclxuICBOYXZiYXIubmF2Q29tcG9uZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XHJcbiAgTmF2YmFyLmFsbE5hdkRyb3Bkb3ducy5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgZWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcclxuICB9KTtcclxuICBnbG9iYWwuc2V0QWN0aXZlU2VjdGlvbihcImZlYXR1cmVzXCIpO1xyXG4gIGdsb2JhbC5zZXRBY3RpdmVWaWQoKTtcclxuICBnbG9iYWwuYmxhY2tvdXQuY2xhc3NMaXN0LmFkZChcIm9mZlwiKTtcclxuICBmZWF0dXJlcy5wbGF5RmVhdHVyZXNJbnRybygpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICBOYXZiYXIubmF2Q29tcG9uZW50LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XHJcbiAgICBmZWF0dXJlcy5pbml0U2VjdGlvbihudWxsLCBudWxsLCB0cnVlKTtcclxuICB9LCBTVEFSVF9VSV9SRVZFQUwpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvLy4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbn07XHJcbmNvbnN0IHNldHVwTGF6eUxvYWRpbmcgPSBmdW5jdGlvbiAoKSB7XHJcbiAgY29uc3QgYWxsTGF6eVZpZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKTtcclxuICBjb25zdCBvYnNlcnZlck9wdGlvbnMgPSB7XHJcbiAgICByb290OiBudWxsLFxyXG4gICAgcm9vdE1hcmdpbjogXCIwcHhcIixcclxuICAgIHRocmVzaG9sZDogMC4xLFxyXG4gIH07XHJcbiAgY29uc3QgdmlkZW9PYnNlcnZlciA9IG5ldyBJbnRlcnNlY3Rpb25PYnNlcnZlcigoZW50cmllcykgPT4ge1xyXG4gICAgZW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICBjb25zdCB2aWRlbyA9IGVudHJ5LnRhcmdldDtcclxuICAgICAgY29uc3Qgc291cmNlcyA9IHZpZGVvLnF1ZXJ5U2VsZWN0b3JBbGwoXCJzb3VyY2VcIik7XHJcbiAgICAgIGlmIChlbnRyeS5pc0ludGVyc2VjdGluZykge1xyXG4gICAgICAgIC8vIC0tLSBMT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIHNvdXJjZXMuZm9yRWFjaCgoc291cmNlKSA9PiB7XHJcbiAgICAgICAgICAvLyBVc2UgZGF0YS1zcmMgaWYgYXZhaWxhYmxlLCBvdGhlcndpc2Uga2VlcCBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgZGF0YVNyYyA9IHNvdXJjZS5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNyY1wiKSB8fCBzb3VyY2Uuc3JjO1xyXG4gICAgICAgICAgaWYgKGRhdGFTcmMpIHtcclxuICAgICAgICAgICAgc291cmNlLnNyYyA9IGRhdGFTcmM7XHJcbiAgICAgICAgICAgIC8vIEtlZXAgZGF0YS1zcmMgYXR0cmlidXRlIHNvIHdlIGNhbiBmaW5kIHRoZSBVUkwgYWdhaW4gbGF0ZXJcclxuICAgICAgICAgICAgc291cmNlLnNldEF0dHJpYnV0ZShcImRhdGEtc3JjXCIsIGRhdGFTcmMpO1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHZpZGVvLmxvYWQoKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyAtLS0gVU5MT0FEIExPR0lDIC0tLVxyXG4gICAgICAgIC8vIENsZWFycyB0aGUgaW50ZXJuYWwgbG9ncyBmb3IgdXNlciBpbnRlcmFjdGlvbnMgYW5kIHJlc291cmNlIGxvYWRzXHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNZWFzdXJlcygpO1xyXG4gICAgICAgIHBlcmZvcm1hbmNlLmNsZWFyUmVzb3VyY2VUaW1pbmdzKCk7XHJcbiAgICAgICAgcGVyZm9ybWFuY2UuY2xlYXJNYXJrcygpO1xyXG4gICAgICAgIFJlc2V0U2VjdGlvbih2aWRlby5jbG9zZXN0KFwiLnNlY3Rpb25cIikpO1xyXG4gICAgICAgIHZpZGVvLnBhdXNlKCk7XHJcbiAgICAgICAgc291cmNlcy5mb3JFYWNoKChzb3VyY2UpID0+IHtcclxuICAgICAgICAgIC8vIE1vdmUgc3JjIGJhY2sgdG8gZGF0YS1zcmMgYW5kIGVtcHR5IHRoZSBjdXJyZW50IHNyY1xyXG4gICAgICAgICAgY29uc3QgY3VycmVudFNyYyA9IHNvdXJjZS5zcmM7XHJcbiAgICAgICAgICBpZiAoY3VycmVudFNyYykge1xyXG4gICAgICAgICAgICBzb3VyY2Uuc2V0QXR0cmlidXRlKFwiZGF0YS1zcmNcIiwgY3VycmVudFNyYyk7XHJcbiAgICAgICAgICAgIHNvdXJjZS5zcmMgPSBcIlwiOyAvLyBUaGlzIHN0b3BzIHRoZSB2aWRlbyBmcm9tIGJ1ZmZlcmluZ1xyXG4gICAgICAgICAgICBzb3VyY2UucmVtb3ZlQXR0cmlidXRlKFwic3JjXCIpOyAvLyBGdWxseSBjbGVhciBhdHRyaWJ1dGVcclxuICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBGb3JjZSB0aGUgYnJvd3NlciB0byBkdW1wIHRoZSB2aWRlbyBkYXRhIGZyb20gbWVtb3J5XHJcbiAgICAgICAgdmlkZW8ubG9hZCgpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LCBvYnNlcnZlck9wdGlvbnMpO1xyXG4gIGFsbExhenlWaWRzLmZvckVhY2goKHZpZCkgPT4gdmlkZW9PYnNlcnZlci5vYnNlcnZlKHZpZCkpO1xyXG4gIC8vLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi5cclxuICAvL1JFU0VUIFZJRFMgQUZURVIgVU5MT0FESU5HLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uLi4uXHJcbiAgY29uc3QgUmVzZXRTZWN0aW9uID0gZnVuY3Rpb24gKHNlY3Rpb24pIHtcclxuICAgIGlmICghc2VjdGlvbikgcmV0dXJuOyAvL2hlbHBzIHByZXZlbnQgY3Jhc2hlc1xyXG4gICAgc2VjdGlvbi5xdWVyeVNlbGVjdG9yQWxsKFwiLnZpZFwiKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xyXG4gICAgICBlbC5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgIGVsLnBhdXNlKCk7XHJcbiAgICB9KTtcclxuICAgIGdsb2JhbC5kZWFjdGl2YXRlQ3VycmVudEJ0bnMoc2VjdGlvbik7XHJcbiAgfTtcclxufTtcclxuLy9mZWF0dXJlcyBhbmQgc2VxdWVuY2UgdGltZXJzXHJcbmNvbnN0IGNsZWFyQWxsVGltZXJzID0gZnVuY3Rpb24gKCkge1xyXG4gIGZlYXR1cmVzLmNsZWFyRmVhdHVyZXNUaW1lcnMoKTtcclxuICBzZXF1ZW5jZS5jbGVhclNlcXVlbmNlVGltZXJzKCk7XHJcbn07XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7O0FBQU8sTUFBTSxrQkFBa0I7QUFFeEIsTUFBTSxpQkFBaUI7QUFDdkIsTUFBTSwwQkFBMEI7QUFDaEMsTUFBTSxnQkFBZ0I7QUFJdEIsTUFBTSxjQUNYO0FBQ0ssTUFBTSxpQkFDWDtBQUNLLE1BQU0sY0FDWDtBQUNLLE1BQU0saUJBQ1g7QUFDSyxNQUFNLGNBQ1g7QUFDSyxNQUFNLGlCQUNYO0FBRUssTUFBTSxpQkFBaUI7QUFBQSxJQUM1QixVQUFVO0FBQUEsTUFDUixXQUFXO0FBQUEsTUFDWCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0EsVUFBVTtBQUFBLE1BQ1IsV0FBVztBQUFBLE1BQ1gsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLFVBQVU7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjs7O0FDbENBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyxNQUFNLGNBQWMsU0FBUyxjQUFjLGVBQWU7QUFDMUQsTUFBTSxXQUFXLFNBQVMsY0FBYyxXQUFXO0FBQ25ELE1BQU0sY0FBYyxDQUFDLEdBQUcsU0FBUyxpQkFBaUIsVUFBVSxDQUFDO0FBQzdELE1BQU0sY0FBYyxTQUFTLGlCQUFpQixXQUFXO0FBQ3pELE1BQU0sVUFBVSxTQUFTLGlCQUFpQixNQUFNO0FBQ3ZELE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSTtBQUdHLE1BQU0sZ0JBQWdCLFdBQVk7QUFDdkMsYUFBUyxVQUFVLE9BQU8sS0FBSztBQUMvQixlQUFXLFdBQVk7QUFDckIsZUFBUyxVQUFVLElBQUksS0FBSztBQUFBLElBQzlCLEdBQUcsY0FBYztBQUFBLEVBQ25CO0FBQ08sTUFBTSwwQkFBMEIsV0FBWTtBQUNqRCxhQUFTLGNBQWMsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCO0FBQzFELGFBQVMsY0FBYyxhQUFhLEVBQUUsTUFBTSxnQkFBZ0I7QUFBQSxFQUM5RDtBQUNPLE1BQU0sMkJBQTJCLFdBQVk7QUFDbEQsYUFBUyxjQUFjLFdBQVcsRUFBRSxNQUFNLGdCQUFnQjtBQUMxRCxRQUNFLE9BQU8saUJBQWlCLFNBQVMsY0FBYyxXQUFXLENBQUMsRUFBRSxZQUM3RCxTQUNBO0FBQ0EsZUFBUyxjQUFjLGFBQWEsRUFBRSxNQUFNO0FBQUEsSUFDOUM7QUFFQSxhQUFTLGNBQWMsYUFBYSxFQUFFLE1BQU0sZ0JBQWdCO0FBQUEsRUFDOUQ7QUFDTyxNQUFNLHlCQUF5QixTQUFVLFNBQVM7QUFDdkQsOEJBQTBCO0FBQzFCLFlBQVEsVUFBVSxJQUFJLFNBQVM7QUFBQSxFQUNqQztBQUNPLE1BQU0sNEJBQTRCLFdBQVk7QUFDbkQsYUFBUyxpQkFBaUIsZ0JBQWdCLEVBQUUsUUFBUSxTQUFVLElBQUk7QUFDaEUsU0FBRyxVQUFVLE9BQU8sU0FBUztBQUFBLElBQy9CLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxtQkFBbUIsV0FBWTtBQUMxQyxXQUFPO0FBQUEsRUFDVDtBQUNPLE1BQU0sdUJBQXVCLFdBQVk7QUFDOUMsV0FBTztBQUFBLEVBQ1Q7QUFDTyxNQUFNLG1CQUFtQixTQUFVLGFBQWEsT0FBTztBQUM1RCwwQkFBc0I7QUFDdEIsd0JBQW9CO0FBQ3BCLFFBQUksQ0FBQyxNQUFPLFNBQVE7QUFDcEIsVUFBTSxVQUFVLFlBQVk7QUFBQSxNQUMxQixDQUFDLE9BQU8sR0FBRyxRQUFRLFlBQVk7QUFBQSxJQUNqQztBQUNBLFVBQU0sU0FBUyxRQUFRLEtBQUs7QUFDNUIsUUFBSSxRQUFRO0FBQ1YsYUFBTyxVQUFVLElBQUksUUFBUTtBQUM3QixzQkFBZ0I7QUFBQSxJQUNsQjtBQUFBLEVBQ0Y7QUFDTyxNQUFNLHdCQUF3QixXQUFZO0FBQy9DLGdCQUFZLFFBQVEsU0FBVSxJQUFJO0FBQ2hDLFNBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSDtBQUNPLE1BQU0sYUFBYSxTQUFVLE9BQU87QUFDekMsV0FBTyxNQUFNLFFBQVEsVUFBVSxFQUFFLFFBQVE7QUFBQSxFQUMzQztBQUNPLFdBQVMsZUFBZTtBQUM3QixXQUFPO0FBQUEsRUFDVDtBQUNPLFdBQVMsZUFBZTtBQUM3QixnQkFBWSxRQUFRLENBQUMsT0FBTztBQUMxQixVQUFJLEdBQUcsaUJBQWlCLE1BQU07QUFDNUIsb0JBQVksR0FBRyxjQUFjLE1BQU07QUFBQSxNQUNyQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFDTyxXQUFTLGFBQWEsVUFBVTtBQUNyQyxnQkFBWTtBQUFBLEVBQ2Q7QUFDTyxXQUFTLFdBQVcsVUFBVTtBQUNuQyxjQUFVO0FBQUEsRUFDWjtBQUNPLE1BQU0scUJBQXFCLFdBQVk7QUFDNUMsa0JBQWMsaUJBQWlCLE1BQU0sRUFBRSxRQUFRLFNBQVUsSUFBSTtBQUMzRCxTQUFHLE1BQU07QUFDVCxTQUFHLEtBQUs7QUFBQSxJQUNWLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxzQkFBc0IsV0FBWTtBQUM3QyxrQkFBYyxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsU0FBVSxJQUFJO0FBQzNELFNBQUcsY0FBYztBQUNqQixTQUFHLE1BQU07QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBQ08sTUFBTSxZQUFZLFNBQVUsa0JBQWtCO0FBRW5ELFVBQU0sVUFBVSxVQUFVO0FBQzFCLFVBQU0sY0FBYyxvQkFBb0I7QUFHeEMsUUFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBR3JDLGNBQVUsb0JBQW9CLGNBQWMsVUFBVSxlQUFlO0FBRXJFLFVBQU0sY0FBYyxNQUFNO0FBQ3hCLFVBQUksVUFBVSxlQUFlLFVBQVUsTUFBTTtBQUMzQyxrQkFBVSxvQkFBb0IsY0FBYyxXQUFXO0FBQ3ZELGtCQUFVLE1BQU07QUFDaEIsa0JBQVUsY0FBYztBQUN4QixrQkFBVSxjQUFjLElBQUksTUFBTSxPQUFPLENBQUM7QUFBQSxNQUM1QztBQUFBLElBQ0Y7QUFDQSxjQUFVLGtCQUFrQjtBQUc1QixVQUFNLFNBQVMsVUFBVSxjQUFjLFFBQVE7QUFDL0MsVUFBTSxVQUFVLFNBQVMsT0FBTyxhQUFhLFVBQVUsSUFBSTtBQUMzRCxRQUFJLFdBQVcsVUFBVSxRQUFRLFNBQVM7QUFDeEMsZ0JBQVUsTUFBTTtBQUNoQixnQkFBVSxNQUFNO0FBQ2hCLGdCQUFVLEtBQUs7QUFBQSxJQUNqQjtBQUVBLFVBQU0sd0JBQXdCLFlBQVk7QUFDeEMsVUFBSTtBQUNGLGtCQUFVLGNBQWM7QUFLeEIsY0FBTSxlQUFlLE1BQU07QUFDekIsY0FBSSxVQUFVLGNBQWMsYUFBYTtBQUV2QyxrQ0FBc0IsTUFBTTtBQUMxQixvQ0FBc0IsTUFBTTtBQUMxQixvQkFBSSxRQUFTLFNBQVEsTUFBTSxVQUFVO0FBQ3JDLG9CQUFJLE9BQU8sYUFBYTtBQUN0QiwyQkFBUyxVQUFVLElBQUksS0FBSztBQUFBLGNBQ2hDLENBQUM7QUFBQSxZQUNILENBQUM7QUFBQSxVQUNILFdBQVcsQ0FBQyxVQUFVLFFBQVE7QUFFNUIsa0NBQXNCLFlBQVk7QUFBQSxVQUNwQztBQUFBLFFBQ0Y7QUFHQSxrQkFBVSxpQkFBaUIsY0FBYyxXQUFXO0FBQ3BELGNBQU0sVUFBVSxLQUFLO0FBQ3JCLHFCQUFhO0FBQUEsTUFDZixTQUFTLEdBQUc7QUFDVixnQkFBUSxLQUFLLG9CQUFvQixDQUFDO0FBRWxDLFlBQUksUUFBUyxTQUFRLE1BQU0sVUFBVTtBQUFBLE1BQ3ZDO0FBQUEsSUFDRjtBQUdBLFFBQUksVUFBVSxjQUFjLEdBQUc7QUFDN0IsNEJBQXNCO0FBQUEsSUFDeEIsT0FBTztBQUNMLGdCQUFVLGlCQUFpQixXQUFXLHVCQUF1QjtBQUFBLFFBQzNELE1BQU07QUFBQSxNQUNSLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNPLE1BQU0sZUFBZSxXQUFZO0FBRXRDLGdCQUFZO0FBQ1osa0JBQWMsY0FBYyxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQjtBQUFBLEVBQ3RFO0FBQ08sTUFBTSxjQUFjLFdBQVk7QUFFckMsa0JBQWMsY0FBYyxnQkFBZ0IsRUFBRSxNQUFNLGdCQUFnQjtBQUFBLEVBQ3RFO0FBQ08sTUFBTSxjQUFjLFdBQVk7QUFFckMsUUFBSSxXQUFXO0FBQ2Isa0JBQVk7QUFDWixnQkFBVSxLQUFLO0FBQUEsSUFDakIsT0FBTztBQUNMLGtCQUFZO0FBQ1osZ0JBQVUsTUFBTTtBQUFBLElBQ2xCO0FBQUEsRUFDRjtBQUNPLE1BQU0sNkJBQTZCLFdBQVk7QUFDcEQsa0JBQWMsY0FBYyxvQkFBb0IsRUFBRSxNQUFNLGdCQUN0RDtBQUFBLEVBQ0o7QUFDTyxNQUFNLDhCQUE4QixXQUFZO0FBQ3JELGtCQUFjLGNBQWMsb0JBQW9CLEVBQUUsTUFBTSxnQkFDdEQ7QUFBQSxFQUNKO0FBQ08sTUFBTSwwQkFBMEIsU0FBVSxpQkFBaUI7QUFDaEUsaUNBQTZCO0FBQzdCLGtCQUNHLGlCQUFpQixvQkFBb0IsRUFDckMsUUFBUSxTQUFVLElBQUksT0FBTztBQUM1QixVQUFJLFVBQVUsaUJBQWlCO0FBQzdCLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0w7QUFDTyxNQUFNLCtCQUErQixXQUFZO0FBQ3RELGtCQUFjLGlCQUFpQixvQkFBb0IsRUFBRSxRQUFRLFNBQVUsSUFBSTtBQUN6RSxTQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0g7QUFDTyxNQUFNLHFCQUFxQixTQUFVLEtBQUs7QUFDL0MsMEJBQXNCO0FBQ3RCLFFBQUksVUFBVSxJQUFJLFNBQVM7QUFBQSxFQUM3QjtBQUNPLE1BQU0sd0JBQXdCLFNBQVUsU0FBUztBQUN0RCxRQUFJLENBQUMsUUFBUyxXQUFVO0FBQ3hCLFlBQVEsaUJBQWlCLFdBQVcsRUFBRSxRQUFRLFNBQVUsSUFBSTtBQUMxRCxTQUFHLFVBQVUsT0FBTyxTQUFTO0FBQUEsSUFDL0IsQ0FBQztBQUFBLEVBQ0g7QUFDTyxNQUFNLGdCQUFnQixTQUFVLEtBQUssVUFBVSxnQkFBZ0I7QUFFcEUsUUFBSTtBQUNKLFVBQU0sVUFBVSxJQUNiLFFBQVEsSUFBSSxjQUFjLEVBQUUsRUFDNUIsaUJBQWlCLElBQUksUUFBUSxFQUFFO0FBQ2xDLFlBQVEsUUFBUSxTQUFVLElBQUksT0FBTztBQUNuQyxVQUFJLE9BQU8sSUFBSyxjQUFhO0FBQUEsSUFDL0IsQ0FBQztBQUNELFdBQU87QUFBQSxFQUNUOzs7QUM1T0EsTUFBTSxTQUFOLE1BQWE7QUFBQTtBQUFBO0FBQUEsSUFHWCxlQUFlLFNBQVMsY0FBYyxnQkFBZ0I7QUFBQSxJQUN0RCxVQUFVLFNBQVMsY0FBYyxXQUFXO0FBQUEsSUFDNUMsU0FBUyxTQUFTLGNBQWMsYUFBYTtBQUFBLElBQzdDLGNBQWMsU0FBUyxpQkFBaUIsZ0JBQWdCO0FBQUEsSUFDeEQsMEJBQTBCO0FBQUEsTUFDeEIsR0FBRyxTQUFTLGlCQUFpQiwrQkFBK0I7QUFBQSxJQUM5RDtBQUFBLElBQ0Esa0JBQWtCLENBQUMsR0FBRyxTQUFTLGlCQUFpQixvQkFBb0IsQ0FBQztBQUFBLElBQ3JFO0FBQUE7QUFBQTtBQUFBLElBR0EsbUJBQW1CLFNBQVUsU0FBUztBQUNwQyxZQUFNLGVBQWUsUUFBUSxRQUFRLG9CQUFvQjtBQUN6RCxZQUFNLHNCQUFzQjtBQUFBLFFBQzFCLEdBQUcsYUFBYSxpQkFBaUIseUJBQXlCO0FBQUEsTUFDNUQ7QUFDQSxXQUFLLGdCQUFnQixvQkFBb0IsUUFBUSxPQUFPO0FBQUEsSUFDMUQ7QUFBQSxJQUNBLGVBQWUsV0FBWTtBQUN6QixXQUFLLGdCQUFnQixRQUFRLFNBQVUsSUFBSTtBQUN6QyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFlBQVksU0FBVSxTQUFTO0FBQzdCLFlBQU0sV0FBVyxVQUNiLFFBQ0csUUFBUSxxQkFBcUIsRUFDN0IsY0FBYyxvQkFBb0IsSUFDckMsS0FBSyxRQUFRLGNBQWMsb0JBQW9CO0FBRW5ELFVBQUksU0FBVSxVQUFTLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDbEQ7QUFBQSxFQUNGO0FBQ0EsTUFBTyxpQkFBUSxJQUFJLE9BQU87OztBQ2xDMUIsTUFBTSxXQUFOLE1BQWU7QUFBQSxJQUNiLFlBQVksa0JBQWtCLFdBQVc7QUFDdkMsV0FBSyxTQUFTO0FBQ2QsV0FBSyxZQUFZO0FBR2pCLFdBQUssbUJBQW1CLEtBQUssVUFBVSxjQUFjLFdBQVc7QUFDaEUsV0FBSyxrQkFBa0I7QUFBQSxRQUNyQixHQUFHLEtBQUssVUFBVSxpQkFBaUIsZUFBZTtBQUFBLE1BQ3BEO0FBQ0EsV0FBSyxzQkFDSCxLQUFLLFVBQVUsY0FBYyxvQkFBb0I7QUFDbkQsV0FBSyxpQkFBaUIsS0FBSyxVQUFVLGNBQWMsdUJBQXVCO0FBQzFFLFdBQUssZUFBZSxLQUFLLFVBQVUsY0FBYyxnQkFBZ0I7QUFDakUsV0FBSyxtQkFBbUIsS0FBSyxVQUFVLGNBQWMsb0JBQW9CO0FBQ3pFLFdBQUssV0FBVztBQUNoQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssWUFBWSxLQUFLLElBQUksQ0FBQztBQUFBLFFBQzdDLENBQUMsaUJBQWlCLEtBQUssZUFBZSxLQUFLLElBQUksQ0FBQztBQUFBLFFBQ2hELENBQUMsa0JBQWtCLEtBQUssYUFBYSxLQUFLLElBQUksQ0FBQztBQUFBLE1BQ2pELENBQUM7QUFBQSxJQUNIO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtBLGNBQWMsU0FBVSxTQUFTLE9BQU8sV0FBVztBQUNqRCxXQUFLLE9BQU8sU0FBUyxVQUFVLElBQUksS0FBSztBQUN4QyxXQUFLLGlCQUFpQixVQUFVLElBQUksS0FBSztBQUN6QyxXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxPQUFPLGFBQWE7QUFDekIsVUFBSSxTQUFTO0FBQ1gsYUFBSyxPQUFPLHVCQUF1QixPQUFPO0FBQzFDLGFBQUssT0FBTyxjQUFjO0FBQUEsTUFDNUI7QUFDQSxXQUFLLE9BQU8sMkJBQTJCO0FBQ3ZDLFdBQUssWUFBWTtBQUNqQixXQUFLLGNBQWM7QUFDbkIsV0FBSyxpQkFBaUIsVUFBVSxJQUFJLFFBQVE7QUFDNUMsVUFBSSxVQUFXO0FBQ2YsV0FBSyxrQkFBa0I7QUFBQSxJQUN6QjtBQUFBLElBQ0EsY0FBYyxDQUFDLGFBQWEsZUFBZTtBQUN6QyxZQUFNLFNBQVMsS0FBSyxTQUFTLElBQUksV0FBVztBQUM1QyxVQUFJLFFBQVE7QUFDVixlQUFPLFVBQVU7QUFBQSxNQUNuQixPQUFPO0FBQ0wsZ0JBQVEsS0FBSyx3QkFBd0IsV0FBVyxFQUFFO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxjQUFjLFdBQVk7QUFDeEIsV0FBSyxnQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDekMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxnQkFBZ0IsV0FBWTtBQUMxQixXQUFLLGdCQUNGLEtBQUssQ0FBQyxPQUFPLEdBQUcsUUFBUSxnQkFBZ0IsT0FBTyxFQUMvQyxVQUFVLElBQUksUUFBUTtBQUFBLElBQzNCO0FBQUEsSUFDQSxrQkFBa0IsV0FBWTtBQUM1QixXQUFLLGdCQUFnQixLQUFLLFdBQVcsQ0FBQyxFQUFFLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDaEU7QUFBQSxJQUNBLDBCQUEwQixXQUFZO0FBQ3BDLFdBQUssb0JBQW9CLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDakQ7QUFBQSxJQUNBLDBCQUEwQixXQUFZO0FBQ3BDLFdBQUssb0JBQW9CLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDcEQ7QUFBQSxJQUNBLHFCQUFxQixXQUFZO0FBQy9CLFdBQUssZUFBZSxVQUFVLElBQUksUUFBUTtBQUFBLElBQzVDO0FBQUEsSUFDQSxxQkFBcUIsV0FBWTtBQUMvQixXQUFLLGVBQWUsVUFBVSxPQUFPLFFBQVE7QUFBQSxJQUMvQztBQUFBLElBQ0Esb0JBQW9CLFdBQVk7QUFDOUIsV0FBSyxpQkFBaUIsVUFBVSxJQUFJLEtBQUs7QUFDekMsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyxtQkFBbUI7QUFFeEIsWUFBTSxZQUNKLEtBQUssb0JBQW9CLGlCQUFpQixpQkFBaUI7QUFDN0QsZ0JBQVUsUUFBUSxDQUFDLE9BQU87QUFFeEIsWUFBSSxHQUFHLGlCQUFpQixNQUFNO0FBQzVCLGdCQUFNLE1BQU0sR0FBRyxjQUFjLFlBQVk7QUFDekMsY0FBSSxLQUFLO0FBQ1AsZ0JBQUksY0FBYztBQUNsQixnQkFBSSxLQUFLO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxpQkFBaUIsU0FBVSxnQkFBZ0I7QUFDekMsV0FBSyxvQkFBb0I7QUFDekIsV0FBSyxPQUFPLGFBQWE7QUFDekIsV0FBSyxPQUFPLFlBQVk7QUFDeEIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQzNDLFdBQUssd0JBQXdCO0FBQzdCLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssV0FBVyxLQUFLLE9BQU87QUFBQSxRQUMxQjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUNBLFdBQUsseUJBQXlCO0FBQzlCLFdBQUssWUFBWTtBQUNqQixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLE9BQU8sYUFBYSxlQUFlLFFBQVEsU0FBUztBQUN6RCxXQUFLLE9BQU8sV0FBVyxlQUFlLFFBQVEsT0FBTztBQUNyRCxXQUFLLE9BQU8sbUJBQW1CLGNBQWM7QUFDN0MsV0FBSyxPQUFPLFNBQVMsVUFBVSxPQUFPLEtBQUs7QUFDM0MsV0FBSyxPQUFPLFVBQVU7QUFBQSxJQUN4QjtBQUFBLElBQ0EsZUFBZSxXQUFZO0FBQ3pCLFdBQUssT0FBTyxZQUFZO0FBQ3hCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzdDO0FBQUEsSUFDQSxTQUFTLFdBQVk7QUFDbkIsVUFBSSxLQUFLLDJCQUEyQixPQUFPO0FBQ3pDLGFBQUssT0FBTyw0QkFBNEI7QUFDeEMsYUFBSyxPQUFPLGFBQWE7QUFDekIsYUFBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQzNDLGFBQUssZ0JBQWdCLFdBQVcsTUFBTTtBQUNwQyxlQUFLLGlCQUFpQixVQUFVLE9BQU8sS0FBSztBQUM1QyxxQkFBVyxNQUFNO0FBQ2YsaUJBQUssWUFBWTtBQUNqQixpQkFBSyxjQUFjO0FBQ25CLGlCQUFLLE9BQU8sb0JBQW9CO0FBQ2hDLGlCQUFLLE9BQU8sc0JBQXNCO0FBQ2xDLGlCQUFLLE9BQU8sd0JBQXdCO0FBQ3BDLGlCQUFLLE9BQU8sMkJBQTJCO0FBQ3ZDLGlCQUFLLGtCQUFrQjtBQUFBLFVBQ3pCLEdBQUcsdUJBQXVCO0FBQUEsUUFDNUIsR0FBRyxhQUFhO0FBQUEsTUFDbEI7QUFBQSxJQUNGO0FBQUEsSUFDQSx3QkFBd0IsV0FBWTtBQUNsQyxXQUFLLGlCQUFpQixRQUFRLFNBQVUsSUFBSTtBQUMxQyxXQUFHLFVBQVUsT0FBTyxTQUFTO0FBQUEsTUFDL0IsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLHNCQUFzQixXQUFZO0FBQ2hDLFdBQUsseUJBQXlCO0FBQzlCLG1CQUFhLEtBQUssYUFBYTtBQUMvQixXQUFLLGdCQUFnQjtBQUFBLElBQ3ZCO0FBQUEsRUFDRjtBQUNBLE1BQU8sbUJBQVE7OztBQy9JZixNQUFNLE9BQU4sTUFBVztBQUFBLElBQ1QsWUFBWSxrQkFBa0IsV0FBVztBQUN2QyxXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFHakIsV0FBSyxZQUFZLEtBQUssVUFBVSxjQUFjLG1CQUFtQjtBQUVqRSxXQUFLLGFBQWEsS0FBSyxVQUFVLGNBQWMsbUJBQW1CO0FBQ2xFLFdBQUssaUJBQWlCLEtBQUssVUFBVSxpQkFBaUIsZ0JBQWdCO0FBQ3RFLFdBQUssYUFBYSxLQUFLLFVBQVUsY0FBYyxtQkFBbUI7QUFDbEUsV0FBSyxpQkFBaUIsS0FBSyxVQUFVLGlCQUFpQixXQUFXO0FBQ2pFLFdBQUs7QUFDTCxXQUFLO0FBQ0wsV0FBSztBQUVMLFdBQUssY0FBYyxLQUFLLFVBQVUsY0FBYyxnQkFBZ0I7QUFDaEUsV0FBSyxlQUFlLEtBQUssVUFBVSxjQUFjLGdCQUFnQjtBQUNqRSxXQUFLLGlCQUFpQjtBQUFBLFFBQ3BCLEdBQUcsS0FBSyxVQUFVLGlCQUFpQixpQkFBaUI7QUFBQSxNQUN0RDtBQUNBLFdBQUsscUJBQXFCO0FBQzFCLFdBQUssYUFBYTtBQUNsQixXQUFLLGlCQUFpQixFQUFFLE1BQU0sVUFBVSxXQUFXLEdBQUcsU0FBUyxFQUFFO0FBQ2pFLFdBQUssZ0JBQWdCO0FBRXJCLFdBQUssU0FBUyxLQUFLLFVBQVUsY0FBYyxTQUFTO0FBQ3BELFdBQUssWUFBWSxLQUFLLFVBQVUsY0FBYyxjQUFjO0FBQzVELFdBQUssV0FBVztBQUNoQixXQUFLLG9CQUFvQixLQUFLLFVBQVU7QUFBQSxRQUN0QztBQUFBLE1BQ0Y7QUFDQSxXQUFLLGtCQUFrQjtBQUFBLFFBQ3JCLEdBQUcsS0FBSyxVQUFVLGlCQUFpQix5QkFBeUI7QUFBQSxNQUM5RDtBQUNBLFdBQUssVUFBVSxDQUFDLEdBQUcsS0FBSyxVQUFVLGlCQUFpQixpQkFBaUIsQ0FBQztBQUNyRSxXQUFLLGtCQUFrQjtBQUV2QixXQUFLLGlCQUFpQixLQUFLLFVBQVUsY0FBYyxvQkFBb0I7QUFDdkUsV0FBSyxxQkFBcUI7QUFBQSxRQUN4QixHQUFHLEtBQUssVUFBVSxpQkFBaUIsb0JBQW9CO0FBQUEsTUFDekQ7QUFDQSxXQUFLLHVCQUF1QixLQUFLLG1CQUFtQixDQUFDO0FBQ3JELFdBQUssZUFBZTtBQUNwQixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsYUFBYSxLQUFLLFlBQVksS0FBSyxJQUFJLENBQUM7QUFBQSxRQUN6QyxDQUFDLGlCQUFpQixLQUFLLHFCQUFxQixLQUFLLElBQUksQ0FBQztBQUFBLFFBQ3RELENBQUMsaUJBQWlCLEtBQUssa0JBQWtCLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDbkQsQ0FBQyxnQkFBZ0IsS0FBSyxtQkFBbUIsS0FBSyxJQUFJLENBQUM7QUFBQSxRQUNuRCxDQUFDLHVCQUF1QixLQUFLLGlCQUFpQixLQUFLLElBQUksQ0FBQztBQUFBLFFBQ3hELENBQUMsd0JBQXdCLEtBQUssaUJBQWlCLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDekQsQ0FBQyxrQkFBa0IsS0FBSyxvQkFBb0IsS0FBSyxJQUFJLENBQUM7QUFBQSxNQUN4RCxDQUFDO0FBQUEsSUFDSDtBQUFBO0FBQUE7QUFBQSxJQUdBLGNBQWMsU0FBVSxTQUFTLE9BQU87QUFDdEMsV0FBSyxPQUFPLGNBQWM7QUFFMUIsV0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3JDLFdBQUssV0FBVztBQUNoQixXQUFLLFVBQVUsY0FBYztBQUM3QixXQUFLLFlBQVk7QUFDakIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssbUJBQW1CO0FBQ3hCLFdBQUssVUFBVSxVQUFVLElBQUksUUFBUTtBQUNyQyxXQUFLLG1CQUFtQjtBQUd4QixXQUFLLE9BQU8sbUJBQW1CO0FBQy9CLFdBQUssa0JBQWtCO0FBQ3ZCLFdBQUssd0JBQXdCO0FBQUEsSUFDL0I7QUFBQSxJQUNBLGNBQWMsQ0FBQyxhQUFhLGVBQWU7QUFDekMsWUFBTSxTQUFTLEtBQUssU0FBUyxJQUFJLFdBQVc7QUFDNUMsVUFBSSxRQUFRO0FBQ1YsZUFBTyxVQUFVO0FBQUEsTUFDbkIsT0FBTztBQUNMLGdCQUFRLEtBQUssd0JBQXdCLFdBQVcsRUFBRTtBQUFBLE1BQ3BEO0FBQUEsSUFDRjtBQUFBLElBQ0EsbUJBQW1CLFdBQVk7QUFDN0IsV0FBSyxhQUFhLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDMUM7QUFBQSxJQUNBLG1CQUFtQixXQUFZO0FBQzdCLFdBQUssYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzdDO0FBQUEsSUFDQSxzQkFBc0IsV0FBWTtBQUNoQyxVQUFJLEtBQUssYUFBYSxTQUFTO0FBQzdCLGFBQUssV0FBVztBQUNoQixhQUFLLE9BQU8sVUFBVSxPQUFPLFFBQVE7QUFDckMsYUFBSyxnQkFBZ0IsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUNoRCxPQUFPO0FBQ0wsYUFBSyxXQUFXO0FBQ2hCLGFBQUssT0FBTyxVQUFVLElBQUksUUFBUTtBQUNsQyxhQUFLLGdCQUFnQixVQUFVLElBQUksUUFBUTtBQUFBLE1BQzdDO0FBQ0EsV0FBSyxrQkFBa0IsY0FBYyxjQUFjLEVBQUUsY0FDbkQsS0FBSztBQUFBLElBQ1Q7QUFBQSxJQUNBLHdCQUF3QixXQUFZO0FBQ2xDLFdBQUssZUFBZSxRQUFRLENBQUMsSUFBSSxVQUFVO0FBQ3pDLFlBQUksR0FBRyxVQUFVLFNBQVMsUUFBUSxHQUFHO0FBQ25DLGVBQUsscUJBQXFCO0FBQzFCLGFBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxRQUM5QjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLGNBQWMsV0FBWTtBQUN4QixXQUFLLDBCQUEwQjtBQUMvQixXQUFLLGtCQUNGLGlCQUFpQixpQkFBaUIsRUFDbEMsUUFBUSxTQUFVLElBQUk7QUFDckIsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNMO0FBQUEsSUFDQSxXQUFXLFdBQVk7QUFDckIsV0FBSyxrQkFBa0IsVUFBVSxJQUFJLFFBQVE7QUFDN0MsV0FBSyxrQkFBa0IsTUFBTTtBQUFBLFFBQzNCLEtBQUssa0JBQWtCLGlCQUFpQixpQkFBaUI7QUFBQSxNQUMzRCxFQUFFLEtBQUssWUFBWTtBQUNuQixXQUFLLGdCQUFnQixVQUFVLElBQUksUUFBUTtBQUFBLElBQzdDO0FBQUEsSUFDQSxjQUFjLFdBQVk7QUFDeEIsV0FBSyxxQkFDRixjQUFjLGdCQUFnQixFQUM5QixVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCO0FBQUEsSUFDQSxjQUFjLFdBQVk7QUFDeEIsV0FBSyxxQkFDRixpQkFBaUIsV0FBVyxFQUM1QixRQUFRLFNBQVUsSUFBSTtBQUNyQixXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUNILFdBQUsscUJBQXFCLFVBQVUsSUFBSSxRQUFRO0FBQ2hELFdBQUsscUJBQ0YsY0FBYyxnQkFBZ0IsRUFDOUIsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUMzQjtBQUFBLElBQ0EscUJBQXFCLFdBQVk7QUFDL0IsV0FBSyxRQUFRLFFBQVEsU0FBVSxJQUFJO0FBQ2pDLFdBQUcsY0FBYyxVQUFVLElBQUksUUFBUTtBQUN2QyxXQUFHLGNBQWMsc0JBQXNCLEVBQUUsT0FBTyxHQUFHLENBQUM7QUFDcEQsV0FBRyxjQUFjLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDNUMsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLG9CQUFvQixTQUFVLFVBQVU7QUFDdEMsVUFBSSxDQUFDLFVBQVU7QUFDYixhQUFLLGVBQWUsT0FBTyxLQUFLO0FBQUEsTUFDbEMsT0FBTztBQUNMLGFBQUssZUFBZSxPQUFPO0FBQUEsTUFDN0I7QUFBQSxJQUNGO0FBQUEsSUFDQSxnQkFBZ0IsU0FBVSxhQUFhO0FBQ3JDLFdBQUssYUFBYTtBQUFBLElBQ3BCO0FBQUEsSUFDQSxrQkFBa0IsV0FBWTtBQUM1QixXQUFLLFlBQVksZUFBZSxLQUFLLGVBQWUsSUFBSSxFQUFFO0FBQzFELFdBQUssVUFBVSxlQUFlLEtBQUssZUFBZSxJQUFJLEVBQUU7QUFBQSxJQUMxRDtBQUFBLElBQ0Esd0JBQXdCLFdBQVk7QUFDbEMsV0FBSyxjQUFjO0FBQ25CLFVBQUksS0FBSyxlQUFlLFNBQVMsWUFBWSxLQUFLLGVBQWUsVUFBVTtBQUN6RSxhQUFLLGdCQUFnQjtBQUNyQjtBQUFBLE1BQ0Y7QUFDQSxVQUFJLEtBQUssZUFBZSxTQUFTLFlBQVksS0FBSyxlQUFlLFVBQVU7QUFDekUsYUFBSyxnQkFBZ0I7QUFDckIsYUFBSyxnQkFBZ0I7QUFDckIsYUFBSyxlQUFlLFFBQVEsQ0FBQyxPQUFPO0FBQ2xDLGNBQUksR0FBRyxnQkFBZ0IsS0FBSyxZQUFZO0FBQ3RDLGVBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxVQUMzQjtBQUNBLGVBQUssc0JBQXNCLEVBQUU7QUFBQSxRQUMvQixDQUFDO0FBQ0Q7QUFBQSxNQUNGO0FBQ0EsV0FBSyxZQUNILEtBQUssZUFBZSxLQUFLLGtCQUFrQixFQUFFLFFBQVE7QUFDdkQsV0FBSyxVQUFVLEtBQUssZUFBZSxLQUFLLGtCQUFrQixFQUFFLFFBQVE7QUFBQSxJQUN0RTtBQUFBLElBQ0Esd0JBQXdCLFNBQVUsU0FBUztBQUN6QyxXQUFLLGNBQWM7QUFDbkIsV0FBSyxZQUFZO0FBQ2pCLFdBQUssWUFBWSxRQUFRLFFBQVE7QUFDakMsV0FBSyxVQUFVLFFBQVEsUUFBUTtBQUFBLElBQ2pDO0FBQUEsSUFDQSxtQkFBbUIsU0FBVSxVQUFVO0FBQ3JDLFVBQUksQ0FBQyxTQUFVLFlBQVcsS0FBSztBQUMvQixZQUFNQSxhQUFZLEtBQUssT0FBTyxhQUFhO0FBQzNDLFVBQUksQ0FBQ0EsY0FBYUEsV0FBVSxRQUFRLFVBQVUsRUFBRSxVQUFVLENBQUMsTUFBTTtBQUMvRDtBQUNGLFVBQUlBLFdBQVUsY0FBYyxVQUFVLFNBQVMsSUFBSSxHQUFHO0FBQ3BELFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUNqRDtBQUNBLFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUNqRDtBQUNBLFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLGNBQWM7QUFBQSxRQUNqRDtBQUFBLE1BQ0YsT0FBTztBQUNMLFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLFdBQVc7QUFBQSxRQUM5QztBQUNBLFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLFdBQVc7QUFBQSxRQUM5QztBQUNBLFlBQUksYUFBYSxVQUFVO0FBQ3pCLFVBQUFBLFdBQVUsYUFBYSxVQUFVLFdBQVc7QUFBQSxRQUM5QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSwwQkFBMEIsV0FBWTtBQUNwQyxZQUFNQSxhQUFZLEtBQUssT0FBTyxhQUFhO0FBQzNDLFlBQU0sZ0JBQWdCQSxXQUFVLFFBQVEsY0FBYztBQUN0RCxVQUFJQSxXQUFVLGNBQWMsVUFBVSxTQUFTLElBQUksR0FBRztBQUNwRCxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxjQUFjO0FBQUEsUUFDOUQ7QUFDQSxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxjQUFjO0FBQUEsUUFDOUQ7QUFDQSxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxjQUFjO0FBQUEsUUFDOUQ7QUFBQSxNQUNGLE9BQU87QUFDTCxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxXQUFXO0FBQUEsUUFDM0Q7QUFDQSxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxXQUFXO0FBQUEsUUFDM0Q7QUFDQSxZQUFJLEtBQUssZUFBZSxTQUFTLFVBQVU7QUFDekMsd0JBQWMsTUFBTSxrQkFBa0IsUUFBUSxXQUFXO0FBQUEsUUFDM0Q7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsNEJBQTRCLFdBQVk7QUFDdEMsV0FBSyxnQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDekMsV0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLE1BQzlCLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxvQkFBb0IsU0FBVSxvQkFBb0I7QUFFaEQsV0FBSyxPQUFPLHlCQUF5QjtBQUNyQyx5QkFBbUIsVUFBVSxJQUFJLFFBQVE7QUFDekMsV0FBSyxzQkFBc0I7QUFDM0IsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQzNDLFdBQUssWUFBWSxjQUFjLG1CQUFtQjtBQUNsRCxXQUFLLG9CQUFvQixLQUFLLGdCQUFnQixLQUFLLGtCQUFrQjtBQUNyRSxXQUFLLHdCQUF3QjtBQUc3QixXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLE9BQ0YsaUJBQWlCLEVBQ2pCLGlCQUFpQixXQUFXLEVBQzVCLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQixDQUFDO0FBQ0gsV0FBSyxrQkFBa0I7QUFDdkIsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyxjQUFjLG1CQUFtQixXQUFXO0FBR2pELFdBQUssc0JBQXNCO0FBQzNCLFdBQUssWUFBWTtBQUFBLElBQ25CO0FBQUEsSUFDQSx1QkFBdUIsU0FBVSxnQkFBZ0I7QUFDL0MsV0FBSyxPQUFPLGFBQWE7QUFFekIsV0FBSyxrQkFBa0I7QUFDdkIsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyx5QkFBeUI7QUFDOUIsV0FBSyxlQUFlLEtBQUssT0FBTztBQUFBLFFBQzlCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBR0EsV0FBSyxzQkFBc0IsY0FBYztBQUN6QyxXQUFLLFlBQVk7QUFBQSxJQUNuQjtBQUFBLElBQ0EsY0FBYyxXQUFZO0FBQ3hCLFdBQUssVUFBVSxVQUFVLE9BQU8sUUFBUTtBQUN4QyxXQUFLLHFCQUFxQixVQUFVLE9BQU8sUUFBUTtBQUNuRCxXQUFLLE9BQU8sYUFBYSxLQUFLLFNBQVM7QUFDdkMsV0FBSyxPQUFPLFdBQVcsS0FBSyxPQUFPO0FBQ25DLFdBQUssT0FBTyxVQUFVO0FBQUEsSUFDeEI7QUFBQSxJQUNBLFNBQVMsV0FBWTtBQUNuQixVQUFJLEtBQUssZUFBZSxDQUFDLEtBQUssZUFBZTtBQUMzQyxhQUFLLGlCQUFpQjtBQUN0QixhQUFLLHlCQUF5QjtBQUM5QixhQUFLLFVBQVUsVUFBVSxJQUFJLFFBQVE7QUFDckMsYUFBSyxPQUFPLHdCQUF3QjtBQUFBLE1BQ3RDLFdBQVcsS0FBSyxlQUFlO0FBQzdCLGFBQUssZ0JBQWdCO0FBQ3JCLGFBQUssa0JBQWtCLFFBQVE7QUFDL0IsYUFBSyx3QkFBd0I7QUFDN0IsYUFBSyxzQkFBc0I7QUFDM0IsYUFBSyxZQUFZO0FBQUEsTUFDbkIsT0FBTztBQUNMLGFBQUssT0FBTyxVQUFVLElBQUksUUFBUTtBQUNsQyxhQUFLLGtCQUNGLGNBQWMsY0FBYyxFQUM1QixVQUFVLElBQUksUUFBUTtBQUN6QixhQUFLLFNBQVMsS0FBSyxZQUFZO0FBQy9CLGFBQUssWUFBWTtBQUdqQixhQUFLLE9BQU8sYUFBYSxFQUFFLFFBQVEsY0FBYyxFQUFFLE1BQU0sa0JBQ3ZEO0FBQ0YsYUFBSyxPQUFPLGFBQWEsRUFBRSxRQUFRLGNBQWMsRUFBRSxNQUFNLGtCQUN2RDtBQUFBLE1BQ0o7QUFBQSxJQUNGO0FBQUEsSUFDQSxxQkFBcUIsV0FBWTtBQUMvQixXQUFLLE9BQU8sY0FBYztBQUUxQixXQUFLLGtCQUFrQixjQUFjLGNBQWMsRUFBRSxjQUFjO0FBQ25FLFdBQUssV0FBVztBQUNoQixXQUFLLGtCQUNGLGNBQWMsY0FBYyxFQUM1QixVQUFVLE9BQU8sUUFBUTtBQUM1QixXQUFLLFlBQVk7QUFDakIsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxPQUFPLFVBQVUsT0FBTyxRQUFRO0FBQ3JDLFdBQUssVUFBVSxVQUFVLElBQUksUUFBUTtBQUNyQyxXQUFLLFlBQVk7QUFDakIsV0FBSyxtQkFBbUI7QUFHeEIsV0FBSyx3QkFBd0I7QUFDN0IsV0FBSyxPQUFPLG1CQUFtQjtBQUFBLElBQ2pDO0FBQUEsSUFDQSwyQkFBMkIsV0FBWTtBQUNyQyxXQUFLLHFCQUFxQixVQUFVLE9BQU8sUUFBUTtBQUFBLElBQ3JEO0FBQUEsSUFDQSwyQkFBMkIsV0FBWTtBQUNyQyxXQUFLLHFCQUFxQixVQUFVLElBQUksUUFBUTtBQUFBLElBQ2xEO0FBQUEsSUFDQSxxQkFBcUIsV0FBWTtBQUMvQixXQUFLLHFCQUNGLGlCQUFpQixXQUFXLEVBQzVCLFFBQVEsU0FBVSxJQUFJO0FBQ3JCLFdBQUcsVUFBVSxJQUFJLFFBQVE7QUFBQSxNQUMzQixDQUFDO0FBQ0gsV0FBSyxxQkFBcUIsVUFBVSxJQUFJLFFBQVE7QUFBQSxJQUNsRDtBQUFBLElBQ0EsMEJBQTBCLFdBQVk7QUFDcEMsV0FBSyxPQUFPLDZCQUE2QjtBQUN6QyxXQUFLLHVCQUNILEtBQUssbUJBQW1CLEtBQUssa0JBQWtCO0FBQUEsSUFDbkQ7QUFBQSxJQUNBLCtCQUErQixXQUFZO0FBQ3pDLFdBQUssbUJBQW1CLFFBQVEsU0FBVSxJQUFJO0FBQzVDLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDQSxNQUFPLGVBQVE7OztBQ3RYZixNQUFNLFdBQU4sTUFBZTtBQUFBLElBQ2IsWUFBWSxrQkFBa0IsV0FBVztBQUN2QyxXQUFLLFNBQVM7QUFDZCxXQUFLLFlBQVk7QUFHakIsV0FBSyxlQUFlO0FBQUEsUUFDbEIsR0FBRyxLQUFLLFVBQVUsaUJBQWlCLGtCQUFrQjtBQUFBLE1BQ3ZEO0FBQ0EsV0FBSyxvQkFBb0I7QUFBQSxRQUN2QixHQUFHLEtBQUssVUFBVSxpQkFBaUIsaUJBQWlCO0FBQUEsTUFDdEQ7QUFDQSxXQUFLLGVBQWUsS0FBSyxVQUFVLGNBQWMsZ0JBQWdCO0FBQ2pFLFdBQUssaUJBQWlCLEtBQUssVUFBVSxpQkFBaUIsY0FBYztBQUNwRSxXQUFLLGdCQUFnQjtBQUNyQixXQUFLLHlCQUF5QjtBQUM5QixXQUFLLGdCQUFnQjtBQUNyQixXQUFLLFdBQVcsb0JBQUksSUFBSTtBQUFBLFFBQ3RCLENBQUMsaUJBQWlCLEtBQUssWUFBWSxLQUFLLElBQUksQ0FBQztBQUFBLFFBQzdDLENBQUMsdUJBQXVCLEtBQUsscUJBQXFCLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDNUQsQ0FBQyxpQkFBaUIsS0FBSyxlQUFlLEtBQUssSUFBSSxDQUFDO0FBQUEsUUFDaEQsQ0FBQyxrQkFBa0IsS0FBSyxhQUFhLEtBQUssSUFBSSxDQUFDO0FBQUEsTUFDakQsQ0FBQztBQUFBLElBQ0g7QUFBQTtBQUFBO0FBQUEsSUFHQSxjQUFjLFNBQVUsU0FBUyxPQUFPO0FBQ3RDLFdBQUssZ0JBQWdCLFNBQVM7QUFDOUIsV0FBSyxPQUFPLGNBQWM7QUFDMUIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQzNDLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssaUJBQWlCO0FBQ3RCLFdBQUssc0JBQXNCO0FBQzNCLFdBQUssYUFBYSxLQUFLLGFBQWEsRUFBRSxVQUFVLElBQUksUUFBUTtBQUM1RCxXQUFLLHlCQUF5QixLQUFLLGFBQWE7QUFDaEQsV0FBSyxPQUFPO0FBQUEsUUFDVixRQUFRLFFBQVEscUJBQXFCLEVBQUUsY0FBYyxnQkFBZ0I7QUFBQSxNQUN2RTtBQUFBLElBQ0Y7QUFBQSxJQUNBLHVCQUF1QixTQUFVLFlBQVk7QUFDM0MsY0FBUSxJQUFJLFVBQVU7QUFBQSxJQUN4QjtBQUFBLElBQ0EsY0FBYyxDQUFDLGFBQWEsZUFBZTtBQUN6QyxZQUFNLFNBQVMsS0FBSyxTQUFTLElBQUksV0FBVztBQUM1QyxVQUFJLFFBQVE7QUFDVixlQUFPLFVBQVU7QUFBQSxNQUNuQixPQUFPO0FBQ0wsZ0JBQVEsS0FBSyx3QkFBd0IsV0FBVyxFQUFFO0FBQUEsTUFDcEQ7QUFBQSxJQUNGO0FBQUEsSUFDQSxtQkFBbUIsU0FBVSxPQUFPO0FBQ2xDLFVBQUksQ0FBQyxNQUFPLE1BQUssZ0JBQWdCO0FBQ2pDLFdBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFBQSxJQUNBLG1CQUFtQixXQUFZO0FBQzdCLFdBQUssYUFBYSxRQUFRLENBQUMsT0FBTztBQUNoQyxXQUFHLFVBQVUsT0FBTyxRQUFRO0FBQUEsTUFDOUIsQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLHdCQUF3QixXQUFZO0FBQ2xDLFdBQUssa0JBQWtCLFFBQVEsQ0FBQyxPQUFPO0FBQ3JDLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsMkJBQTJCLFdBQVk7QUFDckMsV0FBSyxlQUFlLFFBQVEsU0FBVSxJQUFJO0FBQ3hDLFdBQUcsVUFBVSxPQUFPLFFBQVE7QUFBQSxNQUM5QixDQUFDO0FBQ0QsV0FBSyxlQUFlLEtBQUssYUFBYSxFQUFFLFVBQVUsSUFBSSxRQUFRO0FBQUEsSUFDaEU7QUFBQSxJQUNBLGlCQUFpQixTQUFVLGdCQUFnQjtBQUN6QyxXQUFLLG9CQUFvQjtBQUN6QixXQUFLLE9BQU8sYUFBYTtBQUN6QixXQUFLLE9BQU8sWUFBWTtBQUN4QixXQUFLLGFBQWEsVUFBVSxPQUFPLFFBQVE7QUFDM0MsV0FBSyxhQUFhLEtBQUssYUFBYSxFQUFFLFVBQVUsT0FBTyxRQUFRO0FBQy9ELFdBQUssa0JBQWtCLEtBQUssYUFBYSxFQUFFLFVBQVUsSUFBSSxRQUFRO0FBQ2pFLFdBQUsseUJBQXlCO0FBQzlCLFdBQUssT0FBTyxhQUFhO0FBQ3pCLFdBQUssT0FBTyxhQUFhLGVBQWUsUUFBUSxTQUFTO0FBQ3pELFdBQUssT0FBTyxXQUFXLGVBQWUsUUFBUSxPQUFPO0FBQ3JELFdBQUssT0FBTyxtQkFBbUIsY0FBYztBQUM3QyxXQUFLLE9BQU8sU0FBUyxVQUFVLE9BQU8sS0FBSztBQUMzQyxXQUFLLE9BQU8sVUFBVTtBQUFBLElBQ3hCO0FBQUEsSUFDQSxlQUFlLFdBQVk7QUFDekIsV0FBSyxPQUFPLFlBQVk7QUFDeEIsV0FBSyxhQUFhLFVBQVUsT0FBTyxRQUFRO0FBQUEsSUFDN0M7QUFBQSxJQUNBLFNBQVMsV0FBWTtBQUNuQixVQUFJLEtBQUssMkJBQTJCLE9BQU87QUFDekMsYUFBSyxPQUFPLGFBQWEsS0FBSyxZQUFZO0FBQUEsTUFDNUM7QUFBQSxJQUNGO0FBQUEsSUFDQSxzQkFBc0IsV0FBWTtBQUNoQyxXQUFLLHlCQUF5QjtBQUM5QixtQkFBYSxLQUFLLGFBQWE7QUFDL0IsV0FBSyxnQkFBZ0I7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFDQSxNQUFPLG1CQUFROzs7QUNwR2YsVUFBUSxJQUFJLHNCQUFzQjtBQVdsQyxXQUFTLGlCQUFpQixvQkFBb0IsTUFBTTtBQUNsRCxTQUFLO0FBQUEsRUFDUCxDQUFDO0FBR0QsTUFBTSxvQkFBb0IsU0FBUyxjQUFjLG1CQUFtQjtBQUNwRSxNQUFNLGdCQUFnQixTQUFTLGNBQWMsZUFBZTtBQUM1RCxNQUFNLG9CQUFvQixTQUFTLGNBQWMsbUJBQW1CO0FBRXBFLE1BQU0sV0FBVyxJQUFJLGlCQUFjLGdCQUFRLGlCQUFpQjtBQUM1RCxNQUFNLE9BQU8sSUFBSSxhQUFVLGdCQUFRLGFBQWE7QUFDaEQsTUFBTSxXQUFXLElBQUksaUJBQWMsZ0JBQVEsaUJBQWlCO0FBQzVELE1BQU0sV0FBVztBQUFBLElBQ2Y7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFLQSxpQkFBTyxhQUFhLGlCQUFpQixTQUFTLFNBQVUsR0FBRztBQUN6RCxVQUFNLFVBQVUsRUFBRSxPQUFPLFFBQVEscUJBQXFCO0FBQ3RELFFBQUksQ0FBQyxRQUFTO0FBQ2QsVUFBTUMsaUJBQWdCLFFBQVEsUUFBUTtBQUN0QyxVQUFNLGVBQWUsU0FBU0EsY0FBYTtBQUMzQyxVQUFNLFNBQVMsUUFBUSxRQUFRO0FBQy9CLFFBQUlBLG1CQUF5QixxQkFBcUIsRUFBRztBQUVyRCxtQkFBZTtBQUNmLElBQU8sU0FBUyxVQUFVLE9BQU8sS0FBSztBQUV0QyxJQUFPLGlCQUFpQkEsY0FBYTtBQUVyQyxZQUFRLElBQUksTUFBTTtBQUNsQixpQkFBYSxZQUFZLFFBQVEsT0FBTztBQUFBLEVBQzFDLENBQUM7QUErRUQsRUFBTyxZQUFZLGlCQUFpQixTQUFTLFNBQVUsR0FBRztBQUN4RCxVQUFNLFVBQVUsRUFBRSxPQUFPLFFBQVEscUJBQXFCO0FBQ3RELFFBQUksQ0FBQyxRQUFTO0FBQ2QsVUFBTUEsaUJBQWdCLFFBQVEsUUFBUSxVQUFVLEVBQUUsUUFBUTtBQUMxRCxVQUFNLGVBQWUsU0FBU0EsY0FBYTtBQUMzQyxVQUFNLFNBQVMsUUFBUSxRQUFRO0FBQy9CLGlCQUFhLFlBQVksUUFBUSxPQUFPO0FBQUEsRUFDMUMsQ0FBQztBQUNELEVBQU8sWUFBWSxpQkFBaUIsYUFBYSxTQUFVLEdBQUc7QUFDNUQsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHlCQUF5QjtBQUMxRCxRQUFJLENBQUMsUUFBUztBQUNkLFFBQUksS0FBSyxpQkFBaUIsUUFBUztBQUNuQyxTQUFLLGVBQWU7QUFFcEIsVUFBTUEsaUJBQWdCLFFBQVEsUUFBUSxVQUFVLEVBQUUsUUFBUTtBQUMxRCxVQUFNLGVBQWUsU0FBU0EsY0FBYTtBQUMzQyxVQUFNLFNBQVMsUUFBUSxRQUFRO0FBQy9CLGlCQUFhLFlBQVksUUFBUSxPQUFPO0FBQUEsRUFDMUMsQ0FBQztBQUNELEVBQU8sWUFBWSxpQkFBaUIsWUFBWSxTQUFVLEdBQUc7QUFDM0QsVUFBTSxVQUFVLEVBQUUsT0FBTyxRQUFRLHdCQUF3QjtBQUN6RCxRQUFJLENBQUMsUUFBUztBQUVkLFFBQUksUUFBUSxTQUFTLEVBQUUsYUFBYSxFQUFHO0FBQ3ZDLFNBQUssZUFBZTtBQUVwQixVQUFNQSxpQkFBZ0IsUUFBUSxRQUFRLFVBQVUsRUFBRSxRQUFRO0FBQzFELFVBQU0sZUFBZSxTQUFTQSxjQUFhO0FBQzNDLFVBQU0sU0FBUyxRQUFRLFFBQVE7QUFDL0IsaUJBQWEsWUFBWSxRQUFRLE9BQU87QUFBQSxFQUMxQyxDQUFDO0FBSUQsRUFBTyxRQUFRLFFBQVEsU0FBVSxJQUFJO0FBQ25DLE9BQUcsaUJBQWlCLFNBQVMsV0FBWTtBQUN2QyxZQUFNLFVBQWlCLFdBQVcsRUFBRTtBQUNwQyxjQUFRLFNBQVM7QUFBQSxRQUNmLEtBQUs7QUFDSCxtQkFBUyxPQUFPO0FBQ2hCO0FBQUEsUUFDRixLQUFLO0FBQ0gsZUFBSyxPQUFPLEdBQUcsUUFBUSxNQUFNLENBQUM7QUFDOUI7QUFBQSxRQUNGLEtBQUs7QUFDSCxtQkFBUyxPQUFPO0FBQ2hCO0FBQUEsTUFDSjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUlELE1BQU0sT0FBTyxXQUFZO0FBQ3ZCLHFCQUFpQjtBQUNqQixJQUFPLFNBQVMsVUFBVSxPQUFPLEtBQUs7QUFDdEMsbUJBQU8sYUFBYSxVQUFVLE9BQU8sUUFBUTtBQUM3QyxtQkFBTyxnQkFBZ0IsUUFBUSxTQUFVLElBQUk7QUFDM0MsU0FBRyxVQUFVLE9BQU8sUUFBUTtBQUFBLElBQzlCLENBQUM7QUFDRCxJQUFPLGlCQUFpQixVQUFVO0FBQ2xDLElBQU8sYUFBYTtBQUNwQixJQUFPLFNBQVMsVUFBVSxJQUFJLEtBQUs7QUFDbkMsYUFBUyxrQkFBa0I7QUFHM0IsZUFBVyxNQUFNO0FBQ2YscUJBQU8sYUFBYSxVQUFVLElBQUksUUFBUTtBQUMxQyxlQUFTLFlBQVksTUFBTSxNQUFNLElBQUk7QUFBQSxJQUN2QyxHQUFHLGVBQWU7QUFBQSxFQUdwQjtBQUNBLE1BQU0sbUJBQW1CLFdBQVk7QUFDbkMsVUFBTSxjQUFjLFNBQVMsaUJBQWlCLE1BQU07QUFDcEQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixNQUFNO0FBQUEsTUFDTixZQUFZO0FBQUEsTUFDWixXQUFXO0FBQUEsSUFDYjtBQUNBLFVBQU0sZ0JBQWdCLElBQUkscUJBQXFCLENBQUMsWUFBWTtBQUMxRCxjQUFRLFFBQVEsQ0FBQyxVQUFVO0FBQ3pCLGNBQU0sUUFBUSxNQUFNO0FBQ3BCLGNBQU0sVUFBVSxNQUFNLGlCQUFpQixRQUFRO0FBQy9DLFlBQUksTUFBTSxnQkFBZ0I7QUFFeEIsa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sVUFBVSxPQUFPLGFBQWEsVUFBVSxLQUFLLE9BQU87QUFDMUQsZ0JBQUksU0FBUztBQUNYLHFCQUFPLE1BQU07QUFFYixxQkFBTyxhQUFhLFlBQVksT0FBTztBQUFBLFlBQ3pDO0FBQUEsVUFDRixDQUFDO0FBQ0QsZ0JBQU0sS0FBSztBQUFBLFFBQ2IsT0FBTztBQUdMLHNCQUFZLGNBQWM7QUFDMUIsc0JBQVkscUJBQXFCO0FBQ2pDLHNCQUFZLFdBQVc7QUFDdkIsdUJBQWEsTUFBTSxRQUFRLFVBQVUsQ0FBQztBQUN0QyxnQkFBTSxNQUFNO0FBQ1osa0JBQVEsUUFBUSxDQUFDLFdBQVc7QUFFMUIsa0JBQU0sYUFBYSxPQUFPO0FBQzFCLGdCQUFJLFlBQVk7QUFDZCxxQkFBTyxhQUFhLFlBQVksVUFBVTtBQUMxQyxxQkFBTyxNQUFNO0FBQ2IscUJBQU8sZ0JBQWdCLEtBQUs7QUFBQSxZQUM5QjtBQUFBLFVBQ0YsQ0FBQztBQUVELGdCQUFNLEtBQUs7QUFBQSxRQUNiO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxHQUFHLGVBQWU7QUFDbEIsZ0JBQVksUUFBUSxDQUFDLFFBQVEsY0FBYyxRQUFRLEdBQUcsQ0FBQztBQUd2RCxVQUFNLGVBQWUsU0FBVSxTQUFTO0FBQ3RDLFVBQUksQ0FBQyxRQUFTO0FBQ2QsY0FBUSxpQkFBaUIsTUFBTSxFQUFFLFFBQVEsU0FBVSxJQUFJO0FBQ3JELFdBQUcsY0FBYztBQUNqQixXQUFHLE1BQU07QUFBQSxNQUNYLENBQUM7QUFDRCxNQUFPLHNCQUFzQixPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBRUEsTUFBTSxpQkFBaUIsV0FBWTtBQUNqQyxhQUFTLG9CQUFvQjtBQUM3QixhQUFTLG9CQUFvQjtBQUFBLEVBQy9COyIsCiAgIm5hbWVzIjogWyJhY3RpdmVWaWQiLCAiYWN0aXZlU2VjdGlvbiJdCn0K
