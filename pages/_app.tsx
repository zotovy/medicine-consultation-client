import App, { AppContext } from "next/app";
import React from "react";
import { Provider } from "mobx-react";
import { getControllers } from "../store";
import "../styles.global.scss";

class MyApp extends App {
    state = getControllers();

    // Fetching serialized(JSON) store state
    static async getInitialProps(appContext: AppContext) {
        const appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return (
            <Provider {...this.state}>
                <Component {...pageProps} />
            </Provider>
        );
    }
}
export default MyApp;