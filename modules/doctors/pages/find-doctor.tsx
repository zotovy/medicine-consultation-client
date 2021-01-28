import React, { useEffect } from "react";
import { observer } from "mobx-react";
import DoctorWrapper from '../components/doctors-wrapper';
import Filter from '../components/filter';
import ErrorBadge from '@/components/error-badge';
import FindDoctorController, { Config } from "../controllers/find-doctor-controller";
import { TYPES, useInjection } from "../../../container";
import { useRouter } from "next/router";
import { NextPage } from "next";
import Menu from "@/components/menu";
import CityAddModal from "@/modules/doctors/components/filter/city-add-modal";


// todo: ssr
const FindDoctor: NextPage = () => {
    const controller = useInjection<FindDoctorController>(TYPES.findDoctorController);
    const history = useRouter();
    // Scroll component
    useEffect(() => {

        const q: (keyof Config)[] = ["fullName", "specialities", "child", "workExperience", "qualification", "workPlan", "city"];
        const config: Config = {};
        const queries = history.query;

        q.forEach((e) => {
            if (queries[e]) {
                // @ts-ignore
                config[e] = (queries[e] as string).split(",");
            }
        });

        try {
            if (queries['rating']) {
                config["rating"] = (queries["rating"] as string).split(",").map(e => parseInt(e));
            }
        } catch (e) {

        }

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

    return <div className="doctor-module">
        <CityAddModal/>
        <Menu/>
        <main className=" find-doctor-page">
            <ErrorBadge
                isOpen={controller.isErrorBadgeOpen}
                message="Произошла непридвиденная ошибка. Мы уже работаем над этим!"
            />
            <Filter/>
            <DoctorWrapper/>
            {/* <div className={`loading-badge ${controller.isLoading ? "" : "close"}`}>
            <LoadingIndicator />
        </div> */}
        </main>
    </div>
};

export default observer(FindDoctor);