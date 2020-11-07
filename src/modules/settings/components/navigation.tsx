import React from 'react';
import { useHistory } from "react-router-dom";
import { AccountIcon, ConsultationIcon, LogoutIcon, NotificationIcon, PasswordIcon, ReviewsIcon } from "../icons";

type Props = {
    active: number
}

const icons: React.FC[] = [AccountIcon, ConsultationIcon, ReviewsIcon, NotificationIcon, PasswordIcon];
const titles: string[] = ["Аккаунт", "Консультация", "Отзывы", "Уведомления", "Пароль"];
const paths : string[] = ['/account', "/consultation", "/reviews", "/notifications", "/password"]

const NavigationComponent: React.FC<Props> = ({ active }) => {
    return <div className="navigation">
        {
            titles.map((_, i) => {
                return <NavigationItem i={i} isActive={i == active}/>
            })
        }

        <div className="item">
        <span className="icon"> <LogoutIcon/> </span>
            <span className="tab-name">Выйти</span>
        </div>
    </div>
};

const NavigationItem: React.FC<{ i: number, isActive: boolean, }> = ({ isActive, i }) => {
    const history = useHistory();
    const Icon = icons[i];
    return <div className={`item ${isActive ? "active" : ""}`} onClick={() => history.push(`/settings${paths[i]}`)}>
        <span className="icon">
            <Icon/>
        </span>
        <span className="tab-name">{titles[i]}</span>
    </div>
}

export default NavigationComponent;