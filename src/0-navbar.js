class Navbar {
  constructor(container) {
    this.container = container; //The root for this module
    //.......................................................................
    //DEFINITIONS............................................................
    this.navMenu = this.container.querySelector(".nav_menu");
    this.navBtn = this.container.querySelector(".nav_button");
    this.allNavLinks = this.container.querySelectorAll(".nav_menu_link");
    this.allNavLinksWithDropdown = [
      ...this.container.querySelectorAll('[data-nav-section="sequence"]'),
    ];
    this.allNavDropdowns = [
      ...this.container.querySelectorAll(".nav_menu_dropdown"),
    ];
    this.eventMap = new Map([
      ["open-nav-dropdown", this.openNavDropdown.bind(this)],
      ["close-nav-dropdown", this.closeNavDropdown.bind(this)],
      ["toggle-nav-dropdown", this.toggleNavDropdown.bind(this)],
    ]);
  }
  //.......................................................................
  //FUNCTIONS..............................................................
  handleEvent = function (trigger, eventAction) {
    const action = this.eventMap.get(eventAction);
    if (action) {
      action(trigger);
    } else {
      console.warn(`No action found for: ${eventAction}`);
    }
  };
  closeNavMenu = function () {
    this.allNavDropdowns.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  closeMobileNavMenu = function () {
    if (window.getComputedStyle(this.navBtn).display !== "none")
      this.navBtn.click();
  };
  disableNavLinksAndNavBtn = function () {
    this.navMenu.style.pointerEvents = "none";
    if (window.getComputedStyle(this.navMenu).display !== "none") {
      this.closeMobileNavMenu();
    }
    this.navBtn.style.pointerEvents = "none";
  };
  openNavDropdown = function (trigger) {
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.add("active");
  };
  closeNavDropdown = function (trigger) {
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.remove("active");
  };
  toggleNavDropdown = function (trigger) {
    trigger
      .closest(".nav_menu_link-wrap")
      .querySelector(".nav_menu_dropdown")
      .classList.toggle("active");
  };
}
export default Navbar;
