# 개인 프로젝트: 직업 심리 검사

해당 서비스는 [직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 통해 사용자의 직업 적합도를 확인할 수 있는 웹 서비스로 사용자의 이름, 나이(?), 성별을 입력받고 검사를 진행하면 사용자와 성향이 맞는 직업을 추천해주고, 사용자가 자신의 직업 가치관과 가장 적합도가 높은 직업을 탐색할 수 있도록 도움을 주는 검사 결과를 보여줍니다.

<br/>

## 💦 사용 기술 및 용도 (Update: 21.10.23)

- [x] Javascript
- [x] Functional Components + Hooks
- [x] 컴포넌트: React `17.0.2`
- [x] SPA 라우팅: react-router-dom `5.2`
- [x] HTTP 통신: axios `0.21.1`
- [x] React와 Redux 연결: react-redux `7.2.4`
- [x] 전역 상태 관리: @reduxjs/toolkit `1.6.1`
- [x] 상태 유지: redux-persist `6.0.0`
- [x] 상태 흐름 디버깅: redux-logger: `3.0.6`
- [x] 디자인: styled-components `5.3.0`
- [ ] react saga(예정)

<br/>

## 💦 src 디렉토리 구조, Ducks 패턴 적용 (Update: 21.10.23)

- src  
ㅤ|-- api : 심리검사 API와 HTTP 통신을 위한 api 구현(문항, 결과 요청 등)  
ㅤ|-- assets : 프로젝트 리소스 관리  
ㅤ|ㅤㅤ|-- images : 이미지 리소스  
ㅤ|-- components  
ㅤ|ㅤㅤ|-- common : 공용 컴포넌트 구현  
ㅤ|ㅤㅤ|-- complete : 검사 완료 페이지에 대한 컴포넌트 구현  
ㅤ|ㅤㅤ|-- main : 초기 메인 페이지에 대한 컴포넌트 구현  
ㅤ|ㅤㅤ|-- result : 검사 결과 페이지에 대한 컴포넌트 구현  
ㅤ|ㅤㅤ|-- test : 검사 페이지에 대한 컴포넌트 구현  
ㅤ|-- constants : 어플리케이션에서 사용할 상수 정의  
ㅤ|-- store : 검사, 결과 데이터에 대한 state 관리  
ㅤ|ㅤㅤ|-- modules : 각 페이지에 대한 action, reducer, selector, middleware 등을 구현  
ㅤ|-- utils : 사용할 유틸리티 함수 구현  

<br/>

## ⚙ 리펙토링 진행(21.10.18 - 21.10.29)

2차 프로젝트를 시작하면서 1차 프로젝트를 리펙토링하려던 일정이 조금 미뤄지게 되었지만, 오늘부터 기존에 세워둔 계획서를 바탕으로 리펙토링을 진행해보려고 합니다.
(2차 프로젝트도 리펙토링 해야지...) 관련된 학습 내용이나 계획 등은 wiki를 이용해서 작성할 예정이고 구현 사항은 이슈로 등록 후 진행할 예정입니다.
