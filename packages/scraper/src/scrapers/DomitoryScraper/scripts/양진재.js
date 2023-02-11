import 본관 from "./본관";

const script = {
  url: `https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=3`,
  domitory: "양진재",
  cafeteriaId: 2,
  typeQuery: "3",
};

export default { ...본관, ...script };
