const script = {
  url: "https://www.chungbuk.ac.kr/site/www/sub.do?key=",
  scripts: [
    {
      year: 2020,
      key: "1728",
    },
    {
      year: 2021,
      key: "1804",
    },
  ],
  waitCalendarSelector:
    "#contents > div.academic_calendar > ul > li > div:nth-child(2) > div:nth-child(1) > ul > li",
  getSchedules: function () {
    const data = [];
    const content = document.querySelectorAll(
      `#contents > div.academic_calendar > ul > li > div:nth-child(2) > div:nth-child(1) > ul > li`
    );
    for (let i = 0; i < content.length; i++) {
      let date = content[i].querySelector("span").textContent;
      let text = content[i].textContent;
      text = text.slice(date.length, text.length);
      date = date.replace(/[^0-9]/g, ".").replace(/\.{2,}/g, ".");
      date = date.slice(1, date.length - 1).split(".");
      data.push([date, text]);
    }
    return data;
  },
};

module.exports = script;
