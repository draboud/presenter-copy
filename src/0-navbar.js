class Navbar {
  //.......................................................................
  //DEFINITIONS............................................................
  navComponent = document.querySelector(".nav_component");
  navMenu = document.querySelector(".nav_menu");
  navBtn = document.querySelector(".nav_button");
  allNavLinks = document.querySelectorAll(".nav_menu_link");
  allNavLinksWithDropdown = [
    ...document.querySelectorAll('[data-nav-section="sequence"]'),
  ];
  allNavDropdowns = [...document.querySelectorAll(".nav_menu_dropdown")];
  dropdownIndex;
  //.......................................................................
  //FUNCTIONS..............................................................
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
  toggleNav = function (clicked) {
    const dropdown = clicked
      ? clicked
          .closest(".nav_menu_link-wrap")
          .querySelector(".nav_menu_dropdown")
      : this.navMenu.querySelector(".nav_menu_dropdown");

    if (dropdown) dropdown.classList.toggle("active");
  };
}
export default new Navbar();
