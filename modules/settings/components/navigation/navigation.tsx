import React from "react";
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
import { useWindowWidth } from "@react-hook/window-size";
import styled from "styled-components";

type Props = {
    active: string
    alwaysActive?: boolean
}

let titles: string[] = ["Аккаунт", "Консультации", "Отзывы", "Уведомления", "Пароль", "Поддержка", "Баланс"];
let paths: string[] = ["/account", "/consultations", "/reviews", "/notifications", "/password", "/support", "/balance"]
let icons: React.FC[] = [AccountIcon, ConsultationIcon, ReviewsIcon, NotificationIcon, PasswordIcon, SupportIcon, BalanceIcon];

const Navigation = styled.div`
    position: fixed;
    left: 25px;
    width: 190px;
    display: flex;
    flex-direction: column;
    top: 130px;

    @media screen and (min-width: 1100px) {
        left: calc((100vw - 1100px) / 2)
    }

    // Phone
    @media screen and (max-width: 425px) {
        left: 16px;
        top: 100px;
        width: 100%;
    }

    .item {
        cursor: pointer;
        display: flex;
        align-items: center;
        margin-bottom: 20px;

        .icon {
            margin-right: 25px;
            width: 27px;
            height: 27px;
            display: flex;
            align-items: center;

            svg {
                width: 27px;
                height: 27px;
            }
        }

        span.tabName {
            font-size: 18px;
            color: rgba(#282828, 0.9);
        }

        &.active {
            path {
                fill: #30B9D6 !important;
            }

            span.tabName {
                color: #282828;
                font-weight: 500;
            }
        }
    }
`;

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
    const width = useWindowWidth() ?? 1920;

    if (!alwaysActive && width < 1024) return <div/>

    return <Navigation className={'123'}>
            {
                paths.map((e, i) => {
                    return <NavigationItem i={i} isActive={e === active }/>
                })
            }

            <div className="item" onClick={onExit}>
                <span className="icon"> <LogoutIcon/> </span>
                <span className="tab-name">Выйти</span>
            </div>
    </Navigation>;
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
