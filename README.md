<div align="center">
  <img width="700" alt="image" src="https://cbnu-cmi.s3.ap-northeast-2.amazonaws.com/images/1687694255419.png">
</div>
<p align="center">
<div align="center"><img src="https://img.shields.io/badge/license-MIT-brightgreen"/> <img src="https://img.shields.io/badge/version-2.0.0-brightgreen"/></div>
</p>

<p align="center" style="font-size:1.5rem"><strong>충</strong>북대학교 공지사항 알<strong>림이</strong></p>

<p align="center">
<a href="https://play.google.com/store/apps/details?id=com.cbnu_alrami.app">
<img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png?hl=ko" width="150px">
</a>
<a href="https://apps.apple.com/kr/app/%EC%B6%A9%EB%A6%BC%EC%9D%B4/id6447121993">
<img src="https://user-images.githubusercontent.com/49256790/143902573-6da748ac-40fa-4613-89cd-b582e31686f3.png" width="150px">
</a>
</p>

## Getting Started
```sh
$ git clone https://github.com/CMI-OSS/cbnu-alrami.git
$ cd cbnu-alrami
$ yarn or yarn install // 전체 의존성 모듈 설치
$ yarn dev:{package_name} // 개발모드로 패키지 실행 ex) yarn dev:mobile
$ yarn start:{package_name} // 프로덕션 모드로 패키지 실행 ex) yarn start:server
```


### 패키지별 의존성 모듈 설치
```
$ yarn workspace {package_name} add {의존성 모듈} // 패키지별 의존성 모듈 설치 ex) yarn workspace mobile add react
```
### root에 개발 의존성 모듈 설치
패키지 공통으로 사용되는 개발 의존성 모듈 설치가 필요한 경우
```
$ yarn add {의존성 모듈} -D -W // ex) yarn add prettier -D -W
```
