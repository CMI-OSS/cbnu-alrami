/* eslint-disable no-continue */
const script = {
  url: `https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=1`,
  site: "학생생활관",
  category: "식단",
  domitory: "본관",
  cafeteriaId: 1,
  timeIndex: {
    morning: "1",
    lunch: "2",
    evening: "3",
  },

  waitMainTableSelector: ".contTable_c.m_table_c.margin_t_30 > tbody",

  getFoodList() {
    const mainTableBody = document.querySelector(this.waitMainTableSelector);
    const weekTableRows = mainTableBody.querySelectorAll("tr");
    // 본관: [월 ~ 금]
    // 양진재, 양성재: [일 ~ 토]

    const restaurant_name = this.domitory;

    const result = [];

    for (const eachRow of weekTableRows) {
      const foodCells = eachRow.querySelectorAll("td");

      for (const eachCell of foodCells) {
        if (eachCell.className === "foodday") continue;

        const food = eachCell.innerText.replace(/\\n/g, "").trim();
        if (!food || food === "" || food === ".") continue;

        result.push({
          restaurant_name,
          menu: eachCell.innerText,
          date: eachRow.id,
          time: Number(this.timeIndex[eachCell.className]),
          cafeteriaId: this.cafeteriaId,
        });
      }
    }
    return result;
  },
};

export default script;
