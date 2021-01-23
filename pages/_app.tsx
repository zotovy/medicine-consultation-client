import App, { AppContext } from "next/app";
import Head from "next/head";
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
        return <Provider {...this.state}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Some title)</title>
            </Head>
            <Component {...pageProps} />
        </Provider>;
    }
}

export default MyApp;