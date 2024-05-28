import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetAppIcon from '@mui/icons-material/GetApp';
import Swal from 'sweetalert2';

function Portfolio() {
    const [portfolios, setPortfolios] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://nntnn.store/api/portfolios', {
                    withCredentials: true
                });
                setPortfolios(response.data.map(portfolio => ({
                    ...portfolio,
                    livePercentage: calculatePercentage(portfolio.totalPrice, portfolio.creationDate)
                })));
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(() => {
            setPortfolios(currentPortfolios => currentPortfolios.map(portfolio => ({
                ...portfolio,
                livePercentage: calculatePercentage(portfolio.totalPrice, portfolio.creationDate)
            })));
        }, 60000); // Обновление каждую минуту

        return () => clearInterval(intervalId); // Очистка таймера при размонтировании
    }, []);

    const calculatePercentage = (totalPrice, creationDate) => {
        const now = new Date();
        const creation = new Date(creationDate);
        const differenceInHours = Math.abs(now - creation) / 36e5; // Перевод миллисекунд в часы
        const periods = Math.floor(differenceInHours / 24); // Количество полных 24-часовых периодов
        return (totalPrice * 0.025 * periods).toFixed(2); // 2.5% от общей стоимости за каждый период
    };

    const handleWithdraw = async (id) => {
        try {
            const response = await axios.post(`https://nntnn.store/api/portfolios/bundles/${id}/withdraw-income`, {}, {withCredentials: true});
            Swal.fire('Успех', `Запрос на вывод процентов отправлен. Сумма: ${response.data.amount} ₸`, 'success');
        } catch (error) {
            Swal.fire('Ошибка', error.message, 'error');
        }
    };

    const handleSell = async (id) => {
        try {
            const response = await axios.post(`https://nntnn.store/api/portfolios/bundles/${id}/sell`, {}, {withCredentials: true});
            Swal.fire('Успех', `Запрос на продажу связки отправлен. Сумма: ${response.data.transaction.amount} ₸`, 'success');
        } catch (error) {
            Swal.fire('Ошибка', error.message, 'error');
        }
    };

    return (
        <div className='container__second my'>
            {portfolios.length > 0 ? (
                <div className="portfolio">
                    {portfolios.map((portfolio) => (
                        <div className='portfolio__item' key={portfolio._id}>
                            {/*<div className='portfolio__item--id'>*/}
                            {/*    {new Date(portfolio.creationDate).toLocaleDateString()}*/}
                            {/*</div>*/}
                            <div className='portfolio__item--price'>
                                <div className="left">
                                    Сумма: {portfolio.totalPrice} ₸ <br/>
                                    Проценты: {portfolio.livePercentage} ₸
                                </div>
                                <div className="right"><GetAppIcon color='#FFF'/></div>
                            </div>
                            <div className="portfolio__item--btns">
                                <div className="portfolio__item--btns-item" onClick={() => handleSell(portfolio._id)}>
                                    Продать связку
                                </div>
                                <div className="portfolio__item--btns-item" onClick={() => handleWithdraw(portfolio._id)}>
                                    Вывести проценты
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="history__item">Нет данных для отображения</div>
            )}
        </div>
    );
}

export default Portfolio
