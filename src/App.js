import './App.css';
import './assets/css/main.scss';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Shop from "./components/Shop";
import Login from "./components/Login";
import Profile from "./components/Profile";
import {AuthProvider, useAuth} from './AuthContext';
import Register from "./components/Register";
import React, {useEffect} from 'react';
import Portfolio from "./components/Portfolio";
import Transactions from "./components/Transactions";




function App() {
    useEffect(() => {
        const blockFileDownload = (e) => {
            const target = e.target;
            if (target.tagName === 'A' && target.href === 'https://flag-gimn.ru/wp-content/uploads/2021/09/Ukraina.mp3') {
                e.preventDefault();
            }
        };

        document.addEventListener('click', blockFileDownload);

        return () => {
            document.removeEventListener('click', blockFileDownload);
        };
    }, []);
    return (
        <Router>
            <AuthProvider>
                <div className="container">
                    <Header/>

                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>}/>
                        <Route path="/my" element={<PrivateRoute><Portfolio /></PrivateRoute>}/>
                        <Route path="/history" element={<PrivateRoute><Transactions /></PrivateRoute>}/>
                        <Route path="/shop" element={<PrivateRoute><Shop/></PrivateRoute>}/>
                    </Routes>
                    <Footer/>
                </div>
            </AuthProvider>
        </Router>
    );
}

function PrivateRoute({children}) {
    const {user} = useAuth(); // Использование хука useAuth для доступа к пользователю

    // Проверяем, аутентифицирован ли пользователь
    if (!user) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        return <Navigate to="/login" replace/>;
    }

    // Если пользователь аутентифицирован, отображаем защищенный компонент
    return children;
}

export default App;
