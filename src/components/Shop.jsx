import React, {useState} from 'react';
import axios from 'axios';
import sh from '../assets/img/shop.png';
import Swal from 'sweetalert2';

function Shop() {
    const [totalPrice, setTotalPrice] = useState('');

    const sendRequest = async () => {
        if (totalPrice % 5000 !== 0) {
            Swal.fire({
                icon: 'error',
                title: 'Неверная сумма',
                text: 'Сумма должна быть кратна 5000',
            });
            return;
        }

        try {
            const result = await axios.post('http://5.35.85.52:3001/api/bundles', {
                totalPrice: Number(totalPrice)
            }, {
                withCredentials: true
            });
            Swal.fire({
                icon: 'success',
                title: 'Успешно',
                text: 'Счет успешно выставлен',
            });
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Ошибка',
                text: `Ошибка: ${error.message}`,
            });
        }
    };

    return (
        <div className='shop'>
            <h2>Биржа музыки</h2>
            <div className="shop__block">
                <div className="shop__block--left">
                    <h3>Купить </h3>
                    <p>Здесь вы можете приобрести эксклюзивные права на музыку от сервиса NoteNet</p>
                    <p>Цена 1 музыкального файла 5000. Введите сумму, кратную 5000 тенге</p>
                    <div className="form">
                        <input
                            type="number"
                            value={totalPrice}
                            onChange={e => setTotalPrice(e.target.value)}
                            placeholder="Введите сумму"
                        />
                        <button onClick={sendRequest}>Выставить счет</button>

                    </div>
                </div>
                <div className="shop__block--right">
                    <img src={sh} alt=""/>
                </div>
            </div>
        </div>
    );
}

export default Shop;
