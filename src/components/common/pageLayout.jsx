import React from 'react';
import styled from 'styled-components';
import { COLOR_DARKSET } from '../../variables';

const PageLayout = ({ header, main, footer }) => (
  <Container>
    <Header>{header}</Header>
    <Main>{main}</Main>
    <Footer>{footer}</Footer>
  </Container>
);

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  color: ${COLOR_DARKSET.FONT};
  background-color: ${COLOR_DARKSET.BACKGROUND};
  box-sizing: border-box;
  margin: auto;
  text-align: center;
  user-select: none;
  overflow-x: hidden;
  scroll-behavior: smooth;

  @media screen and (min-width: 480px) {
    // TODO: 있었다 사라졌다 하기로 변경해야지!
    ::-webkit-scrollbar {
      width: 0.7vw;
      background-color: ${COLOR_DARKSET.SCROLL_BAR};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${COLOR_DARKSET.SCROLL_THUMB};
    }
  }
`;

const Header = styled.header``;

// const DesignBar = styled.div``;

const Main = styled.main`
  height: fit-content;
`;

// 모드용 임시
const Footer = styled.footer`
  /* position: fixed; */
`;

export default PageLayout;
