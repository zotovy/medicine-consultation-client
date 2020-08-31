import React, { useState } from 'react';
import "./styles/burger-menu.scss";

type Props = {
    children: any;
    isOpen: boolean;
}

const BurgerMenu: React.FC<Props> = (props: Props) => {

    const [open, setOpen] = useState(false);

    return <React.Fragment>
        {/* <div className="hamburger-menu">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" >
                <span></span>
            </label>
            <ul className="menu__box">
                <li><a className="menu__item" href="#">Главная</a></li>
                <li><a className="menu__item" href="#">Проекты</a></li>
                <li><a className="menu__item" href="#">Команда</a></li>
                <li><a className="menu__item" href="#">Блог</a></li>
                <li><a className="menu__item" href="#">Контакты</a></li>
            </ul>
        </div> */}
    </React.Fragment >
}

export default BurgerMenu;