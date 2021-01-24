import React, { useEffect } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { observer } from "mobx-react";
import Menu from "@/components/menu";
import ReviewsComponent from "@/components/review";
import ReviewsController from "../controllers/reviews-controller";
import NavigationComponent from "../components/navigation";
import SettingsLoadingComponent from "../components/loading";
import NotFound from "../components/not-found";
import GoBackIcon from "../components/go-back-icon";
import Navigation from "../components/navigation";
import { TYPES, useInjection } from "../../../container";


const ReviewPage: NextPage = (props) => {
    const controller = useInjection<ReviewsController>(TYPES.reviewsController);

    useEffect(() => {
        controller.fetchReviews();
    }, []);

    if (controller.isLoading) {
        return <SettingsLoadingComponent active="/reviews"/>
    }

    if (controller.reviews.length === 0) {

        return <React.Fragment>
            <Menu/>
            <main className="consultations-page settings-page">
                <Navigation active="/reviews" />
                <NotFound text="У вас пока нет отзывов"/>
            </main>
        </React.Fragment>
    }

    return <React.Fragment>
        <Head>
            <title>Настройки – Отзывы</title>
        </Head>
        <Menu/>
        <main className="reviews-page settings-page">
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
    </React.Fragment>
}

const getFullName = (d: DoctorType) : string => {
    if (!d || typeof d == "string") return "";
    if(d.fullName) return d.fullName;
    return `${d.name} ${d.surname}`;
}

export default observer(ReviewPage)