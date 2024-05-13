import {useAuth} from "../AuthContext";
import React from "react";

const Logout = () => {
    const {logout} = useAuth(); // Получаем функцию logout из контекста

    const handleLogout = async () => {
        try {
            await logout(); // Вызов функции выхода
            alert('Вы вышли из системы');
        } catch (error) {
            alert('Ошибка при выходе: ' + error);
        }
    };

    return (
        <div className="burger__item" onClick={handleLogout}>
            Выйти
        </div>
    );
};

export default Logout
