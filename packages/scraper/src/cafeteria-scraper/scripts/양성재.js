import 본관 from "./본관";

const script = {
  url: `https://dorm.chungbuk.ac.kr/home/sub.php?menukey=20041&type=2`,
  domitory: "양성재",
  cafeteriaId: 3,
  typeQuery: "2",
};

export default { ...본관, ...script };
