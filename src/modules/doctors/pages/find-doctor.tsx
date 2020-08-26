import React, { useEffect } from "react";
import { observer } from "mobx-react";
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';
import ErrorBadge from '../../../components/error-badge';
import controller from "../controllers/find-doctor-controller";
import LoadingIndicator from "../../../components/loading-indicator";


const FindDoctor: React.FC = () => {

    // Scroll component
    useEffect(() => {
        document.getElementsByClassName("doctor-module")[0].addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    function handleScroll() {
        const element = document.getElementsByClassName("doctor-module")[0];

        if (element.scrollHeight - element.scrollTop - 1 <= element.clientHeight) {
            controller.loadNextPage();
        }
    }

    return <React.Fragment>
        <ErrorBadge
            isOpen={controller.isErrorBadgeOpen}
            message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
        />
        <Filter />
        <DoctorWrapper />
        <div className={`loading-badge ${controller.isLoading ? "" : "close"}`}>
            <LoadingIndicator />
        </div>
    </React.Fragment>
};

export default observer(FindDoctor);