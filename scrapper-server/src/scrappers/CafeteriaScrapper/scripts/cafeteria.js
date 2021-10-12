const script = {
  url: "https://www.cbnucoop.com/service/restaurant/?week=1",
  waitSelector: "#menu-table",

  getMenus: function () {
    const weekmenu = {
      startDay: null,
      endDay: null,
      cafeteriaMenu: [],
    };
    const range = document.querySelector("#menu-type-title").innerText;
    const dateStrings = range.match(/(\d{4}년 \d{1,2}월 \d{1,2}일)/gm);
    const dates = dateStrings.map((v) => {
      const nums = v.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
      console.log(nums);
      return new Date(nums[1], nums[2], nums[3]);
    });
    weekmenu.startDay = new Date(dates[0]);
    weekmenu.endDay = new Date(dates[1]);

    for (let cafeteria = 0; cafeteria < 3; cafeteria++) {
      const tbody = document.querySelector(
        `#tab${cafeteria + 1} > #menu-table > table > tbody`
      );
      const trNodes = tbody.querySelectorAll(`tr`);
      for (let kind = 0; kind < trNodes.length; kind++) {
        const $tr = trNodes[kind];
        const thNodes = $tr.querySelectorAll(`th`);
        const $dateMenu = {
          kind: kind == 1? trNodes[kind-1].querySelectorAll(`th`)[0].innerText : thNodes[0].innerText,
          time: kind == 1? thNodes[0].innerText : thNodes[1].innerText,
          menuOfToday: [],
        };
        const tdNodes = $tr.querySelectorAll(`td`);
        console.log(tdNodes);
        for (let day = 0; day < tdNodes.length; day++) {
          const $div = tdNodes[day].querySelector(`div > div`);
          if (!$div) continue;
          mainMenu = $div.querySelector(`h6`).innerText;
          menus = Array.from($div.querySelectorAll(`div > li`)).map((v) => v.innerText);
          price = Array.from($div
            .querySelectorAll(`div > span`))
            .map((v) => +v.innerText.replace(/,/, ""));
          const $menu = {
            date: new Date(weekmenu.startDay.getFullYear(), weekmenu.startDay.getMonth(), weekmenu.startDay.getDate()+day),
            mainMenu,
            menus,
            price,
          };
          $dateMenu.menuOfToday.push($menu);
        }
        if(!Array.isArray(weekmenu.cafeteriaMenu[cafeteria]))weekmenu.cafeteriaMenu[cafeteria] = [];
        weekmenu.cafeteriaMenu[cafeteria][kind] = $dateMenu;
      }
    }

    console.log(weekmenu);
    return weekmenu;
  },
};

module.exports = script;
