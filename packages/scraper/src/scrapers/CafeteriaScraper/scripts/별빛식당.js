const script = {
  url: "https://www.cbnucoop.com/service/restaurant/",
  waitSelector: "#menu-table",
  cafeteria: 1,
  restaurant_name: "별빛식당",
  getMenus: function () {
    const range = document.querySelector("#menu-type-title").innerText;
    const dateStrings = range.match(/(\d{4}년 \d{1,2}월 \d{1,2}일)/gm);
    const dates = dateStrings.map((v) => {
      const nums = v.match(/(\d{4})년 (\d{1,2})월 (\d{1,2})일/);
      return new Date(nums[1], nums[2] - 1, nums[3]);
    });

    const startDay = new Date(dates[0]);
    const res = [];
    const tbody = document.querySelector(
      `#tab${this.cafeteria + 1} > #menu-table > table > tbody`,
    );
    const trNodes = tbody.querySelectorAll(`tr`);
    for (let kind = 0; kind < trNodes.length; kind++) {
      const $tr = trNodes[kind];
      const thNodes = $tr.querySelectorAll(`th`);
      const $dateMenu = {
        kind:
          kind == 1
            ? trNodes[kind - 1].querySelectorAll(`th`)[0].innerText
            : thNodes[0].innerText,
        time: kind == 1 ? thNodes[0].innerText : thNodes[1].innerText,
      };
      const tdNodes = $tr.querySelectorAll(`td`);
      for (let day = 0; day < tdNodes.length; day++) {
        const $div = tdNodes[day].querySelector(`div > div`);
        if (!$div) continue;
        const $menu = {
          mainMenu: $div.querySelector(`h6`).innerText,
          menus: Array.from($div.querySelectorAll(`div > li`)).map(
            (v) => v.innerText,
          ),
          price: Array.from($div.querySelectorAll(`div > span`)).map(
            (v) => +v.innerText.replace(/,/, ""),
          ),
        };
        let time;
        switch ($dateMenu.time) {
          case "점심식사":
            time = 2;
            break;
          case "저녁식사":
            time = 3;
            break;
        }
        const row = {
          restaurant_name: this.restaurant_name,
          food_name: $menu.mainMenu + " " + $menu.menus.join(" "),
          date: `${startDay.getFullYear()}-${
            (startDay.getMonth() + 1).toString().length == 1
              ? "0" + (startDay.getMonth() + 1).toString()
              : (startDay.getMonth() + 1).toString()
          }-${
            (startDay.getDate() + day).toString().length == 1
              ? "0" + (startDay.getDate() + day).toString()
              : (startDay.getDate() + day).toString()
          }`,
          day: ["월", "화", "수", "목", "금"][day],
          time,
        };

        res.push(row);
      }
    }

    return res;
  },
};

module.exports = script;
