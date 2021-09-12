import styled from 'styled-components';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from "react-icons/fi";

import UserContext from '../contexts/UserContext';

export default function Habits() {
    const { user, setUser } = useContext(UserContext);

    return(
        <HeaderBox>
            <Title>TrackIt</Title>
            <UserArea>
                {user && <img src={user.image}></img>}
                <StyledLink to="/" onClick={()=>{localStorage.clear();setUser(null)}}><FiLogOut /></StyledLink>
            </UserArea>
        </HeaderBox>
    )
}

const HeaderBox = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 70px;
    padding: 0 18px 0 18px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`;

const Title = styled.h1`
    font-family: Playball;
    font-size: 39px;
    line-height: 49px;
    color: #FFFFFF;
`;

const UserArea = styled.div`
    display: flex;
    align-items: center;
    height: 70px;
    img {
        width: 51px;
        height: 51px;
        border-radius: 98.5px;
        margin: 0 10px 0 0;
    }
`;

const StyledLink = styled(Link)`
    color: #FFFFFF;
    font-size: 18px;
    margin-top: 3px;
`;