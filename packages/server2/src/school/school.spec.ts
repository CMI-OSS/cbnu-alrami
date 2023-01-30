/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { SchoolArea } from "./school.constant";
import { SchoolService } from "./school.service";

jest.setTimeout(600000);

const SeedSchools: CreateSchoolDto[] = [
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6322554908313,
      longtitude: 127.45389711366636,
      name: "법학전문대학원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63007026055564,
      longtitude: 127.45684152678552,
      name: "경영대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63016491880055,
      longtitude: 127.45269972397227,
      name: "농업생명환경대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63074892571876,
      longtitude: 127.45728157402432,
      name: "융합학과군",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63107814147212,
      longtitude: 127.45954479416883,
      name: "인문사회관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.631198307757984,
      longtitude: 127.45817588290468,
      name: "정의관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63105783350577,
      longtitude: 127.4577977063622,
      name: "진리관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6314791196232,
      longtitude: 127.45838159222204,
      name: "개척관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63163180508272,
      longtitude: 127.45321422977868,
      name: "대학본부 & 국제교류원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63282428151013,
      longtitude: 127.45597449680716,
      name: "형설관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63189280170685,
      longtitude: 127.4585992710759,
      name: "계영원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62940414681653,
      longtitude: 127.45782705621798,
      name: "사회과학대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63012405153623,
      longtitude: 127.45867264391896,
      name: "인문대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.630703326239455,
      longtitude: 127.46034756741228,
      name: "생활과학대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62855871805813,
      longtitude: 127.460326426782,
      name: "사범대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62819739325508,
      longtitude: 127.45938514308384,
      name: "개신문화관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62755736648905,
      longtitude: 127.45885867562656,
      name: "제1학생회관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62727860596648,
      longtitude: 127.4592902498318,
      name: "NH관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62849099101511,
      longtitude: 127.45743873235162,
      name: "중앙도서관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62730057900745,
      longtitude: 127.46060124070851,
      name: "CBNU 스포츠센터",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62703710697501,
      longtitude: 127.46173723875948,
      name: "123학군단",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62597345080492,
      longtitude: 127.46182033288258,
      name: "대운동장",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62507103895342,
      longtitude: 127.46098764962233,
      name: "의과대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62417241116533,
      longtitude: 127.46150494441254,
      name: "충북대학교 병원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62460293001945,
      longtitude: 127.45852813234396,
      name: "토목공학관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62417046575352,
      longtitude: 127.45967706911436,
      name: "양진재",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62492085518694,
      longtitude: 127.45787041295053,
      name: "학연산공동교육관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62333084946725,
      longtitude: 127.4559800621894,
      name: "수의과대학 및 동물병원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62680340234284,
      longtitude: 127.45808278782177,
      name: "전자정보대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62778215891903,
      longtitude: 127.45664075490888,
      name: "자연과학대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62799394772031,
      longtitude: 127.45427740282892,
      name: "제2학생회관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6276404888515,
      longtitude: 127.455396133256,
      name: "박물관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62522091052837,
      longtitude: 127.45481732153527,
      name: "나이팅게일관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62561653290185,
      longtitude: 127.45445630228824,
      name: "전자정보대학3관(소프트웨어학과)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.626871165080246,
      longtitude: 127.4539158488112,
      name: "야외공연장(탈마당)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62763378543488,
      longtitude: 127.45242498284068,
      name: "양성재",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62638309782567,
      longtitude: 127.45547817512654,
      name: "전산정보원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63156370559378,
      longtitude: 127.45923182361366,
      name: "청주개신행복주택 아파트",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62687268279613,
      longtitude: 127.45705463909016,
      name: "과학기술도서관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63036388819204,
      longtitude: 127.45605503533947,
      name: "GS25(중문) & 씨비엔뉴스타",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62926074732433,
      longtitude: 127.45527150222532,
      name: "공동실험실습관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62886547178629,
      longtitude: 127.45613005836071,
      name: "솔못",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "A-1",
    oldBuildingNumber: "A-2",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62548149569758,
      longtitude: 127.45795198753729,
      name: "공과대학",
    },
  },
];

describe.skip("SchoolModule", () => {
  let schoolService: SchoolService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    schoolService = module.get<SchoolService>(SchoolService);
  });

  test("create school seed", async () => {
    for (const school of SeedSchools) {
      await schoolService.create(school);
    }
  });
});
