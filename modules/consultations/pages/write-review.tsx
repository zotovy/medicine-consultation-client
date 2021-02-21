import React, { useEffect, useState } from "react";
import Head from "next/head";
import { observer } from "mobx-react";
import { NextPage } from "next";
import styled from "styled-components";
import { useRouter } from "next/router";
import { TYPES, useInjection } from "container";

import ReviewController from "@/modules/consultations/controllers/review-controller";
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

    section.loading-section {
        width: 100vw;
        height: calc(100vh - 70px);
        display: flex;
        justify-content: center;
        align-items: center;
    }

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
                
                &.selected path {
                    fill: #30B9D6;
                }
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
    const controller = useInjection<ReviewController>(TYPES.reviewController);
    const router = useRouter();

    const [isContentEmpty, setIsContentEmpty] = useState(true);

    useEffect(() => {
       if (typeof window !== "undefined") {
           controller.load(router.query.id as string);
       }
    }, []);

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
                        onChange={(v) => {
                            if (v.length !== 0 && isContentEmpty) setIsContentEmpty(false);
                            else if (v.length === 0) setIsContentEmpty(true);
                            controller.content = v;
                        }}
                        hint="Как прошла консультация?"
                        resize="vertical"
                        rows={15}
                        minHeight="150px"
                        maxHeight="500px"
                        maxLength={1024}/>

                <span className="field">Оценка</span>
                <div className="stars">
                    {
                        [1, 2, 3, 4, 5].map(e => {
                            return <FullStar
                                    className={ controller.point >= e ? "selected" : ""}
                                    id={`star-${e}`}
                                    key={`star-${e}`}
                                    onClick={() => controller.point = e}
                                    fill="#ccc"/>
                        })
                    }
                </div>

                <ConfirmButton
                        disabled={isContentEmpty}
                        onConfirm={async () => {
                            if (isContentEmpty) return;
                            await controller.saveReview();
                            await router.push("/");
                        }}
                        content="Оставить отзыв"/>
            </section>
        </Page>
    </React.Fragment>;
}

export default observer(WriteReviewPage);
