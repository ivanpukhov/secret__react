import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../AuthContext'; // Убедитесь, что путь до AuthContext корректный

const Login = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth(); // Функция login из контекста
    const navigate = useNavigate(); // Для программной навигации после регистрации

    const handleSubmit = (event) => {
        event.preventDefault();
        login(phoneNumber, password, navigate); // Теперь login принимает функцию navigate как аргумент
    };


    return (
        <div className="login">
            <h1>Вход</h1>
            <form onSubmit={handleSubmit} className="login__form">
                <label htmlFor="phone">
                    Номер телефона
                </label>
                <input
                    type="text"
                    id="phone"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="+7(777)777-77-77"
                />
                <label htmlFor="password">
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Введите ваш пароль"
                />
                <p>Нажимая на <span>“Войти”</span> я соглашаюсь с <span>Договором сервиса NoteNet</span>, и
                    ознакомлен с <span>Политикой конфиденциальности</span>.</p>
                <button type="submit">Войти</button>
            </form>
            <div className="login__bottom">
                <h2>Еще не зарегистрированы?</h2>
                <p>Вы можете присоединиться к нашему сервису перейди по ссылке ниже</p>
                <div className="login__block">
                    <Link to="/register" className="login__block--item">Зарегистрироваться</Link>
                    <div className="login__block--item">Забыли пароль?</div>
                </div>
            </div>
        </div>
    );
};

export default Login;
