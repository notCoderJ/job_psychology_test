import styled from 'styled-components';

const PageLayOut = ({ header, main, footer }) => {
    return (
        <Container>
            <Header>{header}</Header>
            <Main>{main}</Main>
            <Footer>{footer}</Footer>
        </Container>
    );
}

const Container = styled.section`
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 1000px;
    height: 700px;
    border-radius: 10px;
    border: solid black 1px;
`;

const Header = styled.header`
    border: solid black 1px;
    height: 150px;
`;

const Main = styled.header`
    border: solid black 1px;
    height: 400px;
`;

const Footer = styled.header`
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: solid black 1px;

    height: 150px;
`;

export default PageLayOut;