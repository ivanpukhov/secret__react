import React, { useState, useEffect, useRef } from 'react';
import logo from '../assets/img/logo.svg';
import { Link } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from "@mui/icons-material/Close";
import Logout from "./Logout";

const Header = () => {
    const [isBurgerVisible, setBurgerVisible] = useState(false);
    const burgerRef = useRef(null);

    const toggleBurger = () => {
        setBurgerVisible(!isBurgerVisible);
    };

    const handleClickOutside = (event) => {
        if (burgerRef.current && !burgerRef.current.contains(event.target)) {
            setBurgerVisible(false);
        }
    };

    const handleSwipe = (event) => {
        if (event.touches[0].clientX > window.innerWidth / 2) {
            setBurgerVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('touchstart', handleSwipe);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('touchstart', handleSwipe);
        };
    }, []);

    return (
        <>
            <header className="header">
                <div className="header__left">
                    <Link to="/" className="header__logo" onClick={toggleBurger}>
                        <div className="header__logo-img">
                            <img src={logo} alt="Logo"/>
                        </div>
                        <div className="header__logo-text">N<span>ote</span>N<span>et</span></div>
                    </Link>
                    <ul className="header__menu">
                        <Link to='/' onClick={toggleBurger}>Главная</Link>
                        <Link to='/' onClick={toggleBurger}>Правила</Link>
                        <Link to='/shop' onClick={toggleBurger}>Биржа</Link>
                        <Link to='/' onClick={toggleBurger}>Безопасность</Link>
                    </ul>
                </div>
                <div className="header__right">
                    <ul className="header__menu">
                        <Link to='/login' onClick={toggleBurger}>Личный кабинет</Link>
                        <Link className='dd' to='/' onClick={toggleBurger}>Поддержка</Link>
                    </ul>
                    <div className="header__mb" onClick={toggleBurger}>
                        <MenuIcon fontSize="large"/>
                    </div>
                </div>
            </header>
            <div ref={burgerRef} className={`burger ${isBurgerVisible ? 'show' : 'hide'}`}>
                <div className="burger__close" onClick={toggleBurger}>
                    <CloseIcon fontSize='large'/>
                </div>
                <div className="burger__top">
                    <Link to='profile' className="burger__item" onClick={toggleBurger}>Личный кабинет</Link>
                    <Link to='/shop' className="burger__item" onClick={toggleBurger}>Биржа</Link>
                    <Link to='/my' className="burger__item" onClick={toggleBurger}>Мой портфель</Link>
                    <Link to='/history' className="burger__item" onClick={toggleBurger}>История транзакция</Link>
                    <Link to='/'  className="burger__item" onClick={toggleBurger}>Главная страница</Link>
                </div>
                <div className="burger__bottom">
                    <Logout onClick={toggleBurger}/>
                </div>
            </div>
            <style jsx>{`
              .burger {
                display: none;
                position: fixed;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba(0,0,0,0.5);
                z-index: 1000;
                flex-direction: column;
              }

              .burger.show {
                display: flex;
              }

              .burger__close {
                align-self: flex-end;
              }
            `}</style>
        </>
    );
}

export default Header;
