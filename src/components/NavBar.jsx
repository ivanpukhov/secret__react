import React, { useState } from 'react';
import invest from '../assets/img/invest.svg';
import money from '../assets/img/money.svg';
import safe from '../assets/img/safe.svg';
import birzha from '../assets/img/birzha.svg';
import into from '../assets/img/into.svg';
import save from '../assets/img/save.svg';

const navData = {
    exchange: [
        {
            icon: invest,
            text: "Биржа"
        },
        {
            icon: money,
            text: "Товары"
        },
        {
            icon: safe,
            text: "Условия"
        },
        {
            icon: birzha,
            text: "Связка"
        },
        {
            icon: into,
            text: "Вывод"
        },
        {
            icon: save,
            text: "Кошелек"
        }
    ],
    music: [
        {
            icon: into,
            text: "Плейлисты"
        },
        {
            icon: save,
            text: "Альбомы"
        }
    ]
};

function NavBar() {
    const [active, setActive] = useState('exchange');

    const handleItemClick = (newActive) => {
        setActive(newActive);
    }

    return (
        <nav className="nav">
            <div className="nav__header">
                <div className={`nav__header-item ${active === 'exchange' ? 'active' : ''}`} onClick={() => handleItemClick('exchange')}>Биржа</div>
                <div className={`nav__header-item ${active === 'music' ? 'active' : ''}`} onClick={() => handleItemClick('music')}>Музыка</div>
            </div>
            <div className="nav__container">
                {navData[active].map((item, index) => (
                    <div className="nav__container--item" key={index}>
                        <div className="icon">
                            <img src={item.icon} alt={item.text}/>
                        </div>
                        <div className="text">{item.text}</div>
                    </div>
                ))}
            </div>
        </nav>
    );
}

export default NavBar;
