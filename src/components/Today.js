import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

import UserContext from '../contexts/UserContext';
import HabitsContext from '../contexts/HabitsContext';
import check from '../imgs/check.png';

export default function Today() {
    const { user } = useContext(UserContext);
    const { completedHabitsPercentage, setCompletedHabitsPercentage } = useContext(HabitsContext);
    const config = { headers: { "Authorization" : `Bearer ${user.token}` } };
    const history = useHistory();
    const [todayHabits, setTodayHabits] = useState([]);
    const [rerender, setRerender] = useState(true);
    const [todayDate, setTodayDate] = useState('');

    // eslint-disable-next-line
    useEffect(() => {if(!user) history.push('/')},[user]);
    useEffect(() => {
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config);
        request.then(res => {setTodayHabits(res.data)})// eslint-disable-next-line
    }, [rerender]);
    useEffect(() => {
        let numberOfCompletedHabits = 0;
        todayHabits.forEach(habit => {if(habit.done) numberOfCompletedHabits += 1})
        setCompletedHabitsPercentage(((numberOfCompletedHabits / todayHabits.length) * 100).toFixed(.2)); // eslint-disable-next-line
    }, [todayHabits]);
    useEffect(() => {
        let todayInText = '';
        if(moment().format('dddd') === 'Sunday') {todayInText = 'Domingo'}
        else if(moment().format('dddd') === 'Monday') {todayInText = 'Segunda'}
        else if(moment().format('dddd') === 'Tuesday') {todayInText = 'Terça'}
        else if(moment().format('dddd') === 'Wednesday') {todayInText = 'Quarta'}
        else if(moment().format('dddd') === 'Thursday') {todayInText = 'Quinta'}
        else if(moment().format('dddd') === 'Friday') {todayInText = 'Sexta'}
        else if(moment().format('dddd') === 'Saturday') {todayInText = 'Sábado'}
        let todayInNumbers = moment().format('DD/MM');
        setTodayDate(`${todayInText}, ${todayInNumbers}`)
    }, [rerender])

    function checkOrUncheckHabit(habitId, habitStatus) {
        if(!habitStatus) {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/check`, {}, config)
            request.then(res => {setRerender(!rerender)})
            request.catch(error => {alert('Algo deu errado!')})
        } else {
            const request = axios.post(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}/uncheck`, {}, config)
            request.then(res => {setRerender(!rerender)})
            request.catch(error => {alert('Algo deu errado!')})
        }
    }

    return(
        <TodayBox>
            <TitleBox>
                <Title>{todayDate}</Title>
                {completedHabitsPercentage == 0 && <SubTitle isgreen={false}>Nenhum hábito concluído ainda</SubTitle>}
                {completedHabitsPercentage > 0 && <SubTitle isgreen={completedHabitsPercentage >= 60}>{completedHabitsPercentage}% dos hábitos concluídos</SubTitle>}
            </TitleBox>
            <ListOfHabits>
                {todayHabits.map((habit, index) => (
                    <Habit key={index}>
                        <HabitInfo>
                            <HabitName>{habit.name}</HabitName>
                            <HabitSequenceInfo>
                                Sequência atual:<ColoredText isgreen={habit.done}>{habit.currentSequence} dias</ColoredText>
                            </HabitSequenceInfo>
                            <HabitSequenceInfo>
                                Seu recorde:<ColoredText isgreen={habit.currentSequence === habit.highestSequence}>{habit.highestSequence} dias</ColoredText>
                            </HabitSequenceInfo>
                        </HabitInfo>
                        <CheckBox isgreen={habit.done} onClick={() => checkOrUncheckHabit(habit.id, habit.done)}>
                            <img alt="Check button" src={check}></img>
                        </CheckBox>
                    </Habit>
                ))}
            </ListOfHabits>
        </TodayBox>
    )
}

const TodayBox = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    background: #F5F5F5;
    padding: 0 18px 30px 18px;
    overflow: scroll;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    margin: 21px 0 28px 0;
`;

const Title = styled.h1`
    font-family: Lexend Deca;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
    margin: 0 0 4px 0;
`;

const SubTitle = styled.h1`
    font-family: Lexend Deca;
    font-size: 18px;
    line-height: 22px;
    color: ${props => props.isgreen ? "#8FC549" : "#BABABA"};
`;

const ListOfHabits = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Habit = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 12px;
    margin: 0 0 10px 0;
`;

const HabitInfo = styled.div`
    display: flex;
    flex-direction: column;
`;

const HabitName = styled.h1`
    font-family: Lexend Deca;
    font-size: 20px;
    line-height: 25px;
    color: #666666;
    margin: 0 0 7px 0;
`;

const HabitSequenceInfo = styled.h1`
    display: flex;
    font-family: Lexend Deca;
    font-size: 13px;
    line-height: 16px;
    color: #666666;
`;

const ColoredText = styled.span`
    color: ${props => props.isgreen ? "#8FC549" : "#666666"};
    margin: 0 0 0 5px;
`;

const CheckBox = styled.div`
    width: 69px;
    height: 69px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${props => props.isgreen ? "#8FC549" : "#EBEBEB"};
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    cursor: pointer;
    img {
        width: 35px;
        height: 28px;
    }
`;