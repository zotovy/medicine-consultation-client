import React from "react";
import { observer } from "mobx-react";
import MediaQuery from "react-responsive";

import { Link, withRouter } from "react-router-dom";
import storageServices from "../services/storage_services";
import tokenServices from "../services/token-services";
import logo from "../static/logo.svg";
import userPlaceholder from "../static/images/user-placeholder.jpg";
import "./styles/burger-menu.scss";

let lastLocation = '/';

const Menu: React.FC = (props: any) => {

    let selected = "/"

    if (props.location !== lastLocation) {
        selected = props.location.pathname;
    }

    const user = storageServices.getUser();

    if (user && (!user?.photoUrl || user.photoUrl.length == 0)) user.photoUrl = userPlaceholder;

    const profileImgUrl = {
        backgroundImage: `url(${user?.photoUrl})`,
    };

    return <menu>
        <Link to="/">
            <div className="name">
                <img src={logo} alt="Лого" />
                <h3>Горы Здоровья</h3>
            </div>
        </Link>
        <div className="tabs">
            <div className="links">
                <Link to="/consultations">
                    <div className={"tab " + (selected === "/consultation" ? "selected" : "")}>
                        <span className="link">Консультации</span>
                        <div className="circle"/>
                    </div>
                </Link>
                <Link to="/symptoms">
                    <div className={"tab " + (selected === "/symptoms" ? "selected" : "")}>
                        <span className="link">Симптомы</span>
                        <div className="circle"/>
                    </div>
                </Link>
                <Link to="/find-doctor">
                    <div className={"tab " + (selected === "/find-doctor" ? "selected" : "")}>
                        <span className="link ">Врачи</span>
                        <div className="circle"/>
                    </div>
                </Link>
            </div>
        </div>

        <MediaQuery minWidth={769}>
            {
                tokenServices.isLogin()
                    ? <Link to="/settings/account">
                        <div className="profile">
                            <div className="photo" style={profileImgUrl}/>
                            <span className="span-name">{getName(user)}</span>
                        </div>
                    </Link>
                    : <div className="auth">
                        <Link to="/login">
                            <button className="login">Войти</button>
                        </Link>

                        <Link to="/signup">
                            <button className="signup">Регистрация</button>
                        </Link>
                    </div>
            }
        </MediaQuery>


        <MediaQuery maxWidth={768}>
            <div className="hamburger-menu">
                <input id="menu__toggle" type="checkbox" />
                <label className="menu__btn" >
                    <span/>
                </label>
                <ul className="menu__box">
                    <Link to="/consulations">
                        <div className={"tab " + (selected === "/consultation" ? "selected" : "")}>
                            <span className="link">Консультации</span>
                            <div className="circle"/>
                        </div>
                    </Link>
                    <Link to="/symptoms">
                        <div className={"tab " + (selected === "/symptoms" ? "selected" : "")}>
                            <span className="link">Симптомы</span>
                            <div className="circle"/>
                        </div>
                    </Link>
                    <Link to="/find-doctor">
                        <div className={"tab " + (selected === "/find-doctor" ? "selected" : "")}>
                            <span className="link ">Врачи</span>
                            <div className="circle"/>
                        </div>
                    </Link>
                </ul>
            </div>
        </MediaQuery>
    </menu>
}

const getName = (user : UserType | null) : string => {
    if (!user) return "";
    let name = "";
    if (user.name) name += user.name + " ";
    if (user.surname) name += user.surname;
    return name;
};

export default withRouter(observer(Menu));