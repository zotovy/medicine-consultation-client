import React, { useEffect } from "react";
import Menu from "@/components/menu";
import { useRouter } from "next/router";
import NavigationComponent from "../components/navigation";

const SettingsPage: React.FC = () => {

    const router = useRouter();
    useEffect(() => {
        if (window.window.screen.width > 768) {
            router.push("/settings/account");
        }
    }, []);

    return <React.Fragment>
        <Menu/>
        <main className="main-page settings-page">
            <NavigationComponent active="/" alwaysActive={true}/>
            <section className="content"/>
        </main>
    </React.Fragment>

}

export default SettingsPage;