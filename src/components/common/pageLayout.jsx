import React from 'react';
import styled from 'styled-components';

const PageLayOut = ({ header, main }) => (
  <Container>
    <Header>
      {/* <DesignBar /> */}
      {header}
    </Header>
    <Main>{main}</Main>
    <Footer />
  </Container>
);

const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  background-color: #27332a;
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
      background-color: #fffdfa;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #a476e9;
    }
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 15vh;

  @media screen and (max-width: 480px) {
    & {
      min-height: 13vh;
    }
  }
`;

// const DesignBar = styled.div``;

const Main = styled.main`
  height: fit-content;
`;

// 모드용 임시
const Footer = styled.footer`
  position: fixed;
`;

export default PageLayOut;
