import React from 'react';
import styled from 'styled-components';
import { COLOR_DARKSET } from '../../variables';

const ResultItemLayout = ({ title, contents }) => (
  <StyledResultSectionContainer>
    <StyledSectionTitleContainer>
      <StyledSectionTitle>{title}</StyledSectionTitle>
      <StyledDivisionLine />
    </StyledSectionTitleContainer>
    <StyledSectionContentsContainer>{contents}</StyledSectionContentsContainer>
  </StyledResultSectionContainer>
);

const StyledResultSectionContainer = styled.section`
  min-height: 70vh;
  margin-top: 4rem;
`;

const StyledSectionTitleContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledSectionTitle = styled.h2`
  font-size: 1.7rem;
  text-align: left;
  white-space: nowrap;
`;

// TODO: 중복 정의 제거해야댐 + result 페이지랑
const StyledDivisionLine = styled.div`
  width: 100%;
  height: 1px;
  margin-left: 2rem;
  background-color: ${COLOR_DARKSET.BORDER};
`;

const StyledSectionContentsContainer = styled.article`
  margin-top: 2rem;
`;

export default ResultItemLayout;
