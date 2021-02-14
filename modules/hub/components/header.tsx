import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { ChevronRight } from "@/static/icons";

const Container = styled.div`
    display: flex;
    flex-direction: column;

    .main-row {
        display: flex;
        justify-content: space-between;
        width: 100%;

        h3 {
            color: #282828;
            font-size: 24px;
            line-height: 27px;
            font-weight: 500;
        }

        span.back {
            color: #30B9D6;
            font-size: 18px;
            cursor: pointer;
        }
    }

    span.subtitle {
        padding-top: 15px;
        font-size: 18px;
        color: #282828;
    }

    .mobile-empty-space, .mobile-back {
        display: none;
    }

    @media screen and (max-width: 768px) {

        span.back {
            display: none;
        }

        .mobile-empty-space, .mobile-back {
            display: block;
        }

        button.mobile-back {
            border: none;
            outline: none;
            background: none;
            transform: rotate(180deg);

            svg > path {
                stroke: #30B9D6;
            }
        }

        .main-row {
            flex-direction: row-reverse;

            h3 {
                font-size: 18px;
                text-align: center;
            }
        }

        span.subtitle {
            font-size: 15px;
            text-align: center;
        }
    }
    
    @media screen and (min-width: 768px) and (max-width: 960px) {

        h3 {
            font-size: 20px;
            text-align: center;
        }

        span.subtitle {
            font-size: 15px;
        }
    }
    
    @media screen and (max-width: 1440px) {
        padding: 0 20px;
    }
`;

export type Props = {
    title: string;
    subtitle?: string;
    back?: boolean;
}

const HeaderComponent: React.FC<Props> = (props) => {
    const router = useRouter();

    return <Container>
        <div className="main-row">
            <div className="mobile-empty-space"/>

            <h3>{props.title}</h3>

            {
                props.back
                        ? <span className="back" onClick={router.back}>Назад</span>
                        : <React.Fragment/>
            }

            {
                props.back
                        ? <button className="mobile-back" onClick={router.back}>
                            <ChevronRight/>
                        </button>
                        : <React.Fragment/>
            }

        </div>
        {
            props.subtitle
                    ? <span className="subtitle">{props.subtitle}</span>
                    : <React.Fragment/>
        }
    </Container>
}

export default HeaderComponent;
