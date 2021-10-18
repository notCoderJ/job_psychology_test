# 개인 프로젝트: 직업 심리 검사

해당 서비스는 [직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 통해 사용자의 직업 적합도를 확인할 수 있는 웹 서비스로 사용자의 이름, 나이(?), 성별을 입력받고 검사를 진행하면 사용자와 성향이 맞는 직업을 추천해주고, 사용자가 자신의 직업 가치관과 가장 적합도가 높은 직업을 탐색할 수 있도록 도움을 주는 검사 결과를 보여줍니다.

<br/>

## 💦 사용 기술 및 버전

- [x] Javascript
- [x] Functional Components + Hooks
- [x] React `17.0.2`
- [x] react-router-dom `5.2`
- [x] axios `0.21.1`
- [x] redux `4.1.1`
- [x] react-redux `7.2.4`
- [x] @reduxjs/toolkit `1.6.1`
- [x] styled-components `5.3.0`
- [x] redux-logger: `3.0.6`,
- [ ] react saga(예정)

<br/>

## 💦 현단계 src 디렉토리 구조 (Update: 21.08.20)

- src  
   |-- api : 비동기 처리를 위한 api(문항, 결과 요청 등)  
   |-- components  
   | &nbsp; &nbsp; |-- common : 공통으로 사용할 컴포넌트들을 정의  
   | &nbsp; &nbsp; |-- complete : 검사 완료 페이지를 구성하는 컴포넌트들을 정의  
   | &nbsp; &nbsp; |-- result : 검사 결과 페이지를 구성하는 컴포넌트들을 정의  
   | &nbsp; &nbsp; |-- test : 검사 진행 페이지를 구성하는 컴포넌트들을 정의  
   |-- constants : 검사 예시 문항, 결과 예시 등 App 전역에서 사용할 상수를 정의  
  |-- store : 검사 결과 요청에 필요한 데이터를 저장할 store를 정의  
  | &nbsp; &nbsp; |-- reducer : 검사 진행 페이지에서 사용할 state에 대한 action과 reducer를 정의  
  | &nbsp; &nbsp; |-- saga : api 요청이나 사용자 이름 등 비동기적 state를 처리하기 위한 saga를 정의(도입 예정중...)  
  | &nbsp; &nbsp; |-- selector : 검사 진행에 필요한 state를 처리해서 가져오기 위한 selector를 정의  
  |-- utils : 사용할 함수 등을 정의

<br/>

## ⚙ 리펙토링 진행(21.10.18 - 21.10.29)

2차 프로젝트를 시작하면서 1차 프로젝트를 리펙토링하려던 일정이 조금 미뤄지게 되었지만, 오늘부터 기존에 세워둔 계획서를 바탕으로 리펙토링을 진행해보려고 합니다.
(2차 프로젝트도 리펙토링 해야지...) 관련된 학습 내용이나 계획 등은 wiki를 이용해서 작성할 예정이고 구현 사항은 이슈로 등록 후 진행할 예정입니다.
