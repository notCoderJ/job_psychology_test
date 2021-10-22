import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { actions } from '../../store/modules';
import UserRegister from './userRegister';
import api from '../../api';
import { reducerState } from '../../utils/reducer';
import MainBgImg from '../../assets/images/main_bg.png';

const MainPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  // const { loading, error } = useSelector(selector.)

  const submitHandler = useCallback(() => {
    (async () => {
      try {
        // TODO: saga 도입해서 question 겟하면 page정보 갱신하기!
        const questions = await api.getQuestions();
        dispatch(actions.loadQuestions(reducerState.success(questions.RESULT)));
        history.push('/test#0');
      } catch (err) {
        dispatch(actions.loadQuestions(reducerState.failure(err)));
        alert(`검사 문항을 불러오는데 실패했습니다. 잠시후 다시 시도해주세요.`);
      }
    })();
  }, [history, dispatch]);

  return (
    <StyledMainPage bgImg={MainBgImg}>
      <header>
        <StyledTitle>직업 가치관으로 보는 나의 직업</StyledTitle>
      </header>
      <main role="main">
        <p>타이핑 문구</p>

        <UserRegister submitHandler={submitHandler} />
      </main>
    </StyledMainPage>
  );
};

const StyledMainPage = styled.div`
  width: 100%;
  height: 100vh;
  background: no-repeat center/cover url(${(props) => props.bgImg});
  text-align: center;
`;

const StyledTitle = styled.h1`
  color: white;
  font-size: 3rem;
  padding: 4rem 0 3rem 0;
`;

export default MainPage;
