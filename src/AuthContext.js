import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';
import Swal from "sweetalert2";

// Базовый URL API
const API_URL = 'http://localhost:3001/api';

// Создание контекста
const AuthContext = createContext();

// Хук для использования контекста
export const useAuth = () => useContext(AuthContext);

// Поставщик контекста
export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(() => {
        // Попытка восстановить данные пользователя из localStorage при инициализации
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Функция регистрации пользователя
    const register = async (phoneNumber, password) => {
        try {
            const response = await axios.post(`${API_URL}/users/register`, {phoneNumber, password}, {
                withCredentials: true  // для передачи куки
            });
            const {userId} = response.data;
            setUser({userId});
            localStorage.setItem('user', JSON.stringify({userId})); // Сохранение пользователя в localStorage
        } catch (error) {
            console.error('Registration failed:', error.response?.data.message || error.message);
            throw error;
        }
    };

    // Функция входа пользователя
    const login = async (phoneNumber, password, navigate) => {
        if (!phoneNumber || !password) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: 'Необходимо ввести номер телефона и пароль.'
            });
            return;
        }

        try {
            const response = await axios.post(`${API_URL}/users/login`, { phoneNumber, password }, {
                withCredentials: true
            });
            const { userId } = response.data;
            setUser({ userId });
            localStorage.setItem('user', JSON.stringify({ userId }));
            navigate('/profile');  // Переадресация на страницу профиля после успешного входа
        } catch (error) {
            console.error('Login failed:', error.response?.data.message || error.message);
            Swal.fire({
                icon: 'error',
                title: 'Ошибка при входе',
                text: error.response?.data.message || 'Некорректные данные для входа.'
            });
        }
    };




    // Функция выхода пользователя
    const logout = async () => {
        try {
            await axios.get(`${API_URL}/logout`, {}, {
                withCredentials: true  // для передачи куки
            });
            setUser(null);
            localStorage.removeItem('user'); // Удаление пользователя из localStorage
        } catch (error) {
            console.error('Logout failed:', error.response?.data.message || error.message);
            throw error;
        }
    };

    const refreshAccessToken = async () => {
        try {
            const response = await axios.post(`${API_URL}/refresh-token`, {}, {withCredentials: true});
            const {accessToken} = response.data;
            axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            return accessToken;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            throw error;
        }
    };

    axios.interceptors.response.use(response => response, async error => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // Пометка, что запрос уже пытался автоматически повториться

            try {
                // Запрос на обновление токена
                const refreshTokenResponse = await axios.post(`${API_URL}/refresh-token`, {}, { withCredentials: true });
                const { accessToken } = refreshTokenResponse.data;
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`; // Обновление токена доступа в заголовках по умолчанию

                originalRequest.headers['Authorization'] = `Bearer ${accessToken}`; // Обновление заголовка исходного запроса
                return axios(originalRequest); // Повторный запрос с новым токеном
            } catch (refreshError) {
                // Перенаправление на страницу входа или показ сообщения
                console.log('Unable to refresh token:', refreshError);
                window.location.href = '/login'; // Пример перенаправления на страницу входа
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => response, error => {
        // Обработка известных ошибок HTTP
        if (error.response) {
            // Обработка ошибок с состоянием ответа
            const message = error.response.data.message || 'Ошибка сервера';
            Swal.fire({
                icon: 'error',
                title: 'Ошибка!',
                text: message
            });
        } else if (error.request) {
            // Запрос был сделан, но ответ не был получен
            Swal.fire({
                icon: 'error',
                title: 'Сетевая ошибка',
                text: 'Сервер не ответил на запрос'
            });
        } else {
            // Произошла ошибка при настройке запроса
            Swal.fire({
                icon: 'error',
                title: 'Ошибка запроса',
                text: error.message
            });
        }
        return Promise.reject(error);
    });





    // Объект контекста с методами и состоянием пользователя
    const value = {user, setUser, register, login, logout};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
