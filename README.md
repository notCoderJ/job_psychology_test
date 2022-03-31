# 개인 프로젝트: 직업 심리 검사

해당 서비스는 [직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 통해 사용자의 직업 적합도를 확인할 수 있는 웹 서비스로 사용자의 이름, 나이(?), 성별을 입력받고 검사를 진행하면 사용자와 성향이 맞는 직업을 추천해주고, 사용자가 자신의 직업 가치관과 가장 적합도가 높은 직업을 탐색할 수 있도록 도움을 주는 검사 결과를 보여줍니다.

<br/>

## 💦 사용 기술 및 용도 (Update: 21.11.04)

- [x] Javascript
- [x] Functional Components + Hooks
- [x] 컴포넌트: React `17.0.2`
- [x] SPA 라우팅: react-router-dom `5.2`
- [x] HTTP 통신: axios `0.21.1`
- [x] React와 Redux 연결: react-redux `7.2.4`
- [x] 전역 상태 관리: @reduxjs/toolkit `1.6.1`
- [x] 비동기 상태 관리: redux-saga `1.1.3`
- [x] Saga와 라우터 연동: history `4.10.1`
- [x] 상태 로컬 유지: redux-persist `6.0.0`
- [x] 기존 상태 초기화: redux-reset `0.3.0`
- [x] 상태 흐름 디버깅: redux-logger: `3.0.6`
- [x] 디자인: styled-components `5.3.0`
- [x] 알림 메시지 디자인: react-toastify `8.0.3`



<br/>

## ✨ 구현 화면

### 사용자 등록
![main_page](https://user-images.githubusercontent.com/21259498/159661880-480288bc-fa70-4805-b066-fcbc79a71f7e.gif)

### 검사 진행
![test_page](https://user-images.githubusercontent.com/21259498/159661975-544331be-5ed4-4b77-b077-eb3f9792f3c0.gif)

### 검사 결과
![result_page](https://user-images.githubusercontent.com/21259498/159662051-74e87470-1641-4100-86db-1cf2db313de9.gif)

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

## ⚙ 리펙토링 진행 현황

### 1차 리펙토링 완료
개선 사항: 
- 전반적인 코드 구조 리펙토링
- 메인, 검사 페이지 디자인 개선
- 로딩 및 에러 처리를 위해 React-toastify 적용
- 비동기 비즈니스 로직을 컴포넌트에서 분리하기 위해 Redux-Saga 적용
- 새로고침 시에도 기존 상태를 유지하기 위해 Redux-Persist 적용

### 2차 리펙토링
개선 사항:
- 불필요한 useCallback 제거하기
  1. 메인페이지 완료(3/31)
