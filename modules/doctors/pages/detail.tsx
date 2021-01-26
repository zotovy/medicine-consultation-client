import React, { useEffect } from "react";
import { observer } from "mobx-react";
import { useRouter } from "next/router";
import { GetServerSidePropsContext, NextPage } from "next";
import DetailController, { ESocialLinkTypes } from "../controllers/detail-controller";
import { InstagramIcon, MailIcon, TelegramIcon, ViberIcon, VkIcon, WhatsAppIcon } from "../icons";
import RatingComponent from "../components/rating";
import Reviews from "../components/detail/reviews";
import Page404 from "../../main/pages/404";
import LoadingHeader from "../components/detail/loading/loading-header";
import LoadingConsultationsComponent from "../components/detail/loading/loading-consultations";
import formatServices from "@/services/format-services";
import AdditionalInformation from "../components/detail/additional-information";
import WeekTableComponent, { WeekTableComponentMobile } from "../components/detail/additional-information/week-table";
import FullScheduleModalWindow from "../components/detail/full-schedule";
import FullSizeImageComponent from "../components/detail/full-size-image";
import DetailInformationMobile from "../components/detail/detail-information-mobile";
import { getContainer, TYPES, useInjection } from "../../../container";

type ServerProps = {
    doctor?: DoctorType,
}

const DetailPage: NextPage<ServerProps> = (props) => {
    const controller = useInjection<DetailController>(TYPES.detailDoctorController);
    const router = useRouter();


    if (!controller.doctor) {
        controller.doctor = props.doctor;
        controller.doctorId = props.doctor?.id;
        controller.loading = false;
    }

    useEffect(() => {
        controller.onErrorCB = () => router.push("/404");
    }, []);

    if (controller.doctorId !== router.query.id) {
        controller.doctorId = router.query.id as string;
        controller.fetchDoctor(router.query.id as string);
    }

    const profileStyles = {
        backgroundImage: `url(${controller.doctor?.photoUrl || "../../../static/images/user-placeholder.jpg"})`,
    };

    if (controller.loading && typeof window !== "undefined") {
        return <div className="detail-doctor-module">
            <LoadingHeader/>
            <LoadingConsultationsComponent/>
        </div>;
    }

    // return <main>
    //     {
    //         controller.doctor.toString()
    //     }
    // </main>

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
                            <div className="profileImage" style={profileStyles}/>

                            <div className="info-main">
                                <h2>{controller.doctor.fullName}</h2>
                                <RatingComponent amount={controller.doctor.rating}/>
                                <div className="buttons">
                                    <button
                                        className="appoint"
                                        onClick={() => router.push(`/appoint/${router.query.id}`)}>
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
                                            <LinkIcon type={e.type}/>
                                        </a>)
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="price">
                            <span className="price_value">
                                <span className="from">от</span>
                                &nbsp;
                                {controller.doctor.price}
                                <sup className="currency">₽</sup>
                            </span>
                        </div>
                    </header>

                    <button
                        className="appoint mobile-view"
                        onClick={() => router.push(`/appoint/${router.query.id}`)}>
                        Записаться
                    </button>

                    <div className="row col-2">
                        {/* ------ INFORMATION ------ */}
                        <section className="information">
                            <div className="row">
                                <h3 className="title">Информация</h3>
                                <span onClick={() => controller.isMobileInformationPageOpen = true}
                                      className="more">Подробнее</span>
                            </div>
                            <div className="content">
                                {
                                    controller.doctor.information?.split("\n\n").map((e: string, i, arr) => {
                                        return <React.Fragment>
                                            <p className="content-paragraph" key={`paragraph-${i}`}>{e}</p>
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
                            Посмотреть {
                                typeof window !== "undefined" && window.screen.width > 868 ? "полное расписание" : ""
                            }
                        </span>
                    </div>
                    {
                        typeof window !== "undefined" && window.screen.width > 868
                            ? <WeekTableComponent/>
                            : <WeekTableComponentMobile/>
                    }
                    <Reviews/>
                </React.Fragment>
        }
    </div>

}

export const GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
    const id = ctx.query.id;
    const container = getContainer();
    const controller = container.get<DetailController>(TYPES.detailDoctorController);
    let doctor = await controller._fetchDoctor(id as string);
    doctor = JSON.parse(JSON.stringify(doctor));
    return { props: { doctor: doctor ?? null } };
}

const LinkIcon: React.FC<{ type: ESocialLinkTypes }> = ({ type }) => {
    if (type == ESocialLinkTypes.vk) return <VkIcon/>
    if (type == ESocialLinkTypes.instagram) return <InstagramIcon/>
    if (type == ESocialLinkTypes.telegram) return <TelegramIcon/>
    if (type == ESocialLinkTypes.whatsApp) return <WhatsAppIcon/>
    if (type == ESocialLinkTypes.viber) return <ViberIcon/>
    if (type == ESocialLinkTypes.email) return <MailIcon/>
    return <React.Fragment/>
}


export default observer(DetailPage);