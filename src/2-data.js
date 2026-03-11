import * as global from "./0-global";
import {
  DATA_VIEW_1,
  DATA_VIEW_1_MP,
  DATA_VIEW_2,
  DATA_VIEW_2_MP,
  DATA_VIEW_3,
  DATA_VIEW_3_MP,
  VIEW_START_END,
} from "./0-config";

class Data {
  //.......................................................................
  //DEFINITIONS............................................................
  introText = document
    .querySelector(".section.data")
    .querySelector(".section-wrap-txt");

  viewVidDiv = document.querySelector(".vid-wrapper.view");
  allViewVidDivs = document
    .querySelector(".section.data")
    .querySelectorAll(".vid-code-view");
  compVidDiv = document.querySelector(".vid-wrapper.comp");
  allDataVidDivs = document
    .querySelector(".section.data")
    .querySelectorAll(".vid-code");
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
  activeDataWrapper = document
    .querySelector(".section.data")
    .querySelector(".section-wrap-comp-data");
  allDataWrappers = [...document.querySelectorAll(".section-wrap-comp-data")];
  allData = [...document.querySelectorAll(".comp-data-wrap")];
  activeDataSheet;

  ctrlBtnWrapper = document
    .querySelector(".section.data")
    .querySelector(".section-wrap-btns");
  allCtrlBtnWrappers = [
    ...document
      .querySelector(".section.data")
      .querySelectorAll(".section-wrap-btns"),
  ];
  activeCtrlBtnWrapper;
  ctrlBtnIndex;
  //.......................................................................
  //FUNCTIONS..............................................................
  showIntroText = function () {
    this.introText.classList.add("active");
  };
  hideIntroText = function () {
    this.introText.classList.remove("active");
  };
  showViewOpts = function () {
    this.viewOptsMenu.classList.add("active");
  };
  hideViewOpts = function () {
    this.viewOptsMenu.classList.remove("active");
  };
  setViewOptsBtnText = function (optText) {
    this.viewOptsBtn.textContent = optText;
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
    this.showActiveDataWrapper();
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
      this.allViewOptBtns[this.activeViewBtnIndex].getAttribute("startTime");
    this.endTime =
      this.allViewOptBtns[this.activeViewBtnIndex].getAttribute("endTime");
  };
  setDataVidStartAndEnd = function (clicked) {
    this.viewVidFlag = false;
    this.hideAllData();
    this.startTime = clicked.getAttribute("startTime");
    this.endTime = clicked.getAttribute("endTime");
  };
  setDataVidPoster = function (newValue) {
    if (!newValue) newValue = this.activeView;
    const activeVid = global.getActiveVid();
    if (!activeVid || activeVid.closest(".section").classList[1] !== "data")
      return;
    if (activeVid.parentElement.classList.contains("mp")) {
      if (newValue === "view-a") {
        activeVid.setAttribute("poster", DATA_VIEW_1_MP);
      }
      if (newValue === "view-b") {
        activeVid.setAttribute("poster", DATA_VIEW_2_MP);
      }
      if (newValue === "view-c") {
        activeVid.setAttribute("poster", DATA_VIEW_3_MP);
      }
    } else {
      if (newValue === "view-a") {
        activeVid.setAttribute("poster", DATA_VIEW_1);
      }
      if (newValue === "view-b") {
        activeVid.setAttribute("poster", DATA_VIEW_2);
      }
      if (newValue === "view-c") {
        activeVid.setAttribute("poster", DATA_VIEW_3);
      }
    }
  };
  setDataVidBackgroundImg = function () {
    const activeVid = global.getActiveVid();
    const activeVidWrap = activeVid.closest(".vid-wrapper");
    if (activeVid.parentElement.classList.contains("mp")) {
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
  setActiveDataWrapper = function () {
    this.activeDataWrapper = this.allDataWrappers[this.activeViewBtnIndex];
  };
  showActiveDataWrapper = function () {
    this.activeDataWrapper.classList.add("active");
  };
  deactivateAllDataWrappers = function () {
    this.allDataWrappers.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  dataVidPlay = function () {
    this.hideIntroText();
    this.activeCtrlBtnWrapper.classList.remove("active");
    global.setStartTime(this.startTime);
    global.setEndTime(this.endTime);
    global.playRange();
  };
  vidEnd = function () {
    if (this.viewVidFlag && !this.viewChainFlag) {
      this.setLastActiveView(); //for the bckgrnd img
      this.setDataVidBackgroundImg();
      global.getActiveVid().parentElement.classList.remove("active");
      this.setDataVidPoster();
      this.showActiveCtrlBtnWrapper();
      this.showIntroText();
      global.enableNavLinksAndNavBtn();
    } else if (this.viewChainFlag) {
      this.viewChainFlag = false;
      this.setLastActiveView("view-a");
      this.setDataVidPoster(this.lastActiveView.view);
      this.setViewVidStartAndEnd();
      this.setDataVidBackgroundImg();
      this.dataVidPlay();
    } else {
      global.getActiveVid().closest(".vid-wrapper").style.backgroundImage =
        "none";
      global.getActiveVid().closest(".vid-wrapper").style.backgroundColor =
        "black";
      console.log(global.getActiveVid().closest(".vid-wrapper"));
      this.activeCtrlBtnWrapper.classList.remove("active");
      this.activeDataWrapper
        .querySelector(".txt-img-btn")
        .classList.add("active");
      this.dimmer.classList.add("active");
      this.showData(this.ctrlBtnIndex);
      this.showBackBtn();
    }
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
    global.deactivateAllCtrlBtnWrappers();
    this.activeCtrlBtnWrapper =
      this.allCtrlBtnWrappers[this.activeViewBtnIndex];
  };
  deactivateAllCtrlBtnWrappers = function () {
    this.allCtrlBtnWrappers.forEach(function (el) {
      el.classList.remove("active");
    });
  };
}
export default new Data();
