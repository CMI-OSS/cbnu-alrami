import { CAFETERIA_LIST } from "src/consts";
import { Restaurant } from "src/type";

function getCafeteriaData(name: Restaurant) {
  const target = CAFETERIA_LIST.find((cafeteria) => {
    return cafeteria.name === name;
  });

  return target;
}

export default getCafeteriaData;