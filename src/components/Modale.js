import React, { useEffect } from 'react';
import './styles/Modale.css';
import { useState } from 'react';
import Registration from './Registration';
import Authorization from './Authorization';
import { useDispatch } from "react-redux"
import { setAuth } from "../redux/actions"
import { Route, Routes } from 'react-router-dom';
import NotFound from './NotFound';
import Main from './Main';
import Spinner from './Spinner';

export default function Modale() {
    let [userData, setUserData] = useState({
        login: '',
        email: '',
        password: '',
        passwordControl: ''
    });
    let [errors, setErrors] = useState({
        login: '',
        email: '',
        password: '',
        passwordControl: ''
    });
    let [showRegistration, setShowRegistration] = useState(localStorage.length < 1)

    const dispatch = useDispatch();

    let handleField = (e) => {
        setUserData({
            ...userData,
            [e.target.name]: e.target.value
        });
    }
    function anyErrors() {
        let user = localStorage.getItem(userData.login);
        let usersData = JSON.stringify(localStorage);
        let err = userData.login.length < 1 ? setErrors({ login: 'Введите логин' }) :
            userData.login.indexOf(' ') >= 0 ? setErrors({ login: 'Логин не может содержать пробелы' }) :
                localStorage.getItem(userData.login) ? setErrors({ login: 'Этот логин уже занят' }) :

                    userData.email.length < 1 ? setErrors({ email: 'Введите e-mail' }) :
                        userData.email.indexOf(' ') >= 0 ? setErrors({ email: 'E-mail не может содержать пробелы' }) :
                            userData.email.indexOf('@') <= 0 ? setErrors({ email: 'Некорректный email' }) :
                                usersData.includes(userData.email) ? setErrors({ email: 'Этот email уже зарегестрирован' }) :

                                    userData.password.length < 8 ? setErrors({ password: 'Пароль должен быть не менее 8 символов' }) :
                                        userData.passwordControl.length < 1 ? setErrors({ passwordControl: 'Повторите пароль' }) :
                                            userData.password != userData.passwordControl ? setErrors({ passwordControl: 'Пароли отличаются' }) : true;

        return err
    }
    function anyErrorsAuth() {
        let user = localStorage.getItem(userData.login) || setErrors({ login: 'Несуществующий логин' });

        if (user) {
            let err = JSON.parse(user)["password"] !== userData.password ? setErrors({ password: 'Неверный пароль' }) : true;

            return err
        }
    }

    let handleSubmitReg = (e) => {
        e.preventDefault();
        if (anyErrors()) {
            setErrors({
                login: '',
                email: '',
                password: '',
                passwordControl: ''
            })
            localStorage.setItem(userData.login, JSON.stringify(userData));
            setShowRegistration(false);
            window.location.href = "/auth"
        }
    }

    let handleSubmitAuth = (e) => {
        e.preventDefault();
        if (anyErrorsAuth()) {
            setErrors = {}
            sessionStorage.setItem('isAuth', true);
            dispatch(setAuth(true));
            window.location.href = "/"
        }
    }

    let addError = (errObj) => {
        setErrors(errObj)
    }

    useEffect(() => {
        if (window.location.href.includes("/reg") || window.location.href.includes("/auth")) return
        localStorage.length > 0 ? window.location.href = "/auth" : window.location.href = "/reg";
    }, [])
    return (
        <div className='modale'>
            <Routes>
                <Route path="/auth" element={<Authorization onChange={handleField} onSubmit={handleSubmitAuth} errors={errors} />} />
                <Route path="/reg" element={<Registration onChange={handleField} onSubmit={handleSubmitReg} errors={errors} />} />
                <Route path="/" element={<Spinner />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    )
}