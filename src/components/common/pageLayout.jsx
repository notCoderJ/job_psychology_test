import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled, { css } from 'styled-components';
import { COLOR_DARKSET } from '../../variables';
import { backgroundImg, logo } from '../../assets/images';

const ADDITIONAL_INFO = Object.freeze({
  rights: (
    <p>
      <span>ⓒ 2021. Jeon Jin Seong</span>
      <span>All Rights Reserved.</span>
    </p>
  ),
  contact: (
    <ul>
      <li>
        <FontAwesomeIcon icon={faEnvelope} />
        <span>aimer120@nate.com</span>
      </li>
      <li>
        <a href="https://github.com/notCoderJ" target="_blank" rel="noreferrer">
          <object type="image/svg+xml" data={logo.github.svg}>
            <img src={logo.github.png} alt="github_logo" />
          </object>
          https://github.com/notCoderJ
        </a>
      </li>
    </ul>
  ),
});

const PageLayout = React.forwardRef(
  ({ background, header, main, footerHide }, ref) => (
    <Container ref={ref} background={background}>
      <Header>{header}</Header>
      <Main role="main">{main}</Main>
      <Footer hidden={footerHide}>
        <StyledRights>{ADDITIONAL_INFO.rights}</StyledRights>
        <StyledContact>
          Contact
          {ADDITIONAL_INFO.contact}
        </StyledContact>
      </Footer>
    </Container>
  ),
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

      // TODO: 화면 전환 시 하얗게 반짝임 이슈
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
  opacity: ${(props) => (props.hidden ? '0' : '1')};

  > div + div {
    margin-top: 1rem;
  }

  @media screen and (max-width: 480px) {
    > div {
      transform: translateY(15%);
      font-size: 0.9rem;
    }
    > div + div {
      margin-top: 0.5rem;
    }
  }
`;

const StyledRights = styled.div`
  > p {
    font-size: 0.9rem;
    display: flex;
    flex-direction: column;
  }

  @media screen and (max-width: 480px) {
    > p {
      font-size: 0.8rem;
    }
  }
`;

const StyledContact = styled.div`
  display: flex;
  flex-direction: column;

  > ul {
    padding: 0;
    font-size: 0.9rem;
    list-style: none;

    > li {
      width: fit-content;
      margin: auto;

      > svg,
      > a > object,
      > a > object > img {
        vertical-align: sub;
        margin-right: 0.3rem;
        width: 0.9rem;
      }

      > a {
        text-decoration: none;
        color: white;

        > object,
        > object > img {
          pointer-events: none;
          cursor: pointer;
        }
      }
    }
  }

  @media screen and (max-width: 480px) {
    ul > li {
      font-size: 0.8rem;
      > a > object,
      > a > object > img {
        width: 0.8rem;
      }
    }
  }
`;

export default PageLayout;
