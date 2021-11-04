import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import { COLOR_DARKSET } from '../../variables';
import { backgroundImg } from '../../assets/images';

const ADDITIONAL_INFO = Object.freeze({
  rights: (
    <span>
      ⓒ 2021. Jeon Jin Seong <br />
      All Rights Reserved. <br />
    </span>
  ),
  contact: (
    <span>
      Contact
      <br />
      E-mail: aimer120@nate.com
      <br />
      Github: https://github.com/notCoderJ
    </span>
  ),
});

const PageLayout = React.forwardRef(
  ({ background, header, main, footerHide }, ref) => {
    // const bgImg = useMemo(() => background && backgroundImg, [background]);
    useEffect(() => {}, []);

    return (
      <Container ref={ref} background={background}>
        <Header>{header}</Header>
        <Main role="main">{main}</Main>
        <Footer hidden={footerHide}>
          <div>
            {ADDITIONAL_INFO.rights}
            <br />
            {ADDITIONAL_INFO.contact}
          </div>
        </Footer>
      </Container>
    );
  },
);

const Container = styled.div`
  display: grid;
  grid-template:
    'Header' 15vh
    'Main' 1fr
    'Footer' 30vh / 1fr;
  justify-content: center;
  row-gap: 5vh;
  position: relative;
  height: 100vh;

  color: ${COLOR_DARKSET.FONT};
  background-color: ${COLOR_DARKSET.BACKGROUND};
  box-sizing: border-box;
  text-align: center;
  user-select: none;
  overflow-y: auto;
  scroll-behavior: smooth;

  ${(props) =>
    props.background &&
    css`
      background-attachment: fixed;
      background: no-repeat center / cover url(${backgroundImg[0]});

      /* animation: 30s ease-in-out infinite fadein;
      @keyframes fadein {
        0% {
          background: no-repeat center / cover url(${backgroundImg[0]});
        }
        25% {
          background: no-repeat center / cover url(${backgroundImg[1]});
        }
        50% {
          background: no-repeat center / cover url(${backgroundImg[2]});
        }
        75% {
          background: no-repeat center / cover url(${backgroundImg[3]});
        }
        100% {
          background: no-repeat center / cover url(${backgroundImg[0]});
        }
      } */
    `};

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
    row-gap: 3vh;
  }
`;

const Header = styled.header`
  grid-area: Header;
  position: fixed;
  grid-template-areas: Header;
  width: 100%;
  background-color: #2c2c2c6a;
  backdrop-filter: blur(15px);
  z-index: 999;
`;

const Main = styled.main`
  grid-area: Main;
  place-self: center center;
  width: 60%;
  height: fit-content;

  @media screen and (max-width: 480px) {
    width: 75%;
  }
`;

const Footer = styled.footer`
  grid-area: Footer;
  width: 100%;
  height: 100%;
  font-size: 0.9rem;
  opacity: ${(props) => (props.hidden ? '0' : '1')};

  @media screen and (max-width: 480px) {
    > div {
      transform: translateY(15%);
      font-size: 0.8rem;
    }
  }
`;

export default PageLayout;
