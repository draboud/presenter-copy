class Navbar {
  //.......................................................................
  //DEFINITIONS............................................................
  navComponent = document.querySelector(".nav_component");
  navMenu = document.querySelector(".nav_menu");
  navBtn = document.querySelector(".nav_button");
  allNavLinks = document.querySelectorAll(".nav_menu_link");
  allNavLinksWithDropdown = [
    ...document.querySelectorAll(".nav_menu_link.sequence"),
  ];
  allNavDropdowns = [...document.querySelectorAll(".nav_menu_dropdown")];
  dropdownIndex;
  //.......................................................................
  //FUNCTIONS..............................................................
  getDropdownIndex = function (clicked) {
    clicked.classList.add("clicked");
    const dropdownMenu = clicked.closest(".nav_menu_dropdown");
    dropdownMenu
      .querySelectorAll(".nav_menu_link-dropdown")
      .forEach((el, index) => {
        if (el.classList.contains("clicked")) {
          this.dropdownIndex = index;
          el.classList.remove("clicked");
        }
      });
  };
  closeNavMenu = function () {
    this.allNavDropdowns.forEach(function (el) {
      el.classList.remove("active");
    });
  };
  toggleNav = function (clicked) {
    if (clicked) {
      clicked
        .closest(".nav_menu_link-wrap")
        .querySelector(".nav_menu_dropdown")
        .classList.toggle("active");
    } else {
      this.navMenu
        .querySelector(".nav_menu_dropdown")
        .classList.toggle("active");
    }
  };
}
export default new Navbar();
