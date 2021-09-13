import styled from 'styled-components';
import { useContext, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-loader-spinner";
import { BsTrash } from "react-icons/bs";


import UserContext from '../contexts/UserContext';
import HabitsContext from '../contexts/HabitsContext';

export default function Habits() {
    const { user } = useContext(UserContext);
    const { habits, setHabits } = useContext(HabitsContext);
    const history = useHistory();
    const [showNewTaskForm, setShowNewTaskForm] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [newHabitName, setNewHabitName] = useState('');
    const [newHabitDays, setNewHabitDays] = useState([]);
    const [weekDays, setWeekDays] = useState([
        { name:"D", isSelected: false },
        { name:"S", isSelected: false },
        { name:"T", isSelected: false },
        { name:"Q", isSelected: false },
        { name:"Q", isSelected: false },
        { name:"S", isSelected: false },
        { name:"S", isSelected: false }
    ]);

    // eslint-disable-next-line
    useEffect(() => {if(!user) history.push('/')},[user]);
    useEffect(() => {
        const config = { headers: { "Authorization" : `Bearer ${user.token}` } };
        const request = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', config);
        request.then(res => { setHabits(res.data) });// eslint-disable-next-line
    }, []);

    function addOrRemoveDayOfNewHabit(selectedDay){
        if(!isLoading) {
            let isDaySelected = false;
            newHabitDays.forEach(day => {
                if(day == selectedDay) {
                    isDaySelected = true;
                    let actualNewHabitDays = newHabitDays.filter(day => day != selectedDay);
                    setNewHabitDays(actualNewHabitDays);
                }
            })
            if(!isDaySelected) {
                let actualNewHabitDays = [...newHabitDays];
                actualNewHabitDays.push(selectedDay);
                actualNewHabitDays.sort();
                setNewHabitDays(actualNewHabitDays);
            }
            let actualWeekDays = weekDays;
            actualWeekDays[selectedDay].isSelected = !actualWeekDays[selectedDay].isSelected;
            setWeekDays(actualWeekDays);
        }
    }

    function createHabit() {
        setIsLoading(true);
        if (newHabitName && newHabitDays.length > 0) {
            const config = { headers: { "Authorization" : `Bearer ${user.token}` } };
            const body = { name: newHabitName, days: newHabitDays };
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits', body, config);
            request.then(res => {
                setIsLoading(false);
                let actualHabits = [...habits];
                actualHabits.push(res.data);
                setHabits(actualHabits);
                setNewHabitName('');
                setNewHabitDays([]);
                setWeekDays([
                    { name:"D", isSelected: false },
                    { name:"S", isSelected: false },
                    { name:"T", isSelected: false },
                    { name:"Q", isSelected: false },
                    { name:"Q", isSelected: false },
                    { name:"S", isSelected: false },
                    { name:"S", isSelected: false }
                ]);
                setShowNewTaskForm(false);
            });
            request.catch(error => {
                alert('Algo deu errado! Por favor, tente novamente.')
            })
        } else {
            setIsLoading(false);
            alert('Por favor, informe o nome e os dias previstos para o novo hábito!')
        }
    }

    function isSelected(habitDays, parameter) {
        let result = false;
        habitDays.forEach(day => { if(day === parameter) result = true });
        return result;
    }

    function deleteHabit(habitId) {
        const userConfirmation = window.confirm("Tem certeza de que deseja excluir este hábito?");
        if (userConfirmation) {
            const config = { headers: { "Authorization" : `Bearer ${user.token}` } };
            const request = axios.delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`, config);
            request.then(res => {
                let actualHabits = habits.filter(habit => habit.id !== habitId);
                setHabits(actualHabits);
            })
        }
    }

    return(
        <HabitsBox>
            <TitleBox>
                <Title>Meus hábitos</Title>
                <button onClick={() => setShowNewTaskForm(!showNewTaskForm)}>+</button>
            </TitleBox>

            {showNewTaskForm && <NewTaskForm>
                <input disabled={isLoading} onChange={(e) => setNewHabitName(e.target.value)} value={newHabitName} type="text" placeholder="nome do hábito"></input>
                <SelectNewHabitDays>
                    {weekDays.map((weekDay, index) => (
                        <WeekDayOption selected={weekDay.isSelected} key={index} onClick={() => addOrRemoveDayOfNewHabit(index)}>{weekDay.name}</WeekDayOption>
                    ))}
                </SelectNewHabitDays>
                <Buttons>
                    <h1 onClick={() => setShowNewTaskForm(!showNewTaskForm)}>Cancelar</h1>
                    <button onClick={() => createHabit()}>
                        {isLoading ? <Loader type="ThreeDots" color="#FFFFFF" timeout={3000} height={35} width={35} /> : 'Salvar'}
                    </button>
                </Buttons>
            </NewTaskForm>}

            {habits.length === 0 && <NoHabitsMessage>
                Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
            </NoHabitsMessage>}

            {habits.length > 0 && habits.map((habit, index) => (
                <HabitBox key={index}>
                    <h1>{habit.name}</h1>
                    <HabitWeekDays>
                        <HabitWeekDay selected={isSelected(habit.days, 0)}>D</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 1)}>S</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 2)}>T</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 3)}>Q</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 4)}>Q</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 5)}>S</HabitWeekDay>
                        <HabitWeekDay selected={isSelected(habit.days, 6)}>S</HabitWeekDay>
                    </HabitWeekDays>
                    <Delete><BsTrash onClick={() => deleteHabit(habit.id)}/></Delete>
                </HabitBox>
            ))}
        </HabitsBox>
    )
}

const HabitsBox = styled.div`
    width: 100%;
    height: calc(100vh - 140px);
    background: #F5F5F5;
    padding: 0 18px 30px 18px;
    overflow: scroll;
`;

const TitleBox = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 21px 0 28px 0;
    button {
        width: 40px;
        height: 35px;
        font-family: Lexend Deca;
        font-size: 27px;
        line-height: 34px;
        color: #FFFFFF;
        border: none;
        background: #52B6FF;
        border-radius: 4.6px;
        padding: 0 0 2px 0;
        cursor: pointer;
    }
`;

const Title = styled.h1`
    font-family: Lexend Deca;
    font-size: 23px;
    line-height: 29px;
    color: #126BA5;
`;

const NewTaskForm = styled.div`
    width: 100%;
    height: 180px;
    background: #FFFFFF;
    border-radius: 5px;
    margin: 0 0 28px 0;
    padding: 18px;
    input {
        width: 100%;
        height: 45px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        padding: 10px;
    }
    input::placeholder {
        color: #DBDBDB;
        font-family: Lexend Deca;
        font-size: 20px;
        line-height: 25px;
    }
`;

const SelectNewHabitDays = styled.div`
    width: 100%;
    display: flex;
    margin: 8px 0 0 0;
`;

const WeekDayOption = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 20px;
    line-height: 25px;
    color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.selected ? '#DBDBDB' : '#FFFFFF'};
    margin: 0 4px 0 0;
    cursor: pointer;
`;

const Buttons = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 29px 0 0 0;
    h1 {
        margin: 0 23px 0 0;
        font-family: Lexend Deca;
        font-size: 16px;
        line-height: 20px;
        color: #52B6FF;
        cursor: pointer;
    }
    button {
        width: 84px;
        height: 35px;
        border: none;
        background: #52B6FF;
        border-radius: 4.6px;
        cursor: pointer;
        font-family: Lexend Deca;
        font-size: 16px;
        line-height: 20px;
        color: #FFFFFF;
    }
`;

const NoHabitsMessage = styled.div`
    font-family: Lexend Deca;
    font-size: 18px;
    line-height: 22px;
    color: #666666;
`;

const HabitBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    background: #FFFFFF;
    border-radius: 5px;
    padding: 15px;
    margin 0 0 10px 0;
    position: relative;
    h1 {
        font-family: Lexend Deca;
        font-size: 20px;
        line-height: 25px;
        color: #666666;
        margin: 0 0 8px 0;
    }
    div {
        display: flex;
    }
`
const HabitWeekDays = styled.div`
    display: flex;
`;

const HabitWeekDay = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #D5D5D5;
    border-radius: 5px;
    font-family: Lexend Deca;
    font-size: 20px;
    line-height: 25px;
    color: ${props => props.selected ? '#FFFFFF' : '#DBDBDB'};
    background: ${props => props.selected ? '#DBDBDB' : '#FFFFFF'};
    margin: 0 4px 0 0;
`;

const Delete = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    color: #666666;
    cursor: pointer;
`;