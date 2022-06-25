import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";

import { Cafeteria } from "../entities/cafeteria.entity";
import { Place } from "../entities/place.entity";

export default class CreateCafeterias implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    let place = await connection.getRepository(Place).save({
      name: "양성재",
      address: "충북 청주시 서원구 성봉로242번길 31-25",
      latitude: 36.627377,
      longtitude: 127.452546,
      contact: "0432613675",
    });
    await connection.getRepository(Cafeteria).save({
      place,
      breakfastTimeInfo: "평일: 07:20~09:00 주말: 08:00~09:00",
      lunchTimeInfo: "평일: 11:30~13:30 주말: 12:00~13:00",
      dinnerTimeInfo: "평일: 17:30~19:10 주말: 17:30~19:00",
    });
    place = await connection.getRepository(Place).save({
      name: "본관",
      address: "충북 청주시 서원구 충대로 1",
      latitude: 36.631298,
      longtitude: 127.457675,
      contact: "0432612926",
    });
    await connection.getRepository(Cafeteria).save({
      place,
      breakfastTimeInfo: "평일: 07:20~09:00 주말: 08:00~09:00",
      lunchTimeInfo: "평일: 11:30~13:30 주말: 12:00~13:00",
      dinnerTimeInfo: "평일: 17:30~19:10 주말: 17:30~19:00",
    });
    place = await connection.getRepository(Place).save({
      name: "양진재",
      address: "충북 청주시 서원구 충대로 1",
      latitude: 36.623996,
      longtitude: 127.459312,
      contact: "0432491870",
    });
    await connection.getRepository(Cafeteria).save({
      place,
      breakfastTimeInfo: "평일: 07:20~09:00 주말: 08:00~09:00",
      lunchTimeInfo: "평일: 11:30~13:30 주말: 12:00~13:00",
      dinnerTimeInfo: "평일: 17:30~19:10 주말: 17:30~19:00",
    });
  }
}
