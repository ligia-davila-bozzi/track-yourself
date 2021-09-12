import styled from 'styled-components';
import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import UserContext from '../contexts/UserContext';

export default function Habits() {
    const { user } = useContext(UserContext);
    const history = useHistory();

    useEffect(() => {if(!user) history.push('/')},[user]);

    return(
        <h1>Histórico</h1>
    )
}