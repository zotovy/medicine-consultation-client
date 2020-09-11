import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Skeleton from 'react-loading-skeleton';
import { observer } from "mobx-react";
import controller from "../controllers/detail-controller";
import { BookmarkIcon } from "../icons";
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

                        {
                            controller.loading ? <Skeleton width={profileImageSkeletonWidth} height={profileImageSkeletonWidth} /> : <div className="profile-image" style={profileStyles} />
                        }


                        <div className="information">
                            <h1>
                                {
                                    !controller.loading
                                        ? <React.Fragment>
                                            {controller.doctor?.name + " " + controller.doctor?.surname + " " + controller.doctor?.patronymic}
                                            <BookmarkIcon booked={false} className="bookmark" />
                                        </React.Fragment>
                                        : <Skeleton width={nameSkeletonWidth} height={30} />
                                }


                            </h1>

                            <ul className="information-list">
                                {
                                    controller.loading
                                        ? <Skeleton style={{ display: "flex", flexDirection: "column", margin: "10px 0" }} count={3} width={300} />

                                        : <React.Fragment>
                                            <li>
                                                <span className="name">Специальность:</span>
                                                <span className="data">{controller.doctor?.speciality}</span>
                                            </li>
                                            <li>
                                                <span className="name">Стаж работы:</span>
                                                <span className="data">{controller.formatExperience(controller.doctor?.experience ?? 0)}</span>
                                            </li>
                                            <li>
                                                <span className="name">Пол:</span>
                                                <span className="data">{controller.doctor?.sex ? "Мужской" : "Женский"}</span>
                                            </li>
                                            <li>
                                                <span className="name">Возраст:</span>
                                                <span className="data">{controller.doctor?.age + " " + controller.declOfNum(controller.doctor?.age ?? 0, ['год', 'года', 'лет'])}</span>
                                            </li>
                                            {controller.doctor?.city
                                                ? <li>
                                                    <span className="name">Город:</span>
                                                    <span className="data">{controller.doctor?.city}</span>
                                                </li>
                                                : <React.Fragment />
                                            }
                                        </React.Fragment>
                                }
                            </ul>

                            <RatingComponent amount={controller.doctor?.rating ?? 0} />
                        </div>
                        {
                            controller.loading ? <Skeleton style={buttonSkeletonStyles} width={buttonSkeletonWidth} height={35} /> : <button id="consultation-signup">Записаться</button>
                        }
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