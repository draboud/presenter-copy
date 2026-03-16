import { TIMING } from "./0-config";

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
    this.activeFeature = null;
    this.featuresTimer = null;
    this.featuresEndisCancelled = false;
    this.eventMap = new Map([
      ["btn-hovered", this.global.toggleBtnHoverClass.bind(this)],
      ["open-features", this.initSection],
      ["play-ctrl-vid", this.playCtrlBtnVid],
      ["pause-ctrl-vid", this.pauseCtrlVid],
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
    this.featuresAllText.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  showIntroText = () => {
    this.featuresAllText
      .find((el) => el.dataset.textContent === "intro")
      ?.classList.add("active");
  };
  showFeatureText = () => {
    this.featuresAllText
      .find((el) => el.dataset.textContent === this.activeFeature)
      ?.classList.add("active");
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
    // Logic: Find the one that isn't hidden (display: none)
    const allIntros =
      this.featuresIntroVidDiv?.querySelectorAll(".vid-code-intro");
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
}
export default Features;
