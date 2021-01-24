import App, { AppContext } from "next/app";
import Head from "next/head";
import React from "react";
import { InversifyProvider, getContainer } from "../container";
import "../styles.scss";

class MyApp extends App {

    // Fetching serialized(JSON) store state
    static async getInitialProps(appContext: AppContext) {
        const appProps = await App.getInitialProps(appContext);

        return {
            ...appProps,
        };
    }

    render() {
        const { Component, pageProps } = this.props;
        return <InversifyProvider container={getContainer()}>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Some title)</title>
            </Head>
                <Component {...pageProps} />
        </InversifyProvider>;
    }
}

export default MyApp;