import React from "react";
import Slide from "./doctor-slide";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import ConfirmButton from '../../../../components/confirm-button';
import { TYPES, useInjection } from "../../../../container";
import SliderController from "../../controllers/symptoms-slider-controller";
import SympController from "@/modules/doctors/controllers/symptoms-controller";
import DetailController from "@/modules/doctors/controllers/detail-controller";
import { useRouter } from "next/router";
import Link from "next/link";

const Slider: React.FC = () => {
    const sliderController = useInjection<SliderController>(TYPES.symptomsSliderController);
    const detailController = useInjection<DetailController>(TYPES.detailDoctorController);
    const controller = useInjection<SympController>(TYPES.symptomsController);

    const { highlightSlideId, prevNextButsController, slideShift, currentSlide } = sliderController;
    const { doctors } = controller;
    const goToDoctorPage = (): void => {
        detailController.fetchDoctor(highlightSlideId);
        router.push(`/doctor/${highlightSlideId}`);
    }
    const cloneDoctors = toJS(doctors);
    const router = useRouter();
    return (
        <>
            <div className="slider-container">
                <div className={`slider-wrapper ${doctors.length == 1 ? "slider-wrapper-row" : ""}`}
                     style={{ transform: `translate3d(-${slideShift}px, 0px, 0px)`, transition: `all 300ms ease 0s` }}>
                    {doctors.map((e) => <Slide id={e.id ?? ""} name={e.name ?? ""} surname={e.surname ?? ""}
                                               imgUrl={e.photoUrl ?? ""} rating={e.rating}
                                               speciality={e.speciality[0]}/>)}
                    <Link href={`/find-doctor?specialities=${cloneDoctors[0].speciality[0]}`}>
                        <a className="slider-slide slider-show-more-but">
                            <div className="doctor_profile_pic show-more-pic">
                                <svg xmlns="http://www.w3.org/2000/svg" width="74.731" height="74.731"
                                     viewBox="0 0 74.731 74.731">
                                    <g id="Сгруппировать_179" data-name="Сгруппировать 179"
                                       transform="translate(-1037.887 -487)">
                                        <g id="Icon_feather-search" data-name="Icon feather-search"
                                           transform="translate(914.383 475.496)">
                                            <path id="Контур_115" data-name="Контур 115"
                                                  d="M62.988,34.244A29.5,29.5,0,0,1,33.744,63.988,29.5,29.5,0,0,1,4.5,34.244,29.5,29.5,0,0,1,33.744,4.5,29.5,29.5,0,0,1,62.988,34.244Z"
                                                  transform="translate(122.004 10.004)" fill="none" stroke="#30b9d6"
                                                  stroke-linecap="round" stroke-linejoin="round" stroke-width="6"/>
                                            <path id="Контур_116" data-name="Контур 116"
                                                  d="M41.463,41.463,24.975,24.975" transform="translate(152.529 40.529)"
                                                  fill="none" stroke="#30b9d6" stroke-linecap="round"
                                                  stroke-linejoin="round" stroke-width="6"/>
                                        </g>
                                        <rect id="Прямоугольник_287" data-name="Прямоугольник 287" width="9" height="26"
                                              rx="2" transform="translate(1066 507)" fill="#30b9d6"/>
                                        <rect id="Прямоугольник_288" data-name="Прямоугольник 288" width="26" height="8"
                                              rx="2" transform="translate(1057 516)" fill="#30b9d6"/>
                                    </g>
                                </svg>
                            </div>
                            <div className="info info--show-more-but">
                                <h3 className="name-and-surname name-and-surname--show-more-but">Показать больше</h3>
                            </div>
                        </a>
                    </Link>
                </div>
            </div>
            <div className="slider-control">
                <div
                    className={`slider-control-wrapper slider-control-wrapper-left ${highlightSlideId !== "" ? "control-left" : ''}`}>
                    <div className={`${currentSlide !== 1 ? "" : "disactive"} slider-button slider-button-prev`}
                         onClick={() => {
                             prevNextButsController("prev")
                         }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.828" height="35.657"
                             viewBox="0 0 19.828 35.657">
                            <path id="Icon_feather-chevron-right" data-name="Icon feather-chevron-right"
                                  d="M28.5,39l-15-15,8.125-8.125L28.5,9" transform="translate(-11.5 -6.172)" fill="none"
                                  stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        </svg>
                    </div>
                </div>
                <div className={`slider-control-wrapper slider-control-wrapper-spb`}>
                    <div className={`slider-show-profile-but`} onClick={() => {
                        goToDoctorPage()
                    }}>
                        <h3>Просмотреть Профиль</h3>
                    </div>
                </div>
                <Link href={`appoint/${highlightSlideId}`}>
                    <a>
                        <div className={`slider-control-wrapper slider-control-wrapper-cBut`}>
                            <ConfirmButton content='Продолжить' onConfirm={() => {
                            }}/>
                        </div>
                    </a>
                </Link>
                <div
                    className={`slider-control-wrapper slider-control-wrapper-right ${highlightSlideId !== "" ? "control-right" : ''}`}>
                    <div
                        className={`${currentSlide < Math.ceil(doctors.length / 4) ? "" : "disactive"} slider-button slider-button-next`}
                        onClick={() => {
                            prevNextButsController("next", Math.ceil(doctors.length / 4) < 3 ? 1 : Math.ceil(doctors.length / 4))
                        }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="19.828" height="35.657"
                             viewBox="0 0 19.828 35.657">
                            <path id="Icon_feather-chevron-right" data-name="Icon feather-chevron-right"
                                  d="M13.5,39l15-15L13.5,9" transform="translate(-10.672 -6.172)" fill="none"
                                  stroke="#30b9d6" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"/>
                        </svg>
                    </div>
                </div>


            </div>
        </>
    )
}

export default observer(Slider);