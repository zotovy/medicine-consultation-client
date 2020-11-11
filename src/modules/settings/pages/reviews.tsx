import React from "react";
import { observer } from "mobx-react";
import controller from "../controllers/reviews-component";
import NavigationComponent from "../components/navigation";
import ReviewsComponent from "../../../components/review";
import SettingsLoadingComponent from "../components/loading";

const ReviewPage: React.FC = () => {

    if (controller.isLoading) {
        return <SettingsLoadingComponent active={2}/>
    }

    return <main className="reviews-page settings-page">
        <NavigationComponent active={2}/>
        <section className="content reviews">

            {
                [1, 2].map(e => {
                    return <ReviewsComponent id="1" fullName="123" rating={2} text="213"/>;
                })
            }

        </section>
    </main>
}

export default observer(ReviewPage);