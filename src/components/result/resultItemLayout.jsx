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
  margin-top: 4rem;
`;

const StyledSectionTitleContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 480px) {
    flex-direction: column;
    font-size: 1rem;
  }
`;

const StyledSectionTitle = styled.h2`
  font-size: 2rem;
  text-align: left;
  white-space: nowrap;

  @media screen and (max-width: 480px) {
    font-size: 1.7rem;
    white-space: normal;
    text-align: center;
    word-break: keep-all;
  }
`;

const StyledDivisionLine = styled.div`
  width: 100%;
  height: 1px;
  margin-left: 2rem;
  background-color: ${COLOR_DARKSET.BORDER};

  @media screen and(max-width: 480px) {
  }
`;

const StyledSectionContentsContainer = styled.article`
  margin-top: 2rem;
`;

export default ResultItemLayout;
