import React, { useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import styled, { css } from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { GENDER } from '../../constants';
import { actions, selector } from '../../store/modules';
import { debounce } from '../../utils';

const UserRegister = ({ submitHandler }) => {
  const dispatch = useDispatch();
  const nameRef = useRef();
  const genderRef = useRef();
  const userName = useSelector(selector.getUserName);
  const userGender = useSelector(selector.getUserGender);
  const nameErrorId = 'name-error-id';
  const genderErrorId = 'gender-error-id';

  const saveName = useCallback(
    (e) => dispatch(actions.saveName(e.target.value)),
    [dispatch],
  );

  const saveGender = useCallback(
    (e) => {
      if (e.target.value === userGender) {
        return;
      }
      dispatch(actions.saveGender(e.target.value));
    },
    [userGender, dispatch],
  );

  injectStyle();
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (!userName) {
        nameRef.current.focus();
        toast.error('한글 2자 이상 입력해주세요.', {
          toastId: nameErrorId,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        });
        return;
      }

      if (!userGender) {
        genderRef.current.focus();
        toast.error('성별은 필수 항목입니다.', {
          toastId: genderErrorId,
          position: 'bottom-center',
          autoClose: 1000,
          hideProgressBar: false,
          pauseOnHover: false,
          draggable: false,
          theme: 'dark',
        });
        return;
      }

      if (typeof submitHandler === 'function') {
        submitHandler();
      }
    },
    [submitHandler, userGender, userName],
  );

  // TODO: Error processing
  // TODO: Create fieldset templete and temp css
  return (
    <form onSubmit={handleSubmit}>
      <fieldset>
        <legend>사용자 등록</legend>
        <label htmlFor="userName">
          <span>이름</span>
          <abbr
            title="필수 항목"
            aria-label="필수 항목"
            style={{ textDecoration: 'None', color: 'red' }}
          >
            *
          </abbr>
          <input hidden type="text" />
          <input
            ref={nameRef}
            id="userName"
            defaultValue={userName}
            type="text"
            onChange={debounce(saveName, 200)}
          />
          <span>한글 2자이상 작성해주세요.</span>
        </label>
        <fieldset>
          <legend>
            <span>성별</span>
            <abbr
              title="필수 항목"
              aria-label="필수 항목"
              style={{ textDecoration: 'None', color: 'red' }}
            >
              *
            </abbr>
          </legend>
          <ul>
            <li>
              <label htmlFor="genderMale">
                남성
                <input
                  ref={genderRef}
                  id="genderMale"
                  name="userGender"
                  value={GENDER['남성']}
                  type="radio"
                  onClick={saveGender}
                  defaultChecked={userGender === GENDER['남성']}
                />
              </label>
            </li>
            <li>
              <label htmlFor="genderFemale">
                여성
                <input
                  id="genderFemale"
                  name="userGender"
                  value={GENDER['여성']}
                  type="radio"
                  onClick={saveGender}
                  defaultChecked={userGender === GENDER['여성']}
                />
              </label>
            </li>
          </ul>
        </fieldset>
      </fieldset>
      <button type="submit">검사 시작</button>
      <ToastContainer />
    </form>
  );
};

export default UserRegister;
