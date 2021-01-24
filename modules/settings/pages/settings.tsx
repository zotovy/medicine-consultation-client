import React, { useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Menu from "@/components/menu";
import NavigationComponent from "../components/navigation";

const SettingsPage: NextPage = () => {
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