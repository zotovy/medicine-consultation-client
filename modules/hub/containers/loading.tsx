import React from "react";
import Head from "next/head";
import Menu from "@/components/menu";
import { LoadingIndicator } from "@/components/loading-indicator";
import PageLayout from "@/modules/hub/components/page-layout";

export type Props = {
    title?: string
}

const LoadingContainer: React.FC<Props> = ({ title }) => {
    return <React.Fragment>
        <Head>
            <title>{ title }</title>
        </Head>
        <Menu/>

        <PageLayout>
            <div className="loading">
                <LoadingIndicator/>
            </div>
        </PageLayout>
    </React.Fragment>
}

export default LoadingContainer;
