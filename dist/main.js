(() => {
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
  var mainWrapper = document.querySelector(".main-wrapper");
  var blackout = document.querySelector(".blackout");
  var allSections = [...document.querySelectorAll(".section")];
  var allVids = document.querySelectorAll(".vid");
  var activeSection;
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
  var setActiveSection = function(sectionName, index) {
    deactivateAllSections();
    if (!index) index = 0;
    const matches = allSections.filter(
      (el) => el.classList.contains(sectionName)
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
    return video.closest(".section").classList[1];
  };
  function getActiveVid() {
    return activeVid;
  }
  function setActiveVid(specificVid) {
    if (!specificVid) {
      activeSection.querySelectorAll(".vid-code").forEach(function(el) {
        if (window.getComputedStyle(el).opacity != 0) {
          activeVid = el.querySelector(".vid");
        }
      });
    } else {
      activeSection.querySelectorAll(`.${specificVid}`).forEach(function(el) {
        if (window.getComputedStyle(el).opacity != 0) {
          activeVid = el.querySelector(".vid");
        }
      });
    }
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
    const targetStart = videoCurrentTime || startTime;
    activeVid.parentElement.style.opacity = "0";
    const source = activeVid.querySelector("source");
    const dataSrc = source ? source.getAttribute("data-src") : null;
    if (dataSrc && activeVid.src !== dataSrc) {
      activeVid.pause();
      activeVid.src = dataSrc;
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
          { once: true }
        );
      } catch (e) {
        console.error("Playback sequence failed", e);
      }
    };
    if (activeVid.readyState >= 1) {
      startPlaybackSequence();
    } else {
      activeVid.addEventListener("loadedmetadata", startPlaybackSequence, {
        once: true
      });
      activeVid.addEventListener("loadeddata", startPlaybackSequence, {
        once: true
      });
    }
  };
  var disablePause = function() {
    pauseFlag = false;
    if (activeSection.classList.contains("data")) return;
    document.querySelectorAll(".pause-wrapper").forEach(function(el) {
      el.classList.remove("active");
    });
    document.querySelectorAll(".pause-wrapper").forEach(function(el) {
      el.style.pointerEvents = "none";
    });
  };
  var enablePause = function() {
    activeSection.querySelector(".pause-wrapper").style.pointerEvents = "auto";
  };
  var pauseVid = function() {
    activeSection.querySelector(".pause-wrapper").classList.add("active");
    activeVid.pause();
  };
  var unPauseVid = function() {
    activeSection.querySelector(".pause-wrapper").classList.remove("active");
    activeVid.play();
  };
  var TogglePause = function() {
    if (pauseFlag) {
      pauseFlag = false;
      unPauseVid();
    } else {
      pauseFlag = true;
      pauseVid();
    }
  };
  var enableSectionCtrlBtnEvents = function() {
    activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "auto";
  };
  var disableSectionCtrlBtnEvents = function() {
    activeSection.querySelector(".section-wrap-btns").style.pointerEvents = "none";
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
      ...document.querySelectorAll(".nav_menu_link.sequence")
    ];
    allNavDropdowns = [...document.querySelectorAll(".nav_menu_dropdown")];
    dropdownIndex;
    //.......................................................................
    //FUNCTIONS..............................................................
    getDropdownIndex = function(clicked) {
      clicked.classList.add("clicked");
      const dropdownMenu = clicked.closest(".nav_menu_dropdown");
      dropdownMenu.querySelectorAll(".nav_menu_link-dropdown").forEach((el, index) => {
        if (el.classList.contains("clicked")) {
          this.dropdownIndex = index;
          el.classList.remove("clicked");
        }
      });
    };
    closeNavMenu = function() {
      this.allNavDropdowns.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    toggleNav = function(clicked) {
      clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_dropdown").classList.toggle("active");
    };
  };
  var navbar_default = new Navbar();

  // src/1-features.js
  var Features = class _Features {
    //.......................................................................
    //DEFINITIONS............................................................
    featuresSection = document.querySelector(".section.features");
    featuresBlackout = document.querySelector(".section.features").querySelector(".blackout");
    featuresAllText = [
      ...document.querySelector(".section.features").querySelectorAll(".text-wrapper")
    ];
    featuresIntroVidDiv = document.querySelector(".section.features").querySelector(".vid-wrapper.intro");
    featuresVidDiv = document.querySelector(".section.features").querySelector(".vid-wrapper.features");
    pauseWrapper = document.querySelector(".section.features").querySelector(".pause-wrapper");
    featuresCtrlBtns = document.querySelector(".section.features").querySelector(".section-wrap-btns");
    btnIndex;
    featuresTimer;
    featuresEndisCancelled;
    //.......................................................................
    //FUNCTIONS..............................................................
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
    hideAllText = function() {
      this.featuresAllText.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    showText = function() {
      this.hideAllText();
      this.featuresAllText[this.btnIndex + 1].classList.add("active");
    };
    showIntroText = function() {
      this.featuresAllText[0].classList.add("active");
    };
    vidPlay = function(clicked) {
      this.featuresEndisCancelled = false;
      enablePause(this.pauseWrapper);
      this.showText(clicked);
      setActiveVid();
      setStartTime(clicked.getAttribute("startTime"));
      setEndTime(clicked.getAttribute("endTime"));
      activateCurrentBtn(clicked);
      blackout.classList.remove("off");
      playRange();
    };
    vidEnd = function() {
      if (this.featuresEndisCancelled === false) {
        disableNavLinksAndNavBtn();
        disableSectionCtrlBtnEvents();
        disablePause(this.pauseWrapper);
        this.featuresTimer = setTimeout(() => {
          this.featuresBlackout.classList.remove("off");
          setTimeout(() => {
            this.hideAllText();
            this.showIntroText();
            resetAllSectionVids();
            deactivateCurrentBtns();
            enableNavLinksAndNavBtn();
            enableSectionCtrlBtnEvents();
            this.playFeaturesIntro();
          }, BLACKOUT_WAIT_TO_REVEAL);
        }, VID_END_TIMER);
      }
    };
    clearFeaturesTimers = function() {
      _Features.featuresEndisCancelled = true;
      clearTimeout(_Features.featuresTimer);
      _Features.featuresTimer = null;
    };
    playFeaturesIntro = function() {
      this.clearFeaturesTimers();
      this.showFeaturesIntroVidDiv();
      this.hideFeaturesVidDiv();
      setTimeout(() => {
        if (!blackout.classList.contains("off")) {
          blackout.classList.add("off");
        }
        if (!this.featuresBlackout.classList.contains("off")) {
          this.featuresBlackout.classList.add("off");
        }
      }, BLACKOUT_TIMER);
      this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro").forEach(function(el) {
        if (window.getComputedStyle(el).opacity != 0) {
          el.querySelector(".vid-intro").currentTime = 0;
          el.querySelector(".vid-intro").play();
        }
      });
    };
  };
  var features_default = new Features();

  // src/2-data.js
  var Data = class {
    //.......................................................................
    //DEFINITIONS............................................................
    introText = document.querySelector(".section.data").querySelector(".section-wrap-txt");
    viewVidDiv = document.querySelector(".vid-wrapper.view");
    allViewVidDivs = document.querySelector(".section.data").querySelectorAll(".vid-code-view");
    compVidDiv = document.querySelector(".vid-wrapper.comp");
    allDataVidDivs = document.querySelector(".section.data").querySelectorAll(".vid-code");
    startTime;
    endTime;
    viewVidFlag;
    viewOptsBtn = document.querySelector(".opts-menu_btn");
    viewOptsMenu = document.querySelector(".opts-dropdown");
    allViewOptBtns = [...document.querySelectorAll(".opts-menu_link")];
    activeViewBtnIndex;
    activeView;
    lastActiveView = {};
    viewChainFlag;
    dimmer = document.querySelector(".dimmer");
    txtImgBtn = document.querySelector(".txt-img-btn");
    txtOrImg;
    activeDataWrapper = document.querySelector(".section.data").querySelector(".section-wrap-comp-data");
    allDataWrappers = [...document.querySelectorAll(".section-wrap-comp-data")];
    allData = [...document.querySelectorAll(".comp-data-wrap")];
    activeDataSheet;
    ctrlBtnWrapper = document.querySelector(".section.data").querySelector(".section-wrap-btns");
    allCtrlBtnWrappers = [
      ...document.querySelector(".section.data").querySelectorAll(".section-wrap-btns")
    ];
    activeCtrlBtnWrapper;
    ctrlBtnIndex;
    //.......................................................................
    //FUNCTIONS..............................................................
    showIntroText = function() {
      this.introText.classList.add("active");
    };
    hideIntroText = function() {
      this.introText.classList.remove("active");
    };
    showViewOpts = function() {
      this.viewOptsMenu.classList.add("active");
    };
    hideViewOpts = function() {
      this.viewOptsMenu.classList.remove("active");
    };
    setViewOptsBtnText = function(optText) {
      this.viewOptsBtn.textContent = optText;
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
      this.showActiveDataWrapper();
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
      this.startTime = this.allViewOptBtns[this.activeViewBtnIndex].getAttribute("startTime");
      this.endTime = this.allViewOptBtns[this.activeViewBtnIndex].getAttribute("endTime");
    };
    setDataVidStartAndEnd = function(clicked) {
      this.viewVidFlag = false;
      this.hideAllData();
      this.startTime = clicked.getAttribute("startTime");
      this.endTime = clicked.getAttribute("endTime");
    };
    setDataVidPoster = function(newValue) {
      if (!newValue) newValue = this.activeView;
      const activeVid2 = getActiveVid();
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
      const activeVid2 = getActiveVid();
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
    setActiveDataWrapper = function() {
      this.activeDataWrapper = this.allDataWrappers[this.activeViewBtnIndex];
    };
    showActiveDataWrapper = function() {
      this.activeDataWrapper.classList.add("active");
    };
    deactivateAllDataWrappers = function() {
      this.allDataWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
    };
    dataVidPlay = function() {
      this.hideIntroText();
      this.activeCtrlBtnWrapper.classList.remove("active");
      setStartTime(this.startTime);
      setEndTime(this.endTime);
      playRange();
    };
    vidEnd = function() {
      if (this.viewVidFlag && !this.viewChainFlag) {
        this.setLastActiveView();
        this.setDataVidBackgroundImg();
        getActiveVid().parentElement.classList.remove("active");
        this.setDataVidPoster();
        this.showActiveCtrlBtnWrapper();
        this.showIntroText();
        enableNavLinksAndNavBtn();
      } else if (this.viewChainFlag) {
        this.viewChainFlag = false;
        this.setLastActiveView("view-a");
        this.setDataVidPoster(this.lastActiveView.view);
        this.setViewVidStartAndEnd();
        this.setDataVidBackgroundImg();
        this.dataVidPlay();
      } else {
        getActiveVid().closest(".vid-wrapper").style.backgroundImage = "none";
        getActiveVid().closest(".vid-wrapper").style.backgroundColor = "black";
        this.activeCtrlBtnWrapper.classList.remove("active");
        this.activeDataWrapper.querySelector(".txt-img-btn").classList.add("active");
        this.dimmer.classList.add("active");
        this.showData(this.ctrlBtnIndex);
        this.showBackBtn();
      }
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
      deactivateAllCtrlBtnWrappers();
      this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[this.activeViewBtnIndex];
    };
    deactivateAllCtrlBtnWrappers = function() {
      this.allCtrlBtnWrappers.forEach(function(el) {
        el.classList.remove("active");
      });
    };
  };
  var data_default = new Data();

  // src/3-sequence.js
  var Sequence = class _Sequence {
    //.......................................................................
    //DEFINITIONS............................................................
    allSequenceSections = [...document.querySelectorAll(".section.sequence")];
    activeSequenceSection;
    pauseWrapper = document.querySelector(".section.sequence").querySelector(".pause-wrapper");
    sequenceTimer;
    sequenceEndIsCanelled;
    //.......................................................................
    //FUNCTIONS..............................................................
    setActiveSequenceSection = function() {
      this.activeSequenceSection = this.allSequenceSections.find(
        (el) => el.classList.contains("active")
      );
    };
    hideIntroText = function() {
      this.activeSequenceSection.querySelector(".intro-text-wrap").classList.remove("active");
      this.activeSequenceSection.querySelector(".action-heading").classList.add("active");
    };
    showIntroText = function() {
      this.hideIntroText();
      this.activeSequenceSection.querySelector(".intro-text-wrap").classList.add("active");
      this.activeSequenceSection.querySelector(".action-heading").classList.remove("active");
    };
    vidPlay = function(clicked) {
      this.sequenceEndIsCanelled = false;
      enablePause(this.pauseWrapper);
      setActiveVid();
      setStartTime(clicked.getAttribute("startTime"));
      setEndTime(clicked.getAttribute("endTime"));
      activateCurrentBtn(clicked);
      blackout.classList.remove("off");
      playRange();
    };
    vidEnd = function() {
      if (this.sequenceEndIsCanelled === false) {
        disablePause(this.pauseWrapper);
      }
    };
    clearSequenceTimers = function() {
      _Sequence.sequenceEndIsCanelled = true;
      clearTimeout(_Sequence.sequenceTimer);
      _Sequence.sequenceTimer = null;
    };
  };
  var sequence_default = new Sequence();

  // src/main.js
  console.log("test-1");
  startBtn = document.querySelector(".start-btn-wrapper");
  iosConfigWrap = document.querySelector(".ios-config-wrap");
  configBtnWrap = document.querySelector(".config-btn-wrap");
  stepsOKWrap = document.querySelector(".steps-ok-wrap");
  btnOK = document.querySelector(".btn-ok");
  document.addEventListener("DOMContentLoaded", () => {
    init();
  });
  document.addEventListener("DOMContentLoaded", () => {
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
  });
  var ResetSection = function(section) {
    section.querySelectorAll(".vid").forEach(function(el) {
      el.currentTime = 0;
      el.pause();
    });
    deactivateCurrentBtns(section);
  };
  navbar_default.navMenu.addEventListener("click", function(e) {
    const clicked = e.target.closest(".nav_menu_link");
    if (!clicked) return;
    const clickedSectionName = clicked.classList[1];
    lastActiveSectionName = allSections.find(
      (el) => el.classList.contains("active")
    ).classList[1];
    if (clickedSectionName !== lastActiveSectionName) {
      blackout.classList.remove("off");
      clearAllTimers();
      navbar_default.closeNavMenu();
      deactivateCurrentBtns();
      disablePause();
      setActiveSection(clickedSectionName);
      getActiveSection().querySelectorAll(".vid-code").forEach(function(el) {
        el.classList.add("active");
      });
      setActiveVid();
      activateCurrentNavLink(clicked);
      enableSectionCtrlBtnEvents();
    } else return;
    switch (clickedSectionName) {
      case "features":
        features_default.featuresBlackout.classList.add("off");
        features_default.hideAllText();
        features_default.showIntroText();
        features_default.playFeaturesIntro();
        break;
      case "data":
        flashBlackout();
        data_default.setLastActiveView();
        data_default.setDataVidBackgroundImg();
        data_default.showIntroText();
        data_default.hideBackBtn();
        data_default.showCtrlBtnWrapper();
        data_default.resetAllDataSheets();
        data_default.hideAllData();
        data_default.txtOrImg = "image";
        data_default.txtImgBtn.textContent = "image";
        data_default.dimmer.classList.remove("active");
        data_default.activeView = data_default.viewOptsBtn.textContent;
        clearSectionVidSrc();
        break;
      case "sequence":
        flashBlackout();
        sequence_default.setActiveSequenceSection();
        sequence_default.showIntroText();
        break;
    }
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
      el.parentElement.querySelector(".nav_menu_dropdown").classList.add("active");
    });
  });
  navbar_default.allNavDropdowns.forEach(function(el) {
    el.addEventListener("mouseleave", function() {
      el.parentElement.querySelector(".nav_menu_dropdown").classList.remove("active");
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
      setActiveSection("sequence", navbar_default.dropdownIndex);
      sequence_default.setActiveSequenceSection();
      flashBlackout();
      disablePause();
      clearSectionVidSrc();
      activateCurrentNavLink(
        clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link")
      );
      enableSectionCtrlBtnEvents();
      sequence_default.showIntroText();
    });
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest(".pause-wrapper");
    if (!clicked) return;
    TogglePause();
  });
  data_default.viewOptsBtn.addEventListener("mouseenter", function() {
    data_default.showViewOpts();
  });
  data_default.viewOptsBtn.addEventListener("mouseleave", function() {
    data_default.hideViewOpts();
  });
  data_default.viewOptsMenu.addEventListener("mouseenter", function() {
    data_default.showViewOpts();
  });
  data_default.viewOptsMenu.addEventListener("mouseleave", function() {
    data_default.hideViewOpts();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest(".txt-img-btn");
    if (!clicked) return;
    if (data_default.txtOrImg === "image") {
      data_default.txtOrImg = "text";
      data_default.dimmer.classList.remove("active");
      data_default.activeDataSheet.classList.remove("active");
    } else {
      data_default.txtOrImg = "image";
      data_default.dimmer.classList.add("active");
      data_default.activeDataSheet.classList.add("active");
    }
    data_default.activeDataWrapper.querySelector(".txt-img-btn").textContent = data_default.txtOrImg;
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest(".opts-menu_link");
    if (!clicked) return;
    if (clicked.textContent === data_default.activeView) return;
    getActiveSection().querySelectorAll(".vid-code").forEach(function(el) {
      el.classList.add("active");
    });
    clicked.classList.add("active");
    data_default.setViewOptsBtnText(clicked.textContent);
    data_default.setActiveViewBtnIndex();
    data_default.setActiveDataWrapper();
    data_default.setLastActiveView();
    data_default.setDataVidBackgroundImg();
    data_default.setActiveView(clicked.textContent);
    setActiveVid();
    data_default.setDataVidPoster();
    data_default.setActiveCtrlBtnWrapper();
    data_default.hideViewOpts();
    disableNavLinksAndNavBtn();
    data_default.setViewVidStartAndEnd();
    data_default.dataVidPlay();
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest(".ctrl-btn");
    if (!clicked) return;
    getActiveSection().querySelectorAll(".vid-code").forEach(function(el) {
      el.classList.add("active");
    });
    const vidType = getVidType(clicked);
    disablePause();
    switch (vidType) {
      case "features":
        clearAllTimers();
        features_default.hideFeaturesIntroVidDiv();
        features_default.showFeaturesVidDiv();
        features_default.btnIndex = getCtrlBtnIndex(clicked);
        features_default.vidPlay(clicked);
        break;
      case "data":
        blackout.classList.remove("off");
        data_default.hideActiveCtrlBtnWrapper();
        data_default.ctrlBtnIndex = getCtrlBtnIndex(clicked);
        data_default.setLastActiveView();
        setActiveVid();
        data_default.setDataVidStartAndEnd(clicked);
        data_default.setDataVidBackgroundImg();
        data_default.setDataVidPoster();
        getActiveVid().parentElement.style.opacity = 0;
        data_default.dataVidPlay();
        break;
      case "sequence":
        clearAllTimers();
        sequence_default.setActiveSequenceSection();
        sequence_default.hideIntroText();
        sequence_default.vidPlay(clicked);
        break;
    }
  });
  mainWrapper.addEventListener("click", function(e) {
    const clicked = e.target.closest(".ctrl-btn-back");
    if (!clicked) return;
    flashBlackout();
    resetAllSectionVids();
    data_default.setDataVidBackgroundImg();
    data_default.setDataVidPoster();
    data_default.activeDataWrapper.querySelector(".txt-img-btn").classList.remove("active");
    data_default.txtOrImg = "image";
    data_default.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
    data_default.dimmer.classList.remove("active");
    data_default.resetAllDataSheets();
    data_default.hideAllData();
    data_default.showIntroText();
    data_default.hideBackBtn();
    data_default.showCtrlBtnWrapper();
    clearSectionVidSrc();
  });
  allVids.forEach(function(el) {
    el.addEventListener("ended", function() {
      const vidType = getVidType(el);
      switch (vidType) {
        case "features":
          features_default.vidEnd();
          break;
        case "data":
          data_default.vidEnd(el.closest(".vid"));
          break;
        case "sequence":
          sequence_default.vidEnd();
          break;
      }
    });
  });
  var init = function() {
    blackout.classList.remove("off");
    navbar_default.navComponent.classList.remove("active");
    navbar_default.allNavDropdowns.forEach(function(el) {
      el.classList.remove("active");
    });
    setActiveSection("features");
    setActiveVid();
    features_default.featuresEndisCancelled = false;
    features_default.hideAllText();
    features_default.featuresCtrlBtns.classList.remove("active");
    data_default.activeView = "view-a";
    data_default.txtOrImg = "image";
    data_default.lastActiveView = {
      view: "view-a",
      startTime: 0,
      endTime: 0
    };
    data_default.viewChainFlag = false;
    data_default.activeCtrlBtnWrapper = data_default.allCtrlBtnWrappers[0];
    sequence_default.sequenceEndIsCanelled = false;
    setTimeout(() => {
      navbar_default.navComponent.classList.add("active");
      features_default.showIntroText();
      features_default.featuresCtrlBtns.classList.add("active");
    }, START_UI_REVEAL);
    features_default.playFeaturesIntro();
  };
  var clearAllTimers = function() {
    features_default.clearFeaturesTimers();
    sequence_default.clearSequenceTimers();
  };
})();
