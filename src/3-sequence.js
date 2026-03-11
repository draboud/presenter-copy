import * as global from "./0-global";

class Sequence {
  //.......................................................................
  //DEFINITIONS............................................................
  allSequenceSections = [...document.querySelectorAll(".section.sequence")];
  activeSequenceSection;
  pauseWrapper = document
    .querySelector(".section.sequence")
    .querySelector(".pause-wrapper");
  sequenceTimer;
  sequenceEndIsCanelled;
  //.......................................................................
  //FUNCTIONS..............................................................
  setActiveSequenceSection = function () {
    this.activeSequenceSection = this.allSequenceSections.find((el) =>
      el.classList.contains("active"),
    );
  };
  hideIntroText = function () {
    this.activeSequenceSection
      .querySelector(".intro-text-wrap")
      .classList.remove("active");
    this.activeSequenceSection
      .querySelector(".action-heading")
      .classList.add("active");
  };
  showIntroText = function () {
    this.hideIntroText();
    this.activeSequenceSection
      .querySelector(".intro-text-wrap")
      .classList.add("active");
    this.activeSequenceSection
      .querySelector(".action-heading")
      .classList.remove("active");
  };
  vidPlay = function (clicked) {
    this.sequenceEndIsCanelled = false;
    global.enablePause(this.pauseWrapper);
    global.setActiveVid();
    global.setStartTime(clicked.getAttribute("startTime"));
    global.setEndTime(clicked.getAttribute("endTime"));
    global.activateCurrentBtn(clicked);
    global.blackout.classList.remove("off");
    global.playRange();
  };
  vidEnd = function () {
    if (this.sequenceEndIsCanelled === false) {
      global.disablePause(this.pauseWrapper);
    }
  };
  clearSequenceTimers = function () {
    Sequence.sequenceEndIsCanelled = true;
    clearTimeout(Sequence.sequenceTimer);
    Sequence.sequenceTimer = null;
  };
}
export default new Sequence();
