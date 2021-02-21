import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import styled from "styled-components";

import Menu from "@/components/menu";
import TextArea from "@/components/textarea";
import ConfirmButton from "@/components/confirm-button";
import { FullStar } from "@/static/icons";

const Page = styled.main`
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    min-height: calc(100vh - 70px);

    section.container {
        width: 100%;
        max-width: 855px;

        h1 {
            font-size: 36px;
            font-weight: 500;
            line-height: 0.86;
            text-align: left;
            color: #282828;
            margin-bottom: 20px;
        }

        p.subtitle {
            font-size: 18px;
            font-weight: 400;
            color: #565656;
            margin-bottom: 20px;
        }

        textarea.text-area {
            margin-bottom: 30px !important;
        }

        span.field {
            font-size: 18px;
            color: #565656;
        }

        .stars {
            margin-top: 10px;
            margin-bottom: 30px;
            width: 210px;

            svg {
                cursor: pointer;
                height: auto;
                width: 42px;
                padding-right: 10px;
            }

            &:hover svg path {
                fill: #30B9D6;
            }
            
            svg:hover ~ svg > path {
                fill: #CCCCCC;
            }
        }
        
        .confirm-button {
            width: 335px;
        }
    }
`;

const WriteReviewPage: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Отзыв</title>
        </Head>
        <Menu/>

        <Page>
            <section className="container">
                <h1>Консультация завершена</h1>
                <p className="subtitle">Сейчас вы можете оценить работу доктора</p>

                <TextArea
                        hint="Как прошла консультация?"
                        resize="vertical"
                        rows={15}
                        minHeight="150px"
                        maxHeight="500px"/>

                <span className="field">Оценка</span>
                <div className="stars">
                    <FullStar id="star-1" fill="#ccc"/>
                    <FullStar id="star-2" fill="#ccc"/>
                    <FullStar id="star-3" fill="#ccc"/>
                    <FullStar id="star-4" fill="#ccc"/>
                    <FullStar id="star-5" fill="#ccc"/>
                </div>

                <ConfirmButton
                        onConfirm={() => {
                        }}
                        content="Оставить отзыв"/>
            </section>
        </Page>
    </React.Fragment>;
}

export default WriteReviewPage;
