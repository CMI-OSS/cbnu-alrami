// import { condition, datas, names } from "src/data";
// import { Connection } from "typeorm";
//
// import { Cafeteria } from "../entities/cafeteria.entity";
// import { Place } from "../entities/place.entity";
//
// export const initialize = async (connection: Connection) => {
//   const existPlaces = await connection.getRepository(Place).find({
//     where: condition,
//   });
//   const targets = names.filter(
//     (name) => !existPlaces.map((place) => place.name).includes(name),
//   );
//   const notCreatedPlaces = targets.map((target) => datas[target].place);
//   const res = await connection
//     .getRepository(Place)
//     .createQueryBuilder()
//     .insert()
//     .into(Place)
//     .values(notCreatedPlaces)
//     .orIgnore()
//     .execute();
//   const allCafeteriaPlace = [
//     ...existPlaces,
//     ...res.generatedMaps.map((data, i) => ({
//       ...notCreatedPlaces[i],
//       id: data.id,
//     })),
//   ];
//   const existCafeterias = await connection
//     .getRepository(Cafeteria)
//     .find({ where: allCafeteriaPlace.map((place) => ({ place: place.id })) });
//   const notCreatedCafeteriasPlace = allCafeteriaPlace.filter(
//     (place) =>
//       !existCafeterias.map((cafeteria) => cafeteria.place).includes(place.id),
//   );
//
//   const insertDatas = notCreatedCafeteriasPlace
//     .filter(
//       (place) =>
//         !existCafeterias
//           .map((cafeteria) => cafeteria.place.id)
//           .includes(place.id),
//     )
//     .map((place) => ({
//       ...datas[place.name].cafeteria,
//       place: place.id,
//     }));
//   connection
//     .getRepository(Cafeteria)
//     .createQueryBuilder()
//     .insert()
//     .into(Cafeteria)
//     .values(insertDatas)
//     .orIgnore()
//     .execute();
// };
