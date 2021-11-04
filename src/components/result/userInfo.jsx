import React from 'react';
import { useSelector } from 'react-redux';
// import styled from 'styled-components';
import { selector } from '../../store/modules';
// import { COLOR_DARKSET } from '../../variables';
import TableLayout from './tableLayout';

const UserInfo = () => {
  const { name, gender, type, inspect } = useSelector(selector.getUserInfo);

  return (
    <TableLayout
      border={{
        borderStyle: 'none',
      }}
      contents={{
        head: ['이름', '성별', '구분', '검사 종류', '검사일'],
        body: [name, gender, type, inspect.type, inspect.date],
      }}
    />
  );
};
// TODO: inspect.type 글씨 초과 수정 계획 후 추가
export default UserInfo;
