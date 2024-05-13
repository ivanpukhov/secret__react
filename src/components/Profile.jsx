import money from '../assets/img/money__profile.png'
import AddIcon from '@mui/icons-material/Add';
import {useEffect, useState} from "react";
import axios from "axios";
import Portfolio from "./Portfolio";
import plus from "../assets/img/plus.svg";
import {Link} from "react-router-dom";

const Profile = () => {
    const [profile, setProfile] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUnpaidBundles = async () => {
            try {
                const response = await axios.get('http://localhost:3001/api/user', {
                    withCredentials: true
                });
                setProfile(response.data);
                console.log(response.data);
            } catch (err) {
                setError('Ошибка при получении данных пользователя.');
                console.error(err);
            }
        };

        fetchUnpaidBundles();
    }, []);
    console.log(AddIcon)
    return (
        <div className='profile'>
            <div className="profile__top">
                <Link to='/shop' className="profile__btn">
                    <img src={plus} alt=""/>
                    <p>Купить музыку</p>
                </Link>

                <div className="profile__c">

                    <div className="profile__c-price">
                        {profile.totalValueOfBundles} ₸
                    </div>
                    <div className="profile__c-title">
                        Сумма вклада
                    </div>

                </div>
                <div className="profile__c">

                    <div className="profile__c-price">
                        {profile.totalRentalIncome} ₸
                    </div>
                    <div className="profile__c-title">
                        Ваши проценты
                    </div>
                </div>
            </div>


            <div className="profile__block">

                <Portfolio/>

                <div className="profile__item">
                    <div className="profile__item--text">
                        <div className="profile__item--text-title">
                            Список ваших транзакций
                        </div>
                        <div className="profile__item--text-link">
                            Перейти к истории
                        </div>
                    </div>
                    <div className="profile__item-img">
                        <img src={money} alt=""/>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Profile
