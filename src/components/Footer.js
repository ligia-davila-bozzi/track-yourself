import styled from 'styled-components';
import { Link } from 'react-router-dom';

export default function Habits() {

    return(
        <FooterBox>
            <StyledLink to="/habits">Hábitos</StyledLink>
            <StyledLinkCircle to="/today">Hoje</StyledLinkCircle>
            <StyledLink to="/history">Histórico</StyledLink>
        </FooterBox>
    )
}

const FooterBox = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px 0 30px;
    background: #FFFFFF;
    position: fixed;
    bottom: 0px;
    left: 0px;
`;

const StyledLink = styled(Link)`
    font-family: Lexend Deca;
    font-size: 18px;
    text-decoration: none;
    line-height: 22px;
    text-align: center;
    color: #52B6FF;
`;

const StyledLinkCircle = styled(Link)`
    width: 91px;
    height: 91px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #52B6FF;
    font-family: Lexend Deca;
    font-size: 18px;
    text-decoration: none;
    line-height: 22px;
    text-align: center;
    color: #FFFFFF;
    border-radius: 45.5px;
    position: fixed;
    bottom: 10px;
    left: calc(50vw - 45.5px);
    z-index: 5;
`;