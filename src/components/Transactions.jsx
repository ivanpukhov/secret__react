import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://5.35.85.52:3001/api/transactions/user', {withCredentials: true})
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <div className='history'>
            <h2>История выводов</h2>
            {transactions.length > 0 ? (
                transactions.map(transaction => (
                    <div key={transaction._id} className="history__item">

                        <h3>{transaction.type}</h3>
                        <p>ID связки: {transaction.bundleId}</p>
                        <p>Сумма: <b>{transaction.amount}</b> ₸</p>
                        <p>Дата транзакции: {new Date(transaction.transactionDate).toLocaleString()}</p>
                        <p>Статус: {transaction.status}</p>
                    </div>
                ))
            ) : (
                <p>Загрузка данных...</p>
            )}
        </div>
    );
}

export default Transactions;
