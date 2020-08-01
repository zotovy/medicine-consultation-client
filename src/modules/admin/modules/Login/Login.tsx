import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import { reaction } from "mobx";
import { appLogo } from "../../settings";
import { login } from "../../translation";
import store from "../../store";

import "./login.scss";

const Login: React.FC = (props: any) => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    reaction(() => store.goToAdminTrigger, (data) => {
        history.push('/admin');
        console.log(data);
    });

    return <React.Fragment>

        {
            store.isLogin()
                ? <div className="container">
                    <div className="logo">
                        <img src={appLogo} alt="logo" />
                    </div>
                    <h1>{login.alreadyLogIn}@{store.username}</h1>

                    <div className="row">
                        <button className="bordered" onClick={store.logout} >{login.logout}</button>
                        <button onClick={() => store.goToAdminTrigger = !store.goToAdminTrigger} >{login.goBack}</button>
                    </div>
                </div>
                : <div className="container">
                    <div className="logo">
                        <img src={appLogo} alt="logo" />
                    </div>
                    <h1>{login.adminPanel}</h1>
                    <input type="username" id="username" placeholder={login.username} onChange={(e) => setUsername(e.target.value)} />
                    <input type="password" id="username" placeholder={login.password} onChange={(e) => setPassword(e.target.value)} />
                    <button onClick={() => store.login(username, password)} >{login.login}</button>
                    {
                        store.error ? <span className="errors">{store.error}</span> : <React.Fragment />
                    }
                </div>

        }

        <div className="powered-by">
            powered by <a href="https://github.com/zotovY/superadmin">superadmin</a>, created by <a href="https://github.com/zotovY">@zotovY</a>
        </div>

    </React.Fragment>
}

export default observer(Login);