import styled from 'styled-components';
import { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import Loader from "react-loader-spinner";
import logo from '../imgs/logo.png';

import UserContext from '../contexts/UserContext';

export default function SignUp() {
    const { user } = useContext(UserContext);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {if(user) history.push('/habits')},[]);

    function signup(e) {
        e.preventDefault();
        let isEmailValid = (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/g).test(email);
        let isImageValid = (image.match(/\.(jpeg|jpg|gif|png|svg)$/) != null);
        if(isEmailValid && password && name && isImageValid) {
            setIsLoading(true);
            const body = { email, password, name, image };
            console.log(body);
            const request = axios.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', body);
            request.then((res) => {
                setIsLoading(false);
                alert('Cadastro realizado com sucesso!');
                history.push('/');
            });
            request.catch((error) => {
                setIsLoading(false);
                console.log(error.response.status);
                alert('Algo deu errado, por favor recarregue a página e tente novamente!');
            })
        } else if(!isEmailValid) { alert('Por favor, insira um e-mail válido!') }
        else if(!password) { alert('Por favor, escolha uma senha!') }
        else if(!name) { alert('Por favor, escolha um nome de usuário!') }
        else { alert('Por favor, insira uma URL de imagem válida!') }
    }

    return(
        <LogInBox>
            <Banner src={logo}></Banner>
            <Form onSubmit={signup}>
                <input disabled={isLoading} onChange={(e) => setEmail(e.target.value)} value={email} type="text" placeholder="e-mail"></input>
                <input disabled={isLoading} onChange={(e) => setPassword(e.target.value)} value={password} type="password" placeholder="password"></input>
                <input disabled={isLoading} onChange={(e) => setName(e.target.value)} value={name} type="text" placeholder="nome"></input>
                <input disabled={isLoading} onChange={(e) => setImage(e.target.value)} value={image} type="text" placeholder="foto"></input>
                <button type="submit">
                    {isLoading ? <Loader type="ThreeDots" color="#FFFFFF" timeout={3000} /> : 'Cadastrar'}
                </button>
                <Link to='/'><SignInLink>Já tem uma conta? Faça login!</SignInLink></Link>
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

const Banner = styled.img`
    height: 178px;
    width: 180px;
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
        display: flex;
        justify-content: center;
        align-items: center;
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

const SignInLink = styled.h1`
    font-family: Lexend Deca;
    font-size: 14px;
    line-height: 17px;
    text-decoration-line: underline;
    color: #52B6FF;
`;