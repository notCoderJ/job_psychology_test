import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/modules';
import UserRegister from './userRegister';
import api from '../../api';
// import selector from '../../store/selector';

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const submitHandler = useCallback(() => {
    (async () => {
      try {
        // TODO: saga 도입해서 question 겟하면 page정보 갱신하기!
        const questions = await api.getQuestions();
        dispatch(actions.loadQuestions(questions));
        dispatch(actions.updatePageCount(questions.length));
        console.log(questions);
        history.replace('/test#0');
      } catch (err) {
        alert(`검사 문항을 불러오는데 실패했습니다. 잠시후 다시 시도해주세요.`);
      }
    })();
  }, [history, dispatch]);

  // TODO: Wrapper 만들까 말까
  return (
    <div>
      <header>
        <h1>직업 가치관으로 보는 나의 직업</h1>
      </header>
      <main role="main">
        <p>신박한 문구</p>
        <UserRegister submitHandler={submitHandler} />
      </main>
    </div>
  );
};

export default MainPage;
