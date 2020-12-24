import React, { useEffect } from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { observer } from "mobx-react";
import controller, { ESocialLinkTypes } from "../controllers/detail-controller";
import { InstagramIcon, MailIcon, TelegramIcon, ViberIcon, VkIcon, WhatsAppIcon } from "../icons";
import RatingComponent from "../components/rating";
import Reviews from "../components/detail/reviews";
import DoctorPlaceholder from "../../../static/images/user-placeholder.jpg";
import Page404 from "../../main/pages/404";
import LoadingHeader from "../components/detail/loading/loading-header";
import LoadingConsultationsComponent from "../components/detail/loading/loading-consultations";
import formatServices from "../../../services/format-services";
import AdditionalInformation from "../components/detail/additional-information";
import WeekTableComponent, { WeekTableComponentMobile } from "../components/detail/additional-information/week-table";
import FullScheduleModalWindow from "../components/detail/full-schedule";
import FullSizeImageComponent from "../components/detail/full-size-image";
import MediaQuery from "react-responsive";
import DetailInformationMobile from "../components/detail/detail-information-mobile";

type PathParamsType = {
    id: string,
}

type Props = RouteComponentProps<PathParamsType>;


const DetailPage: React.FC<Props> = (props) => {

    useEffect(() => {
        controller.onErrorCB = () => props.history.push("/404");
    }, []);

    if (controller.doctorId !== props.match.params.id) {
        controller.doctorId = props.match.params.id;
        controller.fetchDoctor(props.match.params.id);
    }

    const profileStyles = {
        backgroundImage: `url(${ controller.doctor?.photoUrl || DoctorPlaceholder })`,
    };

    if (controller.loading) {
        return <div className="detail-doctor-module">
            <LoadingHeader/>
            <LoadingConsultationsComponent/>
        </div>;
    }

    return <div className="detail-doctor-module">
        <DetailInformationMobile/>
        <FullSizeImageComponent/>
        {
            controller.doctor == undefined
                ? <Page404/>
                : <React.Fragment>
                    <FullScheduleModalWindow/>

                    <header>
                       <div className="left-side">
                           <div className="profileImage" style={ profileStyles }/>

                           <div className="info-main">
                               <h2>{ controller.doctor.fullName }</h2>
                               <RatingComponent amount={ controller.doctor.rating }/>
                               <div className="buttons">
                                   <button
                                       className="appoint"
                                       onClick={() => props.history.push(`/appoint/${props.match.params.id}`)}>
                                       Записаться
                                   </button>
                               </div>
                           </div>

                           <div className="info-detail">
                               <div className="info">
                                   <div className="keys">
                                       <div className="key">Специальность:</div>
                                       <div className="key">Опыт работы:</div>
                                       <div className="key">Возраст:</div>
                                       <div className="key">Город:</div>
                                   </div>
                                   <div className="values">
                                       <div className="value">
                                           {
                                               controller.doctor.speciality.length > 0
                                                   ? formatServices.translateSpeciality(controller.doctor.speciality[0])
                                                   : "Не указана"
                                           }
                                       </div>
                                       <div className="value">
                                           {
                                               controller.doctor.experience
                                                   ? formatServices.experience(controller.doctor.experience)
                                                   : "Не указан"
                                           }
                                       </div>
                                       <div className="value">
                                           {
                                               controller.doctor.age
                                                   ? formatServices.age(controller.doctor.age)
                                                   : "Не указан"
                                           }
                                       </div>
                                       <div className="value">
                                           {
                                               controller.doctor.city && controller.doctor.city.length > 0
                                                   ? controller.doctor.city
                                                   : "Не указан"
                                           }
                                       </div>
                                   </div>
                               </div>

                               <div className="social-medias">
                                   {
                                       controller.getSocialLinks()?.map(e => <a href={e.href}>
                                           <LinkIcon type={e.type} />
                                       </a>)
                                   }
                               </div>
                           </div>
                       </div>

                        <div className="price">
                            <span className="price_value">
                                <span className="from">от</span>
                                &nbsp;
                                { controller.doctor.price }
                                <sup className="currency">₽</sup>
                            </span>
                        </div>
                    </header>

                    <MediaQuery maxWidth={580}>
                        <button
                            className="appoint mobile-view"
                            onClick={() => props.history.push(`/appoint/${props.match.params.id}`)}>
                            Записаться
                        </button>
                    </MediaQuery>

                    <div className="row col-2">
                        {/* ------ INFORMATION ------ */}
                        <section className="information">
                            <div className="row">
                                <h3 className="title">Информация</h3>
                                <MediaQuery maxWidth={1024}>
                                    <span onClick={() => controller.isMobileInformationPageOpen = true} className="more">Подробнее</span>
                                </MediaQuery>
                            </div>
                            <div className="content">
                                {
                                    controller.doctor.information?.split("\n\n").map((e: string, i, arr) => {
                                        return <React.Fragment>
                                            <p className="content-paragraph">{ e }</p>
                                            {
                                                i == arr.length - 1 || <br/>
                                            }
                                        </React.Fragment>
                                    })
                                }
                            </div>
                        </section>
                        <AdditionalInformation/>
                    </div>

                    <div className="week-table-title">
                        <h3 className="title">Запись на приём</h3>
                        <span
                            className="see-more"
                            onClick={() => controller.isScheduleModalWindowOpen = true}>
                            <MediaQuery minWidth={868}>Посмотреть полное расписание</MediaQuery>
                            <MediaQuery maxWidth={869}>Подробнее</MediaQuery>
                        </span>
                    </div>
                    <MediaQuery minWidth={1024}><WeekTableComponent/></MediaQuery>
                    <MediaQuery maxWidth={1023}><WeekTableComponentMobile/></MediaQuery>

                    <Reviews/>
                </React.Fragment>
        }
    </div>
}

const LinkIcon : React.FC<{type: ESocialLinkTypes}> = ({ type }) => {
    if (type == ESocialLinkTypes.vk) return <VkIcon/>
    if (type == ESocialLinkTypes.instagram) return <InstagramIcon/>
    if (type == ESocialLinkTypes.telegram) return <TelegramIcon/>
    if (type == ESocialLinkTypes.whatsApp) return <WhatsAppIcon/>
    if (type == ESocialLinkTypes.viber) return <ViberIcon/>
    if (type == ESocialLinkTypes.email) return <MailIcon/>
    return <React.Fragment/>
}


export default withRouter(observer(DetailPage));