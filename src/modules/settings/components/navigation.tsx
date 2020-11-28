import React from 'react';
import { useHistory } from "react-router-dom";
import {
    AccountIcon,
    ConsultationIcon,
    LinkIcon,
    LogoutIcon,
    NotificationIcon,
    PasswordIcon,
    ReviewsIcon
} from "../icons";
import tokenServices from "../../../services/token-services";
import storageServices from "../../../services/storage_services";
import MediaQuery from "react-responsive";

type Props = {
    active: number
    alwaysActive?: boolean
}

let icons: React.FC[] = [AccountIcon, ConsultationIcon, ReviewsIcon, NotificationIcon, PasswordIcon];
let titles: string[] = ["Аккаунт", "Консультации", "Отзывы", "Уведомления", "Пароль"];
let paths: string[] = ['/account', "/consultations", "/reviews", "/notifications", "/password"]

const NavigationComponent: React.FC<Props> = ({ active, alwaysActive }) => {

    if (localStorage.getItem("isUser") === "false") {
        titles = [...titles.slice(0, 4), "Ссылки", "Пароль"];
        paths = [...paths.slice(0, 4), "/links", "/password"];
        icons = [...icons.slice(0, 4), LinkIcon, PasswordIcon];
    }

    const history = useHistory();
    const onExit = () => {
        tokenServices.logout();
        storageServices.removeUser();
        history.push("/");
    }

    return <MediaQuery minWidth={alwaysActive ? 0 : 425}>
    <div className="navigation">
            {
                titles.map((_, i) => {
                    return <NavigationItem i={i} isActive={i == active}/>
                })
            }

            <div className="item" onClick={onExit}>
                <span className="icon"> <LogoutIcon/> </span>
                <span className="tab-name">Выйти</span>
            </div>
        </div>
    </MediaQuery>
}

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