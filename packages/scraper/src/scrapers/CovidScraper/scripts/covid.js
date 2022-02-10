const script = {
    HOMEPAGE_URL: "https://corona.cheongju.go.kr/corona.html",
    DETAIL_PAGE_URL: "https://corona.cheongju.go.kr/common/jsp/covid-19/index.html#tab3",

    getCovidNumber: function () {
        const covidNumber = document.querySelector("#demo");
        return covidNumber.textContent;
    },

    getCovidDetailInfo: function () {
        const allTables = document.querySelectorAll("table");
        const targetTable = allTables[2];
        const tableRows = targetTable.querySelectorAll("tr");

        const tableIndexOfPlaces = {
            bar: 1,
            karaoke: 2,
            gym: 3,
            restaurantAndCafe: 5,
            PCRoom: 7,
        }

        let covidDetailInfo = {};

        Object.entries(tableIndexOfPlaces).forEach(([key, value]) => {
            const availableTime = tableRows[value]
                .querySelectorAll("td")[1]
                .querySelector("ul")
                .querySelector("li")
                .textContent;
            covidDetailInfo[key] = availableTime;
        });

        return covidDetailInfo;
    }
}

module.exports = script;