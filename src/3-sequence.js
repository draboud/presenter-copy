class Sequence {
  constructor(globalController, container) {
    this.global = globalController;
    this.container = container;
    //.......................................................................
    //DEFINITIONS............................................................
    this.allIntroText = [
      ...this.container.querySelectorAll(".intro-text-wrap"),
    ];
    this.allActionHeadings = [
      ...this.container.querySelectorAll(".action-heading"),
    ];
    this.pauseWrapper = this.container.querySelector(".pause-wrapper");
    this.allVidWrappers = this.container.querySelectorAll(".vid-wrapper");
    this.sequenceTimer = null;
    this.sequenceEndIsCancelled = false;
    this.sequenceIndex = 0;
    this.eventMap = new Map([
      ["open-sequence", this.initSection.bind(this)],
      ["open-sequence-index", this.activateSectionIndex.bind(this)],
      ["play-ctrl-vid", this.playCtrlBtnVid.bind(this)],
      ["pause-ctrl-vid", this.pauseCtrlVid.bind(this)],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  initSection = function (clicked, index) {
    this.sequenceIndex = index ?? 0;
    this.global.flashBlackout();
    this.pauseWrapper.classList.remove("active");
    this.global.disablePause();
    this.hideAllIntroText();
    this.hideAllActionHeadings();
    this.allIntroText[this.sequenceIndex].classList.add("active");
    this.setActiveSequenceVidWrap(this.sequenceIndex);
    this.global.activateCurrentNavLink(
      clicked.closest(".nav_menu_link-wrap").querySelector(".nav_menu_link"),
    );
  };
  activateSectionIndex = function (clickedBtn) {
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
  setSequenceIndex = function (value) {
    if (!value) this.sequenceIndex = 0;
    this.sequenceIndex = value;
  };
  hideAllIntroText = function () {
    this.allIntroText.forEach((el) => {
      el.classList.remove("active");
    });
  };
  hideAllActionHeadings = function () {
    this.allActionHeadings.forEach((el) => {
      el.classList.remove("active");
    });
  };
  setActiveSequenceVidWrap = function () {
    this.allVidWrappers.forEach(function (el) {
      el.classList.remove("active");
    });
    this.allVidWrappers[this.sequenceIndex].classList.add("active");
  };
  playCtrlBtnVid = function (clickedCtrlBtn) {
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
  pauseCtrlVid = function () {
    this.global.togglePause();
    this.pauseWrapper.classList.toggle("active");
  };
  vidEnd = function () {
    if (this.sequenceEndIsCancelled === false) {
      this.global.disablePause(this.pauseWrapper);
    }
  };
  clearSequenceTimers = function () {
    this.sequenceEndIsCancelled = true;
    clearTimeout(this.sequenceTimer);
    this.sequenceTimer = null;
  };
}
export default Sequence;
