import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { observer } from "mobx-react";
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';
import ErrorBadge from '../../../components/error-badge';
import controller from "../controllers/find-doctor-controller";
import { Config } from "../controllers/find-doctor-controller";
import queryString from "query-string";


const FindDoctor: React.FC = () => {

    const history = useHistory();
    // Scroll component
    useEffect(() => {

        const q : (keyof Config)[]   = ["fullName", "specialities", "child", "workExperience", "qualification", "workPlan", "city"];
        const config : Config = {};
        const queries = queryString.parse(history.location.search ?? "");

        q.forEach((e ) => {
           if (queries[e]) {
               // @ts-ignore
               config[e] = (queries[e] as string).split(",");
           }
        });

        console.log(config);

        controller.fetchDoctors(config);
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
        {/* <div className={`loading-badge ${controller.isLoading ? "" : "close"}`}>
            <LoadingIndicator />
        </div> */}
    </React.Fragment>
};

export default observer(FindDoctor);