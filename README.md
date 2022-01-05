<div align="center">
  <img width="600" alt="image" src="https://user-images.githubusercontent.com/38103082/100120789-b1b31e00-2ebb-11eb-93d7-6dc393d33949.png">
</div>
<p align="center">
<div align="center"><img src="https://img.shields.io/badge/license-MIT-brightgreen"/> <img src="https://img.shields.io/badge/version-2.0.0-brightgreen"/></div>
</p>

<p align="center" style="font-size:1.5rem"><strong>충</strong>북대학교 공지사항 알<strong>림이</strong></p>

<p align="center">
<a href="https://play.google.com/store/apps/details?id=com.jaryapp.cmi&hl=ko&gl=US">
<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=ko" width="150px">
</a>
<a href="https://apps.apple.com/kr/app/%EC%B6%A9%EB%A6%BC%EC%9D%B4/id1542030436">
<img src="https://user-images.githubusercontent.com/49256790/143902573-6da748ac-40fa-4613-89cd-b582e31686f3.png" width="150px">
</a>
</p>

# 프로젝트 소개

해당 프로젝트는 모노레포 형식으로 되어있습니다.

## 실행 방법
### 공통
```
yarn bootstrap # 모든 패키지의 의존성이 설치
```
### mobile

client에서 사용하는 script 명령들은 다음과 같습니다.
```
yarn dev:mobile # 개발 서버 실행
```
```
yarn build:mobile # 배포용 파일 빌드
```
### server

server에서 사용하는 script 명령들은 다음과 같습니다.
```
```


## 🗂 프로젝트 구조
프로젝트는 다음과 같이 구성되어 있습니다.
```
└── package   # 충림이에서 사용하는 프로젝트들
    └── admin (충림이 관리자페이지 client)
    └── mobile (모바일 충림이 client)
    └── scraper (공지사항 스크래핑)
    └── shared (프로젝트 공용으로 사용하는 코드)
```