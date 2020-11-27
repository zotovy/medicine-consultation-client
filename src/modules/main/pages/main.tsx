import React, { Fragment } from 'react';
import { observer } from "mobx-react";
import "../styles.scss";
import Title from "../../../components/title";
import Doctor from "../../doctors/components/symptoms/doctor-slide";

const MainPage: React.FC = () => {
return <>
  <section className="main-wrapper sc--pre-sect">
    <div className="main-container-pre-sect">
      <article className="pre-sect__left">
        <p className="pre-sect-text__1">Плохо себя чувствуете?</p>
        <p className="pre-sect-text__2">Запишитесь на медицинскую<br />онлайн консультацию!</p>
        <p className="pre-sect-text__1">Индивидуальный видео чат c доктором</p>
        <div className="pre-sect__online-counter-wrap">
          <div className="doctor_img"></div>
          <span className="counter_info">{`🤷 врачей онлайн`}</span>
        </div>
        <div className="btn-link btn-link__appoint">Записаться</div>
      </article>
      <article className="pre-sect__right"></article>
    </div>
  </section>

  <section className="main-wrapper sc--symptoms">
    <div className="main-container-symptoms">
      <Title title="Что вас беспокоит" mark="?" />
      <article className="symptoms-list-items">
        <div className="item">
          <div className="item__wrap-img">
            <div className="item-img symp--headache"></div>
          </div>
          <p>Головная<br />боль</p>
        </div>
        <div className="item">
          <div className="item__wrap-img">
            <div className="item-img symp--cough"></div>
          </div>
          <p>Боль в<br />горле</p>
        </div>
        <div className="item">
          <div className="item__wrap-img">
            <div className="item-img symp--rhinitis"></div>
          </div>
          <p>Насморк</p>
        </div>
        <div className="item">
          <div className="item__wrap-img">
            <div className="item-img symp--toothach"></div>
          </div>
          <p>Зубная<br />боль</p>
        </div>
        <div className="item">
          <div className="item__wrap-img">
            <div className="item-img symp--temp"></div>
          </div>
          <p>Простуда</p>
        </div>
      </article>
    </div>
  </section>

  <section className="main-wrapper sc--about-us">
    <div className="main-container-about-us">
      <article className="about-us__left">
        <p className="about-us__title">Горы здоровья</p>
        <p className="about-us__text about-us__text-p1">А этот блок в деталях описывает о работе сервиса.<br />Сюда можно записать много
          текста и все хорошо<br />описать, но сильно нужно уложиться в 5 строчек.<br />Если мы не уложимся в это
          количество, то это не <br />будет так красиво выглядеть. </p>
        <p className="about-us__text about-us__text-p2">Можно еще тут небольшой абзац на 1-2 строки <br />поставить, он неплохо тут
          смотрится. </p>
        <div className="about-us__list">
          <ul>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                <g id="Сгруппировать_213" data-name="Сгруппировать 213" transform="translate(-140 -2066)">
                  <circle id="Эллипс_20" data-name="Эллипс 20" cx="22.5" cy="22.5" r="22.5"
                    transform="translate(140 2066)" fill="#30b9d6" />
                  <path id="Icon_material-done" data-name="Icon material-done"d="M13.5,24.3,7.2,18,5.1,20.1l8.4,8.4,18-18L29.4,8.4Z" transform="translate(143.9 2069.6)"fill="#fff" />
                </g>
              </svg>
              <span>Тут пишем какое-то качество, чем мы гордимся</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                <g id="Сгруппировать_213" data-name="Сгруппировать 213" transform="translate(-140 -2066)">
                  <circle id="Эллипс_20" data-name="Эллипс 20" cx="22.5" cy="22.5" r="22.5"
                    transform="translate(140 2066)" fill="#30b9d6" />
                  <path id="Icon_material-done" data-name="Icon material-done"d="M13.5,24.3,7.2,18,5.1,20.1l8.4,8.4,18-18L29.4,8.4Z" transform="translate(143.9 2069.6)"fill="#fff" />
                </g>
              </svg>
              <span>Например тут можно сказать что все качественно</span>
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45">
                <g id="Сгруппировать_213" data-name="Сгруппировать 213" transform="translate(-140 -2066)">
                  <circle id="Эллипс_20" data-name="Эллипс 20" cx="22.5" cy="22.5" r="22.5"
                    transform="translate(140 2066)" fill="#30b9d6" />
                  <path id="Icon_material-done" data-name="Icon material-done"d="M13.5,24.3,7.2,18,5.1,20.1l8.4,8.4,18-18L29.4,8.4Z" transform="translate(143.9 2069.6)"fill="#fff" />
                </g>
              </svg>
              <span>А еще все очень безопасно и круто</span>
            </li>
          </ul>
        </div>
      </article>
      <article className="about-us__right"></article>
    </div>
  </section>

  <section className="main-wrapper sc--benefits">
    <div className="main-container-benefits">
      <Title title="Почему Горы Здоровья" mark="?" />
      <h3 className="symptoms-subtitle">Сервис позволяет получать качественные медицинские консультации в любое <br/> удобное для Вас время, из любого места, на любом устройстве. </h3>
      <article className="benefits-list-items">
        <div className="item">
            <div className="item-img">
            </div>
          <p>В Любое Время</p>
        </div>
        <div className="item">
          <div className="item-img">
            
          </div>
          <p>В Любом месте</p>
        </div>
        <div className="item">
          <div className="item-img">
            
          </div>
          <p>Лучшие Врачи</p>
        </div>
        <div className="item">
          <div className="item-img">

          </div>
          <p>Доступно на любом<br/>устройстве</p>
        </div>
      </article>
    </div>
  </section>
  <section className="main-wrapper sc--hiw">
    <div className="main-container-hiw">
      <Title title="Как это Работает" mark="?" />
      <div className="hiw-list-items">
        <article className="hiw-list-item hiw-list-item-left">
          <div className="container-info__left">
            <div className="step-block">ШАГ 1</div>
            <p className="hiw-sect-text__1 hiw-sect-text__1-1">Выберите подходящего<br/>врача из каталога врачей</p>
            <p className="hiw-sect-text__2 hiw-sect-text__2-1">Наши врачи - настоящие мастера своего дела. Вы можете выбрать любого подходящего врача, просмотрев его рейтинг, почитав его отзывы и изучить детальную информацию на его личной странице. А чтобы выбор проходил еще более удобным вы можете воспользоваться фильтром</p>
            <div className="btn-link btn-link__catalog">Найти врача</div>
          </div>
          <div className="hiw-sect__right">
            <div className="rnd-doctor-center"><Doctor id='' name="Олег" surname="Олегов" imgUrl={`https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg`} rating={4.5} speciality="Клоун" /></div>
            <div className="rnd-doctor-left"><Doctor id='' name="Кирилл" surname="Кириллов" imgUrl={`https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg`} rating={4.5} speciality="Кто" /></div>
            <div className="rnd-doctor-right"><Doctor id='' name="Анастасия" surname="Садаева" imgUrl={`https://www.epos-ural.ru/wp-content/uploads/2019/03/user-placeholder.jpg`} rating={4.5} speciality="Клоун" /></div>
          </div>
        </article>

        <article className="hiw-list-item hiw-list-item-right">
        </article>

        <article className="hiw-list-item hiw-list-item-left">
        </article>
      </div>
    </div>
  </section>
</>
}

export default observer(MainPage);