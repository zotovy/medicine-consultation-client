import React from "react";
import "./styles/footer.scss";
import logo from "../static/logo.svg";
import { Link, withRouter } from "react-router-dom";

const Footer: React.FC = () => {
    return <div className="footer">
        <div className="footer-1cl">
            <Link className="footer__logo" to="/">
            <div className="name">
                <img src={logo} alt="Лого" />
                <h3>Горы Здоровья</h3>
            </div>
            </Link>
            <div className="copyright">© 2020</div>
        </div>
        <div className="footer-2cl">
            <ul className="footer__link-list">
                <li className="list-title">Компания</li>
                <Link to="#"><li>Сотрудничество</li></Link>
                <Link to="#"><li>Спонсорство</li></Link>
            </ul>
        </div>
        <div className="footer-3cl">
            <ul className="footer__link-list">
                <li className="list-title">Сервис</li>
                <Link to="/consultations"><li>Консультация</li></Link>
                <Link to="/sympthoms"><li>Симптомы</li></Link>
                <Link to="/find-doctor"><li>Врачи</li></Link>
                <Link to="#"><li>Блог</li></Link>
            </ul>
        </div>
        <div className="footer-4cl">
            <ul className="footer__link-list">
                <li className="list-title">Полезная информация</li>
                 <Link to="#"><li>Правила и Условия</li></Link>
                 <Link to="#"><li>Политика </li></Link>
            </ul>
        </div>
        <div className="footer-5cl">
            <ul className="footer__link-list">
                <li className="list-title">Контакты</li>
                <li className="socials">
                    <a href="https://www.facebook.com/">
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19.281" height="36" viewBox="0 0 19.281 36">
                                <path id="Icon_awesome-facebook-f" data-name="Icon awesome-facebook-f"d="M19.627,20.25l1-6.515H14.375V9.507c0-1.782.873-3.52,3.673-3.52h2.842V.44A34.658,34.658,0,0,0,15.846,0C10.7,0,7.332,3.12,7.332,8.769v4.965H1.609V20.25H7.332V36h7.043V20.25Z"transform="translate(-1.609)" fill="#fff" />
                            </svg>
                        </div>
                    </a>
                    <a href="https://linkedin.com/">
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="31.5" height="31.5" viewBox="0 0 31.5 31.5">
                                <path id="Icon_awesome-linkedin-in" data-name="Icon awesome-linkedin-in"d="M7.051,31.5H.52V10.47H7.051ZM3.782,7.6A3.8,3.8,0,1,1,7.564,3.783,3.814,3.814,0,0,1,3.782,7.6ZM31.493,31.5H24.976V21.263c0-2.44-.049-5.569-3.4-5.569-3.4,0-3.916,2.651-3.916,5.393V31.5H11.142V10.47h6.263v2.869H17.5a6.862,6.862,0,0,1,6.179-3.4c6.609,0,7.824,4.352,7.824,10.005V31.5Z"transform="translate(0 0)" fill="#fff" />
                            </svg>
                        </div>
                    </a>
                    <a href="https://twitter.com/">
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="29.238"viewBox="0 0 36 29.238">
                                <path id="Icon_awesome-twitter" data-name="Icon awesome-twitter"d="M32.3,10.668c.023.32.023.64.023.959,0,9.754-7.424,20.992-20.992,20.992A20.85,20.85,0,0,1,0,29.307a15.263,15.263,0,0,0,1.782.091,14.776,14.776,0,0,0,9.16-3.152,7.391,7.391,0,0,1-6.9-5.117,9.3,9.3,0,0,0,1.393.114,7.8,7.8,0,0,0,1.942-.251,7.379,7.379,0,0,1-5.916-7.241V13.66A7.431,7.431,0,0,0,4.8,14.6,7.389,7.389,0,0,1,2.513,4.728a20.972,20.972,0,0,0,15.213,7.721,8.329,8.329,0,0,1-.183-1.69A7.385,7.385,0,0,1,30.312,5.711a14.526,14.526,0,0,0,4.683-1.782,7.358,7.358,0,0,1-3.244,4.066A14.791,14.791,0,0,0,36,6.853a15.86,15.86,0,0,1-3.7,3.815Z"transform="translate(0 -3.381)" fill="#fff" />
                            </svg>
                        </div>
                    </a>
                    <a href='#'>
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40.103" height="31.8"viewBox="0 0 40.103 31.8">
                                <g id="Icon_feather-mail" data-name="Icon feather-mail" transform="translate(-0.948 -4.5)">
                                    <path id="Контур_78" data-name="Контур 78"d="M6.6,6H35.4A3.611,3.611,0,0,1,39,9.6V31.2a3.611,3.611,0,0,1-3.6,3.6H6.6A3.611,3.611,0,0,1,3,31.2V9.6A3.611,3.611,0,0,1,6.6,6Z"fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round"stroke-width="3" />
                                    <path id="Контур_79" data-name="Контур 79" d="M39,9,21,19.5,3,9" fill="none"stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" />
                                </g>
                            </svg>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/">
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="36.008" height="36"viewBox="0 0 36.008 36">
                                <path id="Icon_awesome-instagram" data-name="Icon awesome-instagram"d="M18,11.008a9.23,9.23,0,1,0,9.23,9.23A9.215,9.215,0,0,0,18,11.008Zm0,15.231a6,6,0,1,1,6-6,6.012,6.012,0,0,1-6,6ZM29.763,10.63A2.153,2.153,0,1,1,27.61,8.477,2.148,2.148,0,0,1,29.763,10.63Zm6.113,2.185c-.137-2.884-.8-5.438-2.908-7.543s-4.659-2.763-7.543-2.908c-2.972-.169-11.881-.169-14.853,0-2.876.137-5.43.8-7.543,2.9S.266,9.923.121,12.807c-.169,2.972-.169,11.881,0,14.853.137,2.884.8,5.438,2.908,7.543s4.659,2.763,7.543,2.908c2.972.169,11.881.169,14.853,0,2.884-.137,5.438-.8,7.543-2.908s2.763-4.659,2.908-7.543c.169-2.972.169-11.873,0-14.845Zm-3.84,18.034a6.075,6.075,0,0,1-3.422,3.422c-2.37.94-7.993.723-10.612.723s-8.25.209-10.612-.723a6.075,6.075,0,0,1-3.422-3.422c-.94-2.37-.723-7.993-.723-10.612s-.209-8.25.723-10.612A6.075,6.075,0,0,1,7.391,6.2c2.37-.94,7.993-.723,10.612-.723s8.25-.209,10.612.723a6.075,6.075,0,0,1,3.422,3.422c.94,2.37.723,7.993.723,10.612S32.976,28.488,32.036,30.849Z"transform="translate(0.005 -2.238)" fill="#fff" />
                            </svg>
                        </div>
                    </a>
                    <a href="https://www.instagram.com/">
                        <div className="social-link">
                            <svg xmlns="http://www.w3.org/2000/svg" width="37.876" height="22.5"viewBox="0 0 37.876 22.5">
                                <path id="Icon_awesome-vk" data-name="Icon awesome-vk"d="M38.32,8.276c.26-.879,0-1.526-1.252-1.526H32.927a1.778,1.778,0,0,0-1.8,1.174A34.7,34.7,0,0,1,26.037,16.4c-.963.963-1.406,1.273-1.934,1.273-.26,0-.661-.309-.661-1.188V8.276c0-1.055-.3-1.526-1.167-1.526H15.764a1,1,0,0,0-1.055.949c0,1,1.491,1.23,1.645,4.043v6.1c0,1.336-.239,1.582-.766,1.582-1.406,0-4.823-5.161-6.848-11.067-.408-1.146-.809-1.61-1.87-1.61H2.728c-1.181,0-1.42.555-1.42,1.174,0,1.1,1.406,6.546,6.546,13.746,3.424,4.915,8.248,7.58,12.635,7.58,2.637,0,2.96-.591,2.96-1.61,0-4.7-.239-5.14,1.083-5.14.612,0,1.666.309,4.127,2.679,2.813,2.813,3.277,4.071,4.852,4.071h4.141c1.181,0,1.779-.591,1.434-1.758-.787-2.454-6.11-7.5-6.349-7.84-.612-.788-.436-1.139,0-1.842.007-.007,5.063-7.123,5.583-9.534Z"transform="translate(-1.308 -6.75)" fill="#fff" />
                            </svg>
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    </div>
}

export default withRouter(Footer);