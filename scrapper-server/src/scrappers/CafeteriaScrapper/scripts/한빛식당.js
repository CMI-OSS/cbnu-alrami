const script = {
  url: "https://www.cbnucoop.com/service/restaurant/?week=1",
  cafeteria: 1,
  waitSelector: "#menu-table",
  selectCafetera: function () {
    const a = document.querySelector(
      `#restaurant-menu > div.navbar.navbar-bg.mb-3.nav.nav-pills > nav > a:nth-child(${this.cafeteria})`
    );
    a.click();
  },

  getMenus: function () {
    const menus = document.querySelector(
      "#menu-table > table > tbody > tr:nth-child(4)"
    ).innerText;

    return menus;
  },
};

module.exports = script;
