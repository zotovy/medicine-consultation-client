import React from "react";
import { observer } from "mobx-react";
import controller from "../controllers/detail-controller";
import { BookmarkIcon } from "../icons";
import RatingComponent from "../components/rating";
import ConsultationSelector from "../components/detail/consulation-selector";
import Reviews from "../components/detail/reviews";

const DetailPage: React.FC = () => {

    const profileStyles = {
        backgroundImage: `url(https://i.pinimg.com/236x/21/64/3c/21643c7fe5560cb7c8f7808f36d3f0dc.jpg)`
    };

    return <div className="detail-doctor-module">
        {
            // todo 
            controller.loading
                ? <span>loading...</span>
                : <React.Fragment>
                    <header>
                        <div className="profile-image" style={profileStyles} />
                        <div className="information">
                            <h1>
                                {controller.doctor?.name + " " + controller.doctor?.surname + " " + controller.doctor?.patronymic}
                                <BookmarkIcon booked={false} />
                            </h1>
                            <ul className="information-list">
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

                            </ul>
                            <RatingComponent amount={controller.doctor?.rating ?? 0} />
                        </div>
                        <button id="consultation-signup">Записаться</button>
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

export default observer(DetailPage);