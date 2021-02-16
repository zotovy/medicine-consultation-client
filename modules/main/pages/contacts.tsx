import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import styled from "styled-components";

import Menu from "@/components/menu";
import { centerPageContent } from "@/static/mixins";
import { InstagramIcon, VkIcon } from "@/static/icons";

const Page = styled.main`
    ${centerPageContent};
    max-width: 1000px;

    h1 {
        font-size: 48px;
        font-weight: 500;
        line-height: 1.23;
        letter-spacing: normal;
        text-align: left;
        color: #282828;
    }

    .group {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 175px;
        row-gap: 30px;
        
        &#group-1 {
            margin-top: 30px;
        }
        
        &#group-2 {
            margin-top: 70px;
        }

        .item {
            display: flex;
            flex-direction: column;

            span.field-name {
                font-size: 18px;
                line-height: 1.17;
                text-align: left;
                color: #a3a3a3;
                padding-bottom: 3px;
            }

            span.value, a.value {
                font-size: 24px;
                line-height: 1.21;
                text-align: left;
                color: #282828;
            }
        }
    }
    
    .social-medias {
        display: flex;
        align-items: center;
        margin-top: 50px;
        
        svg {
            width: 32px;
        }
        
        a {
            margin-right: 30px;
        }
    }
`;

const ContactsPage: NextPage = () => {
    return <React.Fragment>
        <Head>
            <title>Контакты</title>
        </Head>
        <Menu/>
        <Page>
            <h1>Контакты</h1>
            
            <div className="group" id="group-1">
                <div className="item">
                    <span className="field-name">Телефон</span>
                    <a className="value" href="tel:+79323327350">+7 (932) 33-27-350 </a>
                </div>
                <div className="item">
                    <span className="field-name">Email</span>
                    <a className="value" href="mailto:gory.zdorovya@yandex.ru">gory.zdorovya@yandex.ru</a>
                </div>
                <div className="item">
                    <span className="field-name">Почтовый адрес</span>
                    <a
                            className="value"
                            href="https://www.google.com/maps/place/Ulitsa+Lenina,+62,+Perm,+Permskiy+kray,+614006/@58.0092976,56.2306556,17z/data=!4m5!3m4!1s0x43e8c725d3135f55:0x60b0f0d3af7e67b1!8m2!3d58.00938!4d56.231825"
                            target="_blank">
                        Россия, г. Пермь, ул. Ленина 62 &nbsp; 616000
                    </a>
                </div>
            </div>

            <div className="group" id="group-2">
                <div className="item">
                    <span className="field-name">Юр. Лицо</span>
                    <span className="value">Иван Иванов Иванович</span>
                </div>
                <div className="item">
                    <span className="field-name">ИНН</span>
                    <a className="value">1234567891011</a>
                </div>
                <div className="item">
                    <span className="field-name">ОГРН</span>
                    <span className="value">1234567890101</span>
                </div>
            </div>
            
            <div className="social-medias">
                <a href="https://vk.com/goryzdorovya" target="_blank"><VkIcon/></a>
                <a href="https://www.instagram.com/gory_zdorovya/" target="_blank"><InstagramIcon/></a>
            </div>
        </Page>
    </React.Fragment>;
}

export default ContactsPage;
