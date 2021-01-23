import React, { useEffect } from "react";
import { observer } from "mobx-react";
import controller from "../controllers/reviews-component";
import NavigationComponent from "../components/navigation";
import ReviewsComponent from "../../../components/review";
import SettingsLoadingComponent from "../components/loading";
import NotFound from "../components/not-found";
import GoBackIcon from "../components/go-back-icon";
import Navigation from "../components/navigation";

const ReviewPage: React.FC = () => {

    useEffect(() => {
        controller.fetchReviews();
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/reviews"/>
    }

    if (controller.reviews.length === 0) {
        return <main className="consultations-page settings-page">
            <Navigation active="/reviews" />
            <NotFound text="У вас пока нет отзывов"/>
        </main>
    }

    return <main className="reviews-page settings-page">
        <GoBackIcon/>
        <NavigationComponent active="/reviews"/>
        <section className="content reviews">
            {
                controller.reviews.map(e => {
                    return <ReviewsComponent
                        fullName={getFullName(e.doctorId as DoctorType)}
                        rating={e.point}
                        text={e.content}/>;
                })
            }

        </section>
    </main>
}

const getFullName = (d: DoctorType) : string => {
    if (!d || typeof d == "string") return "";
    if(d.fullName) return d.fullName;
    return `${d.name} ${d.surname}`;
}

export default observer(ReviewPage);