import { IMAGES, VIEW_START_END } from "./0-config";

class Data {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
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
      ...this.container.querySelectorAll(".opts-menu_link"),
    ];
    this.activeViewBtnIndex = null;
    this.activeView = "view-a";
    this.lastActiveView = { view: "view-a", startTime: 0, endTime: 0 };
    this.viewChainFlag = false;

    this.dimmer = this.container.querySelector(".dimmer");
    this.txtImgBtn = this.container.querySelector(".txt-img-btn");
    this.txtOrImg = "image";
    this.activeDataWrapper = this.container.querySelector(
      ".section-wrap-comp-data",
    );
    this.allDataWrappers = [
      ...this.container.querySelectorAll(".section-wrap-comp-data"),
    ];
    this.allData = [...this.container.querySelectorAll(".comp-data-wrap")];
    this.activeDataSheet = null;

    this.ctrlBtnWrapper = this.container.querySelector(".section-wrap-btns");
    this.allCtrlBtnWrappers = [
      ...this.container.querySelectorAll(".section-wrap-btns"),
    ];
    this.activeCtrlBtnWrapper = this.allCtrlBtnWrappers[0];
    this.ctrlBtnIndex = null;
    this.eventMap = new Map([
      ["open-data", this.initSection.bind(this)],
      ["play-ctrl-vid", this.setAndPlayCtrlBtnVid.bind(this)],
      ["play-view-vid", this.setAndPlayViewVid.bind(this)],
      ["back-to-view", this.backToViewFromComp.bind(this)],
      ["open-view-opts-menu", this.showViewOptsMenu.bind(this)],
      ["close-view-opts-menu", this.hideViewOptsMenu.bind(this)],
      ["toggle-img-txt", this.showCompImageOrText.bind(this)],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  initSection = function (clicked) {
    this.global.flashBlackout();
    //setting UI and logic...
    this.dimmer.classList.remove("active");
    this.txtOrImg = "image";
    this.txtImgBtn.textContent = "image";
    this.hideBackBtn();
    this.hideAllData();
    this.resetAllDataSheets();
    this.introText.classList.add("active");
    this.showCtrlBtnWrapper();
    this.global.activateCurrentNavLink(clicked);
    //setting vid element...
    this.global.clearSectionVidSrc(); //reveal poster
    this.setLastActiveView(); //for bckgrnd img
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
  showViewOptsMenu = function () {
    this.viewOptsMenu.classList.add("active");
  };
  hideViewOptsMenu = function () {
    this.viewOptsMenu.classList.remove("active");
  };
  showCompImageOrText = function () {
    if (this.txtOrImg === "image") {
      this.txtOrImg = "text";
      this.dimmer.classList.remove("active");
      this.activeDataSheet.classList.remove("active");
    } else {
      this.txtOrImg = "image";
      this.dimmer.classList.add("active");
      this.activeDataSheet.classList.add("active");
    }
    this.activeDataWrapper.querySelector(".txt-img-btn").textContent =
      this.txtOrImg;
  };
  setActiveViewBtnIndex = function () {
    this.allViewOptBtns.forEach((el, index) => {
      if (el.classList.contains("active")) {
        this.activeViewBtnIndex = index;
        el.classList.remove("active");
      }
    });
  };
  hideAllData = function () {
    this.deactivateAllDataWrappers();
    this.activeDataWrapper
      .querySelectorAll(".comp-data-wrap")
      .forEach(function (el) {
        el.classList.remove("active");
      });
  };
  showData = function () {
    this.activeDataWrapper.classList.add("active");
    this.activeDataSheet = Array.from(
      this.activeDataWrapper.querySelectorAll(".comp-data-wrap"),
    )[this.ctrlBtnIndex];
    this.activeDataSheet.classList.add("active");
  };
  hideBackBtn = function () {
    this.activeCtrlBtnWrapper
      .querySelector(".ctrl-btn-back")
      .classList.remove("active");
  };
  showBackBtn = function () {
    this.activeCtrlBtnWrapper
      .querySelectorAll(".ctrl-btn")
      .forEach(function (el) {
        el.classList.remove("active");
      });
    this.activeCtrlBtnWrapper.classList.add("active");
    this.activeCtrlBtnWrapper
      .querySelector(".ctrl-btn-back")
      .classList.add("active");
  };
  resetAllDataSheets = function () {
    this.allData.forEach(function (el) {
      el.parentElement.classList.add("active");
      el.querySelector(".comp-data-body-wrap").scroll(0, 0);
      el.parentElement.classList.remove("active");
    });
  };
  setLastActiveView = function (newValue) {
    if (!newValue) {
      this.lastActiveView.view = this.activeView;
    } else {
      this.lastActiveView.view = newValue;
    }
  };
  setActiveView = function (textContent) {
    this.activeView = textContent;
  };
  viewBackToStart = function () {
    this.startTime = VIEW_START_END[this.lastActiveView.view].startTime;
    this.endTime = VIEW_START_END[this.lastActiveView.view].endTime;
  };
  setViewVidStartAndEnd = function () {
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
    this.startTime =
      this.allViewOptBtns[this.activeViewBtnIndex].dataset.startTime;
    this.endTime = this.allViewOptBtns[this.activeViewBtnIndex].dataset.endTime;
  };
  setDataVidStartAndEnd = function (clicked) {
    this.viewVidFlag = false;
    this.hideAllData();
    this.startTime = clicked.dataset.startTime;
    this.endTime = clicked.dataset.endTime;
  };
  setDataVidPoster = function (newValue) {
    if (!newValue) newValue = this.activeView;
    const activeVid = this.global.getActiveVid();
    if (!activeVid || activeVid.closest(".section").classList[1] !== "data")
      return;
    if (activeVid.parentElement.classList.contains("mp")) {
      if (newValue === "view-a") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_1_MP);
      }
      if (newValue === "view-b") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_2_MP);
      }
      if (newValue === "view-c") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_3_MP);
      }
    } else {
      if (newValue === "view-a") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_1);
      }
      if (newValue === "view-b") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_2);
      }
      if (newValue === "view-c") {
        activeVid.setAttribute("poster", IMAGES.DATA_VIEW_3);
      }
    }
  };
  setDataVidBackgroundImg = function () {
    const activeVid = this.global.getActiveVid();
    const activeVidWrap = activeVid.closest(".vid-wrapper");
    if (activeVid.parentElement.classList.contains("mp")) {
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
  deactivateAllDataWrappers = function () {
    this.allDataWrappers.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  setAndPlayViewVid = function (clickedViewOptsBtn) {
    //setting UI and logic...
    clickedViewOptsBtn.classList.add("active"); //for Data.setActiveViewBtnIndex
    this.setActiveViewBtnIndex();
    this.viewOptsMenu.classList.remove("active");
    this.viewOptsBtn.textContent = clickedViewOptsBtn.textContent;
    this.activeDataWrapper = this.allDataWrappers[this.activeViewBtnIndex];
    this.setActiveCtrlBtnWrapper();

    //setting vid element...
    this.global.setActiveVid();
    this.setDataVidBackgroundImg();
    this.setActiveView(clickedViewOptsBtn.textContent); //for the poster

    //play vid
    this.setViewVidStartAndEnd();
    this.playDataVid();
  };
  setAndPlayCtrlBtnVid = function (clickedCtrlBtn) {
    this.global.setActiveVid();

    this.setLastActiveView(); //for the bckgrnd img to change to comp vid starts
    this.setDataVidBackgroundImg();
    this.hideActiveCtrlBtnWrapper();
    this.ctrlBtnIndex = this.global.getLocalIndex(
      clickedCtrlBtn,
      "ctrl-btn",
      "section-wrap-btns",
    );

    //play
    this.setDataVidStartAndEnd(clickedCtrlBtn);
    this.playDataVid(); //removes blackout in global.playRange
  };
  playDataVid = function () {
    this.introText.classList.remove("active");
    this.activeCtrlBtnWrapper.classList.remove("active");
    this.global.setStartTime(this.startTime);
    this.global.setEndTime(this.endTime);
    this.global.playRange();
  };
  vidEnd = function () {
    if (this.viewVidFlag && !this.viewChainFlag) {
      this.setLastActiveView();
      this.setDataVidBackgroundImg();
      this.setDataVidPoster(); //done here so poster doesn't appear earlier
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
      this.activeDataWrapper
        .querySelector(".txt-img-btn")
        .classList.add("active");
      this.showData(this.ctrlBtnIndex);
      this.showBackBtn();

      //set bckgrnd img to black to prevent flash of image when changing nav
      this.global.getActiveVid().closest(".vid-wrapper").style.backgroundImage =
        "none";
      this.global.getActiveVid().closest(".vid-wrapper").style.backgroundColor =
        "black";
    }
  };
  backToViewFromComp = function () {
    this.global.flashBlackout();
    //setting UI and logic...
    this.activeDataWrapper.querySelector(".txt-img-btn").textContent = "image";
    this.txtOrImg = "image";
    this.activeDataWrapper
      .querySelector(".txt-img-btn")
      .classList.remove("active");
    this.hideAllData();
    this.resetAllDataSheets();
    this.dimmer.classList.remove("active");
    this.introText.classList.add("active");
    this.hideBackBtn();
    this.showCtrlBtnWrapper();

    //setting vid element...
    this.setDataVidBackgroundImg();
    this.global.clearSectionVidSrc(); //reveal poster
  };
  hideActiveCtrlBtnWrapper = function () {
    this.activeCtrlBtnWrapper.classList.remove("active");
  };
  showActiveCtrlBtnWrapper = function () {
    this.activeCtrlBtnWrapper.classList.add("active");
  };
  showCtrlBtnWrapper = function () {
    this.activeCtrlBtnWrapper
      .querySelectorAll(".ctrl-btn")
      .forEach(function (el) {
        el.classList.add("active");
      });
    this.activeCtrlBtnWrapper.classList.add("active");
  };
  setActiveCtrlBtnWrapper = function () {
    this.global.deactivateAllCtrlBtnWrappers();
    this.activeCtrlBtnWrapper =
      this.allCtrlBtnWrappers[this.activeViewBtnIndex];
  };
  deactivateAllCtrlBtnWrappers = function () {
    this.allCtrlBtnWrappers.forEach(function (el) {
      el.classList.remove("active");
    });
  };
}
export default Data;
