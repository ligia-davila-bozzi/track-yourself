import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

export default function Habits() {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {if(!user) history.push('/')},[user]);

    return(
        <HabitsBox>
            
        </HabitsBox>
    )
}

const HabitsBox = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    background: #F0F0F0;
`;