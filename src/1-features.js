import * as global from "./0-global";
import {
  BLACKOUT_TIMER,
  BLACKOUT_WAIT_TO_REVEAL,
  VID_END_TIMER,
} from "./0-config";

class Features {
  //.......................................................................
  //DEFINITIONS............................................................
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
  initSection = function () {
    this.featuresBlackout.classList.add("off");
    this.hideAllText();
    this.showIntroText();
    this.playFeaturesIntro();
  };
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
    global.setStartTime(clicked.dataset.startTime);
    global.setEndTime(clicked.dataset.endTime);
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
    this.featuresEndisCancelled = true;
    clearTimeout(this.featuresTimer);
    this.featuresTimer = null;
  };
  playFeaturesIntro = function () {
    this.clearFeaturesTimers();
    this.showFeaturesIntroVidDiv();
    this.hideFeaturesVidDiv();

    setTimeout(() => {
      global.blackout.classList.add("off");
      this.featuresBlackout.classList.add("off");
    }, BLACKOUT_TIMER);

    // Logic: Find the one that isn't hidden (display: none)
    const allIntros =
      this.featuresIntroVidDiv.querySelectorAll(".vid-code-intro");

    allIntros.forEach((el) => {
      // offsetParent is null if the element is display: none
      if (el.offsetParent !== null) {
        const vid = el.querySelector(".vid-intro");
        if (vid) {
          vid.currentTime = 0;
          vid.play();
        }
      }
    });
  };
}
export default new Features();
