import './App.css';
import './assets/css/main.scss';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { AuthProvider, useAuth } from './AuthContext';
import Register from "./components/Register";
import React, { useEffect } from 'react';
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";

function App() {
    useEffect(() => {
        // Блокировка загрузки аудио файлов
        const blockFileDownload = (e) => {
            const target = e.target;
            if (target.tagName === 'A' && target.href.endsWith('.mp3')) {
                e.preventDefault();
            }
        };

        document.addEventListener('click', blockFileDownload);

        // Перехват создания аудио элементов
        const originalCreateElement = document.createElement.bind(document);

        document.createElement = (tagName) => {
            if (tagName.toLowerCase() === 'audio') {
                const audioElement = originalCreateElement(tagName);
                const originalSetAttribute = audioElement.setAttribute.bind(audioElement);

                audioElement.setAttribute = (name, value) => {
                    if (name === 'src' && value === 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3') {
                        return;
                    }
                    originalSetAttribute(name, value);
                };

                Object.defineProperty(audioElement, 'src', {
                    set(value) {
                        if (value === 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3') {
                            return;
                        }
                        this.setAttribute('src', value);
                    }
                });

                return audioElement;
            }
            return originalCreateElement(tagName);
        };

        // Восстановление pointer-events
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                    const target = mutation.target;
                    if (target.style.pointerEvents === 'none') {
                        target.style.pointerEvents = '';
                    }
                }
            });
        });

        observer.observe(document.body, {
            attributes: true,
            subtree: true,
            attributeFilter: ['style']
        });

        // Удаление стиля pointer-events: none с body при загрузке
        if (document.body.style.pointerEvents === 'none') {
            document.body.style.pointerEvents = '';
        }

        return () => {
            document.removeEventListener('click', blockFileDownload);
            observer.disconnect();
            document.createElement = originalCreateElement;
        };
    }, []);

    return (
        <Router>
            <AuthProvider>
                <div className="container">
                    <Header />
                    <Routes>
                        <Route path="/" element={<Main />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path="/my" element={<PrivateRoute><Portfolio /></PrivateRoute>} />
                        <Route path="/history" element={<PrivateRoute><Transactions /></PrivateRoute>} />
                        <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
                    </Routes>
                    <Footer />
                </div>
            </AuthProvider>
        </Router>
    );
}

function PrivateRoute({ children }) {
    const { user } = useAuth(); // Использование хука useAuth для доступа к пользователю

    // Проверяем, аутентифицирован ли пользователь
    if (!user) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        return <Navigate to="/login" replace />;
    }

    // Если пользователь аутентифицирован, отображаем защищенный компонент
    return children;
}

export default App;
