import * as global from "./0-global";
import {
  BLACKOUT_TIMER,
  BLACKOUT_WAIT_TO_REVEAL,
  VID_END_TIMER,
} from "./0-config";

class Features {
  //.......................................................................
  //DEFINITIONS............................................................
  featuresSection = document.querySelector(".section.features");
  featuresBlackout = document
    .querySelector(".section.features")
    .querySelector(".blackout");
  featuresAllText = [
    ...document
      .querySelector(".section.features")
      .querySelectorAll(".text-wrapper"),
  ];
  featuresIntroVidDiv = document
    .querySelector(".section.features")
    .querySelector(".vid-wrapper.intro");
  featuresVidDiv = document
    .querySelector(".section.features")
    .querySelector(".vid-wrapper.features");
  pauseWrapper = document
    .querySelector(".section.features")
    .querySelector(".pause-wrapper");
  featuresCtrlBtns = document
    .querySelector(".section.features")
    .querySelector(".section-wrap-btns");
  btnIndex;
  featuresTimer;
  featuresEndisCancelled;
  //.......................................................................
  //FUNCTIONS..............................................................
  showFeaturesIntroVidDiv = function () {
    this.featuresIntroVidDiv.classList.add("active");
  };
  hideFeaturesIntroVidDiv = function () {
    this.featuresIntroVidDiv.classList.remove("active");
  };
  showFeaturesVidDiv = function () {
    this.featuresVidDiv.classList.add("active");
  };
  hideFeaturesVidDiv = function () {
    this.featuresVidDiv.classList.remove("active");
  };
  hideAllText = function () {
    this.featuresAllText.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  showText = function () {
    this.hideAllText();
    this.featuresAllText[this.btnIndex + 1].classList.add("active");
  };
  showIntroText = function () {
    this.featuresAllText[0].classList.add("active");
  };
  vidPlay = function (clicked) {
    this.featuresEndisCancelled = false;
    global.enablePause(this.pauseWrapper);
    this.showText(clicked);
    global.setActiveVid();
    global.setStartTime(clicked.getAttribute("startTime"));
    global.setEndTime(clicked.getAttribute("endTime"));
    global.activateCurrentBtn(clicked);
    global.blackout.classList.remove("off");
    global.playRange();
  };
  vidEnd = function () {
    if (this.featuresEndisCancelled === false) {
      global.disableSectionCtrlBtnEvents();
      global.disablePause(this.pauseWrapper);
      this.featuresTimer = setTimeout(() => {
        this.featuresBlackout.classList.remove("off");
        setTimeout(() => {
          this.hideAllText();
          this.showIntroText();
          global.resetAllSectionVids();
          global.deactivateCurrentBtns();
          global.enableNavLinksAndNavBtn();
          global.enableSectionCtrlBtnEvents();
          this.playFeaturesIntro();
        }, BLACKOUT_WAIT_TO_REVEAL);
      }, VID_END_TIMER);
    }
  };
  clearFeaturesTimers = function () {
    Features.featuresEndisCancelled = true;
    clearTimeout(Features.featuresTimer);
    Features.featuresTimer = null;
  };
  playFeaturesIntro = function () {
    this.clearFeaturesTimers();
    this.showFeaturesIntroVidDiv();
    this.hideFeaturesVidDiv();
    setTimeout(() => {
      if (!global.blackout.classList.contains("off")) {
        global.blackout.classList.add("off");
      }
      if (!this.featuresBlackout.classList.contains("off")) {
        this.featuresBlackout.classList.add("off");
      }
    }, BLACKOUT_TIMER);
    this.featuresIntroVidDiv
      .querySelectorAll(".vid-code-intro")
      .forEach(function (el) {
        if (window.getComputedStyle(el).opacity != 0) {
          el.querySelector(".vid-intro").currentTime = 0;
          el.querySelector(".vid-intro").play();
        }
      });
  };
}
export default new Features();
