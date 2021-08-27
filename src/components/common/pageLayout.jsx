import React from 'react';
import styled, { css } from 'styled-components';
import { COLOR_DARKSET } from '../../variables';

const PageLayout = React.forwardRef(({ header, main, footer }, ref) => (
  <Container ref={ref}>
    <Header>{header}</Header>
    <Main>{main}</Main>
    <Footer disable={!footer}>{footer}</Footer>
  </Container>
));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
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
  padding: 0 15%;

  @media screen and (min-width: 480px) {
    ::-webkit-scrollbar {
      width: 0.7vw;
      background-color: ${COLOR_DARKSET.SCROLL_BAR};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${COLOR_DARKSET.SCROLL_THUMB};
    }
  }

  @media screen and (max-width: 480px) {
    padding: 0 8%;
  }
`;

const Header = styled.header`
  min-height: fit-content;

  @media screen and (max-width: 480px) {
    min-height: fit-content;
  }
`;

const Main = styled.main`
  height: fit-content;
`;

const Footer = styled.footer`
  ${(props) =>
    !props.disable &&
    css`
      min-height: 27%;

      @media screen and (max-width: 480px) {
        min-height: 25%;
      }
    `};
`;

export default PageLayout;
