import styled from 'styled-components';
import { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import HabitsContext from '../contexts/HabitsContext';

import LogIn from './LogIn';
import SignUp from './SignUp';
import Header from './Header';
import Footer from './Footer';
import Habits from './Habits';
import Today from './Today';
import History from './History';

export default function App() {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    const [habits, setHabits] = useState([]);
    const [completedHabitsPercentage, setCompletedHabitsPercentage] = useState(0);

    return (
        <UserContext.Provider value={{ user, setUser }}>
        <HabitsContext.Provider value={{ habits, setHabits, completedHabitsPercentage, setCompletedHabitsPercentage }}>
            <BrowserRouter>
                <Body>
                    <Switch><Route path='/' component={LogIn} exact/></Switch>
                    <Switch><Route path='/signup' component={SignUp} exact/></Switch>
                    <Switch>
                        <Route path='/habits' exact>
                            <Header/>
                            <Habits/>
                            <Footer/>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path='/today' exact>
                            <Header/>
                            <Today/>
                            <Footer/>
                        </Route>
                    </Switch>
                    <Switch>
                        <Route path='/history' exact>
                            <Header/>
                            <History/>
                            <Footer/>
                        </Route>
                    </Switch>
                </Body>
            </BrowserRouter>
        </HabitsContext.Provider>
        </UserContext.Provider>
    )
}

const Body = styled.div`
    display: flex;
    flex-direction: column;
    height: 100vh;
`;