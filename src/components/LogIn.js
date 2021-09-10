import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../contexts/UserContext';

export default function LogIn() {
    const { user, setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {if(user) history.push('/habits')},[]);

    function login(e) {
        e.preventDefault();
        let isEmailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g).test(email);
        if(isEmailValid && password) {
            setIsLoading(true);
            const body = { email, password };
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login', body);
            request.then((res) => {
                setIsLoading(false);
                localStorage.setItem('user',JSON.stringify({
                    user: res.data.name,
                    token: res.data.token
                }));
                setUser(JSON.parse(localStorage.getItem('user')));
                history.push('/habits');
            });
            request.catch((error) => {
                setIsLoading(false);
                alert('Algo deu errado, por favor recarregue a página e tente novamente!');
            })
        } else { alert('Por favor, verifique seu e-mail e sua senha e tente novamente!') }
    }

    return(
        <LogInBox>
            <Banner></Banner>
            <Form onSubmit={login}>
                <input onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="e-mail"></input>
                <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password"></input>
                <button isloading={isLoading.toString()} type="submit">Entrar</button>
                <Link to='/signup'><SignUpLink>Não tem uma conta? Cadastre-se!</SignUpLink></Link>
            </Form>
        </LogInBox>
    )
}

const LogInBox = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Banner = styled.div`
    height: 150px;
    width: 180px;
    background: lightblue;
    margin: 68px 0 10px 0;
`;

const Form = styled.form`
    width: calc(100vw - 72px);
    display: flex;
    flex-direction: column;
    align-items: center;
    input {
        width: 100%;
        height: 45px;
        padding: 11px;
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin: 0 0 6px 0;
    }
    input::placeholder {
        color: #DBDBDB;
        font-family: Lexend Deca;
        font-size: 20px;
        line-height: 25px;
    }
    button {
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        background: #52B6FF;
        color: #FFFFFF;
        font-family: Lexend Deca;
        font-size: 21px;
        line-height: 26px;
        margin: 0 0 36px 0;
    }
`;

const SignUpLink = styled.h1`
    font-family: Lexend Deca;
    font-size: 14px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #52B6FF;
`;