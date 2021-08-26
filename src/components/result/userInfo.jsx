import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';
import selector from '../../store/selector';
// import { COLOR_DARKSET } from '../../variables';
import TableLayout from './tableLayout';

const UserInfo = () => {
  const { user, inspect } = useSelector(selector.getUserInfo);

  useEffect(() => {
    console.log('오쓰!', user, inspect);
  }, [user, inspect]);
  return (
    <TableLayout
      border={{
        borderStyle: 'none',
      }}
      contents={{
        head: ['이름', '성별', '구분', '검사 종류', '검사일'],
        body: [user.name, user.gender, user.type, inspect.type, inspect.date],
      }}
    />
  );
};

export default UserInfo;
