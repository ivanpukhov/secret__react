import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3001/api/transactions/user', {withCredentials: true})
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Ошибка при получении данных:', error);
            });
    }, []);

    return (
        <div>
            {transactions.length > 0 ? (
                transactions.map(transaction => (
                    <div key={transaction._id}>
                        <h3>{transaction.type}</h3>
                        <p>ID связки: {transaction.bundleId}</p>
                        <p>Сумма: {transaction.amount}</p>
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
