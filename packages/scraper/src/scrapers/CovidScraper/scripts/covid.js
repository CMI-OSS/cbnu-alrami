const script = {
  HOMEPAGE_URL: "https://corona.cheongju.go.kr/corona.html",
  DETAIL_PAGE_URL:
    "https://corona.cheongju.go.kr/common/jsp/covid-19/index.html#tab3",

  getCovidNumber() {
    const covidNumber = document.querySelector("#demo");
    return covidNumber.textContent;
  },

  getCovidDetailInfo() {
    const tableRows = document
      .querySelectorAll("table")[2]
      .querySelectorAll("tr");

    const tableIndexOfPlaces = {
      bar: 1,
      karaoke: 2,
      gym: 3,
      restaurantAndCafe: 5,
      PCRoom: 7,
    };

    const rawStringInfo = {};

    Object.entries(tableIndexOfPlaces).forEach(([ key, value ]) => {
      const rawString = tableRows[value]
        .querySelectorAll("td")[1]
        .querySelector("ul")
        .querySelector("li").textContent;

      rawStringInfo[key] = rawString;
    });

    return rawStringInfo;
  },
};

export default script;
