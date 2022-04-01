import React from 'react';
import { useSelector } from 'react-redux';
import { selector } from '../../store/modules';
import TableLayout from './TableLayout';

const UserInfo = () => {
  const { type, date, user } = useSelector(selector.getInspectInfo);

  return (
    <TableLayout
      border={{ style: 'none' }}
      contents={{
        head: ['이름', '성별', '구분', '검사 종류', '검사일'],
        body: [user.name, user.gender, user.type, type, date],
      }}
    />
  );
};

export default UserInfo;
