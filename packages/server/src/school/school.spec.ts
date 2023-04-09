/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { Test } from "@nestjs/testing";
import { AppModule } from "src/app.module";
import { PlaceService } from "src/place/place.service";

import { CreateSchoolDto } from "./dto/create-school.dto";
import { SchoolArea } from "./school.constant";

jest.setTimeout(600000);

const SeedSchools: CreateSchoolDto[] = [
  {
    area: SchoolArea.N,
    buildingNumber: "N2",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63203698232533,
      longtitude: 127.45389303694006,
      name: "법학전문대학원",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N13",
    oldBuildingNumber: "059",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63009689726477,
      longtitude: 127.45694510319346,
      name: "경영대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "S21-4",
    oldBuildingNumber: "092",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63022056899437,
      longtitude: 127.45287614190742,
      name: "농업생명환경대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63074892571876,
      longtitude: 127.45728157402432,
      name: "융합학과군",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N14",
    oldBuildingNumber: "056",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63108931825701,
      longtitude: 127.45663790582189,
      name: "인문사회관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "N17-4",
    oldBuildingNumber: "068",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63119163542581,
      longtitude: 127.45815348218454,
      name: "개성재(정의관)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "N17-3",
    oldBuildingNumber: "067",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63107138236939,
      longtitude: 127.45778940106112,
      name: "개성재(진리관)",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N17-5",
    oldBuildingNumber: "069",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63151526078306,
      longtitude: 127.45835664980093,
      name: "개성재(개척관)",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N10",
    oldBuildingNumber: "001",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.630177796907375,
      longtitude: 127.45464240515251,
      name: "대학본부 & 국제교류원",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N7",
    oldBuildingNumber: "601",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.632871386493335,
      longtitude: 127.45602788340183,
      name: "형설관",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N17-6",
    oldBuildingNumber: "503",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63189297384289,
      longtitude: 127.4585545492522,
      name: "개성재(계영원)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "N15",
    oldBuildingNumber: "057",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.629408706066364,
      longtitude: 127.45781310774616,
      name: "사회과학대학",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N16-1",
    oldBuildingNumber: "058",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63014004690667,
      longtitude: 127.45861404130864,
      name: "인문대학",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N20-1",
    oldBuildingNumber: "062",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63041102212574,
      longtitude: 127.46078466326422,
      name: "생활과학대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E1-2",
    oldBuildingNumber: "081",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62880843038563,
      longtitude: 127.46041735401218,
      name: "사범대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E2",
    oldBuildingNumber: "501",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62880843038563,
      longtitude: 127.46041735401218,
      name: "개신문화관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E3",
    oldBuildingNumber: "038",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62761603551177,
      longtitude: 127.45883386821275,
      name: "제1학생회관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E3-1",
    oldBuildingNumber: "NH",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6272855366682,
      longtitude: 127.45924557077572,
      name: "NH관",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N12",
    oldBuildingNumber: "039",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6285807049257,
      longtitude: 127.45754267971103,
      name: "중앙도서관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6273117240228,
      longtitude: 127.46063205215994,
      name: "CBNU 스포츠센터",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E5",
    oldBuildingNumber: "085",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62708906158584,
      longtitude: 127.46170121362695,
      name: "123학군단",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6260117371404,
      longtitude: 127.46182335626408,
      name: "대운동장",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E7-1",
    oldBuildingNumber: "150",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62510494952482,
      longtitude: 127.46095710730602,
      name: "의과대학",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62416149366243,
      longtitude: 127.46141544258505,
      name: "충북대학교 병원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E8-6",
    oldBuildingNumber: "049",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62463648502445,
      longtitude: 127.45858981924123,
      name: "토목공학관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E8-11",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62420432208649,
      longtitude: 127.45966050075101,
      name: "양진재(인의관)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E8-11",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62397169301433,
      longtitude: 127.45922870617096,
      name: "양진재(예지관)",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E10",
    oldBuildingNumber: "193",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62514643436209,
      longtitude: 127.457206552859,
      name: "학연산공동교육관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62337145293821,
      longtitude: 127.45596632699183,
      name: "수의과대학 및 동물병원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62548175349237,
      longtitude: 127.45788491035178,
      name: "전자정보대학",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S1-2",
    oldBuildingNumber: "041",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.627779799019656,
      longtitude: 127.45666869128073,
      name: "자연과학대학",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S14",
    oldBuildingNumber: "003",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62804112813632,
      longtitude: 127.45431122019976,
      name: "제2학생회관",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S9",
    oldBuildingNumber: "033",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62765862856684,
      longtitude: 127.45536549470177,
      name: "박물관",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.6251919337884,
      longtitude: 127.4547360981376,
      name: "나이팅게일관",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S1-4",
    oldBuildingNumber: "043",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62558506864273,
      longtitude: 127.45443655291558,
      name: "전자정보대학3관(소프트웨어학과)",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S8",
    oldBuildingNumber: "505",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62690728404252,
      longtitude: 127.45389649562827,
      name: "야외공연장(탈마당)",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S17-1",
    oldBuildingNumber: "009",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.628127016203884,
      longtitude: 127.4524614063075,
      name: "양성재(지선관)",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S17-2",
    oldBuildingNumber: "009",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62734181819738,
      longtitude: 127.4527810381083,
      name: "양성재(명덕관)",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S17-3",
    oldBuildingNumber: "009",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.627244861404776,
      longtitude: 127.45221028880692,
      name: "양성재(신민관)",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S2",
    oldBuildingNumber: "032",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62640353307319,
      longtitude: 127.4554363706732,
      name: "전산정보원",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.631624304209076,
      longtitude: 127.45929088171958,
      name: "청주개신행복주택 아파트",
    },
  },
  {
    area: SchoolArea.S,
    buildingNumber: "S1-7",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62694713160939,
      longtitude: 127.45702712869057,
      name: "과학기술도서관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.63046776189108,
      longtitude: 127.45599135950263,
      name: "GS25(중문) & 씨비엔뉴스타",
    },
  },
  {
    area: SchoolArea.N,
    buildingNumber: "N11",
    oldBuildingNumber: "052",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.629337298967414,
      longtitude: 127.45528313285409,
      name: "공동실험실습관",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "",
    oldBuildingNumber: "",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.62890134497741,
      longtitude: 127.45617499088499,
      name: "솔못",
    },
  },
  {
    area: SchoolArea.E,
    buildingNumber: "E8-1",
    oldBuildingNumber: "044",
    place: {
      address: "충청북도 청주시 서원구 충대로 1",
      latitude: 36.626839650906255,
      longtitude: 127.45802989742658,
      name: "공과대학",
    },
  },
];

describe("SchoolModule", () => {
  let placeService: PlaceService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [ AppModule ],
    }).compile();

    placeService = module.get<PlaceService>(PlaceService);
  });

  test("create school seed", async () => {
    for (const school of SeedSchools) {
      await placeService.createSchool(placeService.toCreatePlaceDto(school));
    }
  });
});
