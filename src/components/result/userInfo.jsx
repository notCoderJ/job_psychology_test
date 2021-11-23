import React from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../store/modules';
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

export default UserInfo;
