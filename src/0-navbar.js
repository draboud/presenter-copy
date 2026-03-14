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
    this.dropdownIndex = 0;
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
  getDropdownIndex = function (clicked) {
    const dropdownMenu = clicked.closest(".nav_menu_dropdown");
    const arrayOfDropdownOpts = [
      ...dropdownMenu.querySelectorAll(".nav_menu_link-dropdown"),
    ];
    this.dropdownIndex = arrayOfDropdownOpts.indexOf(clicked);
  };
  closeNavMenu = function () {
    this.allNavDropdowns.forEach(function (el) {
      el.classList.remove("active");
    });
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
