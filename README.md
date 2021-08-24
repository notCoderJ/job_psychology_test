# 개인 프로젝트: 직업 심리 검사

> 잘못된 부분이나 잘못 사용한 용어가 있다면 알려주시면 감사하겠습니다.🙏🏼

해당 서비스는 [직업심리검사 API](https://www.career.go.kr/cnet/front/openapi/openApiTestCenter.do)를 통해 사용자의 직업 적합도를 확인할 수 있는 웹 서비스로 사용자의 이름, 나이(?), 성별을 입력받고 검사를 진행하면 사용자와 성향이 맞는 직업을 추천해주고, 사용자가 자신의 직업 가치관과 가장 적합도가 높은 직업을 탐색할 수 있도록 도움을 주는 검사 결과를 보여줍니다.

<br/>

## 💦 사용 기술

추가 예정...

<br/>

## 💦 구현 사항

### `검사자 설정 페이지`

- 필수

  - [x] 검사자는 이름 입력(input: text) 및 성별(input: checkbox) 체크가 가능
  - [x] 이름이나 성별을 기입하지 않거나 선택하지 않으면 검사 시작 버튼 비활성화

- 선택
  - [ ] 이름이 올바르지 않은 경우 안내 메세지를 출력 (숫자나 특수문자를 포함하는지 검사)
  - [ ] 성별을 선택하지 않은 경우 안내 메세지를 출력

### `검사 예시 페이지`

- 필수

  - [x] 시작하기 전 앞으로의 진행 방식을 설명
  - [x] 진행 방식에 대한 검사 예제 한 문항을 화면에 표시
  - [x] 검사 시작 버튼을 구현

- 선택

  - [x] 검사 예제 문항을 진행하지 않으면 검사 시작 버튼 비활성화
  - [x] 검사 예시 페이지부터는 진행 표시줄(Progress bar)을 포함하며, 검사 예시 페이지는 0%로 측정

### `검사 진행 페이지`

- 필수

  - [x] 페이지 당 5개의 문항 출력
  - [x] 페이지 내 모든 문항을 진행하기 전까지는 "다음" 버튼 비활성화

- 선택

  - [x] 각 문항을 선택할 때마다 진행 표시줄과 퍼센트(%) 갱신
  - [x] "이전" 버튼을 클릭했을 때, 이전 페이지 문항에서 선택한 값 유지

### `검사 완료 페이지`

- 필수

  - [ ] 검사 완료 문구를 포함하며, 검사결과에 대한 간단한 문장 포함  
         ex) 사용자는 올빼미 성향이므로 개발자 직업에 적합합니다.

### `검사 결과 페이지`

- 필수
  - [ ] 유저의 기본 정보 포함 (이름, 성별, 검사일)
  - [ ] 직업 가치관 결과에 대하여 항목별로 수치를 표기 (ex. 막대 그래프)
  - [ ] 가치관과 관련 높은 직업을 결과에 따라 분류하여 표기
  - [ ] "다시 검사하기" 버튼 클릭 시, 진행했던 항목에 대한 모든 기록 초기화

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
   |-- pages : 페이지에 대한 컴포넌트를 정의  
   | &nbsp; &nbsp; |-- complete : 검사 완료 페이지에 대한 컴포넌트를 정의  
   | &nbsp; &nbsp; |-- result : 검사 결과 페이지에 대한 컴포넌트를 정의  
  |-- store : 검사 결과 요청에 필요한 데이터를 저장할 store를 정의  
  | &nbsp; &nbsp; |-- reducer : 검사 진행 페이지에서 사용할 state에 대한 action과 reducer를 정의  
  | &nbsp; &nbsp; |-- saga : api 요청이나 사용자 이름 등 비동기적 state를 처리하기 위한 saga를 정의(도입 예정중...)  
  | &nbsp; &nbsp; |-- selector : 검사 진행에 필요한 state를 처리해서 가져오기 위한 selector를 정의  
  |-- utils : 사용할 함수 등을 정의

## 👀 코드 리뷰

<details>
<summary>2021.08.19</summary>

🛠 `개선 완료`

