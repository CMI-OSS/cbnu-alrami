const script = {
  url: "https://www.cbnucoop.com/service/restaurant/",
  waitSelector: "#menu-table",

  getMenus: function () {//주석처리 부분은 몽고DB용 구조
    // const weekmenu = {
    //   startDay: null,
    //   endDay: null,
    //   cafeteriaMenu: [],
    // };
    const range = document.querySelector("#menu-type-title").innerText;
    const dateStrings = range.match(/(\d{4}년 \d{1,2}월 \d{1,2}일)/gm);
    const dates = dateStrings.map((v) => {
      const nums = v.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
      return new Date(nums[1], nums[2], nums[3]);
    });
    // weekmenu.startDay = new Date(dates[0]);
    // weekmenu.endDay = new Date(dates[1]);
    const startDay = new Date(dates[0]);
    const res= [];
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
          // menuOfToday: [],
        };
        const tdNodes = $tr.querySelectorAll(`td`);
        for (let day = 0; day < tdNodes.length; day++) {
          const $div = tdNodes[day].querySelector(`div > div`);
          if (!$div) continue;
          const $menu = {
            //date: new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate()+day),
            mainMenu: $div.querySelector(`h6`).innerText,
            menus: Array.from($div.querySelectorAll(`div > li`)).map((v) => v.innerText),
            price: Array.from($div
              .querySelectorAll(`div > span`))
              .map((v) => +v.innerText.replace(/,/, "")),
          };
          //$dateMenu.menuOfToday.push($menu);
          console.log(new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate()+day))
          const row = {cafeteria: cafeteria,date: new Date(startDay.getFullYear(), startDay.getMonth(), startDay.getDate()+day), ...$dateMenu, ...$menu, }
          res.push(row)
        }
        // if(!Array.isArray(weekmenu.cafeteriaMenu[cafeteria]))weekmenu.cafeteriaMenu[cafeteria] = [];
        // weekmenu.cafeteriaMenu[cafeteria][kind] = $dateMenu;
      }
    }
    
    console.log(res);
    return res;
  },
};

module.exports = script;
