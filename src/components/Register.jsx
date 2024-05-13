import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from '../AuthContext'; // Импортируем контекст для доступа к функции регистрации

const Register = () => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const { register } = useAuth(); // Используем функцию регистрации из контекста
    const navigate = useNavigate(); // Для программной навигации после регистрации

    const handleSubmit = async (event) => {
        event.preventDefault();
        await register(phoneNumber, password);
        navigate('/profile'); // Перенаправляем пользователя на главную страницу после успешной регистрации
    };

    return (
        <div className="login">
            <h1>Регистрация</h1>
            <form className="login__form" onSubmit={handleSubmit}>
                <label htmlFor="phone">
                    Номер телефона
                </label>
                <input
                    type="text"
                    id="phone"
                    placeholder="+7(777)777-77-77"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label htmlFor="password">
                    Пароль
                </label>
                <input
                    type="password"
                    id="password"
                    placeholder="Введите пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>Нажимая на <span>“Регистрация”</span> я соглашаюсь с <span>Договором сервиса NoteNet</span>,
                    и ознакомлен с <span>Политикой конфиденциальности</span></p>
                <button type="submit">Регистрация</button>
            </form>
            <div className="login__bottom">
                <h2>Уже зарегистрированы?</h2>
                <p>Вы можете войти в наш сервис, перейдя по ссылке ниже</p>
                <div className="login__block">
                    <Link to="/login" className="login__block--item">Вход</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
