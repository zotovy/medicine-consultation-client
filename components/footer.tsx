import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { InstagramIcon, VkIcon } from "@/static/icons";

const Container = styled.footer`
    width: 100%;
    padding: 36px;
    border-top: solid 2px #f8f8f8;
    
    .content {
        margin: 0 auto;
        width: 100%;
        max-width: 1240px;
        display: flex;
        justify-content: space-between;
        
        h3.company {
            font-size: 24px;
            font-weight: 600;
            line-height: 1.17;
            color: #282828;
        }
        
        .column {
            display: flex;
            flex-direction: column;
            
            span, a {
                font-size: 16px;
                line-height: 1.25;
                color: #707070;
                margin-bottom: 8px;
                
                &.key {
                    font-weight: 600;
                }
            }

            .social-medias {
                display: flex;
                align-items: center;

                svg {
                    width: 30px;
                    margin-right: 20px;
                }
            }
        }
    }
`;

const Footer: React.FC = () => {
    return <Container>
        <div className="content">
            <h3 className="company">Горы Здоровья</h3>
            <div className="column">
                <span className="key">Компания</span>
                <Link href="/contacts"><a>Контакты</a></Link>
                <span>Лицензионное соглашение</span>
                <span>Политика конфиденциальности</span>
            </div>
            <div className="column">
                <span className="key">Докторам</span>
                <Link href="/signup"><a>Регистрация</a></Link>
                <Link href="/hub/doctor"><a>Консультации</a></Link>
            </div>
            <div className="column">
                <span className="key">Пациентом</span>
                <Link href="/signup"><a>Регистрация</a></Link>
                <Link href="/hub/user"><a>Консультация</a></Link>
            </div>
            <div className="column">
                <span className="key">Мы в сетях</span>
                <div className="social-medias">
                    <a href="https://vk.com/goryzdorovya" target="_blank"><VkIcon/></a>
                    <a href="https://www.instagram.com/gory_zdorovya/" target="_blank"><InstagramIcon/></a>
                </div>
            </div>
        </div>
    </Container>
}

export default Footer;
