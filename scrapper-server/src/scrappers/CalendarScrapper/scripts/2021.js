const script = {
  url: "https://www.chungbuk.ac.kr/site/www/sub.do?key=1804",
  getSchedules: function () {
    const data = [];
    const year = document.querySelectorAll(
      `#contents > div.academic_calendar > ul > li`
    );
    for (let i = 0; i < year.length; i++) {
      const monthData = [];
      const month = year[i].querySelectorAll(
        "div:nth-child(2) > div:nth-child(1) > ul > li"
      );
      for (let j = 0; j < month.length; j++) {
        let date = month[j].querySelector("span").textContent;
        let content = month[j].textContent;
        content = content.slice(date.length, content.length);
        date = date.slice(1, date.length - 1);
        monthData.push([date, content]);
      }
      data.push(monthData);
    }
    return data.flat();
  },
};

module.exports = script;
