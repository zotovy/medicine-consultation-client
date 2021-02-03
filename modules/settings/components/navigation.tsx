import React from 'react';
import { useRouter } from "next/router";
import {
    AccountIcon,
    BalanceIcon,
    ConsultationIcon,
    DoctorIcon,
    LinkIcon,
    LogoutIcon,
    NotificationIcon,
    PasswordIcon,
    ReviewsIcon,
    SupportIcon
} from "@/static/icons";
import tokenServices from "@/services/token-services";
import StorageServices from "@/services/storage_services";
// import { useWindowWidth } from "@react-hook/window-size";

type Props = {
    active: string
    alwaysActive?: boolean
}

let titles: string[] = ["Аккаунт", "Консультации", "Отзывы", "Уведомления", "Пароль", "Поддержка", "Баланс"];
let paths: string[] = ['/account', "/consultations", "/reviews", "/notifications", "/password", "/support", "/balance"]
let icons: React.FC[] = [AccountIcon, ConsultationIcon, ReviewsIcon, NotificationIcon, PasswordIcon, SupportIcon, BalanceIcon];

const NavigationComponent: React.FC<Props> = ({ active, alwaysActive }) => {

    const isUser = typeof window === "undefined"
        ? true
        : localStorage.getItem("isUser") === "true";

    if (!isUser) {
        titles = [...titles.slice(0, 4), "Ссылки", "Доктор", "Пароль", "Поддержка", "Баланс"];
        paths = [...paths.slice(0, 4), "/links", "/doctor", "/password", "/support", "/balance"];
        icons = [...icons.slice(0, 4), LinkIcon, DoctorIcon, PasswordIcon, SupportIcon, BalanceIcon];
    }

    const router = useRouter();
    const onExit = () => {
        tokenServices.logout();
        StorageServices.removeUser();
        router.push("/");
    }
    const width = 1920;

    if (!alwaysActive && width < 1024) return <React.Fragment/>

    return <div className="navigation">
            {
                paths.map((e, i) => {
                    return <NavigationItem i={i} isActive={e === active }/>
                })
            }

            <div className="item" onClick={onExit}>
                <span className="icon"> <LogoutIcon/> </span>
                <span className="tab-name">Выйти</span>
            </div>
        </div>;
}

const NavigationItem: React.FC<{ i: number, isActive: boolean, }> = ({ isActive, i }) => {
    const router = useRouter();
    const Icon = icons[i];
    return <div className={`item ${isActive ? "active" : ""}`} onClick={() => router.push(`/settings${paths[i]}`)}>
        <span className="icon">
            <Icon/>
        </span>
        <span className="tab-name">{titles[i]}</span>
    </div>
}

export default NavigationComponent;