import { BLACKOUT_WAIT_TO_REVEAL, VID_END_TIMER } from "./0-config";

class Features {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
    this.featuresBlackout = this.container.querySelector(".blackout");
    this.featuresAllText = [
      ...this.container.querySelectorAll(".text-wrapper"),
    ];
    this.featuresIntroVidDiv =
      this.container.querySelector(".vid-wrapper.intro");
    this.featuresVidDiv = this.container.querySelector(".vid-wrapper.features");
    this.pauseWrapper = this.container.querySelector(".pause-wrapper");
    this.featuresCtrlBtns = this.container.querySelector(".section-wrap-btns");
    this.btnIndex = 0;
    this.featuresTimer = null;
    this.featuresEndisCancelled = false;
    this.eventMap = new Map([
      ["open-features", this.initSection.bind(this)],
      ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
      ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  initSection = function (clicked, index, introFlag) {
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
  hideAllText = function () {
    this.featuresAllText.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  showIntroText = function () {
    this.featuresAllText
      .find((el) => el.dataset.textContent === "intro")
      .classList.add("active");
  };
  showFeatureText = function () {
    this.featuresAllText[this.btnIndex + 1].classList.add("active");
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
  playFeaturesIntro = function () {
    this.featuresBlackout.classList.add("off");
    this.showFeaturesIntroVidDiv();
    this.hideFeaturesVidDiv();
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
  playCtrlBtnVid = function (clickedCtrlBtn) {
    this.clearFeaturesTimers();
    this.global.disablePause();
    this.global.enablePause();
    this.pauseWrapper.classList.remove("active");
    this.hideFeaturesIntroVidDiv();
    this.showFeaturesVidDiv();
    this.btnIndex = this.global.getLocalIndex(
      clickedCtrlBtn,
      "ctrl-btn",
      "section-wrap-btns",
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
  pauseCtrlVid = function () {
    this.global.togglePause();
    this.pauseWrapper.classList.toggle("active");
  };
  vidEnd = function () {
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
  deactivateCurrentBtns = function () {
    this.featuresCtrlBtns.forEach(function (el) {
      el.classList.remove("current");
    });
  };
  clearFeaturesTimers = function () {
    this.featuresEndisCancelled = true;
    clearTimeout(this.featuresTimer);
    this.featuresTimer = null;
  };
}
export default Features;
