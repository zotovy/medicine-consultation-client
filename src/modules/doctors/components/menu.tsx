import React, { useEffect } from "react";
import { observer } from "mobx-react";
import "./styles.scss";

import logo from "../../../static/logo.svg";
import { Link, withRouter } from "react-router-dom";

let lastLocation = '/';

const Menu: React.FC = (props: any) => {

    let selected = "/"

    if (props.location !== lastLocation) {
        selected = props.location.pathname;
    }

    console.log(selected);

    return <menu>
        <Link to="/">
            <div className="name">
                <img src={logo} alt="Лого" />
                <h3>Горы Здоровья</h3>
            </div>
        </Link>
        <div className="tabs">
            <input id="menu__toggle" type="checkbox" />
            <label className="menu__btn" >
                <span></span>
            </label>
            {/* <div className="menu"> */}
            {/* </div> */}
            <div className="links">
                <Link to="/consulations">
                    <div className={"tab " + (selected === "/consultation" ? "selected" : "")}>
                        <span className="link">Консультации</span>
                        <div className="circle"></div>
                    </div>
                </Link>
                <Link to="/sympthoms">
                    <div className={"tab " + (selected === "/sympthoms" ? "selected" : "")}>
                        <span className="link">Симптомы</span>
                        <div className="circle"></div>
                    </div>
                </Link>
                <Link to="/find-doctor">
                    <div className={"tab " + (selected === "/find-doctor" ? "selected" : "")}>
                        <span className="link ">Врачи</span>
                        <div className="circle"></div>
                    </div>
                </Link>
            </div>
        </div>
        <div className="profile">

        </div>
    </menu>
}

export default withRouter(observer(Menu));