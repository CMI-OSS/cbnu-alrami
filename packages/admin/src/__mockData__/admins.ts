export enum Authorities {
  Super = 0,
  Council = 1,
}

const admins = [
  {
    id: 0,
    name: "수니",
    authority: Authorities.Super,
    createdDate: "2020-01-12",
    boards: [
      "심리학과 학생회 공지",
      "총학생회 공지",
      "소프트웨어학과 학생회 공지",
    ],
  },
  {
    id: 1,
    name: "브루니",
    authority: Authorities.Super,
    createdDate: "2020-04-12",
    boards: [ "소프트웨어학과 학생회 공지" ],
  },
  {
    id: 2,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
  {
    id: 3,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
  {
    id: 4,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
  {
    id: 5,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
  {
    id: 6,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
  {
    id: 7,
    name: "총학생회 멤버1",
    authority: Authorities.Council,
    createdDate: "2020-01-12",
    boards: [ "총학생회 공지" ],
  },
];

export default admins;
