import React from "react";
import { BookmarkIcon } from "../icons";
import RatingComponent from "../components/rating";

const DetailPage: React.FC = () => {

    const profileStyles = {
        backgroundImage: `url(https://i.pinimg.com/236x/21/64/3c/21643c7fe5560cb7c8f7808f36d3f0dc.jpg)`
    };

    return <div className="detail-doctor-module">
        <header>
            <div className="profile-image" style={profileStyles} />
            <div className="information">
                <h1>
                    Иванов Иван Владимирович
                    <BookmarkIcon booked={false} />
                </h1>
                <ul className="information-list">
                    <li>
                        <span className="name">Специальность:</span>
                        <span className="data">Терапевт</span>
                    </li>
                    <li>
                        <span className="name">Стаж работы:</span>
                        <span className="data">5 лет</span>
                    </li>
                    <li>
                        <span className="name">Пол:</span>
                        <span className="data">Мужской</span>
                    </li>
                    <li>
                        <span className="name">Возраст:</span>
                        <span className="data">31 год</span>
                    </li>
                    <li>
                        <span className="name">Город:</span>
                        <span className="data">Саратов</span>
                    </li>
                    <li>
                        <span className="name">Стаж на сервисе:</span>
                        <span className="data">1 год</span>
                    </li>
                </ul>
                <RatingComponent amount={4} />
            </div>
            <button id="consultation-signup">Записаться</button>

        </header>
    </div>
}

export default DetailPage;