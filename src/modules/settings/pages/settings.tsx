import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import NavigationComponent from "../components/navigation";

const SettingsPage: React.FC = () => {

    const history = useHistory();
    useEffect(() => {
        if (window.window.screen.width > 768) {
            history.push("/settings/account");
        }
    }, []);

    return <main className="main-page settings-page">
        <NavigationComponent active="/" alwaysActive={true}/>
        <section className="content"/>
    </main>

}

export default SettingsPage;