- [x] action, reducer, store 등이 흩어져있는데, store 폴더에 몰아 넣기
- [x] 파일명 camelCase로 변경하기
- [x] useEffect 훅에서 questions을 가져올 때 async로 비동기 처리하기
- [x] Page Index와 같은 상수 값을 명시적으로 상수 선언하여 사용하기
- [x] Question loading 검사 로직을 loading 검사 redux를 만들어 개선하기
- [x] 코드 내 idx, answers[1] 등의 불명확한 변수명을 처음보는 사람도 알아볼 수 있게 명확하게 변경하기
- [x] connect method로 store와 컴포넌트를 연결하는 구조를 useDispatch와 useSelector를 사용하는 방식으로 변경하기  
       &nbsp; &nbsp; &nbsp; (이 방법이 함수형 컴포넌트에 더 적합하고 최신 방법임)
- [x] 이전 버튼 클릭 시 submit 되던 버그 수정🐞  
       &nbsp; &nbsp; &nbsp; (form에 포함되는 버튼인데, type을 별도로 지정하지 않아서 "submit"으로 자동 할당되었음)

♻ `추후 개선 사항`

- [ ] store의 initialState를 연관성있는 것끼리 쪼개고 각각의 reducer를 만들어 합치는 형식으로 변경하기
- [ ] redux-toolkit을 이용하여 현재 action - reducer - store 구조를 더 간결하게 리펙토링하기
- [ ] styled component에서 반응형은 [mixin 함수](https://tobbelindstrom.com/blog/how-to-create-a-breakpoint-mixin-with-styled-components/)를 만들어서 활용해보기
- [ ] [redux-saga](https://react.vlpt.us/redux-middleware/10-redux-saga.html) 도입해보기

</details>

<details>
<summary>2021.08.21</summary>

🛠 `개선 완료`

- [x] 각 api 소스에서 BASE_URL이 중복 선언되는 문제  
       &nbsp; &nbsp; &nbsp; => 매개 변수로 요청 타입을 입력받고 해당하는 Base URL을 반환하는 createBaseURL 함수를 만들어 해결.
- [x] `Psy` -> `Psychology ` 등 불명확한 컴포넌트명이나 변수명 수정  
       &nbsp; &nbsp; &nbsp; => 해당하는 컴포넌트명뿐만 아니라 상수들도 종류에 따라 분리하고 상세한 변수명으로 변경하여 해결.
- [x] loading state를 redux로 관리 => createSelector를 이용해 처리하여 해결.  
       &nbsp; &nbsp; &nbsp; (문항 로딩관련 처리는 전에 하였으나, 아마도 isNextDisabled 같은 것을 포함하는 의미로 생각됨...)
- [x] store의 initialState를 연관성있는 것끼리 쪼개고 각각의 reducer를 만들어 합치는 형식으로 변경하기
- [x] redux-toolkit을 이용하여 현재 action - reducer - store 구조를 더 간결하게 리펙토링하기
- [x] useSelector로 state를 가져오기 전에 createSelector를 이용해 state를 한번 정재해서 가져오기
- [x] Hook을 사용할 때 deps를 누락하지 않기 위해 eslint 조건 켜고 누락된 deps 수정하기
  ```
  'react-hooks/rules-of-hooks': 'error',
  'react-hooks/exhaustive-deps': 'error',
  ```
- [x] 유지보수를 위해 color 변수를 관리하기!(color 변수 정의 완료, 기존 값 변경 중...)

♻ `추후 개선 사항`

- [ ] styled-component와 스타일이 혼재되어 있는 부분 통일시키기!
- [ ] 에러 처리를 위해 [interceptors](https://axios-http.com/docs/interceptors) 도입하기! (일단 alert 컴포넌트를 만들어 사용하면 좋을 것 같다.)

```
- 에러처리 방안
  1. interceptor에서 처리한다.
  2. 현재처럼 모든 api 호출부에 try-catch를 걸어주고, alert로 에러를 처리한다.
  3. saga를 적용해서 saga의 최상단에서 처리한다.(saga 도입 시 해봐야겠다...)
```

- [ ] styled component에서 반응형은 [mixin 함수](https://tobbelindstrom.com/blog/how-to-create-a-breakpoint-mixin-with-styled-components/)를 만들어서 활용해보기(08.19 리마인드!)
- [ ] [redux-saga](https://react.vlpt.us/redux-middleware/10-redux-saga.html) 도입해보기(08.19 리마인드!)

</details>
