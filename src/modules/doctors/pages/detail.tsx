import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import { observer } from "mobx-react";
import controller from "../controllers/detail-controller";
import {BookmarkIcon, InstagramIcon, MailIcon, TelegramIcon, ViberIcon, VkIcon, WhatsAppIcon} from "../icons";
import RatingComponent from "../components/rating";
import ConsultationSelector from "../components/detail/consulation-selector";
import Reviews from "../components/detail/reviews";
import DoctorPlaceholder from "../../../static/images/user-placeholder.jpg";
import Page404 from "../../main/pages/404";

type PathParamsType = {
    id: string,
}

type Props = RouteComponentProps<PathParamsType>;

const DetailPage: React.FC<Props> = (props) => {

    if (controller.doctorId !== props.match.params.id) {
        controller.doctorId = props.match.params.id;
        controller.fetchDoctor(props.match.params.id);
    }

    const profileStyles = {
        backgroundImage: `url(${controller.doctor?.photoUrl || DoctorPlaceholder})`,
    };

    // Skeleton
    const profileImageSkeletonWidth: number = window.screen.width < 640 ? window.screen.width - 32 : 175;
    const nameSkeletonWidth: number = window.screen.width < 640 ? window.screen.width - 32 : 350;
    const buttonSkeletonWidth: number = window.screen.width < 640 ? window.screen.width - 32 : 135
    const buttonSkeletonStyles: object = window.screen.width < 640 ? { marginTop: "10px" } : {}

    return <div className="detail-doctor-module">
        {

            !controller.loading && controller.doctor === undefined
                ? <Page404 />
                : <React.Fragment>
                    <header>

                        <div className="profileImage" style={profileStyles}/>

                        <div className="info-main">
                            <h2>Иванов Иван</h2>
                            <span id="speciality">Врач Терапевт</span>
                            <RatingComponent amount={4.5}/>
                            <div className="buttons">
                                <button className="appoint">Записаться</button>
                                {/* todo: save logic */}
                                <button className="save" ><BookmarkIcon/></button>
                            </div>
                        </div>

                        <div className="divider"/>

                        <div className="info-detail">
                            <div className="info">
                                <div className="keys">
                                    <div className="key">Специальность:</div>
                                    <div className="key">Опыт работы:</div>
                                    <div className="key">Возраст:</div>
                                    <div className="key">Город:</div>
                                </div>
                                <div className="values">
                                    <div className="value">Терапевт</div>
                                    <div className="value">2 года</div>
                                    <div className="value">31 год</div>
                                    <div className="value">Красноярск</div>
                                </div>
                            </div>

                            <div className="social-medias">
                                <VkIcon/>
                                <InstagramIcon/>
                                <TelegramIcon/>
                                <WhatsAppIcon/>
                                <ViberIcon/>
                                <MailIcon/>
                            </div>
                        </div>
                    </header>


                    <ConsultationSelector />
                    {

                        controller.doctor?.clientsReviews?.length ?? 0 > 0
                            ? <Reviews />
                            : <React.Fragment />
                    }
                </React.Fragment>
        }
    </div>
}

export default withRouter(observer(DetailPage));