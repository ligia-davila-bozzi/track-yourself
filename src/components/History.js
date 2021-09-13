import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

export default function Habits() {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {if(!user) history.push('/')},[user]);

    return(
        <HistoryBox>
            <Title>Histórico</Title>
            <HistoryMessage>Em breve você poderá ver o histórico dos seus hábitos aqui!</HistoryMessage>
        </HistoryBox>
    )
}

const HistoryBox = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    background: #F5F5F5;
    padding: 0 18px 0 18px;
`;

const Title = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    height: 35px;
    margin: 21px 0 28px 0;
    font-family: Lexend Deca;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`;

const HistoryMessage = styled.div`
    font-family: Lexend Deca;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
`;