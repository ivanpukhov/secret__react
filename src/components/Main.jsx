import NavBar from "./NavBar";

import moon from '../assets/img/moon.png'
import bank from '../assets/img/bank.png'
import procent from '../assets/img/procent.png'
import to_top from '../assets/img/to_top.png'
import bankomat from '../assets/img/bankomat.png'
import support from '../assets/img/support.png'
import arenda from '../assets/img/arenda.png'
import vkla from '../assets/img/vkla.png'
import tob from '../assets/img/tob.png'
import {Link} from "react-router-dom";

const Main = () => {
    return (
        <main >

            <section className="banner">
                <div className="banner__left">
                    <h1>NoteNet</h1>
                    <p>Откройте для себя мир, где музыка не только звучит, но и превращается в ценное вложение –
                        Notenet: ваш
                        портал в мир музыкальных инвестиций</p>
                    <div className="banner__btn">
                        Перейти в личный кабинет
                    </div>
                </div>
                <div className="banner__right">
                    <img src={moon} alt=""/>
                </div>
            </section>
            <div className="container__second">
                <NavBar />

                <section className="how" id='how-it-work'>
                    <h2> Как это работает? </h2>
                    <div className="how__container">
                        <div className="how__big">
                            <div className="how__big--item how__big--item-black">
                                <div className="how__big-img">
                                    <img src={bank} alt="" width="400" height="298"/>
                                </div>
                                <div className="how__text">
                                    <h3 className="how__text--big">Покупка музыкальных файлов</h3>
                                    <p className="how__text--small">
                                        Выбор музыки. Оплата и создание связки.
                                    </p>
                                </div>
                                <div className="how__btn"><Link to={'/shop'}>Купить музыку</Link></div>

                            </div>
                            <div className="how__big--item how__big--item-blue">
                                <div className="how__big-img">
                                    <img src={procent} alt="" width="400" height="298"/>
                                </div>
                                <div className="how__text">
                                    <h3 className="how__text--big">Аренда музыкальных файлов</h3>
                                    <p className="how__text--small">
                                        Получение пассивного дохода с аренды
                                    </p>
                                </div>
                                <div className="how__btn"><Link to="/profile">Сдать в аренду</Link></div>
                            </div>
                        </div>
                        <div className="how__small">
                            <div className="how__small--item">
                                <div className="how__big-img">
                                    <img src={moon} alt="" width="400" height="298"/>
                                </div>
                                <div className="how__text">
                                    <h3 className="how__text--big">Музыкальный портфель</h3>
                                    <p className="how__text--small">
                                        Получение пассивного дохода с аренды
                                    </p>
                                </div>
                                <div className="how__btn"><Link to="/profile">Личный кабинет</Link></div>
                            </div>
                            <div className="how__small--item">
                                <div className="how__big-img">
                                    <img src={procent} alt="" width="400" height="298"/>
                                </div>
                                <div className="how__text">
                                    <h3 className="how__text--big">Связка товаров</h3>
                                    <p className="how__text--small">
                                        Получение пассивного дохода с аренды
                                    </p>
                                </div>
                                <div className="how__btn"><Link to="/profile">Создать связку</Link></div>
                            </div>
                            <div className="how__small--item blue">
                                <div className="how__big-img">
                                    <img src={to_top} alt="" width="400" height="298"/>
                                </div>
                                <div className="how__text">
                                    <h3 className="how__text--big">Реферальная программа</h3>
                                    <p className="how__text--small">
                                        Получение пассивного дохода с аренды
                                    </p>
                                </div>
                                <div className="how__btn"><Link href="ref">Пригласить друга</Link></div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="support" id='support'>
                    <h2>Безопасность и прозрачность</h2>
                    <div className="support__container">
                        <div className="support__item">
                            <div className="support__item--text">
                                <h3>Безопасные транзакции</h3>
                                <p>Notenet обеспечивает простой и безопасный вывод средств.</p>
                            </div>
                            <div className="support__item--img">
                                <img src={bankomat} alt=""/>
                            </div>
                        </div>
                        <div className="support__item">
                            <div className="support__item--text">
                                <h3>Круглосуточная поддержка</h3>
                                <p>Наша поддержка поможет решить любую проблему в любое время.</p>
                            </div>
                            <div className="support__item--img">
                                <img src={support} alt=""/>
                            </div>
                        </div>
                        <div className="support__item">
                            <div className="support__item--text">
                                <h3>Точные расчеты </h3>
                                <p>Алгоритмы нашего сервиса тонко настроены и гарантируют четкую прибыль</p>
                            </div>
                            <div className="support__item--img">
                                <img src={arenda} alt=""/>
                            </div>
                        </div>
                        <div className="support__item">
                            <div className="support__item--text">
                                <h3>Ваши активы надежно защищены</h3>
                                <p>Мы гарантируем защиту нашей продукции и гарантируем сохранность ваших активов.</p>
                            </div>
                            <div className="support__item--img">
                                <img src={vkla} alt=""/>
                            </div>
                        </div>

                    </div>
                </section>
                <section className="start">
                    <div className="start__block">
                        <div className="start__left">
                            <div className="start__left--text">
                                <h2>Как сделать первый шаг?</h2>
                                <p>Для старта вам надо перейти на страницу биржи и создать первую музыкальную связку</p>
                            </div>
                            <div className="start__left--btn">Перейти на биржу</div>
                        </div>
                        <div className="start__right">
                            <img src={tob} alt="screen"/>
                        </div>
                    </div>
                </section>
                <section className="news">
                    <h2>Важные статьи</h2>
                    <div className="news__block">
                        <div className="news__item">
                            <div className="news__item--title">Как начать?</div>
                            <div className="news__item--text">В этой статье мы расскажем как дать старт своим
                                возможности в мире музыкальных инвестиций
                            </div>
                        </div>
                        <div className="news__item">
                            <div className="news__item--title">Условия использования сайтом</div>
                            <div className="news__item--text">Обязательно прочтите условия и правила пользования
                                сайтом
                            </div>
                        </div>
                        <div className="news__item">
                            <div className="news__item--title">Условия конфедициальности</div>
                            <div className="news__item--text">Также ознакомьтесь с условиями конфедициальности нашего
                                сервиса
                            </div>
                        </div>

                    </div>
                </section>

            </div>

        </main>
    )
}

export default Main
